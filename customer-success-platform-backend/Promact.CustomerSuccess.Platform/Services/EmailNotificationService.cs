using Promact.CustomerSuccess.Platform.Services.Dtos;
using MailKit.Net.Smtp;
using MimeKit;

namespace Promact.CustomerSuccess.Platform.Services
{
    public class EmailNotificationService : IEmailNotificationService
    {
        private readonly IConfiguration _config;

        public EmailNotificationService(IConfiguration config)
        {
            _config = config;
        }

        public void SendEmail(EmailDto data)
        {
            string receiverEmail = data.email;
            string emailContent = data.content;
            string emailSubject = data.subject;

            var email = new MimeMessage();
            var senderName = _config.GetSection("Sendername").Value;
            var senderEmailAddress = _config.GetSection("EmailUsername").Value;
            var senderAddress = new MailboxAddress(senderName, senderEmailAddress);
            email.From.Add(senderAddress);
            email.To.Add(MailboxAddress.Parse(receiverEmail));
            email.Subject = emailSubject;

            email.Body = new TextPart(MimeKit.Text.TextFormat.Plain)
            {
                Text = emailContent
            };

            using var smtp = new SmtpClient();
            smtp.Connect(_config.GetSection("EmailHost").Value, 587, MailKit.Security.SecureSocketOptions.StartTls);
            smtp.Authenticate(_config.GetSection("EmailUsername").Value, _config.GetSection("EmailPassword").Value);
            smtp.Send(email);
            smtp.Disconnect(true);
        }
    }
}
