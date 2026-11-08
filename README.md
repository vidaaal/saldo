# saldo. — planilha web com senha

Aplicação Next.js 15, com tabelas editáveis, backup JSON e login validado no servidor.

## Configuração na Vercel

Crie **somente** a variável de ambiente `SALDO_PASSWORD` em Settings → Environment Variables, ambiente Production. Use senha exclusiva de pelo menos 16 caracteres. Faça **Redeploy** após configurar.

Não precisa de `DATABASE_URL` nem `SALDO_SESSION_SECRET`. A assinatura das sessões é derivada da senha **somente no servidor**, com cookie HttpOnly, Secure em produção e SameSite Strict. Trocar a senha invalida sessões anteriores.

## Dados

As abas Entradas, Gastos, Faturas, Mercado VA e Wishlist são editáveis como planilhas. Dados são salvos em `localStorage` no navegador em que foram inseridos. A lista Mercado VA começa vazia. Use Backup para exportar/importar JSON.

**Importante:** o login restringe acesso ao site, mas `localStorage` **não é criptografado nem protegido pela senha**. Pessoas com acesso ao perfil do navegador podem ler ou alterar os dados. Não há sincronização entre dispositivos, nem recuperação automática após limpeza do navegador. Faça backups JSON regularmente.

A proteção de tentativas de senha implementada no endpoint é em memória e não é robusta em ambientes serverless com múltiplas instâncias. Para expor publicamente, configure rate limiting persistente na borda e considere proteção adicional da Vercel.

Não existe migração automática do formato v2 para v3. O formato JSON de importação é v3. O painel mostra apenas valores efetivamente lançados, não é uma conciliação contábil.

## Desenvolvimento

```bash
npm install
npm run dev
```
