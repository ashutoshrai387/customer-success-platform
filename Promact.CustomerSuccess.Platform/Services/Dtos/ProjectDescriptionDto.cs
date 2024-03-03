using System;
using Volo.Abp.Application.Dtos;

namespace Promact.CustomerSuccess.Platform.Services.Dtos
{
    public class ProjectDescriptionDto : EntityDto<Guid>
    {
        public string Description { get; set; }
    }
}
