import 'dotenv/config'
import cors from 'cors'
import express from 'express'
import mongoose from 'mongoose'
import postsRouter from './routes/posts.js'

const app = express()
const port = Number(process.env.PORT || 5000)

app.disable('x-powered-by')
app.use(cors({ origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173' }))
app.use(express.json({ limit: '100kb' }))
app.get('/api/health', (_request, response) => response.json({ status: 'ok' }))
app.use('/api/posts', postsRouter)
app.use((_request, response) => response.status(404).json({ message: 'Route not found' }))
app.use((error, _request, response, _next) => {
  const validationError = error?.name === 'ValidationError'
  console.error(error)
  response.status(validationError ? 400 : 500).json({ message: validationError ? error.message : 'Unexpected server error' })
})

async function start() {
  await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/mern_blog')
  app.listen(port, () => console.log(`MERN Blog API listening on http://localhost:${port}`))
}

start().catch((error) => { console.error('Failed to start server', error); process.exit(1) })
