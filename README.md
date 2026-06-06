# Barberly — Agendamento de Barbearias

**Demo em produção:** [barberly-rose.vercel.app](https://barberly-rose.vercel.app/)  
**Código-fonte:** [github.com/nicolasandreos/Barberly](https://github.com/nicolasandreos/Barberly)

## 🗓️ Sobre o Projeto

Barberly é uma plataforma intuitiva e moderna projetada para simplificar o agendamento de serviços em barbearias. Com foco total na experiência mobile, a aplicação permite que os usuários encontrem facilmente barbearias, escolham horários e serviços específicos, e gerenciem suas reservas de forma eficiente, tudo na palma da mão.

### Problema que Resolve

No mundo agitado de hoje, agendar um serviço em uma barbearia pode ser um processo demorado e inconveniente, exigindo ligações telefônicas ou visitas presenciais. Barberly elimina essas barreiras, oferecendo uma solução digital completa que otimiza o tempo tanto dos clientes quanto dos estabelecimentos.

### Funcionalidades Principais

- **Busca e Seleção de Barbearias:** Encontre barbearias próximas ou por preferência, com informações detalhadas sobre cada estabelecimento.
- **Agendamento Flexível:** Escolha o serviço desejado, o profissional, o dia e o horário que melhor se adapta à sua agenda.
- **Gerenciamento de Reservas:** Visualize todos os seus agendamentos futuros e passados, com a opção de cancelar reservas de forma rápida e descomplicada.
- **Login Seguro com Google:** Autenticação fácil e rápida através da sua conta Google, garantindo segurança e praticidade.
- **Experiência Otimizada para Mobile:** Desenvolvido prioritariamente para oferecer uma interface fluida e responsiva em smartphones, garantindo a melhor usabilidade em qualquer lugar.

## 🚀 Tecnologias Utilizadas

Este projeto foi construído utilizando um conjunto robusto de tecnologias modernas para garantir escalabilidade, desempenho e uma excelente experiência de desenvolvimento:

- **Frontend & Backend:** [Next.js](https://nextjs.org/) - Um framework React para produção que permite renderização híbrida (SSR e SSG), proporcionando alto desempenho e SEO.
- **Banco de Dados:** [PostgreSQL](https://www.postgresql.org/) - Um sistema de gerenciamento de banco de dados relacional objeto-orientado, conhecido por sua robustez, confiabilidade e desempenho.
- **ORM:** [Prisma](https://www.prisma.io/) - Um ORM de última geração para Node.js e TypeScript que facilita a interação com o banco de dados e a manutenção do esquema.
- **Autenticação:** [NextAuth.js](https://next-auth.js.org/) com [Google OAuth](https://developers.google.com/identity/protocols/oauth2) - Solução completa de autenticação para Next.js, com suporte para múltiplos provedores e alta segurança.
- **Deployment:** [Vercel](https://vercel.com/) - Plataforma de deployment sem servidor para aplicações Next.js, oferecendo integrações contínuas, escalabilidade automática e CDN global.
- **UI:** React, Tailwind CSS e componentes Radix/shadcn — interface pensada para telas de celular.

## 🏗️ Estrutura do Projeto

A arquitetura do Barberly separa responsabilidades entre UI, acesso a dados e regras de negócio:

```
barberly/
├── app/                      # Páginas e componentes principais da aplicação (Next.js App Router)
│   ├── (auth)/               # Rotas de autenticação (ex: login, registro)
│   ├── (home)/               # Páginas relacionadas à tela inicial e navegação principal
│   ├── _components/          # Componentes reutilizáveis em toda a aplicação
│   ├── barbershops/          # Páginas e componentes específicos de barbearias
│   ├── bookings/             # Páginas e componentes de agendamentos
│   ├── _data_access/         # Consultas ao banco (barbearias, serviços, reservas)
│   ├── _actions/             # Server Actions (agendamento, disponibilidade, cancelamento)
│   └── layout.tsx            # Layout global da aplicação
├── lib/                      # Funções utilitárias, helpers e configurações globais
│   ├── auth-options.ts       # Configurações do NextAuth.js
│   ├── db.ts                 # Configuração do cliente Prisma
│   └── utils.ts              # Funções de utilidade diversas
├── prisma/                   # Arquivos de configuração e esquema do Prisma ORM
│   ├── schema.prisma         # Definição do modelo de dados do banco
│   ├── seed.ts               # Dados iniciais para desenvolvimento/demo
│   └── migrations/           # Histórico de migrações do banco de dados
├── public/                   # Arquivos estáticos (imagens, ícones, etc.)
├── next.config.ts            # Configuração do Next.js
├── package.json              # Metadados e dependências do projeto
├── tsconfig.json             # Configuração do TypeScript
└── README.md                 # Este arquivo
```

## ⚙️ Como Executar Localmente

Siga estas instruções para configurar e executar o projeto Barberly em seu ambiente de desenvolvimento local.

### Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas em sua máquina:

- **Node.js:** Versão 18 ou superior. Você pode baixá-lo em [nodejs.org](https://nodejs.org/).
- **npm** ou **Yarn:** Gerenciadores de pacotes (geralmente vêm com o Node.js).
- **PostgreSQL:** Uma instância do servidor PostgreSQL (local ou em nuvem) acessível. Você pode instalar o [PostgreSQL](https://www.postgresql.org/download/) ou usar soluções como [Docker](https://docs.docker.com/get-docker/) para executá-lo.
- **Conta Google Cloud:** Necessária para configurar as credenciais do Google OAuth para autenticação.

### Configuração do Ambiente

1.  **Clone o Repositório:**
    Abra seu terminal e clone o projeto:

    ```bash
    git clone https://github.com/nicolasandreos/Barberly.git
    cd Barberly
    ```

2.  **Instale as Dependências:**
    Navegue até o diretório do projeto e instale todas as dependências:

    ```bash
    npm install
    # ou yarn install
    ```

3.  **Configuração do PostgreSQL:**
    - Crie um novo banco de dados no seu servidor PostgreSQL, por exemplo, `barberly_db`.
    - Anote as credenciais de acesso (usuário, senha, host, porta).

4.  **Configuração do Google OAuth:**
    - Acesse o [Google Cloud Console](https://console.cloud.google.com/).
    - Crie um novo projeto (se ainda não tiver um).
    - Vá para "APIs e Serviços" > "Credenciais".
    - Crie "Credenciais OAuth" do tipo "ID do Cliente OAuth".
    - Selecione "Aplicativo da Web".
    - No campo "URIs de redirecionamento autorizados", adicione:
      - `http://localhost:3000/api/auth/callback/google` (para desenvolvimento local)
      - `https://barberly-rose.vercel.app/api/auth/callback/google` (produção na Vercel)
    - Após a criação, você receberá um **ID do Cliente** e um **Segredo do Cliente**. Guarde-os.

5.  **Variáveis de Ambiente:**
    Crie um arquivo `.env` na raiz do projeto (o Next.js também lê `.env.local`). Use exatamente estes nomes:

    ```ini
    DATABASE_URL="postgresql://USUARIO:SENHA@HOST:PORTA/NOME_DO_BANCO?schema=public"
    GOOGLE_CLIENT_ID="seu-client-id.apps.googleusercontent.com"
    GOOGLE_CLIENT_SECRET="seu-client-secret"
    NEXTAUTH_SECRET="string-longa-e-aleatoria"
    ```

    Para desenvolvimento local, defina também (recomendado):

    ```ini
    NEXTAUTH_URL="http://localhost:3000"
    ```

    Na Vercel, configure as mesmas variáveis no painel do projeto e use `NEXTAUTH_URL=https://barberly-rose.vercel.app`.

    | Variável               | Obrigatória     | Descrição                                                |
    | ---------------------- | --------------- | -------------------------------------------------------- |
    | `DATABASE_URL`         | Sim             | URL do PostgreSQL (local, Neon, Supabase, etc.).         |
    | `GOOGLE_CLIENT_ID`     | Sim             | ID OAuth 2.0 do Google Cloud.                            |
    | `GOOGLE_CLIENT_SECRET` | Sim             | Segredo do cliente OAuth.                                |
    | `NEXTAUTH_SECRET`      | Sim             | Segredo do NextAuth; gere com `openssl rand -base64 32`. |
    | `NEXTAUTH_URL`         | Sim em produção | URL pública da app (local ou Vercel).                    |

6.  **Sincronização do Banco de Dados (Prisma):**
    Com o `DATABASE_URL` válido, aplique as migrações:

    ```bash
    npx prisma migrate dev
    ```

    Isso cria/atualiza as tabelas conforme `prisma/schema.prisma`.

7.  **População inicial (seed):**
    Depois das migrações, popule barbearias, serviços e dados de demonstração:

    ```bash
    npx prisma db seed
    ```

    O seed está configurado em `package.json` (`prisma.seed`) e executa `prisma/seed-runner.ts` → `prisma/seed.ts`.

### Executando a Aplicação

Com todas as configurações no lugar, você pode iniciar o servidor de desenvolvimento:

1.  **Inicie o Servidor de Desenvolvimento:**

    ```bash
    npm run dev
    # ou yarn dev
    ```

2.  **Acesse a Aplicação:**
    Abra seu navegador e acesse `http://localhost:3000`. A aplicação estará funcionando e pronta para uso!
