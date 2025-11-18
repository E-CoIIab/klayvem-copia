"use client";

import { Hero } from "@/components/Hero";
import { Section } from "@/components/Section";
import { FeatureCard } from "@/components/FeatureCard";
import { CTA } from "@/components/CTA";
import { useLanguage } from "@/hooks/use-language";
import { ShoppingBag, Recycle, Gift, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function HomePage() {
  const { t } = useLanguage();

  const partners = [
    { name: "Omo", logo: "🧼" },
    { name: "Coca-Cola", logo: "🥤" },
    { name: "Nestlé", logo: "🍫" },
    { name: "Dove", logo: "🧴" },
    { name: "Skol", logo: "🍺" },
    { name: "Danone", logo: "🥛" },
  ];

  return (
    <>
      <Hero />

      {/* How it Works Section */}
      <Section
        id="services"
        title={t.services.title}
        subtitle={t.services.subtitle}
        className="bg-secondary/30"
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.services.items.map((service, index) => {
            const icons = [ShoppingBag, Recycle, Gift, TrendingUp];
            return (
              <FeatureCard
                key={index}
                title={service.title}
                description={service.description}
                icon={icons[index]}
                delay={index * 0.1}
              />
            );
          })}
        </div>
      </Section>

      {/* About/Benefits Section */}
      <Section
        id="about"
        title="Todo Mundo Ganha"
        subtitle="Um sistema que beneficia consumidores, empresas e o planeta"
      >
        <div className="grid md:grid-cols-3 gap-8">
          <motion.div
            className="text-center space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="h-16 w-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto">
              <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold">Para Você</h3>
            <p className="text-muted-foreground">
              Ganhe produtos grátis reciclando. Acumule pontos e troque por itens das suas marcas favoritas.
            </p>
          </motion.div>

          <motion.div
            className="text-center space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="h-16 w-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto">
              <svg className="h-8 w-8 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold">Para Empresas</h3>
            <p className="text-muted-foreground">
              Reduza custos com matéria-prima reciclada. Aumente a fidelidade dos clientes e melhore sua imagem de marca.
            </p>
          </motion.div>

          <motion.div
            className="text-center space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="h-16 w-16 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mx-auto">
              <svg className="h-8 w-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold">Para o Planeta</h3>
            <p className="text-muted-foreground">
              Menos lixo nos aterros. Redução de emissões de CO₂. Economia circular funcionando na prática.
            </p>
          </motion.div>
        </div>
      </Section>

      {/* Partners Section */}
      <Section
        title="Marcas Parceiras"
        subtitle="Empresas comprometidas com a logística reversa"
        className="bg-secondary/30"
      >
        <div className="grid grid-cols-3 md:grid-cols-6 gap-8 max-w-4xl mx-auto">
          {partners.map((partner, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex flex-col items-center gap-2"
            >
              <div className="h-20 w-20 rounded-full bg-white dark:bg-card border border-border flex items-center justify-center text-4xl">
                {partner.logo}
              </div>
              <p className="text-sm font-medium text-center">{partner.name}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* CTA Section */}
      <CTA
        title="Pronto para Começar?"
        description="Cadastre-se agora e comece a ganhar pontos reciclando!"
        primaryCta={{
          text: "Criar Conta Grátis",
          href: "/login",
        }}
        secondaryCta={{
          text: "Ver Como Funciona",
          href: "/services",
        }}
      />
    </>
  );
}

