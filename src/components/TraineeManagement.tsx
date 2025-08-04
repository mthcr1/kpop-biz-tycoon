import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Mic, 
  Zap, 
  Music, 
  Eye, 
  Heart, 
  Plus,
  Coffee,
  Dumbbell
} from "lucide-react";
import { Trainee } from "@/hooks/useGameState";

interface TraineeManagementProps {
  trainees: Trainee[];
  onTrainSkill: (traineeId: number, skill: string) => void;
  onRestTrainee: (traineeId: number) => void;
}

export const TraineeManagement = ({ 
  trainees, 
  onTrainSkill, 
  onRestTrainee 
}: TraineeManagementProps) => {
  const skills = [
    { key: 'vocal', icon: Mic, color: 'text-primary' },
    { key: 'dance', icon: Zap, color: 'text-secondary' },
    { key: 'rap', icon: Music, color: 'text-accent' },
    { key: 'visual', icon: Eye, color: 'text-primary' },
    { key: 'variety', icon: Heart, color: 'text-secondary' }
  ];

  return (
    <Card className="p-6 bg-card/90 border-border">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-foreground">Sistema de Trainees</h3>
        <Button variant="kpop" size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Novo Trainee
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {trainees.map((trainee) => (
          <Card key={trainee.id} className="p-4 bg-muted/30 border-border hover:shadow-glow-primary transition-all duration-300">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-foreground">{trainee.name}</h4>
                  <p className="text-sm text-muted-foreground">{trainee.age} anos • {trainee.monthsTraining} meses</p>
                </div>
                <Badge className="bg-primary/20 text-primary border-primary/30">
                  {trainee.potential}
                </Badge>
              </div>
              
              <div className="space-y-2">
                {skills.map(({ key, icon: Icon, color }) => {
                  const value = trainee[key as keyof Omit<Trainee, 'id' | 'name' | 'age' | 'stress' | 'potential' | 'monthsTraining'>] as number;
                  return (
                    <div key={key}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Icon className={`w-3 h-3 ${color}`} />
                          <span className="text-xs text-foreground capitalize">{key}</span>
                        </div>
                        <span className="text-xs font-semibold text-foreground">{value}%</span>
                      </div>
                      <Progress value={value} className="h-1" />
                    </div>
                  );
                })}
              </div>
              
              <div className="flex items-center justify-between pt-2 border-t border-border/50">
                <div className="flex items-center gap-1">
                  <Heart className={`w-3 h-3 ${trainee.stress < 30 ? 'text-green-500' : trainee.stress < 60 ? 'text-yellow-500' : 'text-red-500'}`} />
                  <span className="text-xs text-muted-foreground">Stress: {trainee.stress}%</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="kpop" size="sm" className="flex-1">
                      <Dumbbell className="w-3 h-3 mr-1" />
                      Treinar
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-card border-border">
                    <DialogHeader>
                      <DialogTitle className="text-foreground">Treinar {trainee.name}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-3">
                      <p className="text-sm text-muted-foreground">
                        Escolha a habilidade para treinar (Custo: ₩10M)
                      </p>
                      <div className="grid grid-cols-2 gap-2">
                        {skills.map(({ key, icon: Icon, color }) => (
                          <Button
                            key={key}
                            variant="outline"
                            size="sm"
                            onClick={() => onTrainSkill(trainee.id, key)}
                            className="flex items-center gap-2"
                          >
                            <Icon className={`w-3 h-3 ${color}`} />
                            <span className="capitalize">{key}</span>
                          </Button>
                        ))}
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
                
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => onRestTrainee(trainee.id)}
                  disabled={trainee.stress < 20}
                >
                  <Coffee className="w-3 h-3 mr-1" />
                  Descanso
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </Card>
  );
};