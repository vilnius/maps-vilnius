var MAPCONFIG = {
	themes: {
		buildings: {
			production: true, //if theme is ready for production
			custom: true, // true if theme funcionality is custom  
			name: "Pastatai ir statyba", //theme name
			id: "theme-buildings", //theme id class and theme URL query name
			imgUrl: "/maps_vilnius/img/statyba.png", //image URL
			imgAlt: "Pastatai ir statyba", // image alt attribute
			layers: {
				administravimas: { // layer unique name
					dynimacLayerUrls:  // dynamicService URL, only 1 url per uniquer Layer
						"https://zemelapiai.vplanas.lt/arcgis/rest/services/Interaktyvus_zemelapis/Pastatu_administravimas/MapServer",
					featureLayerUrls: [
						"https://zemelapiai.vplanas.lt/arcgis/rest/services/Interaktyvus_zemelapis/Pastatu_administravimas/MapServer/1"
					]
				}
			}
		},
		energetics: {
			production: false, //if theme is ready for production
			custom: true, // true if theme funcionality is custom  
			name: "Energetika", //theme name
			id: "theme-energetics", //theme id class and theme URL query name
			imgUrl: "/maps_vilnius/img/statyba.png", //image URL
			imgAlt: "Energetika", // image alt attribute
			layers: {
				energetika: { // layer unique name
					dynimacLayerUrls:  // dynamicService URL, only 1 url per uniquer Layer
						"https://zemelapiai.vplanas.lt/arcgis/rest/services/Interaktyvus_zemelapis/Energetika/MapServer",
					featureLayerUrls: [
						"https://zemelapiai.vplanas.lt/arcgis/rest/services/Interaktyvus_zemelapis/Energetika/MapServer/0"
					]
				}
			}
		},
		itvTheme: {
		  url: "https://maps.vilnius.lt/projektai",
		  production: true, //if theme is ready for production
		  hide: false, //hide from themes menu, but add route with functionality
		  version: "arcgis4",
		  custom: true,
		  name: "Investiciniai projektai", //theme name
		  id: "theme-itv", //theme id class and theme URL query name
		  imgUrl: "/maps_vilnius/img//projektai.png", //image URL
		  imgAlt: "Investiciniai projektai", // image alt attribute
		  layers: {
			//maps layers for scaling on map
			mapLayer: 'https://zemelapiai.vplanas.lt/arcgis/rest/services/TESTAVIMAI/ITV_test_masteliavimas_no_goups_p/MapServer',
			//all projects (converted to polygon) for lsiting and identify features
			uniqueProjects: 'https://zemelapiai.vplanas.lt/arcgis/rest/services/Interaktyvus_zemelapis/ITV_bendri/MapServer/0',
			//identify map service
			identifyLayer: 'https://zemelapiai.vplanas.lt/arcgis/rest/services/Interaktyvus_zemelapis/ITV_bendri/MapServer'
		  }
		},
		advertise: {
			production: true, //if theme is ready for production
			custom: true, // true if theme funcionality is custom  
			name: "Reklamos leidimai", //theme name
			id: "ad", //theme id class and theme URL query name
			imgUrl: "/maps_vilnius/img/laisvalaikis.png", //image URL
			imgAlt: "Reklamos vietos" // image alt attribute
		},
		schools: {
			production: true, //if theme is ready for production
			custom: true,
			name: "Švietimas", //theme name
			id: "schools", //theme id class and theme URL query name
			imgUrl: "/maps_vilnius/img/svietimas.png", //image URL
			imgAlt: "Švietimas", // image alt attribute
			layers: {
				mokyklos: { // layer unique name // 
					dynimacLayerUrls:  //  dynamicService URL, only 1 url per uniquer Layer
						"https://zemelapiai.vplanas.lt/arcgis/rest/services/Interaktyvus_zemelapis/Mokyklos/MapServer"
				}
			}
		},
		teritory: {
			url: "https://maps.vilnius.lt/teritoriju-planavimas",
			production: true, //if theme is ready for production
			name: "Teritorijų planavimas", //theme name
			id: "teritory-planning", //theme id class and theme URL query name
			imgUrl: "/maps_vilnius/img/teritorijos.png", //image URL
			imgAlt: "Teritorijų planavimas", // image alt attribute
			layers: {
                teritorijuPlanavimas: { // layer unique name // 
					dynimacLayerUrls:  // dynamicService URL, only 1 url per uniquer Layer
						"https://zemelapiai.vplanas.lt/arcgis/rest/services/Interaktyvus_zemelapis/Teritoriju_planavimas/MapServer",
					name: "Teritorijų planavimas:",
					isGroupService: true
				}
			}
		},
		teritoryReturn: {
			url: "https://maps.vilnius.lt/zemes-grazinimas",
			production: true, //if theme is ready for production
			name: "Žemės grąžinimas", //theme name
			id: "teritory-return", //theme id class and theme URL query name
			imgUrl: "/maps_vilnius/img/zeme.png", //image URL
			imgAlt: "Teritorijų grąžinimas", // image alt attribute
			layers: {
                teritorijuGrazinimas: { // layer unique name // 
					dynimacLayerUrls:  // dynamicService URL, only 1 url per uniquer Layer
						"https://zemelapiai.vplanas.lt/arcgis/rest/services/Interaktyvus_zemelapis/Zemes_grazinimas/MapServer",
					name: "Teritorijų grąžinimas:",
					isGroupService: true
				}
			}
		},
		TeritoryMaintenance: {
			url: "https://maps.vilnius.lt/miesto-tvarkymas",
			production: true, //if theme is ready for production
			name: "Miesto tvarkymas", //theme name
			id: "teritory-maintenance", //theme id class and theme URL query name
			imgUrl: "/maps_vilnius/img/tvarkymas.png", //image URL
			imgAlt: "Miesto tvarkymas", // image alt attribute
			layers: {
				miestoTvarkymas: { // layer unique name // 
					dynimacLayerUrls:  // dynamicService URL, only 1 url per uniquer Layer
						"https://zemelapiai.vplanas.lt/arcgis/rest/services/Interaktyvus_zemelapis/Miesto_tvarkymas/MapServer",
					name: "Miesto tvarkymas:", // dynamicLayers group name
                    isGroupService: true
				}
			}
		},
		environment: {
			url: "https://maps.vilnius.lt/aplinkosauga",
			production: true, //if theme is ready for production
			name: "Aplinkosauga", //theme name
			id: "env", //theme id class and theme URL query name
			imgUrl: "/maps_vilnius/img/aplinkosauga.png", //image URL
			imgAlt: "Aplinkosauga", // image alt attribute
			layers: {
				aplinkosauga: { // layer unique name // 
					dynimacLayerUrls:  // dynamicService URL, only 1 url per uniquer Layer
						"https://zemelapiai.vplanas.lt/arcgis/rest/services/Interaktyvus_zemelapis/Aplinkosauga/MapServer",
					name: "Aplinkosauginiai sluoksniai:", // dynamicLayers group name
					isGroupService: true // if layers has grouping in mxd / value for administration purpose only
				}
			}
		},
        publicOffices: {
			production: false, //if theme is ready for production
			name: "Viešos įstaigos", //theme name
			id: "public-offices", //theme id class and theme URL query name
			imgUrl: "/maps_vilnius/img/tvarkymas.png", //image URL
			imgAlt: "Viešos įstaigos", // image alt attribute
			layers: {
				viesosIstaigos: { // layer unique name // 
					dynimacLayerUrls:  // dynamicService URL, only 1 url per uniquer Layer
						"https://zemelapiai.vplanas.lt/arcgis/rest/services/Interaktyvus_zemelapis/Viesos_istaigos/MapServer",
					name: "Viešos įstaigos" // dynamicLayers group name
				}
			}
		},
        cyclingTracks: {
			url: "https://maps.vilnius.lt/transportas",
			production: true, //if theme is ready for production
			name: "Transportas / Dviračiai", //theme name
			id: "cycling-tracks", //theme id class and theme URL query name
			imgUrl: "/maps_vilnius/img/dviraciai.png", //image URL
			imgAlt: "Transportas / Dviračių takai", // image alt attribute
			layers: {
				transportas: { // layer unique name // 
					dynimacLayerUrls:  // dynamicService URL, only 1 url per uniquer Layer
						"https://zemelapiai.vplanas.lt/arcgis/rest/services/Interaktyvus_zemelapis/Transportas/MapServer",
					name: "Transportas / Dviračiai:" // dynamicLayers group name
				},
				accidentsRaster: { // layer unique name // 
					dynimacLayerUrls:  // dynamicService URL, only 1 url per uniquer Layer
						"https://zemelapiai.vplanas.lt/arcgis/rest/services/Interaktyvus_zemelapis/Eismo_ivykiu_tankumas/MapServer",
					name: "Eismo įvykių tankumas" // dynamicLayers group name
				}
			}
		},
		leisure: {
		  url: "https://maps.vilnius.lt/laisvalaikis",
		  production: true, //if theme is ready for production
		  name: "Laisvalaikis", //theme name
		  id: "laisvalaikis", //theme id class and theme URL query name
		  imgUrl: "/maps_vilnius/img/aktyvus-laisvalaikis.png", //image URL
		  imgAlt: "Laisvalaikis", // image alt attribute
		  layers: {
			laisvalaikis: { // layer unique name //
			  dynimacLayerUrls:  // dynamicService URL, only 1 url per uniquer Layer
			  "https://zemelapiai.vplanas.lt/arcgis/rest/services/Interaktyvus_zemelapis/Laisvalaikis/MapServer",
			  name: "Laisvalaikis" // dynamicLayers group name
			}
		  }
		},		
        publicCaffes: {
			url: "https://maps.vilnius.lt/kavines",
			production: true, //if theme is ready for production
			name: "Lauko kavinės", //theme name
			id: "caffee", //theme id class and theme URL query name
			imgUrl: "/maps_vilnius/img/kavines.png", //image URL
			imgAlt: "Lauko kavinės", // image alt attribute
			layers: {
				publicCaf: { // layer unique name // 
					dynimacLayerUrls:  // dynamicService URL, only 1 url per uniquer Layer
						"https://zemelapiai.vplanas.lt/arcgis/rest/services/Interaktyvus_zemelapis/lauko_kavines/MapServer",
					name: "Lauko kavinės" // dynamicLayers group name
				}
			}
		},
		civilSecurity: {
			url: "https://maps.vilnius.lt/civiline-sauga",
			production: true, //if theme is ready for production
			name: "Civilinė sauga", //theme name
			id: "civ-sauga", //theme id class and theme URL query name
			imgUrl: "/maps_vilnius/img/civiline-sauga.png", //image URL
			imgAlt: "Civilinė sauga", // image alt attribute
			layers: {
				publicCaf: { // layer unique name // 
					dynimacLayerUrls:  // dynamicService URL, only 1 url per uniquer Layer
						"https://zemelapiai.vplanas.lt/arcgis/rest/services/Interaktyvus_zemelapis/Civiline_sauga/MapServer",
					name: "Civilinė sauga" // dynamicLayers group name
				}
			}
		},
		legacyMap: {
			production: true, //if theme is ready for production
			custom: true, // true if theme funcionality is custom  
			name: "Senoji žemėlapio versija", //theme name
			id: "legacy", //theme id class and theme URL query name
			imgUrl: "/maps_vilnius/img/old_version.png", //image URL
			imgAlt: "Senoji versija", // image alt attribute
			url: "https://www.vilnius.lt/vmap/t1.php" // external url if required, if not - gets internal url depending on id property 
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
        basemapUrl: "https://zemelapiai.vplanas.lt/arcgis/rest/services/Baziniai_zemelapiai/Vilnius_basemap_1000/MapServer",
        ortofotoUrl: "https://zemelapiai.vplanas.lt/arcgis/rest/services/Baziniai_zemelapiai/ORT5LT_2016/MapServer",
        geometryUrl: "https://zemelapiai.vplanas.lt/arcgis/rest/services/Utilities/Geometry/GeometryServer"
    },
    themesServices: {
        buildingTheme: {
            featureLayerBuildings: "https://zemelapiai.vplanas.lt/arcgis/rest/services/Interaktyvus_zemelapis/Pastatu_administravimas/MapServer/1",
            dynamicLayerBuildings: "https://zemelapiai.vplanas.lt/arcgis/rest/services/Interaktyvus_zemelapis/Pastatu_administravimas/MapServer"
        },
		energeticsTheme: {
            featureLayerEnergetics: "https://zemelapiai.vplanas.lt/arcgis/rest/services/Interaktyvus_zemelapis/Energetika/MapServer/0",
            dynamicLayerEnergetics: "https://zemelapiai.vplanas.lt/arcgis/rest/services/Interaktyvus_zemelapis/Energetika/MapServer"
        },
        dynamicLayerAdverts: "https://zemelapiai.vplanas.lt/arcgis/rest/services/Interaktyvus_zemelapis/Reklamos_registro_leidimai/MapServer",
        featureLayerAdverts: "https://zemelapiai.vplanas.lt/arcgis/rest/services/Interaktyvus_zemelapis/Reklamos_registro_leidimai/MapServer/0"
    }
};