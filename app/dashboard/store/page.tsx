"use client";

import { motion } from "framer-motion";
import { Gift, ShoppingCart, Filter, Search, AlertCircle, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

interface Product {
  id: number;
  name: string;
  brand: string;
  points: number;
  image: string;
  category: string;
  stock: number;
}

export default function StorePage() {
  const { toast } = useToast();
  const router = useRouter();
  const [userPoints, setUserPoints] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isRedeeming, setIsRedeeming] = useState(false);

  const products: Product[] = [
    {
      id: 1,
      name: "Sabão em Pó Omo 1kg",
      brand: "Omo",
      points: 800,
      image: "🧼",
      category: "Limpeza",
      stock: 15,
    },
    {
      id: 2,
      name: "Shampoo Dove 400ml",
      brand: "Dove",
      points: 650,
      image: "🧴",
      category: "Higiene",
      stock: 23,
    },
    {
      id: 3,
      name: "Refrigerante Coca-Cola 2L",
      brand: "Coca-Cola",
      points: 500,
      image: "🥤",
      category: "Bebidas",
      stock: 0,
    },
    {
      id: 4,
      name: "Chocolate Nestlé 170g",
      brand: "Nestlé",
      points: 450,
      image: "🍫",
      category: "Alimentos",
      stock: 30,
    },
    {
      id: 5,
      name: "Maionese Hellmann's 500g",
      brand: "Hellmann's",
      points: 550,
      image: "🥫",
      category: "Alimentos",
      stock: 12,
    },
    {
      id: 6,
      name: "Cerveja Skol 350ml (6 un)",
      brand: "Skol",
      points: 900,
      image: "🍺",
      category: "Bebidas",
      stock: 8,
    },
    {
      id: 7,
      name: "Iogurte Danone Pack 6un",
      brand: "Danone",
      points: 700,
      image: "🥛",
      category: "Alimentos",
      stock: 18,
    },
    {
      id: 8,
      name: "Desinfetante Pinho Sol 1L",
      brand: "Pinho Sol",
      points: 400,
      image: "🧹",
      category: "Limpeza",
      stock: 25,
    },
  ];

  const categories = ["Todos", "Alimentos", "Bebidas", "Limpeza", "Higiene"];
  const [selectedCategory, setSelectedCategory] = useState("Todos");

  const filteredProducts = products.filter(
    (p) => selectedCategory === "Todos" || p.category === selectedCategory
  );

  // Buscar pontos do usuário
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const parsedUser = JSON.parse(user);
      setUserPoints(parsedUser.points || 0);
    }
  }, []);

  const handleRedeemClick = (product: Product) => {
    if (product.stock === 0) {
      toast({
        title: "Produto indisponível",
        description: "Este produto está fora de estoque",
        variant: "destructive",
      });
      return;
    }

    if (userPoints < product.points) {
      toast({
        title: "Pontos insuficientes",
        description: `Você precisa de ${product.points - userPoints} pontos a mais`,
        variant: "destructive",
      });
      return;
    }

    setSelectedProduct(product);
    setIsDialogOpen(true);
  };

  const handleConfirmRedeem = async () => {
    if (!selectedProduct) return;

    setIsRedeeming(true);

    // Simular processamento
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Descontar pontos do usuário
    const newPoints = userPoints - selectedProduct.points;

    // Atualizar localStorage
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const usersJson = localStorage.getItem("ecollab_users");
    const users = usersJson ? JSON.parse(usersJson) : {};

    // Atualizar pontos do usuário
    user.points = newPoints;
    users[user.email] = {
      ...users[user.email],
      points: newPoints,
    };

    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("ecollab_users", JSON.stringify(users));

    // Atualizar estado local
    setUserPoints(newPoints);
    setIsDialogOpen(false);
    setIsRedeeming(false);

    toast({
      title: "🎉 Resgate realizado!",
      description: (
        <div className="mt-2 space-y-1">
          <p className="font-semibold">{selectedProduct.name}</p>
          <p className="text-sm">
            -{selectedProduct.points} pontos • Saldo: {newPoints} pontos
          </p>
        </div>
      ),
      duration: 5000,
    });

    // Limpar seleção
    setSelectedProduct(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Loja de Recompensas</h1>
          <p className="text-muted-foreground">
            Troque seus pontos por produtos incríveis
          </p>
        </div>
        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-900/10 border-green-200 dark:border-green-800">
          <CardContent className="pt-4 pb-4 px-6">
            <p className="text-sm text-muted-foreground mb-1">Seus Pontos</p>
            <p className="text-3xl font-bold text-green-600">{userPoints}</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <Card className={`h-full flex flex-col ${product.stock === 0 ? "opacity-60" : ""}`}>
              <CardContent className="pt-6 flex flex-col flex-1">
                <div className="text-6xl mb-4 text-center">{product.image}</div>

                <div className="flex-1 space-y-2">
                  <h3 className="font-semibold text-lg line-clamp-2">{product.name}</h3>
                  <p className="text-sm text-muted-foreground">{product.brand}</p>

                  {product.stock === 0 ? (
                    <div className="flex items-center gap-2 text-sm text-red-600 dark:text-red-400">
                      <AlertCircle className="h-4 w-4" />
                      <span>Fora de estoque</span>
                    </div>
                  ) : (
                    <p className="text-xs text-muted-foreground">
                      {product.stock} unidades disponíveis
                    </p>
                  )}
                </div>

                <div className="pt-4 mt-4 border-t space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Preço</span>
                    <span className="text-xl font-bold text-green-600">
                      {product.points} pts
                    </span>
                  </div>

                  <Button
                    className="w-full"
                    onClick={() => handleRedeemClick(product)}
                    disabled={product.stock === 0 || userPoints < product.points}
                  >
                    {product.stock === 0
                      ? "Indisponível"
                      : userPoints < product.points
                      ? "Pontos insuficientes"
                      : "Resgatar"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Gift className="h-5 w-5 text-green-600" />
              Confirmar Resgate
            </DialogTitle>
            <DialogDescription>
              Revise os detalhes antes de confirmar seu resgate
            </DialogDescription>
          </DialogHeader>

          {selectedProduct && (
            <div className="space-y-4 py-4">
              <div className="flex items-center gap-4 p-4 bg-secondary/50 rounded-lg">
                <div className="text-5xl">{selectedProduct.image}</div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{selectedProduct.name}</h3>
                  <p className="text-sm text-muted-foreground">{selectedProduct.brand}</p>
                </div>
              </div>

              <div className="space-y-3 p-4 border rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Custo:</span>
                  <span className="font-semibold text-red-600">
                    -{selectedProduct.points} pontos
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Seus pontos atuais:</span>
                  <span className="font-semibold">{userPoints} pontos</span>
                </div>
                <div className="pt-3 border-t">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">Saldo após resgate:</span>
                    <span className="font-bold text-lg text-green-600">
                      {userPoints - selectedProduct.points} pontos
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-2 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-green-700 dark:text-green-400">
                  Após confirmar, você receberá um código de resgate por email para retirar o produto em um de nossos pontos parceiros.
                </p>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDialogOpen(false)}
              disabled={isRedeeming}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleConfirmRedeem}
              disabled={isRedeeming}
              className="min-w-[120px]"
            >
              {isRedeeming ? "Processando..." : "Confirmar Resgate"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
