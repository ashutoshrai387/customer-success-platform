using System;
using System.ComponentModel.DataAnnotations;

namespace Promact.CustomerSuccess.Platform.Services.Dtos
{
    public class UpdateEscalationMatrixDto
    {
        [Required]
        public EscalationMatrixLevels Level { get; set; }
        
        [Required]
        public EscalationType EscalationType { get; set; }
        
        [Required]
        public Guid ProjectId { get; set; }
    }
}
