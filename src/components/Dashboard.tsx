import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  Headphones
} from "lucide-react";

export const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-background p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">
              K-Pop Empire
            </h1>
            <p className="text-muted-foreground">
              CEO Dashboard - StarLight Entertainment
            </p>
          </div>
          <div className="flex gap-4">
            <Button variant="kpop" size="lg">
              <Calendar className="mr-2" />
              Novo Comeback
            </Button>
            <Button variant="neon" size="lg">
              <Users className="mr-2" />
              Recrutar Trainee
            </Button>
          </div>
        </div>
        
        {/* Company Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="p-4 bg-card border-border hover:shadow-glow-primary transition-all duration-300">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/20 rounded-lg">
                <Building2 className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Valor da Empresa</p>
                <p className="text-xl font-bold text-foreground">₩15.2B</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4 bg-card border-border hover:shadow-glow-secondary transition-all duration-300">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-secondary/20 rounded-lg">
                <Users className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Artistas Ativos</p>
                <p className="text-xl font-bold text-foreground">24</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4 bg-card border-border hover:shadow-glow-accent transition-all duration-300">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-accent/20 rounded-lg">
                <TrendingUp className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Receita Mensal</p>
                <p className="text-xl font-bold text-foreground">₩2.8B</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4 bg-card border-border hover:shadow-glow-primary transition-all duration-300">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/20 rounded-lg">
                <Star className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Reputação</p>
                <p className="text-xl font-bold text-foreground">A+</p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="bg-card border-border">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="artists">Artistas</TabsTrigger>
          <TabsTrigger value="trainees">Trainees</TabsTrigger>
          <TabsTrigger value="production">Produção</TabsTrigger>
          <TabsTrigger value="finances">Finanças</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Current Groups */}
            <Card className="p-6 col-span-2 bg-card border-border">
              <h3 className="text-xl font-semibold mb-4 text-foreground">Grupos Ativos</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                      <Music className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">NOVA</h4>
                      <p className="text-sm text-muted-foreground">Girl Group • 5 membros</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className="bg-primary text-primary-foreground mb-2">Ativo</Badge>
                    <p className="text-sm text-muted-foreground">Próximo comeback: 15 dias</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-secondary rounded-lg flex items-center justify-center">
                      <Headphones className="w-6 h-6 text-secondary-foreground" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">ECLIPSE</h4>
                      <p className="text-sm text-muted-foreground">Boy Group • 7 membros</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className="bg-secondary text-secondary-foreground mb-2">Em Produção</Badge>
                    <p className="text-sm text-muted-foreground">Álbum em gravação</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Recent Achievements */}
            <Card className="p-6 bg-card border-border">
              <h3 className="text-xl font-semibold mb-4 text-foreground">Conquistas Recentes</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-primary/10 rounded-lg">
                  <Award className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium text-foreground">NOVA #1 no Melon</p>
                    <p className="text-xs text-muted-foreground">2 dias atrás</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-secondary/10 rounded-lg">
                  <Globe className="w-5 h-5 text-secondary" />
                  <div>
                    <p className="text-sm font-medium text-foreground">ECLIPSE Billboard Hot 100</p>
                    <p className="text-xs text-muted-foreground">1 semana atrás</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-accent/10 rounded-lg">
                  <DollarSign className="w-5 h-5 text-accent" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Contrato CF ₩500M</p>
                    <p className="text-xs text-muted-foreground">3 dias atrás</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Training Progress */}
          <Card className="p-6 bg-card border-border">
            <h3 className="text-xl font-semibold mb-4 text-foreground">Progresso dos Trainees</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-foreground">Kim Min-ji</span>
                  <span className="text-sm text-muted-foreground">Vocal: 87%</span>
                </div>
                <Progress value={87} className="h-2" />
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-foreground">Park Jae-hyun</span>
                  <span className="text-sm text-muted-foreground">Dança: 92%</span>
                </div>
                <Progress value={92} className="h-2" />
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-foreground">Lee Soo-young</span>
                  <span className="text-sm text-muted-foreground">Rap: 78%</span>
                </div>
                <Progress value={78} className="h-2" />
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="artists">
          <Card className="p-6 bg-card border-border">
            <h3 className="text-xl font-semibold mb-4 text-foreground">Gestão de Artistas</h3>
            <p className="text-muted-foreground">Sistema de gestão de artistas em desenvolvimento...</p>
          </Card>
        </TabsContent>

        <TabsContent value="trainees">
          <Card className="p-6 bg-card border-border">
            <h3 className="text-xl font-semibold mb-4 text-foreground">Sistema de Trainees</h3>
            <p className="text-muted-foreground">Sistema de recrutamento e treinamento em desenvolvimento...</p>
          </Card>
        </TabsContent>

        <TabsContent value="production">
          <Card className="p-6 bg-card border-border">
            <h3 className="text-xl font-semibold mb-4 text-foreground">Produção Musical</h3>
            <p className="text-muted-foreground">Sistema de produção musical em desenvolvimento...</p>
          </Card>
        </TabsContent>

        <TabsContent value="finances">
          <Card className="p-6 bg-card border-border">
            <h3 className="text-xl font-semibold mb-4 text-foreground">Gestão Financeira</h3>
            <p className="text-muted-foreground">Sistema financeiro avançado em desenvolvimento...</p>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};