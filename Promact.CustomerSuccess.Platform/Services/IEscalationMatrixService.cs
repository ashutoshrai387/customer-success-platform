using Promact.CustomerSuccess.Platform.Services.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Application.Dtos;

namespace Promact.CustomerSuccess.Platform.Services
{
    public interface IEscalationMatrixService : ICrudAppService<
        EscalationMatrixDto,
        Guid,
        PagedAndSortedResultRequestDto,
        CreateEscalationMatrixDto,
        UpdateEscalationMatrixDto>
    {
    }
}
