"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Users, Gift, Copy, Check, Mail, MessageSquare } from "lucide-react";
import { useState, useEffect } from "react";
import { useToastNotifications } from "@/hooks/use-toast-notifications";

export default function ReferralsPage() {
  const [referralCode, setReferralCode] = useState("");
  const [copied, setCopied] = useState(false);
  const [referrals, setReferrals] = useState<any[]>([]);
  const { notifyReferralSuccess, notifyError } = useToastNotifications();

  useEffect(() => {
    // Buscar código de indicação do usuário
    const user = localStorage.getItem("user");
    if (user) {
      const userData = JSON.parse(user);
      const code = userData.id || userData.email.split("@")[0].toUpperCase();
      setReferralCode(code);
    }

    // Mock de indicações
    setReferrals([
      { name: "Maria Silva", email: "maria@example.com", points: 100, status: "ativo", date: "2024-11-01" },
      { name: "João Santos", email: "joao@example.com", points: 150, status: "ativo", date: "2024-10-28" },
    ]);
  }, []);

  const copyReferralLink = () => {
    const link = `${window.location.origin}/login?ref=${referralCode}`;
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareViaEmail = () => {
    const subject = "Junte-se à eCollab e ganhe pontos!";
    const body = `Oi! Estou usando a eCollab para reciclar e ganhar recompensas. Use meu código ${referralCode} para se cadastrar e ganhar 100 pontos de bônus! ${window.location.origin}/login?ref=${referralCode}`;
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const shareViaWhatsApp = () => {
    const message = `Junte-se à eCollab e ganhe pontos reciclando! 🌱♻️\n\nUse meu código: *${referralCode}*\n\nCadastre-se: ${window.location.origin}/login?ref=${referralCode}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, "_blank");
  };

  const totalPoints = referrals.reduce((sum, r) => sum + r.points, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Indique Amigos</h1>
        <p className="text-muted-foreground">
          Ganhe 100 pontos para cada amigo que se cadastrar com seu código
        </p>
      </div>

      {/* Referral Stats */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total de Indicações</p>
                <p className="text-3xl font-bold text-green-600">{referrals.length}</p>
              </div>
              <Users className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pontos Ganhos</p>
                <p className="text-3xl font-bold text-green-600">{totalPoints}</p>
              </div>
              <Gift className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Bônus Disponível</p>
                <p className="text-3xl font-bold text-green-600">200</p>
              </div>
              <Gift className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Referral Link */}
      <Card className="bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/10 border-green-200 dark:border-green-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Seu Código de Indicação
          </CardTitle>
          <CardDescription>
            Compartilhe com seus amigos e ambos ganham pontos!
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={referralCode}
              readOnly
              className="text-lg font-mono font-bold text-center"
            />
            <Button
              variant="outline"
              size="icon"
              onClick={copyReferralLink}
              className="flex-shrink-0"
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-2">
            <Button variant="outline" onClick={shareViaEmail} className="w-full">
              <Mail className="mr-2 h-4 w-4" />
              Compartilhar por Email
            </Button>
            <Button variant="outline" onClick={shareViaWhatsApp} className="w-full">
              <MessageSquare className="mr-2 h-4 w-4" />
              Compartilhar no WhatsApp
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* How it Works */}
      <Card>
        <CardHeader>
          <CardTitle>Como Funciona</CardTitle>
          <CardDescription>
            Programa de indicação simples e recompensador
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                step: "1",
                title: "Compartilhe seu código",
                description: "Envie seu código único para amigos e família",
              },
              {
                step: "2",
                title: "Eles se cadastram",
                description: "Quando se cadastrarem usando seu código, ganham 100 pontos de bônus",
              },
              {
                step: "3",
                title: "Você ganha pontos",
                description: "Você recebe 100 pontos para cada amigo que se cadastrar",
              },
              {
                step: "4",
                title: "Benefícios mútuos",
                description: "Quanto mais amigos indicar, mais pontos todos ganham!",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex gap-4"
              >
                <div className="h-10 w-10 rounded-full bg-green-600 text-white flex items-center justify-center font-bold flex-shrink-0">
                  {item.step}
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Referrals List */}
      <Card>
        <CardHeader>
          <CardTitle>Suas Indicações</CardTitle>
          <CardDescription>
            Amigos que usaram seu código de indicação
          </CardDescription>
        </CardHeader>
        <CardContent>
          {referrals.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              Você ainda não indicou ninguém. Compartilhe seu código agora!
            </p>
          ) : (
            <div className="space-y-3">
              {referrals.map((referral, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-secondary/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                      <Users className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-semibold">{referral.name}</p>
                      <p className="text-sm text-muted-foreground">{referral.email}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-green-600">+{referral.points} pts</p>
                    <p className="text-xs text-muted-foreground">{referral.date}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

