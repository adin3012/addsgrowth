import { useRef, useMemo, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* ─────────────────────── Shaders ─────────────────────── */

const faceVertexShader = `
  attribute vec3 aNormal;
  attribute vec3 aLineDistances;
  uniform mat4 uRotationMatrix;
  uniform float uScale;
  uniform float uZoom;
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec3 vLineDistances;

  void main() {
    vec3 rotated = (uRotationMatrix * vec4(position, 1.0)).xyz;
    vec3 scaled = rotated * uScale * uZoom;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(scaled, 1.0);
    vNormal = aNormal;
    vPosition = position;
    vLineDistances = aLineDistances;
  }
`

const faceFragmentShader = `
  precision highp float;
  uniform float uTime;
  uniform float uFaceIndex;
  uniform float uFaceCount;
  uniform vec3 uLineColor;
  uniform vec3 uGlowColor;
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec3 vLineDistances;

  vec3 hsv2rgb(vec3 c) {
    vec3 rgb = clamp(abs(mod(c.x * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
    rgb = rgb * rgb * (3.0 - 2.0 * rgb);
    return c.z * mix(vec3(1.0), rgb, c.y);
  }

  void main() {
    vec3 lightDirection = normalize(vec3(0.2, 0.5, 1.0));
    float lightIntensity = dot(vNormal, lightDirection);
    lightIntensity = clamp(lightIntensity, 0.0, 1.0);

    float hue = fract((uFaceIndex / uFaceCount) + (uTime * 0.008));
    vec3 rgb = hsv2rgb(vec3(hue, 0.7, 0.9));

    // Jewel-like face color with fresnel
    float fresnel = 1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0)));
    fresnel = pow(fresnel, 2.0);

    vec4 faceColor = vec4(mix(rgb * 0.3, uGlowColor * 0.6, fresnel), 0.15 + fresnel * 0.1);
    faceColor += vec4(vec3(lightIntensity * 0.15), 0.0);

    float d = min(min(vLineDistances.x, vLineDistances.y), vLineDistances.z);
    float lineMix = smoothstep(0.0, 1.2, d);

    gl_FragColor = mix(vec4(uLineColor, 0.95), faceColor, lineMix);
  }
`

const wireframeFragmentShader = `
  precision highp float;
  uniform float uTime;
  uniform vec3 uLineColor;
  uniform vec3 uGlowColor;
  uniform float uPulseSpeed;
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec3 vLineDistances;

  void main() {
    vec3 lightDirection = normalize(vec3(0.2, 0.5, 1.0));
    float lightIntensity = dot(vNormal, lightDirection);
    lightIntensity = clamp(lightIntensity, 0.0, 1.0);

    float flowIntensity = (sin((vPosition.x + vPosition.y + vPosition.z) * 4.0 + uTime * uPulseSpeed * 0.3) + 1.0) * 0.5;
    float flow2 = (sin((vPosition.x - vPosition.y + vPosition.z) * 3.0 + uTime * uPulseSpeed * 0.2) + 1.0) * 0.5;

    float d = min(min(vLineDistances.x, vLineDistances.y), vLineDistances.z);
    float lineAlpha = 1.0 - smoothstep(0.0, 1.2, d);

    float alpha = lineAlpha * (0.4 + (lightIntensity * 0.35) + (flowIntensity * 0.35) + (flow2 * 0.15));

    vec3 finalColor = mix(uLineColor, uGlowColor, flowIntensity * 0.6);
    finalColor += uGlowColor * flow2 * 0.3;

    gl_FragColor = vec4(finalColor, alpha);
  }
`

const wireframeVertexShader = `
  attribute vec3 aNormal;
  attribute vec3 aLineDistances;
  uniform mat4 uRotationMatrix;
  uniform float uScale;
  uniform float uZoom;
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec3 vLineDistances;

  void main() {
    vec3 rotated = (uRotationMatrix * vec4(position, 1.0)).xyz;
    vec3 scaled = rotated * uScale * uZoom;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(scaled, 1.0);
    vNormal = aNormal;
    vPosition = position;
    vLineDistances = aLineDistances;
  }
`

/* ─────────────────────── Inner Glow Sphere ─────────────────────── */

function InnerGlowSphere({ scale, rotMatrixRef }: { scale: number; rotMatrixRef: React.RefObject<THREE.Matrix4 | null> }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const matRef = useRef<THREE.ShaderMaterial>(null)

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uScale: { value: scale * 0.85 },
    uColor: { value: new THREE.Color('#1a5c3a') },
    uGlowColor: { value: new THREE.Color('#3d9970') },
    uRotationMatrix: { value: new THREE.Matrix4() },
  }), [scale])

  useFrame(() => {
    if (matRef.current && rotMatrixRef.current) {
      matRef.current.uniforms.uTime.value += 0.016
      matRef.current.uniforms.uRotationMatrix.value = rotMatrixRef.current
    }
  })

  const vertexShader = `
    uniform mat4 uRotationMatrix;
    uniform float uScale;
    varying vec3 vNormal;
    varying vec3 vPosition;
    void main() {
      vec3 rotated = (uRotationMatrix * vec4(position, 1.0)).xyz;
      vec3 scaled = rotated * uScale;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(scaled, 1.0);
      vNormal = normal;
      vPosition = position;
    }
  `

  const fragmentShader = `
    precision highp float;
    uniform float uTime;
    uniform vec3 uColor;
    uniform vec3 uGlowColor;
    varying vec3 vNormal;
    varying vec3 vPosition;
    void main() {
      float fresnel = 1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0)));
      fresnel = pow(fresnel, 3.0);
      float pulse = sin(uTime * 0.8 + vPosition.x * 3.0) * 0.5 + 0.5;
      vec3 color = mix(uColor, uGlowColor, fresnel * pulse);
      float alpha = fresnel * 0.25 * pulse;
      gl_FragColor = vec4(color, alpha);
    }
  `

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1, 4]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        side={THREE.BackSide}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  )
}

/* ─────────────────────── Floating Particles ─────────────────────── */

function FloatingParticles({ scale }: { scale: number }) {
  const pointsRef = useRef<THREE.Points>(null)
  const count = 400

  const { positions, speeds, sizes } = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const spd = new Float32Array(count)
    const sz = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = 1.4 + Math.random() * 1.2
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      pos[i * 3 + 2] = r * Math.cos(phi)
      spd[i] = 0.2 + Math.random() * 0.8
      sz[i] = 1.0 + Math.random() * 3.0
    }
    return { positions: pos, speeds: spd, sizes: sz }
  }, [])

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uColor: { value: new THREE.Color('#4aaa7d') },
    uScale: { value: scale },
  }), [scale])

  useFrame(({ clock }) => {
    if (pointsRef.current) {
      const t = clock.getElapsedTime()
      pointsRef.current.rotation.y = t * 0.02
      pointsRef.current.rotation.x = Math.sin(t * 0.01) * 0.1
      if (pointsRef.current.material) {
        (pointsRef.current.material as THREE.ShaderMaterial).uniforms.uTime.value = t
      }
    }
  })

  const vertexShader = `
    attribute float aSize;
    attribute float aSpeed;
    uniform float uTime;
    uniform float uScale;
    varying float vAlpha;
    void main() {
      vec3 pos = position;
      float t = uTime * aSpeed * 0.3;
      pos.y += sin(t + pos.x * 2.0) * 0.08;
      pos.x += cos(t * 0.7 + pos.y * 2.0) * 0.05;
      vec4 mvPosition = modelViewMatrix * vec4(pos * uScale, 1.0);
      gl_PointSize = aSize * uScale * (300.0 / -mvPosition.z);
      gl_Position = projectionMatrix * mvPosition;
      float dist = length(pos);
      vAlpha = 1.0 - smoothstep(1.4, 2.6, dist);
      vAlpha *= 0.5 + 0.5 * sin(t * 2.0 + pos.x * 5.0);
    }
  `

  const fragmentShader = `
    precision highp float;
    uniform vec3 uColor;
    varying float vAlpha;
    void main() {
      float d = length(gl_PointCoord - vec2(0.5));
      float glow = 1.0 - smoothstep(0.0, 0.5, d);
      glow = pow(glow, 2.0);
      gl_FragColor = vec4(uColor, glow * vAlpha * 0.9);
    }
  `

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aSize" args={[sizes, 1]} />
        <bufferAttribute attach="attributes-aSpeed" args={[speeds, 1]} />
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

/* ─────────────────────── Outer Halo Ring ─────────────────────── */

function HaloRing({ scale, rotMatrixRef }: { scale: number; rotMatrixRef: React.RefObject<THREE.Matrix4 | null> }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const matRef = useRef<THREE.ShaderMaterial>(null)

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uScale: { value: scale * 1.6 },
    uRotationMatrix: { value: new THREE.Matrix4() },
  }), [scale])

  useFrame(() => {
    if (matRef.current && rotMatrixRef.current) {
      matRef.current.uniforms.uTime.value += 0.016
      matRef.current.uniforms.uRotationMatrix.value = rotMatrixRef.current
    }
  })

  const vertexShader = `
    uniform mat4 uRotationMatrix;
    uniform float uScale;
    varying vec3 vNormal;
    void main() {
      vec3 rotated = (uRotationMatrix * vec4(position, 1.0)).xyz;
      vec3 scaled = rotated * uScale;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(scaled, 1.0);
      vNormal = normal;
    }
  `

  const fragmentShader = `
    precision highp float;
    uniform float uTime;
    varying vec3 vNormal;
    void main() {
      float fresnel = 1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0)));
      fresnel = pow(fresnel, 4.0);
      float pulse = sin(uTime * 0.5) * 0.3 + 0.7;
      vec3 color = vec3(0.24, 0.6, 0.38) * fresnel * pulse;
      float alpha = fresnel * 0.12 * pulse;
      gl_FragColor = vec4(color, alpha);
    }
  `

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1, 3]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        side={THREE.FrontSide}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  )
}

/* ─────────────────────── Main Sphere ─────────────────────── */

export default function IcosahedronSphere() {
  const timeRef = useRef(0)
  const rotXRef = useRef(0)
  const rotYRef = useRef(0)
  const zoomRef = useRef({ value: 1.0 })
  const matRefs = useRef<THREE.ShaderMaterial[]>([])
  const rotMatrixRef = useRef<THREE.Matrix4>(new THREE.Matrix4())
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 })
  const { size } = useThree()

  const { faceGeo, wireGeo, faceCount } = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(1, 3)
    const posAttr = geo.attributes.position
    const normalAttr = geo.attributes.normal
    const count = posAttr.count

    const facePositions: number[] = []
    const faceNormals: number[] = []
    const faceLineDists: number[] = []
    const faceIndices: number[] = []

    const wirePositions: number[] = []
    const wireNormals: number[] = []
    const wireLineDists: number[] = []

    let faceIdx = 0
    for (let i = 0; i < count; i += 3) {
      const v0 = new THREE.Vector3().fromBufferAttribute(posAttr, i)
      const v1 = new THREE.Vector3().fromBufferAttribute(posAttr, i + 1)
      const v2 = new THREE.Vector3().fromBufferAttribute(posAttr, i + 2)
      const n0 = new THREE.Vector3().fromBufferAttribute(normalAttr, i)
      const n1 = new THREE.Vector3().fromBufferAttribute(normalAttr, i + 1)
      const n2 = new THREE.Vector3().fromBufferAttribute(normalAttr, i + 2)

      facePositions.push(v0.x, v0.y, v0.z, v1.x, v1.y, v1.z, v2.x, v2.y, v2.z)
      faceNormals.push(n0.x, n0.y, n0.z, n1.x, n1.y, n1.z, n2.x, n2.y, n2.z)
      faceLineDists.push(0, 1, 1, 1, 0, 1, 1, 1, 0)
      faceIndices.push(faceIdx, faceIdx, faceIdx)
      faceIdx++

      wirePositions.push(
        v0.x, v0.y, v0.z, v1.x, v1.y, v1.z,
        v1.x, v1.y, v1.z, v2.x, v2.y, v2.z,
        v2.x, v2.y, v2.z, v0.x, v0.y, v0.z
      )
      wireNormals.push(
        n0.x, n0.y, n0.z, n1.x, n1.y, n1.z,
        n1.x, n1.y, n1.z, n2.x, n2.y, n2.z,
        n2.x, n2.y, n2.z, n0.x, n0.y, n0.z
      )
      wireLineDists.push(
        0, 1, 1, 0, 1, 1,
        1, 0, 1, 1, 0, 1,
        1, 1, 0, 1, 1, 0
      )
    }

    const fGeo = new THREE.BufferGeometry()
    fGeo.setAttribute('position', new THREE.Float32BufferAttribute(facePositions, 3))
    fGeo.setAttribute('aNormal', new THREE.Float32BufferAttribute(faceNormals, 3))
    fGeo.setAttribute('aLineDistances', new THREE.Float32BufferAttribute(faceLineDists, 3))
    fGeo.setAttribute('aFaceIndex', new THREE.Float32BufferAttribute(faceIndices, 1))

    const wGeo = new THREE.BufferGeometry()
    wGeo.setAttribute('position', new THREE.Float32BufferAttribute(wirePositions, 3))
    wGeo.setAttribute('aNormal', new THREE.Float32BufferAttribute(wireNormals, 3))
    wGeo.setAttribute('aLineDistances', new THREE.Float32BufferAttribute(wireLineDists, 3))

    geo.dispose()
    return { faceGeo: fGeo, wireGeo: wGeo, faceCount: faceIdx }
  }, [])

  // Scroll zoom
  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: '.hero-section',
      start: 'top top',
      end: 'bottom top',
      scrub: true,
      onUpdate: (self) => {
        const p = self.progress
        zoomRef.current.value = p <= 0.2 ? 1.0 + p * 2.0 : 1.4 - (p - 0.2) * 0.5
      },
    })
    return () => { trigger.kill() }
  }, [])

  // Mouse tracking
  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = (e.clientX / window.innerWidth - 0.5) * 0.4
      mouseRef.current.targetY = (e.clientY / window.innerHeight - 0.5) * 0.4
    }
    window.addEventListener('mousemove', onMouseMove)
    return () => window.removeEventListener('mousemove', onMouseMove)
  }, [])

  const isMobile = size.width < 768
  const scale = isMobile ? 0.6 : 1.0

  const faceUniforms = useMemo(() => ({
    uRotationMatrix: { value: new THREE.Matrix4() },
    uScale: { value: scale },
    uZoom: { value: 1.0 },
    uTime: { value: 0.0 },
    uFaceIndex: { value: 0.0 },
    uFaceCount: { value: faceCount },
    uLineColor: { value: new THREE.Vector3(0.14, 0.55, 0.35) },
    uGlowColor: { value: new THREE.Vector3(0.35, 0.85, 0.55) },
  }), [scale, faceCount])

  const wireUniforms = useMemo(() => ({
    uRotationMatrix: { value: new THREE.Matrix4() },
    uScale: { value: scale },
    uZoom: { value: 1.0 },
    uTime: { value: 0.0 },
    uLineColor: { value: new THREE.Vector3(0.14, 0.55, 0.35) },
    uGlowColor: { value: new THREE.Vector3(0.35, 0.85, 0.55) },
    uPulseSpeed: { value: 0.6 },
  }), [scale])

  useFrame(() => {
    timeRef.current += 0.016
    rotXRef.current += 0.0011
    rotYRef.current += 0.0073

    // Mouse lerp
    mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.03
    mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.03

    const rotXMatrix = new THREE.Matrix4().makeRotationX(rotXRef.current + mouseRef.current.y * 0.5)
    const rotYMatrix = new THREE.Matrix4().makeRotationY(rotYRef.current + mouseRef.current.x * 0.5)
    const rotMatrix = rotYMatrix.multiply(rotXMatrix)
    rotMatrixRef.current = rotMatrix

    matRefs.current.forEach((mat) => {
      if (mat) {
        mat.uniforms.uRotationMatrix.value = rotMatrix
        mat.uniforms.uTime.value = timeRef.current
        mat.uniforms.uZoom.value = zoomRef.current.value
      }
    })
  })

  return (
    <>
      {/* Post-processing Bloom */}
      <EffectComposer>
        <Bloom
          intensity={0.7}
          luminanceThreshold={0.15}
          luminanceSmoothing={0.95}
          mipmapBlur
        />
      </EffectComposer>

      {/* Ambient light for normals */}
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={0.5} color="#3d9970" />

      {/* Inner glow */}
      <InnerGlowSphere scale={scale} rotMatrixRef={rotMatrixRef} />

      {/* Main sphere - faces */}
      <mesh geometry={faceGeo} frustumCulled={false}>
        <shaderMaterial
          ref={(el) => { if (el) matRefs.current[0] = el }}
          vertexShader={faceVertexShader}
          fragmentShader={faceFragmentShader}
          uniforms={faceUniforms}
          transparent
          depthTest
          depthWrite={false}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Main sphere - wireframe */}
      <lineSegments geometry={wireGeo} frustumCulled={false}>
        <shaderMaterial
          ref={(el) => { if (el) matRefs.current[1] = el }}
          vertexShader={wireframeVertexShader}
          fragmentShader={wireframeFragmentShader}
          uniforms={wireUniforms}
          transparent
          depthTest
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>

      {/* Outer halo */}
      <HaloRing scale={scale} rotMatrixRef={rotMatrixRef} />

      {/* Floating particles */}
      <FloatingParticles scale={scale} />
    </>
  )
}
