using System.ComponentModel.DataAnnotations;

namespace Promact.CustomerSuccess.Platform.Services.Dtos
{
    public class UpdateProjectStackDto
    {
        [Required]
        public string Name { get; set; }
        public Guid ProjectId { get; set; }
    }
}
