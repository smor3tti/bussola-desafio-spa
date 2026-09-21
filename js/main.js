// main.js — ponto de entrada da aplicação
import { iniciarRouter } from "./modules/router.js";

document.getElementById("todayLabel").textContent = new Date()
  .toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long" });

iniciarRouter();
