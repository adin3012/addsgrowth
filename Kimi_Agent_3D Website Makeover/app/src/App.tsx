import { useEffect, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import IcosahedronSphere from './components/IcosahedronSphere'
import StarField from './components/StarField'
import Navigation from './components/Navigation'
import Hero from './sections/Hero'
import Intro from './sections/Intro'
import Work from './sections/Work'
import Services from './sections/Services'
import Process from './sections/Process'
import Testimonials from './sections/Testimonials'
import Pricing from './sections/Pricing'
import Contact from './sections/Contact'
import Footer from './sections/Footer'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
      duration: 1.2,
      smoothWheel: true,
    })
    lenisRef.current = lenis

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0)

    lenis.on('scroll', ScrollTrigger.update)

    return () => {
      lenis.destroy()
    }
  }, [])

  return (
    <>
      {/* 3D Background Canvas - Fixed */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          background: '#050505',
        }}
      >
        <Canvas
          camera={{ position: [0, 0, 3.5], fov: 45, near: 0.1, far: 1000 }}
          gl={{ alpha: false, antialias: true, toneMapping: 3, toneMappingExposure: 1.2 }}
          style={{ background: '#050505' }}
        >
          <StarField />
          <IcosahedronSphere />
        </Canvas>
      </div>

      {/* Navigation */}
      <Navigation />

      {/* Scrollable Content */}
      <main className="relative" style={{ zIndex: 1 }}>
        <Hero />
        <Intro />
        <Work />
        <Services />
        <Process />
        <Testimonials />
        <Pricing />
        <Contact />
        <Footer />
      </main>
    </>
  )
}
