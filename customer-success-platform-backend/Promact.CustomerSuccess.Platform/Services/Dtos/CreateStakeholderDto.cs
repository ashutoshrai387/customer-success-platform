using System;
using System.ComponentModel.DataAnnotations;

namespace Promact.CustomerSuccess.Platform.Services.Dtos
{
    public class CreateStakeholderDto
    {
        [Required]
        public string Title { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Contact { get; set; }
    }
}
