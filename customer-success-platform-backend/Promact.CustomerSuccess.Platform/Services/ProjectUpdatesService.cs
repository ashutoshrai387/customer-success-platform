using Promact.CustomerSuccess.Platform.Entities;
using Promact.CustomerSuccess.Platform.Services.Dtos;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;

namespace Promact.CustomerSuccess.Platform.Services
{
    public class ProjectUpdatesService :
        CrudAppService<ProjectUpdates,
            ProjectUpdatesDto,
            Guid,
            PagedAndSortedResultRequestDto,
            CreateProjectUpdatesDto,
            UpdateProjectUpdatesDto>,
        IProjectUpdatesService
    {
        public ProjectUpdatesService(IRepository<ProjectUpdates, Guid> projectUpdatesRepository) :
            base(projectUpdatesRepository)
        {
        }
    }
}
