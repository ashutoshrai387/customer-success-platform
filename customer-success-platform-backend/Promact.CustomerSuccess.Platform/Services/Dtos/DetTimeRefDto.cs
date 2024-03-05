using System;
using Volo.Abp.Application.Dtos;

namespace Promact.CustomerSuccess.Platform.Services.Dtos
{
    public class DetTimeRefDto : AuditedEntityDto<Guid>
    {
        public string Link { get; set; }
    }
}
