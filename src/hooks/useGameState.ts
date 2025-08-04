import { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useArtistManagement } from './useArtistManagement';

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
  const {
    artists,
    groups,
    labels,
    auditioning,
    holdAudition,
    createGroup,
    trainArtist,
    produceComeback,
    getTrainees,
    getDebutReadyTrainees
  } = useArtistManagement();
  
  const [companyMoney, setCompanyMoney] = useState(15200000000);

  const formatMoney = useCallback((amount: number) => {
    return `₩${(amount / 1000000000).toFixed(1)}B`;
  }, []);

  const spendMoney = useCallback((amount: number) => {
    setCompanyMoney(prev => prev - amount);
  }, []);

  const handleAudition = useCallback(async (budget: number) => {
    return await holdAudition(budget);
  }, [holdAudition]);

  const handleTrainArtist = useCallback((artistId: number, skill: string) => {
    const cost = 10000000;
    if (companyMoney < cost) {
      toast({
        title: "Fundos Insuficientes",
        description: "Você precisa de ₩10M para treinar um artista.",
        variant: "destructive"
      });
      return;
    }

    const result = trainArtist(artistId, skill, cost);
    if (result.success) {
      setCompanyMoney(prev => prev - cost);
      toast({
        title: "Treinamento Concluído",
        description: `Artista treinou ${skill} com sucesso!`,
      });
    }
  }, [companyMoney, trainArtist, toast]);

  const handleCreateGroup = useCallback((groupData: any, cost: number) => {
    if (companyMoney < cost) {
      toast({
        title: "Fundos Insuficientes",
        description: `Você precisa de ${formatMoney(cost)} para criar um grupo.`,
        variant: "destructive"
      });
      return { success: false, cost: 0 };
    }

    return createGroup(groupData, cost);
  }, [companyMoney, createGroup, formatMoney, toast]);

  const handleProduceComeback = useCallback((groupId: number, type: 'single' | 'mini' | 'full', cost: number) => {
    if (companyMoney < cost) {
      toast({
        title: "Fundos Insuficientes",
        description: `Você precisa de ${formatMoney(cost)} para produzir este comeback.`,
        variant: "destructive"
      });
      return { success: false, cost: 0 };
    }

    return produceComeback(groupId, type, cost);
  }, [companyMoney, produceComeback, formatMoney, toast]);

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
    trainees: getTrainees(),
    groups,
    artists,
    labels,
    auditioning,
    formatMoney,
    spendMoney,
    handleAudition,
    handleTrainArtist,
    handleCreateGroup,
    handleProduceComeback,
    handleEvent,
    getDebutReadyTrainees
  };
};