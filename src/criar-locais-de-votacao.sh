#!/bin/bash

DIR=locais
S_VALUE=0.1
mkdir $DIR
ogr2ogr -f "GeoJSON" -t_srs crs:84 $DIR/locais-de-votacao.geo.json data/TRE2016_LOCAL_VOTACAO/TRE_LOCAL_VOTACAO.shp

tr -d '\n' < $DIR/locais-de-votacao.geo.json > $DIR/locais-de-votacao_lineness.geo.json

ndjson-split 'd.features' \
	< $DIR/locais-de-votacao_lineness.geo.json \
	> $DIR/locais-de-votacao.ndjson

# ndjson-map 'd.properties={codigo:d.properties.CODIGO, tipo:"bairro", nome: d.properties.NOME, area:d.properties.AREA, codigo_regional:d.properties.CD_REGIONA, nome_regional:d.properties.NM_REGIONA},d' \
# 	< $DIR/bairros.ndjson \
# 	> $DIR/bairros_renamed.ndjson

# rm $DIR/bairros.ndjson
# mv $DIR/bairros_renamed.ndjson $DIR/bairros.ndjson

# ndjson-reduce < $DIR/bairros.ndjson \
# 	| ndjson-map '{type: "FeatureCollection", features: d}' \
# 	> $DIR/bairros.geo.json

# geo2topo bairros=$DIR/bairros.geo.json > $DIR/bairros.topo.json	
# mv $DIR/bairros.topo.json json/bairros.topo.json
# rm -R $DIR