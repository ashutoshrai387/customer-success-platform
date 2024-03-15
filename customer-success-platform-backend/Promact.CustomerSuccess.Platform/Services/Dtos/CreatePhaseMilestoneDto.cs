using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Promact.CustomerSuccess.Platform.Services.Dtos
{
    public class CreatePhaseMilestoneDto
    {
        [Required]
        public Guid ProjectId { get; set; }

        [Required]
        public string Title { get; set; }

        [Required]
        public DateTime StartDate { get; set; }

        [Required]
        public DateTime EndDate { get; set; }

        [Required]
        public DateTime ApprovalDate { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        public DateTime RevisedEndDate { get; set; }

        [Required]
        public MilestoneOrPhaseStatus Status { get; set; }
        public IEnumerable<ApprovedTeamDto>? ApprovedTeamDto { get; set; }
    }
}
