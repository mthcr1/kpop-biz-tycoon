import { useState } from "react";
import { HeroSection } from "@/components/HeroSection";
import { Dashboard } from "@/components/Dashboard";

const Index = () => {
  const [gameStarted, setGameStarted] = useState(false);

  if (gameStarted) {
    return <Dashboard />;
  }

  return (
    <div className="relative">
      <HeroSection />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <button 
            onClick={() => setGameStarted(true)}
            className="opacity-0 hover:opacity-100 transition-opacity duration-300 bg-gradient-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold text-lg shadow-glow-primary hover:shadow-glow-secondary transform hover:scale-105 transition-all duration-300"
          >
            Entrar no Jogo
          </button>
        </div>
      </div>
    </div>
  );
};

export default Index;
