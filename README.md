# Bússola SPA

Aplicação de página única (SPA) em JavaScript puro, com roteamento por hash, templates dinâmicos, validação de formulários e persistência em localStorage. Projeto da Experiência Prática 4 (Versionamento e acessibilidade) de Desenvolvimento Front-End, DreamShaper.

## Tecnologias

HTML5 semântico, CSS3 e JavaScript (ES Modules), sem frameworks e sem dependências externas.

## Pré-requisitos

Git e um navegador moderno (Chrome, Edge ou Firefox). Para servir os arquivos localmente, basta ter Python 3 instalado (ou qualquer servidor HTTP estático). Não há dependências a instalar nem etapa de build nesta versão.

## Instalação

Clone o repositório e entre na pasta do projeto:

```bash
git clone https://github.com/smor3tti/bussola-desafio-spa.git
cd bussola-desafio-spa
```

## Como executar

Como o projeto usa ES Modules, ele precisa ser servido por HTTP (abrir o arquivo direto no navegador pode bloquear os módulos). Na raiz do repositório, rode:

```bash
python -m http.server 8000
```

Depois acesse http://localhost:8000/html/index.html.

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

## Fluxo de versionamento

O repositório segue o GitFlow: `main` guarda as versões estáveis, `develop` integra o desenvolvimento e cada funcionalidade nasce em uma branch `feature/*` a partir da `develop`. Toda integração é feita por Pull Request e os commits seguem o padrão Conventional Commits (`feat:`, `fix:`, `docs:`, `chore:`).

## Versionamento semântico e releases

As versões seguem o SemVer (MAJOR.MINOR.PATCH): `feat` incrementa o MINOR, `fix` incrementa o PATCH e mudanças incompatíveis incrementam o MAJOR. Cada versão é marcada com uma tag e publicada como release no GitHub. A primeira versão estável é a `v1.0.0`.

## Autor

Sandro Moretti (smor3tti)
