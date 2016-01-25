/***********************************
** Draw Lines
************************************/
function drawLines(linesCube, linesProperties, app){
	var paths = {},
		path_name,
		item;

	var lines=[];

	for (var i=0;i<linesCube.qHyperCube.qDataPages[0].qArea.qHeight;i++){
  	  var row = linesCube.qHyperCube.qDataPages[0].qMatrix[i];

  	  if(row[0].qText!='-' && row[1].qText!='-'){
  	  	var lat_lng_original = JSON.parse(row[0].qText);
        var lat_lng=[lat_lng_original[1],lat_lng_original[0]]; //inverting the coordinates since they are originaly sent as long lat 
  	  	
  	  	path_name=row[2].qText;

  	  	var color1=row[3].qText; //line color

  		if(color1=='-') color1='#008000';

  		item={
			latlng: new google.maps.LatLng(parseFloat(lat_lng[0]),parseFloat(lat_lng[1])),
			stroke_color: color1,
			stroke_weight: linesProperties.linesLayout.lineWeight,
			lat: parseFloat(lat_lng[0]),
			lng: parseFloat(lat_lng[1]),
			qElemNumber: row[0].qElemNumber
		};

		extendMapBounds(lat_lng);

		if (!paths[path_name]) {
			paths[path_name] = [];
			}
		paths[path_name].push(item);
  	  }
	}

	for (i in paths){
		var sh = [];
		var lats_all = [];
		var lngs_all = [];
		for (j = 0; j < paths[i].length; j++){
			sh.push(paths[i][j].latlng);
			lats_all.push(paths[i][j].lat);
			lngs_all.push(paths[i][j].lng);
		} 
		
		var polyline = new google.maps.Polyline({
											path: sh,
											strokeColor: paths[i][0].stroke_color,
											strokeOpacity: linesProperties.linesLayout.lineOpacity,
											strokeWeight: linesProperties.linesLayout.lineWeight,
											geodesic: linesProperties.linesLayout.activateGeodesic,
											originalStrokeColor: paths[i][0].stroke_color,
											originalStrokeOpacity: linesProperties.linesLayout.lineOpacity,
											originalWeight: linesProperties.linesLayout.lineWeight,
											lineFriendlyID: i
		});

		//Setup for distinct lats and lngs. Used for the click event
		function onlyUnique(value, index, self) { 
			return self.indexOf(value) === index;
		}
		
		lats_all = lats_all.filter(onlyUnique);
		lngs_all = lngs_all.filter(onlyUnique);

		google.maps.event.addListener(polyline, 'click', 
          (
            function(value, selected_line) 
              {
                  return function() {
                      var values_selected=[];
                      for (j=0;j<value.length;j++)
                      	values_selected[j]=value[j].qElemNumber;

                      highlightLines(selected_line.lineFriendlyID);//I thank Alex for this code snippet I took from his extension GoogleMaps-Sense
                      app_this.selectValues(0, values_selected, true);
                  }
              }
        )
          (paths[i], polyline)
        );

		lines.push(polyline);
		polyline.setMap(map);
	}
	updateMapPosition();

	var selectedLines=[];
	function highlightLines(line_selected){
  		//I thank Alex for this code snippet I took from his extension GoogleMaps-Sense
  		var idx = selectedLines.indexOf(line_selected);
        if (idx > -1) {
          selectedLines.splice(idx, 1)
        } else {
          selectedLines.push(line_selected)
        }

        lines.forEach(function(line) {
          if (selectedLines.indexOf(line.lineFriendlyID) === -1) {
            line.setOptions({ strokeColor: line.originalStrokeColor, strokeOpacity: line.originalStrokeOpacity/3, strokeWeight: line.originalWeight } );
          } else {
            line.setOptions({ strokeColor: "#4F8E42", strokeOpacity: 1, strokeWeight: line.originalWeight*2 } );
          }
        });
	}
}