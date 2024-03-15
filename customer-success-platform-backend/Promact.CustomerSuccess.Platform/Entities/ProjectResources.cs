using System.ComponentModel.DataAnnotations.Schema;
using Volo.Abp.Domain.Entities.Auditing;

namespace Promact.CustomerSuccess.Platform.Entities
{
    public class ProjectResources : AuditedAggregateRootWithUser<Guid, ApplicationUser>
    {
        [ForeignKey("Project")]
        public Guid ProjectId { get; set; }
        public virtual Project? Project { get; set; }
        public string ResourceName { get; set; }
        public string Role { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        public string Comment { get; set; }
        public override object?[] GetKeys()
        {
            throw new NotImplementedException();
        }
    }
}