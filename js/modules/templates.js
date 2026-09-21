// templates.js — geração de HTML a partir de dados (Template Literals)
// Cada função recebe dados "crus" e devolve uma string HTML pronta pra
// ser injetada via innerHTML. Listas usam .map() + .join('').

function escapar(str) {
  return String(str ?? "").replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  }[c]));
}

export function templateInicio() {
  return `
    <section class="card">
      <h2>Bem-vindo(a) de volta</h2>
      <p>Use as abas acima para registrar sua rotina do dia ou fazer um
      check-in de energia. Tudo fica salvo no seu navegador (localStorage),
      então continua aqui mesmo se você recarregar a página.</p>
    </section>
  `;
}

export function templateItemRotina(item) {
  return `
    <li class="item-row ${item.feito ? "done" : ""}" data-id="${escapar(item.id)}">
      <input type="checkbox" data-acao="toggle-item" data-id="${escapar(item.id)}" ${item.feito ? "checked" : ""} />
      <span class="item-text">${escapar(item.texto)}</span>
      <button class="item-del" data-acao="remover-item" data-id="${escapar(item.id)}">remover</button>
    </li>
  `;
}

export function templateListaRotina(itens) {
  if (itens.length === 0) {
    return `<li class="empty-state">Nenhum item ainda. Adicione um abaixo.</li>`;
  }
  return itens.map(templateItemRotina).join("");
}

export function templateRotina(itens) {
  const total = itens.length;
  const feitos = itens.filter((i) => i.feito).length;
  return `
    <section class="card">
      <h2>Rotina de hoje (${feitos}/${total})</h2>
      <ul class="item-list" id="listaRotina">
        ${templateListaRotina(itens)}
      </ul>
    </section>
    <section class="card">
      <h3>Adicionar item</h3>
      <form id="formNovoItem" novalidate>
        <div class="form-row">
          <input type="text" id="campoNovoItem" name="texto" placeholder="Ex: beber água" />
          <button type="submit" class="btn btn-primary">Adicionar</button>
        </div>
        <div class="field-error" id="erroNovoItem" aria-live="polite"></div>
      </form>
    </section>
  `;
}

export function templateEscalaEnergia(nivelSelecionado) {
  const niveis = [
    { n: 1, label: "Tranquilo" },
    { n: 2, label: "Estável" },
    { n: 3, label: "Agitado" },
    { n: 4, label: "Sobrecarregando" },
    { n: 5, label: "Sobrecarga" },
  ];
  return niveis.map((lv) => `
    <button type="button" class="${lv.n === nivelSelecionado ? "sel" : ""}" data-acao="selecionar-nivel" data-nivel="${lv.n}">
      ${lv.label}
    </button>
  `).join("");
}

export function templateHistoricoEnergia(logs) {
  if (logs.length === 0) {
    return `<p class="empty-state">Nenhum registro ainda.</p>`;
  }
  return logs.slice(0, 10).map((log) => `
    <div class="history-row">
      <span class="time">${escapar(log.horaFormatada)}</span>
      <span>Nível ${escapar(log.nivel)}</span>
      <span>${escapar(log.nota || "")}</span>
    </div>
  `).join("");
}

export function templateEnergia(nivelSelecionado, logs) {
  return `
    <section class="card">
      <h2>Como você está agora?</h2>
      <form id="formEnergia" novalidate>
        <div class="scale" id="escalaEnergia">
          ${templateEscalaEnergia(nivelSelecionado)}
        </div>
        <input type="hidden" id="campoNivel" name="nivel" value="${nivelSelecionado ?? ""}" />
        <textarea id="campoNota" name="nota" placeholder="O que está acontecendo? (opcional)"></textarea>
        <div class="field-error" id="erroEnergia" aria-live="polite"></div>
        <button type="submit" class="btn btn-primary">Registrar</button>
      </form>
    </section>
    <section class="card">
      <h3>Histórico recente</h3>
      <div id="listaHistorico">
        ${templateHistoricoEnergia(logs)}
      </div>
    </section>
  `;
}
