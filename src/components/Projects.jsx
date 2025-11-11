import { useEffect, useState } from 'react'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || ''

function Projects() {
  const [projects, setProjects] = useState([])
  const [form, setForm] = useState({ title: '', description: '', tags: '', live_url: '', repo_url: '' })
  const [loading, setLoading] = useState(false)

  const fetchProjects = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/projects`)
      const data = await res.json()
      setProjects(data.projects || [])
    } catch (e) {
      // ignore
    }
  }

  useEffect(() => { fetchProjects() }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  const handleAdd = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const payload = {
        title: form.title,
        description: form.description,
        tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
        live_url: form.live_url || null,
        repo_url: form.repo_url || null
      }
      const res = await fetch(`${BACKEND_URL}/api/projects`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      if (res.ok) {
        setForm({ title: '', description: '', tags: '', live_url: '', repo_url: '' })
        await fetchProjects()
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="projects" className="mx-auto max-w-6xl px-6 py-12">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-sky-900">Projects</h2>
          <p className="mt-1 text-sky-800">Showcase your Flutter/Dart work. Add live demos and repositories.</p>
        </div>
      </div>

      <form onSubmit={handleAdd} className="mt-6 grid gap-4 rounded-xl bg-white/70 p-6 shadow ring-1 ring-sky-900/10 backdrop-blur">
        <div className="grid gap-4 sm:grid-cols-2">
          <input name="title" value={form.title} onChange={handleChange} placeholder="Project title" required className="w-full rounded-md border border-sky-200 bg-white/80 px-3 py-2 outline-none focus:ring-2 focus:ring-sky-400" />
          <input name="tags" value={form.tags} onChange={handleChange} placeholder="Tags (comma separated)" className="w-full rounded-md border border-sky-200 bg-white/80 px-3 py-2 outline-none focus:ring-2 focus:ring-sky-400" />
        </div>
        <textarea name="description" value={form.description} onChange={handleChange} rows={3} placeholder="Short description" className="w-full rounded-md border border-sky-200 bg-white/80 px-3 py-2 outline-none focus:ring-2 focus:ring-sky-400" />
        <div className="grid gap-4 sm:grid-cols-2">
          <input name="live_url" value={form.live_url} onChange={handleChange} placeholder="Live URL (optional)" className="w-full rounded-md border border-sky-200 bg-white/80 px-3 py-2 outline-none focus:ring-2 focus:ring-sky-400" />
          <input name="repo_url" value={form.repo_url} onChange={handleChange} placeholder="GitHub URL (optional)" className="w-full rounded-md border border-sky-200 bg-white/80 px-3 py-2 outline-none focus:ring-2 focus:ring-sky-400" />
        </div>
        <button disabled={loading} className="w-fit rounded-md bg-sky-600 px-4 py-2 font-medium text-white shadow-md shadow-sky-600/30 transition hover:bg-sky-700 disabled:opacity-60">{loading ? 'Adding…' : 'Add project'}</button>
      </form>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <div key={p._id} className="group rounded-xl bg-white/70 p-5 shadow ring-1 ring-sky-900/10 backdrop-blur transition hover:-translate-y-0.5">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-sky-900">{p.title}</h3>
            </div>
            <p className="mt-2 text-sm text-sky-800">{p.description}</p>
            {p.tags?.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {p.tags.map((t, i) => (
                  <span key={i} className="rounded-full bg-sky-100 px-2.5 py-1 text-xs text-sky-800 ring-1 ring-sky-200">{t}</span>
                ))}
              </div>
            )}
            <div className="mt-4 flex flex-wrap gap-3">
              {p.live_url && <a href={p.live_url} target="_blank" className="text-sky-700 hover:text-sky-900">Live</a>}
              {p.repo_url && <a href={p.repo_url} target="_blank" className="text-sky-700 hover:text-sky-900">GitHub</a>}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Projects
