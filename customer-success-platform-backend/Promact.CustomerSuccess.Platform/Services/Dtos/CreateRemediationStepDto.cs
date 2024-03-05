using System;
using System.ComponentModel.DataAnnotations;

namespace Promact.CustomerSuccess.Platform.Services.Dtos
{
    public class CreateRemediationStepDto
    {
        [Required]
        public string Description { get; set; }
        
        [Required]
        public Guid RiskProfileId { get; set; }
    }
}
