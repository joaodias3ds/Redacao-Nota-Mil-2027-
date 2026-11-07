# UI kit — App iOS e Android (Expo / React Native)

Dois aparelhos lado a lado, ambos interativos.

**Aluno**: Início (próxima aula, “Para fazer”, aviso com confirmação de leitura) · Agenda (alterada/cancelada com texto) · Redações (envio com foto/arquivo e progresso, evolução de notas, devolutiva por competência) · Materiais (filtros, skeleton de carregamento, estado vazio em “Matemática”) · Perfil (preferências e **tema escuro**).

**Responsável**: seletor de aluno vinculado (Lucas/Sofia) · Início com resumo · Frequência · Mensalidades (abas, folha inferior “Pagar com Pix”, toast) · Avisos com confirmação.

Regras mobile aplicadas: margem 16, blocos 24, controles 48, cabeçalho 56, navegação inferior 64 + área segura, folhas inferiores no lugar de modais, sem hover (estado pressionado).

Implementação RN: use `exports/theme.native.js` (`makeTheme('dark')`), `useSafeAreaInsets`, `KeyboardAvoidingView`, `Pressable` com `pressed` → `colors.pressedOverlay`, e `allowFontScaling`. Dados fictícios.
