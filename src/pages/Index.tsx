import { useState } from "react";
import { HeroSection } from "@/components/HeroSection";
import { Dashboard } from "@/components/Dashboard";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

const Index = () => {
  const [gameStarted, setGameStarted] = useState(false);

  if (gameStarted) {
    return <Dashboard />;
  }

  return (
    <div className="relative min-h-screen">
      <HeroSection />
      
      {/* Fixed overlay button for starting game */}
      <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
        <div className="pointer-events-auto">
          <Button 
            onClick={() => setGameStarted(true)}
            variant="kpop" 
            size="lg"
            className="text-xl px-12 py-6 shadow-2xl hover:shadow-glow-primary transform hover:scale-110 transition-all duration-300 animate-glow-pulse"
          >
            <Play className="mr-3 w-6 h-6" />
            INICIAR JOGO
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
