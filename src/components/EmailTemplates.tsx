// For reference: https://ekomenyong.com/insights/nextjs-resend-contact-form

export type EmailTemplateProps = {
  name: string;
  email: string;
  website?: string;
  source?: string;
  message: string;
};

export const ContactFormSubmissionEmail: React.FC<EmailTemplateProps> = ({
  name,
  email,
  website,
  source,
  message,
}) => (
  <div style={{ fontFamily: 'Arial, sans-serif', lineHeight: '1.6' }}>
    <h2>Meddelande från {name}</h2>
    <p>
      <strong>Email:</strong> {email}
    </p>
    {website && (
      <p>
        <strong>Hemsida:</strong> {website}
      </p>
    )}
    {source && (
      <p>
        <strong>Hittade oss via:</strong> {source}
      </p>
    )}
    <p>
      <strong>Meddelande:</strong>
    </p>
    <p>{message}</p>
  </div>
);

export const UserConfirmationEmail: React.FC<EmailTemplateProps> = ({
  name,
  message,
}) => (
  <div>
    <h2>Hej {name},</h2>
    <p>
      Tack för att du kontaktar oss på Anpassad Webb! Vi är glada att ha dig med oss.
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
