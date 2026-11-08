# saldo. — planilha web privada

Next.js 15 + PostgreSQL, interface de planilha editável, acesso exclusivo por senha no servidor e backups JSON.

## Variáveis obrigatórias

Configure em **Vercel → Project → Settings → Environment Variables** (Production, Preview se necessário):

- `SALDO_PASSWORD`: senha única longa (mínimo 16 caracteres). **Nunca coloque no GitHub nem no código.**
- `SALDO_SESSION_SECRET`: segredo aleatório independente de pelo menos 32 caracteres.
- `DATABASE_URL`: URL PostgreSQL com TLS válido, do seu provedor.

Crie as variáveis no painel da Vercel, não envie os valores por chat. Depois faça redeploy. Sem essas variáveis o login e/ou armazenamento não funcionarão.

O aplicativo cria automaticamente a tabela `saldo_state` no primeiro acesso autenticado. Use um banco dedicado e um usuário de banco com permissões mínimas para essa tabela. Em provedores com TLS certificado próprio, configure uma CA confiável em vez de desabilitar a verificação TLS.

## Funcionalidades

- Login por senha única validada no servidor, cookie assinado HttpOnly/SameSite Strict, sessão de 12 horas, logout.
- Sem cadastro público. A página principal exige autenticação no servidor; a API de dados exige autenticação em cada requisição.
- Planilhas editáveis: Entradas, Gastos, Faturas, Mercado VA (vazia por padrão), Wishlist.
- Painel com totais calculados, importação/exportação JSON.
- Dados salvos em PostgreSQL, não no localStorage.

## Limites atuais

- A proteção contra tentativas de senha é **apenas em memória por instância** e não é suficiente para proteção distribuída de produção. Ative rate limiting na borda (Vercel Firewall/Upstash) antes de expor o site. Para maior segurança, restrinja o acesso com Vercel Authentication/Deployment Protection e habilite MFA na conta Vercel.
- A senha é única para todo o app, sem identificação de usuários. Quem souber a senha tem acesso total.
- Não é possível impedir que um usuário autenticado veja os próprios dados no console ou na aba Network; o objetivo é impedir acesso **não autenticado**.
- Não foi implementada migração automática de dados v2 do navegador. Exporte os dados antigos antes de substituir a versão publicada; backups JSON v2 exigem conversão para o formato v3.
- Edição salva ao sair da célula; em edições rápidas simultâneas, aguarde confirmação de salvamento antes de prosseguir.
- Não há conciliação automática de cartão, nem assistente de IA. Totais são auxiliares, não contabilidade auditada.

## Desenvolvimento

```bash
npm install
npm run dev
```

Crie `.env.local` a partir de `.env.example` (não versione).
