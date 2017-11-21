# Vilnius maps

VCMA interactive maps based on ArcGis API (deprecated)
[www.maps.vilnius.lt](http://maps.vilnius.lt)

Maps used for old custom themes, to check new default Maps refer to [vilnius-maps-ng repo](https://github.com/vilnius/vilnius-maps-ng)

## Configuration file
Add default funcionality themes with Dynamic layers based on ArcMaps *.mxd project and REST services to and existing configuration.js file


## Example
``` HTML
// Create new theme with defaul Dynamic layer funcionality

themes: {
	buildingsTheme: { //add new unique theme
		custom: false; //default  value false
		name: "Pastatai ir statyba", //theme name
		id: "theme-buildings", //theme id class and theme URL query name
		imgUrl: "/maps_vilnius/img/statyba.png", //image URL
		imgAlt: "Pastatai ir statyba", // image alt attribute
		layers: {
			administration: { // 1st layer unique name
				// dynamicService URL, only 1 url per unique Layer
				dynimacLayerUrls: "http://zemelapiai.vplanas.lt/arcgis/rest/services/administration/MapServer"
			},
			heating: { // 2nd layer unique name.
				// dynamicService URL, only 1 url per unique Layer
				dynimacLayerUrls: "http://zemelapiai.vplanas.lt/arcgis/rest/services/heating/MapServer"
			}
		}
	}
}

```
