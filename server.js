// Exemplo de chamada para API de memecoins em hype
GET /api/alpha?lang=pt&category=hype,presale
// Resposta esperada:
{
  "coins": [
    {
      "symbol": "PEPE",
      "name": "PepeCoin",
      "change_24h": 24.7,
      "volume_usd": 4200000,
      "holders": 12400,
      "liquidity_usd": 890000,
      "tags": ["hype", "trending"],
      "presale": false
    }
  ]
}

// Exemplo para anúncios
GET /api/ads?lang=pt&active=true
// Resposta:
{
  "ads": [
    {
      "id": 1,
      "title_pt": "🚀 Projeto Alpha: TokenX",
      "title_en": "🚀 Alpha Project: TokenX",
      "description_pt": "Pré-venda exclusiva...",
      "premium": true,
      "cta_url": "https://..."
    }
  ]
      }
