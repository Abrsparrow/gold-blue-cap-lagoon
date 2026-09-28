import { useEffect, useMemo, useRef, type MutableRefObject } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, useTexture } from "@react-three/drei";
import * as THREE from "three";

const KERNELS = 140;
const dummy = new THREE.Object3D();

type KernelState = {
  x: Float32Array; y: Float32Array; z: Float32Array;
  vx: Float32Array; vy: Float32Array; vz: Float32Array;
  rx: Float32Array; ry: Float32Array; rz: Float32Array;
  rsx: Float32Array; rsy: Float32Array; rsz: Float32Array;
  s: Float32Array;
};

function makeState(): KernelState {
  const n = KERNELS;
  const s: KernelState = {
    x: new Float32Array(n), y: new Float32Array(n), z: new Float32Array(n),
    vx: new Float32Array(n), vy: new Float32Array(n), vz: new Float32Array(n),
    rx: new Float32Array(n), ry: new Float32Array(n), rz: new Float32Array(n),
    rsx: new Float32Array(n), rsy: new Float32Array(n), rsz: new Float32Array(n),
    s: new Float32Array(n),
  };
  for (let i = 0; i < n; i++) restInBucket(s, i);
  return s;
}

function restInBucket(s: KernelState, i: number) {
  const a = Math.random() * Math.PI * 2;
  const r = Math.random() * 0.22;
  s.x[i] = Math.cos(a) * r;
  s.z[i] = Math.sin(a) * r * 0.85;
  s.y[i] = 0.05 + Math.random() * 0.38;
  s.vx[i] = 0; s.vy[i] = 0; s.vz[i] = 0;
  s.rx[i] = Math.random() * 6; s.ry[i] = Math.random() * 6; s.rz[i] = Math.random() * 6;
  s.rsx[i] = (Math.random() - 0.5) * 1.5;
  s.rsy[i] = (Math.random() - 0.5) * 1.5;
  s.rsz[i] = (Math.random() - 0.5) * 1.5;
  s.s[i] = 0.11 + Math.random() * 0.09;
}

function spawn(s: KernelState, cursor: number, dirx: number, diry: number) {
  const i = cursor % KERNELS;
  const a = Math.random() * Math.PI * 2;
  const r = Math.random() * 0.1;
  s.x[i] = Math.cos(a) * r;
  s.z[i] = Math.sin(a) * r;
  s.y[i] = 0.72;
  s.vx[i] = dirx * 1.8 + (Math.random() - 0.5) * 1.4;
  s.vy[i] = 1.5 + Math.random() * 1.7 + Math.max(0, diry) * 0.8;
  s.vz[i] = (Math.random() - 0.5) * 1.6;
  s.rsx[i] = (Math.random() - 0.5) * 12;
  s.rsy[i] = (Math.random() - 0.5) * 12;
  s.rsz[i] = (Math.random() - 0.5) * 12;
  s.s[i] = 0.12 + Math.random() * 0.1;
  return i + 1;
}

function Bucket() {
  const texture = useTexture("/media/popcorn-bucket.png");
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  const mat = useMemo(
    () => new THREE.MeshBasicMaterial({ map: texture, transparent: true, alphaTest: 0.08, side: THREE.DoubleSide, depthWrite: true }),
    [texture],
  );
  return (
    <group position={[0, 0.02, 0]}>
      <mesh material={mat} position={[0, 0.05, 0]}>
        <planeGeometry args={[1.15, 1.15]} />
      </mesh>
    </group>
  );
}

function Kernels({ pointer }: { pointer: MutableRefObject<{ x: number; y: number }> }) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const state = useMemo(() => makeState(), []);
  const cursor = useRef(0);
  const last = useRef({ x: 0, y: 0 });
  const idle = useRef(0);
  const intro = useRef(1.4);
  const texture = useTexture("/media/popcorn-kernel.png");
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  const mat = useMemo(
    () => new THREE.MeshBasicMaterial({ map: texture, transparent: true, alphaTest: 0.15, side: THREE.DoubleSide, depthWrite: false }),
    [texture],
  );

  useFrame((_, delta) => {
    const d = Math.min(delta, 0.05);
    const inst = mesh.current;
    if (!inst) return;
    const dx = pointer.current.x - last.current.x;
    const dy = pointer.current.y - last.current.y;
    const dist = Math.hypot(dx, dy);
    last.current.x = pointer.current.x;
    last.current.y = pointer.current.y;
    intro.current = Math.max(0, intro.current - d);
    idle.current += d;
    if (dist > 0.01) {
      const n = dist > 0.07 ? 6 : 2;
      for (let k = 0; k < n; k++) cursor.current = spawn(state, cursor.current, dx, dy);
      idle.current = 0;
    } else if (idle.current > (intro.current > 0 ? 0.05 : 0.16)) {
      idle.current = 0;
      cursor.current = spawn(state, cursor.current, (Math.random() - 0.5) * 0.6, 0.35 + Math.random() * 0.5);
    }
    const s = state;
    for (let i = 0; i < KERNELS; i++) {
      s.vy[i] -= 6.8 * d;
      s.x[i] += s.vx[i] * d;
      s.y[i] += s.vy[i] * d;
      s.z[i] += s.vz[i] * d;
      s.rx[i] += s.rsx[i] * d;
      s.ry[i] += s.rsy[i] * d;
      s.rz[i] += s.rsz[i] * d;
      const radial = Math.hypot(s.x[i], s.z[i]);
      if (s.y[i] < 0.45 && s.y[i] > -0.15 && radial < 0.32 && s.vy[i] < 0) {
        s.vy[i] *= -0.15; s.vx[i] *= 0.45; s.vz[i] *= 0.45;
        if (Math.abs(s.vy[i]) < 0.1) { s.vy[i] = 0; s.vx[i] *= 0.8; s.vz[i] *= 0.8; }
      }
      if (s.y[i] < -2.2) restInBucket(s, i);
      dummy.position.set(s.x[i], s.y[i], s.z[i]);
      dummy.rotation.set(s.rx[i], s.ry[i], s.rz[i]);
      dummy.scale.setScalar(s.s[i]);
      dummy.updateMatrix();
      inst.setMatrixAt(i, dummy.matrix);
    }
    inst.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, KERNELS]} material={mat} frustumCulled={false}>
      <planeGeometry args={[1, 1]} />
    </instancedMesh>
  );
}

function Scene() {
  const pointer = useRef({ x: 0, y: 0 });
  const group = useRef<THREE.Group>(null);
  const clock = useRef(0);
  const { size } = useThree();
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);
  useFrame((_, delta) => {
    const d = Math.min(delta, 0.05);
    clock.current += d;
    const wide = size.width >= 720;
    const targetX = wide ? 0.72 : 0.08;
    if (group.current) {
      group.current.position.x = THREE.MathUtils.damp(group.current.position.x, targetX, 4, d);
      group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, Math.sin(clock.current * 0.4) * 0.12 + pointer.current.x * 0.32, 4, d);
      group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, -0.08 + pointer.current.y * 0.12, 4, d);
    }
  });
  return (
    <>
      <color attach="background" args={["#070708"]} />
      <ambientLight intensity={0.85} />
      <spotLight position={[2.6, 4.4, 3.6]} intensity={40} angle={0.5} penumbra={0.78} color="#fff4e6" />
      <pointLight position={[-2.2, 1.4, 2.2]} intensity={8} color="#c9d4e8" />
      <pointLight position={[0.8, 0.2, 2.2]} intensity={5} color="#c45c4a" />
      <group ref={group} position={[0.2, 0.06, 0]} scale={1.05}>
        <Bucket />
        <Kernels pointer={pointer} />
        <ContactShadows position={[0, -0.58, 0]} opacity={0.5} scale={8} blur={2.6} far={2.2} color="#000000" />
      </group>
    </>
  );
}

export function PopcornCanvas() {
  return (
    <Canvas
      camera={{ position: [0.12, 0.5, 2.55], fov: 40 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: false, preserveDrawingBuffer: true, powerPreference: "high-performance", failIfMajorPerformanceCaveat: false }}
      flat
      frameloop="always"
      style={{ width: "100%", height: "100%", display: "block" }}
      onCreated={({ gl }) => { gl.setClearColor("#070708", 1); }}
    >
      <Scene />
    </Canvas>
  );
}
