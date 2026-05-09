import express from 'express'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))

// Rota principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

// API mock de memecoins - depois você troca pela API real
app.get('/api/coins', (req, res) => {
  res.json([
    { id: 1, name: 'Pepe', symbol: 'PEPE', price: 0.0000012, change24h: 5.2 },
    { id: 2, name: 'Dogecoin', symbol: 'DOGE', price: 0.08, change24h: -2.1 },
    { id: 3, name: 'Shiba Inu', symbol: 'SHIB', price: 0.000008, change24h: 12.5 }
  ])
})

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`)
})
