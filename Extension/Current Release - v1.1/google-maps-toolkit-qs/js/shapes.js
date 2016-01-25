/***********************************
** Draw Shapes
************************************/
function drawShapes(shapesCube, shapesProperties, app){
	var shapes = {},
			shape,
			item;
	var polygons=[];

	for (var i=0;i<shapesCube.qHyperCube.qDataPages[0].qArea.qHeight;i++){
  	  var row = shapesCube.qHyperCube.qDataPages[0].qMatrix[i];

  	  if(row[0].qText!='-' && row[1].qText!='-'){
  	  	var lat_lng_original = JSON.parse(row[0].qText);
        var lat_lng=[lat_lng_original[1],lat_lng_original[0]]; //inverting the coordinates since they are originaly sent as long lat 

  	  	shape=row[2].qText;

  	  	var color1=row[3].qText; //stroke color
  		var color2=row[4].qText; //fill color

  		if(color1=='-') color1='#008000';
  		if(color2=='-') color1='#00FF40';

  		item={
  			latlng: new google.maps.LatLng(parseFloat(lat_lng[0]),parseFloat(lat_lng[1])),
  			stroke_color: color1,
  			fill_color: color2,
  			lat: parseFloat(lat_lng[0]),
  			lng: parseFloat(lat_lng[1]),
  			infos: row[5].qText,
  			qElemNumber: row[0].qElemNumber
  		};

  		extendMapBounds(lat_lng);

  		if (!shapes[shape]) {
			shapes[shape] = [];
			}

		shapes[shape].push(item);
  	  }
  	}

  	for (i in shapes){
  		var sh = [];
		var lats_all = [];
		var lngs_all = [];
		var local_bounds = new google.maps.LatLngBounds();

		for (j = 0; j < shapes[i].length; j++){ 
			sh.push(shapes[i][j].latlng);
			lats_all.push(shapes[i][j].lat);
			lngs_all.push(shapes[i][j].lng);
			local_bounds.extend(shapes[i][j].latlng);
		}

		var polygon = new google.maps.Polygon({
											paths:sh,
											strokeColor: shapes[i][0].stroke_color,
											strokeOpacity: shapesProperties.shapesLayout.strokeOpacity,
											strokeWeight: shapesProperties.shapesLayout.strokeWeight,
											fillColor: shapes[i][0].fill_color,
											fillOpacity: shapesProperties.shapesLayout.fillOpacity,
											originalFillOpacity: shapesProperties.shapesLayout.fillOpacity,
											originalFillColor: shapes[i][0].fill_color, 
											originalStrokeColor: shapes[i][0].stroke_color,
											originalStrokeOpacity: shapesProperties.shapesLayout.strokeOpacity,
											polygonFriendlyID: i
		});

		//Setup for distinct lats and lngs. Used for the click event
		function onlyUnique(value, index, self) { 
			return self.indexOf(value) === index;
		}
		
		lats_all = lats_all.filter(onlyUnique);
		lngs_all = lngs_all.filter(onlyUnique);

		google.maps.event.addListener(polygon, 'click', 
          (
            function(value,selected_polygon) 
              {
                  return function() {
                      var values_selected=[];
                      for (j=0;j<value.length;j++)
                      	values_selected[j]=value[j].qElemNumber;

                      highlightShapes(selected_polygon.polygonFriendlyID);//I thank Alex for this code snippet I took from his extension GoogleMaps-Sense
                      app_this.selectValues(0, values_selected, true);
                  }
              }
        )
          (shapes[i],polygon)
        );

		if(shapes[i][0].infos!='-'){
			//TODO - identify the source of images folder like in the markers
			var info_window = new google.maps.InfoWindow({content: '<div class="infoWindows">'+shapes[i][0].infos+'<br /></div>',
														  position: local_bounds.getCenter()});

			//Info Window Mouse Events
			google.maps.event.addListener(polygon, 'mouseover', 
				(function(info_window) { return function() { setTimeout(function() { info_window.open(map); }, 100);	} })
				(info_window)
			);
			
			google.maps.event.addListener(polygon, 'mouseout', 
				(function(info_window) { return function() { setTimeout(function() { info_window.close(); }, 250);	} })
				(info_window)
			);
		}

		polygons.push(polygon);
		polygon.setMap(map);
  	}

  	var selectedShapes = [];
  	function highlightShapes(shape_selected){
  		//I thank Alex for this code snippet I took from his extension GoogleMaps-Sense
            var idx = selectedShapes.indexOf(shape_selected);
            if (idx > -1) {
              selectedShapes.splice(idx, 1)
            } else {
              selectedShapes.push(shape_selected)
            }

            polygons.forEach(function(polygon) {
              if (selectedShapes.indexOf(polygon.polygonFriendlyID) === -1) {
                polygon.setOptions({ fillOpacity: polygon.originalFillOpacity/3, fillColor: polygon.originalFillColor, 
                					 strokeColor: polygon.originalStrokeColor, strokeOpacity: polygon.originalStrokeOpacity/3 } );
              } else {
                polygon.setOptions({ fillOpacity: 0.8, fillColor: "#64BC53",
                								  strokeColor: "#4F8E42", strokeOpacity: 1 } );
              }
            });
  	}

  	updateMapPosition();
}