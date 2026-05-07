import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  { title: 'Himanshu Deka — Coach Portfolio', tags: 'Portfolio · India', image: '/images/work-1.jpg' },
  { title: 'GetFitWithAdin — Fitness Coaching', tags: 'Fitness · USA', image: '/images/work-2.jpg' },
  { title: 'CoachFlow — SaaS CRM Platform', tags: 'SaaS · Dashboard', image: '/images/work-3.jpg' },
  { title: 'Jake Rivera — Personal Trainer', tags: 'Fitness · USA', image: '/images/work-4.jpg' },
  { title: 'Maya Sterling — Life Coach', tags: 'Coaching · UK', image: '/images/work-5.jpg' },
  { title: 'Celeste Bloom — Beauty Brand', tags: 'Beauty · USA', image: '/images/work-6.jpg' },
]

export default function Work() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const cards = el.querySelectorAll('.work-card')
    const anim = gsap.fromTo(
      cards,
      { opacity: 0, y: 40, rotateY: -10 },
      {
        opacity: 1,
        y: 0,
        rotateY: 0,
        duration: 0.6,
        stagger: 0.15,
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
      id="work"
      className="relative w-full py-[120px] px-[5vw]"
      style={{ zIndex: 1, background: 'rgba(5, 5, 5, 0.85)', backdropFilter: 'blur(12px) saturate(1.2)' }}
    >
      <div className="max-w-[1200px] mx-auto" style={{ perspective: '1000px' }}>
        <div className="mb-12">
          <div className="font-mono-dm text-xs uppercase tracking-[0.12em] text-[#3d9970] mb-4">
            // SELECTED WORK
          </div>
          <h2 className="font-sora font-bold text-[clamp(1.8rem,3.5vw,3rem)] leading-[1.05] tracking-[-0.02em] text-[#e8e8e8]">
            Sites We've Built
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((p, i) => (
            <div
              key={i}
              className="work-card group relative bg-[#0a0a0a] rounded overflow-hidden border border-[rgba(255,255,255,0.06)] cursor-pointer"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(5,5,5,0.95)] via-[rgba(5,5,5,0.4)] to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-400" />
              <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-2 group-hover:translate-y-0 transition-transform duration-400">
                <div className="font-mono-dm text-[11px] uppercase tracking-[0.08em] text-[#3d9970] mb-1">
                  {p.tags}
                </div>
                <div className="font-sora font-semibold text-lg text-[#e8e8e8]">
                  {p.title}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
