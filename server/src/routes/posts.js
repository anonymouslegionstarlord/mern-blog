import { Router } from 'express'
import mongoose from 'mongoose'
import Post from '../models/Post.js'

const router = Router()

router.get('/', async (_request, response, next) => {
  try { response.json(await Post.find().sort({ createdAt: -1 }).lean()) } catch (error) { next(error) }
})

router.post('/', async (request, response, next) => {
  try {
    const post = await Post.create({ ...request.body, tags: normalizeTags(request.body.tags) })
    response.status(201).json(post)
  } catch (error) { next(error) }
})

router.put('/:id', async (request, response, next) => {
  try {
    if (!mongoose.isValidObjectId(request.params.id)) return response.status(400).json({ message: 'Invalid post ID' })
    const post = await Post.findByIdAndUpdate(request.params.id, { ...request.body, tags: normalizeTags(request.body.tags) }, { new: true, runValidators: true })
    if (!post) return response.status(404).json({ message: 'Post not found' })
    response.json(post)
  } catch (error) { next(error) }
})

router.delete('/:id', async (request, response, next) => {
  try {
    if (!mongoose.isValidObjectId(request.params.id)) return response.status(400).json({ message: 'Invalid post ID' })
    const post = await Post.findByIdAndDelete(request.params.id)
    if (!post) return response.status(404).json({ message: 'Post not found' })
    response.status(204).end()
  } catch (error) { next(error) }
})

function normalizeTags(tags) {
  if (Array.isArray(tags)) return tags.map(String).map((tag) => tag.trim()).filter(Boolean).slice(0, 8)
  return String(tags || '').split(',').map((tag) => tag.trim()).filter(Boolean).slice(0, 8)
}

export default router
