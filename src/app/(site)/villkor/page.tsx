import { Separator } from '@/components/ui/separator';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Allmänna Villkor',
  description:
    'Läs våra allmänna villkor för användning av denna webbplats och hur vi hanterar dina personuppgifter när du fyller i våra formulär.',
  robots: 'noindex, nofollow',
};

const TermsPage = () => {
  return (
    <article className="mx-auto min-h-svh max-w-2xl space-y-4 p-4">
      <h3 className="font-bold">
        Allmänna Villkor för Personuppgiftshantering (GDPR)
      </h3>
      <p>
        Vi värnar om din personliga integritet och är transparenta med hur vi
        hanterar dina uppgifter. Nedan hittar du en sammanfattning av våra
        villkor gällande personuppgiftshantering i enlighet med GDPR.
      </p>
      <ol className="list-inside list-decimal space-y-4 marker:font-bold">
        <li>
          <strong>Vilka uppgifter vi samlar in</strong>
          <ul className="ml-2 mt-2 list-inside list-disc space-y-4">
            <li>
              Kontaktinformation: När du fyller i vårt kontaktformulär samlar vi
              in namn, e-postadress och eventuellt företagsnamn.
            </li>
            <li>
              Meddelandeinnehåll: Vi samlar också in det meddelande som du
              skickar till oss.
            </li>
          </ul>
        </li>
        <li>
          <strong>Syftet med insamlingen</strong>
          <ul className="ml-2 mt-2 list-inside list-disc space-y-4 marker:ml-0">
            <li>
              Vi samlar endast in personuppgifter för att kunna besvara dina
              frågor och hantera ditt ärende.
            </li>
            <li>
              Vi använder inte dina uppgifter för marknadsföring och delar
              aldrig dina uppgifter med tredje part.
            </li>
          </ul>
        </li>
        <li>
          <strong>Hur länge vi sparar dina uppgifter</strong>
          <ul className="ml-2 mt-2 list-inside list-disc space-y-4">
            <li>
              Dina personuppgifter lagras endast så länge som det är nödvändigt
              för att hantera din fråga eller ditt ärende. Efter att ditt ärende
              är avslutat, raderas dina uppgifter.
            </li>
          </ul>
        </li>
        <li>
          <strong>Dina rättigheter</strong>
          <ul className="ml-2 mt-2 list-inside list-disc">
            <li>
              Åtkomst: Du har rätt att begära åtkomst till de personuppgifter vi
              har om dig.
            </li>
            <li>
              Radering: Du kan begära att vi raderar dina personuppgifter
              närsomhelst.
            </li>
            <li>
              Korrigering: Om du upptäcker att någon uppgift är felaktig har du
              rätt att begära en korrigering.
            </li>
          </ul>
        </li>
        <li>
          <strong>Hur vi skyddar dina uppgifter</strong>
          <ul className="ml-2 mt-2 list-inside list-disc">
            <li>
              Om du har några frågor om hur vi hanterar dina personuppgifter,
              eller om du vill utöva någon av dina rättigheter, vänligen
              kontakta oss via vårt kontaktformulär.
            </li>
          </ul>
        </li>
      </ol>
      <Separator className="my-8" />
      <aside>
        <strong>Kort sammanfattning:</strong>
        <ul className="ml-2 mt-2 list-inside list-disc space-y-2">
          <li>
            Vi samlar bara in den information som krävs för att kunna besvara
            ditt meddelande.
          </li>
          <li>
            Vi använder inte uppgifterna för marknadsföringssyfte och delar dem
            aldrig med andra.
          </li>
          <li>
            Du har rätt till åtkomst, korrigering och radering av dina
            uppgifter.
          </li>
        </ul>
      </aside>
    </article>
  );
};
export default TermsPage;
