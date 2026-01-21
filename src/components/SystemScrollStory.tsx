"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const modules = [
    {
        id: "play",
        title: "Play",
        subtitle: "Gamification Engine",
        desc: "Engagement attivo.",
        longDesc: "Trasforma l'evento in un terreno di gioco. Le meccaniche di gamification non sono solo divertimento, sono strumenti di ritenzione e focalizzazione.",
        color: "#00f0ff",
        Shape: "PlayShape"
    },
    {
        id: "sense",
        title: "Sense",
        subtitle: "Atmospheric Intelligence",
        desc: "Impatti sensoriali.",
        longDesc: "L'ambiente che respira con te. Luci, suoni e temperature che cambiano in base al sentiment della sala tracciato in tempo reale.",
        color: "#d946ef",
        Shape: "SenseShape"
    },
    {
        id: "learn",
        title: "Learn",
        subtitle: "Adaptive Knowledge",
        desc: "Formazione liquida.",
        longDesc: "Contenuti che si adattano a chi ascolta. L'AI analizza il livello di comprensione e modifica la complessità delle slide in tempo reale.",
        color: "#f59e0b",
        Shape: "LearnShape"
    },
    {
        id: "immersive",
        title: "Immersive",
        subtitle: "Spatial Computing",
        desc: "Oltre la fisica.",
        longDesc: "Il confine tra reale e digitale scompare. Oggetti olografici e portali per il metaverso aziendale direttamente nello spazio fisico.",
        color: "#10b981",
        Shape: "ImmersiveShape"
    },
];

export default function SystemScrollStory() {
    const containerRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const sections = gsap.utils.toArray(".story-card");

        const scrollTween = gsap.to(sections, {
            xPercent: -100 * (sections.length - 1),
            ease: "none",
            scrollTrigger: {
                trigger: containerRef.current,
                pin: true,
                pinSpacing: true,
                scrub: 1, // Softened scrub for maximum fluidity
                anticipatePin: 1,
                end: () => "+=" + (window.innerWidth * 3), // Dynamic length based on width
            }
        });

        // Animate 3D Shapes floating
        gsap.to(".shape-float", {
            y: "20px",
            rotation: 10,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });

        return () => {
            scrollTween.kill();
        };
    }, []);

    return (
        <section
            id="system-scroll-section"
            ref={containerRef}
            className="h-screen overflow-hidden relative z-50"
        >
            {/* Sticky Progress Label */}
            <div className="absolute top-8 left-8 z-50 mix-blend-difference text-white pointer-events-none">
                <span className="text-xs font-mono tracking-widest uppercase opacity-70">System Explorer // V.4.0</span>
            </div>

            {/* Added will-change-transform for better compositing */}
            <div className="flex h-full w-[400vw] will-change-transform">
                {modules.map((mod, i) => (
                    <div
                        key={i}
                        className="story-card w-[100vw] h-full relative flex items-center justify-center backdrop-blur-[2px] overflow-hidden"
                    >
                        {/* Dynamic Background Gradient (Subtle) - Reduced complexity */}
                        <div className="absolute inset-0 opacity-20 will-change-transform"
                            style={{ background: `radial-gradient(circle at 50% 50%, ${mod.color} 0%, transparent 60%)` }}
                        />

                        <div className="max-w-7xl mx-auto w-full px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-20">

                            {/* Left: 3D Visual Element (Pure CSS/HTML) */}
                            <div className="hidden lg:flex justify-center items-center h-[500px] perspective-1000">
                                {mod.id === 'play' && <PlayShape color={mod.color} />}
                                {mod.id === 'sense' && <SenseShape color={mod.color} />}
                                {mod.id === 'learn' && <LearnShape color={mod.color} />}
                                {mod.id === 'immersive' && <ImmersiveShape color={mod.color} />}
                            </div>

                            {/* Right: Typography */}
                            <div className="text-left relative">
                                <span className="absolute -top-32 -left-20 text-[15rem] font-bold text-white opacity-[0.03] select-none pointer-events-none">
                                    0{i + 1}
                                </span>

                                <h4 className="text-sm md:text-base font-mono mb-4 uppercase tracking-widest" style={{ color: mod.color }}>
                                    {mod.subtitle}
                                </h4>
                                <h3 className="text-6xl md:text-8xl font-bold text-white mb-8 leading-none tracking-tighter">
                                    {mod.title}
                                </h3>

                                <div className="pl-6 border-l-2 border-white/10">
                                    <p className="text-2xl md:text-3xl font-light text-white mb-4 leading-tight">
                                        {mod.desc}
                                    </p>
                                    <p className="text-lg text-gray-400 leading-relaxed max-w-lg">
                                        {mod.longDesc}
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>
                ))}
            </div>
        </section>
    );
}

// --- 3D SHAPE COMPONENTS (Optimized for Performance) ---

function PlayShape({ color }: { color: string }) {
    return (
        // Added will-change-transform
        <div className="shape-float relative w-64 h-64 transform-style-3d rotate-x-12 rotate-y-12 animate-[spinSlow_20s_linear_infinite] will-change-transform">
            {/* Reduced box-shadow spread and removed mix-blend-overlay */}
            <div className="absolute inset-0 border-4 border-white/20 rounded-3xl transform translate-z-10" style={{ borderColor: color, boxShadow: `0 0 20px ${color}30` }} />
            <div className="absolute inset-0 border-4 border-white/20 rounded-3xl transform rotate-45 scale-75" />

            {/* Reduced blur radius */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-white/10 rounded-3xl blur-md" />
            <div className="absolute top-1/2 left-1/2 w-20 h-20 -translate-x-1/2 -translate-y-1/2 bg-white/80 rounded-full animate-pulse" />
        </div>
    );
}

function SenseShape({ color }: { color: string }) {
    return (
        <div className="shape-float relative w-80 h-80 flex items-center justify-center will-change-transform">
            {/* Reduced blur radius */}
            <div className="absolute inset-0 rounded-full blur-2xl opacity-40 animate-[morph_8s_ease-in-out_infinite]" style={{ backgroundColor: color }} />

            {/* Removed backdrop-blur-sm, increased border opacity slightly */}
            <div className="relative w-48 h-48 rounded-full border border-white/40 flex items-center justify-center animate-[breathe_4s_ease-in-out_infinite]">
                <div className="w-32 h-32 rounded-full bg-gradient-to-b from-white to-transparent opacity-20" />
            </div>
            <div className="absolute w-full h-full border border-white/5 rounded-full scale-150 animate-[spinReverse_30s_linear_infinite]" />
        </div>
    );
}

function LearnShape({ color }: { color: string }) {
    return (
        <div className="shape-float relative w-72 h-72 perspective-1000 will-change-transform">
            <div className="absolute inset-0 rounded-full border border-dashed border-white/20 animate-[spinSlow_15s_linear_infinite]" />
            <div className="absolute inset-0 rounded-full border border-dotted border-white/20 scale-75 animate-[spinReverse_10s_linear_infinite]" />
            <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-white rounded-full shadow-[0_0_20px_white]" />

            {[0, 60, 120, 180, 240, 300].map((deg, i) => (
                <div key={i} className="absolute top-1/2 left-1/2 w-32 h-0.5 bg-gradient-to-r from-transparent to-white/50 origin-left"
                    style={{ transform: `rotate(${deg}deg) rotateZ(${i * 10}deg)` }} />
            ))}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-transparent to-white/5 skew-y-12" />
        </div>
    );
}

function ImmersiveShape({ color }: { color: string }) {
    return (
        <div className="shape-float relative w-60 h-80 transform-style-3d will-change-transform">
            {/* Removed backdrop-blur-md, simplified shadows */}
            <div className="absolute inset-0 border-2 border-white/50 bg-white/10 transform rotate-y-45 translate-x-10 shadow-[0_0_20px_rgba(255,255,255,0.05)]" />
            <div className="absolute inset-0 border-2 border-white/20 bg-black/50 transform -rotate-y-45 -translate-x-10" />

            <div className="absolute top-1/2 left-1/2 w-[120%] h-1 bg-white shadow-[0_0_10px_white] -translate-x-1/2" style={{ boxShadow: `0 0 10px ${color}` }} />

            <div className="absolute -inset-10 border border-white/10 rounded-full rotate-x-60 animate-[spinSlow_10s_linear_infinite]" />
        </div>
    );
}
