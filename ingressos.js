document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-ingresso");
  const evento = document.getElementById("evento");
  const tipo = document.getElementById("tipo");
  const preco = document.getElementById("preco");
  const lote = document.getElementById("lote");
  const lista = document.getElementById("lista-ingressos");

  let ingressos = JSON.parse(localStorage.getItem("ingressos")) || [];
  let editIndex = null;

  function atualizarLista() {
    lista.innerHTML = "";
    ingressos.forEach((i, index) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <strong>${i.evento}</strong> - ${i.tipo} - R$${parseFloat(i.preco).toFixed(2)} - ${i.lote}
        <span>
          <button onclick="editar(${index})">✏️</button>
          <button onclick="remover(${index})">🗑️</button>
        </span>
      `;
      lista.appendChild(li);
    });
    localStorage.setItem("ingressos", JSON.stringify(ingressos));
  }

  form.addEventListener("submit", e => {
    e.preventDefault();
    const ingresso = {
      evento: evento.value.trim(),
      tipo: tipo.value.trim(),
      preco: preco.value,
      lote: lote.value.trim()
    };
    if (editIndex === null) {
      ingressos.push(ingresso);
    } else {
      ingressos[editIndex] = ingresso;
      editIndex = null;
    }
    evento.value = "";
    tipo.value = "";
    preco.value = "";
    lote.value = "";
    atualizarLista();
  });

  window.editar = index => {
    const i = ingressos[index];
    evento.value = i.evento;
    tipo.value = i.tipo;
    preco.value = i.preco;
    lote.value = i.lote;
    editIndex = index;
  };

  window.remover = index => {
    ingressos.splice(index, 1);
    atualizarLista();
  };

  atualizarLista();
});
