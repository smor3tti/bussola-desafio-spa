// events.js — mapeamento de eventos e wiring de cada tela
// Cada "render*" injeta o template no #app e liga os eventos daquela tela.
// Como o innerHTML é trocado a cada navegação, os listeners são sempre
// religados depois da injeção (delegação simples, sem framework).

import {
  templateInicio,
  templateRotina,
  templateEnergia,
} from "./templates.js";
import {
  getRotinaItens,
  salvarRotinaItens,
  getRotinaFeitos,
  salvarRotinaFeitos,
  getEnergiaLogs,
  salvarEnergiaLogs,
} from "./storage.js";
import {
  validarNovoItemRotina,
  validarCheckinEnergia,
  aplicarFeedback,
} from "./validation.js";

const ITENS_PADRAO = [
  { id: "m1", texto: "Beber água ao acordar" },
  { id: "m2", texto: "Revisar as prioridades do dia" },
  { id: "t1", texto: "Fazer uma pausa sem tela" },
  { id: "n1", texto: "Registrar como foi o dia" },
];

function hojeStr() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function montarListaComEstado() {
  const itens = getRotinaItens(ITENS_PADRAO);
  const feitos = getRotinaFeitos(hojeStr());
  return itens.map((i) => ({ ...i, feito: !!feitos[i.id] }));
}

export function renderInicio(app) {
  app.innerHTML = templateInicio();
}

export function renderRotina(app) {
  const itensComEstado = montarListaComEstado();
  app.innerHTML = templateRotina(itensComEstado);

  // delegação de eventos: um único listener no container cobre
  // checkbox e botão de remover de qualquer item, mesmo os novos
  const lista = document.getElementById("listaRotina");
  lista.addEventListener("click", (ev) => {
    const alvo = ev.target.closest("[data-acao]");
    if (!alvo) return;
    const id = alvo.dataset.id;

    if (alvo.dataset.acao === "toggle-item") {
      const feitos = getRotinaFeitos(hojeStr());
      feitos[id] = !feitos[id];
      salvarRotinaFeitos(hojeStr(), feitos);
      renderRotina(app);
    }

    if (alvo.dataset.acao === "remover-item") {
      const itens = getRotinaItens(ITENS_PADRAO).filter((i) => i.id !== id);
      salvarRotinaItens(itens);
      const feitos = getRotinaFeitos(hojeStr());
      delete feitos[id];
      salvarRotinaFeitos(hojeStr(), feitos);
      renderRotina(app);
    }
  });

  const form = document.getElementById("formNovoItem");
  const campo = document.getElementById("campoNovoItem");
  const erro = document.getElementById("erroNovoItem");

  form.addEventListener("submit", (ev) => {
    ev.preventDefault();
    const resultado = validarNovoItemRotina(campo.value);
    aplicarFeedback(campo, erro, resultado);
    if (!resultado.valido) return;

    const itens = getRotinaItens(ITENS_PADRAO);
    const novoId = "item_" + Date.now().toString(36);
    itens.push({ id: novoId, texto: campo.value.trim() });
    salvarRotinaItens(itens);
    renderRotina(app);
  });
}

export function renderEnergia(app, nivelSelecionado = null) {
  const logs = getEnergiaLogs();
  app.innerHTML = templateEnergia(nivelSelecionado, logs);

  const escala = document.getElementById("escalaEnergia");
  escala.addEventListener("click", (ev) => {
    const btn = ev.target.closest("[data-acao='selecionar-nivel']");
    if (!btn) return;
    renderEnergia(app, Number(btn.dataset.nivel));
  });

  const form = document.getElementById("formEnergia");
  const erro = document.getElementById("erroEnergia");
  const campoNota = document.getElementById("campoNota");

  form.addEventListener("submit", (ev) => {
    ev.preventDefault();
    const resultado = validarCheckinEnergia(nivelSelecionado);
    aplicarFeedback(null, erro, resultado);
    if (!resultado.valido) return;

    const novoLog = {
      nivel: nivelSelecionado,
      nota: campoNota.value.trim(),
      horaFormatada: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
    };
    const logs = getEnergiaLogs();
    logs.unshift(novoLog);
    salvarEnergiaLogs(logs);
    renderEnergia(app, null);
  });
}
