import { motion, useInView, useSpring } from 'framer-motion';
import { useEffect, useRef } from 'react';

interface CountUpProps {
  value: number;
}

export const CountUp = ({ value }: CountUpProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const motionValue = useSpring(0, {
    damping: 50,
    stiffness: 200,
  });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [motionValue, isInView, value]);

  useEffect(() => {
      const unsubscribe = motionValue.on("change", (latest) => {
        if (ref.current) {
          ref.current.textContent = Math.round(latest).toString();
        }
      });
      return unsubscribe;
  }, [motionValue]);

  return <span ref={ref} />;
};