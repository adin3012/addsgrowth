import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const labelRef = useRef<HTMLDivElement>(null)
  const h1Ref = useRef<HTMLHeadingElement>(null)
  const bodyRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 })
    tl.to(labelRef.current, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' })
      .to(h1Ref.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, '-=0.3')
      .to(bodyRef.current, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.4')
      .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.3')

    return () => { tl.kill() }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="hero-section relative w-full min-h-[100dvh] flex items-center overflow-hidden"
      style={{ zIndex: 1 }}
    >
      {/* Radial gradient for text readability */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 80% at 25% 50%, rgba(5,5,5,0.7) 0%, rgba(5,5,5,0.3) 40%, transparent 70%)',
        }}
      />

      <div className="relative z-10 px-[5vw] max-w-[600px]" style={{ marginTop: '5vh' }}>
        <div
          ref={labelRef}
          className="font-mono-dm text-xs uppercase tracking-[0.12em] text-[#3d9970] mb-6 opacity-0 translate-y-4"
        >
          // WEB DESIGN AGENCY
        </div>

        <h1
          ref={h1Ref}
          className="font-sora font-extrabold text-[clamp(2.5rem,5.5vw,4.5rem)] leading-[1.0] tracking-[-0.03em] text-[#e8e8e8] mb-6 opacity-0 translate-y-6"
          style={{ textShadow: '0 2px 40px rgba(0,0,0,0.8), 0 0 80px rgba(5,5,5,0.6)' }}
        >
          Websites That
          <br />
          Grow Your
          <br />
          <span className="text-[#3d9970]">Business</span>
        </h1>

        <p
          ref={bodyRef}
          className="font-inter text-base text-[#9a9a9a] leading-[1.7] max-w-[480px] mb-8 opacity-0 translate-y-4"
        >
          Custom-built websites for coaches, agencies, and small businesses across the USA, UAE, India &amp; Australia. From $599. Live in 7 days.
        </p>

        <div ref={ctaRef} className="flex flex-wrap items-center gap-4 opacity-0 translate-y-4">
          <a
            href="#work"
            onClick={(e) => {
              e.preventDefault()
              document.querySelector('#work')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="inline-block text-sm font-semibold uppercase tracking-[0.06em] bg-[#3d9970] text-[#050505] px-8 py-3.5 rounded hover:bg-[#4aaa7d] transition-all duration-200 shadow-[0_0_30px_rgba(61,153,112,0.3)] hover:shadow-[0_0_40px_rgba(61,153,112,0.5)]"
          >
            See Our Work
          </a>
          <a
            href="https://calendly.com/adin3012/free-consultation"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-sm font-semibold uppercase tracking-[0.06em] text-[#e8e8e8] bg-[#111111] border border-[rgba(255,255,255,0.1)] px-8 py-3.5 rounded hover:bg-[#1a1a1a] hover:border-[rgba(255,255,255,0.2)] transition-all duration-200"
          >
            Book a Free Call
          </a>
        </div>
      </div>
    </section>
  )
}
