using System;
using Volo.Abp.Domain.Entities;

namespace Promact.CustomerSuccess.Platform.Entities
{
    public class ProjectStack : Entity<Guid>
    {
        public string Name { get; set; }
    }
}
