using System;
using Volo.Abp.Application.Dtos;

namespace Promact.CustomerSuccess.Platform.Services.Dtos
{
    public class RemediationStepDto : AuditedEntityDto<Guid>
    {
        public string Description { get; set; }
        //public Guid RiskProfileId { get; set; }
    }
}
