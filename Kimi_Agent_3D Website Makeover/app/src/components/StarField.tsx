import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function StarField() {
  const pointsRef = useRef<THREE.Points>(null)
  const count = 2000

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = 5 + Math.random() * 15
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      pos[i * 3 + 2] = r * Math.cos(phi)
    }
    return pos
  }, [])

  const sizes = useMemo(() => {
    const s = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      s[i] = 0.5 + Math.random() * 2.0
    }
    return s
  }, [])

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
  }), [])

  useFrame(({ clock }) => {
    if (pointsRef.current) {
      const t = clock.getElapsedTime()
      pointsRef.current.rotation.y = t * 0.003
      if (pointsRef.current.material) {
        (pointsRef.current.material as THREE.ShaderMaterial).uniforms.uTime.value = t
      }
    }
  })

  const vertexShader = `
    attribute float aSize;
    uniform float uTime;
    varying float vAlpha;
    void main() {
      vec3 pos = position;
      vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
      gl_PointSize = aSize * (200.0 / -mvPosition.z);
      gl_Position = projectionMatrix * mvPosition;
      vAlpha = 0.45;
    }
  `

  const fragmentShader = `
    precision highp float;
    varying float vAlpha;
    void main() {
      float d = length(gl_PointCoord - vec2(0.5));
      float glow = 1.0 - smoothstep(0.0, 0.5, d);
      glow = pow(glow, 2.0);
      vec3 color = vec3(0.7, 0.85, 0.75);
      gl_FragColor = vec4(color, glow * vAlpha * 0.5);
    }
  `

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aSize" args={[sizes, 1]} />
      </bufferGeometry>
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}
