function Slider(name,height,width){

  var self = this;

  this.min = 0;
  this.max = 5;

  this.updateCb;
  this.width = width;
  this.innerWidth;
  this.name = name;
  this.height = height;
  this.svg;
  this.slider;
  this.scale = d3.scalePow().exponent(1/2);
  this.ticks = 5;

  self.margin = {right: 15, left: 15};

  this.init = function init(){
    self.innerWidth = self.width - self.margin.left - self.margin.right;
      
      self.x = self.scale
      .domain([this.min, this.max])
      .range([0, this.innerWidth])
      .clamp(true);

       self.svg = d3.select("body").append("svg")
      .attr("class","slider")
      .attr("id",self.name)
      .attr("width", self.width)
      .attr("height", self.height);


    
  self.slider = self.svg.append("g")
    .attr("class", "container")
    .attr("transform", "translate(" + self.margin.left + "," + self.height / 2 + ")");

     self.slider.append("line")
    .attr("class", "track")
    .attr("x1", self.x.range()[0])
    .attr("x2", self.x.range()[1])
  .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
    .attr("class", "track-inset")
  .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
    .attr("class", "track-overlay")
    .call(d3.drag()
        .on("start.interrupt", function() { self.slider.interrupt(); })
        .on("start drag", function() { 
          self.preUpdate(self.x.invert(d3.event.x)); 
        })
        .on("end", function() { 
        }))

      self.slider.insert("g", ".track-overlay")
    .attr("class", "ticks")
    .attr("transform", "translate(0," + 18 + ")")
  .selectAll("text")
  .data(self.x.ticks(self.ticks))
  .enter().append("text")
    .attr("x", self.x)
    .attr("text-anchor", "middle")
    .text(function(d) { return d + ""; });

    self.handle = self.slider.insert("circle", ".track-overlay")
    .attr("class", "handle")
    .attr("r", 9);

  self.slider.transition() // Gratuitous intro!
    .duration(750)
    .tween("hue", function() {
      var i = d3.interpolate(0, 0.5);
      return function(t) { self.moveSlider(i(t)); };
    });
  }



  


 

  


    

    self.preUpdate = function preUpdate(h) {
      self.moveSlider(h);
      self.updateCb(h);
    }

  self.moveSlider = function(h){
    self.handle.attr("cx", self.x(h));
  }


    


}















