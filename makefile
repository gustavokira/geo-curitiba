all: clean toSvg

toGeoJson: 
	ogr2ogr  -f "GeoJSON" -t_srs crs:84 ctba-bairros-original.geo.json DIVISA_DE_BAIRROS/DIVISA_DE_BAIRROS.shp
	
transform: toGeoJson
	geoproject 'd3.geoMercator().rotate([0, 0]).fitSize([960, 960], d)' < ctba-bairros-original.geo.json > ctba-bairros-transformed.geo.json
	
toTopo: transform
	geo2topo bairros=ctba-bairros-transformed.geo.json > ctba-bairros-transformed.topo.json

simplifyTopo: toTopo
	toposimplify -p 1 -f < ctba-bairros-transformed.topo.json > ctba-simple-bairros-transformed.topo.json

quantizeTopo: simplifyTopo
	topoquantize 1e5 ctba-simple-bairros-transformed.topo.json > ctba-bairros.topo.json

toSvg: quantizeTopo
	topo2geo bairros=ctba-bairros.geo.json < ctba-bairros.topo.json
	geo2svg -w 960 -h 960 < ctba-bairros.geo.json > ctba-bairros.svg

clean:
	rm ctba-bairros-original.geo.json