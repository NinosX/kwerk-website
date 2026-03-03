import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { contactFormSchema } from '@/lib/validation';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const result = contactFormSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: result.error.flatten() },
        { status: 400 },
      );
    }

    const data = result.data;

    const emailTo = process.env.CONTACT_EMAIL_TO || 'contact@kwerk.fr';

    await resend.emails.send({
      from: 'KWERK Website <onboarding@resend.dev>',
      to: emailTo,
      subject: `Nouvelle demande de contact - ${data.company}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1a1a1a; border-bottom: 2px solid #c8a96e; padding-bottom: 10px;">
            Nouvelle demande de contact
          </h2>

          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <tr>
              <td style="padding: 8px 0; color: #6b6b6b; width: 160px;">Nom</td>
              <td style="padding: 8px 0; font-weight: bold;">${data.firstName} ${data.lastName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6b6b6b;">Email</td>
              <td style="padding: 8px 0;"><a href="mailto:${data.email}">${data.email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6b6b6b;">Telephone</td>
              <td style="padding: 8px 0;"><a href="tel:${data.phone}">${data.phone}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6b6b6b;">Societe</td>
              <td style="padding: 8px 0;">${data.company}</td>
            </tr>
            ${data.positions ? `
            <tr>
              <td style="padding: 8px 0; color: #6b6b6b;">Nb postes</td>
              <td style="padding: 8px 0;">${data.positions}</td>
            </tr>
            ` : ''}
            <tr>
              <td style="padding: 8px 0; color: #6b6b6b;">Type</td>
              <td style="padding: 8px 0;">${data.type}</td>
            </tr>
            ${data.source ? `
            <tr>
              <td style="padding: 8px 0; color: #6b6b6b;">Source</td>
              <td style="padding: 8px 0;">${data.source}</td>
            </tr>
            ` : ''}
          </table>

          <div style="background: #f5f3ef; padding: 16px; border-radius: 4px; margin-top: 20px;">
            <p style="color: #6b6b6b; margin: 0 0 8px 0; font-size: 14px;">Message :</p>
            <p style="margin: 0; white-space: pre-wrap;">${data.message}</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 },
    );
  }
}
