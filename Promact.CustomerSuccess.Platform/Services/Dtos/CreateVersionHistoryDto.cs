using System;
using System.ComponentModel.DataAnnotations;

namespace Promact.CustomerSuccess.Platform.Services.Dtos
{
    public class CreateVersionHistoryDto
    {
        [Required]
        public required string Version { get; set; }
        [Required]
        public required string Type { get; set; }
        [Required]
        public required string Change { get; set; }
        [Required]
        public required string ChangeReason { get; set; }
        [Required]
        public required string CreatedBy { get; set; }
        [Required]
        public DateTime RevisionDate { get; set; }
        public DateTime? ApprovalDate { get; set; }
        public required string ApprovedBy { get; set; }
    }
}
