using System;
using Volo.Abp.Domain.Entities.Auditing;

namespace Promact.CustomerSuccess.Platform.Entities
{
    public class DetTimeRef : AuditedEntity<Guid>
    {
        public string Link { get; set; }

    }
}
