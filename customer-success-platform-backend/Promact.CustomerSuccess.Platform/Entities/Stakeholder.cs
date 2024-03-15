using System;
using System.ComponentModel.DataAnnotations.Schema;
using Volo.Abp.Domain.Entities;

namespace Promact.CustomerSuccess.Platform.Entities
{
    public class Stakeholder : Entity<Guid>
    {
        public string Title { get; set; }
        public string Name { get; set; }
        public string Contact { get; set; }
        public string Email { get; set; }

        [ForeignKey(nameof(Project))]
        public Guid ProjectId { get; set; }
        public virtual Project? Project { get; set; }
    }
}
