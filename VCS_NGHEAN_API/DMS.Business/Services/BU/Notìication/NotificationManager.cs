using AutoMapper;
using DMS.BUSINESS.Common.Enum;
using DMS.BUSINESS.Dtos.AD;
using DMS.BUSINESS.Dtos.BU.Notification;
using DMS.CORE;
using DMS.CORE.Entities.BU;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using RabbitMQ.Client;
using System.Text;

namespace DMS.BUSINESS.Services.BU.Notìication
{
    public static class NotificationManager
    {
        public static bool IsConnected = false;
        private static string BrandName;
        private static string AppId;
        private static IModel _channel;
        private static AppDbContext _dbContext;
        private static IMapper _mapper;
        public static void Setup(IConnection connection, AppDbContext dbContext, IMapper mapper, IConfiguration configuration)
        {
            try
            {
                _channel = connection.CreateModel();
                _dbContext = dbContext;
                _mapper = mapper;
                BrandName = configuration.GetSection("OneSignal:BrandName").Value ?? string.Empty;
                AppId = configuration.GetSection("OneSignal:AppId").Value ?? string.Empty;
                IsConnected = true;
            }
            catch (Exception)
            {
                IsConnected = false;
            }
        }

        /// <summary>
        /// Bắt buộc sử dụng trong transaction
        /// </summary>
        /// <param name="sendDto"></param>
        /// <param name="account"></param>
        /// <param name="notificationType"></param>
        /// <returns></returns>
        public static async Task Send(SendNotificationInputDto sendDto, tblAccountDto account, NotificationType notificationType)
        {
            string templateCode = notificationType.ToString();

            var template = await GetTemplate(templateCode);
            if (template == null) return;

            var SendNotificationObj = new NotificationDto(template, sendDto);

            if (SendNotificationObj == null || SendNotificationObj.Devices == null || !SendNotificationObj.Devices.Any())
            {
                return;
            }
            try
            {
                if (SendNotificationObj.Devices == null || !SendNotificationObj.Devices.Any())
                {
                    return;
                }

                var notificationObj = new tblNotificationDtoCreateDto()
                {
                    UserName = account.UserName,
                    Contents = SendNotificationObj.Content ?? string.Empty,
                    Headings = SendNotificationObj.Headings ?? string.Empty,
                    Subtitle = SendNotificationObj.SubTitle ?? string.Empty,
                    Type = (int)notificationType,
                    IsSeen = false,
                    IsSent = false,
                };

                var pushNotificationIdReturn = await AddPushNotification(notificationObj);

                SendNotificationObj.Data.NotificationData.Id = pushNotificationIdReturn;
                SendNotificationObj.Data.NotificationData.Type = notificationObj.Type ?? 0;

                var notification = new NotificationMessage()
                {
                    Notification = new NotificationOneSignalDto
                    {
                        app_id = AppId,
                        headings = new Dictionary<string, string>() { { "en", BrandName } },
                        subtitle = new Dictionary<string, string>() { { "en", SendNotificationObj.SubTitle ?? string.Empty } },
                        include_external_user_ids = new() { account.PortalId.ToString() },
                        contents = new Dictionary<string, string>() { { "en", SendNotificationObj.Content ?? string.Empty } },
                        data = SendNotificationObj.Data
                    },
                    PushNotificationId = pushNotificationIdReturn,
                };

                _channel.QueueDeclare(queue: "notification_queue",
                                     durable: true,
                                     exclusive: false,
                                     autoDelete: false,
                                     arguments: null);

                string message = JsonConvert.SerializeObject(notification);
                var body = Encoding.UTF8.GetBytes(message);

                var properties = _channel.CreateBasicProperties();
                properties.Persistent = true;

                var exchange = Guid.NewGuid().ToString();
                _channel.ExchangeDeclare(exchange, ExchangeType.Direct);
                _channel.QueueBind("notification_queue", exchange, "notification_queue");

                _channel.BasicPublish(exchange: exchange,
                                     routingKey: "notification_queue",
                                     basicProperties: properties,
                                     body: body);
            }
            catch (Exception)
            {
                return;
            }
        }
        private static async Task<NotificationDto> GetTemplate(string templateCode)
        {
            var data = await _dbContext.tblMdNotificationTemplate.FirstOrDefaultAsync(x => x.TemplateCode == templateCode);
            if (data == null) return null;

            return new NotificationDto(data.Title, data.SubTitle, data.Message);
        }

        private static async Task<int> AddPushNotification(tblNotificationDtoCreateDto model)
        {
            var obj = _mapper.Map<tblBuNotification>(model);
            _dbContext.Add(obj);
            await _dbContext.SaveChangesAsync();
            return obj.Id;
        }
    }
}
