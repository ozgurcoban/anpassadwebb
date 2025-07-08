// Script för att nollställa view counts
// Kör med: node reset-views.js

import { Redis } from '@upstash/redis';

const redis = Redis.fromEnv();

async function resetViews() {
  console.log('🔄 Nollställer view counts...\n');
  
  try {
    // Hämta alla post slugs (du kan anpassa denna lista)
    const slugs = [
      'farger-och-typsnitt-guide',
      // Lägg till fler slugs här om du vill
    ];
    
    for (const slug of slugs) {
      const key = `post:${slug}:views`;
      await redis.del(key);
      console.log(`✅ Raderat: ${key}`);
    }
    
    console.log('\n🎉 Alla view counts har nollställts!');
    
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

// För att nollställa ALLA keys (var försiktig!)
async function resetAllData() {
  console.log('⚠️  VARNING: Detta raderar ALL data i Redis!\n');
  
  try {
    await redis.flushdb();
    console.log('✅ All data har raderats från Redis!');
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

// Kör önskad funktion
resetViews(); // Nollställ bara views

// Uncommentera för att radera ALL data:
// resetAllData();