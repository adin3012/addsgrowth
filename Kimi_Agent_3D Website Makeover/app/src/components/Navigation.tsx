import { useEffect, useRef, useState } from 'react'

export default function Navigation() {
  const navRef = useRef<HTMLElement>(null)
  const [scrolled, setScrolled] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 100)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && drawerOpen) setDrawerOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [drawerOpen])

  const navLinks = [
    { label: 'Work', href: '#work' },
    { label: 'Services', href: '#services' },
    { label: 'Process', href: '#process' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Contact', href: '#contact' },
  ]

  const calendlyUrl = 'https://calendly.com/adin3012/free-consultation'

  const scrollTo = (href: string) => {
    setDrawerOpen(false)
    if (href === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-[1000] transition-all duration-300"
        style={{
          background: scrolled ? 'rgba(5, 5, 5, 0.85)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255, 255, 255, 0.06)' : '1px solid transparent',
        }}
      >
        <div className="flex items-center justify-between h-16 px-[5vw]">
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); scrollTo('#') }}
            className="flex items-center"
          >
            <img
              src="./addsgrowth-logo.jpg"
              alt="AddsGrowth"
              className="h-7 w-auto"
              draggable={false}
            />
          </a>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); scrollTo(link.href) }}
                className="text-sm font-medium text-[#7a7a7a] hover:text-[#e8e8e8] transition-colors duration-200 px-4 py-2"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <a
              href={calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13px] font-semibold uppercase tracking-[0.06em] bg-[#3d9970] text-[#050505] px-5 py-2.5 rounded hover:bg-[#4aaa7d] transition-colors duration-200"
            >
              Book a Call
            </a>
          </div>

          <button
            className="md:hidden flex flex-col gap-[5px] p-2 bg-transparent border-none cursor-pointer"
            onClick={() => setDrawerOpen(true)}
            aria-label="Open menu"
          >
            <span className="block w-[22px] h-[1.5px] bg-[#e8e8e8]" />
            <span className="block w-[22px] h-[1.5px] bg-[#e8e8e8]" />
            <span className="block w-[22px] h-[1.5px] bg-[#e8e8e8]" />
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 z-[2000] bg-[#050505] flex-col items-center justify-center gap-8 transition-opacity duration-300 ${drawerOpen ? 'flex opacity-100' : 'hidden opacity-0'}`}
      >
        <button
          className="absolute top-6 right-[5%] text-2xl text-[#7a7a7a] bg-transparent border-none cursor-pointer p-2"
          onClick={() => setDrawerOpen(false)}
          aria-label="Close menu"
        >
          ✕
        </button>
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={(e) => { e.preventDefault(); scrollTo(link.href) }}
            className="text-3xl font-bold text-[#e8e8e8] hover:text-[#3d9970] transition-colors duration-200"
          >
            {link.label}
          </a>
        ))}
        <a
          href={calendlyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 text-sm font-semibold text-[#3d9970] border border-[rgba(61,153,112,0.3)] px-8 py-3 rounded hover:bg-[rgba(61,153,112,0.1)] transition-colors duration-200"
        >
          Book a Call →
        </a>
      </div>
    </>
  )
}
