using System.ComponentModel.DataAnnotations;

namespace Promact.CustomerSuccess.Platform.Services.Dtos
{
    public class CreateDetTimeRefDto
    {
        [Required]
        public string Link { get; set; }
    }
}
