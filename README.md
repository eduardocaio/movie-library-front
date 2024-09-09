🎬 Desafio Elite Dev: Aplicação de Lista de Filmes
Bem-vindo ao Desafio Elite Dev! Este projeto é uma aplicação de lista de filmes onde os usuários podem pesquisar filmes e gerenciar uma lista de favoritos, integrando-se com a API do The Movie Database (TMDb). Abaixo estão todos os detalhes necessários para rodar, configurar e fazer o deploy do projeto.

📋 Visão Geral do Desafio
Objetivo:
O objetivo deste desafio é o desenvolvimento Front-End e Back-End.

Proposta:
Desenvolver uma aplicação de lista de filmes que permita aos usuários:

Pesquisar filmes utilizando a API do TMDb.
Visualizar detalhes sobre cada filme, incluindo a nota (rating).
Gerenciar uma lista de filmes favoritos, com a capacidade de adicionar e remover filmes da lista.
🔧 Tecnologias Utilizadas
Front-End:
React com Next.js para a construção da interface.
Back-End:
Java+Spring Boot foi utilizado para fazer a integração com a API do TMDb e gerenciar o armazenamento dos favoritos.

Deploy:
O projeto foi publicado na Vercel e está disponível em: https://cajuflix.vercel.app

📦 Funcionalidades
Front-End:
Interface de Pesquisa: Os usuários podem procurar por filmes.
Detalhes dos Filmes: Exibe informações sobre o filme, incluindo a nota do TMDb.
Gerenciamento de Favoritos: Permite adicionar e remover filmes da lista de favoritos.
Back-End:
Gerenciamento de API: Responsável por fazer chamadas à API do TMDb.
Armazenamento de Favoritos: Gerencia a persistência dos filmes favoritos do usuário.
Compartilhamento de Favoritos: Gera links para compartilhar a lista de filmes favoritos.

🚀 Instruções para Rodar o Projeto Front-End
Pré-requisitos:
Node.js instalado (versão 16+)

Como rodar o projeto localmente:
Clone o repositório:

bash
Copiar código
git clone https://github.com/eduardocaio/movie-library-front.git
Acesse a pasta do projeto:

bash
Copiar código
cd seu-repositorio

Instale as dependências:

bash
npm install

Configure as variáveis de ambiente: Crie um arquivo .env com as seguintes informações:

NEXT_PUBLIC_API_URL=http://localhost:3000

Inicie a aplicação:

bash
npm run dev
Acesse a aplicação em http://localhost:3000.

📄 Documentação
Front-End: A aplicação utiliza Next.js com rotas dinâmicas para carregar as informações dos filmes e gerenciar os favoritos.
Back-End: As rotas de API fazem as requisições para o TMDb e armazenam a lista de favoritos de cada usuário no banco de dados.

🎯 Requisitos Não Funcionais
Deploy: O projeto está publicado na Vercel, acessível em: https://cajuflix.vercel.app

🛠️ Melhorias Futuras
Implementar funcionalidade de comentários a página de filmes.
Melhoria de funcionalidades para controle de conta do usuário.
Melhorar o design responsivo para telas menores.

📨 Entrega
Código versionado front-end: https://github.com/eduardocaio/movie-library-front
Código versionado back-end: https://github.com/eduardocaio/movie-library-backend

Deploy na Vercel: [Cajuflix](https://cajuflix.vercel.app)

Obrigado! 😊
