function Areas (name,topo) {
	
	var self = this;

	this.url = topo.url;
	this.group = topo.name;
	this.projection;
	this.path;
	this.svg;
	this.name = name;
	this.raw;
	this.root;
	this.colorScale;

	this.maxValue;
	this.minValue;

	this.values = {};

	this.addSvg = function addSvg(svg){
		self.svg = svg;	
		self.svg.append("g").attr("class",name);
		self.root = svg.select("g."+name);
	}

	this.load = function load(){
		
		return new Promise(
			function(resolve, reject) {
				d3.json(self.url, function(error, data) {
					if (error){
						reject(error);
					}

					var elements = topojson.feature(data, data.objects[self.group]).features;

					self.raw = elements;
					elements.forEach(function(e){
						e.value = 0;
					})

					self.root
						.selectAll("path")
						.data(elements)
						.enter()
						.append("path")
						.attr("fill", "none")
						.attr("stroke", "none")
						.attr("d", self.path);
						// .on("mouseover",function(d){console.log(d.properties.nome);})
						
					resolve(self);
				});
			}
		);		
	}

	this.update = function update(){
		
		self.maxValue = d3.max(self.raw,function(d){return d.value});
		self.minValue = d3.min(self.raw,function(d){return d.value});

		self.colorScale
			.domain([self.minValue, self.maxValue]);

		var old = self.root
			.selectAll("path")
			.data(self.raw);

		
		old
		.attr("stroke", function(d){ return self.colorScale(d.value);})
		.attr("fill", function(d){ return self.colorScale(d.value);});
			
		self.root.exit().remove();
	}
}