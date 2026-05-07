import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Mail, Phone, Calendar } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', type: '', message: '' })

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const items = el.querySelectorAll('.contact-reveal')
    const anim = gsap.fromTo(
      items,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.15,
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

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) return

    setLoading(true)
    setError(false)

    const payload = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      website: formData.type || 'N/A',
      message: formData.message.trim(),
      date: new Date().toISOString(),
    }

    try {
      await fetch(
        'https://script.google.com/macros/s/AKfycbzOXKcXai9-bUO_VnCa8T6y2XbSvqE-02fSaU0_a27eDfT30eaguajNhrFh5Z48TWAv/exec',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        }
      )
      setSubmitted(true)
      if (typeof window !== 'undefined' && 'gtag' in window) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ;(window as any).gtag('event', 'generate_lead', { method: 'website_form' })
      }
    } catch {
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  const contactInfo = [
    { icon: Mail, label: 'Email', value: 'contact@addsgrowth.org', href: 'mailto:contact@addsgrowth.org' },
    { icon: Phone, label: 'Call/WhatsApp', value: '+91 86387 40815', href: 'https://wa.me/918638740815' },
    { icon: Calendar, label: 'Schedule', value: 'Book a Free Call', href: 'https://calendly.com/adin3012/free-consultation' },
  ]

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative w-full py-[120px] px-[5vw]"
      style={{ zIndex: 1, background: 'rgba(5, 5, 5, 0.84)', backdropFilter: 'blur(12px) saturate(1.2)' }}
    >
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Left column */}
        <div>
          <div className="contact-reveal font-mono-dm text-xs uppercase tracking-[0.12em] text-[#3d9970] mb-4">
            // GET IN TOUCH
          </div>

          <h2 className="contact-reveal font-sora font-bold text-[clamp(1.8rem,3.5vw,3rem)] leading-[1.05] tracking-[-0.02em] text-[#e8e8e8] mb-6">
            Let's Build
            <br />
            <em className="text-[#3d9970] not-italic">Something Great</em>
          </h2>

          <p className="contact-reveal font-inter text-base text-[#7a7a7a] leading-[1.7] mb-10 max-w-[400px]">
            Ready to go live? Book a free discovery call or send us a message. We'll get back to you within 24 hours.
          </p>

          <div className="flex flex-col gap-4">
            {contactInfo.map((c) => (
              <a
                key={c.label}
                href={c.href}
                target={c.href.startsWith('http') ? '_blank' : undefined}
                rel={c.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="contact-reveal flex items-center gap-3 group"
              >
                <c.icon size={20} strokeWidth={1.5} className="text-[#3d9970] flex-shrink-0" />
                <span className="font-inter text-sm text-[#e8e8e8] group-hover:text-[#3d9970] transition-colors duration-200">{c.value}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Right column - Form */}
        <div className="contact-reveal">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="bg-[#111111] border border-[rgba(255,255,255,0.06)] rounded p-8 lg:p-10">
              <div className="mb-5">
                <label className="block font-mono-dm text-[11px] uppercase tracking-[0.08em] text-[#7a7a7a] mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="John Smith"
                  className="w-full bg-[#0a0a0a] border border-[rgba(255,255,255,0.1)] rounded px-4 py-3.5 text-[#e8e8e8] font-inter text-sm placeholder:text-[#3a3a3a] outline-none focus:border-[#3d9970] transition-colors duration-200"
                />
              </div>

              <div className="mb-5">
                <label className="block font-mono-dm text-[11px] uppercase tracking-[0.08em] text-[#7a7a7a] mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="john@yourbusiness.com"
                  className="w-full bg-[#0a0a0a] border border-[rgba(255,255,255,0.1)] rounded px-4 py-3.5 text-[#e8e8e8] font-inter text-sm placeholder:text-[#3a3a3a] outline-none focus:border-[#3d9970] transition-colors duration-200"
                />
              </div>

              <div className="mb-5">
                <label className="block font-mono-dm text-[11px] uppercase tracking-[0.08em] text-[#7a7a7a] mb-2">
                  Business Type
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full bg-[#0a0a0a] border border-[rgba(255,255,255,0.1)] rounded px-4 py-3.5 text-[#e8e8e8] font-inter text-sm outline-none focus:border-[#3d9970] transition-colors duration-200 appearance-none cursor-pointer"
                >
                  <option value="">Select...</option>
                  <option value="coach">Coach</option>
                  <option value="agency">Agency</option>
                  <option value="small-business">Small Business</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="mb-6">
                <label className="block font-mono-dm text-[11px] uppercase tracking-[0.08em] text-[#7a7a7a] mb-2">
                  Message
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us about your project..."
                  className="w-full bg-[#0a0a0a] border border-[rgba(255,255,255,0.1)] rounded px-4 py-3.5 text-[#e8e8e8] font-inter text-sm placeholder:text-[#3a3a3a] outline-none focus:border-[#3d9970] transition-colors duration-200 resize-none"
                />
              </div>

              {error && (
                <div className="mb-4 text-sm text-red-400 text-center">
                  Something went wrong. Please try again or email us directly.
                </div>
              )}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#3d9970] text-[#050505] font-semibold text-sm uppercase tracking-[0.06em] py-3.5 rounded hover:bg-[#4aaa7d] transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed relative"
              >
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          ) : (
            <div className="bg-[#111111] border border-[rgba(255,255,255,0.06)] rounded p-10 flex flex-col items-center justify-center text-center min-h-[400px]">
              <div className="text-[#3d9970] text-5xl mb-4">✓</div>
              <h3 className="font-sora font-bold text-xl text-[#e8e8e8] mb-2">Message Sent!</h3>
              <p className="font-inter text-sm text-[#7a7a7a]">
                We'll be in touch within 24 hours.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
