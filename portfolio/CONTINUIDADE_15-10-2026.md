# Continuidade — Azeredo Design | 15 de outubro de 2026

## O que já está construído
- Site institucional exclusivo, independente do Wix, com identidade azul-marinho + dourado.
- Catálogo inicial de 28 projetos com filtros por categoria, busca por nome e tecnologia, telas conceituais e detalhes em popup.
- Seções de soluções, sobre a empresa, metodologia, FAQ comercial e contato.
- Apresentação navegável online (seis telas) e portfólio PDF de seis páginas.
- Página de privacidade e metadados de compartilhamento.
- Arquivo de Firebase Hosting e workflow de GitHub Actions para Preview e deploy automático.
- Validação estática do site antes do deploy, sem dependências npm.

## O que NÃO foi feito ainda
- Novo repositório independente criado no GitHub.
- Novo projeto no Firebase, Hosting e credenciais do workflow.
- Deploy público e testes reais de navegação no domínio definitivo.
- Domínio registrado ou apontamento DNS/SSL.
- Aprovação de uso de marcas de clientes e avaliação final das descrições/demonstrações.
- Telefone ou e-mail comercial, pois ainda não foi escolhido.

## Procedimento de migração
O site está isolado na branch feature/portfolio-institucional-2026 do repositório legado azeredodesignWIX.

**NÃO mesclar essa branch ao main do Wix.**

Criar repositório independente azeredo-design-institucional. Transferir:
1. A pasta portfolio/ como diretório do novo projeto.
2. O arquivo portfolio/firebase.json para a raiz como firebase.json.
3. O arquivo portfolio/.github/workflows/firebase-hosting.yml para .github/workflows/firebase-hosting.yml.
4. O README portfolio/README.md para README.md.
5. Manter a checagem em portfolio/.automation/validate-site.mjs e a aplicação em portfolio/.

Depois criar o Firebase Project com ID exclusivo, configurar o GitHub Secret FIREBASE_SERVICE_ACCOUNT_AZEREDO e validar Preview. A branch main será a produção.

## Personalização a resolver na revisão
- Escolha e disponibilidade do domínio .com.br ou .com.
- Confirmar nome/posicionamento: Azeredo Design & Tecnologia.
- Logo final, foto profissional e breve biografia institucional.
- Canal comercial público (telefone/e-mail) sem divulgar números pessoais por engano.
- Seleção dos cases a destacar: quais nomes e logomarcas têm autorização?
- Revisão das descrições dos projetos e links de demonstração abertos.
- Ajustes finos em desktop/mobile e revisão visual antes da publicação.
- Testar o fluxo formulário → WhatsApp/e-mail quando o contato estiver configurado.
- Verificar a versão online do PDF e o link para download.
- Solicitar indexação após aprovação do domínio e configuração DNS.

## Regra de segurança
Não publicar dados de clientes, telas de sistemas privados, código-fonte ou indicadores sensíveis. Não incorporar credenciais Firebase no repositório. O site antigo deve permanecer acessível até a nova hospedagem e o domínio serem aprovados.
