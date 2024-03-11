using System;
using Volo.Abp.Domain.Entities.Auditing;

namespace Promact.CustomerSuccess.Platform.Entities
{
    public class ProjectUpdates : AuditedEntity<Guid>
    {
        public DateTime Date { get; set; }
        public string GeneralUpdates { get; set; }
    }
}
