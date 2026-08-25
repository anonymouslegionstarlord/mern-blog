import { useEffect, useState } from 'react'

const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
const emptyForm = { title: '', excerpt: '', content: '', author: '', tags: '' }

function App() {
  const [posts, setPosts] = useState([])
  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState(null)
  const [status, setStatus] = useState('Loading posts…')

  useEffect(() => { loadPosts() }, [])

  async function loadPosts() {
    try {
      const response = await fetch(`${apiUrl}/posts`)
      if (!response.ok) throw new Error('Could not load posts')
      setPosts(await response.json()); setStatus('')
    } catch (error) { setStatus(`${error.message}. Is the API running?`) }
  }

  async function savePost(event) {
    event.preventDefault(); setStatus('Saving…')
    const response = await fetch(`${apiUrl}/posts${editingId ? `/${editingId}` : ''}`, { method: editingId ? 'PUT' : 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
    if (!response.ok) { const error = await response.json(); setStatus(error.message || 'Could not save post'); return }
    setForm(emptyForm); setEditingId(null); await loadPosts()
  }

  function editPost(post) {
    setEditingId(post._id)
    setForm({ title: post.title, excerpt: post.excerpt, content: post.content, author: post.author, tags: post.tags.join(', ') })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  async function deletePost(id) {
    if (!window.confirm('Delete this post?')) return
    const response = await fetch(`${apiUrl}/posts/${id}`, { method: 'DELETE' })
    if (response.ok) await loadPosts(); else setStatus('Could not delete post')
  }

  return <main className="min-h-screen bg-slate-950 text-slate-100">
    <header className="border-b border-slate-800 bg-gradient-to-br from-indigo-950 to-slate-950"><div className="mx-auto max-w-6xl px-6 py-16"><p className="text-sm font-bold uppercase tracking-[.25em] text-cyan-300">MERN publishing studio</p><h1 className="mt-3 text-5xl font-black md:text-7xl">Write clearly. Ship confidently.</h1><p className="mt-5 max-w-2xl text-lg text-slate-300">A complete MongoDB, Express, React, and Node.js blog workspace.</p></div></header>
    <div className="mx-auto grid max-w-6xl gap-8 px-6 py-10 lg:grid-cols-[.8fr_1.2fr]">
      <form className="h-fit space-y-4 rounded-2xl border border-slate-800 bg-slate-900 p-6" onSubmit={savePost}><h2 className="text-2xl font-bold">{editingId ? 'Edit post' : 'New post'}</h2>{Object.entries(form).map(([key, value]) => key === 'content' ? <label className="block text-sm capitalize" key={key}>{key}<textarea className="mt-1 min-h-36 w-full rounded-lg border border-slate-700 bg-slate-950 p-3" required value={value} onChange={(event) => setForm({ ...form, [key]: event.target.value })}/></label> : <label className="block text-sm capitalize" key={key}>{key}<input className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 p-3" required={key !== 'tags'} value={value} onChange={(event) => setForm({ ...form, [key]: event.target.value })}/></label>)}<div className="flex gap-2"><button className="rounded-lg bg-cyan-300 px-5 py-3 font-bold text-slate-950" type="submit">{editingId ? 'Update' : 'Publish'}</button>{editingId && <button className="rounded-lg border border-slate-700 px-5 py-3" type="button" onClick={() => { setEditingId(null); setForm(emptyForm) }}>Cancel</button>}</div></form>
      <section><div className="mb-5 flex items-center justify-between"><h2 className="text-2xl font-bold">Latest posts</h2><span className="text-sm text-slate-400">{posts.length} total</span></div>{status && <p className="mb-4 rounded-lg bg-slate-900 p-4 text-amber-200">{status}</p>}<div className="space-y-4">{posts.map((post) => <article className="rounded-2xl border border-slate-800 bg-slate-900 p-6" key={post._id}><div className="flex flex-wrap gap-2">{post.tags.map((tag) => <span className="rounded-full bg-indigo-950 px-3 py-1 text-xs text-indigo-200" key={tag}>#{tag}</span>)}</div><h3 className="mt-3 text-2xl font-bold">{post.title}</h3><p className="mt-2 text-slate-400">{post.excerpt}</p><p className="mt-4 whitespace-pre-wrap text-slate-200">{post.content}</p><div className="mt-5 flex items-center justify-between border-t border-slate-800 pt-4 text-sm"><span>By {post.author}</span><div className="flex gap-3"><button className="text-cyan-300" onClick={() => editPost(post)}>Edit</button><button className="text-rose-300" onClick={() => deletePost(post._id)}>Delete</button></div></div></article>)}</div></section>
    </div>
  </main>
}

export default App
