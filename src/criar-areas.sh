#!/bin/bash

DIR=area_de_bairros
S_VALUE=0.1
mkdir $DIR
ogr2ogr -f "GeoJSON" -t_srs crs:84 $DIR/divisa_de_bairros.geo.json data/DIVISA_DE_BAIRROS/DIVISA_DE_BAIRROS.shp

tr -d '\n' < $DIR/divisa_de_bairros.geo.json > $DIR/bairros_lineless.geo.json

ndjson-split 'd.features' \
	< $DIR/bairros_lineless.geo.json \
	> $DIR/bairros.ndjson

ndjson-map 'd.properties={codigo:d.properties.CODIGO, tipo:"bairro", nome: d.properties.NOME, area:d.properties.AREA, codigo_regional:d.properties.CD_REGIONA, nome_regional:d.properties.NM_REGIONA},d' \
	< $DIR/bairros.ndjson \
	> $DIR/bairros_renamed.ndjson

rm $DIR/bairros.ndjson
mv $DIR/bairros_renamed.ndjson $DIR/bairros.ndjson

ndjson-reduce < $DIR/bairros.ndjson \
	| ndjson-map '{type: "FeatureCollection", features: d}' \
	> $DIR/bairros.geo.json

geo2topo bairros=$DIR/bairros.geo.json > $DIR/bairros.topo.json	
mv $DIR/bairros.topo.json json/bairros.topo.json
rm -R $DIR