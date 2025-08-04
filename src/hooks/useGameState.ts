import { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

export interface Trainee {
  id: number;
  name: string;
  age: number;
  vocal: number;
  dance: number;
  rap: number;
  visual: number;
  variety: number;
  stress: number;
  potential: string;
  monthsTraining: number;
}

export interface Group {
  id: number;
  name: string;
  type: string;
  members: number;
  status: string;
  nextComeback: number;
  popularity: number;
  revenue: number;
}

export const useGameState = () => {
  const { toast } = useToast();
  
  const [companyMoney, setCompanyMoney] = useState(15200000000);
  const [trainees, setTrainees] = useState<Trainee[]>([
    { 
      id: 1, 
      name: "Kim Min-ji", 
      age: 17, 
      vocal: 87, 
      dance: 72, 
      rap: 45, 
      visual: 92, 
      variety: 68,
      stress: 25,
      potential: "A+",
      monthsTraining: 18
    },
    { 
      id: 2, 
      name: "Park Jae-hyun", 
      age: 19, 
      vocal: 65, 
      dance: 95, 
      rap: 88, 
      visual: 78, 
      variety: 82,
      stress: 40,
      potential: "S",
      monthsTraining: 24
    },
    { 
      id: 3, 
      name: "Lee Soo-young", 
      age: 16, 
      vocal: 78, 
      dance: 68, 
      rap: 92, 
      visual: 85, 
      variety: 55,
      stress: 15,
      potential: "A",
      monthsTraining: 12
    }
  ]);

  const [groups, setGroups] = useState<Group[]>([
    { 
      id: 1, 
      name: "NOVA", 
      type: "Girl Group", 
      members: 5, 
      status: "Ativo", 
      nextComeback: 15,
      popularity: 89,
      revenue: 2800000000
    },
    { 
      id: 2, 
      name: "ECLIPSE", 
      type: "Boy Group", 
      members: 7, 
      status: "Em Produção", 
      nextComeback: 45,
      popularity: 76,
      revenue: 1900000000
    }
  ]);

  const formatMoney = useCallback((amount: number) => {
    return `₩${(amount / 1000000000).toFixed(1)}B`;
  }, []);

  const trainTrainee = useCallback((traineeId: number, skill: string) => {
    if (companyMoney < 10000000) {
      toast({
        title: "Fundos Insuficientes",
        description: "Você precisa de ₩10M para treinar um trainee.",
        variant: "destructive"
      });
      return;
    }

    setTrainees(prev => prev.map(trainee => {
      if (trainee.id === traineeId) {
        const skillBoost = Math.floor(Math.random() * 5) + 2; // 2-6 pontos
        const stressIncrease = Math.floor(Math.random() * 10) + 5; // 5-14 pontos
        const newTrainee = { ...trainee };
        
        // Aumenta o skill específico
        switch (skill) {
          case 'vocal':
            newTrainee.vocal = Math.min(100, newTrainee.vocal + skillBoost);
            break;
          case 'dance':
            newTrainee.dance = Math.min(100, newTrainee.dance + skillBoost);
            break;
          case 'rap':
            newTrainee.rap = Math.min(100, newTrainee.rap + skillBoost);
            break;
          case 'visual':
            newTrainee.visual = Math.min(100, newTrainee.visual + skillBoost);
            break;
          case 'variety':
            newTrainee.variety = Math.min(100, newTrainee.variety + skillBoost);
            break;
        }
        
        newTrainee.stress = Math.min(100, newTrainee.stress + stressIncrease);
        newTrainee.monthsTraining += 1;
        
        return newTrainee;
      }
      return trainee;
    }));

    setCompanyMoney(prev => prev - 10000000);
    
    toast({
      title: "Treinamento Concluído",
      description: `Trainee treinou ${skill} e ganhou +${Math.floor(Math.random() * 5) + 2} pontos!`,
    });
  }, [companyMoney, toast]);

  const restTrainee = useCallback((traineeId: number) => {
    if (companyMoney < 5000000) {
      toast({
        title: "Fundos Insuficientes",
        description: "Você precisa de ₩5M para dar descanso a um trainee.",
        variant: "destructive"
      });
      return;
    }

    setTrainees(prev => prev.map(trainee => {
      if (trainee.id === traineeId) {
        const stressReduction = Math.floor(Math.random() * 20) + 15; // 15-34 pontos
        return {
          ...trainee,
          stress: Math.max(0, trainee.stress - stressReduction)
        };
      }
      return trainee;
    }));

    setCompanyMoney(prev => prev - 5000000);
    
    toast({
      title: "Descanso Concedido",
      description: "O trainee se sente mais descansado e motivado!",
    });
  }, [companyMoney, toast]);

  const recruitTrainee = useCallback((name: string) => {
    if (companyMoney < 50000000) {
      toast({
        title: "Fundos Insuficientes",
        description: "Você precisa de ₩50M para recrutar um novo trainee.",
        variant: "destructive"
      });
      return false;
    }

    const newTrainee: Trainee = {
      id: Date.now(),
      name: name.trim(),
      age: Math.floor(Math.random() * 5) + 16, // 16-20 anos
      vocal: Math.floor(Math.random() * 40) + 30, // 30-69
      dance: Math.floor(Math.random() * 40) + 30,
      rap: Math.floor(Math.random() * 40) + 30,
      visual: Math.floor(Math.random() * 40) + 30,
      variety: Math.floor(Math.random() * 40) + 30,
      stress: Math.floor(Math.random() * 20) + 10, // 10-29
      potential: ['B', 'B+', 'A', 'A+', 'S'][Math.floor(Math.random() * 5)],
      monthsTraining: 0
    };

    setTrainees(prev => [...prev, newTrainee]);
    setCompanyMoney(prev => prev - 50000000);
    
    toast({
      title: "Trainee Recrutado",
      description: `${name} foi adicionado(a) ao seu programa de trainees!`,
    });
    
    return true;
  }, [companyMoney, toast]);

  const produceContent = useCallback((type: string, groupId: number) => {
    const costs = {
      'single': 100000000, // 100M
      'album': 500000000,  // 500M
      'collab': 200000000  // 200M
    };

    const cost = costs[type as keyof typeof costs];
    
    if (companyMoney < cost) {
      toast({
        title: "Fundos Insuficientes",
        description: `Você precisa de ${formatMoney(cost)} para produzir este conteúdo.`,
        variant: "destructive"
      });
      return;
    }

    const revenueMultiplier = {
      'single': 1.5,
      'album': 3.0,
      'collab': 2.0
    };

    setGroups(prev => prev.map(group => {
      if (group.id === groupId) {
        const popularityBoost = Math.floor(Math.random() * 10) + 5;
        const newRevenue = group.revenue * revenueMultiplier[type as keyof typeof revenueMultiplier];
        
        return {
          ...group,
          popularity: Math.min(100, group.popularity + popularityBoost),
          revenue: newRevenue,
          nextComeback: type === 'album' ? 90 : 30
        };
      }
      return group;
    }));

    setCompanyMoney(prev => prev - cost);
    
    const typeNames = {
      'single': 'Single',
      'album': 'Álbum',
      'collab': 'Colaboração'
    };
    
    toast({
      title: "Produção Iniciada",
      description: `${typeNames[type as keyof typeof typeNames]} está sendo produzido! Popularidade e receita aumentaram.`,
    });
  }, [companyMoney, formatMoney, toast]);

  const handleEvent = useCallback((eventId: number, action: 'accept' | 'decline', cost?: number, reward?: number) => {
    if (action === 'accept') {
      if (cost) {
        setCompanyMoney(prev => prev - cost);
      }
      if (reward) {
        setCompanyMoney(prev => prev + reward);
        toast({
          title: "Evento Concluído",
          description: `Você ganhou ₩${(reward / 1000000).toFixed(0)}M!`,
        });
      }
    }
  }, [toast]);

  return {
    companyMoney,
    trainees,
    groups,
    formatMoney,
    trainTrainee,
    restTrainee,
    recruitTrainee,
    produceContent,
    handleEvent
  };
};