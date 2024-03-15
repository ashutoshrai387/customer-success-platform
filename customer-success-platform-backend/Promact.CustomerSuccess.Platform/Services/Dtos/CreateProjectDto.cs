using Promact.CustomerSuccess.Platform.Services.Dtos;
using System.ComponentModel.DataAnnotations;

namespace Promact.CustomerSuccess.Platform
{
    public class CreateProjectDto
    {
        [Required]
        [StringLength(128)]
        public required string Name { get; set; }
        public required string Description { get; set; }
        //public IEnumerable<DocumentDto>? Documents { get; set; }
        public IEnumerable<ProjectBudgetDto>? Budgets { get; set; }
        public IEnumerable<AuditHistoryDto>? AuditHistory { get; set; }
        public IEnumerable<VersionHistoryDto>? VersionHistory { get; set; }
        public IEnumerable<ScopeDto>? Scopes { get; set; }
        public IEnumerable<ProjectStackDto>? ProjectStacks { get; set; }
        public IEnumerable<EscalationMatrixDto>? EscalationMatrices { get; set; }
        public IEnumerable<StakeholderDto>? Stakeholders { get; set; }
        public IEnumerable<RiskProfileDto>? RiskProfiles { get; set; }
        public IEnumerable<ApprovedTeamDto>? ApprovedTeams { get; set; }
        public IEnumerable<DetTimeRefDto>? DetailedTimelineReference { get; set; }
        public IEnumerable<PhaseMilestoneDto>? PhaseMilestones { get; set; }
        public IEnumerable<SprintDto>? Sprints { get; set; }
        public IEnumerable<ProjectResourcesDto>? Resources { get; set; }
        public IEnumerable<ClientFeedbackDto>? ClientFeedbacks { get; set; }
        public IEnumerable<ProjectUpdatesDto>? ProjectUpdates { get; set; }
        public IEnumerable<MeetingMinuteDto>? MeetingMinutes { get; set; }
    }
}