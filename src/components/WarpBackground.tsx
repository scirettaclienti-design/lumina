"use client";
import { useEffect, useRef } from "react";

export default function WarpBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = window.innerWidth;
        let height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;

        const stars: { x: number; y: number; z: number; size: number, color: string }[] = [];
        const numStars = 800; // Reduced for performance
        const speed = 4;

        const colors = ['#ffffff', '#00f0ff', '#d946ef', '#7000ff'];

        for (let i = 0; i < numStars; i++) {
            const color = colors[Math.floor(Math.random() * colors.length)];
            stars.push({
                x: Math.random() * width - width / 2,
                y: Math.random() * height - height / 2,
                z: Math.random() * width,
                size: Math.random() * 2 + 0.5,
                color: color
            });
        }

        let animationFrameId: number;

        const render = () => {
            // Create trails
            ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
            ctx.fillRect(0, 0, width, height);

            stars.forEach((star) => {
                star.z -= speed;
                if (star.z <= 0) {
                    star.z = width;
                    star.x = Math.random() * width - width / 2;
                    star.y = Math.random() * height - height / 2;
                }

                const x = (star.x / star.z) * width + width / 2;
                const y = (star.y / star.z) * height + height / 2;
                const radius = (1 - star.z / width) * star.size;

                if (x >= 0 && x <= width && y >= 0 && y <= height) {
                    const opacity = 1 - star.z / width;

                    ctx.beginPath();
                    ctx.arc(x, y, radius, 0, Math.PI * 2);
                    ctx.fillStyle = star.color;
                    ctx.globalAlpha = opacity;
                    ctx.fill();
                }
            });
            ctx.globalAlpha = 1;
            animationFrameId = requestAnimationFrame(render);
        };

        render();

        const handleResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };

        window.addEventListener('resize', handleResize);

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute top-0 left-0 w-full h-full -z-10" // Removed opacity to make it clear, z-10 puts it beind text
        />
    );
}
