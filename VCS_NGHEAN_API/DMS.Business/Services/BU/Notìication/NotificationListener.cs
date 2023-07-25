using DMS.BUSINESS.Dtos.BU.Notification;
using DMS.CORE;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Newtonsoft.Json;
using NLog;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using System.Text;

namespace DMS.BUSINESS.Services.BU.Notìication
{
    public class NotificationListener : BackgroundService
    {
        private readonly IModel _channel;
        private readonly IConfiguration _configuration;
        private static Logger _logger = LogManager.GetLogger("NotificationListener");
        private bool IsConnected;

        public NotificationListener(IConnection connection, IConfiguration config)
        {
            if (connection != null)
            {
                _channel = connection.CreateModel();
                _configuration = config;
                IsConnected = true;
            }
            else
            {
                IsConnected = false;
            }
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            if (IsConnected)
            {
                var consumer = new EventingBasicConsumer(_channel);
                consumer.Received += async (model, ea) =>
                {
                    var message = Encoding.UTF8.GetString(ea.Body.ToArray());
                    _logger.Info("Đã nhận message: {0}", message);

                    // Xử lý message
                    var notification = JsonConvert.DeserializeObject<NotificationDirectDto>(message);

                    if (notification == null)
                    {
                        _logger.Info("Message không có dữ liệu", message);
                        return;
                    }

                    using var context = new AppDbContext(GetContextOption(), null);
                    var currentMessage = await context.tblBuNotification.FirstOrDefaultAsync(x => x.Id == notification.PushNotificationId);
                    currentMessage.IsSent = true;
                    context.Entry(currentMessage).State = EntityState.Modified;
                    await context.SaveChangesAsync();

                    _channel.BasicAck(deliveryTag: ea.DeliveryTag, multiple: false);
                    _logger.Info("Đã xử lý và lưu kết quả cho message: {0}", message);
                };
                _channel.BasicConsume(queue: "notification_queue_BT", autoAck: false, consumer: consumer);
                await Task.CompletedTask;
            }
        }

        private DbContextOptions<AppDbContext> GetContextOption()
        {
            var connectionString = _configuration.GetConnectionString("Connection");
            var options = new DbContextOptionsBuilder<AppDbContext>()
                .UseSqlServer(connectionString)
                .Options;
            return options;
        }
    }

}
