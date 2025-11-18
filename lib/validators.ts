import { z } from "zod";

// Contact form schema
export const contactSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Nome deve ter pelo menos 2 caracteres" })
    .max(100, { message: "Nome muito longo" }),
  email: z.string().email({ message: "Email inválido" }),
  subject: z
    .string()
    .min(3, { message: "Assunto deve ter pelo menos 3 caracteres" })
    .max(200, { message: "Assunto muito longo" }),
  message: z
    .string()
    .min(10, { message: "Mensagem deve ter pelo menos 10 caracteres" })
    .max(2000, { message: "Mensagem muito longa" }),
});

export type ContactFormData = z.infer<typeof contactSchema>;

// Login schema
export const loginSchema = z.object({
  email: z.string().email({ message: "Email inválido" }),
  password: z
    .string()
    .min(6, { message: "Senha deve ter pelo menos 6 caracteres" }),
});

export type LoginFormData = z.infer<typeof loginSchema>;

// Newsletter schema
export const newsletterSchema = z.object({
  email: z.string().email({ message: "Email inválido" }),
});

export type NewsletterFormData = z.infer<typeof newsletterSchema>;

