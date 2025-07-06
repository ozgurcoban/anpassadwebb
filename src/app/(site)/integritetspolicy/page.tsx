import { Separator } from '@/components/ui/separator';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Integritetspolicy',
  description:
    'Läs vår integritetspolicy för att förstå hur vi samlar in, använder och skyddar dina personuppgifter i enlighet med GDPR.',
  robots: 'noindex, nofollow',
};

const PrivacyPolicyPage = () => {
  return (
    <article className="mx-auto min-h-svh max-w-2xl space-y-6 p-4">
      <header className="space-y-4">
        <h1 className="text-3xl font-bold">Integritetspolicy</h1>
        <p className="text-muted-foreground">
          Senast uppdaterad: {new Date().toLocaleDateString('sv-SE')}
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">1. Inledning</h2>
        <p>
          Anpassad Webb värnar om din personliga integritet. Denna integritetspolicy beskriver hur vi samlar in, 
          använder och skyddar dina personuppgifter när du besöker vår webbplats anpassadwebb.se.
        </p>
        <p>
          Personuppgiftsansvarig: Anpassad Webb<br />
          E-post: info@anpassadwebb.se<br />
          Adress: Uppsala, Sverige
        </p>
      </section>

      <Separator className="my-8" />

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">2. Vilka uppgifter vi samlar in</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold">2.1 Uppgifter du ger oss</h3>
            <ul className="ml-6 mt-2 list-disc space-y-2">
              <li>Namn och e-postadress när du fyller i kontaktformulär</li>
              <li>Företagsnamn (om tillämpligt)</li>
              <li>Meddelanden du skickar till oss</li>
              <li>Annan information du frivilligt delar med oss</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold">2.2 Uppgifter vi samlar in automatiskt</h3>
            <ul className="ml-6 mt-2 list-disc space-y-2">
              <li>Geografisk plats (stad/region - baserat på anonymiserad IP-adress)</li>
              <li>Webbläsartyp och version</li>
              <li>Operativsystem</li>
              <li>Besökta sidor och klickbeteende</li>
              <li>Datum och tid för besök</li>
              <li>Hänvisande webbplats</li>
            </ul>
          </div>
        </div>
      </section>

      <Separator className="my-8" />

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">3. Google Analytics 4</h2>
        <p>
          Vi använder Google Analytics 4 för att förstå hur besökare använder vår webbplats. 
          Google Analytics samlar in information anonymt och rapporterar webbplatstrender utan 
          att identifiera enskilda besökare.
        </p>
        <ul className="ml-6 list-disc space-y-2">
          <li>IP-adresser anonymiseras automatiskt - GA4 lagrar aldrig fullständiga IP-adresser</li>
          <li>Endast geografisk data på stad/region-nivå sparas</li>
          <li>Data lagras på Googles servrar och omfattas av Googles integritetspolicy</li>
          <li>Vi har aktiverat dataminimering för att endast samla in nödvändig data</li>
          <li>Bevarandetid för data är satt till 14 månader</li>
        </ul>
      </section>

      <Separator className="my-8" />

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">4. Google Search Console</h2>
        <p>
          Vi använder Google Search Console för att övervaka och underhålla vår webbplats närvaro 
          i Googles sökresultat. Detta verktyg hjälper oss att:
        </p>
        <ul className="ml-6 list-disc space-y-2">
          <li>Förstå vilka söktermer som leder besökare till vår webbplats</li>
          <li>Identifiera tekniska problem som kan påverka användarupplevelsen</li>
          <li>Optimera webbplatsens synlighet i sökresultat</li>
        </ul>
      </section>

      <Separator className="my-8" />

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">5. Cookies och spårningstekniker</h2>
        <p>
          Vår webbplats använder cookies för att förbättra din upplevelse. Cookies är små textfiler 
          som lagras på din enhet.
        </p>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold">Typer av cookies vi använder:</h3>
            <ul className="ml-6 mt-2 list-disc space-y-2">
              <li><strong>Nödvändiga cookies:</strong> Krävs för webbplatsens grundläggande funktioner inklusive sessionshantering, säkerhet och tema-preferenser</li>
              <li><strong>Analytiska cookies:</strong> Google Analytics 4 för att förstå hur webbplatsen används (kräver ditt samtycke)</li>
            </ul>
          </div>
        </div>
      </section>

      <Separator className="my-8" />

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">6. Hur vi använder dina uppgifter</h2>
        <p>Vi använder insamlade uppgifter för att:</p>
        <ul className="ml-6 list-disc space-y-2">
          <li>Besvara dina förfrågningar och kommunicera med dig</li>
          <li>Förbättra vår webbplats och våra tjänster</li>
          <li>Analysera webbplatsens prestanda och användningsmönster</li>
          <li>Säkerställa webbplatsens säkerhet och funktionalitet</li>
          <li>Uppfylla juridiska skyldigheter</li>
        </ul>
      </section>

      <Separator className="my-8" />

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">7. Delning av information</h2>
        <p>
          Vi säljer eller hyr aldrig ut dina personuppgifter. Vi kan dela information med:
        </p>
        <ul className="ml-6 list-disc space-y-2">
          <li><strong>Google Analytics:</strong> För webbplatsanalys (anonymiserad data)</li>
          <li><strong>Myndigheter:</strong> Om det krävs enligt lag</li>
          <li><strong>Tjänsteleverantörer:</strong> Som hjälper oss driva vår verksamhet (under sekretessavtal)</li>
        </ul>
      </section>

      <Separator className="my-8" />

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">8. Dina rättigheter enligt GDPR</h2>
        <p>Du har följande rättigheter gällande dina personuppgifter:</p>
        <ul className="ml-6 list-disc space-y-2">
          <li><strong>Rätt till tillgång:</strong> Begära en kopia av dina personuppgifter</li>
          <li><strong>Rätt till rättelse:</strong> Korrigera felaktiga uppgifter</li>
          <li><strong>Rätt till radering:</strong> Begära att vi raderar dina uppgifter</li>
          <li><strong>Rätt till begränsning:</strong> Begränsa hur vi behandlar dina uppgifter</li>
          <li><strong>Rätt till dataportabilitet:</strong> Få dina uppgifter i ett strukturerat format</li>
          <li><strong>Rätt att göra invändningar:</strong> Invända mot viss behandling</li>
          <li><strong>Rätt att återkalla samtycke:</strong> När behandling baseras på samtycke</li>
        </ul>
        <p className="mt-4">
          För att utöva dina rättigheter, kontakta oss på info@anpassadwebb.se
        </p>
      </section>

      <Separator className="my-8" />

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">9. Hur du kan välja bort spårning</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold">Välja bort Google Analytics:</h3>
            <ul className="ml-6 mt-2 list-disc space-y-2">
              <li>
                Installera{' '}
                <a 
                  href="https://tools.google.com/dlpage/gaoptout" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary underline"
                >
                  Google Analytics Opt-out Browser Add-on
                </a>
              </li>
              <li>Aktivera &quot;Do Not Track&quot; i din webbläsare</li>
              <li>Blockera cookies i dina webbläsarinställningar</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold">Hantera cookies:</h3>
            <p>
              De flesta webbläsare låter dig kontrollera cookies genom inställningarna. 
              Observera att blockering av cookies kan påverka webbplatsens funktionalitet.
            </p>
          </div>
        </div>
      </section>

      <Separator className="my-8" />

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">10. Datasäkerhet</h2>
        <p>
          Vi vidtar lämpliga tekniska och organisatoriska åtgärder för att skydda dina personuppgifter 
          mot obehörig åtkomst, ändring, avslöjande eller förstörelse. Detta inkluderar:
        </p>
        <ul className="ml-6 list-disc space-y-2">
          <li>SSL-kryptering för all dataöverföring</li>
          <li>Begränsad åtkomst till personuppgifter</li>
          <li>Regelbundna säkerhetsuppdateringar</li>
          <li>Säker lagring av data</li>
        </ul>
      </section>

      <Separator className="my-8" />

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">11. Barn</h2>
        <p>
          Vår webbplats är inte riktad till barn under 16 år. Vi samlar inte medvetet in 
          personuppgifter från barn under 16 år. Om du är förälder eller vårdnadshavare och 
          upptäcker att ditt barn har lämnat personuppgifter till oss, vänligen kontakta oss.
        </p>
      </section>

      <Separator className="my-8" />

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">12. Ändringar i denna policy</h2>
        <p>
          Vi kan uppdatera denna integritetspolicy från tid till annan. Vid väsentliga ändringar 
          kommer vi att meddela detta på vår webbplats. Vi uppmuntrar dig att regelbundet granska 
          denna sida för att hålla dig informerad om hur vi skyddar dina uppgifter.
        </p>
      </section>

      <Separator className="my-8" />

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">13. Kontakta oss</h2>
        <p>
          Om du har frågor om denna integritetspolicy eller hur vi hanterar dina personuppgifter, 
          vänligen kontakta oss:
        </p>
        <div className="rounded-lg bg-muted p-4">
          <p><strong>Anpassad Webb</strong></p>
          <p>E-post: info@anpassadwebb.se</p>
          <p>Adress: Uppsala, Sverige</p>
        </div>
      </section>

      <Separator className="my-8" />

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">14. Tillsynsmyndighet</h2>
        <p>
          Du har rätt att lämna klagomål till Integritetsskyddsmyndigheten (IMY) om du anser 
          att vår behandling av dina personuppgifter strider mot GDPR.
        </p>
        <div className="rounded-lg bg-muted p-4">
          <p><strong>Integritetsskyddsmyndigheten</strong></p>
          <p>
            Webbplats:{' '}
            <a 
              href="https://www.imy.se" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary underline"
            >
              www.imy.se
            </a>
          </p>
          <p>Telefon: 08-657 61 00</p>
          <p>E-post: imy@imy.se</p>
        </div>
      </section>
    </article>
  );
};

export default PrivacyPolicyPage;