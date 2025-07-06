import { NextRequest, NextResponse } from 'next/server';
import {
  AdminEmailTemplate,
  UserConfirmationEmail,
} from '@/components/EmailTemplates';
import { Resend } from 'resend';

// Map source values to readable labels
const getSourceLabel = (source?: string): string | undefined => {
  const sourceMap: Record<string, string> = {
    'google': 'Google-sökning',
    'recommendation': 'Rekommendation',
    'ai': 'ChatGPT/AI',
    'social': 'Sociala medier',
    'website': 'Annan webbsida',
    'other': 'Annat'
  };
  return source ? sourceMap[source] || source : undefined;
};

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const { name, email, website, source, selectedPackage, message } =
      await req.json();

    // Skapa två e-postmeddelanden som ska skickas samtidigt
    const emailToAdmin = resend.emails.send({
      from: 'Anpassad Webb <info@anpassadwebb.se>',
      to: 'info@anpassadwebb.se', // Ändra till administratörens e-postadress
      subject: `Nytt meddelande från ${name} - Anpassad Webb`,
      react: AdminEmailTemplate({
        name,
        email,
        website,
        source: getSourceLabel(source),
        selectedPackage,
        message,
      }) as React.ReactElement<any>,
    });

    const emailToUser = resend.emails.send({
      from: 'Anpassad Webb <info@anpassadwebb.se>',
      to: `${email}`,
      subject: 'Bekräftelse på din förfrågan',
      react: UserConfirmationEmail({
        name,
        email,
        selectedPackage,
        message,
      }) as React.ReactElement<any>,
    });

    // Skicka e-post individuellt och kolla resultat
    const [adminResult, userResult] = await Promise.all([emailToAdmin, emailToUser]);

    // Kolla om något mail misslyckades
    let adminError = false;
    let userError = false;

    if ('error' in adminResult && adminResult.error) {
      adminError = true;
    }
    if ('error' in userResult && userResult.error) {
      userError = true;
    }

    // Om admin-mail misslyckades men användar-mail gick igenom
    if (adminError && !userError) {
      return NextResponse.json(
        { 
          message: 'Bekräftelsemail skickat men administratörsnotifikation misslyckades',
          warning: true 
        },
        { status: 200 },
      );
    }

    // Om båda misslyckades
    if (adminError && userError) {
      return NextResponse.json(
        { message: 'Kunde inte skicka e-post' },
        { status: 500 },
      );
    }

    // Allt gick bra
    return NextResponse.json(
      { 
        message: 'E-postmeddelanden skickade',
        adminEmailId: 'id' in adminResult ? adminResult.id : null,
        userEmailId: 'id' in userResult ? userResult.id : null
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ error: 'Serverfel' }, { status: 500 });
  }
}
