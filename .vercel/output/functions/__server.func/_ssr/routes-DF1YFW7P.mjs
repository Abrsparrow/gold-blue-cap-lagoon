import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { u as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { a as Clock, c as ArrowUpRight, i as MapPin, l as Armchair, o as Clapperboard, r as Phone, s as Building2, t as Volume2 } from "../_libs/lucide-react.mjs";
import { t as Slot } from "../_libs/radix-ui__react-slot.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DF1YFW7P.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 font-medium transition-[opacity,transform,background-color,color] duration-150 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]", {
	variants: {
		variant: {
			default: "bg-accent text-accent-fg hover:opacity-90",
			outline: "border border-line bg-transparent text-fg hover:bg-raised",
			ghost: "text-fg hover:bg-raised"
		},
		size: {
			default: "h-11 rounded-md px-5 text-sm",
			lg: "h-12 rounded-md px-6 text-sm",
			sm: "h-9 rounded-sm px-3 text-sm"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
function Button({ className, variant, size, asChild = false, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		...props
	});
}
var COUNT = 90;
function makeKernel(w, h, flying) {
	const cx = w * .62;
	const cy = h * .52;
	const a = Math.random() * Math.PI * 2;
	const rad = Math.random() * 36;
	return {
		x: cx + Math.cos(a) * rad,
		y: cy - 18 + Math.random() * 46,
		z: Math.random(),
		vx: flying ? (Math.random() - .5) * 420 : 0,
		vy: flying ? -220 - Math.random() * 280 : 0,
		vz: 0,
		r: 5 + Math.random() * 6,
		rot: Math.random() * Math.PI * 2,
		vr: (Math.random() - .5) * 8,
		flying,
		hue: 38 + Math.random() * 18
	};
}
function Popcorn2D() {
	const ref = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const canvas = ref.current;
		if (!canvas) return;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;
		let w = 0;
		let h = 0;
		let raf = 0;
		let last = performance.now();
		let intro = 1.4;
		let idle = 0;
		const pointer = {
			x: 0,
			y: 0,
			px: 0,
			py: 0
		};
		let kernels = [];
		const resize = () => {
			const rect = canvas.parentElement?.getBoundingClientRect() ?? canvas.getBoundingClientRect();
			w = Math.max(1, Math.floor(rect.width));
			h = Math.max(1, Math.floor(rect.height));
			const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
			canvas.width = Math.floor(w * dpr);
			canvas.height = Math.floor(h * dpr);
			canvas.style.width = `${w}px`;
			canvas.style.height = `${h}px`;
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
			kernels = Array.from({ length: COUNT }, () => makeKernel(w, h, false));
		};
		const spawn = (dirx, diry) => {
			const i = kernels.findIndex((k) => !k.flying && k.vy === 0) % COUNT;
			const idx = i >= 0 ? i : Math.floor(Math.random() * COUNT);
			const k = makeKernel(w, h, true);
			const cx = w * (w >= 720 ? .62 : .5);
			const cy = h * .48;
			k.x = cx + (Math.random() - .5) * 28;
			k.y = cy - 70;
			k.vx = dirx * 380 + (Math.random() - .5) * 180;
			k.vy = -260 - Math.random() * 220 + Math.min(0, diry) * 80;
			kernels[idx] = k;
		};
		const onMove = (e) => {
			pointer.x = e.clientX;
			pointer.y = e.clientY;
		};
		const drawBucket = (cx, cy, scale) => {
			ctx.save();
			ctx.translate(cx, cy);
			ctx.scale(scale, scale);
			ctx.fillStyle = "rgba(0,0,0,0.35)";
			ctx.beginPath();
			ctx.ellipse(0, 92, 78, 14, 0, 0, Math.PI * 2);
			ctx.fill();
			const top = -62;
			const bot = 88;
			const topW = 78;
			const botW = 58;
			const body = ctx.createLinearGradient(-78, top, topW, bot);
			body.addColorStop(0, "#b4433a");
			body.addColorStop(.45, "#8f2c26");
			body.addColorStop(1, "#6a1f1b");
			ctx.fillStyle = body;
			ctx.beginPath();
			ctx.moveTo(-78, top);
			ctx.lineTo(topW, top);
			ctx.lineTo(botW, bot);
			ctx.lineTo(-58, bot);
			ctx.closePath();
			ctx.fill();
			ctx.fillStyle = "#efe7dc";
			for (let i = 0; i < 7; i++) {
				const t = (i + .5) / 7;
				const x0 = -78 + t * topW * 2;
				const x1 = -58 + t * botW * 2;
				ctx.beginPath();
				ctx.moveTo(x0 - 4, top);
				ctx.lineTo(x0 + 4, top);
				ctx.lineTo(x1 + 3, bot);
				ctx.lineTo(x1 - 3, bot);
				ctx.closePath();
				ctx.fill();
			}
			ctx.strokeStyle = "#e4dcd2";
			ctx.lineWidth = 7;
			ctx.beginPath();
			ctx.ellipse(0, top, topW, 14, 0, 0, Math.PI * 2);
			ctx.stroke();
			ctx.fillStyle = "#6f221e";
			ctx.beginPath();
			ctx.ellipse(0, top, 76, 12, 0, 0, Math.PI * 2);
			ctx.fill();
			ctx.restore();
		};
		const tick = (now) => {
			const dt = Math.min(.05, (now - last) / 1e3);
			last = now;
			intro = Math.max(0, intro - dt);
			idle += dt;
			const dx = pointer.x - pointer.px;
			const dy = pointer.y - pointer.py;
			const dist = Math.hypot(dx, dy);
			pointer.px = pointer.x;
			pointer.py = pointer.y;
			if (dist > 6) {
				const n = dist > 28 ? 5 : 2;
				for (let i = 0; i < n; i++) spawn(dx / 80, dy / 80);
				idle = 0;
			} else if (idle > (intro > 0 ? .05 : .16)) {
				idle = 0;
				spawn((Math.random() - .5) * .8, -.6);
			}
			ctx.fillStyle = "#070708";
			ctx.fillRect(0, 0, w, h);
			const g = ctx.createRadialGradient(w * (w >= 720 ? .62 : .5), h * .42, 20, w * .55, h * .5, Math.max(w, h) * .55);
			g.addColorStop(0, "rgba(196, 92, 74, 0.16)");
			g.addColorStop(.45, "rgba(20, 20, 24, 0.2)");
			g.addColorStop(1, "rgba(7, 7, 8, 0)");
			ctx.fillStyle = g;
			ctx.fillRect(0, 0, w, h);
			const cx = w * (w >= 720 ? .62 : .5);
			const cy = h * .52;
			const scale = Math.min(w, h) / 520;
			drawBucket(cx, cy, scale);
			const gravity = 980;
			for (const k of kernels) if (k.flying || k.vy !== 0) {
				k.vy += gravity * dt;
				k.x += k.vx * dt;
				k.y += k.vy * dt;
				k.rot += k.vr * dt;
				k.vx *= .995;
				if (k.y > h + 40) Object.assign(k, makeKernel(w, h, false));
			}
			const ordered = [...kernels].sort((a, b) => a.z - b.z);
			for (const k of ordered) {
				ctx.save();
				ctx.translate(k.x, k.y);
				ctx.rotate(k.rot);
				ctx.fillStyle = `hsl(${k.hue} 62% ${58 + k.z * 18}%)`;
				ctx.beginPath();
				ctx.ellipse(0, 0, k.r * 1.15, k.r * .85, .4, 0, Math.PI * 2);
				ctx.fill();
				ctx.fillStyle = "rgba(255,248,230,0.7)";
				ctx.beginPath();
				ctx.ellipse(-k.r * .25, -k.r * .3, k.r * .35, k.r * .22, 0, 0, Math.PI * 2);
				ctx.fill();
				ctx.restore();
			}
			raf = requestAnimationFrame(tick);
		};
		resize();
		window.addEventListener("resize", resize);
		window.addEventListener("pointermove", onMove, { passive: true });
		raf = requestAnimationFrame(tick);
		return () => {
			cancelAnimationFrame(raf);
			window.removeEventListener("resize", resize);
			window.removeEventListener("pointermove", onMove);
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
		ref,
		className: "block h-full w-full",
		"aria-hidden": true
	});
}
function canWebGL() {
	if (typeof document === "undefined") return false;
	try {
		const c = document.createElement("canvas");
		return Boolean(c.getContext("webgl2", { failIfMajorPerformanceCaveat: false }) || c.getContext("webgl", { failIfMajorPerformanceCaveat: false }));
	} catch {
		return false;
	}
}
var GLErrorBoundary = class extends import_react.Component {
	state = { failed: false };
	static getDerivedStateFromError() {
		return { failed: true };
	}
	componentDidCatch() {
		this.props.onError();
	}
	render() {
		return this.state.failed ? null : this.props.children;
	}
};
function PopcornHero() {
	const [Scene, setScene] = (0, import_react.useState)(null);
	const [mode, setMode] = (0, import_react.useState)("boot");
	(0, import_react.useEffect)(() => {
		let live = true;
		if (!canWebGL()) {
			setMode("2d");
			return;
		}
		import("./popcorn-canvas-BmUHKHSe.mjs").then((m) => {
			if (!live) return;
			setScene(() => m.PopcornCanvas);
			setMode("webgl");
		}).catch(() => {
			if (live) setMode("2d");
		});
		return () => {
			live = false;
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "absolute inset-0 overflow-hidden bg-bg",
		children: [
			mode === "2d" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Popcorn2D, {}) : null,
			mode === "webgl" && Scene ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GLErrorBoundary, {
				onError: () => setMode("2d"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scene, {})
			}) : null,
			mode === "boot" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-full w-full bg-bg" }) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "pointer-events-none absolute bottom-5 left-1/2 z-10 w-[90%] -translate-x-1/2 text-center text-xs tracking-wide text-muted md:bottom-8 md:left-auto md:right-8 md:w-auto md:translate-x-0 md:text-right",
				children: "Move your cursor — kernels fly"
			})
		]
	});
}
var cinema = {
	name: "GAST Cinema",
	mall: "GAST Entertainment Mall",
	tagline: "Dolby Atmos. Reclining seats. The picture, as it was meant to be seen.",
	phoneDisplay: "093 011 3377",
	phoneTel: "+251930113377",
	address: "CMC Road, in front of St. Michael Church",
	city: "Addis Ababa, Ethiopia",
	hours: "Mon–Fri 9:00–21:00 · Sat–Sun 10:00–21:00",
	telegram: "https://t.me/GASTCinema",
	instagram: "https://www.instagram.com/gast_cinema/",
	maps: "https://maps.google.com/?q=GAST+Entertainment+CMC+Addis+Ababa",
	rating: "4.4",
	reviews: "1,067"
};
var films = [
	{
		title: "Heart of the Beast",
		meta: "Now showing · 2h 14m",
		blurb: "Survival, loyalty, and an unbreakable bond — on the big screen this week.",
		image: "/media/poster-beast.jpg"
	},
	{
		title: "The Last Threshold",
		meta: "Now showing · 1h 58m",
		blurb: "A night of dread, precision sound, and a hall built for it.",
		image: "/media/poster-threshold.jpg"
	},
	{
		title: "Lamp of the Dunes",
		meta: "Family · 1h 42m",
		blurb: "Magic, mischief, and colour — the kind of film that fills a Saturday.",
		image: "/media/poster-lamp.jpg"
	},
	{
		title: "Night Shift",
		meta: "Coming soon",
		blurb: "Rain, neon, and a city that never quite sleeps.",
		image: "/media/poster-night.jpg"
	}
];
var halls = [
	{
		title: "Main halls",
		copy: "Dolby 3D projection and Dolby Atmos. Reclining seats, aisle light, and a screen that holds the whole frame.",
		image: "/media/hall.jpg"
	},
	{
		title: "VIP & Gold",
		copy: "Intimate rooms — including 20-seat halls — with extra space, quieter service, and the same Atmos mix.",
		image: "/media/seats.jpg"
	},
	{
		title: "Rooftop cinema",
		copy: "Tenth-floor open air. City lights, a full-size screen, and the rare pleasure of a film under the sky.",
		image: "/media/rooftop.jpg"
	},
	{
		title: "The lobby",
		copy: "Concessions, GAST popcorn, and a calm dark foyer before the lights go down.",
		image: "/media/lobby.jpg"
	}
];
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-bg text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hero, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NowShowing, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Experience, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Visit, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
		]
	});
}
function Header() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
		className: "sticky top-0 z-40 border-b border-line bg-bg/92",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex h-16 max-w-6xl items-center justify-between px-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: "#top",
					className: "font-display text-xl tracking-tight text-fg",
					children: ["GAST", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "ml-1.5 font-sans text-[11px] font-medium uppercase tracking-[0.18em] text-muted",
						children: "Cinema"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
					className: "hidden items-center gap-8 text-sm text-muted md:flex",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#showing",
							className: "hover:text-fg",
							children: "Now showing"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#experience",
							className: "hover:text-fg",
							children: "Halls"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#visit",
							className: "hover:text-fg",
							children: "Visit"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					size: "sm",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: `tel:${cinema.phoneTel}`,
						children: "Call"
					})
				})
			]
		})
	});
}
function Hero() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "top",
		className: "relative isolate min-h-[calc(100dvh-4rem)] overflow-hidden border-b border-line",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopcornHero, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-0 bg-gradient-to-t from-bg via-bg/70 to-bg/15 md:bg-gradient-to-r md:from-bg md:via-bg/75 md:to-transparent" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "relative z-10 mx-auto flex min-h-[calc(100dvh-4rem)] max-w-6xl items-end px-5 pb-16 pt-24 md:items-center md:pb-20",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "pointer-events-auto max-w-xl",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mb-5 text-[11px] font-medium uppercase tracking-[0.22em] text-mark",
							children: "CMC Road · Addis Ababa"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
							className: "font-display text-[clamp(2.6rem,6vw,4.6rem)] leading-[0.95] tracking-[-0.03em] text-fg",
							children: [
								"The picture,",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								"as it was meant",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								"to be seen."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-6 max-w-md text-base leading-relaxed text-muted",
							children: "Dolby 3D. Dolby Atmos. Reclining seats, VIP rooms, and a rooftop cinema on the tenth floor of GAST Entertainment Mall."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-8 flex flex-wrap gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								size: "lg",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "#showing",
									children: "See what’s on"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								size: "lg",
								variant: "outline",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: cinema.telegram,
									target: "_blank",
									rel: "noreferrer",
									children: "Telegram schedule"
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
							className: "mt-12 grid grid-cols-3 gap-4 border-t border-line pt-6 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-faint",
									children: "Rating"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
									className: "mt-1 tabular-nums text-fg",
									children: [cinema.rating, " / 5"]
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-faint",
									children: "Reviews"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "mt-1 tabular-nums text-fg",
									children: cinema.reviews
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-faint",
									children: "Sound"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "mt-1 text-fg",
									children: "Dolby Atmos"
								})] })
							]
						})
					]
				})
			})
		]
	});
}
function NowShowing() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "showing",
		className: "border-b border-line py-16 md:py-24",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-6xl px-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-10 flex items-end justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] font-medium uppercase tracking-[0.22em] text-mark",
					children: "This week"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-2 font-display text-4xl tracking-tight md:text-5xl",
					children: "Now showing"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: cinema.telegram,
					target: "_blank",
					rel: "noreferrer",
					className: "hidden items-center gap-1 text-sm text-muted hover:text-fg md:inline-flex",
					children: ["Full schedule ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "size-4" })]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "grid gap-5 sm:grid-cols-2 lg:grid-cols-4",
				children: films.map((film) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: "group",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "overflow-hidden rounded-xl bg-surface",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "aspect-[2/3] overflow-hidden",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: film.image,
								alt: "",
								className: "h-full w-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[11px] uppercase tracking-[0.16em] text-mark",
									children: film.meta
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "mt-1 font-display text-2xl leading-tight",
									children: film.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-sm leading-relaxed text-muted",
									children: film.blurb
								})
							]
						})]
					})
				}, film.title))
			})]
		})
	});
}
function Experience() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "experience",
		className: "border-b border-line py-16 md:py-24",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-6xl px-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] font-medium uppercase tracking-[0.22em] text-mark",
					children: "The halls"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-2 max-w-xl font-display text-4xl tracking-tight md:text-5xl",
					children: "Built for sound, light, and sitting still."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
					children: [
						{
							icon: Volume2,
							label: "Dolby Atmos",
							copy: "Object-based surround, ceiling included."
						},
						{
							icon: Clapperboard,
							label: "Dolby 3D",
							copy: "Bright projection, clean colour."
						},
						{
							icon: Armchair,
							label: "Recliners",
							copy: "Full-length seats with cup holders."
						},
						{
							icon: Building2,
							label: "The mall",
							copy: "Bowling, games, gym, cafés — one roof."
						}
					].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "rounded-lg border border-line bg-surface p-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, {
								className: "size-5 text-fg",
								strokeWidth: 1.5
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-4 font-medium",
								children: item.label
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm leading-relaxed text-muted",
								children: item.copy
							})
						]
					}, item.label))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-10 grid gap-4 md:grid-cols-2",
					children: halls.map((hall) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "overflow-hidden rounded-xl bg-surface",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "aspect-[16/10] overflow-hidden",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: hall.image,
								alt: "",
								className: "h-full w-full object-cover"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-5 md:p-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-display text-2xl",
								children: hall.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 max-w-prose text-sm leading-relaxed text-muted",
								children: hall.copy
							})]
						})]
					}, hall.title))
				})
			]
		})
	});
}
function Visit() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "visit",
		className: "py-16 md:py-24",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid max-w-6xl gap-10 px-5 md:grid-cols-2 md:items-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] font-medium uppercase tracking-[0.22em] text-mark",
					children: "Visit"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-2 font-display text-4xl tracking-tight md:text-5xl",
					children: "CMC Road, opposite St. Michael Church."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "mt-8 space-y-4 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "mt-0.5 size-4 shrink-0 text-muted" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								cinema.address,
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								cinema.city
							] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "mt-0.5 size-4 shrink-0 text-muted" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: `tel:${cinema.phoneTel}`,
								className: "hover:text-fg",
								children: cinema.phoneDisplay
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "mt-0.5 size-4 shrink-0 text-muted" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: cinema.hours })]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 flex flex-wrap gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: cinema.maps,
							target: "_blank",
							rel: "noreferrer",
							children: "Open in Maps"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						variant: "outline",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: cinema.instagram,
							target: "_blank",
							rel: "noreferrer",
							children: "Instagram"
						})
					})]
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: cinema.maps,
				target: "_blank",
				rel: "noreferrer",
				className: "block overflow-hidden rounded-xl",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: "/media/exterior.jpg",
					alt: "GAST Entertainment Mall at night",
					className: "h-full w-full object-cover"
				})
			})]
		})
	});
}
function Footer() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
		className: "border-t border-line py-8",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-6xl flex-col gap-3 px-5 text-sm text-muted md:flex-row md:items-center md:justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "GAST Cinema · GAST Entertainment Mall" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: ["Tickets via Telegram or a call to ", cinema.phoneDisplay] })]
		})
	});
}
//#endregion
export { Home as component };
