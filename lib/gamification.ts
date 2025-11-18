export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  requirement: number;
  type: "recycle" | "redeem" | "referral" | "streak";
  earned: boolean;
  earnedAt?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  points: number;
  progress: number;
  total: number;
  completed: boolean;
}

export const badges: Badge[] = [
  {
    id: "first-recycle",
    name: "Primeira Reciclagem",
    description: "Faça sua primeira reciclagem",
    icon: "🌱",
    requirement: 1,
    type: "recycle",
    earned: false,
  },
  {
    id: "eco-warrior",
    name: "Guerreiro Eco",
    description: "Recicle 10 vezes",
    icon: "🦸",
    requirement: 10,
    type: "recycle",
    earned: false,
  },
  {
    id: "eco-legend",
    name: "Lenda Eco",
    description: "Recicle 50 vezes",
    icon: "👑",
    requirement: 50,
    type: "recycle",
    earned: false,
  },
  {
    id: "planet-saver",
    name: "Salvador do Planeta",
    description: "Recicle 100 vezes",
    icon: "🌍",
    requirement: 100,
    type: "recycle",
    earned: false,
  },
  {
    id: "first-redemption",
    name: "Primeiro Resgate",
    description: "Resgate seu primeiro produto",
    icon: "🎁",
    requirement: 1,
    type: "redeem",
    earned: false,
  },
  {
    id: "smart-shopper",
    name: "Comprador Inteligente",
    description: "Resgate 5 produtos",
    icon: "🛍️",
    requirement: 5,
    type: "redeem",
    earned: false,
  },
  {
    id: "referral-master",
    name: "Mestre das Indicações",
    description: "Indique 3 amigos",
    icon: "🤝",
    requirement: 3,
    type: "referral",
    earned: false,
  },
  {
    id: "week-streak",
    name: "Sequência de 7 Dias",
    description: "Recicle por 7 dias consecutivos",
    icon: "🔥",
    requirement: 7,
    type: "streak",
    earned: false,
  },
];

export function checkBadgeEarned(
  badgeId: string,
  userProgress: number
): boolean {
  const badge = badges.find((b) => b.id === badgeId);
  if (!badge) return false;
  return userProgress >= badge.requirement;
}

export function getUserBadges(
  recycleCount: number,
  redeemCount: number,
  referralCount: number,
  streakDays: number
): Badge[] {
  return badges.map((badge) => {
    let progress = 0;
    let earned = false;

    switch (badge.type) {
      case "recycle":
        progress = recycleCount;
        break;
      case "redeem":
        progress = redeemCount;
        break;
      case "referral":
        progress = referralCount;
        break;
      case "streak":
        progress = streakDays;
        break;
    }

    earned = progress >= badge.requirement;

    return {
      ...badge,
      earned,
      earnedAt: earned ? new Date().toISOString() : undefined,
    };
  });
}

export function calculateLevel(totalPoints: number): {
  level: number;
  currentLevelPoints: number;
  nextLevelPoints: number;
  progress: number;
} {
  // Cada nível requer 1000 pontos
  const pointsPerLevel = 1000;
  const level = Math.floor(totalPoints / pointsPerLevel) + 1;
  const currentLevelPoints = totalPoints % pointsPerLevel;
  const nextLevelPoints = pointsPerLevel;
  const progress = (currentLevelPoints / nextLevelPoints) * 100;

  return {
    level,
    currentLevelPoints,
    nextLevelPoints,
    progress: Math.round(progress),
  };
}

