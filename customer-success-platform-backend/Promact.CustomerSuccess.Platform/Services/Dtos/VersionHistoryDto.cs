using System;
using Volo.Abp.Application.Dtos;

namespace Promact.CustomerSuccess.Platform.Services.Dtos
{
    public class VersionHistoryDto : AuditedEntityDto<Guid>
    {
        public required string Version { get; set; }
        public required string Type { get; set; }
        public required string Change { get; set; }
        public required string ChangeReason { get; set; }
        public required string CreatedBy { get; set; }
        public DateTime RevisionDate { get; set; }
        public DateTime? ApprovalDate { get; set; }
        public required string ApprovedBy { get; set; }
        public Guid ProjectId { get; set; }
    }
}
