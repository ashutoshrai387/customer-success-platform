using System.ComponentModel.DataAnnotations;

namespace Promact.CustomerSuccess.Platform.Services.Dtos
{
    public class CreateScopeDto
    {
        [Required]
        public string Link { get; set; }
    }
}
