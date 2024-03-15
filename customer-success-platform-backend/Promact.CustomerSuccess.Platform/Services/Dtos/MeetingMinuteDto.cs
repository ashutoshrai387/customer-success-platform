using System;
using System.ComponentModel.DataAnnotations;
using Volo.Abp.Application.Dtos;

namespace Promact.CustomerSuccess.Platform.Services.Dtos
{
    public class MeetingMinuteDto : AuditedEntityDto<Guid>
    {
        [Required]
        public Guid ProjectId { get; set; }
        public DateTime MeetingDate { get; set; }
        public string Duration { get; set; }
        public string MoMLink { get; set; }
        public string Comments { get; set; }
    }
}
