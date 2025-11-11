function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white/70 backdrop-blur shadow-sm ring-1 ring-sky-900/10">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        <a href="#" className="text-lg font-semibold text-sky-900">Soft Blue Portfolio</a>
        <nav className="flex items-center gap-6 text-sky-900/80">
          <a href="#projects" className="hover:text-sky-900">Projects</a>
          <a href="#about" className="hover:text-sky-900">About</a>
          <a href="#contact" className="hover:text-sky-900">Contact</a>
        </nav>
      </div>
    </header>
  )
}

export default Header
