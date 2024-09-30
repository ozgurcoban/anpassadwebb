// For reference: https://ekomenyong.com/insights/nextjs-resend-contact-form

export type EmailTemplateProps = {
  name: string;
  business?: string;
  email: string;
  message: string;
  marketingSource?: string;
  otherSource?: string;
};

export const ContactFormSubmissionEmail: React.FC<EmailTemplateProps> = ({
  name,
  business,
  email,
  message,
  marketingSource,
  otherSource,
}) => (
  <div style={{ fontFamily: 'Arial, sans-serif', lineHeight: '1.6' }}>
    <h2>Meddelande från {name}</h2>
    <p>
      <strong>Företag:</strong> {business || 'N/A'}
    </p>
    <p>
      <strong>Email:</strong> {email}
    </p>
    <p>
      <strong>Meddelande:</strong>
    </p>
    <p>{message}</p>
    {marketingSource && (
      <p>
        <strong>Marknadsföringskälla:</strong> {marketingSource}
      </p>
    )}
    {otherSource && (
      <p>
        <strong>Andra källor:</strong> {otherSource}
      </p>
    )}
  </div>
);

export const UserConfirmationEmail: React.FC<EmailTemplateProps> = ({
  name,
  message,
}) => (
  <div>
    <h2>Hej {name},</h2>
    <p>
      Tack för att du kontaktar oss på Özbyte! Vi är glada att ha dig med oss.
    </p>
    <p>
      Vi har mottagit ditt meddelande och kommer att svara så snart som möjligt.
    </p>
    <p>Här är en kopia av ditt meddelande:</p>
    <p>{message}</p>
    <p>
      Om du har några frågor eller funderingar, tveka inte att kontakta oss på
    </p>
  </div>
);
