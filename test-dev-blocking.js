// Test att view tracking är blockerad i development
// Kör med: NODE_ENV=development node test-dev-blocking.js

console.log('🧪 Testar att view tracking är blockerad i development...\n');
console.log(`NODE_ENV: ${process.env.NODE_ENV}\n`);

async function testDevBlocking() {
  const baseUrl = 'http://localhost:3000';
  const testSlug = 'farger-och-typsnitt-guide';
  
  try {
    // Testa POST endpoint
    console.log('📮 Testar POST /api/blogg/[slug]/views...');
    const postResponse = await fetch(`${baseUrl}/api/blogg/${testSlug}/views`, {
      method: 'POST'
    });
    const postData = await postResponse.json();
    console.log('Response:', postData);
    
    if (postData.message && postData.message.includes('disabled in development')) {
      console.log('✅ View tracking är korrekt blockerad i development!');
    } else {
      console.log('⚠️  View tracking verkar fortfarande vara aktiv');
    }
    
    // Testa GET endpoint (ska fortfarande fungera för att läsa)
    console.log('\n📊 Testar GET /api/blogg/[slug]/views...');
    const getResponse = await fetch(`${baseUrl}/api/blogg/${testSlug}/views`);
    const getData = await getResponse.json();
    console.log('Response:', getData);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

testDevBlocking();