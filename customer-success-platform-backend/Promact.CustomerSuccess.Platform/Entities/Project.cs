using Microsoft.EntityFrameworkCore;
using Volo.Abp.Domain.Entities.Auditing;

namespace Promact.CustomerSuccess.Platform.Entities
{
    public class Project : AuditedEntity<Guid>
    {
        public required string Name { get; set; }
        public required string Description { get; set; }
        public virtual ICollection<Document>? Documents { get; set; }
        public virtual ICollection<ProjectBudget>? Budgets { get; set; }
        public virtual ICollection<VersionHistory>? VersionHistory { get; set; }
        public virtual ICollection<AuditHistory>? AuditHistory { get; set; }
        public virtual ICollection<ProjectDescription>? ProjectDescription { get; set; }
        public virtual ICollection<Scope>? Scope { get; set; }
        public virtual ICollection<ProjectStack>? ProjectStack { get; set; }
        public virtual ICollection<EscalationMatrix>? EscalationMatrices { get; set; }
        public virtual ICollection<Stakeholder>? Stakeholders { get; set; }
        public virtual ICollection<RiskProfile>? RiskProfiles { get; set; }
        public virtual ICollection<PhaseMilestone>? PhaseMilestones { get; set; }
        public virtual ICollection<Sprint>? Sprints { get; set; }
        public virtual ICollection<DetTimeRef>? DetailedTimelineReference { get; set; }
        public virtual ICollection<ProjectResources>? Resources { get; set; }
        public virtual ICollection<ClientFeedback>? ClientFeedbacks { get; set; }
        public virtual ICollection<MeetingMinute>? MeetingMinutes { get; set; }
    }
}
