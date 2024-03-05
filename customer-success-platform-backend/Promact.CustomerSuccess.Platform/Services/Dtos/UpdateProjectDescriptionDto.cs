using System.ComponentModel.DataAnnotations;

namespace Promact.CustomerSuccess.Platform.Services.Dtos
{
    public class UpdateProjectDescriptionDto
    {
        [Required]
        public string Description { get; set; }
    }
}
