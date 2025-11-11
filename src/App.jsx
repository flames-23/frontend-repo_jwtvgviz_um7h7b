import { useEffect, useState } from 'react'
import Hero from './components/Hero'
import Header from './components/Header'
import ProfileForm from './components/ProfileForm'
import Projects from './components/Projects'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || ''

function App() {
  const [profile, setProfile] = useState(null)

  const loadProfile = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/profile`)
      const data = await res.json()
      setProfile(data.profile)
    } catch (e) {
      // ignore
    }
  }

  useEffect(() => { loadProfile() }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-blue-100">
      <Header />
      <Hero />

      {/* Profile card */}
      <section className="mx-auto -mt-24 max-w-5xl px-6">
        <div className="rounded-2xl bg-white/80 p-6 shadow-xl ring-1 ring-sky-900/10 backdrop-blur">
          <div className="flex flex-col items-center gap-6 sm:flex-row">
            <img src={profile?.photo_base64 || 'https://api.dicebear.com/7.x/thumbs/svg?seed=flutter'} alt="Profile" className="h-24 w-24 rounded-xl object-cover ring-2 ring-sky-200" />
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-sky-900">{profile?.full_name || 'Your Name'}</h2>
              <p className="text-sky-800">{profile?.title || 'Flutter Developer'}</p>
              {profile?.bio && <p className="mt-2 text-sky-800">{profile.bio}</p>}
              <div className="mt-3 flex flex-wrap gap-3">
                {profile?.linkedin && <a className="text-sky-700 hover:text-sky-900" href={profile.linkedin} target="_blank">LinkedIn</a>}
                {profile?.github && <a className="text-sky-700 hover:text-sky-900" href={profile.github} target="_blank">GitHub</a>}
                {profile?.website && <a className="text-sky-700 hover:text-sky-900" href={profile.website} target="_blank">Website</a>}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Editable sections */}
      <ProfileForm onSaved={loadProfile} />
      <Projects />

      {/* Contact */}
      <section id="contact" className="mx-auto max-w-5xl px-6 py-14">
        <div className="rounded-2xl bg-gradient-to-br from-sky-600 to-blue-700 p-6 text-white shadow-xl">
          <h3 className="text-2xl font-bold">Let’s build something great</h3>
          <p className="mt-1 text-white/90">Email me or reach out via LinkedIn. I’m open to full-time roles and freelance.</p>
          {profile?.email ? (
            <a className="mt-4 inline-block rounded-md bg-white/10 px-4 py-2 ring-1 ring-white/30 hover:bg-white/20" href={`mailto:${profile.email}`}>{profile.email}</a>
          ) : (
            <p className="mt-3 text-white/90">Add your contact in the profile above.</p>
          )}
        </div>
      </section>

      <footer className="mx-auto max-w-6xl px-6 pb-10 text-center text-sky-900/70">© {new Date().getFullYear()} • Built with a soft blue aesthetic</footer>
    </div>
  )
}

export default App
