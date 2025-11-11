import Spline from '@splinetool/react-spline';

function Hero() {
  return (
    <section className="relative min-h-[80vh] w-full overflow-hidden bg-gradient-to-b from-sky-50 to-blue-100">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/qQUip0dJPqrrPryE/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6 pt-20 pb-16">
        <div className="backdrop-blur-sm/0">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 text-xs text-sky-700 shadow-sm ring-1 ring-white/60">
            <span className="h-2 w-2 rounded-full bg-sky-500" />
            Open to work — Flutter & Dart Developer
          </div>
          <h1 className="mt-6 text-4xl font-extrabold leading-tight text-sky-900 sm:text-6xl">
            Build delightful mobile apps with Flutter
          </h1>
          <p className="mt-4 max-w-2xl text-base text-sky-800 sm:text-lg">
            A modern portfolio showcasing production-ready projects, smooth UX, and clean code. Crafted in a soft, aesthetic blue theme.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href="#projects" className="rounded-full bg-sky-600 px-5 py-2.5 text-white shadow-lg shadow-sky-600/30 transition hover:translate-y-[-1px] hover:bg-sky-700 active:translate-y-[0px]">
              View Projects
            </a>
            <a href="#contact" className="rounded-full bg-white/70 px-5 py-2.5 text-sky-900 shadow ring-1 ring-sky-900/10 backdrop-blur">
              Contact
            </a>
          </div>
        </div>
      </div>

      {/* soft gradient overlay to improve contrast, don't block interactions */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-blue-100/80" />
    </section>
  );
}

export default Hero;
