import { useEffect, useState } from "react";

type TailwindAmount = 75 | 100 | 150 | 200 | 300 | 500 | 700 | 1000;

type Props = {
  children: React.ReactNode;
  duration?: TailwindAmount;
  delay?: 0 | TailwindAmount;
};

export default function FadeIn({
  children,
  duration = 1000,
  delay = 0,
}: Props) {
  const [opacity, setOpacity] = useState(0);

  useEffect(() => setOpacity(100), []);

  return (
    <div
      className={`opacity-${opacity} transition-opacity duration-${duration} ease-in-out delay-${delay}`}
    >
      {children}
    </div>
  );
}
