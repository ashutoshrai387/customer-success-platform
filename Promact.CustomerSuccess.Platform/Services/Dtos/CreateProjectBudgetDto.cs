using System;
using System.ComponentModel.DataAnnotations;

namespace Promact.CustomerSuccess.Platform.Services.Dtos
{
    public class CreateProjectBudgetDto
    {
        public ProjectType Type { get; set; }
        public int? DurationInMonths { get; set; }
        public int? ContractDuration { get; set; }
        public int? BudgetedHours { get; set; }
        [Required]
        public double BudgetedCost { get; set; }
        [Required]
        public required string Currency { get; set; }
        [Required]
        public Guid ProjectId { get; set; }
    }
}
