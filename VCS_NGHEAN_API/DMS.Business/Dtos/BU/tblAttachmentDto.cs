using AutoMapper;
using DMS.BUSINESS.Common;
using DMS.BUSINESS.Common.Mapping;
using DMS.CORE.Entities.BU;
using System.ComponentModel.DataAnnotations;

namespace DMS.BUSINESS.Dtos.BU
{
    public class tblAttachmentDto : IMapFrom, IDto
    {
        [Key]
        public Guid Id { get; set; }

        public string Title { get; set; }

        public string Url { get; set; }

        public string Thumbnail { get; set; }

        public double Size { get; set; }

        public string Type { get; set; }

        public virtual tblBuCheckInOutImage Image { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblBuAttachment, tblAttachmentDto>().ReverseMap();
        }
    }

    public class tblAttachmentLiteDto : IMapFrom, IDto
    {
        [Key]
        public Guid Id { get; set; }

        public string Title { get; set; }

        public string Url { get; set; }

        public string Thumbnail { get; set; }

        public double Size { get; set; }

        public string Type { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblBuAttachment, tblAttachmentDto>().ReverseMap();
        }
    }
}
