document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-patrocinador");
  const nome = document.getElementById("nomePatrocinador");
  const evento = document.getElementById("eventoPatrocinado");
  const valor = document.getElementById("valorPatrocinio");
  const lista = document.getElementById("lista-patrocinadores");

  let patrocinadores = JSON.parse(localStorage.getItem("patrocinadores")) || [];
  let editIndex = null;

  function atualizarLista() {
    lista.innerHTML = "";
    patrocinadores.forEach((p, index) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <strong>${p.nome}</strong> - Evento: ${p.evento} - R$${parseFloat(p.valor).toFixed(2)}
        <span>
          <button onclick="editar(${index})">✏️</button>
          <button onclick="remover(${index})">🗑️</button>
        </span>
      `;
      lista.appendChild(li);
    });
    localStorage.setItem("patrocinadores", JSON.stringify(patrocinadores));
  }

  form.addEventListener("submit", e => {
    e.preventDefault();
    const item = {
      nome: nome.value.trim(),
      evento: evento.value.trim(),
      valor: valor.value
    };
    if (editIndex === null) {
      patrocinadores.push(item);
    } else {
      patrocinadores[editIndex] = item;
      editIndex = null;
    }
    nome.value = "";
    evento.value = "";
    valor.value = "";
    atualizarLista();
  });

  window.editar = index => {
    const p = patrocinadores[index];
    nome.value = p.nome;
    evento.value = p.evento;
    valor.value = p.valor;
    editIndex = index;
  };

  window.remover = index => {
    patrocinadores.splice(index, 1);
    atualizarLista();
  };

  atualizarLista();
});
