using Promact.CustomerSuccess.Platform.Services.Dtos;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace Promact.CustomerSuccess.Platform.Services
{
    public interface IProjectUpdatesService : ICrudAppService<
        ProjectUpdatesDto,
        Guid,
        PagedAndSortedResultRequestDto,
        CreateProjectUpdatesDto,
        UpdateProjectUpdatesDto>
    {
    }
}
