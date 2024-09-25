import { NextRequest, NextResponse } from 'next/server';
import { EmailTemplate } from '@/components/form/EmailTemplate';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
console.log('resend', resend);

export async function POST(req: NextRequest) {
  // Chef if the request are present

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

    const { data, error } = await resend.emails.send({
      from: 'Özbyte <contact@ozbyte.se>',
      to: `${email}`,
      subject: `${name} har skickat ett meddelande till Özbyte`,
      react: EmailTemplate({
        name,
        business,
        email,
        message,
        marketingSource,
        otherSource,
      }) as React.ReactElement,
    });

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
