using System;
using System.ComponentModel.DataAnnotations;

namespace Promact.CustomerSuccess.Platform.Services.Dtos
{
    public class CreateProjectUpdatesDto
    {
        [Required]
        public DateTime Date { get; set; }

        [Required]
        public string GeneralUpdates { get; set; }

        [Required]
        public Guid ProjectId { get; set; }
    }
}
