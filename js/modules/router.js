// router.js — captura mudanças de hash e injeta a tela correspondente
// na div principal (#app). Esse é o "coração" da SPA: nenhuma navegação
// aqui recarrega a página, tudo é feito manipulando o DOM.

import { renderInicio, renderRotina, renderEnergia } from "./events.js";

const rotas = {
  "/inicio": renderInicio,
  "/rotina": renderRotina,
  "/energia": renderEnergia,
};

function rotaAtual() {
  const hash = window.location.hash.replace("#", "");
  return rotas[hash] ? hash : "/inicio";
}

function atualizarAbaAtiva(rota) {
  document.querySelectorAll(".tab").forEach((a) => {
    a.classList.toggle("ativo", a.dataset.rota === rota);
  });
}

export function iniciarRouter() {
  const app = document.getElementById("app");

  function renderizar() {
    const rota = rotaAtual();
    const renderFn = rotas[rota];
    app.innerHTML = ""; // limpa o container alvo antes de injetar o novo fragmento
    renderFn(app);
    atualizarAbaAtiva(rota);
  }

  window.addEventListener("hashchange", renderizar);
  window.addEventListener("DOMContentLoaded", renderizar);

  // se o script rodar depois do DOMContentLoaded (defer/module), renderiza direto
  if (document.readyState !== "loading") {
    renderizar();
  }
}
