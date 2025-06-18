import { NextRequest, NextResponse } from 'next/server';
import {
  ContactFormSubmissionEmail,
  UserConfirmationEmail,
} from '@/components/EmailTemplates';
import { Resend } from 'resend';

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  console.log('resend', resend);

  try {
    const { name, business, email, message, marketingSource, otherSource } =
      await req.json();

    console.log('Received data:', {
      name,
      business,
      email,
      message,
      marketingSource,
      otherSource,
    });

    // Skapa två e-postmeddelanden som ska skickas samtidigt
    const emailToAdmin = resend.emails.send({
      from: 'Özbyte <contact@ozbyte.se>',
      to: 'contact@ozbyte.se', // Ändra till administratörens e-postadress
      subject: `${name} har skickat ett meddelande till Özbyte`,
      react: ContactFormSubmissionEmail({
        name,
        business,
        email,
        message,
        marketingSource,
        otherSource,
      }) as React.ReactElement<any>,
    });

    const emailToUser = resend.emails.send({
      from: 'Özbyte <contact@ozbyte.se>',
      to: `${email}`,
      subject: 'Bekräftelse på din förfrågan',
      react: UserConfirmationEmail({
        name,
        email,
        message,
      }) as React.ReactElement<any>,
    });

    // Använd Promise.allSettled för att vänta på att båda e-postmeddelandena skickas
    const results = await Promise.allSettled([emailToAdmin, emailToUser]);

    // Kontrollera om någon av e-postmeddelandena misslyckades att skickas
    const errors = results.filter((result) => result.status === 'rejected');

    if (errors.length > 0) {
      console.error('Error sending emails:', errors);
      return NextResponse.json(
        { message: 'Fel vid skickande av e-post' },
        { status: 500 },
      );
    }

    return NextResponse.json(
      { message: 'E-postmeddelanden skickade' },
      { status: 200 },
    );
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json({ error: 'Serverfel' }, { status: 500 });
  }
}
