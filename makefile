all: svg

toGeoJson:
	ogr2ogr  -f "GeoJSON" -t_srs crs:84 ctba-bairros.geo.json DIVISA_DE_BAIRROS/DIVISA_DE_BAIRROS.shp
	# shp2json DIVISA_DE_BAIRROS/DIVISA_DE_BAIRROS.shp -o ctba-bairros.geo.json

transform: toGeoJson
	geoproject 'd3.geoMercator().rotate([0, 0]).fitSize([960, 960], d)' < ctba-bairros.geo.json > ctba-bairros-transformed.geo.json
	# geoproject 'd3.geoConicEqualArea().parallels([25, 25.5]).rotate([0, 0]).fitSize([960, 960], d)' < ctba-bairros.geo.json > ctba-bairros-transformed.geo.json


toTopo: transform
	geo2topo bairros=ctba-bairros-transformed.geo.json > ctba-bairros-transformed.topo.json
	# geo2topo bairros=ctba-bairros.geo.json > ctba-bairros-transformed.topo.json

svg: toTopo
	geo2svg -w 960 -h 960 < ctba-bairros-transformed.topo.json > ctba-bairros-transformed.svg
	# geo2svg -w 960 -h 960 < ctba-bairros.geo.json > ctba-bairros.svg