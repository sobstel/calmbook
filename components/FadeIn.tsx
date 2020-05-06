import { useEffect, useState } from "react";

export type TailwindNumber =
  | 0
  | 75
  | 100
  | 150
  | 200
  | 300
  | 400
  | 500
  | 600
  | 700
  | 800
  | 900
  | 1000;

type Props = {
  children: React.ReactNode;
  duration?: TailwindNumber;
  delay?: TailwindNumber;
};

export default function FadeIn({
  children,
  duration = 1000,
  delay = 0,
}: Props) {
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    requestAnimationFrame(() => setOpacity(100));
  }, []);

  return (
    <div
      className={`opacity-${opacity} transition-opacity duration-${duration} ease-in-out delay-${delay}`}
    >
      {children}
    </div>
  );
}
