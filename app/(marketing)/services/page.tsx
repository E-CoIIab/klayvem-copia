"use client";

import { Section } from "@/components/Section";
import { FeatureCard } from "@/components/FeatureCard";
import { CTA } from "@/components/CTA";
import { useLanguage } from "@/hooks/use-language";
import {
  Lightbulb,
  Code,
  GraduationCap,
  Headphones,
  Rocket,
  Shield,
  Zap,
  Users,
} from "lucide-react";

export default function ServicesPage() {
  const { t } = useLanguage();

  const allServices = [
    {
      icon: Lightbulb,
      title: t.services.items[0].title,
      description: t.services.items[0].description,
    },
    {
      icon: Code,
      title: t.services.items[1].title,
      description: t.services.items[1].description,
    },
    {
      icon: GraduationCap,
      title: t.services.items[2].title,
      description: t.services.items[2].description,
    },
    {
      icon: Headphones,
      title: t.services.items[3].title,
      description: t.services.items[3].description,
    },
    {
      icon: Rocket,
      title: "Estratégia",
      description: "Planejamento estratégico para alcançar seus objetivos de negócio",
    },
    {
      icon: Shield,
      title: "Segurança",
      description: "Proteção de dados e conformidade com as melhores práticas",
    },
    {
      icon: Zap,
      title: "Otimização",
      description: "Melhoria de performance e eficiência dos seus sistemas",
    },
    {
      icon: Users,
      title: "Gestão",
      description: "Gerenciamento de projetos e equipes com metodologias ágeis",
    },
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <Section
        title={t.services.title}
        subtitle={t.services.subtitle}
        className="bg-gradient-to-b from-background to-secondary/30"
      />

      {/* Services Grid */}
      <Section>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {allServices.map((service, index) => (
            <FeatureCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              delay={index * 0.05}
            />
          ))}
        </div>
      </Section>

      {/* CTA */}
      <CTA
        title="Pronto para começar?"
        description="Entre em contato conosco e descubra como podemos ajudar seu negócio"
        primaryCta={{
          text: "Fale conosco",
          href: "/contact",
        }}
        secondaryCta={{
          text: "Ver projetos",
          href: "/about",
        }}
      />
    </div>
  );
}

