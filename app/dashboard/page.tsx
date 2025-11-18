"use client";

import { motion } from "framer-motion";
import { Coins, Recycle, Gift, TrendingUp, FileText } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  // Buscar dados do usuário do localStorage
  const [userPoints, setUserPoints] = useState(0);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const parsedUser = JSON.parse(user);
      setUserPoints(parsedUser.points || 0);
      setUserName(parsedUser.name || "");
    }
  }, []);
  const totalRecycled = 45; // kg
  const availableRewards = 12;
  const nextReward = 550; // points needed

  const recentActivity = [
    { type: "recycle", item: "Garrafa PET Coca-Cola 2L", points: +50, date: "Hoje, 14:32" },
    { type: "redeem", item: "Sabão em Pó Omo 1kg", points: -800, date: "Ontem, 10:15" },
    { type: "recycle", item: "Caixa de Papelão Nestlé", points: +30, date: "02/11", },
    { type: "recycle", item: "Lata Alumínio Skol 350ml", points: +25, date: "01/11" },
  ];

  const featuredRewards = [
    { name: "Sabão em Pó Omo 1kg", points: 800, brand: "Omo", available: true },
    { name: "Shampoo Dove 400ml", points: 650, brand: "Dove", available: true },
    { name: "Refrigerante Coca-Cola 2L", points: 500, brand: "Coca-Cola", available: false },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">
          Bem-vindo{userName ? `, ${userName}` : ""}! Continue reciclando e acumulando pontos!
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-white/90">
                Seus Pontos
              </CardTitle>
              <Coins className="h-5 w-5 text-white/90" />
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold mb-1">{userPoints.toLocaleString()}</div>
              <p className="text-xs text-white/80">
                Faltam {nextReward} pts para próxima recompensa
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Reciclado
              </CardTitle>
              <Recycle className="h-5 w-5 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-1">{totalRecycled} kg</div>
              <p className="text-xs text-muted-foreground">
                +12 kg este mês
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Produtos Disponíveis
              </CardTitle>
              <Gift className="h-5 w-5 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-1">{availableRewards}</div>
              <p className="text-xs text-muted-foreground">
                Na loja de recompensas
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Impacto
              </CardTitle>
              <TrendingUp className="h-5 w-5 text-emerald-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-1">152kg</div>
              <p className="text-xs text-muted-foreground">
                CO₂ economizado
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Recent Activity & Featured Rewards */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Atividade Recente</CardTitle>
            <CardDescription>
              Suas últimas reciclagens e resgates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                  className="flex items-center gap-4 pb-4 last:pb-0 border-b last:border-0"
                >
                  <div className={`h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                    activity.type === 'recycle' ? 'bg-green-100 dark:bg-green-900/30' : 'bg-emerald-100 dark:bg-emerald-900/30'
                  }`}>
                    {activity.type === 'recycle' ? (
                      <Recycle className="h-5 w-5 text-green-600" />
                    ) : (
                      <Gift className="h-5 w-5 text-emerald-600" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{activity.item}</p>
                    <p className="text-xs text-muted-foreground">{activity.date}</p>
                  </div>
                  <div className={`text-sm font-semibold ${
                    activity.points > 0 ? 'text-green-600' : 'text-emerald-600'
                  }`}>
                    {activity.points > 0 ? '+' : ''}{activity.points}
                  </div>
                </motion.div>
              ))}
            </div>
            <Link href="/dashboard/history">
              <Button variant="outline" className="w-full mt-6">
                Ver Histórico Completo
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Featured Rewards */}
        <Card>
          <CardHeader>
            <CardTitle>Recompensas em Destaque</CardTitle>
            <CardDescription>
              Produtos que você pode resgatar agora
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {featuredRewards.map((reward, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                  className="flex items-center gap-4 pb-4 last:pb-0 border-b last:border-0"
                >
                  <div className="h-16 w-16 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
                    <Gift className="h-8 w-8 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{reward.name}</p>
                    <p className="text-xs text-muted-foreground">{reward.brand}</p>
                    <p className="text-sm font-semibold text-primary mt-1">
                      {reward.points} pontos
                    </p>
                  </div>
                  <Button 
                    size="sm" 
                    disabled={userPoints < reward.points || !reward.available}
                  >
                    Resgatar
                  </Button>
                </motion.div>
              ))}
            </div>
            <Link href="/dashboard/store">
              <Button className="w-full mt-6">
                Ver Loja Completa
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Ações Rápidas</CardTitle>
          <CardDescription>
            Acesse rapidamente as principais funcionalidades
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Link href="/dashboard/recycle">
              <Button variant="outline" className="h-24 flex flex-col gap-2 w-full">
                <Recycle className="h-6 w-6 text-green-600" />
                <span className="text-sm">Reciclar Agora</span>
              </Button>
            </Link>
            <Link href="/dashboard/store">
              <Button variant="outline" className="h-24 flex flex-col gap-2 w-full">
                <Gift className="h-6 w-6 text-emerald-600" />
                <span className="text-sm">Ver Loja</span>
              </Button>
            </Link>
            <Link href="/dashboard/location">
              <Button variant="outline" className="h-24 flex flex-col gap-2 w-full">
                <svg className="h-6 w-6 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-sm">Pontos de Coleta</span>
              </Button>
            </Link>
            <Link href="/dashboard/history">
              <Button variant="outline" className="h-24 flex flex-col gap-2 w-full">
                <FileText className="h-6 w-6 text-green-800" />
                <span className="text-sm">Meu Histórico</span>
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
