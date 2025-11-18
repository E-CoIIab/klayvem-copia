"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function FixPointsPage() {
  const router = useRouter();

  const fixPoints = () => {
    const user = localStorage.getItem("user");
    const usersJson = localStorage.getItem("ecollab_users");

    if (user && usersJson) {
      const parsedUser = JSON.parse(user);
      const users = JSON.parse(usersJson);

      // Atualizar para 2000 pontos
      parsedUser.points = 2000;
      users[parsedUser.email].points = 2000;

      localStorage.setItem("user", JSON.stringify(parsedUser));
      localStorage.setItem("ecollab_users", JSON.stringify(users));

      alert("✅ Pontos atualizados para 2000!");
      router.push("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="max-w-md">
        <CardHeader>
          <CardTitle>🔧 Atualizar Pontos</CardTitle>
          <CardDescription>
            Clique no botão abaixo para atualizar seus pontos para 2000
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={fixPoints} className="w-full" size="lg">
            Atualizar Pontos para 2000
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

