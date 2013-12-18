
function createAverage(elem, min, max, avg, class_assign, i) {
	// Funció que passant-li el contenidor (elem) i 3 valors: min, max, avg ens 
	// pintarà un cercle pintant la part proporcional de avg respecte min - max.
	var iWidthCircle = 35, margin = 50;
	
	var width = 100,
	    height = 100,
	    τ = 2 * Math.PI;
	
	var arc = d3.svg.arc()
	    .innerRadius(iWidthCircle)
	    .outerRadius(iWidthCircle+3)
	    .startAngle(0);

	var item = "lang_"+i;
	var svg = d3.select("#"+elem+" ul li."+item).append("svg")
	    .attr("width", width)
	    .attr("height", height)
	    .attr("class","svg_cercles")
	    .append("g")
	    .attr("transform", "translate(" + margin + "," + margin +")");
	    
	
	var background = svg.append("path")
	    .datum({endAngle: τ})
	    //.attr('class', 'path_background')
	    .attr('class', class_assign+'_back')
	    .attr("d", arc);
	
	var foreground = svg.append("path")
	    .datum({endAngle: τ})
	    //.attr('class', 'path_foreground')
	    .attr('class', class_assign+'_front')
	    .attr("d", arc);
	    
	svg.append("text")
	    .attr("text-anchor", "middle")
	    .attr("transform", "scale(1.2)")
		.attr("dy", ".35em")
	    
	var text = svg.select("text")
		.attr('class','txt_cercle');
	
	foreground.transition()
	    .duration(1000)
	    .call(arcTween, (avg * τ/max))
	    .each("end", myCallback);
	
	function myCallback() {
	    //foreground.transition().duration(500).ease("elastic").attr("transform", "scale(1.1)");
	    //background.transition().duration(500).ease("elastic").attr("transform", "scale(1.1)");
	    //text.transition().duration(500).ease("elastic").attr("transform", "scale(1.1)");
	}
	
	function arcTween(transition, newAngle) {
	    transition.attrTween("d", function(d) {
	        var interpolate = d3.interpolate(0, newAngle);
	        var interpolateValue = d3.interpolateNumber(0, newAngle);
	        
	        return function(t) {
	            d.endAngle = interpolate(t);
	            var textLabels = text
	                .text( d3.format(".1f")(interpolateValue(t) * max / τ) +' %' );
	            return arc(d);
	        };
	    });
	}
}