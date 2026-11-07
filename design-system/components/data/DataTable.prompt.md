Tabela para telas administrativas com ordenação, densidade e linha selecionada.

```jsx
<DataTable columns={[{key:'nome',label:'Aluno',sortable:true},{key:'media',label:'Média',numeric:true}]} rows={rows} />
```

`numeric` alinha à direita com números tabulares. No mobile, troque por ListItem/Card.
