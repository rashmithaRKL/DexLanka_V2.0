
import { ChevronDown } from 'lucide-react';

interface HeroSectionProps {
  title: string;
  subtitle: string;
}

const HeroSection = ({ title, subtitle }: HeroSectionProps) => {
  const scrollDown = () => {
    window.scrollTo({
      top: window.innerHeight - 100,
      behavior: 'smooth',
    });
  };

  return (
    <section className="relative min-h-[40vh] md:min-h-[50vh] flex flex-col items-center justify-center py-16 px-6 overflow-hidden dot-pattern">
      <div className="absolute inset-0 bg-gradient-to-r from-[#070b15]/70 to-[#0e1524]/70 pointer-events-none"></div>
      <div className="container mx-auto text-center relative z-10">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gradient-primary">{title}</h1>
        <p className="text-lg md:text-xl text-foreground/70 max-w-3xl mx-auto">{subtitle}</p>
      </div>
      <button
        onClick={scrollDown}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce text-foreground/50 hover:text-primary transition-colors"
      >
        <ChevronDown size={28} />
      </button>
    </section>
  );
};

export default HeroSection;
