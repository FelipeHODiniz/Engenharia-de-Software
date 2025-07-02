document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-prestador");
  const nome = document.getElementById("nomePrestador");
  const tipo = document.getElementById("tipoPrestador");
  const especialidade = document.getElementById("especialidadePrestador");
  const contato = document.getElementById("contatoPrestador");
  const lista = document.getElementById("lista-prestadores");

  let prestadores = JSON.parse(localStorage.getItem("prestadores")) || [];
  let editIndex = null;

  function atualizarLista() {
    lista.innerHTML = "";
    prestadores.forEach((p, index) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <strong>${p.nome}</strong> - ${p.tipo} - ${p.especialidade} - ${p.contato}
        <span>
          <button onclick="editar(${index})">✏️</button>
          <button onclick="remover(${index})">🗑️</button>
        </span>
      `;
      lista.appendChild(li);
    });
    localStorage.setItem("prestadores", JSON.stringify(prestadores));
  }

  form.addEventListener("submit", e => {
    e.preventDefault();
    const prestador = {
      nome: nome.value.trim(),
      tipo: tipo.value,
      especialidade: especialidade.value.trim(),
      contato: contato.value.trim()
    };
    if (editIndex === null) {
      prestadores.push(prestador);
    } else {
      prestadores[editIndex] = prestador;
      editIndex = null;
    }
    nome.value = "";
    tipo.value = "";
    especialidade.value = "";
    contato.value = "";
    atualizarLista();
  });

  window.editar = index => {
    const p = prestadores[index];
    nome.value = p.nome;
    tipo.value = p.tipo;
    especialidade.value = p.especialidade;
    contato.value = p.contato;
    editIndex = index;
  };

  window.remover = index => {
    prestadores.splice(index, 1);
    atualizarLista();
  };

  atualizarLista();
});
