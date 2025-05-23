import { ReactNode, useEffect, useState } from "react";

interface Props {
  children: ReactNode;
  fallback: ReactNode;
  delay?: number;
}

const DelayedSuspense = ({ children, fallback, delay = 3000 }: Props) => {
  const [showFallback, setShowFallback] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowFallback(false), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return <>{showFallback ? fallback : children}</>;
};

export default DelayedSuspense;