using System;
using Volo.Abp.Domain.Entities;
using System.ComponentModel.DataAnnotations.Schema;

namespace Promact.CustomerSuccess.Platform.Entities
{
    public class Scope : Entity<Guid>
    {
        public string Link { get; set; }

        [ForeignKey(nameof(Project))]
        public Guid ProjectId { get; set; }
        public virtual Project? Project { get; set; }
    }
}
