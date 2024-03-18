using Promact.CustomerSuccess.Platform.Services.Dtos;

namespace Promact.CustomerSuccess.Platform.Services
{
    public interface IEmailNotificationService
    {
        void SendEmail(EmailDto data);
    }
}
