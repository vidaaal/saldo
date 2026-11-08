# saldo. — planilha web

Aplicativo Next.js com planilhas editáveis e backup JSON, **sem login e sem banco de dados**.

## Como usar

Acesse o site diretamente. As abas Entradas, Gastos, Faturas, Mercado VA e Wishlist permitem edição nas células. Os dados são guardados no `localStorage` do navegador e podem ser exportados/importados pela aba Backup.

## Atenção à privacidade

O site está público e não exige autenticação. Qualquer pessoa com o link consegue abrir o aplicativo e criar dados no próprio navegador. O `localStorage` não sincroniza entre dispositivos e pode ser lido por quem tem acesso ao perfil do navegador. Faça backups JSON frequentes. Não coloque dados sensíveis se precisa de acesso restrito.

## Desenvolvimento

```bash
npm install
npm run dev
```

Não são necessárias variáveis de ambiente.
