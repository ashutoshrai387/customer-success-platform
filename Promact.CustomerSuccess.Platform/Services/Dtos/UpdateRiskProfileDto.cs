using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Promact.CustomerSuccess.Platform.Services.Dtos
{
    public class UpdateRiskProfileDto
    {
        [Required]
        public Guid ProjectId { get; set; }
        
        [Required]
        public RiskType RiskType { get; set; }
        
        [Required]
        public RiskSeverity Severity { get; set; }
        
        [Required]
        public RiskImpact Impact { get; set; }
        
        public ICollection<RemediationStepDto> RemediationSteps { get; set; }
    }
}
