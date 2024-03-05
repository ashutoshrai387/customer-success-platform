using System;
using Volo.Abp.Domain.Entities;

namespace Promact.CustomerSuccess.Platform.Entities
{
    public class Scope : Entity<Guid>
    {
        public string Link { get; set; }
    }
}
