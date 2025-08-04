import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Music, Award, Globe } from "lucide-react";
import { Group } from "@/hooks/useGameState";
import { useState } from "react";

interface ProductionSystemProps {
  groups: Group[];
  formatMoney: (amount: number) => string;
  onProduceContent: (type: string, groupId: number) => void;
}

export const ProductionSystem = ({ 
  groups, 
  formatMoney, 
  onProduceContent 
}: ProductionSystemProps) => {
  const [selectedGroup, setSelectedGroup] = useState<number | null>(null);

  const productionTypes = [
    {
      type: 'single',
      name: 'Single',
      cost: 100000000,
      icon: Music,
      description: 'Produção rápida, menor custo, popularidade moderada'
    },
    {
      type: 'album',
      name: 'Álbum Completo',
      cost: 500000000,
      icon: Award,
      description: 'Produção longa, alto custo, grande impacto na popularidade'
    },
    {
      type: 'collab',
      name: 'Colaboração',
      cost: 200000000,
      icon: Globe,
      description: 'Colaboração com outros artistas, custo médio'
    }
  ];

  const handleProduction = (type: string) => {
    if (selectedGroup) {
      onProduceContent(type, selectedGroup);
      setSelectedGroup(null);
    }
  };

  return (
    <Card className="p-6 bg-card/90 border-border">
      <h3 className="text-xl font-semibold mb-4 text-foreground">Produção Musical</h3>
      
      {groups.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground">Nenhum grupo disponível para produção</p>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="space-y-3">
            <label className="text-sm font-medium text-foreground">Selecionar Grupo:</label>
            <Select value={selectedGroup?.toString() || ""} onValueChange={(value) => setSelectedGroup(parseInt(value))}>
              <SelectTrigger className="bg-input border-border text-foreground">
                <SelectValue placeholder="Escolha um grupo..." />
              </SelectTrigger>
              <SelectContent className="bg-card border-border">
                {groups.map((group) => (
                  <SelectItem key={group.id} value={group.id.toString()} className="text-foreground">
                    {group.name} - {group.type} (Pop: {group.popularity}%)
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {productionTypes.map(({ type, name, cost, icon: Icon, description }) => (
              <Dialog key={type}>
                <DialogTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="h-auto p-6 flex-col space-y-3 hover:shadow-glow-primary transition-all duration-300"
                    disabled={!selectedGroup}
                  >
                    <Icon className="w-8 h-8 text-primary" />
                    <div className="text-center">
                      <h4 className="font-semibold text-foreground">{name}</h4>
                      <p className="text-sm text-primary font-semibold">{formatMoney(cost)}</p>
                    </div>
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-card border-border">
                  <DialogHeader>
                    <DialogTitle className="text-foreground">Produzir {name}</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Icon className="w-6 h-6 text-primary" />
                      <div>
                        <h4 className="font-semibold text-foreground">{name}</h4>
                        <p className="text-sm text-primary font-semibold">Custo: {formatMoney(cost)}</p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{description}</p>
                    {selectedGroup && (
                      <div className="p-3 bg-muted/50 rounded-lg">
                        <p className="text-sm text-foreground">
                          Grupo selecionado: <span className="font-semibold">
                            {groups.find(g => g.id === selectedGroup)?.name}
                          </span>
                        </p>
                      </div>
                    )}
                    <Button 
                      variant="kpop" 
                      className="w-full"
                      onClick={() => handleProduction(type)}
                    >
                      Iniciar Produção
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
};