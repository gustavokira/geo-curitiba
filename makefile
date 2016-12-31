all: 
	# rm ctba-bairros-original.geo.json
	ogr2ogr  -f "GeoJSON" -t_srs crs:84 ctba-bairros-original.geo.json DIVISA_DE_BAIRROS/DIVISA_DE_BAIRROS.shp
	geoproject 'd3.geoMercator().rotate([0, 0]).fitSize([960, 960], d)' < ctba-bairros-original.geo.json > ctba-bairros-transformed.geo.json
	geo2topo bairros=ctba-bairros-transformed.geo.json > ctba-bairros-transformed.topo.json
	toposimplify -p 1 -f < ctba-bairros-transformed.topo.json > ctba-simple-bairros-transformed.topo.json
	topoquantize 1e5 ctba-simple-bairros-transformed.topo.json > ctba-bairros.topo.json

	# topo2geo bairros=ctba-bairros.geo.json < ctba-bairros.topo.json
	# geo2svg -w 960 -h 960 < ctba-bairros.geo.json > ctba-bairros.svg

	# rm ctba-regionais-original.geo.json
	# ogr2ogr  -f "GeoJSON" -t_srs crs:84 ctba-regionais-original.geo.json DIVISA_DE_REGIONAIS/DIVISA_DE_REGIONAIS.shp
	# geoproject 'd3.geoMercator().rotate([0, 0]).fitSize([960, 960], d)' < ctba-regionais-original.geo.json > ctba-regionais-transformed.geo.json
	# geo2topo regionais=ctba-regionais-transformed.geo.json > ctba-regionais-transformed.topo.json
	# toposimplify -p 1 -f < ctba-regionais-transformed.topo.json > ctba-simple-regionais-transformed.topo.json
	# topoquantize 1e5 ctba-simple-regionais-transformed.topo.json > ctba-regionais.topo.json
	# topo2geo regionais=ctba-regionais.geo.json < ctba-regionais.topo.json
	# geo2svg -w 960 -h 960 < ctba-regionais.geo.json > ctba-regionais.svg

	