using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Volo.Abp.Domain.Entities.Auditing;

namespace Promact.CustomerSuccess.Platform.Entities
{
    public class AuditHistory : AuditedAggregateRoot<Guid>
    {
        public DateTime DateOfAudit { get; set; }
        public string ReviewedBy { get; set; }
        public string Status { get; set; }
        public string ReviewedSection { get; set; }
        public string CommentQueries { get; set; }
        public string ActionItem { get; set; }
        [ForeignKey(nameof(Project))]
        public Guid ProjectId { get; set; }
        public virtual Project? Project { get; set; }
    }
}
