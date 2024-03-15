using System;
using Volo.Abp.Application.Dtos;

namespace Promact.CustomerSuccess.Platform.Services.Dtos
{
    public class ScopeDto : EntityDto<Guid>
    {
        public string Link { get; set; }
        public Guid ProjectId { get; set; }
    }
}
