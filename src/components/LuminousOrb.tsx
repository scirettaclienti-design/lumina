"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation";

gsap.registerPlugin(ScrollTrigger);

export default function LuminousOrb() {
    const orbRef = useRef<HTMLDivElement>(null);
    const pathname = usePathname();

    useEffect(() => {
        if (!orbRef.current) return;

        // Initial State (Hero)
        const orb = orbRef.current;

        // Define keyframes/checkpoints based on section IDs
        // We use a single ScrollTrigger to scrub the entire timeline or individual ones?
        // Individual is better for responsive control.

        const tl = gsap.timeline({
            defaults: { ease: "power2.inOut", duration: 1 }
        });

        // 1. Hero -> Problem (Move to center, shrink slightly)
        ScrollTrigger.create({
            trigger: "#hero-section",
            start: "top top",
            end: "bottom center",
            scrub: 1,
            onUpdate: (self) => {
                gsap.to(orb, {
                    top: "50%",
                    left: "50%",
                    scale: 1.5,
                    boxShadow: "0 0 100px 40px rgba(0, 240, 255, 0.3)",
                    overwrite: "auto"
                });
            }
        });

        // 2. Problem -> SystemXP (Move to top right, change color)
        ScrollTrigger.create({
            trigger: "#problem-section",
            start: "top center",
            end: "bottom center",
            scrub: true,
            animation: gsap.to(orb, {
                top: "20%",
                left: "85%",
                scale: 0.8,
                backgroundColor: "#7000ff",
                boxShadow: "0 0 80px 30px rgba(112, 0, 255, 0.4)"
            })
        });

        // 3. SystemXP -> Method (Travel down the center line of Method)
        ScrollTrigger.create({
            trigger: "#method-section",
            start: "top bottom",
            end: "bottom bottom",
            scrub: true,
            animation: gsap.fromTo(orb,
                { top: "10%", left: "50%", scale: 1 },
                { top: "90%", left: "50%", scale: 0.5, backgroundColor: "#ffffff" }
            )
        });

        return () => {
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, [pathname]);

    return (
        <div
            ref={orbRef}
            className="fixed w-8 h-8 rounded-full bg-accent z-50 pointer-events-none mix-blend-screen"
            style={{
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                boxShadow: "0 0 50px 20px rgba(0, 240, 255, 0.5)",
                filter: "blur(2px)"
            }}
        >
            <div className="absolute inset-0 bg-white rounded-full animate-ping opacity-20" />
        </div>
    );
}
