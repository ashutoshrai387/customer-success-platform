using System;
using System.ComponentModel.DataAnnotations;

namespace Promact.CustomerSuccess.Platform.Services.Dtos
{
    public class UpdateSprintDto
    {
        [Required]
        public Guid ProjectId { get; set; }

        [Required]
        public DateTime StartDate { get; set; }

        [Required]
        public DateTime EndDate { get; set; }

        [Required]
        public SprintStatus Status { get; set; }

        [Required]
        public string Comments { get; set; }

        [Required]
        public string Goals { get; set; }

        [Required]
        public int SprintNumber { get; set; }
    }
}
