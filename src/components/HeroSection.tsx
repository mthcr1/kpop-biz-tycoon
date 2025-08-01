import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Play, Building2, Users, TrendingUp } from "lucide-react";
import heroImage from "@/assets/kpop-hero-bg.jpg";

export const HeroSection = () => {
  return (
    <div 
      className="min-h-screen relative overflow-hidden flex items-center justify-center p-4"
      style={{
        backgroundImage: `linear-gradient(rgba(37, 25, 51, 0.8), rgba(37, 25, 51, 0.9)), url(${heroImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-16 md:w-32 h-16 md:h-32 bg-gradient-primary rounded-full opacity-20 animate-float blur-xl"></div>
        <div className="absolute top-40 right-32 w-12 md:w-24 h-12 md:h-24 bg-gradient-secondary rounded-full opacity-20 animate-float blur-xl" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-32 left-32 w-14 md:w-28 h-14 md:h-28 bg-accent rounded-full opacity-20 animate-float blur-xl" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 text-center max-w-6xl mx-auto">
        {/* Main Title */}
        <div className="mb-8 animate-slide-in">
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent leading-tight">
            K-POP EMPIRE
          </h1>
          <h2 className="text-xl sm:text-2xl md:text-4xl font-semibold text-foreground mb-4">
            Idol Generation
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4">
            Construa seu império no mundo do K-Pop. Recrute trainees, forme grupos icônicos, 
            produza hits mundiais e conquiste os charts globais nesta experiência de simulação definitiva.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 px-4">
          <Button variant="kpop" size="lg" className="text-base md:text-lg px-6 md:px-8 py-3 md:py-4 w-full sm:w-auto">
            <Play className="mr-2 w-4 h-4 md:w-5 md:h-5" />
            Começar Sua Jornada
          </Button>
          <Button variant="neon" size="lg" className="text-base md:text-lg px-6 md:px-8 py-3 md:py-4 w-full sm:w-auto">
            <Building2 className="mr-2 w-4 h-4 md:w-5 md:h-5" />
            Criar Gravadora
          </Button>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto px-4">
          <Card className="p-4 md:p-6 bg-card/80 backdrop-blur-sm border-border hover:shadow-glow-primary transition-all duration-300 transform hover:scale-105">
            <div className="flex flex-col items-center text-center">
              <div className="p-3 bg-primary/20 rounded-full mb-4">
                <Users className="w-6 h-6 md:w-8 md:h-8 text-primary" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-foreground mb-2">Gestão de Artistas</h3>
              <p className="text-sm md:text-base text-muted-foreground">
                Recrute e treine os futuros ídolos do K-Pop. Desenvolva suas habilidades em vocal, dança, rap e variedades.
              </p>
            </div>
          </Card>

          <Card className="p-4 md:p-6 bg-card/80 backdrop-blur-sm border-border hover:shadow-glow-secondary transition-all duration-300 transform hover:scale-105">
            <div className="flex flex-col items-center text-center">
              <div className="p-3 bg-secondary/20 rounded-full mb-4">
                <Play className="w-6 h-6 md:w-8 md:h-8 text-secondary" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-foreground mb-2">Produção Musical</h3>
              <p className="text-sm md:text-base text-muted-foreground">
                Crie hits que dominarão os charts mundiais. Escolha gêneros, produtores e estratégias de marketing.
              </p>
            </div>
          </Card>

          <Card className="p-4 md:p-6 bg-card/80 backdrop-blur-sm border-border hover:shadow-glow-accent transition-all duration-300 transform hover:scale-105">
            <div className="flex flex-col items-center text-center">
              <div className="p-3 bg-accent/20 rounded-full mb-4">
                <TrendingUp className="w-6 h-6 md:w-8 md:h-8 text-accent" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-foreground mb-2">Império Global</h3>
              <p className="text-sm md:text-base text-muted-foreground">
                Expanda seus negócios globalmente. Gerencie subsidiárias, investimentos e conquiste mercados internacionais.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};