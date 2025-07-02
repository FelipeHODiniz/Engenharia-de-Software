document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-produto");
  const nome = document.getElementById("nomeProduto");
  const tipo = document.getElementById("tipoProduto");
  const preco = document.getElementById("precoProduto");
  const evento = document.getElementById("eventoProduto");
  const lista = document.getElementById("lista-produtos");

  let produtos = JSON.parse(localStorage.getItem("produtos")) || [];
  let editIndex = null;

  function atualizarLista() {
    lista.innerHTML = "";
    produtos.forEach((p, index) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <strong>${p.nome}</strong> - ${p.tipo} - R$${parseFloat(p.preco).toFixed(2)} - Evento: ${p.evento}
        <span>
          <button onclick="editar(${index})">✏️</button>
          <button onclick="remover(${index})">🗑️</button>
        </span>
      `;
      lista.appendChild(li);
    });
    localStorage.setItem("produtos", JSON.stringify(produtos));
  }

  form.addEventListener("submit", e => {
    e.preventDefault();
    const produto = {
      nome: nome.value.trim(),
      tipo: tipo.value,
      preco: preco.value,
      evento: evento.value.trim()
    };
    if (editIndex === null) {
      produtos.push(produto);
    } else {
      produtos[editIndex] = produto;
      editIndex = null;
    }
    nome.value = "";
    tipo.value = "";
    preco.value = "";
    evento.value = "";
    atualizarLista();
  });

  window.editar = index => {
    const p = produtos[index];
    nome.value = p.nome;
    tipo.value = p.tipo;
    preco.value = p.preco;
    evento.value = p.evento;
    editIndex = index;
  };

  window.remover = index => {
    produtos.splice(index, 1);
    atualizarLista();
  };

  atualizarLista();
});
