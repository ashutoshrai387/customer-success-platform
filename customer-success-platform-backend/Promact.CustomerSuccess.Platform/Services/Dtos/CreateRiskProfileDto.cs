using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Promact.CustomerSuccess.Platform.Services.Dtos
{
    public class CreateRiskProfileDto
    {
        [Required]
        public Guid ProjectId { get; set; }
        
        [Required]
        public RiskType RiskType { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        public RiskSeverity Severity { get; set; }
        
        [Required]
        public RiskImpact Impact { get; set; }

        [Required]
        public string RemedialSteps { get; set; }

        [Required]
        public string Status { get; set; }

        [Required]
        public DateTime ClosureDate { get; set; }
    }
}
