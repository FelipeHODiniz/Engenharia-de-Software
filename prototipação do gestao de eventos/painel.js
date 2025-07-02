document.addEventListener("DOMContentLoaded", () => {
  const painel = document.getElementById("painel-eventos");

  const eventos = [
    {
      nome: "DivinaExpo",
      data: "01/06/2026",
      local: "Parque de Exposições, Divinopolis",
      status: "Planejamento",
      descricao: "Com 53 anos de tradição, a Divinaexpo segue encantando multidões e se consagra como o maior rodeio completo do Brasil. Fundada em 1972, na cidade de Divinópolis – MG, o evento reúne os maiores artistas do cenário nacional e da música sertaneja.",
      video: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    },
  ];

  eventos.forEach(evento => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <h3>${evento.nome}</h3>
      <p><strong>Data:</strong> ${evento.data}</p>
      <p><strong>Local:</strong> ${evento.local}</p>
      <p><strong>Status:</strong> <em>${evento.status}</em></p>
      <p>${evento.descricao}</p>
      <a href="${evento.video}" target="_blank">🎬 Ver Vídeo</a>
    `;
    painel.appendChild(card);
  });
});
