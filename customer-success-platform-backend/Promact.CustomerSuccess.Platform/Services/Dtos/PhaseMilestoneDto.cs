using System;
using System.Collections.Generic;
using Volo.Abp.Application.Dtos;

namespace Promact.CustomerSuccess.Platform.Services.Dtos
{
    public class PhaseMilestoneDto : IEntityDto<Guid>
    {
        public Guid  Id { get; set; }
        public Guid ProjectId { get; set; }
        public string Title { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public DateTime ApprovalDate { get; set; }
        public string Description { get; set; }
        public DateTime RevisedEndDate { get; set; }
        public MilestoneOrPhaseStatus Status { get; set; }
        public IEnumerable<ApprovedTeamDto>? ApprovedTeamDto { get; set; }
    }
}
