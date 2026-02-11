import React, { useEffect, useRef, useState } from 'react';

// --- Components ---

export const Button = ({
    variant = 'primary',
    size = 'md',
    icon: Icon,
    children,
    className = '',
    ...props
}) => {
    const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500/50 disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-95 hover:-translate-y-0.5";

    const variants = {
        primary: "bg-gold-500 text-navy-900 hover:bg-gold-400 shadow-lg shadow-gold-500/20 font-bold",
        secondary: "bg-white text-navy-900 border border-slate-200 hover:bg-slate-50 shadow-sm",
        outline: "border-2 border-slate-200 text-slate-600 hover:border-gold-500 hover:text-gold-600",
        ghost: "text-slate-600 hover:text-gold-600 hover:bg-gold-50",
        navy: "bg-navy-900 text-white hover:bg-navy-800 shadow-lg"
    };

    const sizes = {
        sm: "px-4 py-2 text-sm",
        md: "px-6 py-3 text-base",
        lg: "px-8 py-4 text-lg",
        xl: "px-10 py-5 text-xl font-bold",
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
            {...props}
        >
            {children}
            {Icon && <Icon className="ml-2 w-5 h-5" />}
        </button>
    );
};

export const Reveal = ({
    children,
    delay = 0,
    direction = 'up',
    className = ''
}) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1, rootMargin: '50px' }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, []);

    const getTransform = () => {
        if (!isVisible) {
            switch (direction) {
                case 'up': return 'translate-y-10';
                case 'down': return '-translate-y-10';
                case 'left': return 'translate-x-10';
                case 'right': return '-translate-x-10';
                default: return '';
            }
        }
        return 'translate-0';
    };

    return (
        <div
            ref={ref}
            className={`transition-all duration-1000 ease-out ${getTransform()} ${isVisible ? 'opacity-100' : 'opacity-0'} ${className}`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
};

export const SectionWrapper = ({ id, className = '', children }) => (
    <section id={id} className={`relative w-full overflow-hidden ${className}`}>
        {children}
    </section>
);

export const Badge = ({ children, variant = 'gold' }) => {
    const styles = {
        gold: "bg-gold-50 text-gold-700 border-gold-100",
        outline: "border-slate-200 text-slate-600 bg-white",
        orange: "bg-orange-50 text-orange-700 border-orange-100"
    };

    return (
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase border ${styles[variant]}`}>
            {children}
        </span>
    );
};

export const CountUp = ({ end, suffix = '', prefix = '', duration = 2000 }) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const [hasStarted, setHasStarted] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasStarted) {
                    setHasStarted(true);
                }
            },
            { threshold: 0.5 }
        );

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [hasStarted]);

    useEffect(() => {
        if (!hasStarted) return;

        let startTime = null;
        const animate = (currentTime) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);

            const easeOutQuart = 1 - Math.pow(1 - progress, 4);

            setCount(Math.floor(easeOutQuart * end));

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }, [hasStarted, end, duration]);

    return <span ref={ref} className="font-mono">{prefix}{count.toLocaleString()}{suffix}</span>;
};
