var epochs = {};
var epochList = [];
var overallMax = 0;
var overallMin = 0;

var viewportWidth;
if (document.compatMode === 'BackCompat') {
    viewportWidth = document.body.clientWidth - 15;
} else {
    viewportWidth = document.documentElement.clientWidth - 15;
}

data.forEach(function(entry) {
    if(typeof epochs[entry.epoch] == 'undefined') {
        epochs[entry.epoch] = {};
        epochList.push(entry.epoch);
        epochs[entry.epoch]['positive'] = 0;
        epochs[entry.epoch]['negative'] = 0;
        for (i = -5; i <= 5; i++) {
            epochs[entry.epoch][i] = 0;
        }
    }
    if ( entry.sentiment_score >= 0 ) { 
        epochs[entry.epoch]['positive'] += entry.count;                
    } 
    if ( entry.sentiment_score <= 0 ) { 
        epochs[entry.epoch]['negative'] -= entry.count;                        
    } 
    for (i = -5; i <= 5; i++) {
        if ( entry.sentiment_score == i ) {  epochs[entry.epoch][i] += entry.count; }
    }

    if ( entry.sentiment_score > 5 ) {  epochs[entry.epoch][5] += entry.count; }
    if ( entry.sentiment_score < -5 ) {  epochs[entry.epoch][-5] += entry.count; }
    
    if ( overallMax < epochs[entry.epoch]['positive'] ) { overallMax = epochs[entry.epoch]['positive']; }
    if ( overallMin > epochs[entry.epoch]['negative'] ) { overallMin = epochs[entry.epoch]['negative']; }
});
/*
    console.log( overallMax );
    console.log( overallMin );
    console.log( epochs );
    console.log( epochList );
*/
var margin = {top: 0, right: 0, bottom: 0, left: 0}
var height = 500;
var width = viewportWidth;

var	svg = d3.select("body")
	.append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
	.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")"); // in a place that is the actual area for the graph


// determine start and finish

var x = d3.scale.linear()
    .domain([epochList[0], epochList[epochList.length - 1]])
    .range([0, width]);

var color = d3.scale.category20b().domain(d3.range(0,0));

var y = d3.scale.linear()
    .domain([overallMin,overallMax])
    .range([500,0]);



    


valueline = d3.svg.area().interpolate("monotone").x(function(d,i) { return x(d); })
    .y0(function(d,i) { return y( 0 ); })
    .y1(function(d,i) { return y( epochs[d][1] ); });

svg.append("path").attr("fill", '#d9f0a3' ).attr("d", valueline( epochList ));


valueline = d3.svg.area().interpolate("monotone").x(function(d,i) { return x(d); })
    .y0(function(d,i) { return y( epochs[d][1] ); })
    .y1(function(d,i) { return y( epochs[d][1] + epochs[d][2] ); });

svg.append("path").attr("fill", '#addd8e' ).attr("d", valueline( epochList ));


valueline = d3.svg.area().interpolate("monotone").x(function(d,i) { return x(d); })
    .y0(function(d,i) { return y( epochs[d][1] + epochs[d][2] ); })
    .y1(function(d,i) { return y( epochs[d][1] + epochs[d][2] + epochs[d][3] ); });

svg.append("path").attr("fill", '#78c679' ).attr("d", valueline( epochList ));


valueline = d3.svg.area().interpolate("monotone").x(function(d,i) { return x(d); })
    .y0(function(d,i) { return y( epochs[d][1] + epochs[d][2] + epochs[d][3] ); })
    .y1(function(d,i) { return y( epochs[d][1] + epochs[d][2] + epochs[d][3] + epochs[d][4] ); });

svg.append("path").attr("fill", '#31a354' ).attr("d", valueline( epochList ));


valueline = d3.svg.area().interpolate("monotone").x(function(d,i) { return x(d); })
    .y0(function(d,i) { return y( epochs[d][1] + epochs[d][2] + epochs[d][3] + epochs[d][4] ); })
    .y1(function(d,i) { return y( epochs[d][1] + epochs[d][2] + epochs[d][3] + epochs[d][4] + epochs[d][5] ); });

svg.append("path").attr("fill", '#006837' ).attr("d", valueline( epochList ));




valueline = d3.svg.area().interpolate("monotone").x(function(d,i) { return x(d); })
    .y0(function(d,i) { return y( 0 ); })
    .y1(function(d,i) { return y( 0 - epochs[d][-1] ); });

svg.append("path").attr("fill", '#fed976' ).attr("d", valueline( epochList ));


valueline = d3.svg.area().interpolate("monotone").x(function(d,i) { return x(d); })
    .y0(function(d,i) { return y( 0 - epochs[d][-1] ); })
    .y1(function(d,i) { return y( 0 - epochs[d][-1] - epochs[d][-2] ); });

svg.append("path").attr("fill", '#feb24c' ).attr("d", valueline( epochList ));


valueline = d3.svg.area().interpolate("monotone").x(function(d,i) { return x(d); })
    .y0(function(d,i) { return y( 0 - epochs[d][-1] - epochs[d][-2] ); })
    .y1(function(d,i) { return y( 0 - epochs[d][-1] - epochs[d][-2] - epochs[d][-3] ); });

svg.append("path").attr("fill", '#fd8d3c' ).attr("d", valueline( epochList ));


valueline = d3.svg.area().interpolate("monotone").x(function(d,i) { return x(d); })
    .y0(function(d,i) { return y( 0 - epochs[d][-1] - epochs[d][-2] - epochs[d][-3] ); })
    .y1(function(d,i) { return y( 0 - epochs[d][-1] - epochs[d][-2] - epochs[d][-3] - epochs[d][-4] ); });

svg.append("path").attr("fill", '#f03b20' ).attr("d", valueline( epochList ));


valueline = d3.svg.area().interpolate("monotone").x(function(d,i) { return x(d); })
    .y0(function(d,i) { return y( 0 - epochs[d][-1] - epochs[d][-2] - epochs[d][-3] - epochs[d][-4] ); })
    .y1(function(d,i) { return y( 0 - epochs[d][-1] - epochs[d][-2] - epochs[d][-3] - epochs[d][-4] - epochs[d][-5] ); });

svg.append("path").attr("fill", '#bd0026' ).attr("d", valueline( epochList ));

