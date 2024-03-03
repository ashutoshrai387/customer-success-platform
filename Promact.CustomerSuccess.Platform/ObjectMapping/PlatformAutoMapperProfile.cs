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

    }
}
