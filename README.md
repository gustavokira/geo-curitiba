# Geo CTBA

Arquivos geoJson e topoJson com a representação das divisas dos bairros da cidade de Curitiba - PR. 

- Para mais infos sobre geoJson: [geojson.org](http://geojson.org/)
- Para visualizar arquivos geoJson e topoJson [mapshaper.org](http://mapshaper.org/)
- Para acessar os originais em outros formatos: [IPPUC](http://ippuc.org.br/geodownloads/geo.htm)

## Arquivos

**ctba-bairros.geo.json** arquivo com a representação das divisas dos bairros de Curtiba no formato geoJson.
**ctba-bairros.svg** arquivo com a representação das divisas dos bairros de Curtiba no formato svg.
**ctba-bairros.topo.json** arquivo com a representação das divisas dos bairros de Curtiba no formato topoJson.
**DIVISA_DE_BAIRROS** pasta com os arquivos originais usados para criar o geoJson e o topoJson.

## Processo de transformação
Os arquivos foram criados na plataforma OS X (El Capitain). O processo deve ser o mesmo para outras plataformas *nix. 

[nodejs](https://nodejs.org)
[topojson](https://github.com/topojson/topojson)
[shapefile](https://github.com/mbostock/shapefile)

instalar shapefile e geo2topo. O `-g` significa que o pacote será instalado de forma global.

```
npm install -g shapefile geo2topo d3-geo-projection topojson topojson-simplify topojson-client
```

No terminal, rodar os seguintes comandos, substituindo pelo nome dos arquivos: 

shp2json <arquivo-de-origem>.shp -o <arquivo-de-destino>.json
geo2topo <nome-do-conjunto>=<arquivo-de-origem> >  <arquivo-de-destino>.json

ex: 
shp2json DIVISA_DE_BAIRROS/DIVISA_DE_BAIRROS.shp -o ctba-bairros.geo.json
geo2topo bairros=ctba-bairros.geo.json > ctba-bairros.topo.json

obs 1: o arquivo topoJson é gerado a partir do geoJson.
obs 2: shp2json usa os outros arquivos (.dbf) para gerar as propriedades.

mesmo problema com a definição da projeção: https://github.com/mbloch/mapshaper/issues/96

https://medium.com/@mbostock/command-line-cartography-part-3-1158e4c55a1e#.g9dnr97lp

geoproject 'd3.geoConicEqualArea().parallels([34, 40.5]).rotate([180, 0]).fitSize([960, 960], d)' < der.json > der-albers.json



http://www.justicaeleitoral.jus.br/arquivos/tre-pr-elo-cadastro-eleitoral-enderecos-das-secoes-do-parana