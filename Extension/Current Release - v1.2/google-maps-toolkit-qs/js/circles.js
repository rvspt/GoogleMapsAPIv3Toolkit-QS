/***********************************
** Draw Circles
************************************/
function drawCircles(circlesCube, circlesProperties, app){
  var circles=[];

  for (var i=0;i<circlesCube.qHyperCube.qDataPages[0].qArea.qHeight;i++){
  	  var row = circlesCube.qHyperCube.qDataPages[0].qMatrix[i];

  	  if(row[0].qText!='-' && row[1].qText!='-'){
  	  	var lat_lng_original = JSON.parse(row[0].qText);
        var lat_lng=[lat_lng_original[1],lat_lng_original[0]]; //inverting the coordinates since they are originaly sent as long lat 

  	  	var color1=row[3].qText; //stroke color
  		var color2=row[4].qText; //fill color

  		if(color1=='-') color1='#008000';
  		if(color2=='-') color1='#00FF40';

  		var circle = new google.maps.Circle({
									strokeColor: color1,
									strokeOpacity: circlesProperties.shapesLayout.strokeOpacity,
									strokeWeight:  circlesProperties.shapesLayout.strokeWeight,
									fillColor: color2,
									fillOpacity: circlesProperties.shapesLayout.fillOpacity,
									center: new google.maps.LatLng(parseFloat(lat_lng[0]),parseFloat(lat_lng[1])),
									radius: parseFloat(row[2].qText),
                  originalStrokeColor: color1,
                  originalStrokeOpacity: circlesProperties.shapesLayout.strokeOpacity,
                  originalFillColor: color2,
                  originalFillOpacity: circlesProperties.shapesLayout.fillOpacity,
                  qElem: row[0].qElemNumber

		});

 		extendMapBounds([circle.getBounds().getNorthEast().lat(),circle.getBounds().getNorthEast().lng()]);
  		extendMapBounds([circle.getBounds().getSouthWest().lat(),circle.getBounds().getSouthWest().lng()]);

  		google.maps.event.addListener(circle, 'click', 
          (
            function(value) 
              {
                  return function() {
                      highlightCircles(value);//I thank Alex for this code snippet I took from his extension GoogleMaps-Sense
                      app_this.selectValues(0, [value], true);
                      
                  }
              }
        )
          (row[0].qElemNumber)
        );

  		if(row[5].qText!='-'){
  			//TODO - identify the source of images folder like in the markers
  			var info_window = new google.maps.InfoWindow({content: '<div class="infoWindows">'+row[5].qText+'<br /></div>',
																	  position: circle.getCenter()});

  			google.maps.event.addListener(circle, 'mouseover', 
				(function(info_window) { return function() { setTimeout(function() { info_window.open(map); }, 100);	} })
				(info_window)
			);
			
			google.maps.event.addListener(circle, 'mouseout', 
				(function(info_window) { return function() { setTimeout(function() { info_window.close(); }, 250);	} })
				(info_window)
			);
  		}

      circles.push(circle);
  		circle.setMap(map);
  		//console.groupEnd();
  	  }
  	}

    var selectedCircles=[];
    function highlightCircles(circleSelected){
      //I thank Alex for this code snippet I took from his extension GoogleMaps-Sense
      var idx = selectedCircles.indexOf(circleSelected);
      if (idx > -1) {
        selectedCircles.splice(idx, 1)
      } else {
        selectedCircles.push(circleSelected)
      }
      
      circles.forEach(function(circle) {
        if (selectedCircles.indexOf(circle.qElem) === -1) {
          circle.setOptions({ fillOpacity: circle.originalFillOpacity/3, fillColor: circle.originalFillColor, 
                           strokeColor: circle.originalStrokeColor, strokeOpacity: circle.originalStrokeOpacity/3 } );
        } else {
          circle.setOptions({ fillOpacity: 0.8, fillColor: "#64BC53",
                                  strokeColor: "#4F8E42", strokeOpacity: 1 } );
        }
      });
    }


  	updateMapPosition();
}