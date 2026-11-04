# DANI DUTRA | Jornada de Conexões

One Page autoral de apoio à apresentação do Programa Estagiar Globo 2026 — 2º ciclo.

## Marco inicial

Este marco registra a configuração do projeto e a abertura aprovada no Ciclo 01: nome, apresentação, avatar, mapa esquemático RJ–MG–SP, formações, eyebrows com accent ciano e favicon. As demais seções continuam em desenvolvimento e não fazem parte deste commit.

## Executar

Requer Node.js 22.12 ou superior e npm.

```sh
npm ci
npm run dev
```

No PowerShell com restrição de scripts, utilize npm.cmd.

## Validar e gerar o build

```sh
npm run lint
npm run build
npm run preview
```

O build estático é gerado em dist/. Nenhum script publica o site.

## Estrutura

- src/App.jsx: composição da abertura e navegação por âncora.
- src/content/journey.js: textos centralizados.
- src/components/JourneyMap.jsx: mapa SVG e revelação progressiva das conexões.
- src/styles/: tokens e estilos responsivos.
- public/images/dani.webp: avatar otimizado; origem documentada em SOURCES.md.
- public/favicon.svg: monograma tipográfico com ponto ciano.

React 19, Vite e Motion. Satoshi via Fontshare e Inter via Google Fonts, com fallbacks sans-serif. Foco visível, skip link e preferência por movimento reduzido preservados.

## Validação deste marco

Lint e build executados na versão isolada do commit. Abertura conferida em 1920×1080, 1366×768 e 390×844, com redação das formações preservada. Capturas, gravações, scripts auxiliares, dependências instaladas, build e arquivos de ambiente permanecem fora do versionamento.
