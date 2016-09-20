/****************************************
** Function that calls the App // DEPRECATED!
*****************************************/
function openActualApp(qlik){
  var config = {
    host: window.location.hostname,
    prefix: "/",
    port: window.location.port,
    isSecure: false //you might need to change to true if your proxy is configured for https only
  };

  var path = location.pathname.split("/");
  var appID;
  
  for (i=0;i!=path.length;i++){
    if(path[i]=="app")
      appID=decodeURIComponent(path[i+1]);
  }

  // open the app
  var app = qlik.openApp(appID, config);

  return app;
}

/****************************************
** Function that generates the hypercube with the specific purpose of positioning Markers in the map
*****************************************/
function createMarkersHyperCube(markersProperties, app){
	var qSortCriteriasContents;

	if(markersProperties.mapData.sortByExpression){
		qSortCriteriasContents={
			qSortByExpression: markersProperties.mapData.sortOrder =='Ascending' ? 1 : -1,
			qExpression: { qv: markersProperties.mapData.sortExpression }
		}
	} else {
		qSortCriteriasContents={
			// qSortByAscii: 1
		}
	}

	if(!markersProperties.circles.activateCircles){ // no circles
		if(!markersProperties.advancedConfig.forceMultiIcon) // no multi-icon
		app.createCube( { qDimensions : [
	          { qDef : {
	          		qFieldDefs : ["="+markersProperties.mapData.coordinates],
	          		qSortCriterias: [ qSortCriteriasContents ]
		       }}
	          ], qMeasures : [
	          { qDef : {qDef : markersProperties.mapData.measure, qLabel :"Measure"}},
	          { qDef : {qDef : markersProperties.basicConfig.infoWindow, qLabel :"Info Window"}},
	          { qDef : {qDef : markersProperties.titleLabel.markerTitle, qLabel :"Marker Title"}},
	          { qDef : {qDef : markersProperties.titleLabel.markerLabel, qLabel :"Marker Label"}}
	          ],
	          qSuppressZero: markersProperties.mapData.suppressZero,
	          qSuppressMissing: markersProperties.mapData.suppressMissing,
	          qCalcCond: markersProperties.mapData.calculationCondition,
	          //max data fech successfully tested 2000
	          qInitialDataFetch: [{qHeight: parseInt(markersProperties.advancedConfig.maxAllowedMarkers), qWidth: 5}]}, function (reply){ 
	          																	 if(!app_this.backendApi.hasSelections()) callMarkers(reply); }
	          																	 );
	else //with multi-icon
		app.createCube( {qDimensions : [
	          { qDef : {
	          		qFieldDefs : ["="+markersProperties.mapData.coordinates],
	          		qSortCriterias: [ qSortCriteriasContents ]
		       }}
	          ], qMeasures : [
	          { qDef : {qDef : markersProperties.mapData.measure, qLabel :"Measure"}},
	          { qDef : {qDef : markersProperties.basicConfig.infoWindow, qLabel :"Info Window"}},
	          { qDef : {qDef : markersProperties.titleLabel.markerTitle, qLabel :"Marker Title"}},
	          { qDef : {qDef : markersProperties.titleLabel.markerLabel, qLabel :"Marker Label"}},
	          { qDef : {qDef : markersProperties.advancedConfig.multiIconPath, qLabel :"Multi-icon Path"}},
	          ],
	          qSuppressZero: markersProperties.mapData.suppressZero,
	          qSuppressMissing: markersProperties.mapData.suppressMissing,
	          //max data fetch successfully tested 1660
	          qInitialDataFetch: [{qHeight: parseInt(markersProperties.advancedConfig.maxAllowedMarkers), qWidth: 6}]}, function (reply){  
	          																	 if(!app_this.backendApi.hasSelections()) callMarkers(reply); }
	          																	 );
	}
	else{ //with circles
		if(!markersProperties.advancedConfig.forceMultiIcon) // no multi-icon
			{
			app.createCube( {qDimensions : [
	          { qDef : {
	          		qFieldDefs : ["="+markersProperties.mapData.coordinates],
	          		qSortCriterias: [ qSortCriteriasContents ]
		       }}
	          ], qMeasures : [
	          { qDef : {qDef : markersProperties.mapData.measure, qLabel :"Measure"}},
	          { qDef : {qDef : markersProperties.basicConfig.infoWindow, qLabel :"Info Window"}},
	          { qDef : {qDef : markersProperties.titleLabel.markerTitle, qLabel :"Marker Title"}},
	          { qDef : {qDef : markersProperties.titleLabel.markerLabel, qLabel :"Marker Label"}},
	          { qDef : {qDef : markersProperties.circles.circleRadius, qLabel :"Circle Radius"}},
	          { qDef : {qDef : markersProperties.circles.circlesLayout.strokeCalcColor, qLabel :"Circle Stroke Color"}},
	          { qDef : {qDef : markersProperties.circles.circlesLayout.fillCalcColor, qLabel :"Circle Fill Color"}}
	          ],
	          qSuppressZero: markersProperties.mapData.suppressZero,
	          qSuppressMissing: markersProperties.mapData.suppressMissing,
	          //max data fetch successfully tested 1250
	          qInitialDataFetch: [{qHeight: parseInt(markersProperties.advancedConfig.maxAllowedMarkers), qWidth: 8}]}, function (reply){  
	          																	 if(!app_this.backendApi.hasSelections()) callMarkers(reply); }
	          																	);
			}
		else // with multi-icon
			app.createCube( {qDimensions : [
	          { qDef : {
	          		qFieldDefs : ["="+markersProperties.mapData.coordinates],
	          		qSortCriterias: [ qSortCriteriasContents ]
		       }}
	          ], qMeasures : [
	          { qDef : {qDef : markersProperties.mapData.measure, qLabel :"Measure"}},
	          { qDef : {qDef : markersProperties.basicConfig.infoWindow, qLabel :"Info Window"}},
	          { qDef : {qDef : markersProperties.titleLabel.markerTitle, qLabel :"Marker Title"}},
	          { qDef : {qDef : markersProperties.titleLabel.markerLabel, qLabel :"Marker Label"}},
	          { qDef : {qDef : markersProperties.circles.circleRadius, qLabel :"Circle Radius"}},
	          { qDef : {qDef : markersProperties.circles.circlesLayout.strokeCalcColor, qLabel :"Circle Stroke Color"}},
	          { qDef : {qDef : markersProperties.circles.circlesLayout.fillCalcColor, qLabel :"Circle Fill Color"}},
	          { qDef : {qDef : markersProperties.advancedConfig.multiIconPath, qLabel :"Multi-icon Path"}}
	          ],
	          qSuppressZero: markersProperties.mapData.suppressZero,
	          qSuppressMissing: markersProperties.mapData.suppressMissing,
	          //max data fetch successfully tested 1100
	          qInitialDataFetch: [{qHeight: parseInt(markersProperties.advancedConfig.maxAllowedMarkers), qWidth: 9}]}, function (reply){  
	          																	 if(!app_this.backendApi.hasSelections()) callMarkers(reply); }
	          																	 ); 
	}
	

	//Function that will call the drawing of the markes
	function callMarkers(reply){
		drawMarkers(reply, markersProperties);
	}
}

/****************************************
** Function that generates the hypercube with the specific purpose of positioning shapes in the map
*****************************************/
function createShapesHyperCube(shapesProperties, app){
	var qSortCriteriasContents;

	if(shapesProperties.mapData.sortByExpression){
		qSortCriteriasContents={
			qSortByExpression: shapesProperties.mapData.sortOrder =='Ascending' ? 1 : -1,
			qExpression: { qv: shapesProperties.mapData.sortExpression }
		}
	} else {
		qSortCriteriasContents={
			// qSortByAscii: 1
		}
	}
	
	//Calling shapes drawing
	if(!shapesProperties.basicConfig.activateCircles){
		app.createCube( {qDimensions : [
		          { qDef : { qFieldDefs : ["="+shapesProperties.mapData.coordinates],
	          				 qSortCriterias: [ qSortCriteriasContents ]}}
		          ], qMeasures : [
		          { qDef : {qDef : shapesProperties.mapData.measure, qLabel :"Measure"}},
		          { qDef : {qDef : shapesProperties.basicConfig.shapeBy, qLabel :"Shape By"}},
		          { qDef : {qDef : shapesProperties.shapesLayout.strokeCalcColor, qLabel :"Stroke Color"}},
		          { qDef : {qDef : shapesProperties.shapesLayout.fillCalcColor, qLabel :"Fill Color"}},
		          { qDef : {qDef : shapesProperties.basicConfig.infoWindow, qLabel :"Info Window"}}
		          ],
		          qSuppressZero: shapesProperties.mapData.suppressZero,
	         	  qSuppressMissing: shapesProperties.mapData.suppressMissing,
		          //max data fetch successfully tested 1665
		          qInitialDataFetch: [{qHeight: parseInt(shapesProperties.shapesAdvancedConfig.maximumAllowedShapesPoints), qWidth: 6}]}, function (reply){ if(!app_this.backendApi.hasSelections()) callShapes(reply); });
		//function that will call the drawing of the shapes
		function callShapes(reply){
			drawShapes(reply, shapesProperties, app);
		}
	}else if(shapesProperties.basicConfig.activateCircles && !shapesProperties.activatedMarkers){ //Calling circles drawing
		app.createCube( {qDimensions : [
		          { qDef : { qFieldDefs : ["="+shapesProperties.mapData.coordinates],
	          				 qSortCriterias: [ qSortCriteriasContents ]}}
		          ], qMeasures : [
		          { qDef : {qDef : shapesProperties.mapData.measure, qLabel :"Measure"}},
		          { qDef : {qDef : shapesProperties.basicConfig.circleRadius, qLabel :"Circle Radius"}},
		          { qDef : {qDef : shapesProperties.shapesLayout.strokeCalcColor, qLabel :"Stroke Color"}},
		          { qDef : {qDef : shapesProperties.shapesLayout.fillCalcColor, qLabel :"Fill Color"}},
		          { qDef : {qDef : shapesProperties.basicConfig.infoWindow, qLabel :"Info Window"}}
		          ],
		          qSuppressZero: shapesProperties.mapData.suppressZero,
	         	  qSuppressMissing: shapesProperties.mapData.suppressMissing,
		          //max data fetch successfully tested 1665
		          qInitialDataFetch: [{qHeight: parseInt(shapesProperties.shapesAdvancedConfig.maximumAllowedShapesPoints), qWidth: 6}]}, function (reply){ if(!app_this.backendApi.hasSelections()) callCircles(reply); });

		//function that will call the drawing of the shapes
		function callCircles(reply){
			drawCircles(reply, shapesProperties, app);
		}
	}
}

/****************************************
** Function that generates the hypercube with the specific purpose of positioning lines in the map
*****************************************/
function createLinesHyperCube(linesProperties, app){
	var qSortCriteriasContents;

	if(linesProperties.mapData.sortByExpression){
		qSortCriteriasContents={
			qSortByExpression: linesProperties.mapData.sortOrder =='Ascending' ? 1 : -1,
			qExpression: { qv: linesProperties.mapData.sortExpression }
		}
	} else {
		qSortCriteriasContents={
			// qSortByAscii: 1
		}
	}

	app.createCube( {qDimensions : [
		          { qDef : { qFieldDefs : ["="+linesProperties.mapData.coordinates],
	          				 qSortCriterias: [ qSortCriteriasContents ]}}
		          ], qMeasures : [
		          { qDef : {qDef : linesProperties.mapData.measure, qLabel :"Measure"}},
		          { qDef : {qDef : linesProperties.basicConfig.lineBy, qLabel :"Line By"}},
		          { qDef : {qDef : linesProperties.linesLayout.lineCalcColor, qLabel :"Line Color"}}
		          ],
		          qSuppressZero: linesProperties.mapData.suppressZero,
	         	  qSuppressMissing: linesProperties.mapData.suppressMissing,
				  //max data fetch successfully tested 2500
		          qInitialDataFetch: [{qHeight: parseInt(linesProperties.linesAdvancedConfig.maximumAllowedLinesPoints), qWidth: 4}]}, function (reply){ if(!app_this.backendApi.hasSelections()) callLines(reply); });

	//function that will call the drawing of the shapes
	function callLines(reply){
		drawLines(reply, linesProperties, app);
	}
}

/****************************************
** Function that generates the hypercube with the specific purpose of positioning heatmaps in the map
*****************************************/
function createHeatmapsHyperCube(heatmapsProperties, app){
	var qSortCriteriasContents;

	if(heatmapsProperties.mapData.sortByExpression){
		qSortCriteriasContents={
			qSortByExpression: heatmapsProperties.mapData.sortOrder =='Ascending' ? 1 : -1,
			qExpression: { qv: heatmapsProperties.mapData.sortExpression }
		}
	} else {
		qSortCriteriasContents={
			// qSortByAscii: 1
		}
	}

	app.createCube( {qDimensions : [
		          { qDef : { qFieldDefs : ["="+heatmapsProperties.mapData.coordinates],
	          				 qSortCriterias: [ qSortCriteriasContents ]}}
		          ], qMeasures : [
		          { qDef : {qDef : heatmapsProperties.mapData.measure, qLabel :"Measure"}},
		          { qDef : {qDef : heatmapsProperties.basicConfig.weight, qLabel :"Weight"}}
		          ],
		          qSuppressZero: heatmapsProperties.mapData.suppressZero,
	         	  qSuppressMissing: heatmapsProperties.mapData.suppressMissing,
		          //max data fetch successfully tested 3300
		          qInitialDataFetch: [{qHeight: parseInt(heatmapsProperties.heatmapsAdvancedConfig.maximumAllowedHeatmapsPoints), qWidth: 3}]}, function (reply){ callHeatmaps(reply); });

	//function that will call the drawing of the shapes
	function callHeatmaps(reply){
		drawHeatmaps(reply, heatmapsProperties, app);
	}
}

/****************************************
** Function that generates the hypercube with the specific purpose of positioning directions with waypoints in the map
*****************************************/
function createDirectionsHyperCube(directionsProperties, app){
	if(directionsProperties.mapData.sortByExpression){
		qSortCriteriasContents={
			qSortByExpression: directionsProperties.mapData.sortOrder =='Ascending' ? 1 : -1,
			qExpression: { qv: directionsProperties.mapData.sortExpression }
		}
	} else {
		qSortCriteriasContents={
			// qSortByAscii: 1
		}
	}

	app.createCube({qDimensions : [
		          { qDef : { qFieldDefs : ["="+directionsProperties.mapData.coordinates],
	          				 qSortCriterias: [ qSortCriteriasContents ]}}
		          ], qMeasures : [
		          { qDef : {qDef : directionsProperties.mapData.measure, qLabel :"Measure"}}
		          ],
		          qSuppressZero: directionsProperties.mapData.suppressZero,
	         	  qSuppressMissing: directionsProperties.mapData.suppressMissing,
		          qInitialDataFetch: [{qHeight: 10,qWidth: 2}]}, function (reply){ callDirections(reply); });

	function callDirections(reply){
		drawDirections(reply, directionsProperties, app);
	}
}