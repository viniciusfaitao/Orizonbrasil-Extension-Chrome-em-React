<h1 align="center"> POC Orizon - Extensão Google Chrome </h1>
Necessidade: <br>
- Utilizando uma extensão do Chrome, abra um iframe com um formulário para questionar sobre a meeting em uma call do Google Meet.<br>
- Esta extensão consegue sobrepor uma tela do Google Meet?


## Proposta
Utilizando ReactJS e Vanilla JS, criamos uma extensão para o Chrome. Esta extensão terá utilidade para o administrador, que ao logar, poderá registrar um formulário para a meeting específica que será salva ao Cloud Firestone do Firebase e também excluir. Para o usuário, ele poderá desabilitar o iframe da tela. <br><br>
<p align="center">
<img src="https://i.imgur.com/HatC7S4.png" alt="Pop up"/>
</p>
<br><br>
Também irá criar um popup que somente quando o usuário estiver em um site do Google Meet irá ter em frente a tela um Iframe com um forms para questionar os usuários que estão nesta meeting.
	Com algumas validações, esta tela de form será visível apenas para os usuários que estiverem naquela meeting específica por meio do link. <br><br>
<p align="center">
<img src="https://i.imgur.com/1Medwig.png" alt="Content form"/>
</p>
<br><br>
Com dois botões utilizáveis, este iframe será móvel, então o usuário poderá arrastá-lo para onde quiser em sua tela e também minimizar, assim ficando apenas os dois botões visíveis.<br><br>

<p align="center">
  <p> Aberto: </p>
  <img src="https://i.imgur.com/xweyOeZ.png" alt="Fechado"/>
  <p> Fechado: </p>
  <img src="https://i.imgur.com/HX77ftE.png" alt="Aberto"/>
</p> 


### Tecnologias utilizadas
- [Firebase](https://firebase.google.com/)
- [Jquery](https://jquery.com/)
- [React JS](https://pt-br.reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)

## Instalação

Navegue até o diretório do projeto e no terminal digite `$ npm install` para baixar as dependências do projeto.

Para buildar e rebuildar a extensão, digite `$ npm run build` no seu terminal.

Após o projeto buildar, uma pasta com nome `dist` será criada. Adicione ela ao seu Chrome Browser:

1. Abra o Chrome.
2. Navegue para `chrome://extensions`.
3. Habilite o _Modo de desenvolvedor_.
4. Clique em _Carregar sem compactação_.
5. Selecione a pasta `dist`.

### Autores
---
<p align="center">
<p>
 <a href="https://github.com/suanev">
 <img src="https://avatars1.githubusercontent.com/u/49046892?s=460&u=c57857f9cf2449732b841a79744c227d53410297&v=4" width="100px;" alt="Suane V"/>
 <sub><b>Suane da Rosa Vallim</b></sub></a>🚀</a>
 </p>
 <p>
 <a href="https://github.com/viniciusfaitao">
 <img src="https://avatars0.githubusercontent.com/u/57546535?s=460&u=83d9a30e66aa5416d1672d07aba670ab053e2e1d&v=4" width="100px;" alt="Vinicius F"/>
 <sub><b>Vinicius Faitão</b></sub></a>🚀</a>
 </p>
</p>
