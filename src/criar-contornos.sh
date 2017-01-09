#!/bin/bash

DIR=tempgeo
S_VALUE=0.1
mkdir $DIR
ogr2ogr -f "GeoJSON" -t_srs crs:84 $DIR/divisa_de_bairros.geo.json data/DIVISA_DE_BAIRROS/DIVISA_DE_BAIRROS.shp
geo2topo bairros=$DIR/divisa_de_bairros.geo.json > $DIR/divisa_de_bairros_original.topo.json

ogr2ogr -f "GeoJSON" -t_srs crs:84 $DIR/divisa_de_regionais.geo.json data/DIVISA_DE_REGIONAIS/DIVISA_DE_REGIONAIS.shp
geo2topo regionais=$DIR/divisa_de_regionais.geo.json > $DIR/divisa_de_regionais_original.topo.json

ogr2ogr -f "GeoJSON" -t_srs crs:84 $DIR/divisa_de_zonas_eleitorais.geo.json data/TRE2016_DIVISA_ZONA_ELEITORAL/TRE_DIVISA_ZONA_ELEITORAL.shp
geo2topo zonas=$DIR/divisa_de_zonas_eleitorais.geo.json > $DIR/divisa_de_zonas_eleitorais_original.topo.json

echo "criar malha de divisa e contorno de Curitiba"
topomerge --mesh bairros=bairros \
	< $DIR/divisa_de_bairros_original.topo.json \
	> $DIR/divisa_e_contorno_de_bairros_mesh.topo.json

toposimplify -S $S_VALUE \
	< $DIR/divisa_e_contorno_de_bairros_mesh.topo.json \
	> $DIR/divisa_e_contorno_de_bairros_quant.topo.json

topoquantize 1e5 \
	$DIR/divisa_e_contorno_de_bairros_quant.topo.json \
	> $DIR/divisa_e_contorno_de_bairros.topo.json

echo "criar malha de divisa entre bairros de Curitiba"
topomerge --mesh -f 'a !== b' bairros=bairros \
	< $DIR/divisa_de_bairros_original.topo.json \
	> $DIR/divisa_de_bairros_mesh.topo.json

toposimplify -S $S_VALUE \
	< $DIR/divisa_de_bairros_mesh.topo.json \
	> $DIR/divisa_de_bairros_quant.topo.json

topoquantize 1e5 \
	$DIR/divisa_de_bairros_quant.topo.json \
	> $DIR/divisa_de_bairros.topo.json

echo "criar malha de divisa entre regionais de Curitiba"
topomerge --mesh -f 'a !== b' regionais=regionais \
	< $DIR/divisa_de_regionais_original.topo.json \
	> $DIR/divisa_de_regionais_mesh.topo.json

toposimplify -S $S_VALUE \
	< $DIR/divisa_de_regionais_mesh.topo.json \
	> $DIR/divisa_de_regionais_quant.topo.json

topoquantize 1e5 \
	$DIR/divisa_de_regionais_quant.topo.json \
	> $DIR/divisa_de_regionais.topo.json	

echo "criar malha de contorno de Curitiba"
topomerge --mesh -f 'a == b' bairros=bairros \
	< $DIR/divisa_de_bairros_original.topo.json \
	> $DIR/contorno_de_curitiba_mesh.topo.json

toposimplify -S $S_VALUE \
	< $DIR/contorno_de_curitiba_mesh.topo.json \
	> $DIR/contorno_de_curitiba_quant.topo.json

topoquantize 1e5 \
	$DIR/contorno_de_curitiba_quant.topo.json \
	> $DIR/contorno_de_curitiba.topo.json



echo "criar malha de divisa e contorno de Curitiba"
topomerge --mesh zonas=zonas \
	< $DIR/divisa_de_zonas_eleitorais_original.topo.json \
	> $DIR/divisa_e_contorno_de_zonas_eleitorais_mesh.topo.json

toposimplify -S $S_VALUE \
	< $DIR/divisa_e_contorno_de_zonas_eleitorais_mesh.topo.json \
	> $DIR/divisa_e_contorno_de_zonas_eleitorais_quant.topo.json

topoquantize 1e5 \
	$DIR/divisa_e_contorno_de_zonas_eleitorais_quant.topo.json \
	> $DIR/divisa_e_contorno_de_zonas_eleitorais.topo.json

# echo "criar malha de divisa entre zonas eleitorais de Curitiba"
# topomerge --mesh -f 'a !== b' zonas=zonas \
# 	< $DIR/divisa_de_zonas_eleitorais_original.topo.json \
# 	> $DIR/divisa_de_zonas_eleitorais_mesh.topo.json

# toposimplify -S $S_VALUE \
# 	< $DIR/divisa_de_zonas_eleitorais_mesh.topo.json \
# 	> $DIR/divisa_de_zonas_eleitorais_quant.topo.json

# topoquantize 1e5 \
# 	$DIR/divisa_de_zonas_eleitorais_quant.topo.json \
# 	> $DIR/divisa_de_zonas_eleitorais.topo.json		

cp $DIR/divisa_e_contorno_de_bairros.topo.json json/divisa_e_contorno_de_bairros.topo.json
cp $DIR/divisa_de_bairros.topo.json json/divisa_de_bairros.topo.json
cp $DIR/divisa_de_regionais.topo.json json/divisa_de_regionais.topo.json
cp $DIR/contorno_de_curitiba.topo.json json/contorno_de_curitiba.topo.json
# cp $DIR/divisa_de_zonas_eleitorais.topo.json json/divisa_de_zonas_eleitorais.topo.json 
cp $DIR/divisa_e_contorno_de_zonas_eleitorais.topo.json json/divisa_e_contorno_de_zonas_eleitorais.topo.json 
rm -R $DIR/