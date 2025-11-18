"use client";

import { motion } from "framer-motion";
import { Plus, Search, Filter } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ProjectsPage() {
  const projects = [
    {
      id: 1,
      name: "Sistema de Gestão Ambiental",
      description: "Plataforma para monitoramento de indicadores ambientais",
      status: "Em andamento",
      progress: 75,
      team: 8,
      deadline: "30/12/2024",
    },
    {
      id: 2,
      name: "Plataforma de Educação",
      description: "Portal educacional sobre sustentabilidade",
      status: "Em andamento",
      progress: 60,
      team: 5,
      deadline: "15/01/2025",
    },
    {
      id: 3,
      name: "App de Reciclagem",
      description: "Aplicativo mobile para coleta seletiva",
      status: "Revisão",
      progress: 90,
      team: 6,
      deadline: "10/12/2024",
    },
    {
      id: 4,
      name: "Portal de Transparência",
      description: "Sistema de transparência de dados públicos",
      status: "Planejamento",
      progress: 30,
      team: 4,
      deadline: "28/02/2025",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Projetos</h1>
          <p className="text-muted-foreground">
            Gerencie todos os seus projetos colaborativos
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Novo Projeto
        </Button>
      </div>

      {/* Filters */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Buscar projetos..." className="pl-10" />
        </div>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          Filtros
        </Button>
      </div>

      {/* Projects Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className="hover:shadow-lg transition-shadow -pointer">
              <CardHeader>
                <CardTitle>{project.name}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Progresso</span>
                    <span className="font-medium">{project.progress}%</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div>
                    <span className="text-muted-foreground">Status: </span>
                    <span className="font-medium">{project.status}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Equipe: </span>
                    <span className="font-medium">{project.team} pessoas</span>
                  </div>
                </div>
                <div className="text-sm">
                  <span className="text-muted-foreground">Prazo: </span>
                  <span className="font-medium">{project.deadline}</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

