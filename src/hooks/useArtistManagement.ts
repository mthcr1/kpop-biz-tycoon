import { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

export interface Artist {
  id: number;
  name: string;
  age: number;
  position: string;
  vocal: number;
  dance: number;
  rap: number;
  visual: number;
  variety: number;
  popularity: number;
  groupId?: number;
  isTrainee: boolean;
  debutReady: boolean;
  monthsTraining: number;
  stress: number;
  potential: string;
}

export interface Group {
  id: number;
  name: string;
  type: 'Boy Group' | 'Girl Group' | 'Co-ed';
  concept: string;
  members: Artist[];
  status: 'Ativo' | 'Em Produção' | 'Hiatus' | 'Pre-Debut';
  popularity: number;
  revenue: number;
  nextComeback: number;
  debutDate?: string;
  totalSales: number;
}

export interface Label {
  id: number;
  name: string;
  reputation: number;
  specialties: string[];
  groups: Group[];
  monthlyCost: number;
  benefits: string[];
}

export const useArtistManagement = () => {
  const { toast } = useToast();
  
  const [artists, setArtists] = useState<Artist[]>([
    {
      id: 1,
      name: "Kim Min-ji",
      age: 17,
      position: "Main Vocal",
      vocal: 87,
      dance: 72,
      rap: 45,
      visual: 92,
      variety: 68,
      popularity: 15,
      isTrainee: true,
      debutReady: false,
      monthsTraining: 18,
      stress: 25,
      potential: "A+"
    },
    {
      id: 2,
      name: "Park Jae-hyun",
      age: 19,
      position: "Main Dancer",
      vocal: 65,
      dance: 95,
      rap: 88,
      visual: 78,
      variety: 82,
      popularity: 20,
      isTrainee: true,
      debutReady: true,
      monthsTraining: 24,
      stress: 40,
      potential: "S"
    }
  ]);

  const [groups, setGroups] = useState<Group[]>([
    {
      id: 1,
      name: "NOVA",
      type: "Girl Group",
      concept: "Teen Crush",
      members: [],
      status: "Ativo",
      popularity: 89,
      revenue: 2800000000,
      nextComeback: 15,
      debutDate: "2022-03-15",
      totalSales: 1500000
    }
  ]);

  const [labels, setLabels] = useState<Label[]>([
    {
      id: 1,
      name: "YG Entertainment",
      reputation: 95,
      specialties: ["Hip-Hop", "Swag Concept"],
      groups: [],
      monthlyCost: 500000000,
      benefits: ["Global Marketing", "Premium Production"]
    },
    {
      id: 2,
      name: "SM Entertainment",
      reputation: 98,
      specialties: ["Vocals", "Performance"],
      groups: [],
      monthlyCost: 600000000,
      benefits: ["Vocal Training", "International Connections"]
    }
  ]);

  const [auditioning, setAuditioning] = useState(false);

  const holdAudition = useCallback(async (budget: number) => {
    if (budget < 50000000) {
      toast({
        title: "Budget Insuficiente",
        description: "Você precisa de pelo menos ₩50M para realizar uma audição.",
        variant: "destructive"
      });
      return { success: false, cost: 0 };
    }

    setAuditioning(true);
    
    // Simula processo de audição
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const numCandidates = Math.floor(budget / 50000000); // 1 candidato por 50M
    const newArtists: Artist[] = [];
    
    const koreanNames = {
      male: ["Kim Tae-hyun", "Lee Min-ho", "Park Ji-sung", "Choi Woo-jin", "Jung Hae-in"],
      female: ["Song Ha-young", "Kim So-eun", "Lee Yu-jin", "Park Chae-young", "Jung Eun-bi"]
    };
    
    const positions = ["Main Vocal", "Lead Vocal", "Main Dancer", "Lead Dancer", "Main Rapper", "Lead Rapper", "Visual", "Maknae"];
    
    for (let i = 0; i < Math.min(numCandidates, 3); i++) {
      const isFemale = Math.random() > 0.5;
      const namePool = isFemale ? koreanNames.female : koreanNames.male;
      const name = namePool[Math.floor(Math.random() * namePool.length)];
      
      const baseStats = 30 + Math.floor(Math.random() * 40); // 30-69
      const talent = Math.random() > 0.7 ? 20 : 0; // 30% chance de talento extra
      
      newArtists.push({
        id: Date.now() + i,
        name,
        age: 16 + Math.floor(Math.random() * 6), // 16-21
        position: positions[Math.floor(Math.random() * positions.length)],
        vocal: Math.min(100, baseStats + Math.floor(Math.random() * 20) + talent),
        dance: Math.min(100, baseStats + Math.floor(Math.random() * 20) + talent),
        rap: Math.min(100, baseStats + Math.floor(Math.random() * 20) + talent),
        visual: Math.min(100, baseStats + Math.floor(Math.random() * 20) + talent),
        variety: Math.min(100, baseStats + Math.floor(Math.random() * 20) + talent),
        popularity: 0,
        isTrainee: true,
        debutReady: false,
        monthsTraining: 0,
        stress: Math.floor(Math.random() * 20) + 10,
        potential: ['B', 'B+', 'A', 'A+', 'S'][Math.floor(Math.random() * 5)]
      });
    }
    
    setArtists(prev => [...prev, ...newArtists]);
    setAuditioning(false);
    
    toast({
      title: "Audição Concluída",
      description: `${newArtists.length} novos trainees foram recrutados!`,
    });
    
    return { success: true, cost: budget, newArtists };
  }, [toast]);

  const createGroup = useCallback((groupData: {
    name: string;
    type: 'Boy Group' | 'Girl Group' | 'Co-ed';
    concept: string;
    memberIds: number[];
  }, cost: number) => {
    const selectedMembers = artists.filter(artist => 
      groupData.memberIds.includes(artist.id) && artist.isTrainee && artist.debutReady
    );
    
    if (selectedMembers.length < 3) {
      toast({
        title: "Membros Insuficientes",
        description: "Um grupo precisa de pelo menos 3 membros prontos para debut.",
        variant: "destructive"
      });
      return { success: false, cost: 0 };
    }
    
    const newGroup: Group = {
      id: Date.now(),
      name: groupData.name,
      type: groupData.type,
      concept: groupData.concept,
      members: selectedMembers,
      status: "Pre-Debut",
      popularity: Math.floor(selectedMembers.reduce((acc, member) => acc + member.popularity, 0) / selectedMembers.length),
      revenue: 0,
      nextComeback: 90, // 3 meses para debut
      debutDate: undefined,
      totalSales: 0
    };
    
    setGroups(prev => [...prev, newGroup]);
    
    // Atualiza artistas para não serem mais trainees
    setArtists(prev => prev.map(artist => 
      selectedMembers.some(member => member.id === artist.id)
        ? { ...artist, isTrainee: false, groupId: newGroup.id }
        : artist
    ));
    
    toast({
      title: "Grupo Criado",
      description: `${groupData.name} foi criado com sucesso! Preparando para debut...`,
    });
    
    return { success: true, cost, group: newGroup };
  }, [artists, toast]);

  const trainArtist = useCallback((artistId: number, skill: string, cost: number) => {
    setArtists(prev => prev.map(artist => {
      if (artist.id === artistId && artist.isTrainee) {
        const skillBoost = Math.floor(Math.random() * 8) + 3; // 3-10 pontos
        const stressIncrease = Math.floor(Math.random() * 15) + 5; // 5-19 pontos
        const newArtist = { ...artist };
        
        // Aumenta o skill específico
        switch (skill) {
          case 'vocal':
            newArtist.vocal = Math.min(100, newArtist.vocal + skillBoost);
            break;
          case 'dance':
            newArtist.dance = Math.min(100, newArtist.dance + skillBoost);
            break;
          case 'rap':
            newArtist.rap = Math.min(100, newArtist.rap + skillBoost);
            break;
          case 'visual':
            newArtist.visual = Math.min(100, newArtist.visual + skillBoost);
            break;
          case 'variety':
            newArtist.variety = Math.min(100, newArtist.variety + skillBoost);
            break;
        }
        
        newArtist.stress = Math.min(100, newArtist.stress + stressIncrease);
        newArtist.monthsTraining += 1;
        
        // Verifica se está pronto para debut (média de skills > 70 e stress < 50)
        const avgSkills = (newArtist.vocal + newArtist.dance + newArtist.rap + newArtist.visual + newArtist.variety) / 5;
        newArtist.debutReady = avgSkills > 70 && newArtist.stress < 50 && newArtist.monthsTraining >= 12;
        
        return newArtist;
      }
      return artist;
    }));
    
    return { success: true, cost };
  }, []);

  const produceComeback = useCallback((groupId: number, type: 'single' | 'mini' | 'full', cost: number) => {
    setGroups(prev => prev.map(group => {
      if (group.id === groupId) {
        const popularityBoost = {
          'single': Math.floor(Math.random() * 10) + 5,  // 5-14
          'mini': Math.floor(Math.random() * 15) + 10,   // 10-24
          'full': Math.floor(Math.random() * 25) + 15    // 15-39
        };
        
        const revenueMultiplier = {
          'single': 1.5,
          'mini': 2.5,
          'full': 4.0
        };
        
        const salesBoost = {
          'single': Math.floor(Math.random() * 100000) + 50000,
          'mini': Math.floor(Math.random() * 300000) + 150000,
          'full': Math.floor(Math.random() * 800000) + 400000
        };
        
        const newGroup = {
          ...group,
          popularity: Math.min(100, group.popularity + popularityBoost[type]),
          revenue: Math.floor(group.revenue * revenueMultiplier[type]),
          totalSales: group.totalSales + salesBoost[type],
          nextComeback: type === 'full' ? 180 : type === 'mini' ? 120 : 60,
          status: group.status === 'Pre-Debut' ? 'Ativo' : group.status,
          debutDate: group.status === 'Pre-Debut' ? new Date().toISOString().split('T')[0] : group.debutDate
        } as Group;
        
        return newGroup;
      }
      return group;
    }));
    
    const typeNames = {
      'single': 'Single',
      'mini': 'Mini Album',
      'full': 'Full Album'
    };
    
    toast({
      title: "Comeback Produzido",
      description: `${typeNames[type]} foi lançado com sucesso! Popularidade e vendas aumentaram.`,
    });
    
    return { success: true, cost };
  }, [toast]);

  const getTrainees = useCallback(() => {
    return artists.filter(artist => artist.isTrainee);
  }, [artists]);

  const getDebutReadyTrainees = useCallback(() => {
    return artists.filter(artist => artist.isTrainee && artist.debutReady);
  }, [artists]);

  return {
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
  };
};