using System;
using Volo.Abp.Domain.Entities;

namespace Promact.CustomerSuccess.Platform.Entities
{
    public class ProjectDescription : Entity<Guid>
    {
        public required string Description { get; set; }
    }
}
