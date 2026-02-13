import GlowCard from "@/components/GlowCard";
import ScrollReveal from "@/components/ScrollReveal";
import { Clock, Users, Award, Target } from "lucide-react";

const features = [
  {
    icon: Clock,
    title: "48 Hours",
    description: "Non-stop innovation sprint. Build, break, iterate, and ship a working prototype.",
  },
  {
    icon: Users,
    title: "Open to All",
    description: "Students, professionals, and enthusiasts — anyone with a passion to build can join.",
  },
  {
    icon: Award,
    title: "Prizes & Recognition",
    description: "Cash prizes, swag, mentorship opportunities, and certificates for all participants.",
  },
  {
    icon: Target,
    title: "Real Problems",
    description: "Tackle industry-relevant challenges across AI, cybersecurity, and web innovation.",
  },
];

const About = () => {
  return (
    <div className="relative z-10 min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <p className="font-heading text-xs tracking-[0.4em] text-primary/60 mb-2 text-center">SYSTEM BRIEF</p>
          <h1 className="font-heading text-3xl sm:text-5xl font-bold text-center mb-4 glow-text">
            About the Hackathon
          </h1>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-16 text-lg">
            CLH Hackathon 2026 is a premier 48-hour coding marathon that brings together the brightest minds to solve real-world challenges using cutting-edge technology.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {features.map((feature, i) => (
            <ScrollReveal key={feature.title}>
              <GlowCard className="h-full">
                <feature.icon className="text-primary mb-4" size={28} />
                <h3 className="font-heading text-lg text-foreground mb-2 tracking-wider">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
              </GlowCard>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal>
          <div className="mt-16 glass rounded-lg p-8 text-center animated-border">
            <h2 className="font-heading text-xl text-primary mb-4 glow-text-sm tracking-wider">MISSION OBJECTIVE</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Our mission is to foster innovation, collaboration, and learning. Whether you're a seasoned developer or a first-time hacker, CLH Hackathon provides the platform, mentorship, and resources to turn your ideas into reality.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
};

export default About;
