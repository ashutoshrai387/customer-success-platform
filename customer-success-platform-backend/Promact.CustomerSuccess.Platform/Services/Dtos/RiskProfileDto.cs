using System;
using System.Collections.Generic;
using Volo.Abp.Application.Dtos;

namespace Promact.CustomerSuccess.Platform.Services.Dtos
{
    public class RiskProfileDto : AuditedEntityDto<Guid>
    {
        public Guid ProjectId { get; set; }
        public RiskType RiskType { get; set; }
        public RiskSeverity Severity { get; set; }
        public RiskImpact Impact { get; set; }
        public ICollection<RemediationStepDto> RemediationSteps { get; set; }
    }
}
