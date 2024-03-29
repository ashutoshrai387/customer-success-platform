﻿using System.ComponentModel.DataAnnotations.Schema;
using Volo.Abp.Domain.Entities.Auditing;

namespace Promact.CustomerSuccess.Platform.Entities
{
    public class PhaseMilestone : AuditedEntity<Guid>
    {
        [ForeignKey("Project")]
        public Guid ProjectId { get; set; }
        public required string Title { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public DateTime ApprovalDate { get; set; }
        public required string Description { get; set; }
        public DateTime RevisedEndDate{ get; set; }
        public MilestoneOrPhaseStatus Status { get; set; }
        public virtual Project? Project { get; set; }
        public virtual ICollection<ApprovedTeam>? ApprovedTeam { get; set; }
    }
}