"use client";

import { Section } from "@/components/Section";
import { useLanguage } from "@/hooks/use-language";
import { motion } from "framer-motion";
import { Lightbulb, Leaf, Users, Trophy } from "lucide-react";

export default function AboutPage() {
  const { t } = useLanguage();

  const timeline = [
    { year: "2020", event: "Fundação da empresa" },
    { year: "2021", event: "Primeiro projeto piloto" },
    { year: "2022", event: "Expansão para novos mercados" },
    { year: "2023", event: "Reconhecimento internacional" },
    { year: "2024", event: "Inovação e crescimento contínuo" },
  ];

  const values = [
    {
      icon: Lightbulb,
      title: t.about.valuesItems[0].title,
      description: t.about.valuesItems[0].description,
    },
    {
      icon: Leaf,
      title: t.about.valuesItems[1].title,
      description: t.about.valuesItems[1].description,
    },
    {
      icon: Users,
      title: t.about.valuesItems[2].title,
      description: t.about.valuesItems[2].description,
    },
    {
      icon: Trophy,
      title: t.about.valuesItems[3].title,
      description: t.about.valuesItems[3].description,
    },
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <Section
        title={t.about.title}
        subtitle={t.about.subtitle}
        className="bg-gradient-to-b from-background to-secondary/30"
      >
        <motion.div
          className="prose prose-lg dark:prose-invert mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xl text-center text-muted-foreground max-w-3xl mx-auto">
            {t.about.missionText}
          </p>
        </motion.div>
      </Section>

      {/* Values Section */}
      <Section title={t.about.values}>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <motion.div
                key={index}
                className="text-center space-y-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                  <Icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </motion.div>
            );
          })}
        </div>
      </Section>

      {/* Timeline Section */}
    </div>
  );
}

