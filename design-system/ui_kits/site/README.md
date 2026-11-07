# UI kit — Site institucional

Site público do Redação Nota Mil. **v2** (`index.html`, `site-home-v2.jsx`) segue a organização da referência enviada: hero em faixa grafite com cartões de produto flutuando sobre a foto, faixa de disciplinas, três blocos alternados (foto + cartão de UI), cursos + espaço para depoimento real, etapas com fotos, diferenciais, CTA em rosa muito claro e rodapé grafite com newsletter. As fotos são `<image-slot>` — arraste uma imagem para preencher. A versão anterior está em `index-v1.html`.

Telas: **Início**, **Curso — Redação** (abas ENEM/Vestibulares/Concursos, turmas com status), **Agendar aula experimental** (formulário com validação no envio) e **Entrar**.

- Abra `index.html`. A navegação do cabeçalho troca de página; a página atual fica salva.
- Abaixo de 900px o menu vira hambúrguer.
- Fotos são placeholders: substituir por fotos reais da escola (luz natural, tons claros, alunos escrevendo).
- Horários são fictícios. Não há preços: o site não deve publicar valores sem aprovação.
- Composto apenas com componentes do sistema (Button, TextField, Select, TextArea, Checkbox, Tabs, StatusBadge, Alert, Icon).
