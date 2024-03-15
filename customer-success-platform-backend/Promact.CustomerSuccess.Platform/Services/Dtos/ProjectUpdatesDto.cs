using System;
using System.ComponentModel.DataAnnotations;
using Volo.Abp.Application.Dtos;

namespace Promact.CustomerSuccess.Platform.Services.Dtos
{
    public class ProjectUpdatesDto : AuditedEntityDto<Guid>
    {
        public DateTime Date { get; set; }
        public string GeneralUpdates { get; set; }

        [Required]
        public Guid ProjectId { get; set; }
    }
}
