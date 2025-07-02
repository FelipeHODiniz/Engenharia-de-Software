document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-promotor");
  const nome = document.getElementById("nomePromotor");
  const doc = document.getElementById("documentoPromotor");
  const tipo = document.getElementById("tipoPromotor");
  const contato = document.getElementById("contatoPromotor");
  const lista = document.getElementById("lista-promotores");

  let promotores = JSON.parse(localStorage.getItem("promotores")) || [];
  let editIndex = null;

  function atualizarLista() {
    lista.innerHTML = "";
    promotores.forEach((p, index) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <strong>${p.nome}</strong> - ${p.tipo} - ${p.documento} - ${p.contato}
        <span>
          <button onclick="editar(${index})">✏️</button>
          <button onclick="remover(${index})">🗑️</button>
        </span>
      `;
      lista.appendChild(li);
    });
    localStorage.setItem("promotores", JSON.stringify(promotores));
  }

  form.addEventListener("submit", e => {
    e.preventDefault();
    const promotor = {
      nome: nome.value.trim(),
      documento: doc.value.trim(),
      tipo: tipo.value,
      contato: contato.value.trim()
    };
    if (editIndex === null) {
      promotores.push(promotor);
    } else {
      promotores[editIndex] = promotor;
      editIndex = null;
    }
    nome.value = "";
    doc.value = "";
    tipo.value = "";
    contato.value = "";
    atualizarLista();
  });

  window.editar = index => {
    const p = promotores[index];
    nome.value = p.nome;
    doc.value = p.documento;
    tipo.value = p.tipo;
    contato.value = p.contato;
    editIndex = index;
  };

  window.remover = index => {
    promotores.splice(index, 1);
    atualizarLista();
  };

  atualizarLista();
});
