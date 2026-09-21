// storage.js — leitura/escrita em localStorage
// Responsabilidade única: falar com o localStorage. Nenhum outro módulo
// acessa window.localStorage diretamente, tudo passa por aqui.

const CHAVES = {
  rotinaItens: "bussola:rotinaItens",
  rotinaFeitos: "bussola:rotinaFeitos:", // + data (YYYY-MM-DD)
  energiaLogs: "bussola:energiaLogs",
};

function lerJSON(chave, valorPadrao) {
  try {
    const bruto = localStorage.getItem(chave);
    if (bruto === null) return valorPadrao;
    return JSON.parse(bruto);
  } catch (erro) {
    console.warn("Falha ao ler", chave, erro);
    return valorPadrao;
  }
}

function salvarJSON(chave, valor) {
  try {
    localStorage.setItem(chave, JSON.stringify(valor));
  } catch (erro) {
    console.warn("Falha ao salvar", chave, erro);
  }
}

export function getRotinaItens(itensPadrao) {
  return lerJSON(CHAVES.rotinaItens, itensPadrao);
}
export function salvarRotinaItens(itens) {
  salvarJSON(CHAVES.rotinaItens, itens);
}

export function getRotinaFeitos(dataStr) {
  return lerJSON(CHAVES.rotinaFeitos + dataStr, {});
}
export function salvarRotinaFeitos(dataStr, feitos) {
  salvarJSON(CHAVES.rotinaFeitos + dataStr, feitos);
}

export function getEnergiaLogs() {
  return lerJSON(CHAVES.energiaLogs, []);
}
export function salvarEnergiaLogs(logs) {
  salvarJSON(CHAVES.energiaLogs, logs);
}
