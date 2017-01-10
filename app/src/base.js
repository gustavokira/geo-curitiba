function Base (svg) {
	
	var self = this;

	this.url = "data/contorno_de_curitiba.topo.json";
	this.projection;
	this.path;
	this.raw;
	
	this.svg = svg;
	this.svg.append("g").attr("class","base");
	this.root = svg.select("g.base");

	this.children = [];

	this.addChild = function addChild(child){
		self.children.push(child);
		child.addSvg(self.svg);
	}

	this.load = function load(){
		

		var p =  new Promise(
			function(resolve, reject) {
				d3.json(self.url, function(error, data) {
					if (error){
						reject(error);
					}
					curitiba = topojson.feature(data, data.objects.curitiba);

					self.raw = curitiba;

					self.projection = d3.geoMercator()
						.rotate([0, 0])
						.fitSize([width, height],curitiba);

					self.path = d3.geoPath()
						.projection(self.projection);

					self.root
						.append("path")
						.datum(curitiba)
						.attr("fill", "none")
						.attr("d", self.path);

					resolve(self);
				});
			}
		);	

		return p.then(function(data){
			var promises = [];

			self.children.forEach(function(c){
				c.path = data.path;
				promises.push(c.load());
			});

			return Promise.all(promises);

		},function(err){
			return Promise.reject(err);
		})	
	}

	this.update = function update() {
		self.root.select("path")
			.attr("fill", "#3ff")
			.attr("d", self.path);

		self.root.exit().remove();
	}
}