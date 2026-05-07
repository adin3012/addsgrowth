import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const steps = [
  { num: '01', title: 'Discovery Call', desc: 'We hop on a quick call to understand your business, goals, and design preferences.' },
  { num: '02', title: 'Design & Build', desc: "We design and code your site from scratch. You'll see progress and give feedback." },
  { num: '03', title: 'Review & Revise', desc: "You review the site, we make revisions. Unlimited revisions until you're 100% happy." },
  { num: '04', title: 'Go Live', desc: "We launch your site, set up analytics, and hand over full ownership. You're live!" },
]

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const items = el.querySelectorAll('.process-step')
    const anim = gsap.fromTo(
      items,
      { opacity: 0, x: -50 },
      {
        opacity: 1,
        x: 0,
        duration: 0.6,
        stagger: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      }
    )

    return () => { anim.scrollTrigger?.kill() }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="process"
      className="relative w-full py-[120px] px-[5vw]"
      style={{ zIndex: 1, background: 'rgba(5, 5, 5, 0.84)', backdropFilter: 'blur(12px) saturate(1.2)' }}
    >
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-16">
          <div className="font-mono-dm text-xs uppercase tracking-[0.12em] text-[#3d9970] mb-4">
            // HOW IT WORKS
          </div>
          <h2 className="font-sora font-bold text-[clamp(1.8rem,3.5vw,3rem)] leading-[1.05] tracking-[-0.02em] text-[#e8e8e8]">
            From Idea to Live in
            <br />
            <em className="text-[#3d9970] not-italic">7 Days</em>
          </h2>
        </div>

        {/* Desktop: horizontal timeline */}
        <div className="hidden md:block relative">
          {/* Connecting line */}
          <div className="absolute top-[24px] left-[12.5%] right-[12.5%] h-[1px] bg-[rgba(255,255,255,0.06)]" />

          <div className="grid grid-cols-4 gap-6">
            {steps.map((s) => (
              <div key={s.num} className="process-step text-center">
                <div className="font-sora font-extrabold text-5xl text-[rgba(61,153,112,0.15)] mb-4">
                  {s.num}
                </div>
                <h3 className="font-sora font-semibold text-lg text-[#e8e8e8] mb-2">
                  {s.title}
                </h3>
                <p className="font-inter text-sm text-[#7a7a7a] leading-[1.6]">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile: vertical timeline */}
        <div className="md:hidden relative pl-8">
          <div className="absolute top-0 left-[15px] bottom-0 w-[1px] bg-[rgba(255,255,255,0.06)]" />
          <div className="flex flex-col gap-10">
            {steps.map((s) => (
              <div key={s.num} className="process-step relative">
                <div className="absolute -left-8 top-1 w-2 h-2 rounded-full bg-[#3d9970]" />
                <div className="font-sora font-extrabold text-4xl text-[rgba(61,153,112,0.15)] mb-2">
                  {s.num}
                </div>
                <h3 className="font-sora font-semibold text-lg text-[#e8e8e8] mb-2">
                  {s.title}
                </h3>
                <p className="font-inter text-sm text-[#7a7a7a] leading-[1.6]">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Floating decorative icosahedron */}
        <div
          className="hidden lg:block absolute bottom-10 right-10 w-20 h-20 opacity-[0.08] pointer-events-none"
          style={{ animation: 'floatSpin 20s ease-in-out infinite' }}
        >
          <svg viewBox="0 0 100 100" fill="none" stroke="#3d9970" strokeWidth="0.5">
            <polygon points="50,5 90,25 90,75 50,95 10,75 10,25" />
            <polygon points="50,5 90,25 50,50 10,25" />
            <polygon points="90,25 90,75 50,50" />
            <polygon points="90,75 50,95 50,50" />
            <polygon points="50,95 10,75 50,50" />
            <polygon points="10,75 10,25 50,50" />
            <line x1="50" y1="5" x2="50" y2="50" />
            <line x1="90" y1="25" x2="50" y2="50" />
            <line x1="90" y1="75" x2="50" y2="50" />
            <line x1="50" y1="95" x2="50" y2="50" />
            <line x1="10" y1="75" x2="50" y2="50" />
            <line x1="10" y1="25" x2="50" y2="50" />
          </svg>
        </div>
      </div>
    </section>
  )
}
