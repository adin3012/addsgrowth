import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const testimonials = [
  {
    quote: "AddsGrowth built my coaching site in under a week. It looks incredible and I've already gotten 3 new clients from it.",
    name: 'Himanshu Deka',
    role: 'Coach, India',
    color: '#22c55e',
  },
  {
    quote: "From $599 I got a website that looks like it cost $5,000. Fast, professional, and exactly what I wanted.",
    name: 'Arjun Mehta',
    role: 'Business Owner, UAE',
    color: '#3b82f6',
  },
  {
    quote: "The SEO work alone paid for the site. I'm ranking on page 1 for my main keywords within 2 months.",
    name: 'George Land',
    role: 'CoachFlow Founder',
    color: '#a855f7',
  },
  {
    quote: "I was skeptical about the 7-day promise, but they delivered. The site is beautiful and loads in under 2 seconds.",
    name: 'Rachel Green',
    role: 'Wellness Studio NYC',
    color: '#ec4899',
  },
  {
    quote: "Best investment I've made for my business. The website converts visitors at 3x the rate of my old one.",
    name: 'Michael Torres',
    role: 'Real Estate Agent, LA',
    color: '#f59e0b',
  },
  {
    quote: "Working with AddsGrowth was seamless. They understood my vision immediately and the result is perfect.",
    name: 'Emily Watson',
    role: 'Entrepreneur, London',
    color: '#06b6d4',
  },
]

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const cards = el.querySelectorAll('.testimonial-card')
    const anim = gsap.fromTo(
      cards,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
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
      id="testimonials"
      className="relative w-full py-[120px] px-[5vw]"
      style={{ zIndex: 1, background: 'rgba(5, 5, 5, 0.85)', backdropFilter: 'blur(12px) saturate(1.2)' }}
    >
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-12">
          <div className="font-mono-dm text-xs uppercase tracking-[0.12em] text-[#3d9970] mb-4">
            // CLIENT FEEDBACK
          </div>
          <h2 className="font-sora font-bold text-[clamp(1.8rem,3.5vw,3rem)] leading-[1.05] tracking-[-0.02em] text-[#e8e8e8]">
            Don't Take Our Word
            <br />
            <em className="text-[#3d9970] not-italic">For It</em>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="testimonial-card bg-[#111111] border border-[rgba(255,255,255,0.06)] rounded p-8 relative transition-all duration-300 hover:border-[rgba(61,153,112,0.3)] hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.25)]"
            >
              {/* Top gradient line */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#3d9970] to-transparent rounded-t" />

              {/* Quote mark */}
              <div className="text-[#3d9970] text-2xl mb-4">"</div>

              <p className="font-inter text-base text-[#e8e8e8] leading-[1.7] italic mb-6">
                {t.quote}
              </p>

              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0"
                  style={{ background: `${t.color}20`, color: t.color }}
                >
                  {t.name[0]}
                </div>
                <div>
                  <div className="font-sora font-semibold text-sm text-[#e8e8e8]">
                    {t.name}
                  </div>
                  <div className="font-mono-dm text-[11px] uppercase tracking-[0.04em] text-[#7a7a7a]">
                    {t.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
