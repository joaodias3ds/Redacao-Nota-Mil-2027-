Janela modal com título, descrição, conteúdo e rodapé; raio 16.

```jsx
<Modal title="Nova turma" onClose={close} footer={<Button>Salvar</Button>}>…</Modal>
```

`inline` renderiza sem sobreposição (documentação). No app, prefira Drawer side="bottom".
