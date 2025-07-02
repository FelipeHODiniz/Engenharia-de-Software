    document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-sac");
  const evento = document.getElementById("eventoSac");
  const cliente = document.getElementById("clienteSac");
  const tipo = document.getElementById("tipoSac");
  const mensagem = document.getElementById("mensagemSac");
  const lista = document.getElementById("lista-sac");

  let sac = JSON.parse(localStorage.getItem("sac")) || [];
  let editIndex = null;

  function atualizarLista() {
    lista.innerHTML = "";
    sac.forEach((s, index) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <strong>${s.evento}</strong> - ${s.cliente} (${s.tipo})
        <br><em>${s.mensagem}</em>
        <span>
          <button onclick="editar(${index})">✏️</button>
          <button onclick="remover(${index})">🗑️</button>
        </span>
      `;
      lista.appendChild(li);
    });
    localStorage.setItem("sac", JSON.stringify(sac));
  }

  form.addEventListener("submit", e => {
    e.preventDefault();
    const item = {
      evento: evento.value.trim(),
      cliente: cliente.value.trim(),
      tipo: tipo.value,
      mensagem: mensagem.value.trim()
    };
    if (editIndex === null) {
      sac.push(item);
    } else {
      sac[editIndex] = item;
      editIndex = null;
    }
    evento.value = "";
    cliente.value = "";
    tipo.value = "";
    mensagem.value = "";
    atualizarLista();
  });

  window.editar = index => {
    const s = sac[index];
    evento.value = s.evento;
    cliente.value = s.cliente;
    tipo.value = s.tipo;
    mensagem.value = s.mensagem;
    editIndex = index;
  };

  window.remover = index => {
    sac.splice(index, 1);
    atualizarLista();
  };

  atualizarLista();
});
