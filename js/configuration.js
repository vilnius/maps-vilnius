var MAPCONFIG = {
    mapSettings: {

    },
	themes: {
		buildings: {
			custom: true, // true if theme funcionality is custom  
			name: "Pastatai ir statyba", //theme name
			id: "theme-buildings", //theme id class and theme URL query name
			imgUrl: "/maps_vilnius/img/statyba.png", //image URL
			imgAlt: "Pastatai ir statyba", // image alt attribute
			layers: {
				administravimas: { // layer unique name
					dynimacLayerUrls:  // static dynamicServices URLs, only 1 url per uniquer Layer
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
					dynimacLayerUrls:  // static dynamicServices URLs, only 1 url per uniquer Layer
						"http://zemelapiai.vplanas.lt/arcgis/rest/services/BP/BP_gyv_siulymai_interaktyviam_VMS_vaizdavimas/MapServer"
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
					dynimacLayerUrls:  // static dynamicServices URLs, only 1 url per uniquer Layer
						"http://zemelapiai.vplanas.lt/arcgis/rest/services/Interaktyvus_zemelapis/Mokyklos/MapServer"
				}
			}
		},
		transport: {
			name: "Transportas", //theme name
			id: "transport", //theme id class and theme URL query name
			imgUrl: "/maps_vilnius/img/transportas.png", //image URL
			imgAlt: "Transportas", // image alt attribute
			layers: {
/*				transportLayer: { // layer unique name // 
					dynimacLayerUrls:  // static dynamicServices URLs, only 1 url per uniquer Layer
						"http://www.sviesoforai.lt/arcgis/rest/services/Vilnius_sde_dynamic/MapServer"
				},*/
				dviraciuTrasos: { // layer unique name // 
					dynimacLayerUrls:  // static dynamicServices URLs, only 1 url per uniquer Layer
						"http://zemelapiai.vplanas.lt/arcgis/rest/services/Aplinkosauga/dviraciai_sisp_dynamic/MapServer"
				},
				gatviuTvarkymas: { // layer unique name // 
					dynimacLayerUrls:  // static dynamicServices URLs, only 1 url per uniquer Layer
						"http://195.182.69.66/ArcGIS/rest/services/Interaktyviam_zemelapiui/Grinda_gatviu_tvarkymas2/MapServer"
				}
			}
		},
		demo: {
			name: "Demo versija", //theme name
			id: "demo", //theme id class and theme URL query name
			imgUrl: "/maps_vilnius/img/laisvalaikis.png ", //image URL
			imgAlt: "demo versija", // image alt attribute
			layers: {
				demoLayer: { // layer unique name // 
					dynimacLayerUrls:  // static dynamicServices URLs, only 1 url per uniquer Layer
						"http://zemelapiai.vplanas.lt/arcgis/rest/services/TESTAVIMAI/Demo/MapServer"
				},
				badministravimas: { // layer unique name
					dynimacLayerUrls:  // static dynamicServices URLs, only 1 url per uniquer Layer
						"http://zemelapiai.vplanas.lt/arcgis/rest/services/Interaktyvus_zemelapis/Reklamos_registro_leidimai/MapServer"
				},
/*				tesd: { // layer unique name
					dynimacLayerUrls:  // static dynamicServices URLs, only 1 url per uniquer Layer
						"http://zemelapiai.vplanas.lt/arcgis/rest/services/Interaktyvus_zemelapis/Vietines_rinkliavos_zonos/MapServer"
				},*/
				bp: { // layer unique name // 
					dynimacLayerUrls:  // static dynamicServices URLs, only 1 url per uniquer Layer
						"http://zemelapiai.vplanas.lt/arcgis/rest/services/Teritorijos/VBP_LGII/MapServer"
				}
			}
		},
		bpDemo: {
			name: "BP demo", //theme name
			id: "bp", //theme id class and theme URL query name
			imgUrl: "/maps_vilnius/img/laisvalaikis.png ", //image URL
			imgAlt: "bp demo versija", // image alt attribute
			layers: {
				bp: { // layer unique name // 
					dynimacLayerUrls:  // static dynamicServices URLs, only 1 url per uniquer Layer
						"http://zemelapiai.vplanas.lt/arcgis/rest/services/Teritorijos/VBP_LGII/MapServer"
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