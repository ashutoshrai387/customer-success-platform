using System.ComponentModel.DataAnnotations;

namespace Promact.CustomerSuccess.Platform.Services.Dtos
{
    public class CreateProjectStackDto
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public Guid ProjectId { get; set; }
    }
}
