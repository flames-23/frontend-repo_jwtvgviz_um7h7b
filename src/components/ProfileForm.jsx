import { useEffect, useState } from 'react'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || ''

function ProfileForm({ onSaved }) {
  const [form, setForm] = useState({
    full_name: '',
    title: 'Flutter Developer',
    bio: '',
    linkedin: '',
    github: '',
    website: '',
    photo_base64: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    // load existing profile if any
    const fetchProfile = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/api/profile`)
        const data = await res.json()
        if (data.profile) {
          const { full_name, title, bio, linkedin, github, website, photo_base64 } = data.profile
          setForm({ full_name: full_name || '', title: title || '', bio: bio || '', linkedin: linkedin || '', github: github || '', website: website || '', photo_base64: photo_base64 || '' })
        }
      } catch (e) {
        // ignore
      }
    }
    fetchProfile()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  const handleFile = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      setForm((f) => ({ ...f, photo_base64: reader.result }))
    }
    reader.readAsDataURL(file)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`${BACKEND_URL}/api/profile`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      if (!res.ok) throw new Error('Failed to save')
      onSaved?.()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="about" className="mx-auto max-w-5xl px-6 py-10">
      <h2 className="text-2xl font-bold text-sky-900">About You</h2>
      <p className="mt-1 text-sky-800">Add your profile and social links. You can change them anytime.</p>

      <form onSubmit={handleSubmit} className="mt-6 grid gap-6 rounded-xl bg-white/70 p-6 shadow ring-1 ring-sky-900/10 backdrop-blur">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm text-sky-900">Full name</label>
            <input name="full_name" value={form.full_name} onChange={handleChange} className="mt-1 w-full rounded-md border border-sky-200 bg-white/80 px-3 py-2 outline-none focus:ring-2 focus:ring-sky-400" required />
          </div>
          <div>
            <label className="block text-sm text-sky-900">Title</label>
            <input name="title" value={form.title} onChange={handleChange} className="mt-1 w-full rounded-md border border-sky-200 bg-white/80 px-3 py-2 outline-none focus:ring-2 focus:ring-sky-400" />
          </div>
        </div>

        <div>
          <label className="block text-sm text-sky-900">Short bio</label>
          <textarea name="bio" value={form.bio} onChange={handleChange} rows={3} className="mt-1 w-full rounded-md border border-sky-200 bg-white/80 px-3 py-2 outline-none focus:ring-2 focus:ring-sky-400" />
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label className="block text-sm text-sky-900">LinkedIn URL</label>
            <input name="linkedin" value={form.linkedin} onChange={handleChange} className="mt-1 w-full rounded-md border border-sky-200 bg-white/80 px-3 py-2 outline-none focus:ring-2 focus:ring-sky-400" />
          </div>
          <div>
            <label className="block text-sm text-sky-900">GitHub URL</label>
            <input name="github" value={form.github} onChange={handleChange} className="mt-1 w-full rounded-md border border-sky-200 bg-white/80 px-3 py-2 outline-none focus:ring-2 focus:ring-sky-400" />
          </div>
          <div>
            <label className="block text-sm text-sky-900">Website</label>
            <input name="website" value={form.website} onChange={handleChange} className="mt-1 w-full rounded-md border border-sky-200 bg-white/80 px-3 py-2 outline-none focus:ring-2 focus:ring-sky-400" />
          </div>
        </div>

        <div>
          <label className="block text-sm text-sky-900">Profile photo</label>
          <input type="file" accept="image/*" onChange={handleFile} className="mt-1" />
          {form.photo_base64 && (
            <img src={form.photo_base64} alt="Profile preview" className="mt-3 h-24 w-24 rounded-full object-cover ring-2 ring-sky-300" />
          )}
        </div>

        <div className="flex items-center gap-3">
          <button disabled={loading} className="rounded-md bg-sky-600 px-4 py-2 font-medium text-white shadow-md shadow-sky-600/30 transition hover:bg-sky-700 disabled:opacity-60">{loading ? 'Saving…' : 'Save profile'}</button>
          {error && <p className="text-sm text-red-600">{error}</p>}
        </div>
      </form>
    </section>
  )
}

export default ProfileForm
