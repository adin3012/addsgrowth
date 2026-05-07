import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Monitor, TrendingUp, Zap, BookOpen, RefreshCw, Wrench } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    icon: Monitor,
    title: 'Custom Web Design',
    desc: 'Hand-coded websites built from scratch. No templates, no page builders — just clean, fast, unique design tailored to your brand.',
    features: ['Responsive Design', 'UI/UX Optimization', 'Brand-Aligned Layouts', 'Fast Load Times'],
  },
  {
    icon: TrendingUp,
    title: 'SEO & Google Ranking',
    desc: 'On-page SEO built into every site. Keyword research, meta tags, schema markup, and content structure that helps you rank.',
    features: ['Keyword Research', 'Technical SEO', 'Schema Markup', 'Analytics Setup'],
  },
  {
    icon: Zap,
    title: 'Speed & Performance',
    desc: 'Sub-3-second load times. Optimized images, minified code, CDN delivery, and Core Web Vitals that keep visitors engaged.',
    features: ['Image Optimization', 'Code Minification', 'CDN Setup', 'Core Web Vitals'],
  },
  {
    icon: BookOpen,
    title: 'Landing Pages',
    desc: 'High-converting single-page sites for ads, launches, and campaigns. Designed to turn clicks into customers.',
    features: ['A/B Testing Ready', 'Conversion Focused', 'Ad Platform Integration', 'Lead Capture Forms'],
  },
  {
    icon: RefreshCw,
    title: 'Redesign & Refresh',
    desc: "Already have a website? We'll modernize it with a fresh design, better performance, and improved user experience.",
    features: ['Design Audit', 'Content Restructure', 'Performance Boost', 'SEO Refresh'],
  },
  {
    icon: Wrench,
    title: 'Maintenance & Support',
    desc: 'Monthly care plans to keep your site secure, updated, and running smoothly. Focus on your business, we handle the tech.',
    features: ['Security Updates', 'Content Changes', 'Uptime Monitoring', 'Monthly Reports'],
  },
]

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const cards = el.querySelectorAll('.service-card')
    const anim = gsap.fromTo(
      cards,
      { opacity: 0, y: 50, rotateX: 15 },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 0.7,
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
      id="services"
      className="relative w-full py-[120px] px-[5vw]"
      style={{ zIndex: 1, background: 'rgba(5, 5, 5, 0.83)', backdropFilter: 'blur(12px) saturate(1.2)' }}
    >
      <div className="max-w-[1200px] mx-auto">
        <div className="mb-12">
          <div className="font-mono-dm text-xs uppercase tracking-[0.12em] text-[#3d9970] mb-4">
            // SERVICES
          </div>
          <h2 className="font-sora font-bold text-[clamp(1.8rem,3.5vw,3rem)] leading-[1.05] tracking-[-0.02em] text-[#e8e8e8]">
            Everything You Need
            <br />
            <em className="text-[#3d9970] not-italic">to Go Live</em>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" style={{ perspective: '1000px' }}>
          {services.map((s, i) => (
            <div
              key={i}
              className="service-card group bg-[#111111] border border-[rgba(255,255,255,0.06)] rounded p-10 transition-all duration-300 hover:border-[rgba(61,153,112,0.3)] hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <s.icon size={40} strokeWidth={1.5} className="text-[#3d9970] mb-4 transition-colors duration-300" />
              <h3 className="font-sora font-semibold text-xl text-[#e8e8e8] mb-3">
                {s.title}
              </h3>
              <p className="font-inter text-[15px] text-[#7a7a7a] leading-[1.7] mb-5">
                {s.desc}
              </p>
              <div className="flex flex-col gap-2">
                {s.features.map((f) => (
                  <div key={f} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3d9970] flex-shrink-0" />
                    <span className="font-mono-dm text-[11px] uppercase tracking-[0.04em] text-[#7a7a7a]">
                      {f}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
