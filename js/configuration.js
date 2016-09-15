var MAPCONFIG = {
	themes: {
		buildings: {
			custom: true, // true if theme funcionality is custom  
			name: "Pastatai ir statyba", //theme name
			id: "theme-buildings", //theme id class and theme URL query name
			imgUrl: "/maps_vilnius/img/statyba.png", //image URL
			imgAlt: "Pastatai ir statyba", // image alt attribute
			layers: {
				administravimas: { // layer unique name
					dynimacLayerUrls:  // dynamicService URL, only 1 url per uniquer Layer
						"http://zemelapiai.vplanas.lt/arcgis/rest/services/TESTAVIMAI/Demo/MapServer",
					featureLayerUrls: [
						"http://zemelapiai.vplanas.lt/arcgis/rest/services/TESTAVIMAI/Pastatu_administravimas_test/MapServer/1"
					]
				}
			}
		},
		advertise: {
			custom: true, // true if theme funcionality is custom  
			name: "Leidimai", //theme name
			id: "ad", //theme id class and theme URL query name
			imgUrl: "/maps_vilnius/img/laisvalaikis.png", //image URL
			imgAlt: "Reklamos vietos" // image alt attribute
		},
		teritory: {
			name: "Teritorijų planavimas", //theme name
			id: "teritory-planning", //theme id class and theme URL query name
			imgUrl: "/maps_vilnius/img/teritorijos.png", //image URL
			imgAlt: "Teritorijų planavimas", // image alt attribute
			layers: {
				bpPasiulymai: { // layer unique name // 
					dynimacLayerUrls:  // dynamicService URL, only 1 url per uniquer Layer
						"http://zemelapiai.vplanas.lt/arcgis/rest/services/Interaktyvus_zemelapis/BP_gyv_siulymai_interaktyviam_VMS_vaizdavimas/MapServer"
				}
			}
		},
		TeritoryMaintenance: {
			name: "Miesto tvarkymas", //theme name
			id: "teritory-maintenance", //theme id class and theme URL query name
			imgUrl: "/maps_vilnius/img/tvarkymas.png", //image URL
			imgAlt: "Miesto tvarkymas", // image alt attribute
			layers: {
				grindaTvarkomosTeritorijos: { // layer unique name // 
					dynimacLayerUrls:  // dynamicService URL, only 1 url per uniquer Layer
						"http://zemelapiai.vplanas.lt/arcgis/rest/services/Interaktyvus_zemelapis/Grinda_miesto_tvarkymo_darbai/MapServer"
				}
			}
		},		
		legacyMap: {
			custom: true, // true if theme funcionality is custom  
			name: "Senoji žemėlapio versija", //theme name
			id: "legacy", //theme id class and theme URL query name
			imgUrl: "/maps_vilnius/img/old_version.png", //image URL
			imgAlt: "Senoji versija", // image alt attribute
			url: "http://www.vilnius.lt/vmap/t1.php" // external url if required, if not - gets internal url depending on id property 
		},		
		schools: {
			custom: true,
			name: "Švietimas", //theme name
			id: "schools", //theme id class and theme URL query name
			imgUrl: "/maps_vilnius/img/svietimas.png", //image URL
			imgAlt: "Švietimas", // image alt attribute
			layers: {
				mokyklos: { // layer unique name // 
					dynimacLayerUrls:  //  dynamicService URL, only 1 url per uniquer Layer
						"http://zemelapiai.vplanas.lt/arcgis/rest/services/Interaktyvus_zemelapis/Mokyklos/MapServer"
				}
			}
		}
	},
    mapExtent: {
        "xmin": 555444.210800001,
        "ymin": 6051736.22,
        "xmax": 606967.016199999,
        "ymax": 6076388.28,
        "spatialReference": {
            "wkid": 3346
        }
    },
    staticServices: {
        basemapUrl: "http://zemelapiai.vplanas.lt/arcgis/rest/services/Baziniai_zemelapiai/Vilnius_basemap_1000/MapServer",
        ortofotoUrl: "http://zemelapiai.vplanas.lt/arcgis/rest/services/Baziniai_zemelapiai/ORT5LT_2013/MapServer",
        geometryUrl: "http://zemelapiai.vplanas.lt/arcgis/rest/services/Utilities/Geometry/GeometryServer"
    },
    themesServices: {
        buildingTheme : {
            featureLayerBuildings: "http://zemelapiai.vplanas.lt/arcgis/rest/services/TESTAVIMAI/Pastatu_administravimas_test/MapServer/1",
            dynamicLayerBuildings: "http://zemelapiai.vplanas.lt/arcgis/rest/services/TESTAVIMAI/Pastatu_administravimas_test/MapServer"
        },
        dynamicLayerAdverts: "http://zemelapiai.vplanas.lt/arcgis/rest/services/Interaktyvus_zemelapis/Reklamos_registro_leidimai/MapServer",
        featureLayerAdverts: "http://zemelapiai.vplanas.lt/arcgis/rest/services/Interaktyvus_zemelapis/Reklamos_registro_leidimai/MapServer/0"
    }
};