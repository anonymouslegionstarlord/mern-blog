import mongoose from 'mongoose'

const postSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxlength: 120 },
  excerpt: { type: String, required: true, trim: true, maxlength: 300 },
  content: { type: String, required: true, trim: true },
  author: { type: String, required: true, trim: true, maxlength: 80 },
  tags: [{ type: String, trim: true, lowercase: true }],
}, { timestamps: true })

export default mongoose.model('Post', postSchema)
