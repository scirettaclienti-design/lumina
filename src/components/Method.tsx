"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Settings, Music, Zap } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Method() {
    const container = useRef(null);
    const stepsRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        // Vertical line growth
        gsap.fromTo(".timeline-line",
            { height: "0%" },
            {
                height: "100%",
                scrollTrigger: {
                    trigger: container.current,
                    start: "top center",
                    end: "bottom center",
                    scrub: 1
                },
                ease: "none"
            }
        );

        stepsRef.current.forEach((step, i) => {
            if (!step) return;

            // Icon activation
            gsap.fromTo(step.querySelector(".step-icon"),
                { scale: 0, opacity: 0, backgroundColor: "#111" },
                {
                    scale: 1,
                    opacity: 1,
                    backgroundColor: i === 2 ? "#d946ef" : i === 1 ? "#00f0ff" : "#fff",
                    color: "#000",
                    scrollTrigger: {
                        trigger: step,
                        start: "top center",
                        end: "top center+=100",
                        toggleActions: "play none none reverse",
                        scrub: false
                    },
                    duration: 0.5,
                    ease: "back.out(1.7)"
                }
            );

            // Text reveal
            gsap.fromTo(step.querySelector(".step-content"),
                { x: i % 2 === 0 ? 50 : -50, opacity: 0 },
                {
                    x: 0,
                    opacity: 1,
                    scrollTrigger: {
                        trigger: step,
                        start: "top 70%",
                        end: "top 40%",
                        toggleActions: "play none none reverse",
                        scrub: 1
                    }
                }
            );
        });

    }, []);

    const steps = [
        {
            id: "01",
            title: "ASCOLTO",
            subtitle: "Data & Empathy",
            desc: "Non partiamo da un template. Partiamo dai tuoi dati. Analizziamo la cultura aziendale e gli obiettivi per definire il perimetro dell'esperienza.",
            icon: <Music />
        },
        {
            id: "02",
            title: "COMPOSIZIONE",
            subtitle: "Strategic Modular Design",
            desc: "Selezioniamo i moduli XP ideali. Non un pacchetto standard, ma una configurazione unica generata per il tuo specifico obiettivo.",
            icon: <Settings />
        },
        {
            id: "03",
            title: "ESPERIENZA",
            subtitle: "The Live Event",
            desc: "Il deploy dell'evento. Un sistema vivo che reagisce in tempo reale ai partecipanti. Monitoraggio costante e adattamento dinamico.",
            icon: <Zap />
        },
    ];

    return (
        <section id="method-section" ref={container} className="min-h-screen py-32 px-4 relative overflow-hidden">
            <div className="text-center mb-24 relative z-10">
                <h2 className="text-sm font-mono tracking-widest text-accent mb-4">IL METODO XP</h2>
                <h3 className="text-4xl md:text-6xl font-bold">Dall'analisi all'estasi.</h3>
            </div>

            <div className="max-w-4xl mx-auto relative">
                {/* Central Line */}
                <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-white/10 -translate-x-1/2 rounded-full overflow-hidden">
                    <div className="timeline-line w-full bg-gradient-to-b from-accent via-purple-500 to-white shadow-[0_0_20px_rgba(0,240,255,0.5)]" />
                </div>

                <div className="space-y-32">
                    {steps.map((step, i) => (
                        <div
                            key={i}
                            ref={(el) => { if (el) stepsRef.current[i] = el; }}
                            className={`flex flex-col md:flex-row items-center gap-8 relative ${i % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
                        >
                            {/* Marker on Line */}
                            <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-12 h-12 rounded-full border-4 border-surface bg-surface z-10 flex items-center justify-center step-icon shadow-2xl">
                                <div className="text-white">
                                    {step.icon}
                                </div>
                            </div>

                            {/* Content Side */}
                            <div className={`step-content md:w-1/2 pl-16 md:pl-0 ${i % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16 md:text-left'}`}>
                                <h4 className="text-6xl md:text-8xl font-bold text-white/5 absolute -top-10 -z-10 select-none hidden md:block" style={{
                                    right: i % 2 === 0 ? '4rem' : 'auto',
                                    left: i % 2 !== 0 ? '4rem' : 'auto',
                                }}>{step.id}</h4>

                                <span className="text-accent text-sm font-bold tracking-wider uppercase mb-2 block">{step.subtitle}</span>
                                <h3 className="text-3xl md:text-5xl font-bold mb-4">{step.title}</h3>
                                <p className="text-lg text-gray-400 leading-relaxed font-light">
                                    {step.desc}
                                </p>
                            </div>

                            {/* Empty Side for Balance */}
                            <div className="md:w-1/2 hidden md:block" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
