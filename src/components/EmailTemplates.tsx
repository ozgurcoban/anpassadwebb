// For reference: https://ekomenyong.com/insights/nextjs-resend-contact-form

import React from 'react';

export type EmailTemplateProps = {
  name: string;
  email: string;
  website?: string;
  source?: string;
  selectedPackage?: string;
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
  selectedPackage,
  message,
}) => {
  const currentDate = new Date().toLocaleString("sv-SE", {
    timeZone: "Europe/Stockholm",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div style={{ fontFamily: "Arial, sans-serif", maxWidth: "600px", margin: "0 auto", backgroundColor: "#ffffff" }}>
      {/* Header with gradient */}
      <div style={{ 
        background: "linear-gradient(to right, #3B82F6, #A855F7, #EC4899)", 
        padding: "40px 20px", 
        textAlign: "center",
        borderRadius: "8px 8px 0 0"
      }}>
        <h1 style={{ 
          color: "#ffffff", 
          margin: "0 0 10px 0", 
          fontSize: "28px", 
          fontWeight: "bold",
          letterSpacing: "-0.5px"
        }}>
          Anpassad Webb
        </h1>
        <p style={{ 
          color: "#ffffff", 
          margin: "0", 
          fontSize: "16px", 
          opacity: "0.95" 
        }}>
          Skräddarsydda hemsidor som hjälper företag i Uppsala att växa online
        </p>
      </div>

      {/* Content */}
      <div style={{ padding: "40px 20px", backgroundColor: "#ffffff" }}>
        {/* Welcome message */}
        <div style={{ marginBottom: "30px" }}>
          <h2 style={{ 
            color: "#1a1a1a", 
            fontSize: "24px", 
            marginBottom: "16px",
            fontWeight: "600"
          }}>
            Hej {name}! 👋
          </h2>
          <p style={{ 
            color: "#4b5563", 
            fontSize: "16px", 
            lineHeight: "1.6",
            margin: "0 0 20px 0"
          }}>
            Tack för att du kontaktar oss! Vi uppskattar verkligen ditt intresse för våra tjänster.
          </p>
          <p style={{ 
            color: "#4b5563", 
            fontSize: "16px", 
            lineHeight: "1.6",
            margin: "0"
          }}>
            Vi har mottagit ditt meddelande och kommer att återkomma till dig inom kort. 
            Vanligtvis svarar vi inom 24 timmar på vardagar.
          </p>
        </div>

        {/* Selected Package */}
        {selectedPackage && (
          <div style={{ 
            backgroundColor: "#e0f2fe", 
            border: "1px solid #0284c7", 
            borderRadius: "8px", 
            padding: "20px",
            marginBottom: "30px"
          }}>
            <h3 style={{ 
              color: "#0369a1", 
              fontSize: "16px", 
              marginTop: "0",
              marginBottom: "8px",
              fontWeight: "600"
            }}>
              Ditt valda paket
            </h3>
            <p style={{ 
              color: "#0284c7", 
              fontSize: "18px", 
              fontWeight: "600",
              margin: "0"
            }}>
              {selectedPackage}
            </p>
          </div>
        )}

        {/* Message copy */}
        <div style={{ 
          backgroundColor: "#f9fafb", 
          border: "1px solid #e5e7eb", 
          borderRadius: "8px", 
          padding: "24px",
          marginBottom: "30px"
        }}>
          <h3 style={{ 
            color: "#374151", 
            fontSize: "18px", 
            marginTop: "0",
            marginBottom: "12px",
            fontWeight: "600"
          }}>
            Ditt meddelande:
          </h3>
          <p style={{ 
            color: "#4b5563", 
            fontSize: "15px", 
            lineHeight: "1.6",
            margin: "0",
            whiteSpace: "pre-wrap"
          }}>
            {message}
          </p>
          <p style={{
            color: "#9ca3af",
            fontSize: "13px",
            marginTop: "12px",
            marginBottom: "0",
            fontStyle: "italic"
          }}>
            Skickat: {currentDate}
          </p>
        </div>

        {/* What's next section */}
        <div style={{ 
          backgroundColor: "#eff6ff", 
          border: "1px solid #3b82f6", 
          borderRadius: "8px", 
          padding: "20px",
          marginBottom: "30px"
        }}>
          <h3 style={{ 
            color: "#1e40af", 
            fontSize: "16px", 
            marginTop: "0",
            marginBottom: "8px",
            fontWeight: "600"
          }}>
            Vad händer nu?
          </h3>
          <p style={{ 
            color: "#3730a3", 
            fontSize: "14px", 
            lineHeight: "1.6",
            margin: "0"
          }}>
            Vi går igenom ditt meddelande och återkommer med ett personligt svar. 
            Under tiden är du välkommen att utforska våra tidigare projekt eller läsa mer om våra tjänster på vår hemsida.
          </p>
        </div>

        {/* Closing */}
        <div style={{ textAlign: "center", marginTop: "40px" }}>
          <p style={{ 
            color: "#6b7280", 
            fontSize: "16px", 
            margin: "0 0 8px 0"
          }}>
            Vi ser fram emot att hjälpa dig!
          </p>
          <p style={{ 
            color: "#374151", 
            fontSize: "18px", 
            fontWeight: "600",
            margin: "0"
          }}>
            Teamet på Anpassad Webb
          </p>
        </div>
      </div>

      {/* Footer */}
      <div style={{ 
        backgroundColor: "#1a1a1a", 
        padding: "30px 20px", 
        textAlign: "center",
        borderRadius: "0 0 8px 8px"
      }}>
        <p style={{ 
          color: "#9ca3af", 
          fontSize: "14px", 
          margin: "0 0 8px 0" 
        }}>
          Detta är en automatisk bekräftelse från
        </p>
        <a 
          href="https://anpassadwebb.se" 
          style={{ 
            color: "#60a5fa", 
            textDecoration: "none",
            fontSize: "14px",
            fontWeight: "500"
          }}
        >
          www.anpassadwebb.se
        </a>
      </div>
    </div>
  );
};

export const AdminEmailTemplate: React.FC<EmailTemplateProps> = ({
  name,
  email,
  website,
  source,
  selectedPackage,
  message,
}) => {
  const currentDate = new Date().toLocaleString("sv-SE", {
    timeZone: "Europe/Stockholm",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

  const replySubject = `Re: Din förfrågan till Anpassad Webb`;
  const replyBody = `Hej ${name},

Tack för ditt meddelande!

[Skriv ditt svar här]

------ Ursprungligt meddelande ------
Datum: ${currentDate}
Från: ${name} <${email}>
${website ? `Hemsida: ${website}\n` : ''}${source ? `Hittade oss via: ${source}\n` : ''}${selectedPackage ? `Valt paket: ${selectedPackage}\n` : ''}
${message}`;

  const replyMailto = `mailto:${email}?subject=${encodeURIComponent(replySubject)}&body=${encodeURIComponent(replyBody)}`;

  return (
    <div style={{ fontFamily: "Arial, sans-serif", maxWidth: "600px", margin: "0 auto", backgroundColor: "#ffffff" }}>
      {/* Header */}
      <div style={{ backgroundColor: "#1a1a1a", color: "#ffffff", padding: "20px", textAlign: "center" }}>
        <h1 style={{ margin: "0", fontSize: "24px", fontWeight: "bold" }}>Anpassad Webb</h1>
        <p style={{ margin: "5px 0 0 0", fontSize: "14px", opacity: "0.8" }}>Nytt meddelande från kontaktformuläret</p>
      </div>

      {/* Alert Box */}
      <div style={{ backgroundColor: "#e0f2fe", border: "1px solid #0284c7", borderRadius: "8px", padding: "16px", margin: "20px" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ backgroundColor: "#0284c7", color: "#ffffff", borderRadius: "50%", width: "24px", height: "24px", display: "flex", alignItems: "center", justifyContent: "center", marginRight: "12px", fontSize: "14px", fontWeight: "bold" }}>!</div>
          <div>
            <h3 style={{ color: "#0369a1", margin: "0", fontSize: "16px", fontWeight: "600" }}>Ny kundförfrågan</h3>
            <p style={{ color: "#0369a1", margin: "4px 0 0 0", fontSize: "14px" }}>En potentiell kund har skickat ett meddelande via kontaktformuläret</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "0 20px 20px 20px" }}>
        {/* Customer Information */}
        <div style={{ backgroundColor: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: "8px", overflow: "hidden", marginBottom: "20px" }}>
          <div style={{ backgroundColor: "#f3f4f6", padding: "12px 16px", borderBottom: "1px solid #e5e7eb" }}>
            <h3 style={{ margin: "0", fontSize: "16px", fontWeight: "600", color: "#374151" }}>Kundinformation</h3>
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <tr>
              <td style={{ padding: "12px 16px", borderBottom: "1px solid #e5e7eb", fontWeight: "600", color: "#374151", width: "30%" }}>Namn</td>
              <td style={{ padding: "12px 16px", borderBottom: "1px solid #e5e7eb", color: "#6b7280" }}>{name}</td>
            </tr>
            <tr>
              <td style={{ padding: "12px 16px", borderBottom: "1px solid #e5e7eb", fontWeight: "600", color: "#374151" }}>E-post</td>
              <td style={{ padding: "12px 16px", borderBottom: "1px solid #e5e7eb", color: "#6b7280" }}>
                <a href={`mailto:${email}`} style={{ color: "#0284c7", textDecoration: "none" }}>{email}</a>
              </td>
            </tr>
            {website && (
              <tr>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid #e5e7eb", fontWeight: "600", color: "#374151" }}>Hemsida</td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid #e5e7eb", color: "#6b7280" }}>{website}</td>
              </tr>
            )}
            {source && (
              <tr>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid #e5e7eb", fontWeight: "600", color: "#374151" }}>Hittade oss via</td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid #e5e7eb", color: "#6b7280" }}>{source}</td>
              </tr>
            )}
            {selectedPackage && (
              <tr>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid #e5e7eb", fontWeight: "600", color: "#374151" }}>Valt paket</td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid #e5e7eb", color: "#6b7280", fontWeight: "600" }}>{selectedPackage}</td>
              </tr>
            )}
            <tr>
              <td style={{ padding: "12px 16px", fontWeight: "600", color: "#374151" }}>Datum & tid</td>
              <td style={{ padding: "12px 16px", color: "#6b7280" }}>{currentDate}</td>
            </tr>
          </table>
        </div>

        {/* Message */}
        <div style={{ backgroundColor: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: "8px", overflow: "hidden", marginBottom: "20px" }}>
          <div style={{ backgroundColor: "#f3f4f6", padding: "12px 16px", borderBottom: "1px solid #e5e7eb" }}>
            <h3 style={{ margin: "0", fontSize: "16px", fontWeight: "600", color: "#374151" }}>Meddelande</h3>
          </div>
          <div style={{ padding: "16px", color: "#374151", lineHeight: "1.6", whiteSpace: "pre-wrap" }}>
            {message}
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ textAlign: "center", marginTop: "30px" }}>
          <a
            href={replyMailto}
            style={{
              display: "inline-block",
              backgroundColor: "#0284c7",
              color: "#ffffff",
              padding: "12px 24px",
              borderRadius: "6px",
              textDecoration: "none",
              fontWeight: "600",
              marginRight: "12px",
              fontSize: "14px"
            }}
          >
            Svara kund
          </a>
          <a
            href={`mailto:${email}`}
            style={{
              display: "inline-block",
              backgroundColor: "#6b7280",
              color: "#ffffff",
              padding: "12px 24px",
              borderRadius: "6px",
              textDecoration: "none",
              fontWeight: "600",
              fontSize: "14px"
            }}
          >
            Kopiera e-post
          </a>
        </div>
      </div>

      {/* Footer */}
      <div style={{ backgroundColor: "#f9fafb", padding: "20px", textAlign: "center", borderTop: "1px solid #e5e7eb" }}>
        <p style={{ margin: "0", fontSize: "12px", color: "#6b7280" }}>
          Detta meddelande skickades automatiskt från kontaktformuläret på{" "}
          <a href="https://anpassadwebb.se" style={{ color: "#0284c7", textDecoration: "none" }}>
            anpassadwebb.se
          </a>
        </p>
      </div>
    </div>
  );
};
