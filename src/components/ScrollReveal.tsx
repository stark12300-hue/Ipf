import React, { useEffect, useRef, useState } from 'react';

export type RevealDirection = 'up' | 'down' | 'left' | 'right' | 'zoom' | 'fade';

interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: RevealDirection;
  delay?: number; // Delay in milliseconds
  duration?: number; // Duration in milliseconds
  distance?: number; // Displacement in pixels
  className?: string;
  threshold?: number;
  once?: boolean;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  direction = 'up',
  delay = 0,
  duration = 650,
  distance = 36,
  className = '',
  threshold = 0.08,
  once = false,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (once && domRef.current) {
              observer.unobserve(domRef.current);
            }
          } else if (!once) {
            setIsVisible(false);
          }
        });
      },
      {
        threshold,
        rootMargin: '0px 0px -30px 0px',
      }
    );

    const currentEl = domRef.current;
    if (currentEl) {
      observer.observe(currentEl);
    }

    return () => {
      if (currentEl) {
        observer.unobserve(currentEl);
      }
    };
  }, [threshold, once]);

  // Compute transform offset when hidden
  const getHiddenTransform = (): string => {
    switch (direction) {
      case 'up':
        return `translate3d(0, ${distance}px, 0)`;
      case 'down':
        return `translate3d(0, -${distance}px, 0)`;
      case 'left':
        return `translate3d(-${distance}px, 0, 0)`;
      case 'right':
        return `translate3d(${distance}px, 0, 0)`;
      case 'zoom':
        return 'scale(0.88)';
      case 'fade':
      default:
        return 'translate3d(0, 0, 0)';
    }
  };

  const currentTransform = isVisible ? 'translate3d(0, 0, 0) scale(1)' : getHiddenTransform();
  const currentOpacity = isVisible ? 1 : 0;

  return (
    <div
      ref={domRef}
      className={className}
      style={{
        opacity: currentOpacity,
        transform: currentTransform,
        transitionProperty: 'opacity, transform',
        transitionDuration: isVisible ? `${duration}ms` : '200ms',
        transitionDelay: isVisible ? `${delay}ms` : '0ms',
        transitionTimingFunction: isVisible ? 'cubic-bezier(0.16, 1, 0.3, 1)' : 'ease-out',
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </div>
  );
};
