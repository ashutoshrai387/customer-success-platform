using System;
using Volo.Abp.Application.Dtos;

namespace Promact.CustomerSuccess.Platform.Services.Dtos
{
    public class ProjectStackDto : EntityDto<Guid>
    {
        public string Name { get; set; }
        public Guid ProjectId { get; set; }
    }
}
