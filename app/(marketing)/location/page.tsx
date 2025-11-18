"use client";

import { useState } from "react";
import { Section } from "@/components/Section";
import { useLanguage } from "@/hooks/use-language";
import { motion } from "framer-motion";
import { ExternalLink, Mail, MapPin, Phone, Search, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function LocationPage() {
  const { t } = useLanguage();
  const [cep, setCep] = useState("");
  const [searching, setSearching] = useState(false);

  // Mock de pontos de coleta
  const allLocations = [
    {
      id: 1,
      name: "Ponto de Coleta Shopping Center",
      address: "Av. Paulista, 1000 - Bela Vista",
      city: "São Paulo, SP",
      cep: "01310-100",
      distance: 1.2,
      phone: "(11) 3333-4444",
      hours: "Seg-Sex: 9h-18h | Sáb: 9h-13h",
      materials: ["Plástico", "Papel", "Metal", "Vidro"],
    },
    {
      id: 2,
      name: "Mercado Central - Coleta Sustentável",
      address: "Rua Augusta, 2500 - Consolação",
      city: "São Paulo, SP",
      cep: "01412-100",
      distance: 2.5,
      phone: "(11) 3333-5555",
      hours: "Seg-Dom: 8h-20h",
      materials: ["Plástico", "Papel", "Metal"],
    },
    {
      id: 3,
      name: "Praça Verde - Reciclagem",
      address: "Praça da República, 50 - República",
      city: "São Paulo, SP",
      cep: "01045-000",
      distance: 3.8,
      phone: "(11) 3333-6666",
      hours: "Seg-Sex: 8h-17h",
      materials: ["Plástico", "Papel", "Vidro"],
    },
    {
      id: 4,
      name: "Supermercado EcoVida",
      address: "Av. Faria Lima, 1500 - Pinheiros",
      city: "São Paulo, SP",
      cep: "05426-100",
      distance: 4.2,
      phone: "(11) 3333-7777",
      hours: "Seg-Dom: 7h-22h",
      materials: ["Plástico", "Papel", "Metal", "Vidro"],
    },
    {
      id: 5,
      name: "Centro Comunitário Verde",
      address: "Rua Consolação, 800 - Consolação",
      city: "São Paulo, SP",
      cep: "01302-000",
      distance: 5.0,
      phone: "(11) 3333-8888",
      hours: "Seg-Sex: 9h-17h",
      materials: ["Papel", "Metal"],
    },
  ];

  const [locations, setLocations] = useState(allLocations);

  const handleSearch = async () => {
    if (!cep || cep.length < 9) return;
    
    setSearching(true);
    
    try {
      // Buscar CEP na API ViaCEP
      const cleanCep = cep.replace("-", "");
      const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
      const data = await response.json();
      
      if (data.erro) {
        alert("CEP não encontrado!");
        setSearching(false);
        return;
      }
      
      // Simular cálculo de distância baseado no bairro
      // Em produção, usaria coordenadas GPS reais
      const locationsWithDistance = allLocations.map(location => ({
        ...location,
        distance: parseFloat((Math.random() * 5 + 0.5).toFixed(1)),
      })).sort((a, b) => a.distance - b.distance);
      
      setLocations(locationsWithDistance);
    } catch (error) {
      console.error("Erro ao buscar CEP:", error);
      alert("Erro ao buscar CEP. Tente novamente.");
    } finally {
      setSearching(false);
    }
  };

  const handleGetCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Em produção, usar coordenadas reais para buscar pontos próximos
          console.log("Localização:", position.coords);
          handleSearch();
        },
        (error) => {
          console.error("Erro ao obter localização:", error);
        }
      );
    }
  };

  const formatCep = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length <= 5) {
      return numbers;
    }
    return `${numbers.slice(0, 5)}-${numbers.slice(5, 8)}`;
  };

  return (
    <div className="pt-16">
      <Section
        title={t.location.title}
        subtitle={t.location.subtitle}
        className="bg-gradient-to-b from-background to-secondary/30"
      />

      <Section>
        {/* Search Box */}
        <Card className="max-w-2xl mx-auto mb-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5 text-green-600" />
              Encontrar Pontos Próximos
            </CardTitle>
            <CardDescription>
              Digite seu CEP ou use sua localização atual
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <Input
                  placeholder="Digite seu CEP (ex: 01310-100)"
                  value={cep}
                  onChange={(e) => setCep(formatCep(e.target.value))}
                  maxLength={9}
                  className="text-lg"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={handleSearch}
                  disabled={searching || cep.length < 9}
                  className="flex-1 sm:flex-none"
                >
                  {searching ? (
                    "Buscando..."
                  ) : (
                    <>
                      <Search className="mr-2 h-4 w-4" />
                      Buscar
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  onClick={handleGetCurrentLocation}
                  className="flex-1 sm:flex-none"
                  title="Usar minha localização"
                >
                  <Navigation className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">
              {locations.length} pontos encontrados
            </h3>
            {cep && (
              <p className="text-sm text-muted-foreground">
                Próximos a: {cep}
              </p>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {locations.map((location, index) => (
              <motion.div
                key={location.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-shadow h-full">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg mb-2">
                          {location.name}
                        </CardTitle>
                        <div className="flex items-center gap-2 text-sm text-green-600 font-semibold mb-2">
                          <Navigation className="h-4 w-4" />
                          {location.distance} km de distância
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Address */}
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">{location.address}</p>
                        <p className="text-sm text-muted-foreground">
                          {location.city} - CEP: {location.cep}
                        </p>
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-green-600 flex-shrink-0" />
                      <a
                        href={`tel:${location.phone}`}
                        className="text-sm hover:text-green-600 transition-colors"
                      >
                        {location.phone}
                      </a>
                    </div>

                    {/* Hours */}
                    <div className="flex items-start gap-3">
                      <svg className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-sm text-muted-foreground">
                        {location.hours}
                      </p>
                    </div>

                    {/* Materials */}
                    <div>
                      <p className="text-xs text-muted-foreground mb-2">
                        Materiais aceitos:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {location.materials.map((material, i) => (
                          <span
                            key={i}
                            className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-1 rounded-full"
                          >
                            {material}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 pt-2">
                      <Button
                        className="flex-1"
                        onClick={() =>
                          window.open(
                            `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                              location.address + ", " + location.city
                            )}`,
                            "_blank"
                          )
                        }
                      >
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Ver Rotas
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>
    </div>
  );
}
