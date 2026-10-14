# Azeredo Design & Tecnologia — Site independente do Wix

## Visão
Novo site institucional estático, com visual em **azul-marinho + dourado**. Portfólio filtrável com 28 projetos catalogados, detalhes, apresentação online em 6 slides e PDF para download. O formulário permite enviar por WhatsApp comercial ou e-mail após configurar o canal.

**Este projeto é independente do Wix.** Não mesclar a branch `feature/portfolio-institucional-2026` na `main` do repositório legado `azeredodesignWIX`. O Wix pode continuar ativo durante a transição.

## Estrutura correta para o NOVO repositório
```
azeredo-design-institucional/
├── .github/
│   └── workflows/
│       └── firebase-hosting.yml
├── firebase.json
├── README.md
└── portfolio/
    ├── index.html
    ├── privacidade.html
    ├── robots.txt
    └── assets/
        ├── app.js
        ├── projects.js
        ├── config.js
        ├── style.css
        ├── favicon.svg
        ├── social.svg
        └── Azeredo-Design-Portfolio.pdf
```

**Importante:** no repositório legado os arquivos auxiliares `firebase.json`, `README.md` e `.github/workflows/firebase-hosting.yml` estão, por segurança, DENTRO de `portfolio/`. Ao transferir, mova esses três caminhos para a raiz do novo repositório conforme acima e mantenha os arquivos do site em `portfolio/`.

## Publicação automática
1. Criar novo repositório GitHub separado, sugerido `fernandoazeredo/azeredo-design-institucional`.
2. Criar projeto Firebase exclusivo com ID `azeredo-design-institucional` (sujeito à disponibilidade).
3. Ativar Firebase Hosting e criar conta de serviço dedicada ao deploy.
4. Armazenar a credencial JSON **somente no GitHub Actions Secret**, com o nome `FIREBASE_SERVICE_ACCOUNT_AZEREDO`.
5. Se o ID Firebase efetivo for diferente, atualizar `projectId` no workflow.
6. A partir daí: PR gera URL de Preview e o push na `main` atualiza o site em produção automaticamente.

Não adicionar credenciais em código nem usar tokens pessoais de longa duração. A conta de serviço deverá ter os privilégios necessários e restritos para Firebase Hosting.

### Operação futura
Em atualizações do site: alterações → revisão/Preview → merge em `main` → publicação automática. A revisão antes da publicação protege informações de clientes.

## Atualizar o portfólio e os canais
- `portfolio/assets/projects.js`: editar/adicionar projetos.
- `portfolio/assets/config.js`: cadastrar telefone comercial WhatsApp (somente números com DDI/DDD) ou e-mail. Sem isso, o formulário exibe aviso e permite copiar mensagem, mas NÃO envia informações.
- PDF e apresentação online devem ser revisados quando novas soluções entrarem em destaque.

## Privacidade
Os projetos de terceiros são descritos de forma geral, sem dados operacionais, código-fonte ou indicadores reais. Antes de divulgar marcas, nomes de clientes e links privados, confirmar direitos de uso e autorização de publicação. Os cards usam imagens de interfaces CONCEITUAIS, não capturas reais.

## Teste local
```sh
python -m http.server 8080
```
Abra `http://localhost:8080/portfolio/`, na raiz do repositório.

## Domínio
Após a produção Firebase estar funcionando, escolher e registrar domínio, verificando a disponibilidade no Registro.br. Em Firebase Hosting > Domínios personalizados, inserir o domínio e copiar os DNS exatos exibidos, mantendo o Wix antigo no ar até SSL/HTTPS validado.

## Andamento complementar — 14/10/2026
- Adicionada busca textual ao portfólio com normalização de acentos, além dos filtros.
- Adicionadas perguntas frequentes sobre desenvolvimento, propostas e evolução.
- Criado script de validação automática em `portfolio/.automation/validate-site.mjs`.
- Separadas rotinas GitHub Actions em validação, Preview e produção.
- Criado `portfolio/CONTINUIDADE_15-10-2026.md` com checklist de lançamento.

### Conferência automática
```bash
node portfolio/.automation/validate-site.mjs
```
Executar a partir da raiz do novo repositório. Nenhuma dependência npm é necessária.
