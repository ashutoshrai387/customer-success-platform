using System;
using System.ComponentModel.DataAnnotations;

namespace Promact.CustomerSuccess.Platform.Services.Dtos
{
    public class CreateAuditHistoryDto
    {
        [Required]
        public DateTime DateOfAudit { get; set; }

        [Required]
        public required string ReviewedBy { get; set; }

        [Required]
        public required string Status { get; set; }

        [Required]
        public required string ReviewedSection { get; set; }

        public required string CommentQueries { get; set; }

        public required string ActionItem { get; set; }
        public Guid ProjectId { get; set; }
    }
}
