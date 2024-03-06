using System;
using Volo.Abp.Domain.Entities.Auditing;

namespace Promact.CustomerSuccess.Platform.Entities
{
    public class Stakeholder : AuditedEntity<Guid>
    {
        public string Title { get; set; }
        public string Name { get; set; }
        public string Contact { get; set; }
        public string Email { get; set; }
    }
}
