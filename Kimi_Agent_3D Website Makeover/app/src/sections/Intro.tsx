import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Palette, Search, Clock, Tag } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const features = [
  { icon: Palette, label: 'Custom Design' },
  { icon: Search, label: 'SEO Built-In' },
  { icon: Clock, label: '7-Day Delivery' },
  { icon: Tag, label: 'From $599' },
]

export default function Intro() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const anim = gsap.fromTo(
      el.querySelectorAll('.reveal-item'),
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    )

    return () => { anim.scrollTrigger?.kill() }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-[120px] px-[5vw]"
      style={{ zIndex: 1, background: 'rgba(5, 5, 5, 0.82)', backdropFilter: 'blur(12px) saturate(1.2)' }}
    >
      <div className="max-w-[800px] mx-auto text-center">
        <div className="reveal-item font-mono-dm text-xs uppercase tracking-[0.12em] text-[#3d9970] mb-4">
          // WHAT WE DO
        </div>

        <h2 className="reveal-item font-sora font-bold text-[clamp(1.8rem,3.5vw,3rem)] leading-[1.05] tracking-[-0.02em] text-[#e8e8e8] mb-6">
          No templates. No fluff.
          <br />
          <em className="text-[#3d9970] not-italic">Just websites that work.</em>
        </h2>

        <p className="reveal-item font-inter text-base text-[#7a7a7a] leading-[1.7] max-w-[640px] mx-auto mb-12">
          AddsGrowth builds custom, high-performance websites designed to attract clients and rank on Google. Every site is hand-coded — not dragged and dropped — so it loads fast, looks professional, and converts visitors into paying customers.
        </p>

        <div className="reveal-item flex flex-wrap items-center justify-center gap-12">
          {features.map((f) => (
            <div key={f.label} className="flex flex-col items-center gap-3">
              <f.icon size={32} strokeWidth={1.5} className="text-[#3d9970]" />
              <span className="font-mono-dm text-[11px] uppercase tracking-[0.08em] text-[#7a7a7a]">
                {f.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
