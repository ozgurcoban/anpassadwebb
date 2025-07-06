# GA4 Testing Guide

## Vad som spåras

### Automatiska händelser (från GA4)
- **page_view**: Varje sidvisning
- **session_start**: När en ny session börjar
- **user_engagement**: Automatisk engagement-mätning
- **first_visit**: Första besöket

### Anpassade händelser
1. **submit_form**: När kontaktformuläret skickas
   - Label: `contact_form_[paketnamn]`
   
2. **select_package**: När ett paket väljs
   - Label: Paketnamnet

3. **click_cta**: När CTA-knappar klickas
   - Label: `[knapptext]_[plats]`

4. **scroll**: Scroll depth milestones
   - Label: `25%`, `50%`, `75%`, `90%`, `100%`

## Testmetoder

### 1. Debug Mode (Enklast för utveckling)
Lägg till i `.env.local`:
```
NEXT_PUBLIC_GA_DEBUG=true
```

Detta loggar alla GA4-händelser i browser console.

### 2. Google Analytics DebugView
1. Gå till [Google Analytics](https://analytics.google.com)
2. Välj din property
3. Admin → DebugView
4. Öppna sidan i en ny flik
5. Se händelser i realtid

### 3. Browser Console
```javascript
// Se alla händelser i dataLayer
window.dataLayer

// Se senaste händelsen
window.dataLayer[window.dataLayer.length - 1]
```

### 4. Network Tab
1. Öppna Developer Tools → Network
2. Filtrera på "collect" eller "gtag"
3. Se alla requests till GA4

### 5. Google Tag Assistant
1. Installera [Tag Assistant Extension](https://chrome.google.com/webstore/detail/tag-assistant-legacy-by-g/kejbdjndbnbjgmefkgdddjlbokphdefk)
2. Aktivera på din sida
3. Se alla GA4-händelser live

## Cookie Consent
GA4 tracking fungerar endast när användaren har accepterat analytics cookies. För att testa:
1. Acceptera cookies via cookie banner
2. Eller i console: `localStorage.setItem('cookie-consent', JSON.stringify({hasConsented: true, preferences: {analytics: true}}))`

## Vanliga testscenarier

### Test 1: Sidnavigering
1. Navigera mellan sidor
2. I console (med debug mode): Se "GA4 Debug: Pageview tracked: [url]"

### Test 2: Kontaktformulär
1. Klicka på "Kontakta oss" knapp
2. Välj ett paket
3. Skicka formuläret
4. Se events: `click_cta` → `select_package` → `submit_form`

### Test 3: Scroll tracking
1. Scrolla långsamt ner på en lång sida
2. Se events vid 25%, 50%, 75%, 90%, 100%

### Test 4: CTA tracking
1. Klicka på olika knappar
2. Se `click_cta` events med olika labels

## Produktion
I produktion används tracking ID: `G-KQDHVPF7GH`
Se live data i Google Analytics → Reports → Realtime