"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Problem() {
    const container = useRef(null);
    const textRefs = useRef<(HTMLParagraphElement | null)[]>([]);

    useEffect(() => {
        textRefs.current.forEach((text, i) => {
            if (!text) return;
            gsap.fromTo(text,
                { y: 50, opacity: 0 },
                {
                    scrollTrigger: {
                        trigger: text,
                        start: "top 80%",
                        end: "bottom 20%",
                        toggleActions: "play none none reverse"
                    },
                    y: 0,
                    opacity: 1,
                    duration: 1.2,
                    ease: "power3.out"
                });
        });
    }, []);

    const lines = [
        "Gli eventi standard",
        "non funzionano più.",
        "Le aziende sono diverse.",
        "Le persone anche."
    ];

    return (
        <section ref={container} className="min-h-[80vh] flex flex-col justify-center items-center py-32 px-4 relative z-10">
            <div className="max-w-5xl text-center mx-auto">
                {lines.map((line, i) => (
                    <p
                        key={i}
                        ref={(el) => {
                            if (el) textRefs.current[i] = el;
                        }}
                        className={`text-4xl md:text-7xl font-bold mb-4 tracking-tight leading-tight ${i >= 2 ? 'text-gradient' : 'text-white/50'}`}
                    >
                        {line}
                    </p>
                ))}
            </div>
        </section>
    );
}
