document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("chatbot-button");
  const chat = document.getElementById("chat-window");
  const form = document.getElementById("chat-form");
  const input = document.getElementById("chat-input");
  const body = document.getElementById("chat-body");

  button.addEventListener("click", () => {
    chat.classList.toggle("hidden");
  });

  const respostas = [
    { pergunta: /ingresso/i, resposta: "Você pode comprar ingressos na seção 'Ingressos' do menu." },
    { pergunta: /evento/i, resposta: "Todos os eventos cadastrados estão na aba 'Eventos'." },
    { pergunta: /local/i, resposta: "As localidades disponíveis estão em 'Localidades'." },
    { pergunta: /contato/i, resposta: "Você pode nos contatar via SAC ou redes sociais." },
    { pergunta: /preço|valor/i, resposta: "Os valores dos produtos e ingressos são definidos por evento." }
  ];

  function responder(texto) {
    let resposta = "Desculpe, não entendi sua pergunta.";
    for (let r of respostas) {
      if (r.pergunta.test(texto)) {
        resposta = r.resposta;
        break;
      }
    }
    return resposta;
  }

  form.addEventListener("submit", e => {
    e.preventDefault();
    const msg = input.value.trim();
    if (!msg) return;

    body.innerHTML += `<div><strong>Você:</strong> ${msg}</div>`;
    const resposta = responder(msg);
    setTimeout(() => {
      body.innerHTML += `<div><strong>Atendente:</strong> ${resposta}</div>`;
      body.scrollTop = body.scrollHeight;
    }, 400);

    input.value = "";
  });
});
