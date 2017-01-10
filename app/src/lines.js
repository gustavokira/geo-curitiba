function Lines (name,topo) {
	
	var self = this;

	this.url = topo.url;
	this.group = topo.name;
	this.projection;
	this.path;
	this.name = name;
	this.raw;
	this.svg;
	this.root;

	this.values = {
		stroke:{
			color:"#f00",
			width:0.1,
			opacity:1
		}
	};

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

					var elements = topojson.feature(data, data.objects[self.group]);

					self.raw = elements;

					self.root
						.append("path")
						.datum(elements)
						.attr("fill", "none")
						.attr("stroke", function(d){ return self.values.stroke.color;})
						.attr("stroke-width", self.values.stroke.width)
						.attr("stroke-opacity", self.values.stroke.opacity)
						.attr("d", self.path);

					resolve(self);
				});
			}
		);		
	}

	this.update = function update(){

		var old = self.root
			.selectAll("path")
			.datum(self.raw);

		
		old.attr("stroke", function(d){ return self.values.stroke.color;})
			.attr("stroke-width", self.values.stroke.width)
			.attr("stroke-opacity", self.values.stroke.opacity)
			
		self.root.exit().remove();

	}
}