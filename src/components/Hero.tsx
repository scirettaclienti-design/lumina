import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
    const containerRef = useRef(null);
    const textRef = useRef(null);
    const [showModal, setShowModal] = useState(false);

    // Split text for animation
    const title = "LUMINA";
    const chars = title.split("").map((char, i) => (
        <span key={i} className="hero-char inline-block origin-bottom has-glow">{char}</span>
    ));

    useEffect(() => {
        // Entrance Animation
        const tl = gsap.timeline();

        tl.to(containerRef.current, { opacity: 1, duration: 1 })
            .fromTo(".hero-char",
                { y: 100, opacity: 0, rotationX: 90 },
                { y: 0, opacity: 1, rotationX: 0, stagger: 0.05, duration: 1.2, ease: "back.out(1.7)" }
            )
            .fromTo(".hero-xp",
                { scale: 0.8, opacity: 0 },
                { scale: 1, opacity: 1, duration: 1.5, ease: "power2.out" },
                "-=1"
            )
            .fromTo(".hero-fade",
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, stagger: 0.2, duration: 0.8 },
                "-=0.5"
            );

        // Mouse Parallax for Text
        const handleMouseMove = (e: MouseEvent) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 30;
            const y = (e.clientY / window.innerHeight - 0.5) * 30;
            gsap.to(textRef.current, {
                x: x,
                y: y,
                duration: 1,
                ease: "power2.out"
            });
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <>
            <section ref={containerRef} className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden opacity-0 will-change-transform transform-gpu">
                {/* Reduced Overlay Gradient to let stars shine */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/90 pointer-events-none" />

                <div ref={textRef} className="z-10 text-center px-4 relative mix-blend-screen">
                    <div className="relative mb-8">
                        {/* Layered Typography */}
                        <div className="relative inline-flex items-center justify-center">
                            <h1 className="text-7xl md:text-9xl font-black tracking-tighter leading-none text-white relative z-10 drop-shadow-2xl">
                                {chars}
                            </h1>

                            {/* XP Behind */}
                            <span className="hero-xp absolute top-1/2 left-1/2 -translate-x-1/4 -translate-y-1/2 text-[10rem] md:text-[16rem] font-bold italic text-white/5 -z-10 whitespace-nowrap select-none mix-blend-overlay pr-24">
                                XP
                            </span>
                        </div>
                    </div>

                    <div className="hero-fade">
                        <p className="text-xl md:text-2xl text-blue-200/80 mb-4 max-w-3xl mx-auto font-light leading-relaxed tracking-wide">
                            Esperienze che si adattano.
                        </p>
                        <p className="text-xs md:text-sm text-accent/80 font-mono uppercase tracking-[0.4em] mb-12">
                            Adaptive Experience Platform
                        </p>
                    </div>

                    <div className="hero-fade flex flex-col md:flex-row gap-6 justify-center items-center">
                        <button
                            onClick={() => {
                                document.getElementById('teaser-section')?.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className="px-8 py-4 rounded-full border border-accent/50 bg-accent/5 backdrop-blur-md text-white font-bold tracking-widest text-sm hover:bg-accent/20 hover:scale-105 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,240,255,0.3)] shadow-[0_0_10px_rgba(0,240,255,0.1)]"
                        >
                            COSTRUISCI LA TUA ESPERIENZA
                        </button>

                        <button
                            onClick={() => {
                                document.getElementById('problem-section')?.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className="px-8 py-4 rounded-full border border-white/20 bg-white/5 backdrop-blur-md text-white font-bold tracking-widest text-sm hover:bg-white/20 hover:scale-105 transition-all duration-300 shadow-[0_0_10px_rgba(255,255,255,0.05)]"
                        >
                            SCOPRI IL SISTEMA
                        </button>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="hero-fade absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 animate-bounce">
                    <span className="text-[10px] uppercase tracking-widest">Scroll to Explore</span>
                    <div className="w-px h-12 bg-gradient-to-b from-white to-transparent" />
                </div>
            </section>

            {/* Builder Modal */}
            {showModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div
                        className="absolute inset-0 bg-black/80 backdrop-blur-xl"
                        onClick={() => setShowModal(false)}
                    />
                    <div className="relative w-full max-w-4xl bg-[#0a0a0a] border border-white/10 rounded-3xl p-10 md:p-16 shadow-[0_0_100px_rgba(112,0,255,0.2)] animate-in zoom-in-95 duration-300">
                        <button
                            onClick={() => setShowModal(false)}
                            className="absolute top-6 right-6 p-2 hover:bg-white/10 rounded-full transition-colors"
                        >
                            ✕
                        </button>
                        <h2 className="text-3xl md:text-4xl font-bold mb-2">Configura Evento</h2>
                        <p className="text-gray-400 mb-8">Seleziona la tipologia per inizializzare il motore XP.</p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {[
                                { title: 'Corporate Meeting', icon: '🏢' },
                                { title: 'Product Launch', icon: '🚀' },
                                { title: 'Brand Experience', icon: '✨' }
                            ].map((item) => (
                                <div key={item.title} className="group relative h-48 border border-white/10 rounded-2xl flex flex-col items-center justify-center bg-white/5 hover:bg-white/10 hover:border-accent cursor-pointer transition-all overflow-hidden">
                                    <div className="text-4xl mb-4 transform group-hover:scale-125 transition-transform duration-300">{item.icon}</div>
                                    <span className="text-lg font-bold">{item.title}</span>
                                    <div className="absolute inset-0 bg-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
