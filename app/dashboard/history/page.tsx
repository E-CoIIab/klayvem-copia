"use client";

import { motion } from "framer-motion";
import { Recycle, Gift, Calendar, TrendingUp } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function HistoryPage() {
  const [activeTab, setActiveTab] = useState<"recycling" | "redemptions">("recycling");

  const recyclingHistory = [
    {
      id: 1,
      date: "08/11/2024 14:32",
      items: [
        { name: "Garrafa PET Coca-Cola 2L", type: "Plástico", points: 50 },
        { name: "Lata Alumínio Skol", type: "Metal", points: 25 },
      ],
      totalPoints: 75,
      location: "Ponto de Coleta Shopping Center",
    },
    {
      id: 2,
      date: "05/11/2024 10:15",
      items: [
        { name: "Caixa Papelão Nestlé", type: "Papel", points: 30 },
      ],
      totalPoints: 30,
      location: "Ponto de Coleta Mercado Central",
    },
    {
      id: 3,
      date: "02/11/2024 16:45",
      items: [
        { name: "Embalagem Omo 1kg", type: "Plástico", points: 50 },
        { name: "Frasco Dove 400ml", type: "Plástico", points: 40 },
        { name: "Garrafa Vidro Heinz", type: "Vidro", points: 40 },
      ],
      totalPoints: 130,
      location: "Ponto de Coleta Praça Verde",
    },
    {
      id: 4,
      date: "28/10/2024 11:20",
      items: [
        { name: "Lata Coca-Cola 350ml", type: "Metal", points: 25 },
        { name: "Lata Skol 350ml", type: "Metal", points: 25 },
      ],
      totalPoints: 50,
      location: "Ponto de Coleta Shopping Center",
    },
  ];

  const redemptionHistory = [
    {
      id: 1,
      date: "07/11/2024 10:15",
      product: "Sabão em Pó Omo 1kg",
      brand: "Omo",
      points: 800,
      status: "Entregue",
    },
    {
      id: 2,
      date: "25/10/2024 15:30",
      product: "Shampoo Dove 400ml",
      brand: "Dove",
      points: 650,
      status: "Entregue",
    },
    {
      id: 3,
      date: "18/10/2024 09:45",
      product: "Chocolate Nestlé 170g",
      brand: "Nestlé",
      points: 450,
      status: "Entregue",
    },
  ];

  const stats = {
    totalRecycled: 45.2,
    totalPoints: 3250,
    totalRedeemed: 1900,
    co2Saved: 152,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Histórico</h1>
        <p className="text-muted-foreground">
          Acompanhe suas reciclagens e resgates
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground mb-1">Total Reciclado</p>
            <p className="text-2xl font-bold">{stats.totalRecycled} kg</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground mb-1">Pontos Ganhos</p>
            <p className="text-2xl font-bold text-green-600">+{stats.totalPoints}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground mb-1">Pontos Gastos</p>
            <p className="text-2xl font-bold text-emerald-600">-{stats.totalRedeemed}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground mb-1">CO₂ Economizado</p>
            <p className="text-2xl font-bold text-green-700">{stats.co2Saved} kg</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b">
        <Button
          variant={activeTab === "recycling" ? "default" : "ghost"}
          onClick={() => setActiveTab("recycling")}
          className="rounded-b-none"
        >
          <Recycle className="mr-2 h-4 w-4" />
          Reciclagens
        </Button>
        <Button
          variant={activeTab === "redemptions" ? "default" : "ghost"}
          onClick={() => setActiveTab("redemptions")}
          className="rounded-b-none"
        >
          <Gift className="mr-2 h-4 w-4" />
          Resgates
        </Button>
      </div>

      {/* Content */}
      {activeTab === "recycling" ? (
        <div className="space-y-4">
          {recyclingHistory.map((entry, index) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Recycle className="h-5 w-5 text-green-600" />
                        Reciclagem #{entry.id}
                      </CardTitle>
                      <CardDescription className="flex items-center gap-2 mt-1">
                        <Calendar className="h-3 w-3" />
                        {entry.date}
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-green-600">
                        +{entry.totalPoints}
                      </p>
                      <p className="text-xs text-muted-foreground">pontos</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-4">
                    {entry.items.map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between p-2 bg-secondary rounded-lg"
                      >
                        <div>
                          <p className="text-sm font-medium">{item.name}</p>
                          <p className="text-xs text-muted-foreground">{item.type}</p>
                        </div>
                        <p className="text-sm font-semibold text-green-600">
                          +{item.points}
                        </p>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    📍 {entry.location}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {redemptionHistory.map((redemption, index) => (
            <motion.div
              key={redemption.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex gap-4">
                      <div className="h-16 w-16 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
                        <Gift className="h-8 w-8 text-emerald-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">{redemption.product}</h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          {redemption.brand}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {redemption.date}
                          </span>
                          <span className={`px-2 py-1 rounded-full font-medium ${
                            redemption.status === "Entregue"
                              ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                              : "bg-lime-100 dark:bg-lime-900/30 text-lime-700 dark:text-lime-400"
                          }`}>
                            {redemption.status}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-emerald-600">
                        -{redemption.points}
                      </p>
                      <p className="text-xs text-muted-foreground">pontos</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

