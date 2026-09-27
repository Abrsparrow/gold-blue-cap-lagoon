import { useEffect, useLayoutEffect, useMemo, useRef, type MutableRefObject } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows } from "@react-three/drei";
import * as THREE from "three";

const KERNELS = 180;
const dummy = new THREE.Object3D();
const tint = new THREE.Color();

type KernelState = {
  x: Float32Array;
  y: Float32Array;
  z: Float32Array;
  vx: Float32Array;
  vy: Float32Array;
  vz: Float32Array;
  rx: Float32Array;
  ry: Float32Array;
  rz: Float32Array;
  rsx: Float32Array;
  rsy: Float32Array;
  rsz: Float32Array;
  s: Float32Array;
};

function makeState(): KernelState {
  const n = KERNELS;
  const s: KernelState = {
    x: new Float32Array(n),
    y: new Float32Array(n),
    z: new Float32Array(n),
    vx: new Float32Array(n),
    vy: new Float32Array(n),
    vz: new Float32Array(n),
    rx: new Float32Array(n),
    ry: new Float32Array(n),
    rz: new Float32Array(n),
    rsx: new Float32Array(n),
    rsy: new Float32Array(n),
    rsz: new Float32Array(n),
    s: new Float32Array(n),
  };
  for (let i = 0; i < n; i++) restInBucket(s, i);
  return s;
}

function restInBucket(s: KernelState, i: number) {
  const a = Math.random() * Math.PI * 2;
  const r = Math.random() * 0.28;
  s.x[i] = Math.cos(a) * r;
  s.z[i] = Math.sin(a) * r * 0.9;
  s.y[i] = -0.02 + Math.random() * 0.42;
  s.vx[i] = 0;
  s.vy[i] = 0;
  s.vz[i] = 0;
  s.rx[i] = Math.random() * 6;
  s.ry[i] = Math.random() * 6;
  s.rz[i] = Math.random() * 6;
  s.rsx[i] = (Math.random() - 0.5) * 2;
  s.rsy[i] = (Math.random() - 0.5) * 2;
  s.rsz[i] = (Math.random() - 0.5) * 2;
  s.s[i] = 0.05 + Math.random() * 0.04;
}

function spawn(s: KernelState, cursor: number, dirx: number, diry: number) {
  const i = cursor % KERNELS;
  const a = Math.random() * Math.PI * 2;
  const r = Math.random() * 0.12;
  s.x[i] = Math.cos(a) * r;
  s.z[i] = Math.sin(a) * r;
  s.y[i] = 0.62;
  s.vx[i] = dirx * 1.8 + (Math.random() - 0.5) * 1.4;
  s.vy[i] = 1.5 + Math.random() * 1.7 + Math.max(0, diry) * 0.8;
  s.vz[i] = (Math.random() - 0.5) * 1.6;
  s.rsx[i] = (Math.random() - 0.5) * 14;
  s.rsy[i] = (Math.random() - 0.5) * 14;
  s.rsz[i] = (Math.random() - 0.5) * 14;
  s.s[i] = 0.055 + Math.random() * 0.045;
  return i + 1;
}

function Bucket() {
  const stripeMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#efe7dc", roughness: 0.42 }),
    [],
  );
  const redMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#9a322b",
        roughness: 0.4,
        metalness: 0.08,
      }),
    [],
  );
  const rimMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#e4dcd2",
        roughness: 0.26,
        metalness: 0.45,
      }),
    [],
  );

  return (
    <group position={[0, -0.12, 0]}>
      <mesh material={redMat}>
        <cylinderGeometry args={[0.48, 0.36, 0.95, 48, 1, true]} />
      </mesh>
      {Array.from({ length: 7 }).map((_, i) => {
        const ang = (i / 7) * Math.PI * 2;
        return (
          <mesh
            key={i}
            position={[Math.sin(ang) * 0.415, 0, Math.cos(ang) * 0.415]}
            rotation={[0, ang, 0]}
            material={stripeMat}
          >
            <boxGeometry args={[0.06, 0.94, 0.012]} />
          </mesh>
        );
      })}
      <mesh position={[0, 0.48, 0]} material={rimMat}>
        <torusGeometry args={[0.485, 0.03, 12, 48]} />
      </mesh>
      <mesh position={[0, -0.475, 0]} rotation={[Math.PI / 2, 0, 0]} material={redMat}>
        <circleGeometry args={[0.36, 32]} />
      </mesh>
    </group>
  );
}

function Kernels({
  pointer,
}: {
  pointer: MutableRefObject<{ x: number; y: number }>;
}) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const state = useMemo(() => makeState(), []);
  const cursor = useRef(0);
  const last = useRef({ x: 0, y: 0 });
  const idle = useRef(0);
  const intro = useRef(1.4);

  useLayoutEffect(() => {
    const inst = mesh.current;
    if (!inst) return;
    for (let i = 0; i < KERNELS; i++) {
      tint.setHSL(0.11 + Math.random() * 0.05, 0.55, 0.66 + Math.random() * 0.16);
      inst.setColorAt(i, tint);
    }
    if (inst.instanceColor) inst.instanceColor.needsUpdate = true;
  }, []);

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
      const n = dist > 0.07 ? 7 : 3;
      for (let k = 0; k < n; k++) {
        cursor.current = spawn(state, cursor.current, dx, dy);
      }
      idle.current = 0;
    } else if (idle.current > (intro.current > 0 ? 0.045 : 0.14)) {
      idle.current = 0;
      cursor.current = spawn(
        state,
        cursor.current,
        (Math.random() - 0.5) * 0.6,
        0.35 + Math.random() * 0.5,
      );
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
      if (s.y[i] < 0.4 && s.y[i] > -0.4 && radial < 0.36 && s.vy[i] < 0) {
        s.vy[i] *= -0.18;
        s.vx[i] *= 0.48;
        s.vz[i] *= 0.48;
        if (Math.abs(s.vy[i]) < 0.12) {
          s.vy[i] = 0;
          s.vx[i] *= 0.85;
          s.vz[i] *= 0.85;
        }
      }

      if (s.y[i] < -2.4) restInBucket(s, i);

      dummy.position.set(s.x[i], s.y[i], s.z[i]);
      dummy.rotation.set(s.rx[i], s.ry[i], s.rz[i]);
      dummy.scale.setScalar(s.s[i]);
      dummy.updateMatrix();
      inst.setMatrixAt(i, dummy.matrix);
    }
    inst.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, KERNELS]}>
      <icosahedronGeometry args={[1, 0]} />
      <meshStandardMaterial roughness={0.48} metalness={0.06} color="#f0d48a" />
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
      group.current.rotation.y = THREE.MathUtils.damp(
        group.current.rotation.y,
        Math.sin(clock.current * 0.4) * 0.12 + pointer.current.x * 0.32,
        4,
        d,
      );
      group.current.rotation.x = THREE.MathUtils.damp(
        group.current.rotation.x,
        -0.08 + pointer.current.y * 0.12,
        4,
        d,
      );
    }
  });

  return (
    <>
      <color attach="background" args={["#070708"]} />
      <ambientLight intensity={0.7} />
      <spotLight
        position={[2.6, 4.4, 3.6]}
        intensity={80}
        angle={0.5}
        penumbra={0.78}
        color="#fff4e6"
      />
      <pointLight position={[-2.2, 1.4, 2.2]} intensity={12} color="#c9d4e8" />
      <pointLight position={[0.8, 0.2, 2.2]} intensity={8} color="#c45c4a" />
      <group ref={group} position={[0.2, 0.06, 0]} scale={1.12}>
        <Bucket />
        <Kernels pointer={pointer} />
        <ContactShadows
          position={[0, -0.62, 0]}
          opacity={0.55}
          scale={8}
          blur={2.4}
          far={2.2}
          color="#000000"
        />
      </group>
    </>
  );
}

export function PopcornCanvas() {
  return (
    <Canvas
      camera={{ position: [0.12, 0.5, 2.55], fov: 40 }}
      dpr={[1, 1.75]}
      gl={{
        antialias: true,
        alpha: false,
        preserveDrawingBuffer: true,
        powerPreference: "high-performance",
        failIfMajorPerformanceCaveat: false,
      }}
      flat
      frameloop="always"
      style={{ width: "100%", height: "100%", display: "block" }}
      onCreated={({ gl }) => {
        gl.setClearColor("#070708", 1);
      }}
    >
      <Scene />
    </Canvas>
  );
}
