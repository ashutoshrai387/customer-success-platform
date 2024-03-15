using AutoMapper;
using Promact.CustomerSuccess.Platform.Entities;
using Promact.CustomerSuccess.Platform.Services.Dtos;

namespace Promact.CustomerSuccess.Platform.ObjectMapping;

public class PlatformAutoMapperProfile : Profile
{
    public PlatformAutoMapperProfile()
    {
        /* Create your AutoMapper object mappings here */
        CreateMap<CreateProjectDto, Project>();
        CreateMap<UpdateProjectDto, Project>();
        CreateMap<Project, ProjectDto>().ReverseMap();

        /* AutoMapper object mapping for ProjectBudget */
        CreateMap<CreateProjectBudgetDto, ProjectBudget>();
        CreateMap<UpdateProjectBudgetDto, ProjectBudget>();
        CreateMap<ProjectBudget, ProjectBudgetDto>().ReverseMap();

        /* AutoMapper object mapping for VersionHistory */
        CreateMap<CreateVersionHistoryDto, VersionHistory>();
        CreateMap<UpdateVersionHistoryDto, VersionHistory>();
        CreateMap<VersionHistory, VersionHistoryDto>().ReverseMap();

        /* AutoMapper object mapping for AuditHistory */
        CreateMap<CreateAuditHistoryDto, AuditHistory>();
        CreateMap<UpdateAuditHistoryDto, AuditHistory>();
        CreateMap<AuditHistory, AuditHistoryDto>().ReverseMap();

        /* AutoMapper object mapping for ProjectDescription */
        CreateMap<CreateProjectDescriptionDto, ProjectDescription>();
        CreateMap<UpdateProjectDescriptionDto, ProjectDescription>();
        CreateMap<ProjectDescription, ProjectDescriptionDto>().ReverseMap();

        /* AutoMapper object mapping for scope */
        CreateMap<CreateScopeDto, Scope>();
        CreateMap<UpdateScopeDto, Scope>();
        CreateMap<Scope, ScopeDto>().ReverseMap();

        /* AutoMapper object mapping for ProjectStack */
        CreateMap<CreateProjectStackDto, ProjectStack>();
        CreateMap<UpdateProjectStackDto, ProjectStack>();
        CreateMap<ProjectStack, ProjectStackDto>().ReverseMap();

        /* AutoMapper object mapping for EscalationMatrix */
        CreateMap<CreateEscalationMatrixDto, EscalationMatrix>();
        CreateMap<UpdateEscalationMatrixDto, EscalationMatrix>();
        CreateMap<EscalationMatrix, EscalationMatrixDto>().ReverseMap();

        /* AutoMapper object mapping for Stakeholder */
        CreateMap<CreateStakeholderDto, Stakeholder>();
        CreateMap<UpdateStakeholderDto, Stakeholder>();
        CreateMap<Stakeholder, StakeholderDto>().ReverseMap();

        /* AutoMapper object mapping for RiskProfile */
        CreateMap<CreateRiskProfileDto, RiskProfile>();
        CreateMap<UpdateRiskProfileDto, RiskProfile>();
        CreateMap<RiskProfile, RiskProfileDto>().ReverseMap();

        /* AutoMapper object mapping for PhaseMilestone */
        CreateMap<CreatePhaseMilestoneDto, PhaseMilestone>();
        CreateMap<UpdatePhaseMilestoneDto, PhaseMilestone>();
        CreateMap<PhaseMilestone, PhaseMilestoneDto>().ReverseMap();

        /* AutoMapper object mapping for Sprint*/
        CreateMap<CreateSprintDto, Sprint>();
        CreateMap<UpdateSprintDto, Sprint>();
        CreateMap<Sprint, SprintDto>().ReverseMap();

        /* AutoMapper object mapping for Detailed Timeline Reference*/
        CreateMap<CreateDetTimeRefDto, DetTimeRef>();
        CreateMap<UpdateDetTimeRefDto, DetTimeRef>();
        CreateMap<DetTimeRef, DetTimeRefDto>().ReverseMap();

        /* AutoMapper object mapping for Approved Team*/
        CreateMap<CreateApprovedTeamDto, ApprovedTeam>();
        CreateMap<UpdateApprovedTeamDto, ApprovedTeam>();
        CreateMap<ApprovedTeam, ApprovedTeamDto>().ReverseMap();

        /* AutoMapper object mapping for Project Resources*/
        CreateMap<CreateProjectResourcesDto, ProjectResources>();
        CreateMap<UpdateProjectResourcesDto, ProjectResources>();
        CreateMap<ProjectResources, ProjectResourcesDto>().ReverseMap();

        /* AutoMapper object mapping for Client Feedback*/
        CreateMap<CreateClientFeedbackDto, ClientFeedback>();
        CreateMap<UpdateClientFeedbackDto, ClientFeedback>();
        CreateMap<ClientFeedback, ClientFeedbackDto>().ReverseMap();

        /* AutoMapper object mapping for Project Updates*/
        CreateMap<CreateProjectUpdatesDto, ProjectUpdates>();
        CreateMap<UpdateProjectUpdatesDto, ProjectUpdates>();
        CreateMap<ProjectUpdates, ProjectUpdatesDto>().ReverseMap();

        /* AutoMapper object mapping for Project Updates*/
        CreateMap<CreateMeetingMinuteDto, MeetingMinute>();
        CreateMap<UpdateMeetingMinuteDto, MeetingMinute>();
        CreateMap<MeetingMinute, MeetingMinuteDto>().ReverseMap();
    }
}