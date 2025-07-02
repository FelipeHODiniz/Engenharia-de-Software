document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-evento");
  const nome = document.getElementById("nomeEvento");
  const data = document.getElementById("dataEvento");
  const tipo = document.getElementById("tipoEvento");
  const etapa = document.getElementById("etapaEvento");
  const descricao = document.getElementById("descricaoEvento");
  const patrocinadoresContainer = document.getElementById("patrocinadoresContainer");
  const lista = document.getElementById("lista-eventos");

  let eventos = [];
  try {
    eventos = JSON.parse(localStorage.getItem("eventos")) || [];
  } catch {
    eventos = [];
  }

  let editIndex = null;

  function getPatrocinadores() {
    const nomes = patrocinadoresContainer.querySelectorAll(".patrocinador-nome");
    const valores = patrocinadoresContainer.querySelectorAll(".patrocinador-valor");
    const resultado = [];

    for (let i = 0; i < nomes.length; i++) {
      const nome = nomes[i].value.trim();
      const valor = valores[i].value.trim();
      if (nome && valor) {
        resultado.push({ nome, valor });
      }
    }
    return resultado;
  }

  function setPatrocinadores(lista) {
    patrocinadoresContainer.innerHTML = `
      <label>Patrocinadores:</label>
      <div class="patrocinador-field">
        <input type="text" class="patrocinador-nome" placeholder="Nome do Patrocinador" />
        <input type="number" class="patrocinador-valor" placeholder="Valor (R$)" step="0.01" />
        <button type="button" class="add-patrocinador">➕</button>
      </div>
    `;
    lista.forEach((p, i) => {
      if (i > 0) addPatrocinadorInput();
      patrocinadoresContainer.querySelectorAll(".patrocinador-nome")[i].value = p.nome;
      patrocinadoresContainer.querySelectorAll(".patrocinador-valor")[i].value = p.valor;
    });
  }

  function addPatrocinadorInput() {
    const div = document.createElement("div");
    div.classList.add("patrocinador-field");
    div.innerHTML = `
      <input type="text" class="patrocinador-nome" placeholder="Nome do Patrocinador" />
      <input type="number" class="patrocinador-valor" placeholder="Valor (R$)" step="0.01" />
      <button type="button" class="add-patrocinador">➕</button>
    `;
    patrocinadoresContainer.appendChild(div);
  }

  patrocinadoresContainer.addEventListener("click", e => {
    if (e.target.classList.contains("add-patrocinador")) {
      addPatrocinadorInput();
    }
  });

  function atualizarLista() {
  lista.innerHTML = "";
  eventos.forEach((ev, index) => {
    const card = document.createElement("div");
    card.classList.add("card");

    const patrocinadores = Array.isArray(ev.patrocinadores) && ev.patrocinadores.length > 0
      ? `<ul>${ev.patrocinadores.map(p => `<li>${p.nome} - R$${parseFloat(p.valor).toFixed(2)}</li>`).join("")}</ul>`
      : "<em>Sem patrocinadores</em>";

    card.innerHTML = `
      <h3>${ev.nome}</h3>
      <p><strong>Data:</strong> ${ev.data}</p>
      <p><strong>Tipo:</strong> ${ev.tipo}</p>
      <p><strong>Etapa:</strong> ${ev.etapa}</p>
      <p>${ev.descricao}</p>
      <p><strong>Patrocinadores:</strong><br>${patrocinadores}</p>
      <div class="card-buttons">
        <button onclick="editar(${index})">✏️ Editar</button>
        <button onclick="remover(${index})">🗑️ Remover</button>
      </div>
    `;
    lista.appendChild(card);
  });
  localStorage.setItem("eventos", JSON.stringify(eventos));
}


  form.addEventListener("submit", e => {
    e.preventDefault();
    const evento = {
      nome: nome.value.trim(),
      data: data.value,
      tipo: tipo.value.trim(),
      etapa: etapa.value,
      descricao: descricao.value.trim(),
      patrocinadores: getPatrocinadores()
    };

    if (editIndex === null) {
      eventos.push(evento);
    } else {
      eventos[editIndex] = evento;
      editIndex = null;
    }

    nome.value = "";
    data.value = "";
    tipo.value = "";
    etapa.value = "";
    descricao.value = "";
    setPatrocinadores([]);
    atualizarLista();
  });

  window.editar = index => {
    const ev = eventos[index];
    nome.value = ev.nome;
    data.value = ev.data;
    tipo.value = ev.tipo;
    etapa.value = ev.etapa;
    descricao.value = ev.descricao;
    setPatrocinadores(ev.patrocinadores || []);
    editIndex = index;
  };

  window.remover = index => {
    eventos.splice(index, 1);
    atualizarLista();
  };

  setPatrocinadores([]);
  atualizarLista();
});
