#!/bin/bash

# Test script för view tracking med curl
# Kör med: chmod +x test-views.sh && ./test-views.sh

SLUG="farger-och-typsnitt-guide"  # Byt till en verklig blogg-slug
BASE_URL="http://localhost:3000"

echo "🧪 Testar view tracking för slug: $SLUG"
echo ""

# Hämta nuvarande views
echo "📊 Nuvarande views:"
curl -s "$BASE_URL/api/blogg/$SLUG/views" | json_pp
echo ""

# Öka view count
echo "📈 Ökar view count..."
curl -s -X POST "$BASE_URL/api/blogg/$SLUG/views" | json_pp
echo ""

# Verifiera ökningen
echo "✅ Verifierar nya views:"
curl -s "$BASE_URL/api/blogg/$SLUG/views" | json_pp