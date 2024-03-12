using System;
using Volo.Abp.Application.Dtos;

namespace Promact.CustomerSuccess.Platform.Services.Dtos
{
    public class AuditHistoryDto : AuditedEntityDto<Guid>
    {
        public DateTime DateOfAudit { get; set; }
        public required string ReviewedBy { get; set; }
        public required string Status { get; set; }
        public required string ReviewedSection { get; set; }
        public required string CommentQueries { get; set; }
        public required string ActionItem { get; set; }
        public Guid ProjectId { get; set; }
    }
}
