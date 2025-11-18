import { useToast } from "@/hooks/use-toast";

export function useToastNotifications() {
  const { toast } = useToast();

  const notifyRecycleSuccess = (points: number, material: string) => {
    toast({
      title: "♻️ Reciclagem registrada!",
      description: `Você ganhou ${points} pontos ao reciclar ${material}`,
      duration: 5000,
    });
  };

  const notifyRedemptionSuccess = (product: string, points: number) => {
    toast({
      title: "🎁 Resgate realizado!",
      description: `Você resgatou ${product} por ${points} pontos`,
      duration: 5000,
    });
  };

  const notifyBadgeEarned = (badgeName: string) => {
    toast({
      title: "🏆 Nova conquista desbloqueada!",
      description: `Você ganhou o badge: ${badgeName}`,
      duration: 7000,
    });
  };

  const notifyReferralSuccess = (friendName: string, bonus: number) => {
    toast({
      title: "🤝 Amigo indicado!",
      description: `${friendName} se cadastrou! Você ganhou ${bonus} pontos de bônus`,
      duration: 6000,
    });
  };

  const notifyPointsUpdate = (points: number, action: "ganhou" | "gastou") => {
    toast({
      title: action === "ganhou" ? "💰 Pontos creditados!" : "💸 Pontos debitados",
      description: `${action === "ganhou" ? "+" : "-"}${points} pontos`,
      duration: 3000,
    });
  };

  const notifyError = (message: string) => {
    toast({
      title: "❌ Erro",
      description: message,
      variant: "destructive",
      duration: 5000,
    });
  };

  return {
    notifyRecycleSuccess,
    notifyRedemptionSuccess,
    notifyBadgeEarned,
    notifyReferralSuccess,
    notifyPointsUpdate,
    notifyError,
  };
}

