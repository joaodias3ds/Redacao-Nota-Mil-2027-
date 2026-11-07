# nota-mil-web

Primeira interface Next.js para o módulo PES. Login com Supabase Auth; listagem e cadastro de pessoas, criação e revogação de vínculos pela API Fastify com perfil ativo `ADMIN`. A tela segue os tokens e a marca de `design-system-export`.

Inclui também o fluxo assistido de matrícula: cadastro de turma com capacidade informada pela secretaria, rascunho de nove etapas, envio e aprovação/lista de espera. Os campos comerciais e documentos estão sinalizados como pendentes.

Copie `.env.example` para `.env.local`, configure um projeto Supabase de desenvolvimento e use `pnpm install && pnpm dev`. `pnpm typecheck` e `pnpm build` verificam a interface. A conta Admin precisa estar provisionada na tabela `User` da API, com `PersonRole=ADMIN`; não existe criação pública de Admin.

Hospedagem Cloudflare/OpenNext, páginas dos demais perfis e fluxo completo de vínculos ainda não foram implementados.
