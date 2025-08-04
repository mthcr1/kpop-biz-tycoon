import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Building2, 
  Users, 
  Music, 
  TrendingUp, 
  DollarSign, 
  Star,
  Award,
  Calendar,
  Globe,
  Trophy
} from "lucide-react";
import { useState } from "react";
import { useGameState } from "@/hooks/useGameState";
import { TraineeManagement } from "@/components/TraineeManagement";
import { ProductionSystem } from "@/components/ProductionSystem";
import { EventsSystem } from "@/components/EventsSystem";

export const Dashboard = () => {
  const [newTraineeName, setNewTraineeName] = useState("");
  
  const {
    companyMoney,
    trainees,
    groups,
    formatMoney,
    trainTrainee,
    restTrainee,
    recruitTrainee,
    produceContent,
    handleEvent
  } = useGameState();

  const handleRecruitment = () => {
    if (newTraineeName.trim()) {
      const success = recruitTrainee(newTraineeName);
      if (success) {
        setNewTraineeName("");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-background p-4 md:p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              K-Pop Empire
            </h1>
            <p className="text-muted-foreground">
              CEO Dashboard - StarLight Entertainment
            </p>
            <p className="text-sm text-primary font-semibold">
              Fundos: {formatMoney(companyMoney)}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <Button variant="kpop" size="lg" className="w-full sm:w-auto">
              <Calendar className="mr-2 w-4 h-4" />
              Novo Comeback
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="neon" size="lg" className="w-full sm:w-auto">
                  <Users className="mr-2 w-4 h-4" />
                  Recrutar Trainee
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-card border-border">
                <DialogHeader>
                  <DialogTitle className="text-foreground">Recrutar Novo Trainee</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="trainee-name" className="text-foreground">Nome do Trainee</Label>
                    <Input 
                      id="trainee-name"
                      value={newTraineeName}
                      onChange={(e) => setNewTraineeName(e.target.value)}
                      placeholder="Digite o nome..."
                      className="bg-input border-border text-foreground"
                    />
                  </div>
                  <Button 
                    variant="kpop" 
                    className="w-full"
                    onClick={handleRecruitment}
                  >
                    Recrutar por ₩50M
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        
        {/* Company Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          <Card className="p-4 bg-card/90 border-border hover:shadow-glow-primary transition-all duration-300 cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/20 rounded-lg">
                <Building2 className="w-4 h-4 md:w-5 md:h-5 text-primary" />
              </div>
              <div>
                <p className="text-xs md:text-sm text-muted-foreground">Valor da Empresa</p>
                <p className="text-lg md:text-xl font-bold text-foreground">₩15.2B</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4 bg-card/90 border-border hover:shadow-glow-secondary transition-all duration-300 cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-secondary/20 rounded-lg">
                <Users className="w-4 h-4 md:w-5 md:h-5 text-secondary" />
              </div>
              <div>
                <p className="text-xs md:text-sm text-muted-foreground">Artistas Ativos</p>
                <p className="text-lg md:text-xl font-bold text-foreground">24</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4 bg-card/90 border-border hover:shadow-glow-accent transition-all duration-300 cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-accent/20 rounded-lg">
                <TrendingUp className="w-4 h-4 md:w-5 md:h-5 text-accent" />
              </div>
              <div>
                <p className="text-xs md:text-sm text-muted-foreground">Receita Mensal</p>
                <p className="text-lg md:text-xl font-bold text-foreground">₩2.8B</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4 bg-card/90 border-border hover:shadow-glow-primary transition-all duration-300 cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/20 rounded-lg">
                <Star className="w-4 h-4 md:w-5 md:h-5 text-primary" />
              </div>
              <div>
                <p className="text-xs md:text-sm text-muted-foreground">Reputação</p>
                <p className="text-lg md:text-xl font-bold text-foreground">A+</p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="bg-card/90 border-border grid grid-cols-3 md:grid-cols-6 w-full">
          <TabsTrigger value="overview" className="text-xs md:text-sm">Visão Geral</TabsTrigger>
          <TabsTrigger value="artists" className="text-xs md:text-sm">Artistas</TabsTrigger>
          <TabsTrigger value="trainees" className="text-xs md:text-sm">Trainees</TabsTrigger>
          <TabsTrigger value="production" className="text-xs md:text-sm">Produção</TabsTrigger>
          <TabsTrigger value="events" className="text-xs md:text-sm">Eventos</TabsTrigger>
          <TabsTrigger value="finances" className="text-xs md:text-sm">Finanças</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Current Groups */}
            <Card className="p-6 col-span-2 bg-card/90 border-border">
              <h3 className="text-xl font-semibold mb-4 text-foreground">Grupos Ativos</h3>
              <div className="space-y-4">
                {groups.map((group) => (
                  <div key={group.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg hover:bg-muted/70 transition-colors cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                        <Music className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">{group.name}</h4>
                        <p className="text-sm text-muted-foreground">{group.type} • {group.members} membros</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Star className="w-3 h-3 text-yellow-500" />
                          <span className="text-xs text-muted-foreground">Popularidade: {group.popularity}%</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className={group.status === "Ativo" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}>{group.status}</Badge>
                      <p className="text-sm text-muted-foreground mt-1">
                        {group.status === "Ativo" ? `Próximo comeback: ${group.nextComeback} dias` : "Álbum em gravação"}
                      </p>
                      <p className="text-xs text-primary font-semibold">{formatMoney(group.revenue)}/mês</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Recent Achievements */}
            <Card className="p-6 bg-card/90 border-border">
              <h3 className="text-xl font-semibold mb-4 text-foreground">Conquistas Recentes</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-primary/10 rounded-lg cursor-pointer hover:bg-primary/20 transition-colors">
                  <Trophy className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium text-foreground">NOVA #1 no Melon</p>
                    <p className="text-xs text-muted-foreground">2 dias atrás • +₩500M</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-secondary/10 rounded-lg cursor-pointer hover:bg-secondary/20 transition-colors">
                  <Globe className="w-5 h-5 text-secondary" />
                  <div>
                    <p className="text-sm font-medium text-foreground">ECLIPSE Billboard Hot 100</p>
                    <p className="text-xs text-muted-foreground">1 semana atrás • +₩1.2B</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-accent/10 rounded-lg cursor-pointer hover:bg-accent/20 transition-colors">
                  <DollarSign className="w-5 h-5 text-accent" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Contrato CF Samsung</p>
                    <p className="text-xs text-muted-foreground">3 dias atrás • +₩800M</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="trainees" className="space-y-6">
          <TraineeManagement 
            trainees={trainees}
            onTrainSkill={trainTrainee}
            onRestTrainee={restTrainee}
          />
        </TabsContent>

        <TabsContent value="artists">
          <Card className="p-6 bg-card/90 border-border">
            <h3 className="text-xl font-semibold mb-4 text-foreground">Gestão de Artistas</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {groups.map((group) => (
                <Card key={group.id} className="p-4 bg-muted/30 border-border hover:shadow-glow-secondary transition-all duration-300 cursor-pointer">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-lg font-semibold text-foreground">{group.name}</h4>
                      <Badge className={group.status === "Ativo" ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"}>
                        {group.status}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Popularidade</span>
                        <span className="text-sm font-semibold text-foreground">{group.popularity}%</span>
                      </div>
                      <Progress value={group.popularity} className="h-2" />
                      
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Receita Mensal</span>
                        <span className="text-sm font-semibold text-primary">{formatMoney(group.revenue)}</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button variant="kpop" size="sm" className="flex-1">
                        Novo Single
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        Fanmeeting
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="production">
          <ProductionSystem 
            groups={groups}
            formatMoney={formatMoney}
            onProduceContent={produceContent}
          />
        </TabsContent>

        <TabsContent value="events">
          <EventsSystem 
            companyMoney={companyMoney}
            groups={groups}
            trainees={trainees}
            onEventAction={handleEvent}
          />
        </TabsContent>

        <TabsContent value="finances">
          <Card className="p-6 bg-card/90 border-border">
            <h3 className="text-xl font-semibold mb-4 text-foreground">Gestão Financeira</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="p-4 bg-green-500/10 border-green-500/20">
                <div className="text-center">
                  <p className="text-sm text-green-400">Receita Total</p>
                  <p className="text-xl font-bold text-green-400">₩4.7B</p>
                </div>
              </Card>
              <Card className="p-4 bg-red-500/10 border-red-500/20">
                <div className="text-center">
                  <p className="text-sm text-red-400">Despesas</p>
                  <p className="text-xl font-bold text-red-400">₩1.9B</p>
                </div>
              </Card>
              <Card className="p-4 bg-blue-500/10 border-blue-500/20">
                <div className="text-center">
                  <p className="text-sm text-blue-400">Lucro Líquido</p>
                  <p className="text-xl font-bold text-blue-400">₩2.8B</p>
                </div>
              </Card>
              <Card className="p-4 bg-purple-500/10 border-purple-500/20">
                <div className="text-center">
                  <p className="text-sm text-purple-400">Investimentos</p>
                  <p className="text-xl font-bold text-purple-400">₩800M</p>
                </div>
              </Card>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};