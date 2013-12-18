	jQuery.fn.initHeader = function() {
	/* 
		Controls que es duen a terme mitjançant l'scroll down de la pàgina. Quan ho fem, hem de baixar el menú del header (#header_main nav) i també controlem el visor del login del partner (#main_login)
	*/
	$(window).scroll(function() {
	    if ($(this).scrollTop() > 60) 
	    {
			$("#header_main nav").css({ "position": "fixed", "top": 0 });
			$("#breadcrumb").css({ "margin-top": "0px"});
	    } else {
	        $("#header_main nav").css({ "position": "relative"});
	        $("#breadcrumb").css({ "margin-top": "0px"});
	    } 
	}); 	
};

// Funcions per fer passar de valors Hexadecimals a RGB
function hexToR(h) {return parseInt((cutHex(h)).substring(0,2),16)}
function hexToG(h) {return parseInt((cutHex(h)).substring(2,4),16)}
function hexToB(h) {return parseInt((cutHex(h)).substring(4,6),16)}
function cutHex(h) {return (h.charAt(0)=="#") ? h.substring(1,7):h}


jQuery.fn.initSidebar = function() {
	// Funció que ens permetrà inicialitzar tots els efectes/events del mòdul sidebar
	
	// Variable que usem per detectar si el sidebar està obert o tancat.
	var hide_nav_status = true;
	
	/* Event de fer el show/hide del menú. Comportarà varis aspectes: 
		1. Amagar el sidebar
		2. Moure la barra clicable que permet executar l'event (#hide_nav)
		3. Donar al content_main el 100% d'ample
	*/
	$('#hide_nav').click(function(e) {
		e.preventDefault();
		if (hide_nav_status) {
			$(this).parent().find('#sidebar').animate({
				opacity: '0'
			},100,function() {
				$(this).parent().find('#sidebar').toggle();
				$('#hide_nav').find('i').removeClass('icon-double-angle-left').addClass('icon-double-angle-right');
				$('#hide_nav').removeClass('showMenu').addClass('hideMenu');
				$("#breadcrumb").removeClass('breadcrumb_open').addClass('breadcrumb_close');
				$("#content_main").removeClass('content_main_open').addClass('content_main_close');
				
			});
			
			hide_nav_status = false;
		}else{
			$('#hide_nav').removeClass('hideMenu').addClass('showMenu');
			$("#breadcrumb").removeClass('breadcrumb_close').addClass('breadcrumb_open');
			$("#content_main").removeClass('content_main_close').addClass('content_main_open');
			$('#hide_nav').find('i').removeClass('icon-double-angle-right').addClass('icon-double-angle-left');
			$(this).parent().find('#sidebar').toggle();
			$(this).parent().find('#sidebar').animate({opacity: '1'}, 200, function() {});
			
			hide_nav_status = true;
		} 
	});

	var cm_left = $("#content_main").offset();
	$(window).scroll(function() {
	    if ($(this).scrollTop() > 85) 
	    {
	    	
		    $("#sidebar").css({ "position": "fixed", "top": 41 });
		    $("#hide_nav").css({ "position": "fixed", "top": 41 });
		    //$("#content_main").css({ "margin-left": "260px"});
	    }else{
		    $("#sidebar").css({ "position": "absolute", "top":0 });
		    $("#hide_nav").css({ "position": "absolute", "top":0 });
		    //$("#content_main").css({ "margin-left": "2.12766%" });
	    }
	});	

	
	/*
		"Amaguem" les opcions de 2n grau del menú del sidebar 
	*/
	$('.child').hide();
	$('li.parent').click(function(e){
		e.preventDefault();
	    $(this).children('.child').slideToggle('fast');     
	}).children('.child').click(function (event) {
	    event.stopPropagation();
	});
};

jQuery.fn.initTableSorter = function() {
	/*
		Apliquem el plugin de jquery tablesorter a les taules
	*/
	$("table.tablesorter").tablesorter({
		theme : "bootstrap",
		widthFixed: true,
		headerTemplate : '{content} {icon}', // new in v2.7. Needed to add the bootstrap icon!
	
	    // widget code contained in the jquery.tablesorter.widgets.js file
	    // use the zebra stripe widget if you plan on hiding any rows (filter widget)
	    widgets : [ "uitheme", "zebra", "filter" ],
	
		widgetOptions : {
			// using the default zebra striping class name, so it actually isn't included in the theme variable above
			// this is ONLY needed for bootstrap theming if you are using the filter widget, because rows are hidden
			zebra : ["even", "odd"],
								
			// reset filters button
			filter_reset : ".reset"
		}
	});	
};

jQuery.fn.initColorPicker = function() {
	$('.colorpicker').ColorPicker({
		onSubmit: function(hsb, hex, rgb, el) {
			$(el).val(hex);
			$(el).ColorPickerHide();
			$(el).applyWidget();
		},
		onBeforeShow: function () {
			$(this).ColorPickerSetColor(this.value);
		}
	})
	.bind('keyup', function(){
		$(this).ColorPickerSetColor(this.value);
	});
};

jQuery.fn.applyWidget = function() {
	var col_hex = '#'+$(this).val();
	var r = hexToR(col_hex);
	var g = hexToG(col_hex);
	var b = hexToB(col_hex);
	switch($(this).attr('id')){
		case 'i_color1':
			$("#main_login_example").css({ 'background-color' : 'rgba('+r+','+g+','+b+',0.7)'});
			break;
		case 'i_color2':
			var color3;
			var color2 = col_hex;
			
			if ($("#i_color3").val() == "") color3 = "#000000";
			
			 
			break;
		case 'i_color3':
			break;
		case 'i_color4':
			$("#main_login_example label").css({ 'color' : col_hex });
			break;	
	}	
};

jQuery.fn.initMain = function() {	
	/*
		Botó per afegir items al llistat de Moduls. Aquesta funció fa referència al 
		component del formulari format per dos select-box aniuats.
	*/
	$('#add').click(function() {  
		return !$('#select_1 option:selected').clone().appendTo('#select_2');
	});  
	$('#remove').click(function() {  
		return !$('#select_2 option:selected').remove();
	});  
	$('#add2').click(function() {  
		return !$('#select_3 option:selected').clone().appendTo('#select_4');
	});  
	$('#remove2').click(function() {  
		return !$('#select_4 option:selected').remove(); 
	});  
	
	if ($("#content_main").height() > $(window).height()) {
		$("aside").height($("#content_main").height() + 150);
		$("#hide_nav").height($("#content_main").height() + 150);	
	}else{
		$("aside").height($(window).height() - 130);
		$("#hide_nav").height($(window).height() - 130);	
	}

};

jQuery.fn.iniLogin = function() {
	
	

	/*
	$('#vertical_menu_list').hide();
	$("#vertical_menu a").on('click', function(){
		$("span").toggleClass('arrow_up arrow_down');  
		$(this).parent().find('#vertical_menu_list').slideToggle('fast');
	});
	*/
};


/* 		  
* Funció que passant-li els paràmetres d'informació (data), genera la gràfica 
* lineal corresponent.
*/
function draw(data, wraper, obj, graph_type)
{
	var parseDate = d3.time.format("%Y-%m-%d %H:%M:%S").parse;
			
	var colors = d3.scale.category20();
	keyColor = function(d, i) {return colors(d.key)};
	
	nv.addGraph(function() {
		obj			
			.x(function(d) { return parseDate(d.label);	})
			.y(function(d) { return parseFloat(d.value); })
			// Delimitem els minims/maxims que es mostraran en l'eix y.
			//.forceY([0,])
			.color(keyColor)
			//.tooltips(false);
			/*showTooltip = function(e) {
				var offsetElement = document.getElementById(selector.substr(1)),
					left = e.pos[0] + offsetElement.offsetLeft,
					top = e.pos[1] + offsetElement.offsetTop,
					formatX = graph.xAxis.tickFormat(),
					formatY = graph.yAxis.tickFormat(),
					x = formatX(graph.x()(e, e.pointIndex)),
					//x = formatX(graph.x()(e.point)),
					y = formatY(graph.y()(e.point)),
					content = tooltip(e.series.key, x, y, e, graph);
					nv.tooltip.show([left, top], content);
			}*/;

		obj.xAxis
			.tickFormat(function (d) { return d3.time.format('%d/%m')(new Date(d)) });

		if (graph_type == "barres-lineal")
		{
			obj.y1Axis
				.tickFormat(d3.format(',.2f'));
			
			obj.y2Axis
			    .tickFormat(function(d) { return d3.format(',.2f')(d) });
			
			obj.bars.forceY([0]).padData(false);				
		}else{
			obj.yAxis
			.tickFormat(d3.format(',.1f'));	
		}
		
		d3.select(wraper + ' svg')
			.datum(data)
			.transition().duration(1000).call(obj);


		d3.select('body')
			.selectAll('.nv-x.nv-axis > g')
			.selectAll('g')
			.selectAll('text')
			.attr('transform', function(d) { return 'translate (-13, 15) rotate(-45 0,0)' });

		nv.utils.windowResize(obj.update);

		//obj.dispatch.on('stateChange', function(e) { nv.log('New State:', JSON.stringify(e)); });

		return obj;
	});
}



jQuery.fn.d3LoadCSV = function( options ) {
	var chart;
	var elem 		= $(this).attr("id");
	var settings 	= $.extend({
		// Paràmetres per defecte.
		id 				: 0,
		title 			: '',
		file			: null,
		rango			: 'btn_graphMonth',
		graph_type 		: 'lineal',
		myColors 		: ["#4b9660", "#99cc78"],
		data 			: ''
		
	}, options );
	
	$('#'+elem).html('<h4></h4><div class="svg_wraper"><svg></svg><div class="few_stats"><h5>A Few Stats</h5><ul></ul></div></div>');
	
	// BOTONS PER BAIXARSE TAULES DE DADES
	$('#'+elem).find("h4").html(settings.title + "<ul class='chart-options'><li><a href='#' class='chart-reload chart-more-info'><i class='icon-refresh'></i></a></li><li><a href='#' class='chart-download chart-more-info'><i class='icon-print'></i></a></li></ul>");
	
	
	if (settings.data)
	{
		ChangeRang();
	}else{	
		initialize();	
	}
	// Situem els botons de rang de data
	var data1, datum;
	
	function initialize() {
		$('#'+elem).find("svg").html("");	
		
		// A partir d'aquí comença la llibreria D3
		d3.csv(settings.file, function(data) {
		    
		    var parseDate 	= d3.time.format("%Y-%m-%d %H:%M:%S").parse;
			var colors 		= d3.scale.category20();
		    var keyColor 	= function(d, i) {return colors(d.key)};
		    
			//data1 = d3.csv.parse(data);
			data1 = data;
			data1.sort(function(a,b) {return parseDate(b.data)-parseDate(a.data);});
			
		    data1.forEach(function(d) {
		        d.label = parseDate(d.data);
		        d.value = +d.value;
		    });
			
			// volquem la data dins d'una variable local de l'objecte per després no haver de tornar a fer la consulta la fitxer.
			settings.data = data1;
			
			d3.scale.myColors = function() {
				return d3.scale.ordinal().range(settings.myColors);
			};
			
		    nv.addGraph(function() {
				data 	= csv2json(data1, settings.title, settings.rango);
				datum = data;
				

			var datum_values = d3.values(datum[0].values);
			// Cridem la funció perq ens generi els cercles.
			createAverage(elem, 0, d3.max(datum_values, function(d) { return d.value; }), d3.min(data1, function(d) { return d.value; }));
			createAverage(elem, 0, d3.max(datum_values, function(d) { return d.value; }), d3.mean(data1, function(d) { return d.value; }));
			createAverage(elem, 0, d3.max(datum_values, function(d) { return d.value; }), d3.max(data1, function(d) { return d.value; }));

				
				switch(settings.graph_type)
				{
					case 'lineal':
						var chart 	= nv.models.lineChart();		
						break;
					case 'barres':
						var chart = nv.models.discreteBarChart();
						break;
				}
			    
			    chart
			    	.x(function(d) { return d.label })
			        .y(function(d) { return d.value })
			        .tooltips(true)
			        .forceY([,26.50])
			        /*
			        .tooltipContent(function(key, y, e, graph) { 
			        	var day = new Date(graph['point'].label);
			        	var final_date = day.getDay() + "/" + day.getMonth() + "/" + day.getFullYear() + " " + day.getHours() + ":" + day.getMinutes() + ":" + day.getSeconds();
			        	return "<h3> Date: " + final_date + " <br/> Measure: " + e +  "</h3>";
			        	
			        })
			        */
			        .color(d3.scale.myColors().range());
					//.color(keyColor);
				
				if (settings.graph_type == "barres-lineal")
				{
					chart.y1Axis.tickFormat(d3.format(',.2f'));
					chart.y2Axis.tickFormat(function(d) { return d3.format(',.2f')(d) });
					chart.bars.forceY([0]).padData(false);				
				}else if (settings.graph_type == "barres"){
						
				}else{
					chart.yAxis
					.ticks(16)
					.tickFormat(d3.format(',.2f'));						
				}

				switch(settings.rango) {
					case 'btn_graphWeek':
						chart.xAxis
							.tickFormat(function (d) { return d3.time.format('%d/%m/%y')(new Date(d)) })
							.ticks(d3.time.days, 7)
							;

						break;
					
					case 'btn_graphToday':
						chart.xAxis
							.tickFormat(function (d) { return d3.time.format('%H:%M')(new Date(d)) })
							.ticks(d3.time.hours.range, 1)
							;	
						break;
						
					default:
						chart.xAxis
							.ticks(d3.time.month, 1)
							.tickFormat(function (d) { return (d3.time.format('%d/%m/%y')(new Date(d)) + " " + d3.time.format('%H:%M')(new Date(d)))});
				}				
				
				d3.select('#'+elem+' svg')
					.datum(data)
					.transition().duration(250)
					.call(chart);
				
				nv.utils.windowResize(chart.update);
				
				
				if (settings.rango == "btn_graphMonth") {
					d3.select('#'+elem+' svg')
						.selectAll('.nv-x.nv-axis > g')
						.selectAll('text')
						.attr('transform', function(d) { return 'translate (-35, 15) rotate(-25 0,0)' });
						
				}

				$("#hide_nav").click(function() {
					setTimeout(function() {
						d3.select('#'+elem+' svg').call(chart).transition().duration(250);
					}, 200);
				});
				
				
				
				
				$(".chart-reload").click(function(e) {
					e.preventDefault();
					$('#'+elem).html("");
						//$('#'+elem).html('<h4></h4><div class="svg_wraper"><svg></svg><div class="few_stats"><h5>A Few Stats</h5><ul></ul></div></div>');
						$('#'+elem).html('<h4></h4><div class="svg_wraper"><svg></svg></div>');
						// BOTONS PER BAIXARSE TAULES DE DADES
						/*
						$('#'+elem).find("h4").html(settings.title + "<ul class='chart-options'><li><a href='#' class='chart-reload chart-more-info'><i class='icon-refresh'></i></a></li><li><a href='#' class='chart-download chart-more-info'><i class='icon-print'></i></a></li></ul>");		
						*/
						$('#'+elem).find("h4").html(settings.title);
						initialize();
				});
				/*
				d3.select(".chart-reload")
					.on('click', function(event) {
						d3.event.preventDefault();
						d3.event.stopPropagation();
						console.log(elem);
						$('#'+elem).html("");
						$('#'+elem).html('<h4></h4><div class="svg_wraper"><svg></svg><div class="few_stats"><h5>A Few Stats</h5><ul></ul></div></div>');
	// BOTONS PER BAIXARSE TAULES DE DADES
	$('#'+elem).find("h4").html(settings.title + "<ul class='chart-options'><li><a href='#' class='chart-reload chart-more-info'><i class='icon-refresh'></i></a></li><li><a href='#' class='chart-download chart-more-info'><i class='icon-print'></i></a></li></ul>");
						//initialize();
					});
				*/	
				
				/*
				setInterval(function () {					
					// LLEGIM DATA I LI SUMEM 10 SEGONS
					var data_aux = new Date(Date.parse(settings.data[settings.data.length - 1].label));
					var new_data = new Date(parseInt(data_aux.getTime() + 10000));
					var aux = { data : new_data, value : Math.floor((Math.random()*10)+1) }
					
					// push a new data point onto the back	
					settings.data.push(aux);
					
					// pop the old data point off the front
					settings.data.shift();
					
					// redraw the line, and then slide it to the left
					d3.select('.nv-point-paths')
						.selectAll('path')
						.attr("d", 'nv-path-38')
						.attr("transform", null)
						.transition()
						.ease("linear")
						.attr("transform", "translate(" + x(-1) + ")");
					
				}, 7000);
				*/
				
				return chart;
		    });    
		});
	}
	
	function ChangeRang() {
		var data1 = settings.data;
		nv.addGraph(function() {
			data 	= csv2json(data1, settings.title, settings.rango);
			datum = data;
		
		var datum_values = new Array();	
		for (var i = 0; i < datum[0].values.length; i++)
		{
			datum_values[i] = datum[0].values[i].value;
		}	
				
			
			switch(settings.graph_type)
			{
				case 'lineal':
					var chart 	= nv.models.lineChart();		
					break;
				case 'barres':
					var chart = nv.models.discreteBarChart();
					break;
			}
		    
		    chart
		    	.x(function(d) { return d.label })
		        .y(function(d) { return d.value })
		        .tooltips(true)
		        .forceY([,26.50])
		        /*
		        .tooltipContent(function(key, y, e, graph) { 
		        	return "<div class='tooltip'>" + y + " <br/> " + e + "</div>"
		        })
		        */
		        .color(d3.scale.myColors().range());
				//.color(keyColor);
			
			if (settings.graph_type == "barres-lineal")
			{
				chart.y1Axis.tickFormat(d3.format(',.2f'));
				chart.y2Axis.tickFormat(function(d) { return d3.format(',.2f')(d) });
				chart.bars.forceY([0]).padData(false);				
			}else if (settings.graph_type == "barres"){
					
			}else{
				chart.yAxis
				.ticks(16)
				.tickFormat(d3.format(',.2f'));	
			}

			switch(settings.rango) {
				case 'btn_graphWeek':
					chart.xAxis
						.ticks(5)
						.tickFormat(function (d) { return d3.time.format('%d/%m/%y')(new Date(d)) });
					break;
				
				case 'btn_graphToday':
					chart.xAxis
						.ticks(d3.time.minute, 1)
						.tickFormat(function (d) { return d3.time.format('%H:%M')(new Date(d)) });	
					break;
					
				default:
					chart.xAxis
						.ticks(d3.time.month, 1)
						.tickFormat(function (d) { return (d3.time.format('%d/%m/%y')(new Date(d)) + " " + d3.time.format('%H:%M')(new Date(d)))});
			}				
			
			d3.select('#'+elem+' svg')
				.datum(data)
				.transition().duration(250)
				.call(chart);
			
			nv.utils.windowResize(chart.update);
			
			
			if (settings.rango == "btn_graphMonth") {
				d3.select('#'+elem+' svg')
					.selectAll('.nv-x.nv-axis > g')
					.selectAll('text')
					.attr('transform', function(d) { return 'translate (-35, 15) rotate(-25 0,0)' });
					
			}

			$("#hide_nav").click(function() {
				setTimeout(function() {
					d3.select('#'+elem+' svg').call(chart).transition().duration(250);
				}, 200);
			});
			
			// Cridem la funció perq ens generi els cercles.
			/*
			createAverage(elem, 0, d3.max(datum_values), d3.min(datum_values));
			createAverage(elem, 0, d3.max(datum_values), d3.mean(datum_values));
			createAverage(elem, 0, d3.max(datum_values), d3.max(datum_values));
			*/
			return chart;
	    });	
	}	
	
	function csv2json(data, title, rango) {
		// Necessitem dos objectes per poder concatenar tot el csv en un json
		var aux 	= [];
		var aux2 	= [];
		var general = [];
		var cont	= 0;
		var milis_day = 86400000;
		//var dia_act	= new Date(2012, 1, 1);
		var dia_act	= new Date();
		switch(rango) {
			case 'btn_graphToday':
				var dias_rango = 1;
				break;
			
			case 'btn_graphWeek':
				var dias_rango = 7;
				break;
			
			case 'btn_graphMonth':
				var dias_rango = 30;
				break;
		}
		var fecha 		= getRangeDays(dia_act, dias_rango);
		var old_ends 	= getRangeDays(fecha, dias_rango);
		
		// Bucle per tots els elements del csv
		var prev = null, act;
		var aux_date = new Date();
		var aux_date_2 = new Date();
		
		for (var i = 0; i < data.length; i++) {
			if ((data[i].label <= dia_act) && (data[i].label > fecha))
			{	
				act = data[i].label;
				prev = data[i].label;

				aux.push({ "label": data[i].label, "value": +data[i].value });
			}else{
				
				if ((data[i].label <= fecha) && (data[i].label > old_ends))
				{
					act = data[i].label;
					var newday = new Date();
					newday.setTime(parseInt(data[i].label.getTime() + (milis_day * dias_rango)));
					aux2.push({ "label": new Date(newday), "value": +data[i].value });
				}
				prev = data[i].label;
			}
		}
		general.push({"key" : title, "values": aux });
		general.push({"key" : title + "(old)", "values" : aux2});
		return general;		
	}


	function getRangeDays(ts, intervalday) {
		var today_aux = new Date(ts.getTime());
		ms 		= 86400000 * intervalday;
		//ms 	= parseInt(intervalday * 24 * 60 * 60 * 1000);
		dia		= today_aux.getDate();
		mes		= today_aux.getMonth();
		anio	= today_aux.getYear();
		tiempo	= today_aux.getTime();
		total 	= today_aux.setTime(parseInt(tiempo - ms));
		return today_aux;
	}
	
	$.fn.setRango = function(settings) {
		console.log("Set Rango!");
		this.settings = settings
		//initialize();
		ChangeRang();
	}
	
	$.fn.getInfo = function() {
		return settings;
	}	
	
	/*
	function redraw() {
		console.log(datum);
        d3.select('#' + elem + ' svg')
            .datum(datum)
            .transition().duration(500)
            .call(chart);
    }
    */
	
	
	return settings;
	//setInterval(initialize, "10000");
};



function createAverage(elem, min, max, avg, class_assign) {
	// Funció que passant-li el contenidor (elem) i 3 valors: min, max, avg ens 
	// pintarà un cercle pintant la part proporcional de avg respecte min - max.
	var iWidthCircle = 35, margin = 50;
	
	var width = 200,
	    height = 200,
	    τ = 2 * Math.PI;
	
	var arc = d3.svg.arc()
	    .innerRadius(iWidthCircle)
	    .outerRadius(iWidthCircle+5)
	    .startAngle(0);
	
	var svg = d3.select("#"+elem+" .few_stats ul").append("li").append("svg")
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
	    foreground.transition().duration(500).ease("elastic").attr("transform", "scale(1.1)");
	    background.transition().duration(500).ease("elastic").attr("transform", "scale(1.1)");
	    //text.transition().duration(500).ease("elastic").attr("transform", "scale(1.1)");
	}
	
	function arcTween(transition, newAngle) {
	    transition.attrTween("d", function(d) {
	        var interpolate = d3.interpolate(0, newAngle);
	        var interpolateValue = d3.interpolateNumber(0, newAngle);
	        
	        return function(t) {
	            d.endAngle = interpolate(t);
	            var textLabels = text
	                .text( d3.format(".1f")(interpolateValue(t) * max / τ) +' ºC' );
	            return arc(d);
	        };
	    });
	}
}
function ShowStats(elem, item_txt, item_data, symbol, item_class) {
	//console.log(item_txt + ": "+item_data.toString());	
	d3.select("#"+elem+" .few_stats ul")
		.append("li")
		.attr('class','squared '+item_class)
		.html(item_txt+"<span>"+item_data.toString()+symbol+"</span>");	
}

jQuery.fn.onlyD3JS	 = function( options ) {
	var elem 		= $(this).attr("id");
	var settings 	= $.extend({
		// Paràmetres per defecte.
		id 				: 0,
		title 			: '',
		symbol			: 'ºC',
		file			: null,
		// ** CREAR FUNCIÓ **  
		//files			: {'Log_41_M_98.csv', 'Log_41_M_98.csv'},
		files			: {},
		rango			: 'btn_graphMonth',
		graph_type 		:'lineal',
		myColors 		: ["#4b9660", "#99cc78"],
		wraper			: $(this).attr("id"),
		interpolation	: 'cardinal-open'
	}, options );
	
	$('#'+elem).html('<h4></h4><div class="few_stats"><ul></ul></div><div class="svg_wraper"><svg></svg>');	
	//$('#'+elem).find("h4").html(settings.title);
	$('#'+elem).find("h4").html(settings.title + "<ul class='chart-options'><li><a href='#' class='chart-stats chart-more-info'><i class='icon-filter'></i></a></li><li><a href='#' class='chart-reload chart-more-info'><i class='icon-refresh'></i></a></li><li><a href='#' class='chart-download chart-more-info'><i class='icon-print'></i></a></li></ul>");
	
	var showMaxMinAvg = false;
	var formatTime 	= d3.time.format("%d/%m/%Y | %H:%M:%S");
	var parseDate 	= d3.time.format("%Y-%m-%d %H:%M:%S").parse;	
	var margin 		= {top: 20, right: 50, bottom: 30, left: 50},
    width 			= $('#'+elem).width() - margin.left - margin.right,
    height 			= 300 - margin.top - margin.bottom;

	var x0 	= d3.time.scale().range([0, width]);	
	var x1 	= d3.time.scale().range([0, width]);
	var y0 	= d3.scale.linear().range([height, 0]);
	var y1 	= d3.scale.linear().range([height, 0]);
	
	var xAxis = d3.svg.axis()
		.scale(x0)
		.tickFormat(function (d) { return d3.time.format('%d/%m/%y')(new Date(d))});
	
	var xAxis2 = d3.svg.axis()
		.scale(x1)
		.orient("top")
		.tickFormat(function (d) {return d3.time.format('%d/%m/%y')(new Date(d))});		
	
	switch(settings.rango) {	
		case 'btn_graphToday':
			xAxis.ticks(d3.time.day.range, 1);
			xAxis2.ticks(d3.time.day.range, 1);
		break;
		case 'btn_graphWeek':
			xAxis.ticks(d3.time.day.range, 1);
			xAxis2.ticks(d3.time.day.range, 1);
		break;
		case 'btn_graphMonth':
			xAxis.ticks(d3.time.day.range, 1);
			xAxis2.ticks(d3.time.day.range, 1);
		break;
	}
		
	var yAxis = d3.svg.axis()
		.scale(y0)
		.orient("left")
		.tickFormat(d3.format(',.1f'))
		.ticks(5);
	
	var yAxis2 = d3.svg.axis()
		.scale(y1)
		.orient("right")
		.tickFormat(d3.format(',.1f'))
		.ticks(5);
	
	// An area generator, for the light fill.
	var area = d3.svg.area()
    	.interpolate(settings.interpolation)
    	.x(function(d) { return x0(d.date); })
    	.y0(height)
    	.y1(function(d) { return y0(d.value); });
    	
    var area2 = d3.svg.area()
    	.interpolate(settings.interpolation)
    	.x(function(d) { return x1(d.date); })
    	.y0(height)
    	.y1(function(d) { return y1(d.value); });
	
	var line = d3.svg.line()
		.interpolate(settings.interpolation)
	    .x(function(d) { return x0(d.date); })
	    .y(function(d) { return y0(d.value); });	
		
	var line2 = d3.svg.line()
		.interpolate(settings.interpolation)
		.x(function(d) { return x1(d.date); })
	    .y(function(d) { return y1(d.value); });
	
	var svg = d3.select("#"+elem).select("svg")
	    .attr("width", width + margin.left + margin.right)
	    .attr("height", height + margin.top + margin.bottom)
		.append("g")
		.attr('class', 'graph_container')
	    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");	    	
	
	function make_x_axis() { 
		return d3.svg.axis()
	        .scale(x0)
	        .orient("bottom")
		    .ticks(25)
	}
	
	function make_x2_axis() { 
		return d3.svg.axis()
	        .scale(x1)
	        .orient("top")
		    .ticks(25)
	}
	
	function make_y_axis() { 
		return d3.svg.axis()
		    .scale(y0)
		    .orient("left")
		    .ticks(1)
	}
	
	function make_y2_axis() { 
		return d3.svg.axis()
		    .scale(y1)
		    .orient("right")
		    .ticks(1)
	}
	
	function roundNumber(num, dec) {
		var result = Math.round(num*Math.pow(10,dec))/Math.pow(10,dec);
		var resultAsString = result.toString();
		if(dec > 0) {
			if(resultAsString.indexOf('.') == -1) {
				resultAsString = resultAsString + '.';
			}
			// make sure we have a decimal and pad with 0s to match the number we were asked for
			var indexOfDecimal = resultAsString.indexOf('.');
			while(resultAsString.length <= (indexOfDecimal+dec)) {
				resultAsString = resultAsString + '0';
			}
		}
		return resultAsString;
	};
	
	function getValue(data, xPosition) {
		// Aquesta funció, passant-li l'array de dades i la posició x del mouse
		// ens retorna la dada dins del nostre array en la que ens trobem. Cal 
		// recordar que la gràfica fa una interpolació entre les nostres mostres.
		var xValue 	= x0.invert(xPosition);
		var step = 600000; //10 min
		var index 	= (xValue.getTime() - data[0].date.getTime()) / step;
		if (index >= data.length) {
			index = data.length - 1;
		}	
		index = Math.round(index);		
		var bucketDate = new Date(data[0].date.getTime() + step * (index + 1));
		var v = data[index];
		return (v);		
	}
	
	function drawMaxMinAvg(svg, dat, showMaxMinAvg, btn, elem_aux)
	{		
		/**** Cercles a MAX / MIN / AVG ****/
		var circle_size 	= 3;
		var stroke_width 	= 3;
		var c_max 			= "#c0392b";
		var c_min 			= "#3498db";
		var c_mean			= "#34495e"; 
		var c_back 			= "#000";		
		
		var item_circ = svg.selectAll("dot").data(dat);
		var item_line = svg.selectAll("line").data(dat);
		
		if (!showMaxMinAvg) 
		{		
			item_circ.enter()
				.append("circle")
				.filter(function(d) {
					var max = d3.max(dat, function(d) { return d.value; }); 
					return d.value == max;
				})
				.attr("stroke", c_max)
				.attr("stroke-width", stroke_width)
				//.transition()
				.attr("r", circle_size)
				.attr("cx", function(d) { return x0(d.date); })
				.attr("cy", function(d) { return y0(d.value); })
				.attr("fill", "#fff");
			
			item_circ.enter()
				.append("circle")	
				.filter(function(d) {
					var min = d3.min(dat, function(d) { return d.value; }); 
					return d.value == min;
				})
				.attr("stroke", c_min)
				.attr("stroke-width", stroke_width)
				//.transition()
				.attr("r", circle_size)
				.attr("cx", function(d) { return x0(d.date); })
				.attr("cy", function(d) { return y0(d.value); })
				.attr("fill", "#fff");
			
			item_line.enter()
				.append("line")
				.attr("class","line_avg")			
				.style("stroke-dasharray", ("3, 3"))
				.attr("stroke", c_mean)
				.attr("stroke-width", 0.1)
				.transition()
				.attr("x1", function(d){	return x0(d3.min(dat, 	function(d) { return d.date;	})); })
				.attr("y1", function(d){	return y0(d3.mean(dat, 	function(d) { return d.value; 	})); })
				.attr("x2", function(d){	return x0(d3.max(dat, 	function(d) { return d.date;	})); })
				.attr("y2", function(d){	return y0(d3.mean(dat, 	function(d) { return d.value; 	})); });
			
			
			/*****	FEW STATS ******/
			$("#"+elem_aux).find(".few_stats ul").animate({
				'opacity' : 1
			}, 500);
			$("#"+elem_aux).find(".few_stats").slideToggle({"direction" : "up"}, 200);
			/*createAverage(elem_aux, 0, d3.max(dat, function(d) { return d.value; }), d3.min(dat, function(d) { return d.value; }), 'path_min');
			createAverage(elem_aux, 0, d3.max(dat, function(d) { return d.value; }), d3.mean(dat, function(d) { return d.value; }), 'path_avg');
			createAverage(elem_aux, 0, d3.max(dat, function(d) { return d.value; }), d3.max(dat, function(d) { return d.value; }), 'path_max');
			*/
			ShowStats(elem_aux, "Number of Samples", d3.values(dat, function(d) {return d.date}).length, '','num_samples');
			ShowStats(elem_aux, "Maximum", d3.format(".1f")(d3.max(dat, function(d) { return d.value; })), settings.symbol, 'max');
			ShowStats(elem_aux, "Minimum", d3.format(".1f")(d3.min(dat, function(d) { return d.value; })), settings.symbol, 'min'); 			
			ShowStats(elem_aux, "Average", d3.format(".1f")(d3.mean(dat, function(d) { return d.value; })), settings.symbol, 'avg');				
			
			btn.classed("active", true);
			//btn.attr("class", "active");
			
			showMaxMinAvg = true;
		}else{
			//item_circ.selectAll('circle').remove();
			//item_line.remove();
			
			$("#"+elem_aux).find(".few_stats").slideToggle({"direction" : "up"}, 200);
			
			$("#"+elem_aux).find(".few_stats ul").animate({
				'opacity' : 0
			}, 200, function() {
				$("#"+elem_aux).find(".few_stats ul li").each(function(item) {
					$(this).remove();
				});	
			})
			
			
			
			
			svg.selectAll('circle').remove();
			svg.selectAll(".line_avg").remove()
			btn.classed("active", false);
			showMaxMinAvg = false;
		}
		return showMaxMinAvg;
	}
	
	d3.csv(settings.file, function(data) {
		
		//data.sort(function(a,b) {return parseDate(b.data)-parseDate(a.data);});
		data.forEach(function(d) {
			d.date = parseDate(d.data);
			d.value = +d.value;
		});
		this.data 	= data;
		var data_old = data.slice();
		switch(settings.rango) {	
			case 'btn_graphToday':
				data 		= setFilterDateRange(this.data, new Date(), 1);
				data_old 	= setFilterDateRange(this.data, createRange(1), 2);
			break;
			case 'btn_graphWeek':
				data 		= setFilterDateRange(this.data, new Date(), 7);
				data_old 	= setFilterDateRange(this.data, createRange(7), 14);
			break;
			case 'btn_graphMonth':
				data 		= setFilterDateRange(this.data, new Date(), 30);
				data_old 	= setFilterDateRange(this.data, createRange(30), 60);
			break;		
		}		
				
		// Tot seguit agafem el mínim dels dos senyals (actual i el rang anterior)
		// i busquem el mínim i el màxim absoluts. 
		var yaxis_min, yaxis_max;
		
		if (d3.min(data, function(d){return d.value}) < d3.min(data_old, function(d){return d.value}))
		{
			yaxis_min = d3.min(data, function(d){return d.value});
		}else{
			yaxis_min = d3.min(data_old, function(d){return d.value});
		}
		
		if (d3.max(data, function(d){return d.value}) > d3.max(data_old, function(d){return d.value}))
		{
			yaxis_max = d3.max(data, function(d){return d.value});
		}else{
			yaxis_max = d3.max(data_old, function(d){return d.value})
		}
		
		x0.domain([new Date(createRange(7)),new Date()]);
		y0.domain([0, yaxis_max]);		
		x1.domain([new Date(createRange(14)),new Date(createRange(7))]);
		y1.domain([0, yaxis_max]);
		
		
		
		/*
		 * Dibuixa els eixos superior i dret de la gràfica del rang
		 * passat. No les mostrem perque no ho necessitem.
		svg.append("g")
			.attr("class", "grid")
			.call(make_x2_axis()
				.tickSize(-height, 0, 0)
				.tickFormat("")
			);
			
		svg.append("g")
			.attr("class", "grid")
			.call(make_y2_axis()
				.tickSize(-width, 0, 0)
				.tickFormat("")
			);
		*/
		// Afegim tota la zona de l'area, és la zona pintada
		var svg_inside = svg.append("g").attr("id", "viewport");
		
		svg_inside.append("g")
			.attr("class", "grid")
			.attr("transform", "translate(0,"+ height +")")
			.call(make_x_axis()
				.tickSize(-height, 0, 0)
				.tickFormat("")
			);		
		svg_inside.append("g")
			.attr("class", "grid")
			.call(make_y_axis()
				.tickSize(-width, 0, 0)
				.tickFormat("")
			);
			
			
		svg_inside.append("path")
			.attr('class', 'area2')
			.attr('d', area2(data_old));
		
		svg_inside.append("path")
			.attr('class', 'area')
			.attr('d', area(data));
			
		// eixos vertica i horitzontal. 
		svg.append("g")       
			.attr("class", "x axis")
			.attr("transform", "translate(0," + height + ")")
			.call(xAxis);
		
		svg.append("g")         
			.attr("class", "y axis")
			.call(yAxis);
			
		/*svg.append("g")       
			.attr("class", "x axis axis2")
			.attr("transform", "translate(0,0)")
			.call(xAxis2);
		*/		
					
		
		svg.append("g")         
			.attr("class", "y axis axis2")
			.attr("transform", "translate(" + width + " ,0)") 
			.call(yAxis2);
		
		
		// Afegim la línea del senyal. L'afegim més tard per que es pinti a sobre
		// del que pintem anteriorment.
		svg_inside.append("path")
			.attr("class", "line_act")
			.attr("d", line(data));
		
		svg_inside.append("path")
			.attr("class", "line_old")
			.attr("d", line2(data_old));				
			
		// Seguidament es fa totes les accions referents a la línea que es printa
		// quan fem mouseover. També el text que es mostra al costat de la línea.
		/*var hoverLineGroup = svg.append("g")
			.attr("class", "hover-line");
		var hoverLine = hoverLineGroup
			.append("line")
			.attr("x1", 10).attr("x2", 10) 
			.attr("y1", 0).attr("y2", height); 
		
		var txt = hoverLineGroup.append("text")
					.style("font-weight", "100")
					.attr("font-size", "60px")
					.attr("class", "hover-line-txt")
					.attr("fill", "#eee");
		
		hoverLine.style("opacity", 1e-6);
		svg.data(data).on("mouseover", function(d,i) { 
			
		}).on("mousemove", function(d,i) {
			var mouse_x = d3.mouse(this)[0];
  			var mouse_y = d3.mouse(this)[1];
			var graph_y = y0.invert(mouse_y);
			var item = getValue(data, mouse_x, i);
						
			hoverLine
				.attr("x1", mouse_x)
				.attr("x2", mouse_x)
				.attr("y1", function(d,i){
					return y0(item.value);
				})				
				.style("opacity", 1);
				
			txt			
				.attr("y", height - 5)
				.html(function(d) {
					return item.value.toFixed(1) + " ºC"; 	
				});
			
			// Controlem quan el mouse està a la dreta, posem 
			// el text de la barra a l'esquerra de la barra.
			if (mouse_x > (width - 200)) {
					txt.attr("x", mouse_x - 200);
			}else{
				txt.attr("x", mouse_x + 5);
			}			
			
		}).on("mouseout", function() {
			//console.log('mouseout');
			//hoverLine.style("opacity", 1e-6);
		});
		*/
		d3.select("#"+elem).select(".chart-stats")
			.data(data)			
			.on("click", function(d){
				d3.event.stopPropagation();
				d3.event.preventDefault();
								
				showMaxMinAvg = drawMaxMinAvg(svg, data, showMaxMinAvg, d3.select(this), elem);
			});
		
		//drawMaxMinAvg(svg, data);
		function updateWindow(){
			// Funció que redimensiona l'objecte svg
			width = $('#'+elem).width() - margin.left - margin.right
			svg.attr("width", width);
		}
		window.onresize = updateWindow;
		
		/*
		PERMET  FER ZOOM A LA g QUE ES VULGUI
		function redraw() {
		    d3.select("#viewport").attr("transform",
		        "translate(" + d3.event.translate + ")"
		        + " scale(" + d3.event.scale + ")");
		}
		svg.call(d3.behavior.zoom().on("zoom", redraw))
		*/
	});	
	
	return settings;
};

function setFilterDateRange(data, init, num_days)
{
	// Filtrem l'array de dades de manera que obtenim 
	// el rang de dades desitjat: Dia / Setmana / Mes.
	var data_aux = data.filter(function (d) {
		return (d.date < new Date(init)) && (d.date > createRange(num_days))
	});
	return data_aux;
}

function createRange(days) {
	// Funció que se li passen un nombre de dies, i et retorna la data en format Date()
	// on finalitza aquest rang a partir d'ara mateix.
	var ms_day = 86400000 * days;
	var day = new Date();
	var tmp = day.getTime();
	return day.setTime(parseInt(tmp - ms_day));
}
