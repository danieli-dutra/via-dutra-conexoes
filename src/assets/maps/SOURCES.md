# Geometrias do Brasil e das cinco macrorregiões

## Fontes e permissões

Limites estaduais: Natural Earth v5.1.2, Admin 1 States/Provinces, escala 1:50m. Foram utilizadas as 27 UFs brasileiras.

- Dados: https://github.com/nvkelso/natural-earth-vector/blob/v5.1.2/geojson/ne_50m_admin_1_states_provinces.geojson
- Termos: https://www.naturalearthdata.com/about/terms-of-use/
- Licença: domínio público. Permite reprodução e adaptação. Autores principais: Tom Patterson e Nathaniel Vaughn Kelso, com colaboradores.

Agrupamento oficial das UFs por macrorregião: API de Localidades do IBGE, consulta realizada em 04/11/2026.

- Fonte primária: https://servicodados.ibge.gov.br/api/v1/localidades/estados
- Documentação: https://servicodados.ibge.gov.br/api/docs/localidades
- Foram usados somente os identificadores públicos de UF e região para classificar a geometria Natural Earth; nenhuma malha ou conteúdo estatístico do IBGE foi redistribuído.

## Derivação

As arestas compartilhadas entre estados de uma mesma região foram canceladas topologicamente. Os anéis restantes formam os limites regionais. O mesmo procedimento aplicado às 27 UFs produz o contorno nacional. Não foram desenhadas fronteiras manuais nem aplicados atalhos geométricos aos limites regionais.

- Norte: AC, AM, AP, PA, RO, RR, TO.
- Nordeste: AL, BA, CE, MA, PB, PE, PI, RN, SE.
- Centro-Oeste: DF, GO, MS, MT.
- Sudeste: ES, MG, RJ, SP.
- Sul: PR, RS, SC.

Projeção equiretangular com compensação pela latitude média; escala uniforme no viewBox 420×420, margem mínima de 17 unidades; coordenadas SVG arredondadas a 0,01 unidade. A precisão geográfica é a generalização da fonte 1:50m. Pequenas ilhas abaixo de 0,005 grau quadrado e arquipélagos distantes do enquadramento continental são omitidos nesta representação ilustrativa. Nenhum limite regional foi inventado.

Os sete pontos continuam sendo metáforas visuais, sem representar participantes ou estatísticas do Censo. As curvas são fixas, recortadas pelo território. A referência de região dos pontos serve somente à coordenação leve dos ritmos de luz.

Apenas caminhos vetoriais e metadados mínimos integram o bundle. Sem downloads, serviços externos ou biblioteca cartográfica em runtime. Gerador local de apoio: scripts/build-brazil-regions.mjs. Dados-fonte temporários ficam em .codex-local/, fora do versionamento.
