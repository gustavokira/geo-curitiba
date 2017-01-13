function Table(){

  var self = this;
  this.elements;
  this.colorScale;
  this.valueScale;
  this.updateCb;

  this.update = function update(elements){

    var max = d3.max(elements, function(b) { return b.value;} );

    var old = d3.select("#table").selectAll("p")
    .data(elements)
    .selectAll("svg").selectAll(".mini-bar")
    
    old
      .attr("fill",function(d){ return self.colorScale(d.value);})
      .attr("width",function(d){
        return (5+(95*(self.valueScale(100*d.value/max)/self.valueScale(100))))+"%";
      })
  }



  this.init = function init(){
    
    var max = d3.max(self.elements, function(b) { return b.value;} );
    
    var ps = d3.select("#table").selectAll("p")
      .data(self.elements)
      .enter()
      .append("p");

    ps.append("svg")
      .attr("width","100%")
      .attr("height",2)
      .append("rect")
        .attr("class","mini-bar")
        .attr("width","100%")
      .attr("height",2)
      .attr("fill",function(d){ return "#333";});

    ps.append("div")
      .text(function(d){ return d.nome+" ";})

    ps
      .append("input")
      .attr("value",function(d){ return d.value;})
      .on("input",function(d){
        d.value = parseInt(this.value);
        self.updateCb();
      });
  }

}




