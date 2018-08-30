/***********************************
** Draw Markers. Can be clustered.
************************************/
function drawMarkers(markersCube, markersProperties){
    $.getScript("/extensions/google-maps-toolkit-qs/js/markerwithlabel_packed.js", function(){

      // console.info("Markers Cube: ", markersCube);
      // console.log("Markers Properties: ", markersProperties)
    
      var infoList = [];
      var markers = [];
      var circles=[];

      for (var i=0;i<markersCube.qHyperCube.qDataPages[0].qArea.qHeight;i++){
        var row = markersCube.qHyperCube.qDataPages[0].qMatrix[i];

        if(row[0].qText!='-' && row[1].qText!='-'  /*&& (row[1].qText!='0'&&markersProperties.mapData.suppressZero) *//*&& (row[1].qText!='-'&&markersProperties.mapData.suppressMissing)*/){
          if(!markersProperties.mapData.suppressZero || (row[1].qText!='0'&&markersProperties.mapData.suppressZero)){
          var lat_lng_original = JSON.parse(row[0].qText);
          var lat_lng=[lat_lng_original[1],lat_lng_original[0]]; //inverting the coordinates since they are originaly sent as long lat 

          var marker;
          if(row[4].qText!='-')
            marker = new MarkerWithLabel({position: new google.maps.LatLng(parseFloat(lat_lng[0]),parseFloat(lat_lng[1])),
                                  map: map,
                                  title: row[3].qText,
                                  draggable: markersProperties.advancedConfig.moveMarkers,
                                  labelContent: row[4].qText,
                                  labelClass: "markerlabels",
                                  labelAnchor: new google.maps.Point(markersProperties.titleLabel.labelHPosition, markersProperties.titleLabel.labelVPosition),
                                  labelInBackground: true, //uncomment this to make label in front of marker
                                  qElem: row[0].qElemNumber
                                 });
          
          else
            marker = new MarkerWithLabel({position: new google.maps.LatLng(parseFloat(lat_lng[0]),parseFloat(lat_lng[1])),
                                  map: map,
                                  draggable: markersProperties.advancedConfig.moveMarkers,
                                  title: row[3].qText,
                                  qElem: row[0].qElemNumber
                                 });

          // Info Window
          if(row[2].qText!='-'){
            //TODO - identify the source of images folder like in the markers
            marker.infoWindow = new google.maps.InfoWindow({content: '<div class="infoWindows">'+row[2].qText+'<br /></div>'});

            google.maps.event.addListener(marker,'mouseover',function() {
                  infoList.push(this);
                  var _this = this;
                  setTimeout(function() { _this.infoWindow.open(map,_this); }, 250);
                });

                google.maps.event.addListener(marker,'mouseout',function() {            
                  infoList.push(this);
                  var toClose = this.infoWindow; 
                  setTimeout(function() { toClose.close(); }, 400);
                });
          }

          // Binding Circles to Markers
          if(markersProperties.circles.activateCircles){
            var color1=row[6].qText;
            var color2=row[7].qText;

            if(color1=='-') color1='#008000';
            if(color2=='-') color1='#00FF40';

            var circle = new google.maps.Circle({
                                                  map: map,
                                                  strokeColor: color1,
                                                  strokeOpacity: markersProperties.circles.circlesLayout.strokeOpacity,
                                                  strokeWeight:  markersProperties.circles.circlesLayout.strokeWeight,
                                                  fillColor: color2,
                                                  fillOpacity: markersProperties.circles.circlesLayout.fillOpacity,
                                                  center: new google.maps.LatLng(parseFloat(lat_lng[0]),parseFloat(lat_lng[1])),
                                                  radius: parseFloat(row[5].qText),
                                                  originalStrokeColor: color1,
                                                  originalStrokeOpacity: markersProperties.circles.circlesLayout.strokeOpacity,
                                                  originalFillColor: color2,
                                                  originalFillOpacity: markersProperties.circles.circlesLayout.fillOpacity,
                                                  qElem: row[0].qElemNumber
                                                 });

          google.maps.event.addListener(circle, 'click', 
            (
              function(value) 
                {
                    return function() {
                        highlightMarkers(value); //I thank Alex for this code snippet I took from his extension GoogleMaps-Sense
                        app_this.selectValues(0, [value], true);
                    }
                }
          )
            (row[0].qElemNumber)
          );
          
          circles.push(circle);
          circle.bindTo('center', marker, 'position');

          extendMapBounds([circle.getBounds().getNorthEast().lat(),circle.getBounds().getNorthEast().lng()]);
          extendMapBounds([circle.getBounds().getSouthWest().lat(),circle.getBounds().getSouthWest().lng()]);
          }

          //Defining Marker Icons
          if(markersProperties.advancedConfig.forceMultiIcon){ // Multiple Icons
            if(markersProperties.advancedConfig.multiIconSource=="DefaultLibrary"){ // using default content library
              if(!markersProperties.circles.activateCircles) { 
                if(row[5].qText!='-') {
                  marker.setIcon("/content/default/" + row[5].qText); 
                  marker.setOptions({ originalIconPath: "/content/default/" + row[5].qText });
                }
              }
              else { 
                if(row[8].qText!='-'){ 
                  marker.setIcon("/content/default/" + row[8].qText); 
                  marker.setOptions({ originalIconPath: "/content/default/" + row[8].qText });
                }
              }
            } else if(markersProperties.advancedConfig.multiIconSource=="ExtensionFolder"){ // using extension images folder
              if(!markersProperties.circles.activateCircles) { 
                if(row[5].qText!='-') {
                  marker.setIcon("/extensions/google-maps-toolkit-qs/images/" + row[5].qText); 
                  marker.setOptions({ originalIconPath: "/extensions/google-maps-toolkit-qs/images/" + row[5].qText });
                }
              }
              else {
                if(row[8].qText!='-') { 
                  marker.setIcon("/extensions/google-maps-toolkit-qs/images/" + row[8].qText); 
                  marker.setOptions({ originalIconPath: "/extensions/google-maps-toolkit-qs/images/" + row[8].qText });
                }
              }
            } else if(markersProperties.advancedConfig.multiIconSource=="OtherURL"){ // using plain URL
              if(!markersProperties.circles.activateCircles) { 
                if(row[5].qText!='-'){ 
                  marker.setIcon(row[5].qText); 
                  marker.setOptions({ originalIconPath: row[5].qText });
                }
              }
              else {
                if(row[8].qText!='-') { 
                  marker.setIcon(row[8].qText); 
                  marker.setOptions({ originalIconPath: row[8].qText });
                }
              }
            } else if(markersProperties.advancedConfig.multiIconSource=="CustomLibrary"){ // Custom Library !! TODO !!
              if(!markersProperties.circles.activateCircles) { 
                if(row[5].qText!='-') { 
                  marker.setIcon("/content/default/" + row[5].qText);
                  marker.setOptions({ originalIconPath: "/content/default/" + row[5].qText });
                }
              }
              else{
                if(row[8].qText!='-') {
                  marker.setIcon("/content/default/" + row[8].qText);
                  marker.setOptions({ originalIconPath: "/content/default/" + row[8].qText });
                }   
              }
            }
          }
          else{ // Single Icon
            if(markersProperties.basicConfig.customMarkerIcon){
              if(markersProperties.basicConfig.customIconSource=="DefaultLibrary"){ // using default content library
                if(markersProperties.basicConfig.customIconURL!='') {
                  marker.setIcon("/content/default/" + markersProperties.basicConfig.customIconURL); 
                  marker.setOptions({ originalIconPath: "/content/default/" + markersProperties.basicConfig.customIconURL });
                } 
              } else if(markersProperties.basicConfig.customIconSource=="ExtensionFolder"){ // using extension images folder
                if(markersProperties.basicConfig.customIconURL!='') {
                  marker.setIcon("/extensions/google-maps-toolkit-qs/images/" + markersProperties.basicConfig.customIconURL); 
                  marker.setOptions({ originalIconPath: "/extensions/google-maps-toolkit-qs/images/" + markersProperties.basicConfig.customIconURL });
                }
              } else if(markersProperties.basicConfig.customIconSource=="OtherURL"){ // using plain URL
                if(markersProperties.basicConfig.customIconURL!='') {
                  marker.setIcon(markersProperties.basicConfig.customIconURL);
                  marker.setOptions({ originalIconPath: markersProperties.basicConfig.customIconURL });
                }  
              } else if(markersProperties.basicConfig.customIconSource=="CustomLibrary"){ // Custom Library !! TODO !!
                if(markersProperties.basicConfig.customIconURL!='') {
                  marker.setIcon("/content/default/" + markersProperties.basicConfig.customIconURL);
                  marker.setOptions({ originalIconPath: "/content/default/" + markersProperties.basicConfig.customIconURL });
                }  
              }
            }
          }

          google.maps.event.addListener(marker, 'click', 
            (
              function(value) 
                {
                    return function() {
                        highlightMarkers(value); //I thank Alex for this code snippet I took from his extension GoogleMaps-Sense
                        app_this.selectValues(0, [value], true);

                        //console.info("App at this stage (markers): ", app_this);
                    }
                }
          )
            (row[0].qElemNumber)
          );

          markers.push(marker);

          extendMapBounds(lat_lng);
        









          }
        }
          
      }

       //I thank Alex for this code snippet I took from his extension GoogleMaps-Sense
          var selectedMarkers = [];
          function highlightMarkers(qElem) {
            var idx = selectedMarkers.indexOf(qElem);
            if (idx > -1) {
              selectedMarkers.splice(idx, 1)
            } else {
              selectedMarkers.push(qElem)
            }
            markers.forEach(function(marker) {
              if (selectedMarkers.indexOf(marker.qElem) === -1) {
                marker.setOpacity(0.5);
                marker.setIcon(marker.originalIconPath);
              } else {
                marker.setOpacity(1);
                marker.setIcon("/extensions/google-maps-toolkit-qs/images/selected-check.png");
              }
            });
            if(markersProperties.circles.activateCircles){
              circles.forEach(function(circle) {
                if (selectedMarkers.indexOf(circle.qElem) === -1) {
                  circle.setOptions({ fillOpacity: circle.originalFillOpacity/3, fillColor: circle.originalFillColor, 
                                   strokeColor: circle.originalStrokeColor, strokeOpacity: circle.originalStrokeOpacity/3 } );
                } else {
                  circle.setOptions({ fillOpacity: 0.6, fillColor: "#64BC53",
                                          strokeColor: "#4F8E42", strokeOpacity: 1 } );
                }
              });
            }
          };

      // Markers Clustering
      if(markersProperties.clustering.clusterMarkers){
        var cluster_options = {
                  gridSize: markersProperties.clustering.clusterSize, 
                  maxZoom: markersProperties.clustering.clusterZoom
                  };
      var marker_cluster = new MarkerClusterer(map, markers, cluster_options);
      }

      updateMapPosition();
    });
}