# GoogleMapsAPIv3Toolkit-QS
Qlik Sense extension to integrate main Google Maps API v3 features all in one place

Features included are:
  * Based on latitude and longitude coordinates (using Qlik Sense Geo Points)
  * Support main map types
      - Roadmap | Satellite | Terrain | Hybrid | 45º Imagery | Street View
  * Display Markers
      - With ability to customize multiple marker icons
      - Info Window | Title | Label
      - Selectable (returns single and multiple markers selections to Qlik Sense)
      - Marker Clustering
      - Move markers to new location in the map
  * Custom shapes (polygons)
      - Info Window
      - Selectable (returns single and multiple shapes selection to Qlik Sense)
      - Expression based coloring for multicolored shapes (i.e. based on a dimension)
  * Circles
      - Fast radius definition based on expression
      - Can be associated with markers (and moved with marker by the user)
      - Selectable (returns single and multiple circles selection to Qlik Sense)
      - Info Window
      - Expression based coloring for multicolored circles (i.e. based on a dimension)
  * Heatmaps
      - Weight is expression based
      - Custom color
  * Lines
      - Selectable (returns single and multiple lines selection to Qlik Sense)
      - Expression based coloring for multicolored shapes (i.e. based on a dimension)
      - Geodesic ready
  * Point to point directions
      - Display simple A-to-B direction based on origin and destination coordinates and driving mode type (i.e. walking or driving)
      - Display directions with up to 10 coordinates (origin, destination and 8 intermediate waypoints) based on driving mode type (i.e. walking or driving)
  * Story Telling Support
  	  - This extension can be added to stories within the Qlik Sense App   

An example and tutorial app can be found in the 'App Example and Tutorial' folder. This Qlik Sense App also has specific information about adding a Google API Key, fine-tuning InfoWindows and adding images inside the infowindow as well as format the Marker Labels.

Future features plan and bug corrections can be found in 'Future Releases'. 

The extension is at it's very early stage, if you see unexpected behaviors do a "clear cache refresh" to be sure it renders as expected.