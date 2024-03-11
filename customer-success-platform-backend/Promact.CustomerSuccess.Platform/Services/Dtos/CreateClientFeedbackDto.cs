using System;
using System.ComponentModel.DataAnnotations;

namespace Promact.CustomerSuccess.Platform.Services.Dtos
{
    public class CreateClientFeedbackDto
    {
        [Required]
        public Guid ProjectId { get; set; }

        [Required]
        public DateTime FeedbackDate { get; set; }

        [Required]
        public FeedbackType FeedbackType { get; set; }

        [Required]
        public string Details { get; set; }

        [Required]
        public string ActionTaken { get; set; }

        [Required]
        public DateTime ClosureDate { get; set; }
    }
}
