# Redação Nota Mil — Design System

Design system do **Redação Nota Mil**, curso preparatório de Goiânia (GO) voltado ao desenvolvimento da escrita, ao reforço da aprendizagem e à preparação para ENEM, vestibulares e concursos. Oferece Redação e disciplinas complementares (Matemática, Exatas, Gramática, Biologia, Inglês) e reforço particular individual.

Personalidade: **confiança, acolhimento, organização, dedicação e incentivo ao progresso**. Moderno, profissional, acessível e acolhedor — com prioridade para o celular.

## Produtos cobertos
1. **Site institucional** — público; cursos, aula experimental, contato. → `ui_kits/site/`
2. **Sistema de gestão escolar (web)** — Admin e Professor. → `ui_kits/sistema-web/`
3. **Apps iOS e Android (Expo / React Native)** — Aluno e Responsável (e Professor para chamada). → `ui_kits/app-mobile/`

## Fontes recebidas
- `uploads/logotransparente.png` — logo oficial (PNG transparente 1080×1350). Recortada sem alteração para `assets/logo-redacao-1000.png` (937×565). O símbolo `assets/simbolo-r-livro.png` é um **recorte** do mesmo arquivo (R + livro) — proposta, aguardando aprovação.
- `uploads/desing md para curso.txt` + 4 capturas de `getdesign.md/cursor/design-md` — kit de referência (Cursor) usado **apenas** para organizar a documentação (tabelas de tokens, Do/Don't, breakpoints). Nenhum valor visual do Cursor foi adotado.
- Briefing do usuário (paleta aprovada, tipografia, espaçamento, componentes, perfis).
- Não houve código-fonte, Figma ou telas existentes do produto. Todas as telas dos UI kits são **propostas** a partir do briefing, não recriações.

---

## CONTENT FUNDAMENTALS — como escrevemos

- **Idioma**: português do Brasil. Tratamento por **você** (nunca “tu”, nunca “o(a) senhor(a)”). A escola fala na 1ª pessoa do plural: “Nossa equipe entra em contato”.
- **Tom**: próximo, claro e encorajador, sem infantilizar. Frases curtas e diretas. Incentivo concreto (“Boa evolução em relação à semana 2”), nunca bajulação.
- **Caixa**: frase (só a primeira letra maiúscula) em títulos, botões e menus — “Enviar redação”, não “Enviar Redação”. CAIXA ALTA só em rótulos de 1–2 palavras (dia da semana “QUA”, sobretítulo “TURMA”).
- **Botões = verbo + objeto**: “Enviar redação”, “Confirmar leitura”, “Pagar com Pix”, “Salvar chamada”. Nunca “OK” ou “Sim” sozinhos em confirmações.
- **Erros dizem o que fazer**: “Informe um e-mail válido, como nome@email.com.” — não “Campo inválido”.
- **Estados com contexto**: “Salvo às 14h32”, “3 alterações aguardando envio”, “Prazo vencido”.
- **Datas e horas**: “Qua, 12/11”, “19h30–21h00”, “Até sex, 23h59”. Moeda: “R$ 000,00”. Números tabulares.
- **Emoji**: não usar em interface. Ícones Lucide cumprem esse papel.
- **Dados fictícios**: protótipos usam nomes comuns e valores-modelo (“000”, “R$ 000,00”). Não inventar preços, descontos, regras acadêmicas ou resultados reais.
- Exemplos: “Olá, Ana” · “Para fazer” · “Nenhuma atividade pendente. Quando o professor publicar, ela aparece aqui.” · “Sem conexão · você pode continuar; enviaremos ao reconectar.”

## VISUAL FOUNDATIONS

- **Cor**: fundo predominantemente **branco**; superfícies secundárias em cinza muito claro `#F5F5F7`. Rosa `#EC008B` é identidade: logo, ícones de destaque, indicador de seleção, número/termo de destaque em títulos. Para **ação** (botão primário, link, foco) usamos o rosa 600 `#D1007B` (5,25:1 com branco) — o rosa original tem 4,25:1 e **não** passa AA para texto pequeno branco. Grafite `#211F20` em títulos e texto; cinza `#57585A` em texto secundário. Telas inteiras rosa são proibidas; rosa ocupa no máximo ~10% de uma tela.
- **Semânticas** (sucesso verde, atenção âmbar, erro vermelho, informação azul) só comunicam estado e vêm sempre com ícone + texto. Cada uma tem `solid / bg / fg / border`.
- **Tema escuro**: `[data-theme="dark"]` troca os semânticos (fundo `#18171A`, cartões `#211F20`, texto `#F2F2F3`). Botão primário continua `#D1007B` com branco; links viram `#FF6FBF`. A logo aparece sempre sobre **placa branca**.
- **Tipografia**: Poppins (500/600/700) **somente em títulos** e números de destaque; Inter (400/500/600/700) em texto, formulários, menus, tabelas. Escala responsiva com `clamp()`; display com tracking negativo leve. Mínimo 12px; corpo 16px; inputs sempre 16px (evita zoom no iOS). Números tabulares em notas, valores e datas.
- **Espaçamento**: base 4 → 4, 8, 12, 16, 24, 32, 48, 64. Mobile: margem 16, blocos 24. Web: conteúdo 32 de padding, máx. 1200.
- **Raios**: 8 campos/botões · 12 cartões · 16 modais/painéis · pílula em status, chips e avatar · 4 em checkbox.
- **Bordas e sombras**: cartões em repouso têm só borda 1px `#DCDCDF`, sem sombra. Sombra `sm` aparece no hover de cartões clicáveis; `md` em menus; `lg` em modais e toasts. Campos usam borda `#8E8F92` (3,2:1) para atender contraste de componentes.
- **Fundos e imagem**: sem gradientes decorativos, padrões ou texturas. Fotografia real (sala de aula, alunos escrevendo, luz natural, tons claros e neutros) em áreas definidas com raio 16 — nunca atrás de texto. Sem ilustrações cartunescas.
- **Hover (web)**: botões escurecem um passo (600→700); superfícies neutras ganham sobreposição `rgba(33,31,32,.04)`; cartões clicáveis ganham borda mais forte + sombra sm.
- **Pressionado**: mais um passo (700→800) e `scale(.98)` em botões; sobreposição `.08` em listas. No app, `Pressable` substitui hover.
- **Foco**: anel duplo 2px branco + 2px rosa 600 (`--focus-ring`), só via teclado (`:focus-visible`). Campos em foco: borda rosa + halo `#FFF0F8`.
- **Selecionado**: fundo `#FFF0F8`, texto rosa 700, indicador (barra/sublinhado) rosa 500.
- **Movimento**: discreto e funcional. 120ms (hover/press), 200ms (switch, abas), 320ms (progresso, painéis). Easing `cubic-bezier(.2,0,0,1)`. Sem bounces. `prefers-reduced-motion` respeitado.
- **Transparência/blur**: apenas a sobreposição de modais (`rgba(33,31,32,.48)`). Sem blur decorativo.
- **Layout**: web com sidebar 248 + topbar 64 fixos; app com cabeçalho 56 e navegação inferior 64 + área segura. Tabelas viram listas/cartões abaixo de 640px.
- **Cartões**: branco, borda 1px, raio 12, padding 16 (24 em destaque), título Poppins 600 17px.

## ICONOGRAPHY

- **Sistema**: [Lucide](https://lucide.dev) via CDN (`lucide@0.460.0` UMD), renderizado pelo componente `Icon` (SVG inline, traço **1.75**, pontas arredondadas). O briefing não trouxe ícones próprios; Lucide foi escolhido por ser aberto, legível em traço fino e ter equivalente em RN (`lucide-react-native`). **Substituição sinalizada** — trocar se a escola tiver um set próprio.
- Tamanhos: 16 (inline/badges), 20 (padrão), 24 (navegação). Área de toque mínima 48 mesmo com ícone 20.
- Ícones herdam a cor do texto; ícones de destaque usam rosa 500 dentro de um quadrado 40–44 com fundo `#FFF0F8` e raio 8.
- Ícones somente-decorativos têm `aria-hidden`; botões só com ícone exigem `label`.
- Sem emoji, sem caracteres Unicode como ícone (exceto ✓/✕ nos cartões de documentação), sem PNGs de ícone.
- Mais usados: `house, calendar-days, clock, users, graduation-cap, book-open-text, pen-line, clipboard-check, file-text, wallet, qr-code, bell, megaphone, chart-line, circle-check, triangle-alert, circle-alert, info, wifi-off, check-check, upload`.

## Logo — regras
- Usar sempre o arquivo original. Não redesenhar, recolorir, distorcer, rotacionar, aplicar sombra ou recompor o “1000” com fontes da interface.
- Área de proteção = 1x (altura da faixa “Curso Preparatório”) em todos os lados.
- Mínimo: 160px / 40mm (logo); 32px / 10mm (símbolo).
- Fundos permitidos: branco, `#F5F5F7`, `#FFF0F8`. Sobre grafite, rosa ou foto: **placa branca** com raio 12 e respiro 1x.
- Escrita da logo: “Redação 1000 — Curso Preparatório”. Nome institucional em texto: “Redação Nota Mil”.

---

## Índice

```
styles.css                 ← único ponto de entrada (só @import)
tokens/                    fonts · colors (primitivos + semânticos claro/escuro) · typography · spacing · effects · components · base
fonts/                     Inter e Poppins (woff2, Google Fonts, OFL)
assets/                    logo-redacao-1000.png · simbolo-r-livro.png
exports/                   tokens.json · theme.native.js (React Native / Expo)
components/                biblioteca React (ver abaixo) — 1 card por pasta
guidelines/                cards de fundamentos (Brand, Colors, Type, Spacing, Padrões)
guidelines/applications/   cartão de visita, caderno/pasta, caneca/caneta, sacola, uniforme
ui_kits/site/              site institucional
ui_kits/sistema-web/       sistema de gestão (Admin, Professor)
ui_kits/app-mobile/        app iOS/Android (Aluno, Responsável)
ui_kits/link-bio/          página de links do Instagram (edite o objeto LINKS no fim do arquivo)
ui_kits/social/            posts de feed 1080×1350: post-site.html, post-app.html
thumbnail.html · SKILL.md
```

### Tokens — nomes equivalentes
CSS `--text-primary` → JSON `semantic.light["text-primary"]` → RN `colors.textPrimary`. Espaço `--space-4` → `space[4]` (16). Raio `--radius-card` → `radius.card`. Tema RN: `makeTheme('light' | 'dark')`.

### Components
- **icons**: Icon
- **actions**: Button, IconButton, Spinner
- **forms**: TextField (texto, senha, busca, data, e-mail, telefone), TextArea, Select, Checkbox, Radio, Switch, FileUpload, FieldLabel, FieldMessage
- **data**: Card, ListItem, DataTable, FilterChip, Pagination
- **navigation**: Tabs, SideNav, TopBar, BottomNav
- **overlays**: Modal, ConfirmDialog, Drawer, ActionMenu
- **feedback**: Alert, Toast, StatusBadge, ProgressBar, Skeleton, StateView (vazio, carregando, erro, sucesso, offline)
- **identity**: Avatar, ProfileSwitcher, StudentSelector
- **education**: ClassCard, ScheduleCalendar, EnrollmentStepper (+ SaveIndicator), AttendanceRow (+ ATTENDANCE), EssayFeedback, GradeChart, MaterialItem, PaymentStatus, AnnouncementCard, SyncIndicator

Todos aceitam `style`; vários aceitam `state` para documentar hover/foco/pressionado. Bibliotecas sugeridas para produção: web — React + Radix UI (acessibilidade de menus/diálogos) estilizado com estes tokens; app — Expo + `react-native-safe-area-context`, `@gorhom/bottom-sheet`, `lucide-react-native`, `@expo-google-fonts/poppins` e `/inter`.

### Intentional additions
- `Icon` — wrapper do Lucide (não havia set de ícones na fonte).
- `Spinner`, `FieldLabel`, `FieldMessage`, `SaveIndicator` — peças internas expostas para reuso.
