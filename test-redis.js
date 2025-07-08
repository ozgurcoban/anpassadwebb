// Test script för att verifiera Redis view tracking
// Kör med: node test-redis.js

async function testViewTracking() {
  const baseUrl = 'http://localhost:3000';
  const testSlug = 'farger-och-typsnitt-guide'; // Byt till en verklig blogg-slug
  
  console.log('🧪 Testar view tracking...\n');
  
  try {
    // 1. Hämta nuvarande views
    console.log('📊 Hämtar nuvarande views...');
    const getResponse = await fetch(`${baseUrl}/api/blogg/${testSlug}/views`);
    const currentData = await getResponse.json();
    console.log(`Current views: ${currentData.views}`);
    
    // 2. Öka view count
    console.log('\n📈 Ökar view count...');
    const postResponse = await fetch(`${baseUrl}/api/blogg/${testSlug}/views`, {
      method: 'POST'
    });
    const newData = await postResponse.json();
    console.log(`New views: ${newData.views}`);
    
    // 3. Verifiera ökningen
    console.log('\n✅ Verifierar ökningen...');
    const verifyResponse = await fetch(`${baseUrl}/api/blogg/${testSlug}/views`);
    const verifyData = await verifyResponse.json();
    console.log(`Verified views: ${verifyData.views}`);
    
    if (verifyData.views > currentData.views) {
      console.log('\n🎉 View tracking fungerar korrekt!');
    } else {
      console.log('\n⚠️  View count ökade inte som förväntat');
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.log('\nKontrollera att:');
    console.log('1. Dev server körs (npm run dev)');
    console.log('2. Redis credentials är korrekt konfigurerade');
    console.log('3. Blogg-slugen existerar');
  }
}

// Kör test
testViewTracking();