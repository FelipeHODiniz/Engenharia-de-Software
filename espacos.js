document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-espaco");
  const nome = document.getElementById("nomeEspaco");
  const localidade = document.getElementById("localidadeEspaco");
  const tipo = document.getElementById("tipoEspaco");
  const capacidade = document.getElementById("capacidadeEspaco");
  const descricao = document.getElementById("descricaoEspaco");
  const lista = document.getElementById("lista-espacos");

  let espacos = JSON.parse(localStorage.getItem("espacos")) || [];
  let editIndex = null;

  function atualizarLista() {
    lista.innerHTML = "";
    espacos.forEach((e, index) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <strong>${e.nome}</strong> - ${e.localidade} - ${e.tipo} - Capacidade: ${e.capacidade}
        <br><em>${e.descricao}</em>
        <span>
          <button onclick="editar(${index})">✏️</button>
          <button onclick="remover(${index})">🗑️</button>
        </span>
      `;
      lista.appendChild(li);
    });
    localStorage.setItem("espacos", JSON.stringify(espacos));
  }

  form.addEventListener("submit", e => {
    e.preventDefault();
    const espaco = {
      nome: nome.value.trim(),
      localidade: localidade.value.trim(),
      tipo: tipo.value,
      capacidade: capacidade.value.trim(),
      descricao: descricao.value.trim()
    };
    if (editIndex === null) {
      espacos.push(espaco);
    } else {
      espacos[editIndex] = espaco;
      editIndex = null;
    }
    nome.value = "";
    localidade.value = "";
    tipo.value = "";
    capacidade.value = "";
    descricao.value = "";
    atualizarLista();
  });

  window.editar = index => {
    const e = espacos[index];
    nome.value = e.nome;
    localidade.value = e.localidade;
    tipo.value = e.tipo;
    capacidade.value = e.capacidade;
    descricao.value = e.descricao;
    editIndex = index;
  };

  window.remover = index => {
    espacos.splice(index, 1);
    atualizarLista();
  };

  atualizarLista();
});
