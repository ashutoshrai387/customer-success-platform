using System;
using System.ComponentModel.DataAnnotations;
using Volo.Abp.Application.Dtos;

namespace Promact.CustomerSuccess.Platform.Services.Dtos
{
    public class EscalationMatrixDto : AuditedEntityDto<Guid>
    {
        public EscalationMatrixLevels Level { get; set; }
        public EscalationType EscalationType { get; set; }
        public string Name { get; set; }
        public string Role { get; set; }

        [Required]
        public Guid ProjectId { get; set; }
    }
}
