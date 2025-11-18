<div align="center">
  <img src="./public/main-logo.png" alt="eCollab Logo" width="120">
  <h1>eCollab</h1>
  <p><strong>Logística Reversa Inteligente</strong></p>
  <p>Recicle, Ganhe Pontos, Resgate Produtos</p>
</div>

<br />

## 🌱 Sobre o Projeto

**eCollab** é uma plataforma inovadora de logística reversa que conecta consumidores, empresas e o meio ambiente em um ciclo sustentável de recompensas.

### Como Funciona

1. **🛒 Compre** - Adquira produtos de marcas parceiras
2. **♻️ Recicle** - Leve as embalagens aos pontos de coleta
3. **🎁 Ganhe Pontos** - Acumule pontos a cada reciclagem
4. **🎉 Resgate** - Troque seus pontos por produtos grátis

## 🚀 Tecnologias

- **[Next.js 15](https://nextjs.org/)** - App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Tipagem estática
- **[Tailwind CSS](https://tailwindcss.com/)** - Estilização
- **[shadcn/ui](https://ui.shadcn.com/)** - Componentes UI
- **[Framer Motion](https://www.framer.com/motion/)** - Animações
- **[Lucide Icons](https://lucide.dev/)** - Ícones
- **[next-themes](https://github.com/pacocoursey/next-themes)** - Dark Mode


## 📦 Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/ecollab.git

# Entre na pasta
cd ecollab

# Instale as dependências
npm install

# Rode o projeto
npm run dev
```

## 🎨 Features

### Core Features:
- ✅ **Dashboard Completo** - Visualize seus pontos e histórico
- ✅ **Sistema de Pontos** - Ganhe ao reciclar, gaste ao resgatar
- ✅ **Loja de Recompensas** - Catálogo de produtos para resgate
- ✅ **Pontos de Coleta** - Busca por CEP via ViaCEP API
- ✅ **Histórico Detalhado** - Acompanhe reciclagens e resgates
- ✅ **Dark Mode** - Tema escuro persistente
- ✅ **Responsivo** - Funciona perfeitamente em mobile e desktop
- ✅ **Acessível** - WCAG AA compliant
- ✅ **i18n** - Suporte a PT-BR e EN

## 📱 Estrutura do Projeto

```
ecollab/
├── app/
│   ├── (marketing)/      # Páginas públicas
│   │   ├── page.tsx      # Home
│   │   ├── about/        # Sobre
│   │   ├── contact/      # Contato
│   │   ├── login/        # Login (integrado com API)
│   │   └── register/     # Criar conta (validação completa)
│   │
│   └── dashboard/        # Área autenticada
│       ├── page.tsx      # Dashboard principal
│       ├── recycle/      # Como reciclar (com QR Code)
│       ├── location/     # Pontos de coleta (busca por CEP)
│       ├── store/        # Loja de recompensas
│       ├── history/      # Histórico
│       ├── achievements/ # Badges e conquistas
│       └── referrals/    # Programa de indicação
│
├── components/           # Componentes reutilizáveis
├── content/             # Traduções (PT/EN)
├── hooks/               # Hooks customizados
└── styles/              # Estilos globais e tema
```

---

## 🎯 Roadmap (proximas funcionalidades)

- [x] ✅ Integração com API de CEP real (ViaCEP)
- [x] ✅ Sistema de autenticação completo
- [x] ✅ QR Code para identificação nos pontos de coleta
- [x] ✅ Notificações push (toast notifications)
- [x] ✅ Gamificação (badges, conquistas)
- [x] ✅ Programa de indicação de amigos

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

<div align="center">
  <p>Feito com 💚 para um planeta mais sustentável</p>
  <p><strong>eCollab</strong> - Inovação e Sustentabilidade</p>
</div>

