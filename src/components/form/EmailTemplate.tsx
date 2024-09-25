// For reference: https://ekomenyong.com/insights/nextjs-resend-contact-form

import React from 'react';

type EmailTemplateProps = {
  name: string;
  business?: string;
  email: string;
  message: string;
  marketingSource?: string;
  otherSource?: string;
};

export const EmailTemplate: React.FC<EmailTemplateProps> = ({
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
