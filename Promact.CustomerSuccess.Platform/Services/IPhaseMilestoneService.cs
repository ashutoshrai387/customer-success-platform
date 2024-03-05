﻿using Promact.CustomerSuccess.Platform.Services.Dtos;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace Promact.CustomerSuccess.Platform.Services
{
    public interface IPhaseMilestoneService : ICrudAppService<
        PhaseMilestoneDto,
        Guid,
        PagedAndSortedResultRequestDto,
        CreatePhaseMilestoneDto,
        UpdatePhaseMilestoneDto>
    {
    }
}
