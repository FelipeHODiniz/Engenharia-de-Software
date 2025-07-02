document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-tarefa");
  const evento = document.getElementById("eventoTarefa");
  const etapa = document.getElementById("etapaTarefa");
  const descricao = document.getElementById("descricaoTarefa");
  const valor = document.getElementById("valorTarefa");
  const lista = document.getElementById("lista-tarefas");

  let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
  let editIndex = null;

  function atualizarLista() {
    lista.innerHTML = "";
    tarefas.forEach((t, index) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <strong>${t.evento}</strong> - ${t.etapa}<br>
        <em>${t.descricao}</em><br>
        💰 <strong>R$ ${parseFloat(t.valor).toFixed(2)}</strong>
        <span>
          <button onclick="editar(${index})">✏️</button>
          <button onclick="remover(${index})">🗑️</button>
        </span>
      `;
      lista.appendChild(li);
    });
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
  }

  form.addEventListener("submit", e => {
    e.preventDefault();
    const tarefa = {
      evento: evento.value.trim(),
      etapa: etapa.value,
      descricao: descricao.value.trim(),
      valor: valor.value.trim()
    };

    if (editIndex === null) {
      tarefas.push(tarefa);
    } else {
      tarefas[editIndex] = tarefa;
      editIndex = null;
    }

    evento.value = "";
    etapa.value = "";
    descricao.value = "";
    valor.value = "";
    atualizarLista();
  });

  window.editar = index => {
    const t = tarefas[index];
    evento.value = t.evento;
    etapa.value = t.etapa;
    descricao.value = t.descricao;
    valor.value = t.valor;
    editIndex = index;
  };

  window.remover = index => {
    tarefas.splice(index, 1);
    atualizarLista();
  };

  atualizarLista();
});
