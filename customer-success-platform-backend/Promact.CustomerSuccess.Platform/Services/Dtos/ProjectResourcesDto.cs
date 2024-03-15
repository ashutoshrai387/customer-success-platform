using System;
using System.ComponentModel.DataAnnotations;
using Volo.Abp.Application.Dtos;

namespace Promact.CustomerSuccess.Platform.Services.Dtos
{
    public class ProjectResourcesDto : AuditedEntityDto<Guid>
    {
        [Required]
        public Guid ProjectId { get; set; }
        public string ResourceName { get; set; }
        public string Role { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        public string Comment { get; set; }
    }
}
