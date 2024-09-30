'use server';

import { Resend } from 'resend';

export async function send() {
  const resend = new Resend(process.env.RESEND_API_KEY);

  const { data, error } = await resend.emails.send({
    from: 'Acme <onboarding@resend.dev>',
    to: ['delivered@resend.dev'],
    subject: 'Hello World',
    html: '<strong>It works!</strong>',
  });

  console.log(data);
}
