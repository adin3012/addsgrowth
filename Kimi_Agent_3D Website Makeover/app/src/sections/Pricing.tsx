import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const plans = [
  {
    name: 'Starter',
    price: '599',
    subtitle: 'one-time project',
    desc: 'Perfect for new businesses and personal brands.',
    highlighted: false,
    features: [
      'Up to 3 Pages',
      'Mobile Responsive',
      'Contact Form',
      'Basic SEO',
      '7-Day Delivery',
      '2 Revisions',
    ],
  },
  {
    name: 'Growth',
    price: '1,199',
    subtitle: 'full business website',
    desc: 'For businesses ready to scale online.',
    highlighted: true,
    badge: 'Most Popular',
    features: [
      'Up to 7 Pages',
      'Blog Setup',
      'Advanced SEO',
      'Google Analytics',
      'Social Media Integration',
      '14-Day Delivery',
      'Unlimited Revisions',
    ],
  },
  {
    name: 'Premium',
    price: '2,399',
    subtitle: 'complete digital presence',
    desc: 'Full-service package for established brands.',
    highlighted: false,
    features: [
      'Unlimited Pages',
      'E-commerce Ready',
      'Custom Features',
      'Priority Support',
      'Monthly Maintenance',
      '21-Day Delivery',
      'Unlimited Revisions',
    ],
  },
]

export default function Pricing() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const cards = el.querySelectorAll('.pricing-card')
    const anim = gsap.fromTo(
      cards,
      { opacity: 0, scale: 0.95 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: 'back.out(1.2)',
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
      id="pricing"
      className="relative w-full py-[120px] px-[5vw]"
      style={{ zIndex: 1, background: 'rgba(5, 5, 5, 0.86)', backdropFilter: 'blur(12px) saturate(1.2)' }}
    >
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-12">
          <div className="font-mono-dm text-xs uppercase tracking-[0.12em] text-[#3d9970] mb-4">
            // PRICING
          </div>
          <h2 className="font-sora font-bold text-[clamp(1.8rem,3.5vw,3rem)] leading-[1.05] tracking-[-0.02em] text-[#e8e8e8]">
            Simple, Transparent
            <br />
            <em className="text-[#3d9970] not-italic">Pricing</em>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`pricing-card bg-[#111111] rounded p-10 relative transition-all duration-300 hover:-translate-y-1 ${
                p.highlighted
                  ? 'border border-[#3d9970] shadow-[0_0_40px_rgba(61,153,112,0.08)]'
                  : 'border border-[rgba(255,255,255,0.06)] hover:bg-[#161616]'
              }`}
            >
              {p.badge && (
                <div className="inline-block font-mono-dm text-[11px] uppercase tracking-[0.08em] bg-[rgba(61,153,112,0.1)] text-[#3d9970] border border-[rgba(61,153,112,0.2)] px-3 py-1 rounded mb-4">
                  {p.badge}
                </div>
              )}

              <div className="font-mono-dm text-[13px] uppercase tracking-[0.12em] text-[#7a7a7a] mb-4">
                {p.name}
              </div>

              <div className="font-sora font-extrabold text-5xl text-[#e8e8e8] tracking-[-0.04em] mb-1">
                <span className="text-[#3d9970] text-base font-bold align-super mr-1">$</span>
                {p.price}
              </div>

              <div className="font-mono-dm text-[13px] text-[#7a7a7a] mb-4">
                {p.subtitle}
              </div>

              <p className="font-inter text-sm text-[#7a7a7a] leading-[1.6] mb-6">
                {p.desc}
              </p>

              <div className="h-[1px] bg-[rgba(255,255,255,0.06)] mb-6" />

              <ul className="flex flex-col gap-3 mb-8">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-[#7a7a7a]">
                    <span className="text-[#3d9970] mt-0.5 flex-shrink-0">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M3 7L6 10L11 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault()
                  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className={`block w-full text-center text-[13px] font-semibold uppercase tracking-[0.06em] py-3.5 rounded transition-colors duration-200 ${
                  p.highlighted
                    ? 'bg-[#3d9970] text-[#050505] hover:bg-[#4aaa7d]'
                    : 'bg-[#1a1a1a] text-[#e8e8e8] border border-[rgba(255,255,255,0.1)] hover:border-[#3d9970] hover:text-[#3d9970]'
                }`}
              >
                Get Started
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
