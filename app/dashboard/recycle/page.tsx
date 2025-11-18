"use client";

import { motion } from "framer-motion";
import { QrCode, MapPin, Package, Leaf } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";

export default function RecyclePage() {
  const [userId, setUserId] = useState<string>("");

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const userData = JSON.parse(user);
      setUserId(userData.id || userData.email);
    }
  }, []);
  const materials = [
    {
      name: "Plástico",
      icon: "🥤",
      points: "50 pts",
      description: "Garrafas PET, embalagens plásticas",
      examples: ["Coca-Cola 2L", "Omo embalagem", "Dove frascos"],
    },
    {
      name: "Papel/Papelão",
      icon: "📦",
      points: "30 pts",
      description: "Caixas de papelão, embalagens",
      examples: ["Caixas Nestlé", "Embalagens Danone", "Caixas Unilever"],
    },
    {
      name: "Vidro",
      icon: "🍾",
      points: "40 pts",
      description: "Garrafas e potes de vidro",
      examples: ["Heinz ketchup", "Hellmann's maionese"],
    },
    {
      name: "Metal/Alumínio",
      icon: "🥫",
      points: "25 pts",
      description: "Latas de alumínio e metal",
      examples: ["Latas Skol", "Latas Coca-Cola", "Latas Nestlé"],
    },
  ];

  const steps = [
    {
      number: "1",
      title: "Separe os Materiais",
      description: "Guarde embalagens de produtos parceiros (Omo, Coca-Cola, Nestlé, etc)",
    },
    {
      number: "2",
      title: "Encontre um Ponto de Coleta",
      description: "Use nosso mapa para localizar o ponto mais próximo",
    },
    {
      number: "3",
      title: "Apresente seu QR Code",
      description: "Mostre seu código ou informe seu CPF no ponto de coleta",
    },
    {
      number: "4",
      title: "Ganhe Pontos Automaticamente",
      description: "Os pontos são creditados na sua conta imediatamente",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Reciclar</h1>
        <p className="text-muted-foreground">
          Transforme suas embalagens em pontos e recompensas
        </p>
      </div>

      {/* QR Code Card */}
      <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-900/10 border-green-200 dark:border-green-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <QrCode className="h-5 w-5" />
            Seu QR Code
          </CardTitle>
          <CardDescription>
            Apresente este código no ponto de coleta
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4">
          {userId ? (
            <div className="bg-white p-4 rounded-lg border-4 border-green-600">
              <QRCodeSVG 
                value={`ECOLLAB:${userId}`} 
                size={180}
                level="H"
                includeMargin
                fgColor="#16a34a"
              />
            </div>
          ) : (
            <div className="h-48 w-48 bg-white rounded-lg flex items-center justify-center border-4 border-green-600">
              <QrCode className="h-32 w-32 text-green-600" />
            </div>
          )}
          <p className="text-sm text-muted-foreground">
            ID: <strong className="text-foreground font-mono">{userId || "Carregando..."}</strong>
          </p>
          <Button variant="outline" onClick={() => {
            if (navigator.share && userId) {
              navigator.share({
                title: 'Meu QR Code eCollab',
                text: `Meu ID: ${userId}`,
              }).catch(console.error);
            }
          }}>
            Compartilhar QR Code
          </Button>
        </CardContent>
      </Card>

      {/* How it Works */}
      <Card>
        <CardHeader>
          <CardTitle>Como Funciona</CardTitle>
          <CardDescription>
            Siga estes passos simples para começar a ganhar pontos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex gap-4"
              >
                <div className="h-12 w-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0 text-lg">
                  {step.number}
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Materials Accepted */}
      <Card>
        <CardHeader>
          <CardTitle>Materiais Aceitos</CardTitle>
          <CardDescription>
            Confira os tipos de materiais e quanto cada um vale em pontos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {materials.map((material, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
              >
                <Card className="hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="text-4xl">{material.icon}</div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold">{material.name}</h3>
                          <span className="text-sm font-bold text-green-600 bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded">
                            {material.points}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {material.description}
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {material.examples.map((example, i) => (
                            <span
                              key={i}
                              className="text-xs bg-secondary px-2 py-1 rounded"
                            >
                              {example}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* CTA Buttons */}
      <div className="grid md:grid-cols-2 gap-4">
        <Link href="/dashboard/location">
          <Button className="w-full h-16 text-lg" size="lg">
            <MapPin className="mr-2 h-5 w-5" />
            Encontrar Ponto de Coleta
          </Button>
        </Link>
        <Link href="/dashboard/store">
          <Button className="w-full h-16 text-lg" variant="outline" size="lg">
            <Package className="mr-2 h-5 w-5" />
            Ver Produtos para Resgate
          </Button>
        </Link>
      </div>
    </div>
  );
}

