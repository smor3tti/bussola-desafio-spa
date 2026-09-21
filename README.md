# Bússola SPA

Aplicação de página única (SPA) em JavaScript puro, com roteamento por hash, templates dinâmicos, validação de formulários e persistência em localStorage. Projeto da Experiência Prática 4 (Versionamento e acessibilidade) de Desenvolvimento Front-End, DreamShaper.

## Tecnologias

HTML5 semântico, CSS3 e JavaScript (ES Modules), sem frameworks e sem dependências externas.

## Estrutura do projeto

| Caminho | Função |
|---|---|
| html/index.html | Página única da aplicação |
| css/ | Estilos (reset.css e styles.css) |
| js/main.js | Ponto de entrada e inicialização |
| js/modules/router.js | Roteamento por hash |
| js/modules/templates.js | Templates das telas |
| js/modules/validation.js | Validação de formulários |
| js/modules/storage.js | Persistência em localStorage |
| js/modules/events.js | Registro de eventos |

## Como executar

Como o projeto usa ES Modules, ele precisa ser servido por HTTP (abrir o arquivo direto no navegador pode bloquear os módulos). Na raiz do repositório, rode `python -m http.server 8000` e acesse http://localhost:8000/html/index.html.

## Fluxo de versionamento

O repositório segue o GitFlow: `main` guarda as versões estáveis, `develop` integra o desenvolvimento e cada funcionalidade nasce em uma branch `feature/*` a partir da `develop`. Toda integração é feita por Pull Request e os commits seguem o padrão Conventional Commits (`feat:`, `fix:`, `docs:`, `chore:`).

## Autor

Sandro Moretti (smor3tti)
