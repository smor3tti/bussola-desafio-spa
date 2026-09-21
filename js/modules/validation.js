// validation.js — regras de validação de formulários e feedback ao usuário
// Cada função de validação devolve { valido, mensagem }. Quem chama decide
// o que fazer com o resultado (mostrar erro, marcar o campo, etc).

export function validarNovoItemRotina(texto) {
  const valor = (texto || "").trim();
  if (valor.length === 0) {
    return { valido: false, mensagem: "Digite algo antes de adicionar." };
  }
  if (valor.length < 3) {
    return { valido: false, mensagem: "Descreva com pelo menos 3 caracteres." };
  }
  if (valor.length > 120) {
    return { valido: false, mensagem: "Isso é grande demais (máx. 120 caracteres)." };
  }
  return { valido: true, mensagem: "" };
}

export function validarCheckinEnergia(nivel) {
  const n = Number(nivel);
  if (!n || n < 1 || n > 5) {
    return { valido: false, mensagem: "Escolha um nível na escala antes de registrar." };
  }
  return { valido: true, mensagem: "" };
}

// Aplica feedback visual (mensagem de erro + classe no campo) sem decidir
// regra de negócio nenhuma — só exibe o que a validação já calculou.
export function aplicarFeedback(campoEl, erroEl, resultado) {
  if (erroEl) erroEl.textContent = resultado.valido ? "" : resultado.mensagem;
  if (campoEl) campoEl.classList.toggle("input-invalido", !resultado.valido);
}
