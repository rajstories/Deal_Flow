import React, { useRef, useState } from 'react';
import { cn } from '@/lib/utils';

export default function SpotlightCard({
    children,
    className = "",
    spotlightColor = "rgba(79, 70, 229, 0.1)",
    borderColor = "rgba(79, 70, 229, 0.5)"
}) {
    const divRef = useRef(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(0);

    const handleMouseMove = (e) => {
        if (!divRef.current) return;

        const div = divRef.current;
        const rect = div.getBoundingClientRect();

        setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    const handleMouseEnter = () => {
        setOpacity(1);
    };

    const handleMouseLeave = () => {
        setOpacity(0);
    };

    return (
        <div
            ref={divRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={cn(
                "relative overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 group",
                className
            )}
        >
            {/* Spotlight Glow */}
            <div
                className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
                style={{
                    opacity,
                    background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 40%)`,
                }}
            />

            {/* Border Reveal */}
            <div
                className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300"
                style={{
                    opacity,
                    background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, ${borderColor}, transparent 40%)`,
                    mask: 'linear-gradient(black, black) content-box, linear-gradient(black, black)',
                    maskComposite: 'xor',
                    WebkitMaskComposite: 'xor',
                    padding: '1px',
                }}
            />

            <div className="relative h-full">{children}</div>
        </div>
    );
}