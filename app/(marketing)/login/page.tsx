"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/FormInput";
import { useLanguage } from "@/hooks/use-language";
import { useToast } from "@/hooks/use-toast";
import { loginSchema, LoginFormData } from "@/lib/validators";

export default function LoginPage() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof LoginFormData, string>>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof LoginFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha email e senha",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erro ao fazer login");
      }

      // Buscar usuários do localStorage
      const usersJson = localStorage.getItem("ecollab_users");
      const users = usersJson ? JSON.parse(usersJson) : {};

      const savedUser = users[data.credentials.email];

      // Validar credenciais
      if (!savedUser) {
        throw new Error("Usuário não encontrado. Crie uma conta primeiro.");
      }

      if (savedUser.password !== data.credentials.password) {
        throw new Error("Senha incorreta");
      }

      // Login bem-sucedido
      const userWithoutPassword = {
        id: savedUser.id,
        name: savedUser.name,
        email: savedUser.email,
        points: savedUser.points || 0,
      };

      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("user", JSON.stringify(userWithoutPassword));

      toast({
        title: "Login realizado!",
        description: `Bem-vindo de volta, ${savedUser.name}!`,
      });

      setTimeout(() => {
        router.push("/dashboard");
      }, 800);
    } catch (error: any) {
      toast({
        title: "Erro ao fazer login",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-secondary/20 to-background">
      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link href="/" className="flex items-center justify-center gap-2 mb-8">
          <Image 
            src="/logo.jpeg" 
            alt="eCollab Logo" 
            width={40} 
            height={40}
            className="h-10 w-10 rounded-full object-cover"
          />
          <span className="text-2xl font-bold">eCollab</span>
        </Link>

        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-3xl">{t.login.title}</CardTitle>
            <CardDescription className="text-base">
              {t.login.subtitle}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <FormInput
                label={t.login.email}
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                autoComplete="email"
                required
              />

              <FormInput
                label={t.login.password}
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
                autoComplete="current-password"
                required
              />

              <div className="flex items-center justify-between text-sm">
                <Link
                  href="#"
                  className="text-primary hover:underline"
                  onClick={(e) => {
                    e.preventDefault();
                    toast({ title: "Mock feature", description: "Esqueci senha - ainda não implementado" });
                  }}
                >
                  {t.login.forgotPassword}
                </Link>
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? t.login.loggingIn : t.login.submit}
              </Button>

              <div className="text-center text-sm text-muted-foreground">
                Não tem uma conta?{" "}
                <Link
                  href="/register"
                  className="text-primary hover:underline font-medium"
                >
                  {t.login.createAccount}
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>

        <p className="text-center text-sm text-muted-foreground mt-8">
          Crie uma conta ou use suas credenciais para acessar
        </p>
      </motion.div>
    </div>
  );
}

