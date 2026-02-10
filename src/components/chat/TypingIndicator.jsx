import React from 'react';
import { motion } from 'framer-motion';

export default function TypingIndicator() {
    return (
        <div className="flex items-center gap-1 px-4 py-3 bg-slate-800/50 rounded-2xl rounded-bl-sm w-fit">
            {[0, 1, 2].map((i) => (
                <motion.div
                    key={i}
                    className="w-2 h-2 bg-slate-400 rounded-full"
                    animate={{
                        y: [0, -8, 0],
                        opacity: [0.5, 1, 0.5]
                    }}
                    transition={{
                        duration: 0.8,
                        repeat: Infinity,
                        delay: i * 0.15,
                        ease: "easeInOut"
                    }}
                />
            ))}
        </div>
    );
}
