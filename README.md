# Site de Reclamações

Este é um site simples de **Reclamações** onde os usuários podem enviar suas reclamações e obter feedback sobre o status do envio. A página de sucesso exibe uma mensagem de confirmação e permite que os usuários voltem à página anterior ou à página inicial.

## Funcionalidades

- **Envio de Reclamações**: Os usuários podem enviar suas reclamações por meio de um formulário.
- **Página de Sucesso**: Após o envio de uma reclamação, o usuário é redirecionado para uma página de sucesso com uma contagem regressiva para ser redirecionado automaticamente à página inicial.
- **Botões Interativos**: O site conta com animações interativas nos botões de navegação.
- **Animações**: O site usa animações com **Framer Motion** para proporcionar uma experiência suave e interativa.

## Tecnologias Utilizadas

- **Next.js**: Framework para React, utilizado para o desenvolvimento do site.
- **Tailwind CSS**: Framework CSS para estilização rápida e responsiva.
- **Framer Motion**: Biblioteca de animação para React que foi utilizada para criar animações suaves e interativas na interface.
- **React**: Biblioteca JavaScript para construir a interface do usuário.

## Estrutura do Projeto

A estrutura do projeto é organizada da seguinte forma:

/public /assets /images /css /js /pages /index.js # Página inicial /success.js # Página de sucesso após envio de reclamação /components /Button.js # Botões reutilizáveis com animações /styles /globals.css # Estilos globais


- **/pages**: Contém as páginas do site.
- **/components**: Contém componentes reutilizáveis como os botões.
- **/styles**: Contém o arquivo CSS global para a estilização do site.

## Instalação

Para rodar o projeto localmente, siga os passos abaixo:

### 1. Clonar o repositório

```bash
git clone https://github.com/seu-usuario/site-de-reclamacoes.git
2. Navegar para o diretório do projeto
cd site-de-reclamacoes
3. Instalar as dependências
npm install
4. Rodar o servidor de desenvolvimento
npm run dev
O site estará disponível em http://localhost:3000.

Como Usar
Abra o site no seu navegador.
Envie uma reclamação por meio do formulário.
Após o envio, você será redirecionado para uma página de sucesso, com uma mensagem de confirmação e um contador regressivo.
Você pode usar os botões para voltar à página anterior ou à página inicial.

Licença
Este projeto está sob a licença MIT. Consulte o arquivo LICENSE para mais detalhes.

Autor
Tiago Ferreira - Desenvolvedor do projeto
