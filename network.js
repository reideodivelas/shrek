var section = d3.select("#content")
              .append("div")
              .attr("class", "section center black tk-futura-pt")
              .attr("style", "position:relative; background-color:#F7F7F7;");

var w = 500;
var h = 500;

var svg = section.append("svg")
          .attr("width", w)
          .attr("height", h);

var evil_colors = {"0": "#f7c0bb", "1": "#8690ff"};
var main_colors = {"0": "#f7c0bb", "1": "#acd0f4"};
var first_app_colors = {"1": "#f7c0bb", "2": "#8690ff", "3": "#7fd4c1"};

var char_desc = {
    "GINGY": {"evil": "0", "main": "0", "first_app": "1"},
    "RAPUNZEL": {"evil": "1", "main": "1", "first_app": "3"},
    "PRINCE CHARMING": {"evil": "1", "main": "1", "first_app": "2"},
    "MIRROR": {"evil": "1", "main": "0", "first_app": "1"},
    "PUSS": {"evil": "0", "main": "1", "first_app": "2"},
    "GUARD": {"evil": "1", "main": "0", "first_app": "1"},
    "MERLIN": {"evil": "0", "main": "0", "first_app": "3"},
    "QUEEN": {"evil": "0", "main": "0", "first_app": "2"},
    "KING HAROLD": {"evil": "0", "main": "0", "first_app": "2"},
    "FIONA": {"evil": "0", "main": "1", "first_app": "1"},
    "DONKEY": {"evil": "0", "main": "1", "first_app": "1"},
    "ARTIE": {"evil": "0", "main": "1", "first_app": "2"},
    "SNOW WHITE": {"evil": "0", "main": "0", "first_app": "1"},
    "SHREK": {"evil": "0", "main": "1", "first_app": "1"},
    "ROBIN HOOD": {"evil": "1", "main": "0", "first_app": "1"},
    "FARQUAAD": {"evil": "1", "main": "1", "first_app": "1"},
    "FAIRY GODMOTHER": {"evil": "1", "main": "1", "first_app": "2"},
    "PINOCCHIO": {"evil": "0", "main": "0", "first_app": "1"}
};


d3.json("./data/shrek_all_network.json", function(err, data){
    if (err){throw err};

    var nodes = data["nodes"];
    var edges = data["edges"];

    var simulation = d3.forceSimulation(nodes)
        .force("link", d3.forceLink(edges)
                         .id(function(d,i) {
                             return d.id
                         }))
        .force("charge", d3.forceManyBody()
                           .strength(-800))
        .force("center", d3.forceCenter(w/2, h/2));

    var r = 5;

    var links = svg.selectAll("line")
        .data(edges)
        .enter()
        .append("line")
        .attr("stroke", "#000000");

    var circles = svg.selectAll("circle")
       .data(nodes)
       .enter()
       .append("circle")
       .attr("fill", function(d) {return evil_colors[char_desc[d.id].evil]})
       // .attr("fill", function(d) {return first_app_colors[char_desc[d.id].first_app]})
       .attr("r", function(d) {return 2*Math.log(parseInt(d.word_count))});

    simulation.on("tick", ticked);

    function ticked(){
      circles.attr("cx", function(d) { return d.x; })
             .attr("cy", function(d) { return d.y; })

      links.attr("x1", function(d){return d.source.x})
           .attr("x2", function(d){return d.target.x})
           .attr("y1", function(d){return d.source.y})
           .attr("y2", function(d){return d.target.y});
    };

});