document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-relatorio");
  const evento = document.getElementById("eventoRelatorio");
  const lista = document.getElementById("lista-relatorios");

  let relatorios = JSON.parse(localStorage.getItem("relatorios")) || [];

  function atualizarLista() {
    lista.innerHTML = "";
    relatorios.forEach((r, index) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <strong>${r.evento}</strong> - ${r.data} - Status: <em>${r.status}</em>
        <span>
          <button onclick="baixar(${index})">⬇️ Exportar</button>
        </span>
      `;
      lista.appendChild(li);
    });
    localStorage.setItem("relatorios", JSON.stringify(relatorios));
  }

  form.addEventListener("submit", e => {
    e.preventDefault();
    const novo = {
      evento: evento.value.trim(),
      data: new Date().toLocaleDateString(),
      status: "Gerado"
    };
    relatorios.push(novo);
    evento.value = "";
    atualizarLista();
  });

  window.baixar = index => {
    alert(`Relatório exportado para: ${relatorios[index].evento}`);
  };

  atualizarLista();
});
