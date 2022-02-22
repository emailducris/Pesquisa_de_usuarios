let divMostrarUsuarios = 0;

let spanQtdeMasculino = 0;
let spanQtdeFeminino = 0;
let spanSomaIdades = 0;
let spanMediaIdades = 0;

let spanQtdeUsuarios = 0;
let apiTodosUsuarios = [];
let novosUsuarios = [];

let btnBuscar = null;
let inputBuscar = null;

window.addEventListener('load', () => {
  mapearDom();
  fetchPessoas();
  inputBuscar.addEventListener('keyup', buscarPorNome);
});

const mapearDom = () => {
  spanQtdeUsuarios = document.querySelector('#spanQtdeUsuarios');
  divMostrarUsuarios = document.querySelector('#divMostrarUsuarios');
  spanQtdeMasculino = document.querySelector('#spanQtdeMasculino');
  spanQtdeFeminino = document.querySelector('#spanQtdeFeminino');
  spanSomaIdades = document.querySelector('#spanSomaIdades');
  spanMediaIdades = document.querySelector('#spanMediaIdades');
  btnBuscar = document.querySelector('#btnBuscar');
  inputBuscar = document.querySelector('#inputBuscar');
};

const fetchPessoas = async () => {
  // prettier-ignore
  const res = await fetch('https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo');
  const json = await res.json();
  apiTodosUsuarios = json.results.map((people) => {
    const { name, picture, dob, gender } = people;
    return {
      name: name.first + ' ' + name.last,
      urlImage: picture.thumbnail,
      gender,
      age: dob.age,
    };
  });
  novosUsuarios = apiTodosUsuarios;
  render();
};
const render = () => {
  renderListaPessoas();
  atualizarEstatisticas();
};

renderListaPessoas = () => {
  novosUsuarios = novosUsuarios.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });
  // Renderizar itens na tela
  let peopleHTML = '<div>';

  novosUsuarios.forEach((people) => {
    const { name, urlImage, age } = people;

    const divHTML = `
    <div id="users-list-grid">
      <div>
        <img src="${urlImage}" alt="${name}" class="add"/>
      </div>
      <div>
        <ul>
            <li>${name}, ${age} anos</li>
        </ul>
      </div>
    </div>
  `;

    peopleHTML += divHTML;
  });

  peopleHTML += '</div>';
  divMostrarUsuarios.innerHTML = peopleHTML;

  atualizarEstatisticas();
};

atualizarEstatisticas = () => {
  const mostrarQtdeUsuarios = novosUsuarios.length;

  spanQtdeUsuarios.innerHTML = mostrarQtdeUsuarios; //spanCountUser.innerHTML = qttUsersShow;

  const usuarioMasc = novosUsuarios.filter((user) => user.gender === 'male');
  spanQtdeMasculino.innerHTML = usuarioMasc.length;

  const usuarioFem = novosUsuarios.filter((user) => user.gender === 'female');
  spanQtdeFeminino.innerHTML = usuarioFem.length;

  const somaIdades = novosUsuarios.reduce((acc, curr) => {
    return acc + curr.age;
  }, 0);
  spanSomaIdades.innerHTML = somaIdades;

  const mediaIdades = somaIdades / novosUsuarios.length;
  spanMediaIdades.innerHTML = mediaIdades.toFixed(2);
};

const buscarPorNome = () => {
  // Função que busca os usuários pelo nome.
  let filtrado = inputBuscar.value;
  novosUsuarios = apiTodosUsuarios.filter((people) =>
    people.name.toLowerCase().includes(filtrado.toLowerCase())
  );
  // apiTodosUsuarios = apiTodosUsuarios.filter((people) => people.name.indexOf(filtrado) > -1);
  render();
};
