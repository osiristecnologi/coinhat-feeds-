require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;

app.use(express.json({ limit: '2mb' }));
app.use(express.static(__dirname));

app.get('/health', (_req, res) => {
  res.json({ ok: true, service: 'coinhat-feeds' });
});

app.post('/api/anthropic', async (req, res) => {
  if (!ANTHROPIC_API_KEY) {
    return res.status(500).json({
      error: 'ANTHROPIC_API_KEY não configurada no servidor.'
    });
  }

  try {
    const upstream = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify(req.body)
    });

    const text = await upstream.text();
    res.status(upstream.status);

    try {
      return res.json(JSON.parse(text));
    } catch {
      return res.type('text/plain').send(text);
    }
  } catch (error) {
    return res.status(500).json({
      error: 'Falha ao consultar Anthropic.',
      details: error.message
    });
  }
});

app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Coinhat Feeds rodando em http://localhost:${PORT}`);
});
