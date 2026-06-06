# Barbely - Agendamento de Barbearias

## 🗓️ Sobre o Projeto

Barbely é uma plataforma intuitiva e moderna projetada para simplificar o agendamento de serviços em barbearias. Com foco total na experiência mobile, a aplicação permite que os usuários encontrem facilmente barbearias, escolham horários e serviços específicos, e gerenciem suas reservas de forma eficiente, tudo na palma da mão.

### Problema que Resolve

No mundo agitado de hoje, agendar um serviço em uma barbearia pode ser um processo demorado e inconveniente, exigindo ligações telefônicas ou visitas presenciais. Barbely elimina essas barreiras, oferecendo uma solução digital completa que otimiza o tempo tanto dos clientes quanto dos estabelecimentos.

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

## 🏗️ Estrutura do Projeto

A arquitetura do Barbely segue as melhores práticas de desenvolvimento, com uma estrutura de pastas organizada para facilitar a manutenção e a escalabilidade:

```
barberly/
├── app/                      # Páginas e componentes principais da aplicação (Next.js App Router)
│   ├── (auth)/               # Rotas de autenticação (ex: login, registro)
│   ├── (home)/               # Páginas relacionadas à tela inicial e navegação principal
│   ├── _components/          # Componentes reutilizáveis em toda a aplicação
│   ├── barbershops/          # Páginas e componentes específicos de barbearias
│   ├── bookings/             # Páginas e componentes de agendamentos
│   └── layout.tsx            # Layout global da aplicação
├── lib/                      # Funções utilitárias, helpers e configurações globais
│   ├── auth.ts               # Configurações do NextAuth.js
│   ├── db.ts                 # Configuração do cliente Prisma
│   └── utils.ts              # Funções de utilidade diversas
├── prisma/                   # Arquivos de configuração e esquema do Prisma ORM
│   ├── schema.prisma         # Definição do modelo de dados do banco
│   └── migrations/           # Histórico de migrações do banco de dados
├── public/                   # Arquivos estáticos (imagens, ícones, etc.)
├── .env.local.example        # Exemplo de arquivo de variáveis de ambiente
├── next.config.mjs           # Configuração do Next.js
├── package.json              # Metadados e dependências do projeto
├── tsconfig.json             # Configuração do TypeScript
└── README.md                 # Este arquivo
```

## ⚙️ Como Executar Localmente

Siga estas instruções para configurar e executar o projeto Barbely em seu ambiente de desenvolvimento local.

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
    git clone https://github.com/nicol/barberly.git # Substitua pela URL real do seu repositório
    cd barbely
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
      - `[SUA_URL_DE_PRODUCAO]/api/auth/callback/google` (para deployment em Vercel)
    - Após a criação, você receberá um **ID do Cliente** e um **Segredo do Cliente**. Guarde-os.

5.  **Variáveis de Ambiente:**
    Crie um arquivo chamado `.env.local` na raiz do seu projeto. Copie o conteúdo de `.env.local.example` e preencha com suas próprias credenciais:

    ```ini
    # Configuração do Banco de Dados PostgreSQL
    DATABASE_URL="postgresql://[USUARIO]:[SENHA]@[HOST]:[PORTA]/barberly_db?schema=public"

    # Configuração do NextAuth.js
    NEXTAUTH_URL="http://localhost:3000" # Mude para a URL de produção ao fazer o deploy
    NEXTAUTH_SECRET="SEU_SEGREDO_ALTAMENTE_SEGURO_PARA_NEXTAUTH" # Gere uma string longa e aleatória

    # Credenciais do Google OAuth
    GOOGLE_CLIENT_ID="SEU_ID_DO_CLIENTE_GOOGLE"
    GOOGLE_CLIENT_SECRET="SEU_SEGREDO_DO_CLIENTE_GOOGLE"

    # Outras variáveis (se houver, adicione aqui)
    # UPLOAD_API_KEY="SUA_CHAVE_DE_API_DE_UPLOAD" # Exemplo
    ```

    - **Variáveis Essenciais:**
      - `DATABASE_URL`: URL de conexão com o seu banco de dados PostgreSQL.
      - `NEXTAUTH_URL`: A URL base da sua aplicação (local ou de produção).
      - `NEXTAUTH_SECRET`: Uma string secreta e longa usada para criptografia no NextAuth.js. **Importante:** Gere uma string longa e complexa (ex: `openssl rand -base64 32`).
      - `GOOGLE_CLIENT_ID`: ID do cliente obtido no Google Cloud Console.
      - `GOOGLE_CLIENT_SECRET`: Segredo do cliente obtido no Google Cloud Console.

### População Inicial do Banco de Dados (Seed)

Para popular o banco de dados com dados de exemplo (barbearias, serviços, etc.), você pode usar o script de seed. Isso é útil para testes e para ter dados iniciais para a aplicação.

1.  **Execute o script de seed:**

    ```bash
    npx prisma db seed
    ```

    Este comando executará o arquivo `prisma/seed.ts`, que contém a lógica para inserir dados fictícios no seu banco de dados.

    **Nota:** Certifique-se de que o seu banco de dados esteja acessível e as migrações tenham sido aplicadas antes de executar o seed.

2.  **Sincronização do Banco de Dados (Prisma Migrações):**
    Execute o comando para aplicar as migrações do Prisma e criar as tabelas no seu banco de dados:
    ```bash
    npx prisma migrate dev --name init
    ```
    Isso criará o esquema do banco de dados conforme definido em `prisma/schema.prisma`.

### População Inicial do Banco de Dados (Seed)

Para popular o banco de dados com dados de exemplo (barbearias, serviços, etc.), você pode usar o script de seed. Isso é útil para testes e para ter dados iniciais para a aplicação.

1.  **Execute o script de seed:**

    ```bash
    npx prisma db seed
    ```

    Este comando executará o arquivo `prisma/seed.ts`, que contém a lógica para inserir dados fictícios no seu banco de dados.

    **Nota:** Certifique-se de que o seu banco de dados esteja acessível e as migrações tenham sido aplicadas antes de executar o seed.

### Executando a Aplicação

Com todas as configurações no lugar, você pode iniciar o servidor de desenvolvimento:

1.  **Inicie o Servidor de Desenvolvimento:**

    ```bash
    npm run dev
    # ou yarn dev
    ```

2.  **Acesse a Aplicação:**
    Abra seu navegador e acesse `http://localhost:3000`. A aplicação estará funcionando e pronta para uso!
