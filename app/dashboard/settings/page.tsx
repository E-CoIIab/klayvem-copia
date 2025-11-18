"use client";

import { motion } from "framer-motion";
import { User, Mail, Calendar, Award, Lock, Save } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
  const { toast } = useToast();
  const router = useRouter();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    points: 0,
    createdAt: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState("");

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const parsedUser = JSON.parse(user);
      setUserData(parsedUser);
      setEditedName(parsedUser.name);
    } else {
      router.push("/login");
    }
  }, [router]);

  const handleSave = () => {
    // Atualizar nome no localStorage
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const usersJson = localStorage.getItem("ecollab_users");
    const users = usersJson ? JSON.parse(usersJson) : {};

    // Atualizar dados do usuário
    user.name = editedName;
    users[user.email] = {
      ...users[user.email],
      name: editedName,
    };

    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("ecollab_users", JSON.stringify(users));

    setUserData({ ...userData, name: editedName });
    setIsEditing(false);

    toast({
      title: "Perfil atualizado!",
      description: "Suas informações foram salvas com sucesso.",
    });
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Perfil</h1>
        <p className="text-muted-foreground">
          Gerencie suas informações pessoais
        </p>
      </div>

      {/* Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="h-16 w-16 rounded-full bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center text-white text-2xl font-bold">
                {userData.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <CardTitle className="text-2xl">{userData.name}</CardTitle>
                <CardDescription>{userData.email}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Informações Pessoais */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <User className="h-5 w-5 text-green-600" />
                Informações Pessoais
              </h3>

              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome Completo</Label>
                  <div className="flex gap-2">
                    <Input
                      id="name"
                      value={editedName}
                      onChange={(e) => setEditedName(e.target.value)}
                      disabled={!isEditing}
                      className={!isEditing ? "bg-muted" : ""}
                    />
                    {!isEditing ? (
                      <Button
                        variant="outline"
                        onClick={() => setIsEditing(true)}
                      >
                        Editar
                      </Button>
                    ) : (
                      <Button onClick={handleSave}>
                        <Save className="h-4 w-4 mr-2" />
                        Salvar
                      </Button>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    value={userData.email}
                    disabled
                    className="bg-muted"
                  />
                  <p className="text-xs text-muted-foreground">
                    O email não pode ser alterado
                  </p>
                </div>
              </div>
            </div>

            {/* Estatísticas */}
            <div className="space-y-4 pt-6 border-t">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Award className="h-5 w-5 text-green-600" />
                Estatísticas
              </h3>

              <div className="grid md:grid-cols-2 gap-4">
                <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-900/10 border-green-200 dark:border-green-800">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Pontos Disponíveis</p>
                        <p className="text-3xl font-bold text-green-600">{userData.points}</p>
                      </div>
                      <Award className="h-8 w-8 text-green-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Membro desde</p>
                        <p className="text-lg font-semibold">{formatDate(userData.createdAt)}</p>
                      </div>
                      <Calendar className="h-8 w-8 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Segurança */}
            <div className="space-y-4 pt-6 border-t">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Lock className="h-5 w-5 text-green-600" />
                Segurança
              </h3>

              <Card className="border-dashed">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Senha</p>
                      <p className="text-sm text-muted-foreground">••••••••</p>
                    </div>
                    <Button variant="outline" disabled>
                      Alterar Senha
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-4">
                    Funcionalidade em desenvolvimento
                  </p>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
