using Promact.CustomerSuccess.Platform.Entities;
using Promact.CustomerSuccess.Platform.Services.Dtos;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;

namespace Promact.CustomerSuccess.Platform.Services
{
    public class ProjectStackService :
        CrudAppService<ProjectStack,
            ProjectStackDto,
            Guid,
            PagedAndSortedResultRequestDto,
            CreateProjectStackDto,
            UpdateProjectStackDto>,
        IProjectStackService
    {
        public ProjectStackService(IRepository<ProjectStack, Guid> projectStackRepository) :
            base(projectStackRepository)
        {
        }
    }
}
