import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Users, 
  Plus, 
  Star, 
  Calendar,
  TrendingUp,
  Music,
  Award,
  Globe
} from "lucide-react";
import { useState } from "react";

interface GroupManagementProps {
  groups: any[];
  debutReadyTrainees: any[];
  companyMoney: number;
  onCreateGroup: (groupData: any, cost: number) => { success: boolean; cost: number; group?: any };
  onProduceComeback: (groupId: number, type: string, cost: number) => { success: boolean; cost: number };
  onSpendMoney: (amount: number) => void;
  formatMoney: (amount: number) => string;
}

export const GroupManagement = ({ 
  groups, 
  debutReadyTrainees,
  companyMoney,
  onCreateGroup,
  onProduceComeback,
  onSpendMoney,
  formatMoney 
}: GroupManagementProps) => {
  const [newGroupName, setNewGroupName] = useState("");
  const [newGroupType, setNewGroupType] = useState<'Boy Group' | 'Girl Group' | 'Co-ed'>('Girl Group');
  const [newGroupConcept, setNewGroupConcept] = useState("");
  const [selectedMembers, setSelectedMembers] = useState<number[]>([]);

  const concepts = [
    "Teen Crush", "Elegant", "Cute", "Fierce", "Retro", "Experimental", 
    "Hip-Hop", "Ballad", "Dance Pop", "Rock", "R&B", "Traditional"
  ];

  const comebackTypes = [
    {
      type: 'single',
      name: 'Single',
      cost: 100000000,
      description: 'Lançamento rápido, menor impacto',
      duration: '2 meses'
    },
    {
      type: 'mini',
      name: 'Mini Album',
      cost: 300000000,
      description: 'Impacto médio, boa estratégia',
      duration: '4 meses'
    },
    {
      type: 'full',
      name: 'Full Album',
      cost: 700000000,
      description: 'Máximo impacto, grande investimento',
      duration: '6 meses'
    }
  ];

  const handleCreateGroup = () => {
    if (!newGroupName.trim() || !newGroupConcept || selectedMembers.length < 3) {
      return;
    }

    const cost = 200000000; // ₩200M para criar um grupo
    const result = onCreateGroup({
      name: newGroupName,
      type: newGroupType,
      concept: newGroupConcept,
      memberIds: selectedMembers
    }, cost);

    if (result.success) {
      onSpendMoney(cost);
      setNewGroupName("");
      setNewGroupConcept("");
      setSelectedMembers([]);
    }
  };

  const handleComeback = (groupId: number, type: string, cost: number) => {
    const result = onProduceComeback(groupId, type, cost);
    if (result.success) {
      onSpendMoney(cost);
    }
  };

  const toggleMemberSelection = (memberId: number) => {
    setSelectedMembers(prev => 
      prev.includes(memberId) 
        ? prev.filter(id => id !== memberId)
        : [...prev, memberId]
    );
  };

  return (
    <div className="space-y-6">
      {/* Criar Novo Grupo */}
      <Card className="p-6 bg-card/90 border-border">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-foreground">Criação de Grupos</h3>
          <p className="text-sm text-primary font-semibold">
            Trainees Prontos: {debutReadyTrainees.length}
          </p>
        </div>

        {debutReadyTrainees.length < 3 ? (
          <div className="text-center py-8">
            <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h4 className="text-lg font-semibold text-foreground mb-2">Sem Trainees Prontos</h4>
            <p className="text-muted-foreground">
              Você precisa de pelo menos 3 trainees prontos para debut para criar um grupo.
            </p>
          </div>
        ) : (
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="kpop" size="lg" className="w-full">
                <Plus className="w-4 h-4 mr-2" />
                Criar Novo Grupo (₩200M)
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-card border-border max-w-2xl">
              <DialogHeader>
                <DialogTitle className="text-foreground">Criar Novo Grupo</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="group-name" className="text-foreground">Nome do Grupo</Label>
                    <Input
                      id="group-name"
                      value={newGroupName}
                      onChange={(e) => setNewGroupName(e.target.value)}
                      placeholder="Ex: STELLAR"
                      className="bg-input border-border text-foreground"
                    />
                  </div>
                  <div>
                    <Label className="text-foreground">Tipo de Grupo</Label>
                    <Select value={newGroupType} onValueChange={(value: any) => setNewGroupType(value)}>
                      <SelectTrigger className="bg-input border-border text-foreground">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-card border-border">
                        <SelectItem value="Boy Group" className="text-foreground">Boy Group</SelectItem>
                        <SelectItem value="Girl Group" className="text-foreground">Girl Group</SelectItem>
                        <SelectItem value="Co-ed" className="text-foreground">Co-ed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label className="text-foreground">Conceito</Label>
                  <Select value={newGroupConcept} onValueChange={setNewGroupConcept}>
                    <SelectTrigger className="bg-input border-border text-foreground">
                      <SelectValue placeholder="Escolha um conceito..." />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border">
                      {concepts.map((concept) => (
                        <SelectItem key={concept} value={concept} className="text-foreground">
                          {concept}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-foreground">Selecionar Membros (min. 3)</Label>
                  <div className="grid grid-cols-1 gap-2 max-h-60 overflow-y-auto mt-2">
                    {debutReadyTrainees.map((trainee) => (
                      <div key={trainee.id} className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
                        <Checkbox
                          checked={selectedMembers.includes(trainee.id)}
                          onCheckedChange={() => toggleMemberSelection(trainee.id)}
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h5 className="font-medium text-foreground">{trainee.name}</h5>
                            <Badge className="bg-primary/20 text-primary">
                              {trainee.potential}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {trainee.position} • {trainee.age} anos
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Selecionados: {selectedMembers.length}/∞
                  </p>
                </div>

                <Button 
                  variant="kpop" 
                  className="w-full"
                  onClick={handleCreateGroup}
                  disabled={
                    !newGroupName.trim() || 
                    !newGroupConcept || 
                    selectedMembers.length < 3 ||
                    companyMoney < 200000000
                  }
                >
                  Criar Grupo por ₩200M
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </Card>

      {/* Grupos Existentes */}
      <Card className="p-6 bg-card/90 border-border">
        <h3 className="text-xl font-semibold mb-4 text-foreground">Grupos Ativos</h3>
        
        {groups.length === 0 ? (
          <div className="text-center py-8">
            <Music className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h4 className="text-lg font-semibold text-foreground mb-2">Nenhum Grupo</h4>
            <p className="text-muted-foreground">Crie seu primeiro grupo para começar!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {groups.map((group) => (
              <Card key={group.id} className="p-4 bg-muted/30 border-border hover:shadow-glow-secondary transition-all duration-300">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-lg font-semibold text-foreground">{group.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {group.type} • {group.concept} • {group.members?.length || 0} membros
                      </p>
                    </div>
                    <Badge className={
                      group.status === "Ativo" ? "bg-green-500/20 text-green-400" :
                      group.status === "Pre-Debut" ? "bg-yellow-500/20 text-yellow-400" :
                      "bg-blue-500/20 text-blue-400"
                    }>
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

                    {group.totalSales > 0 && (
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Vendas Totais</span>
                        <span className="text-sm font-semibold text-accent">{group.totalSales.toLocaleString()}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-xs text-muted-foreground">Opções de Comeback:</p>
                    <div className="grid grid-cols-3 gap-1">
                      {comebackTypes.map(({ type, name, cost }) => (
                        <Dialog key={type}>
                          <DialogTrigger asChild>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="text-xs p-2"
                              disabled={companyMoney < cost}
                            >
                              {name}
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="bg-card border-border">
                            <DialogHeader>
                              <DialogTitle className="text-foreground">
                                Produzir {name} - {group.name}
                              </DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div className="flex items-center gap-3">
                                <Music className="w-6 h-6 text-primary" />
                                <div>
                                  <h4 className="font-semibold text-foreground">{name}</h4>
                                  <p className="text-sm text-primary font-semibold">Custo: {formatMoney(cost)}</p>
                                </div>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {comebackTypes.find(t => t.type === type)?.description}
                              </p>
                              <Button 
                                variant="kpop" 
                                className="w-full"
                                onClick={() => handleComeback(group.id, type, cost)}
                              >
                                Iniciar Produção
                              </Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};