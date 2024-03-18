using System;
using System.ComponentModel.DataAnnotations;

namespace Promact.CustomerSuccess.Platform.Services.Dtos
{
    public class CreateApprovedTeamDto
    {
        [Required]
        public string Phase { get; set; }

        [Required]
        public int NumberOfResources { get; set; }

        [Required]
        public string Role { get; set; }

        [Required]
        public int AvailabilityPercentage { get; set; }

        [Required]
        public int Duration { get; set; }

        [Required]
        public Guid ProjectId { get; set; }

        [Required]
        public Guid PhaseMilestoneId { get; set; }
    }
}