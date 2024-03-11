using System;
using System.ComponentModel.DataAnnotations;

namespace Promact.CustomerSuccess.Platform.Services.Dtos
{
    public class CreateProjectResourcesDto
    {
        [Required]
        public Guid ProjectId { get; set; }

        [Required]
        public Guid ResourceId { get; set; }

        [Required]
        public double AllocationPercentage { get; set; }

        [Required]
        public DateTime Start { get; set; }

        [Required]
        public DateTime End { get; set; }

        [Required]
        public string Role { get; set; }
    }
}
