import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

const GlowCard = ({ children, className, hover = true }: GlowCardProps) => {
  return (
    <div
      className={cn(
        "glass rounded-lg p-6 animated-border transition-all duration-500",
        hover && "hover:glow-box-hover hover:scale-[1.02] cursor-pointer",
        "glow-box",
        className
      )}
    >
      {children}
    </div>
  );
};

export default GlowCard;
