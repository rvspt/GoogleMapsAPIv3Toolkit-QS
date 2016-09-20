define( [], function () {
	'use strict';

	// *****************************************************************************
	// Dimension for selection return
	// *****************************************************************************
	var dimensions = {
		type: "items",
		label: "Dimensions",
		ref: "qListObjectDef",
		min: 1,
		max: 1,
		show: false,
		items: {
			label: {
				type: "string",
				ref: "qListObjectDef.qDef.qFieldLabels.0",
				label: "Label",
				show: true
			},
			libraryId: {
				type: "string",
				component: "library-item",
				libraryItemType: "dimension",
				ref: "qListObjectDef.qLibraryId",
				label: "Dimension",
				show: function ( data ) {
					return data.qListObjectDef && data.qListObjectDef.qLibraryId;
				}
			},
			field: {
				type: "string",
				expression: "always",
				expressionType: "dimension",
				ref: "qListObjectDef.qDef.qFieldDefs.0",
				label: "Coords",
				show: function ( data ) {
					return data.qListObjectDef && !data.qListObjectDef.qLibraryId;
				}
			}
		}
	};
	
	// *****************************************************************************
	// Appearance section
	// *****************************************************************************
	var appearanceSection = {
		uses: "settings"
	};

	// *****************************************************************************
	// Basic Configuration of the map
	// *****************************************************************************
	var basicConfigurations = {
		type: "items",
		component: "expandable-items",
		label: "Map Basic Configuration",
		items: {
			mapData:{
				type: "items",
				label: "Map Data Definition",
				show: function( data ){ return data.qListObjectDef.qDef.qFieldDefs && data.qListObjectDef.qDef.qFieldDefs!=""; },
				items: {
					list_coords:{
						ref: "qListObjectDef.qDef.qFieldDefs.0",
						label: "Coordinates",
						type: "string",
						expression: ""
					},//qListObjectDef.qDef.qFieldDefs
					coordinates: {
						ref: "properties.mapData.coordinates",
						//ref: "qListObjectDef.qDef.qFieldDefs.0",
						label: "Hidden Coordinates",
						type: "string",
						expression: "",
						show: false
					},//basicConfigurations.items.mapData.items.coordinates
					measure: {
						ref: "properties.mapData.measure",
						label: "Measure",
						type: "string",
						expression: ""
					},//basicConfigurations.items.mapData.items.measure
					suppressZero: {
						ref: "properties.mapData.suppressZero",
						label: "Suppress Zero Values",
						type: "boolean",
						defaultValue: false
					},//basicConfigurations.items.mapData.items.suppressZero
					suppressMissing: {
						ref: "properties.mapData.suppressMissing",
						label: "Suppress Missing Values",
						type: "boolean",
						defaultValue: false
					},//basicConfigurations.items.mapData.items.suppressMissing
					calculationConditionToggle: {
						ref: "properties.mapData.calculationConditionToggle",
						label: "Calculation Condition",
						type: "boolean",
						component: "switch",
						options: [
							{ value: true, label: "Activated" },
							{ value: false, label: "No Calculation Condition"}
						],
						defaultValue: false
					},//basicConfigurations.items.mapData.items.calculationConditionToggle
					calculationCondition: {
						ref: "properties.mapData.calculationCondition",
						label: "Calculation Condition",
						type: "string",
						expression: "",
						show: function( data ){ return data.properties.mapData.calculationConditionToggle; }
					},//basicConfigurations.items.mapData.items.calculationCondition
					calculationConditionMessage: {
						ref: "properties.mapData.calculationConditionMessage",
						label: "Calculation Condition Message",
						component: "textarea",
						rows: 3,
						expression: "",
						show: function( data ){ return data.properties.mapData.calculationConditionToggle; }
					},//basicConfigurations.items.mapData.items.calculationCondition
					sortByExpression: {
						ref: "properties.mapData.sortByExpression",
						label: "Sort by expression",
						type: "boolean",
						component: "switch",
						options: [
							{ value: true, label: "Activated" },
							{ value: false, label: "Sorted Alphabetically"}
						],
						defaultValue: false
					},//basicConfigurations.items.mapData.items.sortByExpression
					sortExpression: {
						ref: "properties.mapData.sortExpression",
						label: "Sort Expression",
						type: "string",
						expression: "",
						show: function( data ){ return data.properties.mapData.sortByExpression; }
					},//basicConfigurations.items.mapData.items.sortExpression
					sortOrder: {
						ref:"properties.mapData.sortOrder",
						label: "Sort Order",
						type: "string",
						component: "dropdown",
						options: [
							{ value: "Ascending", label: "Ascending" },
							{ value: "Descending", label: "Descending" }
						],
						show: function( data ){ return data.properties.mapData.sortByExpression; }
					}
				}//basicConfigurations.items.mapData.items
			},//basicConfigurations.items.mapData
			mapTypes: {
				type: "items",
				label: "Map Types",
				show: function( data ){ return data.qListObjectDef.qDef.qFieldDefs && data.qListObjectDef.qDef.qFieldDefs!=""; },
				items:{
					roadMap: {
						ref: "properties.mapTypes.roadMap",
						label: "Show Roadmap",
						type: "boolean",
						component: "switch",
						options:[
							{value: true, label: "Show"},
							{value: false, label: "Hide"}
						],
						defaultValue: true
					},//basicConfigurations.items.mapTypes.items.mapTypeRoadMap
					satellite: {
						ref: "properties.mapTypes.satellite",
						label: "Show Satellite",
						type: "boolean",
						component: "switch",
						options:[
							{value: true, label: "Show"},
							{value: false, label: "Hide"}
						],
						defaultValue: false
					},//basicConfigurations.items.mapTypes.items.satellite
					hybrid: {
						ref: "properties.mapTypes.hybrid",
						label: "Show Hybrid",
						type: "boolean",
						component: "switch",
						options:[
							{value: true, label: "Show"},
							{value: false, label: "Hide"}
						],
						defaultValue: false
					},//basicConfigurations.items.mapTypes.items.hybrid
					terrain: {
						ref: "properties.mapTypes.terrain",
						label: "Show Terrain",
						type: "boolean",
						component: "switch",
						options:[
							{value: true, label: "Show"},
							{value: false, label: "Hide"}
						],
						defaultValue: false
					}//basicConfigurations.items.mapTypes.items.terrain
				}//basicConfigurations.items.mapTypes.items
			},//basicConfigurations.items.mapTypes
			mapViews: {
				type: "items",
				label: "Street View and 45º Imagery",
				show: function( data ){ return data.qListObjectDef.qDef.qFieldDefs && data.qListObjectDef.qDef.qFieldDefs!=""; },
				items:{
					streetView: {
						ref: "properties.mapViews.streetView",
						label: "Allow Street View",
						type: "boolean",
						component: "switch",
						options:[
							{value: true, label: "Show"},
							{value: false, label: "Hide"}
						],
						defaultValue: true
					},//basicConfigurations.items.mapViews.items.streetView
					hr45degree: {
						ref: "properties.mapViews.hr45degree",
						label: "Show 45º Imagery",
						type: "boolean",
						component: "switch",
						options:[
							{value: true, label: "Show"},
							{value: false, label: "Hide"}
						],
						defaultValue: false
					}//basicConfigurations.items.mapViews.items.hr45degree
				}//basicConfigurations.items.mapViews.items
			},//basicConfigurations.items.mapViews
			zoomAPI: {
				type: "items",
				label: "Zoom",
				// label: "Zoom and API",
				show: function( data ){ return data.qListObjectDef.qDef.qFieldDefs && data.qListObjectDef.qDef.qFieldDefs!=""; },
				items:{
					defaultZoom: {
						ref: "properties.zoomAPI.defaultZoom",
						label: "Default Zoom Level",
						type: "integer",
						defaultValue: 4
					},//basicConfigurations.items.zoomAPI.items.defaultZoom
					APIKey: {
						ref: "properties.zoomAPI.APIKey",
						label: "Google API Key",
						type: "string",
						show: false
					}//basicConfigurations.items.zoomAPI.items.APIKey
				}//basicConfigurations.items.zoomAPI.items
			}//basicConfigurations.items.zoomAPI
		} //basicConfigurations.items
	}; //basicConfigurations

	// *****************************************************************************
	// Markers Configuration
	// *****************************************************************************
	var markersConfiguration = {
		type: "items",
		component: "expandable-items",
		label: "Markers Configuration",
		items: {
			activateMarkers: {
				ref: "properties.markersBasicConfig.activateMarkers",
				label: "Activate Markers",
				type: "boolean",
				component: "switch",
				options:[
					{value: true, label: "Activated"},
					{value: false, label: "Not Activated"}
				],
				show: function( data ){ return data.qListObjectDef.qDef.qFieldDefs && data.qListObjectDef.qDef.qFieldDefs!=""; },
				defaultValue: false
			},//markersConfiguration.items.markersBasicConfig.items.activateMarkers
			markersBasicConfig: {
				type: "items",
				label: "Basic Configuration",
				show: function( data ){return data.properties.markersBasicConfig.activateMarkers && data.qListObjectDef.qDef.qFieldDefs && data.qListObjectDef.qDef.qFieldDefs!=""; },
				// show: function(){return layout2.properties.markersBasicConfig.activateMarkers},
				items: {
					infoWindow: {
						ref: "properties.markersBasicConfig.infoWindow",
						label: "Info Window Contents",
						type: "string",
						expression: ""
					},//markersConfiguration.items.markersBasicConfig.items.infoWindow
					customMarkerIcon: {
						ref: "properties.markersBasicConfig.customMarkerIcon",
						label: "Customize Marker Icon",
						type: "boolean",
						component: "switch",
						options:[
							{value: true, label: "Custom"},
							{value: false, label: "Default"}
						],
						defaultValue: false
					},//markersConfiguration.items.markersBasicConfig.items.customMarkerIcon
					customIconSource:{
						ref: "properties.markersBasicConfig.customIconSource",
						label: "Custom Icon URL Source",
						type: "string",
						component: "dropdown",
						options: [{
									value: "DefaultLibrary",
									label: "Default Library"
								}, {
								// 	value: "CustomLibrary",
								// 	label: "Custom Library"
								// }, {
									value: "ExtensionFolder",
									label: "Extension Images Folder"
								}, {
									value: "OtherURL",
									label: "Other URL"
								}],
						defaultValue: "DefaultLibrary"//,
						// show: function(){return layout2.properties.markersBasicConfig.customMarkerIcon}
					},//markersConfiguration.items.markersBasicConfig.items.customIconSource
					customIconURL: {
						ref: "properties.markersBasicConfig.customIconURL",
						label: "Custom Icon Image/URL",
						type: "string",
						expression: ""//,
						// show: function(){return layout2.properties.markersBasicConfig.customMarkerIcon}
					}//markersConfiguration.items.markersBasicConfig.items.customIconURL
				}//markersConfiguration.items.markersBasicConfig.items
			},//markersConfiguration.items.markersBasicConfig
			markersTitleLabelConfig: {
				type: "items",
				label: "Title and Labeling",
				show: function( data ){ return data.properties.markersBasicConfig.activateMarkers && data.qListObjectDef.qDef.qFieldDefs && data.qListObjectDef.qDef.qFieldDefs!=""; },
				// show: function(){return layout2.properties.markersBasicConfig.activateMarkers},
				items: {
					markerTitle: {
						ref: "properties.markersTitleLabelConfig.markerTitle",
						label: "Marker Title",
						type: "string",
						expression: ""
					},//markersConfiguration.items.markersTitleLabelConfig.items.markerTitle
					markerLabel: {
						ref: "properties.markersTitleLabelConfig.markerLabel",
						label: "Marker Label",
						type: "string",
						expression: ""
					},//markersConfiguration.items.markersTitleLabelConfig.items.markerLabel
					labelHPosition: {
						ref: "properties.markersTitleLabelConfig.labelHPosition",
						label: "Label Horizontal Position",
						type: "integer"
					},//markersConfiguration.items.markersTitleLabelConfig.items.labelHPosition
					labelVPosition: {
						ref: "properties.markersTitleLabelConfig.labelVPosition",
						label: "Label Vertical Position",
						type: "integer"
					}//markersConfiguration.items.markersTitleLabelConfig.items.labelVPosition
				}//markersConfiguration.items.markersTitleLabelConfig.items
			},//markersConfiguration.items.markersTitleLabelConfig
			markersAdvancedConfig:{
				type: "items",
				label: "Advanced Options",
				show: function( data ){ return data.properties.markersBasicConfig.activateMarkers && data.qListObjectDef.qDef.qFieldDefs && data.qListObjectDef.qDef.qFieldDefs!=""; },
				// show: function(){return layout2.properties.markersBasicConfig.activateMarkers},
				items: {
					moveMarkers: {
						ref: "properties.markersAdvancedConfig.moveMarkers",
						label: "User Moves Markers",
						type: "boolean",
						component: "switch",
						options:[
							{value: true, label: "Allowed"},
							{value: false, label: "Position Fixed"}
						],
						defaultValue: false
					},//markersConfiguration.items.markersAdvancedConfig.items.moveMarkers
					forceMultiIcon: {
						ref: "properties.markersAdvancedConfig.forceMultiIcon",
						label: "Force Multiple Icons",
						type: "boolean",
						component: "switch",
						options:[
							{value: true, label: "Overriding Basic Icon Configuration"},
							{value: false, label: "Single Icon"}
						],
						defaultValue: false
					},//markersConfiguration.items.markersAdvancedConfig.items.forceMultiIcon
					multiIconSource:{
						ref: "properties.markersAdvancedConfig.multiIconSource",
						label: "Custom Icon URL Source",
						type: "string",
						component: "dropdown",
						options: [{
									value: "DefaultLibrary",
									label: "Default Library"
								}, {
								// 	value: "CustomLibrary",
								// 	label: "Custom Library"
								// }, {
									value: "ExtensionFolder",
									label: "Extension Images Folder"
								}, {
									value: "OtherURL",
									label: "Other URL"
								}],
						defaultValue: "DefaultLibrary"//,
						// show: function(){return layout2.properties.markersAdvancedConfig.forceMultiIcon}
					},//markersConfiguration.items.markersBasicConfig.items.customIconSource
					multiIconPath: {
						ref: "properties.markersAdvancedConfig.multiIconPath",
						label: "Icons Path",
						type: "string",
						expression: ""//,
						// show: function(){return layout2.properties.markersAdvancedConfig.forceMultiIcon}
					},//markersConfiguration.items.markersAdvancedConfig.items.multiIconPath
					maximumAllowedMarkers:{
						ref: "properties.markersAdvancedConfig.maxAllowedMarkers",
						label: "Maximum # Markers Allowed to Calculate",
						type: "number",
						expression: "",
						defaultValue: "1000" 
					}//markersConfiguration.items.markersAdvancedConfig.items.maximumMarkersAllowed
				}//markersConfiguration.items.markersAdvancedConfig.items
			},//markersConfiguration.items.markersAdvancedConfig
			markersClusterConfig:{
				type: "items",
				label: "Clustering",
				show: function( data ){ return data.properties.markersBasicConfig.activateMarkers && data.qListObjectDef.qDef.qFieldDefs && data.qListObjectDef.qDef.qFieldDefs!=""; },
				// show: function(){return layout2.properties.markersBasicConfig.activateMarkers},
				items: {
					clusterMarkers: {
						ref: "properties.markersClusterConfig.clusterMarkers",
						label: "Cluster Markers",
						type: "boolean",
						component: "switch",
						options:[
							{value: true, label: "Clustering"},
							{value: false, label: "Not Clustering"}
						],
						defaultValue: false
					},//markersConfiguration.items.markersClusterConfig.items.clusterMarkers
					clusterSize: {
						ref: "properties.markersClusterConfig.clusterSize",
						label: "Cluster Size",
						type: "integer",
						defaultValue: 30//,
						// show: function(){return layout2.properties.markersClusterConfig.clusterMarkers}
					},//markersConfiguration.items.markersClusterConfig.items.clusterSize
					clusterZoom: {
						ref: "properties.markersClusterConfig.clusterZoom",
						label: "Max Cluster Zoom",
						type: "integer",
						defaultValue: 15//,
						// show: function(){return layout2.properties.markersClusterConfig.clusterMarkers}
					}//markersConfiguration.items.markersClusterConfig.items.clusterZoom
				}//markersConfiguration.items.markersClusterConfig.items
			}//markersConfiguration.items.markersClusterConfig
		}//markersConfiguration.items
	};//markersConfiguration

	// *****************************************************************************
	// Shapes Configuration
	// *****************************************************************************
	var shapesConfiguration = {
		type: "items",
		component: "expandable-items",
		label: "Shapes Configuration",
		items: {
		activateShapes: {
				ref: "properties.shapesBasicConfig.activateShapes",
				label: "Activate Shapes or Circles",
				type: "boolean",
				component: "switch",
				options:[
					{value: true, label: "Activated"},
					{value: false, label: "Not Activated"}
				],
				defaultValue: false,
				show: function( data ){ return data.qListObjectDef.qDef.qFieldDefs && data.qListObjectDef.qDef.qFieldDefs!=""; }
			},//shapesConfiguration.items.shapesBasicConfig.items.activateShapes
			shapesBasicConfig: {
				type: "items",
				label: "Basic Configuration",
				show: function( data ){ return data.properties.shapesBasicConfig.activateShapes && data.qListObjectDef.qDef.qFieldDefs && data.qListObjectDef.qDef.qFieldDefs!=""; },
				// show: function(){return layout2.properties.shapesBasicConfig.activateShapes},
				items: {
					infoWindow: {
						ref: "properties.shapesBasicConfig.infoWindow",
						label: "Info Window Contents",
						type: "string",
						expression: ""
					},//shapesConfiguration.items.shapesBasicConfig.items.infoWindow
					shapeBy: {
						ref: "properties.shapesBasicConfig.shapeBy",
						label: "Shape By",
						type: "string",
						expression: ""
					},//shapesConfiguration.items.shapesBasicConfig.items.shapeBy
					activateCircles: {
						ref: "properties.shapesBasicConfig.activateCircles",
						label: "Activate Circles",
						type: "boolean",
						component: "switch",
						options:[
							{value: true, label: "Activated. Ignores 'Shape By'"},
							{value: false, label: "Not Activated"}
						],
						defaultValue: false
					},//shapesConfiguration.items.shapesBasicConfig.items.activateCircles
					circleRadius: {
						ref: "properties.shapesBasicConfig.circleRadius",
						label: "Circle Radius",
						type: "string",
						expression: ""//,
						// show: function(){return layout2.properties.shapesBasicConfig.activateCircles}
					}//shapesConfiguration.items.shapesBasicConfig.items.circleRadius
				}//shapesConfiguration.items.shapesBasicConfig.items
			},//shapesConfiguration.items.shapesBasicConfig
			shapesLayout: {
				type: "items",
				label: "Fill and Stroke",
				show: function( data ){ return data.properties.shapesBasicConfig.activateShapes && data.qListObjectDef.qDef.qFieldDefs && data.qListObjectDef.qDef.qFieldDefs!=""; },
				// show: function(){return layout2.properties.shapesBasicConfig.activateShapes},
				items: {
					strokeOpacity: {
						ref: "properties.shapesLayout.strokeOpacity",
						label: "Stroke Opacity",
						type: "number",
						expression: "optional",
						defaultValue: "0.8"
					},//shapesConfiguration.items.shapesLayout.items.strokeOpacity
					strokeWeight: {
						ref: "properties.shapesLayout.strokeWeight",
						label: "Stroke Weight",
						type: "number",
						expression: "optional",
						defaultValue: "1"
					},//shapesConfiguration.items.shapesLayout.items.strokeWeight
					strokeCalcColor: {
						ref: "properties.shapesLayout.strokeCalcColor",
						label: "Stroke Calculated Color",
						type: "string",
						expression: ""
					},//shapesConfiguration.items.shapesLayout.items.strokeCalcColor
					fillOpacity: {
						ref: "properties.shapesLayout.fillOpacity",
						label: "Fill Opacity",
						type: "number",
						expression: "optional",
						defaultValue: "0.4"
					},//shapesConfiguration.items.shapesLayout.items.fillOpacity
					fillCalcColor: {
						ref: "properties.shapesLayout.fillCalcColor",
						label: "Fill Calculated Color",
						type: "string",
						expression: ""
					}//shapesConfiguration.items.shapesLayout.items.fillCalcColor
				}//shapesConfiguration.items.shapesLayout.items
			},//shapesConfiguration.items.shapesLayout
			shapesAdvancedConfig:{
				type: "items",
				label: "Advanced Options",
				show: function( data ){ return data.properties.shapesBasicConfig.activateShapes && data.qListObjectDef.qDef.qFieldDefs && data.qListObjectDef.qDef.qFieldDefs!=""; },
				items: {
					maximumAllowedShapesPoints:{
						ref: "properties.shapesAdvancedConfig.maximumAllowedShapesPoints",
						label: "Maximum # Points Allowed to Calculate",
						type: "number",
						expression: "",
						defaultValue: "1600" 
					}//shapesConfiguration.items.shapesAdvancedConfig.items.maximumAllowedShapesPoints
				}//shapesConfiguration.items.shapesAdvancedConfig.items
			}//shapesConfiguration.items.shapesAdvancedConfig
		}//shapesConfiguration.items
	};//shapesConfiguration

	// *****************************************************************************
	// Lines Configuration
	// *****************************************************************************
	var linesConfiguration = {
		type: "items",
		component: "expandable-items",
		label: "Lines Configuration",
		items: {
			activateLines: {
				ref: "properties.linesBasicConfig.activateLines",
				label: "Activate Lines",
				type: "boolean",
				component: "switch",
				options:[
					{value: true, label: "Activated"},
					{value: false, label: "Not Activated"}
				],
				defaultValue: false,
				show: function( data ){ return data.qListObjectDef.qDef.qFieldDefs && data.qListObjectDef.qDef.qFieldDefs!=""; }
			},//linesConfiguration.items.linesBasicConfig.items.activateLines
			linesBasicConfig: {
				type: "items",
				label: "Basic Configuration",
				show: function( data ){ return data.properties.linesBasicConfig.activateLines && data.qListObjectDef.qDef.qFieldDefs && data.qListObjectDef.qDef.qFieldDefs!=""; },
				// show: function(){return layout2.properties.linesBasicConfig.activateLines},
				items : {
					lineBy: {
						ref: "properties.linesBasicConfig.lineBy",
						label: "Group Line By",
						type: "string",
						expression: "optional"
					}//linesConfiguration.items.linesBasicConfig.items.lineBy
				}//linesConfiguration.items.linesBasicConfig.items
			},//linesConfiguration.items.linesBasicConfig
			linesLayout: {
				type: "items",
				label: "Lines Layout",
				show: function( data ){ return data.properties.linesBasicConfig.activateLines && data.qListObjectDef.qDef.qFieldDefs && data.qListObjectDef.qDef.qFieldDefs!=""; },
				// show: function(){return layout2.properties.linesBasicConfig.activateLines},
				items: {
					lineWeight: {
						ref: "properties.linesLayout.lineWeight",
						label: "Line Weight",
						type: "number",
						expression: "optional",
						defaultValue: "1"
					},//shapesConfiguration.items.linesLayout.items.lineWeight
					lineCalcColor: {
						ref: "properties.linesLayout.lineCalcColor",
						label: "Line Calculated Color",
						type: "string",
						expression: ""
					},//shapesConfiguration.items.linesLayout.items.lineCalcColor
					lineOpacity: {
						ref: "properties.linesLayout.lineOpacity",
						label: "Line Opacity",
						type: "number",
						expression: "optional",
						defaultValue: "1"
					},//shapesConfiguration.items.linesLayout.items.lineOpacity
					activateGeodesic: {
						ref: "properties.linesLayout.activateGeodesic",
						label: "Activate Geodesic",
						type: "boolean",
						component: "switch",
						options:[
							{value: true, label: "Geodesic On"},
							{value: false, label: "Geodesic Off"}
						],
						defaultValue: false
					}//shapesConfiguration.items.linesLayout.items.activateGeodesic
				}//linesConfiguration.items.linesLayout.items
			},//linesConfiguration.items.linesLayout
			linesAdvancedConfig:{
				type: "items",
				label: "Advanced Options",
				show: function( data ){ return data.properties.linesBasicConfig.activateLines && data.qListObjectDef.qDef.qFieldDefs && data.qListObjectDef.qDef.qFieldDefs!=""; },
				items:{
					maximumAllowedLinesPoints:{
						ref: "properties.linesAdvancedConfig.maximumAllowedLinesPoints",
						label: "Maximum # Points Allowed to Calculate",
						type: "number",
						expression: "",
						defaultValue: "2000" 
					}//linesConfiguration.items.linesAdvancedConfig.items.maximumAllowedLinesPoints
				}//linesConfiguration.items.linesAdvancedConfig.items
			}//linesConfiguration.items.linesAdvancedConfig
		}//linesConfiguration.items
	};//linesConfiguration

	// *****************************************************************************
	// Heatmaps Configuration
	// *****************************************************************************
	var heatmapsConfiguration = {
		type: "items",
		component: "expandable-items",
		label: "Heatmaps Configuration",
		items: {
			activateHeatmap: {
				ref: "properties.heatmapsConfig.activateHeatmap",
				label: "Activate Heatmap",
				type: "boolean",
				component: "switch",
				options:[
					{value: true, label: "Activated"},
					{value: false, label: "Not Activated"}
				],
				defaultValue: false,
				show: function( data ){ return data.qListObjectDef.qDef.qFieldDefs && data.qListObjectDef.qDef.qFieldDefs!=""; }
			},//heatmapsConfiguration.items.heatmapsConfig.items.activateHeatmap
			heatmapsConfig: {
				type: "items",
				label: "General",
				show: function( data ){ return data.properties.heatmapsConfig.activateHeatmap && data.qListObjectDef.qDef.qFieldDefs && data.qListObjectDef.qDef.qFieldDefs!=""; },
				// show: function(){return layout2.properties.heatmapsConfig.activateHeatmap},
				items: {
					weight: {
						ref: "properties.heatmapsConfig.weight",
						label: "Weight",
						type: "string",
						expression: ""
					},//heatmapsConfiguration.items.heatmapsConfig.items.weight
					opacity: {
						ref: "properties.heatmapsConfig.opacity",
						label: "Opacity",
						type: "number",
						expression: "optional",
						defaultValue: "0.4"
					},//heatmapsConfiguration.items.heatmapsConfig.items.opacity
					radius: {
						ref: "properties.heatmapsConfig.radius",
						label: "Radius",
						type: "number",
						expression: "optional",
						defaultValue: "20"
					}//heatmapsConfiguration.items.heatmapsConfig.items.radius
				}//heatmapsConfiguration.items.heatmapsConfig.items
			},//heatmapsConfiguration.items.heatmapsConfig
			heatmapsColors: {
				type: "items",
				label: "Custom Colors",
				show: function( data ){ return data.properties.heatmapsConfig.activateHeatmap && data.qListObjectDef.qDef.qFieldDefs && data.qListObjectDef.qDef.qFieldDefs!=""; },
				// show: function(){return layout2.properties.heatmapsConfig.activateHeatmap},
				items: {
					color1: {
						ref: "properties.heatmapsColors.color1",
						label: "1st Color",
						type: "string",
						expression: "optional"
					},//heatmapsConfiguration.items.heatmapsColors.items.color1
					color2: {
						ref: "properties.heatmapsColors.color2",
						label: "2nd Color",
						type: "string",
						expression: "optional"
					},//heatmapsConfiguration.items.heatmapsColors.items.color2
					color3: {
						ref: "properties.heatmapsColors.color3",
						label: "3rd Color",
						type: "string",
						expression: "optional"
					}//heatmapsConfiguration.items.heatmapsColors.items.color3
				}//heatmapsConfiguration.items.heatmapsColors
			},//heatmapsConfiguration.items.heatmapsColors
			heatmapsAdvancedConfig:{
				type: "items",
				label: "Advanced Options",
				show: function( data ){ return data.properties.heatmapsConfig.activateHeatmap && data.qListObjectDef.qDef.qFieldDefs && data.qListObjectDef.qDef.qFieldDefs!=""; },
				items:{
					maximumAllowedHeatmapsPoints:{
						ref: "properties.heatmapsAdvancedConfig.maximumAllowedHeatmapsPoints",
						label: "Maximum # Points Allowed to Calculate",
						type: "number",
						expression: "",
						defaultValue: "3000" 
					}//heatmapsConfiguration.items.heatmapsAdvancedConfig.items.maximumAllowedHeatmapsPoints
				}//heatmapsConfiguration.items.heatmapsAdvancedConfig.items
			}//heatmapsConfiguration.items.heatmapsAdvancedConfig
		}//heatmapsConfiguration.items
	};//heatmapsConfiguration

	// *****************************************************************************
	// Point to Point Directions Configuration
	// *****************************************************************************
	var p2pConfiguration = {
		type: "items",
		component: "expandable-items",
		label: "Directions Configuration",
		items: {
			activateHP2PDirections: {
				ref: "properties.p2pConfig.activateP2PDirections",
				label: "Activate Directions",
				type: "boolean",
				component: "switch",
				options:[
					{value: true, label: "Activated"},
					{value: false, label: "Not Activated"}
				],
				defaultValue: false,
				show: function( data ){ return data.qListObjectDef.qDef.qFieldDefs && data.qListObjectDef.qDef.qFieldDefs!=""; }
			},//p2pConfiguration.items.p2pConfig.items.activateHP2PDirections
			p2pConfig: {
				type: "items",
				label: "Directions Setup",
				show: function( data ){ return data.properties.p2pConfig.activateP2PDirections && data.qListObjectDef.qDef.qFieldDefs && data.qListObjectDef.qDef.qFieldDefs!=""; },
				// show: function(){return layout2.properties.p2pConfig.activateP2PDirections},
				items: {
					simpleDirections:{
						ref: "properties.p2pConfig.simpleDirections",
						label: "Simple A-to-B Directions",
						type: "boolean",
						component: "switch",
						options: [
								{value: true, label: "Activated"},
								{value: false, label: "Directions With Waypoints activated. This is based on Coordinates, Measure and Sort By (max 10 points) from Map Basic Configuration."}
						],
						defaultValue: true
					},//p2pConfiguration.items.p2pConfig.items.simpleDirections
					startLat: {
						ref: "properties.p2pConfig.startLat",
						label: "Start Latitude",
						type: "string",
						expression: "optional",
						show: function ( data ){ return data.properties.p2pConfig.simpleDirections; }
					},//p2pConfiguration.items.p2pConfig.items.startLat
					startLong: {
						ref: "properties.p2pConfig.startLong",
						label: "Start Longitude",
						type: "string",
						expression: "optional",
						show: function ( data ){ return data.properties.p2pConfig.simpleDirections; }
					},//p2pConfiguration.items.p2pConfig.items.startLong
					endLat: {
						ref: "properties.p2pConfig.endLat",
						label: "End Latitude",
						type: "string",
						expression: "optional",
						show: function ( data ){ return data.properties.p2pConfig.simpleDirections; }
					},//p2pConfiguration.items.p2pConfig.items.endLat
					endLong: {
						ref: "properties.p2pConfig.endLong",
						label: "End Longitude",
						type: "string",
						expression: "optional",
						show: function ( data ){ return data.properties.p2pConfig.simpleDirections; }
					}//p2pConfiguration.items.p2pConfig.items.endLong
					// directionsTooltip: {
					// 	ref: "properties.p2pConfig.directionsTooltip",

					// }
				}//p2pConfiguration.items.p2pConfig.items
			},//p2pConfiguration.items.p2pConfig
			drivingModeConfig: {
				type: "items",
				ref: "properties.p2pConfig.drivingModeConfig",
				label: "Driving Mode",
				show: function( data ){ return data.properties.p2pConfig.activateP2PDirections && data.qListObjectDef.qDef.qFieldDefs && data.qListObjectDef.qDef.qFieldDefs!=""; },
				items: {
					singleDrivingMode:{
						ref: "properties.p2pConfig.drivingModeConfig.singleDrivingMode",
						label: "Predefined Driving Mode",
						type: "boolean",
						component: "switch",
						options: [
								{value: true, label: "Predefined"},
								{value: false, label: "User Defined"}
						],
						defaultValue: true
					},//p2pConfiguration.items.drivingModeConfig.items.singleDrivingMode
					multipleDrivingModeSelection: {
						ref: "properties.p2pConfig.drivingModeConfig.drivingMode",
						label: "Calculated Driving Mode",
						type: "string",
						expression: "optional",
						defaultValue: "",
						show: function (data) { return !data.properties.p2pConfig.drivingModeConfig.singleDrivingMode; }
					},//p2pConfiguration.items.drivingModeConfig.items.drivingMode
					singleDrivingModeSelection:{
						ref: "properties.p2pConfig.drivingModeConfig.drivingMode",
						label: "Driving Mode",
						type: "string",
						component: "dropdown",
						options: [
								{value: "DRIVING", label: "Driving"},
								{value: "WALKING", label: "Walking"}
						],
						defaultValue:"DRIVING",
						show: function (data) { return data.properties.p2pConfig.drivingModeConfig.singleDrivingMode; }
					}
				}//p2pConfiguration.items.drivingModeConfig.items
			}//p2pConfiguration.items.drivingModeConfig
		}//p2pConfiguration.items
	};//p2pConfiguration

	// *****************************************************************************
	// Main properties panel definition
	// *****************************************************************************
	return {
		type: "items",
		component: "accordion",
		items: {
			basicConfig: basicConfigurations,
			markersConfig: markersConfiguration,
			shapesConfig: shapesConfiguration,
			linesConfig: linesConfiguration,
			heatmapConfig: heatmapsConfiguration,
			p2pConfig: p2pConfiguration,
			appearance: appearanceSection,
			dimension: dimensions
		}
	};
}
);