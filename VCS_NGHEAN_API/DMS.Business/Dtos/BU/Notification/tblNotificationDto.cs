
using AutoMapper;
using DMS.BUSINESS.Common.Mapping;
using DMS.BUSINESS.Dtos.Common;
using DMS.CORE.Entities.AD;
using DMS.CORE.Entities.BU;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DMS.BUSINESS.Dtos.BU.Notification
{
    public class tblNotificationDto : SoftDeleteBaseDto, IMapFrom
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string Headings { get; set; } = string.Empty;
        public string Subtitle { get; set; } = string.Empty;
        public string Contents { get; set; } = string.Empty;
        public string Url { get; set; } = string.Empty;
        public int Type { get; set; }
        public bool IsSeen { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblBuNotification, tblNotificationDto>().ReverseMap();
        }
    }

    public class tblNotificationDtoCreateDto : IMapFrom
    {
        public string UserName { get; set; }

        public string Headings { get; set; }

        public string Subtitle { get; set; }

        public string Contents { get; set; }

        public string Url { get; set; }

        public int? Type { get; set; }

        public bool? IsSeen { get; set; }

        public bool? IsSent { get; set; }

        public virtual tblAdAccount Account { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblBuNotification, tblNotificationDtoCreateDto>().ReverseMap();
        }
    }
}
