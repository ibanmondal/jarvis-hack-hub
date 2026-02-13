import { useState } from "react";
import { Button } from "@/components/ui/button";
import ScrollReveal from "@/components/ScrollReveal";
import { Send, Upload, Loader2 } from "lucide-react";

const tracks = ["Artificial Intelligence", "Web Development", "Cybersecurity", "Open Innovation"];

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 2000);
  };

  if (submitted) {
    return (
      <div className="relative z-10 min-h-screen pt-24 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-20 h-20 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center mx-auto mb-6 animate-glow-pulse">
            <Send className="text-primary" size={28} />
          </div>
          <h2 className="font-heading text-2xl text-primary mb-3 glow-text-sm">Registration Complete</h2>
          <p className="text-muted-foreground">Your team has been registered. Welcome to CLH Hackathon 2026.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative z-10 min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-xl mx-auto">
        <ScrollReveal>
          <p className="font-heading text-xs tracking-[0.4em] text-primary/60 mb-2 text-center">ENLIST</p>
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-center mb-12 glow-text">
            Register Your Team
          </h1>
        </ScrollReveal>

        <ScrollReveal>
          <form onSubmit={handleSubmit} className="glass rounded-xl p-6 sm:p-8 animated-border space-y-5">
            <InputField label="Team Name" name="team" placeholder="e.g. Neural Nexus" required />
            <InputField label="Member 1 (Leader)" name="member1" placeholder="Full name" required />
            <InputField label="Member 2" name="member2" placeholder="Full name" />
            <InputField label="Member 3" name="member3" placeholder="Full name" />
            <InputField label="Email" name="email" type="email" placeholder="team@email.com" required />
            <InputField label="Phone" name="phone" type="tel" placeholder="+91 XXXXX XXXXX" required />

            <div>
              <label className="block font-heading text-xs tracking-widest text-muted-foreground mb-2">
                PROBLEM TRACK
              </label>
              <select
                name="track"
                required
                className="w-full bg-muted/30 border border-border/50 rounded-md px-4 py-2.5 text-foreground font-body text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all"
              >
                <option value="">Select a track</option>
                {tracks.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-heading text-xs tracking-widest text-muted-foreground mb-2">
                PAYMENT SCREENSHOT
              </label>
              <label className="flex items-center gap-3 cursor-pointer w-full bg-muted/30 border border-dashed border-border/50 rounded-md px-4 py-4 text-muted-foreground text-sm hover:border-primary/30 transition-colors">
                <Upload size={18} className="text-primary/60" />
                <span>Click to upload</span>
                <input type="file" accept="image/*" className="hidden" />
              </label>
            </div>

            <Button type="submit" variant="glow" className="w-full mt-4" size="lg" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Processing…
                </>
              ) : (
                <>
                  <Send size={18} />
                  Submit Registration
                </>
              )}
            </Button>
          </form>
        </ScrollReveal>
      </div>
    </div>
  );
};

const InputField = ({
  label,
  name,
  type = "text",
  placeholder,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder: string;
  required?: boolean;
}) => (
  <div>
    <label htmlFor={name} className="block font-heading text-xs tracking-widest text-muted-foreground mb-2">
      {label}
    </label>
    <input
      id={name}
      name={name}
      type={type}
      placeholder={placeholder}
      required={required}
      className="w-full bg-muted/30 border border-border/50 rounded-md px-4 py-2.5 text-foreground font-body text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all"
    />
  </div>
);

export default Register;
