import { Github, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative border-t border-border/30 mt-20">
      {/* Animated divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div>
            <h3 className="font-heading text-primary text-sm tracking-[0.2em] mb-3 glow-text-sm">CLH HACKATHON</h3>
            <p className="text-muted-foreground text-sm">Build the Future with AI</p>
          </div>

          <div>
            <h4 className="font-heading text-xs text-foreground tracking-widest mb-3">ORGANIZED BY</h4>
            <p className="text-muted-foreground text-sm">CLH Tech Community</p>
            <p className="text-muted-foreground text-sm">hackathon@clhtech.com</p>
          </div>

          <div className="flex justify-center md:justify-end items-start gap-4">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-300">
              <Github size={20} />
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-300">
              <Linkedin size={20} />
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-300">
              <Mail size={20} />
            </a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border/20 text-center">
          <p className="text-muted-foreground text-xs tracking-wider">
            © 2026 CLH Hackathon. All rights reserved. Powered by JARVIS.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
