using Microsoft.AspNetCore.Mvc;
using Promact.CustomerSuccess.Platform.Services;
using Promact.CustomerSuccess.Platform.Services.Dtos;

namespace Promact.CustomerSuccess.Platform.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmailNotificationController : ControllerBase
    {
        private readonly IEmailNotificationService _emailNotificationService;
        public EmailNotificationController(IEmailNotificationService emailNotificationService)
        {
            _emailNotificationService = emailNotificationService;
        }
        [HttpPost]
        public IActionResult SendEmail([FromBody] EmailDto data)
        {
            _emailNotificationService.SendEmail(data);
            return Ok();
        }
    }
}