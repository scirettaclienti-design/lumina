"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { X, ArrowRight, Zap, Eye, Brain, Box } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const modules = [
    {
        id: "play",
        title: "Play",
        desc: "Gamification",
        icon: <Zap className="w-6 h-6" />,
        longDesc: "Trasforma la partecipazione passiva in coinvolgimento attivo. Classifiche, sfide e premi in tempo reale per massimizzare l'engagement.",
        details: "Il modulo PLAY introduce meccaniche di gioco avanzate. Leaderboard live, quiz interattivi e sfide a squadre trasformano ogni momento dell'evento in un'opportunità di connessione.",
        image: "/play-bg.png",
        color: "#00f0ff"
    },
    {
        id: "sense",
        title: "Sense",
        desc: "Immersion",
        icon: <Eye className="w-6 h-6" />,
        longDesc: "Esperienze multisensoriali che stimolano emozioni profonde attraverso suoni, luci e atmosfere reattive.",
        details: "SENSE sincronizza luci, suoni e profumi con i momenti chiave dell'evento. L'ambiente reagisce all'umore della sala, creando un'atmosfera viva e respirante.",
        image: "/sense-bg.png",
        color: "#d946ef"
    },
    {
        id: "learn",
        title: "Learn",
        desc: "Education",
        icon: <Brain className="w-6 h-6" />,
        longDesc: "Percorsi formativi che si adattano al livello di conoscenza di ogni partecipante.",
        details: "Il motore AI di LEARN analizza in tempo reale le domande e l'interesse dei partecipanti, adattando i contenuti formativi e suggerendo approfondimenti personalizzati.",
        image: "/learn-bg.png",
        color: "#f59e0b"
    },
    {
        id: "immersive",
        title: "Immersive",
        desc: "Spatial Web",
        icon: <Box className="w-6 h-6" />,
        longDesc: "Estendi l'evento oltre i confini fisici con realtà aumentata e ambienti virtuali persistenti.",
        details: "IMMERSIVE rompe la quarta parete. Oggetti 3D flottanti, guide olografiche e portali AR permettono di esplorare prodotti e concetti in un nuovo spazio dimensionale.",
        image: "/immersive-bg.png",
        color: "#10b981"
    },
];

export default function SystemXP() {
    const container = useRef(null);
    const [activeModule, setActiveModule] = useState<typeof modules[0] | null>(null);

    return (
        <section id="system-section" ref={container} className="py-32 px-4 relative bg-black/50 overflow-hidden min-h-screen flex flex-col justify-center">
            {/* Background Glow */}
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vw] bg-accent/5 blur-[150px] rounded-full -z-10 pointer-events-none transition-colors duration-700`} style={{ backgroundColor: activeModule ? activeModule.color + '20' : '' }} />

            <div className="text-center mb-16 relative z-10">
                <h2 className="text-4xl md:text-7xl font-bold mb-6 tracking-tighter">Sistema <span className="text-gradient">XP</span></h2>
                <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto font-light">
                    Scegli i driver della tua esperienza.
                </p>
            </div>

            {/* Grid */}
            <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4 relative z-20">
                {modules.map((mod, i) => (
                    <Card
                        key={i}
                        module={mod}
                        index={i}
                        isActive={activeModule?.id === mod.id}
                        onClick={() => setActiveModule(mod)}
                    />
                ))}
            </div>

            {/* Floating Detail Panel (Contextual) */}
            <div className={`fixed bottom-0 left-0 w-full z-50 transition-transform duration-500 ease-in-out ${activeModule ? 'translate-y-0' : 'translate-y-full'}`}>
                {activeModule && (
                    <div className="mx-auto max-w-4xl bg-[#0a0a0a]/90 backdrop-blur-xl border-t border-accent/20 rounded-t-3xl shadow-[0_-10px_50px_rgba(0,0,0,0.8)] relative overflow-hidden">

                        {/* Progress Bar Top */}
                        <div className="h-1 w-full bg-white/10">
                            <div className="h-full bg-accent animate-[loading_4s_ease-in-out_infinite]" style={{ backgroundColor: activeModule.color, width: '100%' }} />
                        </div>

                        <div className="p-8 md:p-12 relative">
                            <button
                                onClick={() => setActiveModule(null)}
                                className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/20 transition-colors"
                            >
                                <X className="w-6 h-6 text-white" />
                            </button>

                            <div className="flex flex-col md:flex-row gap-8 items-start">
                                <div className="shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center text-black" style={{ backgroundColor: activeModule.color }}>
                                    {activeModule.icon}
                                </div>
                                <div>
                                    <h3 className="text-3xl font-bold mb-2 flex items-center gap-3">
                                        {activeModule.title}
                                        <span className="text-sm font-mono opacity-50 font-normal px-2 py-1 rounded border border-white/20">MODULE ACTIVE</span>
                                    </h3>
                                    <p className="text-xl text-white/90 leading-relaxed mb-6">
                                        {activeModule.details}
                                    </p>

                                    <div className="flex items-center gap-4 text-sm text-white/50">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                            System Ready
                                        </div>
                                        <span>•</span>
                                        <p>Scroll down to visualize integration</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}

function Card({ module, index, isActive, onClick }: { module: any, index: number, isActive: boolean, onClick: () => void }) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [hover, setHover] = useState(false);

    useEffect(() => {
        if (!cardRef.current) return;

        gsap.fromTo(cardRef.current,
            { y: 100, opacity: 0 },
            {
                scrollTrigger: {
                    trigger: cardRef.current,
                    start: "top bottom-=50",
                    toggleActions: "play none none reverse"
                },
                y: 0,
                opacity: 1,
                duration: 0.8,
                delay: index * 0.1,
                ease: "power2.out"
            }
        );
    }, [index]);

    return (
        <div
            ref={cardRef}
            onClick={onClick}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            className={`group relative h-[350px] rounded-[2rem] overflow-hidden border cursor-pointer transition-all duration-500 ${isActive ? 'ring-2 ring-offset-2 ring-offset-black scale-105 z-30' : 'hover:scale-105 border-white/10 hover:border-white/30'}`}
            style={{
                borderColor: isActive ? module.color : '',
                boxShadow: isActive ? `0 0 30px ${module.color}40` : ''
            }}
        >
            <div className="absolute inset-0 z-0">
                <Image
                    src={module.image}
                    alt={module.title}
                    fill
                    className={`object-cover transition-transform duration-700 ${hover || isActive ? 'scale-110' : 'scale-100'} opacity-60`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
            </div>

            <div className="absolute inset-0 z-10 p-8 flex flex-col justify-end">
                <div className="flex items-center gap-3 mb-2 opacity-50 text-xs font-mono uppercase tracking-widest">
                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: module.color }} />
                    0{index + 1}
                </div>
                <h3 className="text-3xl font-bold mb-2 text-white">{module.title}</h3>
                <p className="text-gray-300 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-4 group-hover:translate-y-0">
                    {module.longDesc.substring(0, 80)}...
                </p>

                <div className="mt-4 flex items-center gap-2 text-xs font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-all duration-300 delay-100" style={{ color: module.color }}>
                    Explore <ArrowRight className="w-3 h-3" />
                </div>
            </div>
        </div>
    );
}
