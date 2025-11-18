"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge as BadgeIcon, Trophy, Award, Star } from "lucide-react";
import { getUserBadges, calculateLevel } from "@/lib/gamification";
import { useEffect, useState } from "react";

export default function AchievementsPage() {
  const [level, setLevel] = useState(1);
  const [levelProgress, setLevelProgress] = useState(0);
  const [badges, setBadges] = useState<any[]>([]);

  useEffect(() => {
    // Mock data - em produção, buscar do backend
    const totalPoints = 2450;
    const recycleCount = 12;
    const redeemCount = 2;
    const referralCount = 1;
    const streakDays = 3;

    const levelData = calculateLevel(totalPoints);
    setLevel(levelData.level);
    setLevelProgress(levelData.progress);

    const userBadges = getUserBadges(recycleCount, redeemCount, referralCount, streakDays);
    setBadges(userBadges);
  }, []);

  const earnedBadges = badges.filter(b => b.earned);
  const lockedBadges = badges.filter(b => !b.earned);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Conquistas</h1>
        <p className="text-muted-foreground">
          Desbloqueie badges e suba de nível
        </p>
      </div>

      {/* Level Card */}
      <Card className="bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/10 border-green-200 dark:border-green-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-green-600" />
            Nível {level}
          </CardTitle>
          <CardDescription>
            Continue reciclando para subir de nível
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Progresso para o Nível {level + 1}</span>
              <span className="font-semibold">{levelProgress}%</span>
            </div>
            <Progress value={levelProgress} className="h-3" />
          </div>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Award className="h-4 w-4" />
              <span>{earnedBadges.length} badges desbloqueados</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4" />
              <span>{lockedBadges.length} badges restantes</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Earned Badges */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5" />
            Badges Conquistados ({earnedBadges.length})
          </CardTitle>
          <CardDescription>
            Parabéns pelas suas conquistas!
          </CardDescription>
        </CardHeader>
        <CardContent>
          {earnedBadges.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              Você ainda não conquistou nenhum badge. Continue reciclando!
            </p>
          ) : (
            <div className="grid md:grid-cols-3 gap-4">
              {earnedBadges.map((badge, index) => (
                <motion.div
                  key={badge.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card className="text-center p-6 bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-800">
                    <div className="text-5xl mb-3">{badge.icon}</div>
                    <h3 className="font-semibold mb-1">{badge.name}</h3>
                    <p className="text-sm text-muted-foreground">{badge.description}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Locked Badges */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BadgeIcon className="h-5 w-5" />
            Badges a Conquistar ({lockedBadges.length})
          </CardTitle>
          <CardDescription>
            Continue progredindo para desbloquear
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            {lockedBadges.map((badge, index) => (
              <motion.div
                key={badge.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="text-center p-6 opacity-60 hover:opacity-80 transition-opacity">
                  <div className="text-5xl mb-3 grayscale">{badge.icon}</div>
                  <h3 className="font-semibold mb-1">{badge.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{badge.description}</p>
                  <p className="text-xs font-semibold text-green-600">
                    🔒 Requisito: {badge.requirement}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

