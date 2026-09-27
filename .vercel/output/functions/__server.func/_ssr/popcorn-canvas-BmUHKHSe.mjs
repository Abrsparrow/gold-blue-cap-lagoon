import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { c as MeshStandardMaterial, i as useThree, l as Object3D, n as Canvas, o as Color, r as useFrame, s as MathUtils, t as ContactShadows, u as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/popcorn-canvas-BmUHKHSe.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var KERNELS = 180;
var dummy = new Object3D();
var tint = new Color();
function makeState() {
	const n = KERNELS;
	const s = {
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
		s: new Float32Array(n)
	};
	for (let i = 0; i < n; i++) restInBucket(s, i);
	return s;
}
function restInBucket(s, i) {
	const a = Math.random() * Math.PI * 2;
	const r = Math.random() * .28;
	s.x[i] = Math.cos(a) * r;
	s.z[i] = Math.sin(a) * r * .9;
	s.y[i] = -.02 + Math.random() * .42;
	s.vx[i] = 0;
	s.vy[i] = 0;
	s.vz[i] = 0;
	s.rx[i] = Math.random() * 6;
	s.ry[i] = Math.random() * 6;
	s.rz[i] = Math.random() * 6;
	s.rsx[i] = (Math.random() - .5) * 2;
	s.rsy[i] = (Math.random() - .5) * 2;
	s.rsz[i] = (Math.random() - .5) * 2;
	s.s[i] = .05 + Math.random() * .04;
}
function spawn(s, cursor, dirx, diry) {
	const i = cursor % KERNELS;
	const a = Math.random() * Math.PI * 2;
	const r = Math.random() * .12;
	s.x[i] = Math.cos(a) * r;
	s.z[i] = Math.sin(a) * r;
	s.y[i] = .62;
	s.vx[i] = dirx * 1.8 + (Math.random() - .5) * 1.4;
	s.vy[i] = 1.5 + Math.random() * 1.7 + Math.max(0, diry) * .8;
	s.vz[i] = (Math.random() - .5) * 1.6;
	s.rsx[i] = (Math.random() - .5) * 14;
	s.rsy[i] = (Math.random() - .5) * 14;
	s.rsz[i] = (Math.random() - .5) * 14;
	s.s[i] = .055 + Math.random() * .045;
	return i + 1;
}
function Bucket() {
	const stripeMat = (0, import_react.useMemo)(() => new MeshStandardMaterial({
		color: "#efe7dc",
		roughness: .42
	}), []);
	const redMat = (0, import_react.useMemo)(() => new MeshStandardMaterial({
		color: "#9a322b",
		roughness: .4,
		metalness: .08
	}), []);
	const rimMat = (0, import_react.useMemo)(() => new MeshStandardMaterial({
		color: "#e4dcd2",
		roughness: .26,
		metalness: .45
	}), []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		position: [
			0,
			-.12,
			0
		],
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				material: redMat,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
					.48,
					.36,
					.95,
					48,
					1,
					true
				] })
			}),
			Array.from({ length: 7 }).map((_, i) => {
				const ang = i / 7 * Math.PI * 2;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
					position: [
						Math.sin(ang) * .415,
						0,
						Math.cos(ang) * .415
					],
					rotation: [
						0,
						ang,
						0
					],
					material: stripeMat,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
						.06,
						.94,
						.012
					] })
				}, i);
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				position: [
					0,
					.48,
					0
				],
				material: rimMat,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("torusGeometry", { args: [
					.485,
					.03,
					12,
					48
				] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				position: [
					0,
					-.475,
					0
				],
				rotation: [
					Math.PI / 2,
					0,
					0
				],
				material: redMat,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circleGeometry", { args: [.36, 32] })
			})
		]
	});
}
function Kernels({ pointer }) {
	const mesh = (0, import_react.useRef)(null);
	const state = (0, import_react.useMemo)(() => makeState(), []);
	const cursor = (0, import_react.useRef)(0);
	const last = (0, import_react.useRef)({
		x: 0,
		y: 0
	});
	const idle = (0, import_react.useRef)(0);
	const intro = (0, import_react.useRef)(1.4);
	(0, import_react.useLayoutEffect)(() => {
		const inst = mesh.current;
		if (!inst) return;
		for (let i = 0; i < KERNELS; i++) {
			tint.setHSL(.11 + Math.random() * .05, .55, .66 + Math.random() * .16);
			inst.setColorAt(i, tint);
		}
		if (inst.instanceColor) inst.instanceColor.needsUpdate = true;
	}, []);
	useFrame((_, delta) => {
		const d = Math.min(delta, .05);
		const inst = mesh.current;
		if (!inst) return;
		const dx = pointer.current.x - last.current.x;
		const dy = pointer.current.y - last.current.y;
		const dist = Math.hypot(dx, dy);
		last.current.x = pointer.current.x;
		last.current.y = pointer.current.y;
		intro.current = Math.max(0, intro.current - d);
		idle.current += d;
		if (dist > .01) {
			const n = dist > .07 ? 7 : 3;
			for (let k = 0; k < n; k++) cursor.current = spawn(state, cursor.current, dx, dy);
			idle.current = 0;
		} else if (idle.current > (intro.current > 0 ? .045 : .14)) {
			idle.current = 0;
			cursor.current = spawn(state, cursor.current, (Math.random() - .5) * .6, .35 + Math.random() * .5);
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
			if (s.y[i] < .4 && s.y[i] > -.4 && radial < .36 && s.vy[i] < 0) {
				s.vy[i] *= -.18;
				s.vx[i] *= .48;
				s.vz[i] *= .48;
				if (Math.abs(s.vy[i]) < .12) {
					s.vy[i] = 0;
					s.vx[i] *= .85;
					s.vz[i] *= .85;
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("instancedMesh", {
		ref: mesh,
		args: [
			void 0,
			void 0,
			KERNELS
		],
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("icosahedronGeometry", { args: [1, 0] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
			roughness: .48,
			metalness: .06,
			color: "#f0d48a"
		})]
	});
}
function Scene() {
	const pointer = (0, import_react.useRef)({
		x: 0,
		y: 0
	});
	const group = (0, import_react.useRef)(null);
	const clock = (0, import_react.useRef)(0);
	const { size } = useThree();
	(0, import_react.useEffect)(() => {
		const onMove = (e) => {
			pointer.current.x = e.clientX / window.innerWidth * 2 - 1;
			pointer.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
		};
		window.addEventListener("pointermove", onMove, { passive: true });
		return () => window.removeEventListener("pointermove", onMove);
	}, []);
	useFrame((_, delta) => {
		const d = Math.min(delta, .05);
		clock.current += d;
		const targetX = size.width >= 720 ? .72 : .08;
		if (group.current) {
			group.current.position.x = MathUtils.damp(group.current.position.x, targetX, 4, d);
			group.current.rotation.y = MathUtils.damp(group.current.rotation.y, Math.sin(clock.current * .4) * .12 + pointer.current.x * .32, 4, d);
			group.current.rotation.x = MathUtils.damp(group.current.rotation.x, -.08 + pointer.current.y * .12, 4, d);
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("color", {
			attach: "background",
			args: ["#070708"]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ambientLight", { intensity: .7 }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("spotLight", {
			position: [
				2.6,
				4.4,
				3.6
			],
			intensity: 80,
			angle: .5,
			penumbra: .78,
			color: "#fff4e6"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pointLight", {
			position: [
				-2.2,
				1.4,
				2.2
			],
			intensity: 12,
			color: "#c9d4e8"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pointLight", {
			position: [
				.8,
				.2,
				2.2
			],
			intensity: 8,
			color: "#c45c4a"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
			ref: group,
			position: [
				.2,
				.06,
				0
			],
			scale: 1.12,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bucket, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kernels, { pointer }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContactShadows, {
					position: [
						0,
						-.62,
						0
					],
					opacity: .55,
					scale: 8,
					blur: 2.4,
					far: 2.2,
					color: "#000000"
				})
			]
		})
	] });
}
function PopcornCanvas() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Canvas, {
		camera: {
			position: [
				.12,
				.5,
				2.55
			],
			fov: 40
		},
		dpr: [1, 1.75],
		gl: {
			antialias: true,
			alpha: false,
			preserveDrawingBuffer: true,
			powerPreference: "high-performance",
			failIfMajorPerformanceCaveat: false
		},
		flat: true,
		frameloop: "always",
		style: {
			width: "100%",
			height: "100%",
			display: "block"
		},
		onCreated: ({ gl }) => {
			gl.setClearColor("#070708", 1);
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scene, {})
	});
}
//#endregion
export { PopcornCanvas };
