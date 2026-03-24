import { useState, useEffect, useRef } from "react";

const DURATION = 280;
const WIDTH = 450;

export default function AnimatedPanel({ open, children }) {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    clearTimeout(timeoutRef.current);

    if (open) {
      setMounted(true);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setVisible(true));
      });
    } else {
      setVisible(false);
      timeoutRef.current = setTimeout(() => setMounted(false), DURATION);
    }

    return () => clearTimeout(timeoutRef.current);
  }, [open]);

  if (!mounted) return null;

  return (
    <div
      className="shrink-0 overflow-hidden"
      style={{
        width: visible ? WIDTH : 0,
        opacity: visible ? 1 : 0,
        transition: `width ${DURATION}ms cubic-bezier(0.4, 0, 0.2, 1), opacity ${DURATION * 0.6}ms ease`,
      }}
    >
      <div
        className="h-full"
        style={{
          width: WIDTH,
          transform: visible ? "translateX(0)" : "translateX(30px)",
          opacity: visible ? 1 : 0,
          transition: `transform ${DURATION}ms cubic-bezier(0.4, 0, 0.2, 1), opacity ${DURATION * 0.7}ms ease`,
        }}
      >
        {children}
      </div>
    </div>
  );
}
