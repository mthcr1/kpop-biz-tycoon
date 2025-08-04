import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Users, 
  Star, 
  DollarSign,
  Mic,
  Zap,
  Music,
  Eye,
  Heart,
  LoaderIcon
} from "lucide-react";
import { useState } from "react";

interface AuditionSystemProps {
  companyMoney: number;
  auditioning: boolean;
  onHoldAudition: (budget: number) => Promise<{ success: boolean; cost: number; newArtists?: any[] }>;
  onSpendMoney: (amount: number) => void;
}

export const AuditionSystem = ({ 
  companyMoney, 
  auditioning,
  onHoldAudition,
  onSpendMoney 
}: AuditionSystemProps) => {
  const [auditionBudget, setAuditionBudget] = useState(100000000);
  const [lastAuditionResults, setLastAuditionResults] = useState<any[]>([]);

  const auditionTypes = [
    {
      budget: 50000000,
      name: "Audição Local",
      description: "Busca talentos na região, menor custo mas qualidade variável",
      expectedCandidates: 1,
      qualityRange: "30-60%"
    },
    {
      budget: 150000000,
      name: "Audição Nacional",
      description: "Audição em todo o país, mais candidatos e melhor qualidade",
      expectedCandidates: 3,
      qualityRange: "40-75%"
    },
    {
      budget: 300000000,
      name: "Audição Global",
      description: "Busca internacional por talentos de elite",
      expectedCandidates: 5,
      qualityRange: "50-85%"
    }
  ];

  const handleAudition = async (budget: number) => {
    if (companyMoney < budget) return;
    
    const result = await onHoldAudition(budget);
    if (result.success) {
      setLastAuditionResults(result.newArtists || []);
      onSpendMoney(result.cost);
    }
  };

  const formatMoney = (amount: number) => {
    return `₩${(amount / 1000000).toFixed(0)}M`;
  };

  return (
    <Card className="p-6 bg-card/90 border-border">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold text-foreground">Sistema de Audições</h3>
          <p className="text-sm text-muted-foreground">Descubra novos talentos para sua empresa</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Fundos Disponíveis</p>
          <p className="text-lg font-bold text-primary">{formatMoney(companyMoney)}</p>
        </div>
      </div>

      {auditioning && (
        <Card className="p-4 bg-primary/10 border-primary/20 mb-6">
          <div className="flex items-center gap-3">
            <LoaderIcon className="w-5 h-5 text-primary animate-spin" />
            <div>
              <h4 className="font-semibold text-foreground">Audição em Andamento</h4>
              <p className="text-sm text-muted-foreground">Avaliando candidatos... Isso pode levar alguns momentos.</p>
            </div>
          </div>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {auditionTypes.map((type) => (
          <Card key={type.name} className="p-4 bg-muted/30 border-border hover:shadow-glow-primary transition-all duration-300">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-foreground">{type.name}</h4>
                <p className="text-sm text-muted-foreground">{type.description}</p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-3 h-3 text-red-400" />
                    <span className="text-xs text-foreground">Custo</span>
                  </div>
                  <span className="text-xs font-semibold text-red-400">{formatMoney(type.budget)}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="w-3 h-3 text-primary" />
                    <span className="text-xs text-foreground">Candidatos</span>
                  </div>
                  <span className="text-xs font-semibold text-foreground">~{type.expectedCandidates}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Star className="w-3 h-3 text-yellow-500" />
                    <span className="text-xs text-foreground">Qualidade</span>
                  </div>
                  <span className="text-xs font-semibold text-foreground">{type.qualityRange}</span>
                </div>
              </div>
              
              <Button 
                variant="kpop" 
                className="w-full"
                onClick={() => handleAudition(type.budget)}
                disabled={companyMoney < type.budget || auditioning}
              >
                <Search className="w-3 h-3 mr-1" />
                Realizar Audição
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Audição Customizada */}
      <Card className="p-4 bg-muted/30 border-border mb-6">
        <h4 className="font-semibold text-foreground mb-3">Audição Customizada</h4>
        <div className="flex gap-3">
          <div className="flex-1">
            <Label htmlFor="custom-budget" className="text-foreground">Budget (Mínimo: ₩50M)</Label>
            <Input
              id="custom-budget"
              type="number"
              value={auditionBudget / 1000000}
              onChange={(e) => setAuditionBudget(Math.max(50, parseInt(e.target.value) || 50) * 1000000)}
              placeholder="100"
              className="bg-input border-border text-foreground"
              min="50"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Candidatos esperados: {Math.floor(auditionBudget / 50000000)}
            </p>
          </div>
          <div className="flex items-end">
            <Button 
              variant="outline" 
              onClick={() => handleAudition(auditionBudget)}
              disabled={companyMoney < auditionBudget || auditioning}
            >
              Executar
            </Button>
          </div>
        </div>
      </Card>

      {/* Resultados da Última Audição */}
      {lastAuditionResults.length > 0 && (
        <Card className="p-4 bg-green-500/10 border-green-500/20">
          <h4 className="font-semibold text-foreground mb-3">Últimos Recrutas</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {lastAuditionResults.map((artist) => (
              <Card key={artist.id} className="p-3 bg-card/50 border-border">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h5 className="font-medium text-foreground">{artist.name}</h5>
                    <p className="text-xs text-muted-foreground">{artist.age} anos • {artist.position}</p>
                  </div>
                  <Badge className="bg-primary/20 text-primary border-primary/30">
                    {artist.potential}
                  </Badge>
                </div>
                
                <div className="space-y-1">
                  {[
                    { key: 'vocal', icon: Mic, value: artist.vocal },
                    { key: 'dance', icon: Zap, value: artist.dance },
                    { key: 'rap', icon: Music, value: artist.rap },
                    { key: 'visual', icon: Eye, value: artist.visual }
                  ].map(({ key, icon: Icon, value }) => (
                    <div key={key} className="flex items-center gap-2">
                      <Icon className="w-3 h-3 text-primary" />
                      <div className="flex-1">
                        <Progress value={value} className="h-1" />
                      </div>
                      <span className="text-xs font-semibold text-foreground w-8">{value}%</span>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </Card>
      )}
    </Card>
  );
};