﻿using Promact.CustomerSuccess.Platform.Services.Dtos;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace Promact.CustomerSuccess.Platform.Services
{
    public interface ISprintService : ICrudAppService<
        SprintDto,
        Guid,
        PagedAndSortedResultRequestDto,
        CreateSprintDto,
        UpdateSprintDto>
    {
    }
}
