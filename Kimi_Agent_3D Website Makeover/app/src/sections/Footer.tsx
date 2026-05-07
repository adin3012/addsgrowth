export default function Footer() {
  const scrollTo = (href: string) => {
    if (href === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer
      className="relative w-full py-[60px] px-[5vw] pb-10 border-t border-[rgba(255,255,255,0.06)]"
      style={{ zIndex: 1, background: '#050505' }}
    >
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          {/* Brand */}
          <div>
            <img
              src="./logo.svg"
              alt="AddsGrowth"
              className="h-8 w-auto mb-3"
              draggable={false}
            />
            <p className="font-inter text-[13px] text-[#7a7a7a] leading-[1.7] max-w-[240px]">
              Custom websites that grow your business.
            </p>
          </div>

          {/* Services */}
          <div>
            <div className="font-mono-dm text-[11px] uppercase tracking-[0.12em] text-[#7a7a7a] mb-4">
              Services
            </div>
            <ul className="flex flex-col gap-2.5">
              {['Web Design', 'SEO', 'Landing Pages', 'Redesign', 'Maintenance'].map((item) => (
                <li key={item}>
                  <a
                    href="#services"
                    onClick={(e) => { e.preventDefault(); scrollTo('#services') }}
                    className="font-inter text-[13px] text-[#7a7a7a] hover:text-[#e8e8e8] transition-colors duration-200"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <div className="font-mono-dm text-[11px] uppercase tracking-[0.12em] text-[#7a7a7a] mb-4">
              Company
            </div>
            <ul className="flex flex-col gap-2.5">
              {[
                { label: 'Process', href: '#process' },
                { label: 'Pricing', href: '#pricing' },
                { label: 'Contact', href: '#contact' },
              ].map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    onClick={(e) => { e.preventDefault(); scrollTo(item.href) }}
                    className="font-inter text-[13px] text-[#7a7a7a] hover:text-[#e8e8e8] transition-colors duration-200"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <div className="font-mono-dm text-[11px] uppercase tracking-[0.12em] text-[#7a7a7a] mb-4">
              Connect
            </div>
            <ul className="flex flex-col gap-2.5">
              {[
                { label: 'Instagram', href: 'https://www.instagram.com/addsgrowth?igsh=MTRpZDhyM3Bjb3RmbA%3D%3D&utm_source=qr' },
                { label: 'Email', href: 'mailto:contact@addsgrowth.org' },
                { label: 'Phone', href: 'https://wa.me/918638740815' },
                { label: 'Book a Call', href: 'https://calendly.com/adin3012/free-consultation' },
              ].map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="font-inter text-[13px] text-[#7a7a7a] hover:text-[#e8e8e8] transition-colors duration-200"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-[rgba(255,255,255,0.06)] flex flex-col sm:flex-row justify-between items-center gap-3">
          <div className="font-mono-dm text-[11px] text-[#7a7a7a]">
            © 2026 AddsGrowth. All rights reserved.
          </div>
          <div className="font-inter text-[12px] text-[#7a7a7a]">
            USA · UAE · Australia · India · UK
          </div>
        </div>
      </div>
    </footer>
  )
}
