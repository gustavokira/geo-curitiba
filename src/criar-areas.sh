#!/bin/bash

#nome do diretorio temporario para ser usado nesta operacao
DIR=area_de_bairros

#define o valor para ser usado no toposimplify -S
S_VALUE=0.1

#cria o diretorio temporario
mkdir $DIR

#trnasforma o arquivo .shp em .json (geo)
ogr2ogr -f "GeoJSON" -t_srs crs:84 $DIR/divisa_de_bairros.geo.json data/DIVISA_DE_BAIRROS/DIVISA_DE_BAIRROS.shp

#remove \n do arquivo (exigencia do ndjson-split)
tr -d '\n' < $DIR/divisa_de_bairros.geo.json > $DIR/bairros_lineless.geo.json

#transforma o geo em ndjson
ndjson-split 'd.features' \
	< $DIR/bairros_lineless.geo.json \
	> $DIR/bairros.ndjson

#renomeia e filtra propriedades
ndjson-map 'd.properties={codigo:d.properties.CODIGO, tipo:"bairro", nome: d.properties.NOME, area:d.properties.AREA, codigo_regional:d.properties.CD_REGIONA, nome_regional:d.properties.NM_REGIONA},d' \
	< $DIR/bairros.ndjson \
	> $DIR/bairros_renamed.ndjson

# remove o arquivo antigo e substitui pelo com propriedades renomeadas
rm $DIR/bairros.ndjson
mv $DIR/bairros_renamed.ndjson $DIR/bairros.ndjson

# transforma o ndjson em geo novamente
ndjson-reduce < $DIR/bairros.ndjson \
	| ndjson-map '{type: "FeatureCollection", features: d}' \
	> $DIR/bairros.geo.json

# transforma o geo em topo
geo2topo bairros=$DIR/bairros.geo.json > $DIR/bairros.topo.json

# simplifica o topo
toposimplify -S $S_VALUE \
	< $DIR/bairros.topo.json \
	> $DIR/bairros_quant.topo.json

topoquantize 1e5 \
	$DIR/bairros_quant.topo.json \
	> $DIR/bairros.topo.json

#finaliza a operacao
mv $DIR/bairros.topo.json json/bairros.topo.json
mv $DIR/bairros.geo.json json/bairros.geo.json
rm -R $DIR