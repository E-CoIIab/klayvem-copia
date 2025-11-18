"use client";

import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Activity, Target } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function AnalyticsPage() {
  const metrics = [
    { label: "Taxa de Crescimento", value: "+24%", trend: "up", icon: TrendingUp, color: "text-green-600" },
    { label: "Eficiência", value: "87%", trend: "up", icon: Target, color: "text-emerald-600" },
    { label: "Atividade", value: "324", trend: "up", icon: Activity, color: "text-green-700" },
    { label: "Impacto Ambiental", value: "152kg CO₂", trend: "up", icon: TrendingUp, color: "text-green-800" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Análises</h1>
        <p className="text-muted-foreground">
          Insights e métricas dos seus projetos
        </p>
      </div>

      {/* Metrics */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {metric.label}
                </CardTitle>
                <Icon className={`h-5 w-5 ${metric.color}`} />
              </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{metric.value}</div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Charts Placeholder */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Progresso Mensal</CardTitle>
            <CardDescription>Evolução dos projetos nos últimos meses</CardDescription>
          </CardHeader>
          <CardContent className="h-64 flex items-center justify-center text-muted-foreground">
            Gráfico de progresso (implementar com Chart.js ou Recharts)
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Distribuição de Recursos</CardTitle>
            <CardDescription>Alocação por área de atuação</CardDescription>
          </CardHeader>
          <CardContent className="h-64 flex items-center justify-center text-muted-foreground">
            Gráfico de pizza (implementar com Chart.js ou Recharts)
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

