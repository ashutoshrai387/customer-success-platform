using System.ComponentModel.DataAnnotations;

namespace Promact.CustomerSuccess.Platform.Services.Dtos
{
    public class UpdateDetTimeRefDto
    {
        [Required]
        public string Link { get; set; }
    }
}
