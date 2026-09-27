import { Component, useEffect, useState, type ComponentType, type ReactNode } from "react";
import { Popcorn2D } from "@/components/popcorn-2d";

function canWebGL() {
  if (typeof document === "undefined") return false;
  try {
    const c = document.createElement("canvas");
    return Boolean(
      c.getContext("webgl2", { failIfMajorPerformanceCaveat: false }) ||
        c.getContext("webgl", { failIfMajorPerformanceCaveat: false }),
    );
  } catch {
    return false;
  }
}

class GLErrorBoundary extends Component<
  { onError: () => void; children: ReactNode },
  { failed: boolean }
> {
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
}

export function PopcornHero() {
  const [Scene, setScene] = useState<ComponentType | null>(null);
  const [mode, setMode] = useState<"boot" | "webgl" | "2d">("boot");

  useEffect(() => {
    let live = true;
    if (!canWebGL()) {
      setMode("2d");
      return;
    }
    import("./popcorn-canvas")
      .then((m) => {
        if (!live) return;
        setScene(() => m.PopcornCanvas);
        setMode("webgl");
      })
      .catch(() => {
        if (live) setMode("2d");
      });
    return () => {
      live = false;
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden bg-bg">
      {mode === "2d" ? <Popcorn2D /> : null}
      {mode === "webgl" && Scene ? (
        <GLErrorBoundary onError={() => setMode("2d")}>
          <Scene />
        </GLErrorBoundary>
      ) : null}
      {mode === "boot" ? <div className="h-full w-full bg-bg" /> : null}
      <p className="pointer-events-none absolute bottom-5 left-1/2 z-10 w-[90%] -translate-x-1/2 text-center text-xs tracking-wide text-muted md:bottom-8 md:left-auto md:right-8 md:w-auto md:translate-x-0 md:text-right">
        Move your cursor — kernels fly
      </p>
    </div>
  );
}
