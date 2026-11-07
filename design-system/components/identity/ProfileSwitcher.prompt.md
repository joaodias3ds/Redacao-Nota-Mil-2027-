Seletor de perfil (Admin, Professor, Aluno, Responsável) para usuários com mais de um papel.

```jsx
<ProfileSwitcher user={{name:'Carla Mendes'}} profiles={[{id:'p',role:'teacher'},{id:'r',role:'guardian'}]} value="p" />
```

Perfis se distinguem por ícone e rótulo, nunca só por cor.
