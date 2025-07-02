document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-localidade");
  const input = document.getElementById("nomeLocalidade");
  const lista = document.getElementById("lista-localidades");

  let localidades = JSON.parse(localStorage.getItem("localidades")) || [];
  let editIndex = null;

  function atualizarLista() {
    lista.innerHTML = "";
    localidades.forEach((nome, index) => {
      const li = document.createElement("li");
      li.innerHTML = `
        ${nome}
        <span>
          <button onclick="editar(${index})">✏️</button>
          <button onclick="remover(${index})">🗑️</button>
        </span>
      `;
      lista.appendChild(li);
    });
    localStorage.setItem("localidades", JSON.stringify(localidades));
  }

  form.addEventListener("submit", e => {
    e.preventDefault();
    const nome = input.value.trim();
    if (!nome) return;

    if (editIndex === null) {
      localidades.push(nome);
    } else {
      localidades[editIndex] = nome;
      editIndex = null;
    }

    input.value = "";
    atualizarLista();
  });

  window.editar = index => {
    input.value = localidades[index];
    editIndex = index;
  };

  window.remover = index => {
    localidades.splice(index, 1);
    atualizarLista();
  };

  atualizarLista();
});
