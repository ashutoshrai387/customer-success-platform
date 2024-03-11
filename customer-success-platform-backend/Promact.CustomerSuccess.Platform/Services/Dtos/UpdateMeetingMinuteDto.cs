using System;
using System.ComponentModel.DataAnnotations;

namespace Promact.CustomerSuccess.Platform.Services.Dtos
{
    public class UpdateMeetingMinuteDto
    {
        [Required]
        public Guid ProjectId { get; set; }

        [Required]
        public DateTime MeetingDate { get; set; }

        [Required]
        public string Duration { get; set; }

        [Required]
        public string MoMLink { get; set; }

        [Required]
        public string Comments { get; set; }
    }
}
