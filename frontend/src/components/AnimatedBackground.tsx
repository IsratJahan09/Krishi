import { useEffect, useRef, useState, ReactNode } from "react";

interface AnimatedBackgroundProps {
  children: ReactNode;
  variant?: "default" | "minimal" | "hero";
}

const AnimatedBackground = ({ children, variant = "default" }: AnimatedBackgroundProps) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Gentle mouse tracking for parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        setMousePosition({ x, y });
      }
    };

    // Throttle mouse movement for performance
    let timeoutId: NodeJS.Timeout;
    const throttledMouseMove = (e: MouseEvent) => {
      if (!timeoutId) {
        timeoutId = setTimeout(() => {
          handleMouseMove(e);
          timeoutId = null as any;
        }, 50);
      }
    };

    window.addEventListener("mousemove", throttledMouseMove);
    return () => {
      window.removeEventListener("mousemove", throttledMouseMove);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  // Calculate parallax offset
  const parallaxX = (mousePosition.x - 0.5) * 20;
  const parallaxY = (mousePosition.y - 0.5) * 20;

  return (
    <div ref={containerRef} className="relative min-h-screen overflow-hidden">
      {/* Base gradient background */}
      <div className="fixed inset-0 bg-gradient-to-br from-background via-background to-muted -z-10" />

      {/* Animated grain texture overlay */}
      <div className="fixed inset-0 opacity-[0.015] -z-10 animate-grain-subtle pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]" />

      {/* Floating orbs with parallax */}
      <div 
        className="fixed inset-0 -z-10 pointer-events-none"
        style={{
          transform: `translate(${parallaxX * 0.5}px, ${parallaxY * 0.5}px)`,
          transition: "transform 0.3s ease-out",
        }}
      >
        {/* Large soft orb - top right */}
        <div className="absolute top-[10%] right-[15%] w-[500px] h-[500px] bg-harvest-green/[0.03] dark:bg-harvest-green/[0.02] rounded-full blur-3xl animate-float-slow" />
        
        {/* Medium orb - bottom left */}
        <div className="absolute bottom-[15%] left-[10%] w-[400px] h-[400px] bg-golden-harvest/[0.04] dark:bg-golden-harvest/[0.02] rounded-full blur-3xl animate-float-medium" style={{ animationDelay: "2s" }} />
        
        {/* Small orb - center */}
        <div className="absolute top-[45%] left-[60%] w-[300px] h-[300px] bg-leaf-green/[0.03] dark:bg-leaf-green/[0.02] rounded-full blur-3xl animate-float-fast" style={{ animationDelay: "4s" }} />
      </div>

      {/* Subtle wave pattern overlay */}
      {variant !== "minimal" && (
        <div className="fixed inset-0 -z-10 pointer-events-none opacity-[0.02] dark:opacity-[0.01]">
          <div className="absolute inset-0 animate-wave-slow bg-[radial-gradient(circle_at_50%_50%,rgba(142,199,132,0.1),transparent_50%)]" />
          <div className="absolute inset-0 animate-wave-medium bg-[radial-gradient(circle_at_30%_70%,rgba(255,230,120,0.08),transparent_40%)]" style={{ animationDelay: "3s" }} />
        </div>
      )}

      {/* Floating seed particles */}
      {variant === "hero" && (
        <div className="fixed inset-0 -z-10 pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-primary/20 rounded-full animate-float-particle"
              style={{
                left: `${10 + i * 12}%`,
                top: `${20 + (i % 3) * 25}%`,
                animationDelay: `${i * 1.5}s`,
                animationDuration: `${15 + i * 2}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Subtle light rays */}
      <div 
        className="fixed inset-0 -z-10 pointer-events-none opacity-[0.03] dark:opacity-[0.015]"
        style={{
          transform: `translate(${parallaxX * 0.3}px, ${parallaxY * 0.3}px)`,
          transition: "transform 0.3s ease-out",
        }}
      >
        <div className="absolute top-0 left-[20%] w-[2px] h-[40%] bg-gradient-to-b from-golden-harvest/30 to-transparent rotate-12 animate-ray-shimmer" />
        <div className="absolute top-[10%] right-[30%] w-[2px] h-[35%] bg-gradient-to-b from-harvest-green/25 to-transparent -rotate-12 animate-ray-shimmer" style={{ animationDelay: "2s" }} />
        <div className="absolute top-[5%] left-[60%] w-[2px] h-[30%] bg-gradient-to-b from-leaf-green/20 to-transparent rotate-6 animate-ray-shimmer" style={{ animationDelay: "4s" }} />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default AnimatedBackground;
