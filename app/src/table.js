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
      .attr("fill",function(d){ return self.colorScale(d.value);});

    // old.select("svg").select("rect.mini-bar")
      // 
    old
    .attr("width",function(d){
      console.log((100*self.valueScale(d.value/max)))
      return ((100*self.valueScale(d.value/max)))+"%";
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
      // .attr("width",function(d){
      //   console.log(d.nome);
      //   console.log(d.value);
      //   console.log(currentState.scale(d.value));
      //   return Math.round(d.value/max)+"%";
      // })
      .attr("height",2)
      .attr("fill",function(d){ return "#333";});

    ps.append("div")
      .text(function(d){ return d.nome+" ";})

    ps
      .append("input")
      .attr("value",function(d){ return d.value;})
      .on("input",function(d){
        d.value = this.value;
        self.updateCb();
      });
  }

}




