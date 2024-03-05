using System.ComponentModel.DataAnnotations;

namespace Promact.CustomerSuccess.Platform.Services.Dtos
{
    public class UpdateScopeDto
    {
        [Required]
        public string Link { get; set; }
    }
}
