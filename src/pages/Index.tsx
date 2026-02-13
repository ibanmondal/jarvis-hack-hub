import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ScrollReveal from "@/components/ScrollReveal";
import { ChevronRight, Zap } from "lucide-react";

const Index = () => {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
      {/* Hero Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <ScrollReveal>
          <p className="font-heading text-xs sm:text-sm tracking-[0.4em] text-primary/70 mb-4 uppercase">
            Initiating Protocol
          </p>
        </ScrollReveal>

        <ScrollReveal>
          <h1 className="font-heading text-4xl sm:text-6xl lg:text-7xl font-bold text-foreground mb-4 glow-text leading-tight">
            CLH HACKATHON
            <span className="block text-primary">2026</span>
          </h1>
        </ScrollReveal>

        <ScrollReveal>
          <p className="text-lg sm:text-xl text-muted-foreground mb-10 font-body tracking-wider max-w-2xl mx-auto">
            Build the Future with AI — A 48-hour immersive experience where innovation meets intelligence.
          </p>
        </ScrollReveal>

        <ScrollReveal className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild variant="glow" size="lg" className="text-base px-8">
            <Link to="/register">
              <Zap size={18} />
              Register Now
            </Link>
          </Button>
          <Button asChild variant="glow-outline" size="lg" className="text-base px-8">
            <Link to="/problems">
              View Tracks
              <ChevronRight size={18} />
            </Link>
          </Button>
        </ScrollReveal>
      </div>

      {/* Floating decorative elements */}
      <div className="absolute top-1/4 left-10 w-2 h-2 rounded-full bg-primary/30 animate-float" />
      <div className="absolute top-1/3 right-16 w-1.5 h-1.5 rounded-full bg-glow-secondary/30 animate-float" style={{ animationDelay: "1s" }} />
      <div className="absolute bottom-1/3 left-1/4 w-1 h-1 rounded-full bg-primary/20 animate-float" style={{ animationDelay: "2s" }} />

      {/* HUD corner accents */}
      <div className="absolute top-24 left-6 w-16 h-16 border-l border-t border-primary/15 rounded-tl-lg" />
      <div className="absolute top-24 right-6 w-16 h-16 border-r border-t border-primary/15 rounded-tr-lg" />
      <div className="absolute bottom-12 left-6 w-16 h-16 border-l border-b border-primary/15 rounded-bl-lg" />
      <div className="absolute bottom-12 right-6 w-16 h-16 border-r border-b border-primary/15 rounded-br-lg" />
    </div>
  );
};

export default Index;
