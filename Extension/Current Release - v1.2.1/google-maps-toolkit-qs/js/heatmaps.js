/***********************************
** Draw Heatmaps
************************************/
function drawHeatmaps(heatmapsCube, heatmapsProperties, app){
	 var markers= [];

	 for (var i=0;i<heatmapsCube.qHyperCube.qDataPages[0].qArea.qHeight;i++){
	  var row = heatmapsCube.qHyperCube.qDataPages[0].qMatrix[i];

		if(row[0].qText!='-' && row[1].qText!='-'){
	  	    var lat_lng_original = JSON.parse(row[0].qText);
        	var lat_lng=[lat_lng_original[1],lat_lng_original[0]]; //inverting the coordinates since they are originaly sent as long lat 

	  	  	markers[i]={
				  location: new google.maps.LatLng(parseFloat(lat_lng[0]),parseFloat(lat_lng[1])),
				  weight: parseFloat(row[2].qText)
			};
			extendMapBounds(lat_lng);
		}
	}

	var color_gradient = [];
	var color1=heatmapsProperties.colors.color1;
	var color2=heatmapsProperties.colors.color2;
	var color3=heatmapsProperties.colors.color3;

	var color_gradient = [];
	if(color1&&color2&&color3) {
		if(color1.charAt(0)=='#'&&color1.length==7&&color2.charAt(0)=='#'&&color2.length==7&&color3.charAt(0)=='#'&&color3.length==7){
			var rgb_color0='rgba('
							+parseInt(color1.substring(1,3),16)+','
							+parseInt(color1.substring(3,5),16)+','
							+parseInt(color1.substring(5),16)+',0)';
			var rgb_color1='rgba('
							+parseInt(color1.substring(1,3),16)+','
							+parseInt(color1.substring(3,5),16)+','
							+parseInt(color1.substring(5),16)+',1)';				
			var rgb_color2='rgba('
							+parseInt(color2.substring(1,3),16)+','
							+parseInt(color2.substring(3,5),16)+','
							+parseInt(color2.substring(5),16)+',1)';
			var rgb_color3='rgba('
							+parseInt(color3.substring(1,3),16)+','
							+parseInt(color3.substring(3,5),16)+','
							+parseInt(color3.substring(5),16)+',1)';
							
			color_gradient=[rgb_color0, rgb_color1, rgb_color2, rgb_color3];
		}	
		else color_gradient=['rgba(0,0,255,0)',color1, color2, color3];
	} //else 	

	var hm=new google.maps.visualization.HeatmapLayer({
												data: markers,
												opacity: parseFloat(heatmapsProperties.basicConfig.opacity),
												gradient: (color_gradient.length==0)? null : color_gradient,
												radius: parseFloat(heatmapsProperties.basicConfig.radius)
												}); 						
	
	hm.setMap(map);
	updateMapPosition();
}