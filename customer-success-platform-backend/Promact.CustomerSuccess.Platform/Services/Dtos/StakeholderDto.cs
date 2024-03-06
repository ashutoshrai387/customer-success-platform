using System;
using Volo.Abp.Application.Dtos;

namespace Promact.CustomerSuccess.Platform.Services.Dtos
{
    public class StakeholderDto : AuditedEntityDto<Guid>
    {
        public string Title { get; set; }
        public string Name { get; set; }
        public string Contact { get; set; }
        public string Email { get; set; }
    }
}
