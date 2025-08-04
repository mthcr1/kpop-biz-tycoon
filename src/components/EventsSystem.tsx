import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Award, 
  Calendar, 
  DollarSign, 
  Star, 
  Trophy,
  TrendingUp,
  Users,
  Music
} from "lucide-react";
import { useEffect, useState } from "react";

interface GameEvent {
  id: number;
  type: 'opportunity' | 'challenge' | 'achievement';
  title: string;
  description: string;
  icon: React.ReactNode;
  reward?: number;
  cost?: number;
  requirements?: string[];
  timeLeft?: number;
}

interface EventsSystemProps {
  companyMoney: number;
  groups: any[];
  trainees: any[];
  onEventAction: (eventId: number, action: 'accept' | 'decline', cost?: number, reward?: number) => void;
}

export const EventsSystem = ({ 
  companyMoney, 
  groups, 
  trainees, 
  onEventAction 
}: EventsSystemProps) => {
  const [currentEvents, setCurrentEvents] = useState<GameEvent[]>([]);

  const generateRandomEvents = () => {
    const possibleEvents: Omit<GameEvent, 'id'>[] = [
      {
        type: 'opportunity',
        title: 'Colaboração Internacional',
        description: 'Uma gravadora americana quer colaborar com um dos seus grupos.',
        icon: <Music className="w-5 h-5 text-primary" />,
        cost: 300000000,
        reward: 800000000,
        requirements: ['Grupo com popularidade > 80%'],
        timeLeft: 7
      },
      {
        type: 'opportunity',
        title: 'Reality Show',
        description: 'Um canal de TV quer seus trainees em um reality show.',
        icon: <Users className="w-5 h-5 text-secondary" />,
        cost: 100000000,
        reward: 400000000,
        requirements: ['Mínimo 3 trainees'],
        timeLeft: 5
      },
      {
        type: 'challenge',
        title: 'Escândalo na Mídia',
        description: 'Um artista se envolveu em controvérsia. Pague para resolução rápida.',
        icon: <TrendingUp className="w-5 h-5 text-red-500" />,
        cost: 200000000,
        timeLeft: 3
      },
      {
        type: 'opportunity',
        title: 'Festival Internacional',
        description: 'Convite para se apresentar em festival renomado.',
        icon: <Star className="w-5 h-5 text-accent" />,
        cost: 150000000,
        reward: 600000000,
        requirements: ['Grupo ativo disponível'],
        timeLeft: 10
      },
      {
        type: 'achievement',
        title: 'Prêmio de Novato',
        description: 'Um dos seus grupos ganhou prêmio de melhor novato!',
        icon: <Trophy className="w-5 h-5 text-yellow-500" />,
        reward: 500000000
      }
    ];

    // Gera 1-3 eventos aleatórios
    const numEvents = Math.floor(Math.random() * 3) + 1;
    const selectedEvents = [];
    
    for (let i = 0; i < numEvents; i++) {
      const randomEvent = possibleEvents[Math.floor(Math.random() * possibleEvents.length)];
      selectedEvents.push({
        ...randomEvent,
        id: Date.now() + i
      });
    }
    
    setCurrentEvents(selectedEvents);
  };

  useEffect(() => {
    // Gera eventos iniciais
    generateRandomEvents();
    
    // Gera novos eventos a cada 30 segundos
    const interval = setInterval(generateRandomEvents, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const handleEventAction = (event: GameEvent, action: 'accept' | 'decline') => {
    onEventAction(event.id, action, event.cost, event.reward);
    
    // Remove o evento da lista
    setCurrentEvents(prev => prev.filter(e => e.id !== event.id));
  };

  const canAcceptEvent = (event: GameEvent) => {
    if (event.cost && companyMoney < event.cost) return false;
    
    if (event.requirements) {
      for (const req of event.requirements) {
        if (req.includes('popularidade > 80%')) {
          const hasHighPopGroup = groups.some(g => g.popularity > 80);
          if (!hasHighPopGroup) return false;
        }
        if (req.includes('Mínimo 3 trainees')) {
          if (trainees.length < 3) return false;
        }
        if (req.includes('Grupo ativo disponível')) {
          const hasActiveGroup = groups.some(g => g.status === 'Ativo');
          if (!hasActiveGroup) return false;
        }
      }
    }
    
    return true;
  };

  if (currentEvents.length === 0) {
    return (
      <Card className="p-6 bg-card/90 border-border">
        <div className="text-center py-8">
          <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">Nenhum Evento Ativo</h3>
          <p className="text-muted-foreground">Novos eventos aparecerão em breve...</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 bg-card/90 border-border">
      <h3 className="text-xl font-semibold mb-4 text-foreground">Eventos Ativos</h3>
      <div className="space-y-4">
        {currentEvents.map((event) => (
          <Card key={event.id} className="p-4 bg-muted/30 border-border hover:shadow-glow-primary transition-all duration-300">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3 flex-1">
                <div className="p-2 bg-primary/20 rounded-lg">
                  {event.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-semibold text-foreground">{event.title}</h4>
                    <Badge className={
                      event.type === 'opportunity' ? "bg-green-500/20 text-green-400" :
                      event.type === 'challenge' ? "bg-red-500/20 text-red-400" :
                      "bg-yellow-500/20 text-yellow-400"
                    }>
                      {event.type === 'opportunity' ? 'Oportunidade' : 
                       event.type === 'challenge' ? 'Desafio' : 'Conquista'}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{event.description}</p>
                  
                  {event.requirements && (
                    <div className="mb-3">
                      <p className="text-xs text-muted-foreground mb-1">Requisitos:</p>
                      {event.requirements.map((req, index) => (
                        <p key={index} className="text-xs text-foreground">• {req}</p>
                      ))}
                    </div>
                  )}
                  
                  <div className="flex items-center gap-4 text-sm">
                    {event.cost && (
                      <div className="flex items-center gap-1">
                        <DollarSign className="w-3 h-3 text-red-400" />
                        <span className="text-red-400">₩{(event.cost / 1000000).toFixed(0)}M</span>
                      </div>
                    )}
                    {event.reward && (
                      <div className="flex items-center gap-1">
                        <TrendingUp className="w-3 h-3 text-green-400" />
                        <span className="text-green-400">+₩{(event.reward / 1000000).toFixed(0)}M</span>
                      </div>
                    )}
                    {event.timeLeft && (
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-yellow-400" />
                        <span className="text-yellow-400">{event.timeLeft} dias</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2 ml-4">
                {event.type !== 'achievement' && (
                  <>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleEventAction(event, 'decline')}
                    >
                      Recusar
                    </Button>
                    <Button 
                      variant="kpop" 
                      size="sm"
                      onClick={() => handleEventAction(event, 'accept')}
                      disabled={!canAcceptEvent(event)}
                    >
                      {event.type === 'challenge' ? 'Resolver' : 'Aceitar'}
                    </Button>
                  </>
                )}
                {event.type === 'achievement' && (
                  <Button 
                    variant="kpop" 
                    size="sm"
                    onClick={() => handleEventAction(event, 'accept')}
                  >
                    Coletar
                  </Button>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </Card>
  );
};