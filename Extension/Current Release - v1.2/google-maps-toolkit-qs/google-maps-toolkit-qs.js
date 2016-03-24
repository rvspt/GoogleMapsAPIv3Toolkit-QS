require.config({
  paths: {
    async: '/extensions/google-maps-toolkit-qs/js/async',
    markerclusterer: '/extensions/google-maps-toolkit-qs/js/markerclusterer_compiled'
  },
  shim: {
    'markerclusterer': { exports: 'MarkerClusterer' }
  }
});



define( [
  'jquery',
  'js/qlik',
  './extension-properties',
  './js/hypercubes',
  './js/markers',
  './js/shapes',
  './js/circles',
  './js/lines',
  './js/heatmaps',
  './js/directions',
  'css!./styles/main-style.css',
  'css!./styles/markerstyle.css',
  'async!https://maps.google.com/maps/api/js?libraries=visualization&sensor=false', //add API to the URL if needed
  'markerclusterer'
  ],
function ($, qlik, extension_properties, MarkerClusterer) {
	return {
    initialProperties: {
      version: 1.0,
      qListObjectDef: {
        qShowAlternatives: true,
        qFrequencyMode: "V",
        selectionMode : "CONFIRM",
        qInitialDataFetch: [{
          qWidth: 2,
          qHeight: 50
        }]
      }
    },
    snapshot : {
     canTakeSnapshot : true
    },



    definition: extension_properties,

		paint: function ($element, layout) {
      layout2=layout;

      app_this = this;

      //checking for the coordinates field info in the list
      var dimension_info="";
      if(this.backendApi.getDimensionInfos())
        dimension_info=this.backendApi.getDimensionInfos();

      if(dimension_info!="")
        layout.properties.mapData.coordinates=dimension_info[0].qFallbackTitle;

      var app = qlik.currApp(this); //openActualApp(qlik);
      
      defaultZoom = layout.properties.zoomAPI.defaultZoom;
      //createMap();

      //check for the calculation condition
      app.createCube( { qDimensions : [
            { qDef : { qFieldDefs : ["="+layout.properties.mapData.coordinates] } }
            ], qMeasures : [{ qDef : { qDef : layout.properties.mapData.measure, qLabel :"Measure" } }],
            qCalcCond: layout.properties.mapData.calculationCondition,
            qInitialDataFetch: [{qHeight: 10, qWidth: 1}]}, function (reply){ 
              if(reply.qHyperCube.qError){//calculation condition unfulfilled or error
                if(reply.qHyperCube.qError.qErrorCode=7005){ 
                  createMap(false);
                }
                else{
                  console.log("Something went wrong. Check for Error info:");
                  console.log(reply.qHyperCube.qError);
                }
              } //calculation condition unfulfilled or error
              else{//calculation condition fulfilled
                createMap(true);

                //launch markers
                if(layout.properties.markersBasicConfig.activateMarkers){

                  var markersProperties = {
                                    mapData: layout.properties.mapData,
                                    basicConfig: layout.properties.markersBasicConfig,
                                    titleLabel: layout.properties.markersTitleLabelConfig,
                                    advancedConfig: layout.properties.markersAdvancedConfig,
                                    clustering: layout.properties.markersClusterConfig,
                                    circles: {
                                      activateCircles: layout.properties.shapesBasicConfig.activateCircles && layout.properties.shapesBasicConfig.activateShapes,
                                      circleRadius: layout.properties.shapesBasicConfig.circleRadius,
                                      circlesLayout: layout.properties.shapesLayout
                                    }
                  };

                  //launching the markers
                  createMarkersHyperCube(markersProperties, app);
                }

                //launch shapes
                if(layout.properties.shapesBasicConfig.activateShapes){

                  var shapesProperties = {
                                    mapData: layout.properties.mapData,
                                    basicConfig: layout.properties.shapesBasicConfig,
                                    shapesLayout: layout.properties.shapesLayout,
                                    shapesAdvancedConfig: layout.properties.shapesAdvancedConfig,
                                    activatedMarkers: layout.properties.markersBasicConfig.activateMarkers
                  };

                  createShapesHyperCube(shapesProperties, app);
                }

                //launch lines
                if(layout.properties.linesBasicConfig.activateLines){

                  var linesProperties = {
                                    mapData: layout.properties.mapData,
                                    basicConfig: layout.properties.linesBasicConfig,
                                    linesLayout: layout.properties.linesLayout,
                                    linesAdvancedConfig: layout.properties.linesAdvancedConfig
                  };

                  createLinesHyperCube(linesProperties, app);
                }

                //launch heatmaps
                if(layout.properties.heatmapsConfig.activateHeatmap){

                  var heatmapsProperties = {
                                    mapData: layout.properties.mapData,
                                    basicConfig: layout.properties.heatmapsConfig,
                                    colors: layout.properties.heatmapsColors,
                                    heatmapsAdvancedConfig: layout.properties.heatmapsAdvancedConfig
                  };

                  createHeatmapsHyperCube(heatmapsProperties, app);
                }

                //launching directions
                if(layout.properties.p2pConfig.activateP2PDirections){

                  if(layout.properties.p2pConfig.simpleDirections){
                    var directionsProperties = {
                                  simpleDirections: layout.properties.p2pConfig.simpleDirections,
                                  startCoordinates: {
                                    lat: parseFloat(layout.properties.p2pConfig.startLat),
                                    lng: parseFloat(layout.properties.p2pConfig.startLong)
                                  },
                                  endCoordinates: {
                                    lat: parseFloat(layout.properties.p2pConfig.endLat),
                                    lng: parseFloat(layout.properties.p2pConfig.endLong)
                                  },
                                  drivingModeConfig: layout.properties.p2pConfig.drivingModeConfig
                    }
                  drawDirections(null, directionsProperties, null);
                  }else{
                    var directionsProperties = {
                                  mapData: layout.properties.mapData,
                                  simpleDirections: layout.properties.p2pConfig.simpleDirections,
                                  drivingModeConfig: layout.properties.p2pConfig.drivingModeConfig,
                                  hasConfiguredMarkers: layout.properties.markersBasicConfig.activateMarkers
                    }
                    createDirectionsHyperCube(directionsProperties, app);
                  }
                }
              }
            }//calculation condition fulfilled
      ); 
      
      /***********************************
      ** Render Base Map
      ************************************/
      function createMap(calc_condition){
        if(calc_condition){
          $element.css("background-color","rgb(229, 227, 223)");
          var map_types=new Array();
          if(layout.properties.mapTypes.roadMap) map_types.push(google.maps.MapTypeId.ROADMAP);
          if(layout.properties.mapTypes.satellite) map_types.push(google.maps.MapTypeId.SATELLITE);
          if(layout.properties.mapTypes.hybrid) map_types.push(google.maps.MapTypeId.HYBRID);
          if(layout.properties.mapTypes.terrain) map_types.push(google.maps.MapTypeId.TERRAIN);

          var mapOptions = {
            mapTypeControlOptions: {
              mapTypeIds: map_types
              },
            mapTypeId: map_types[0],
            streetViewControl: layout.properties.mapViews.streetView,
            zoom: layout.properties.zoomAPI.defaultZoom
          };

          map = new google.maps.Map($element.get(0), mapOptions);

          layout.properties.mapViews.hr45degree==1? map.setTilt(45) : map.setTilt(0);

          latlngbounds = new google.maps.LatLngBounds();

          updateMapPosition();
        }
        else{
          $element.css("background-color","rgba(255,255,255,0)");
          $element.html(layout.properties.mapData.calculationConditionMessage=='null' || layout.properties.mapData.calculationConditionMessage=='' ? 'Calculation condition unfulfilled' : layout.properties.mapData.calculationConditionMessage);
        }
      }        
		}
	};
} );

var latlngbounds;
var map;
var defaultZoom;
var layout2;
var app_this;
var selections_done = false;
var cube_height = 100;

/***********************************
** Extending bounds of the map for correct zoom based on actual contents
************************************/
function extendMapBounds(coordinates){
  latlngbounds.extend(new google.maps.LatLng(parseFloat(coordinates[0]),parseFloat(coordinates[1])));
}


/***********************************
** Updating zoom and position of the map for actual contents
************************************/
function updateMapPosition(){
  if(!latlngbounds.isEmpty()){
      map.fitBounds(latlngbounds);

      map.setCenter(latlngbounds.getCenter());
      map.setZoom(map.getZoom()-1);
    }else{
      if(defaultZoom==NaN || defaultZoom=='') defaultZoom=4;
      map.setCenter(new google.maps.LatLng(55.716258,13.221009));
      map.setZoom(defaultZoom);
    }
}