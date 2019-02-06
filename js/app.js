var MAPCONFIG = {
	themes: {
		newTheme: {
			url: "https://maps.vilnius.lt",
      production: true, //if theme is ready for production
      custom: true, // true if theme funcionality is custom
      name: "Nauja žemėlapio versija", //theme name
      //id: "theme-buildings", //theme id class and theme URL query name
      id: "nauja-versija", //theme id class and theme URL query name
      imgUrl: "/maps_vilnius/img/home-url.png", //image URL
      imgAlt: "Nauja žemėlapio versija", // image alt attribute
      layers: {
				administravimas: { // layer unique name
					dynimacLayerUrls:  // dynamicService URL, only 1 url per uniquer Layer
					"https://gis.vplanas.lt/arcgis/rest/services/Interaktyvus_zemelapis/Mokyklos/MapServer",
				}
			}
    },
		buildingsAdministration: {
			production: true, //if theme is ready for production
			custom: true, // true if theme funcionality is custom
			name: "Pastatų administravimas", //theme name
			id: "theme-buildings", //theme id class and theme URL query name
			//id: "pastatu-administravimas", //theme id class and theme URL query name
			imgUrl: "/maps_vilnius/img/pastatu-administravimas.png", //image URL
			imgAlt: "Pastatų administravimas", // image alt attribute
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
		// buildings: {
		// 	url: "https://maps.vilnius.lt/pastatai",
    //   production: true, //if theme is ready for production
    //   custom: true, // true if theme funcionality is custom
    //   name: "Pastatai", //theme name
    //   //id: "theme-buildings", //theme id class and theme URL query name
    //   id: "pastatai", //theme id class and theme URL query name
    //   imgUrl: "/maps_vilnius/img/pastatai.png", //image URL
    //   imgAlt: "Pastatai", // image alt attribute
    //   layers: {
    //     silumosSuvartojimas: { // layer unique name
    //       dynimacLayerUrls:  // dynamicService URL, only 1 url per uniquer Layer
    //       "https://zemelapiai.vplanas.lt/arcgis/rest/services/Interaktyvus_zemelapis/Pastatai_statyba/MapServer",
    //       name: "Pastatai"
    //     }
    //   }
    // },
    // itvTheme: {
		// 	url: "https://maps.vilnius.lt/projektai",
    //   production: true, //if theme is ready for production
    //   version: "arcgis4",
    //   hide: false, //hide from themes menu, but add route with functionality
    //   custom: true,
    //   name: "Investiciniai projektai", //theme name
    //   id: "projektai", //theme id class and theme URL query name
    //   imgUrl: "/maps_vilnius/img/projektai.png", //image URL
    //   imgAlt: "Investiciniai projektai", // image alt attribute
    //   info: "Uses static menu legend", //Meta info about project
    //   layers: {
    //     //maps layers for scaling on map
    //     mapLayer: 'https://zemelapiai.vplanas.lt/arcgis/rest/services/Interaktyvus_zemelapis/itv_projects_GDB/MapServer',
    //     //all projects (converted to polygon) for listing
    //     uniqueProjects: 'https://zemelapiai.vplanas.lt/arcgis/rest/services/Interaktyvus_zemelapis/itv_projects_common_GDB/MapServer',
    //     //2 base teritories south and north
    //     teritories: 'https://zemelapiai.vplanas.lt/arcgis/rest/services/Interaktyvus_zemelapis/itv_teritories/MapServer',
    //     //identify map service
    //     identifyLayer: 'https://zemelapiai.vplanas.lt/arcgis/rest/services/Interaktyvus_zemelapis/ITV_bendri/MapServer',
    //     name: 'Investiciniai projektai'
    //   }
    // },
    advertise: {
      production: true, //if theme is ready for production
      custom: true, // true if theme funcionality is custom
      name: "Reklamos leidimai", //theme name
      id: "ad", //theme id class and theme URL query name
      imgUrl: "/maps_vilnius/img/reklamos.png", //image URL
      imgAlt: "Reklamos vietos" // image alt attribute
    },
    schools: {
      production: true, //if theme is ready for production
      custom: true,
      name: "Švietimas", //theme name
      //id: "schools", //theme id class and theme URL query name
      id: "schools", //theme id class and theme URL query name
      imgUrl: "/maps_vilnius/img/mokyklos.png", //image URL
      imgAlt: "Švietimas", // image alt attribute
      layers: {
        mokyklos: { // layer unique name //
          dynimacLayerUrls:  //  dynamicService URL, only 1 url per uniquer Layer
          "https://gis.vplanas.lt/arcgis/rest/services/Interaktyvus_zemelapis/Mokyklos/MapServer"
        }
      }
    }
    // kindergartens: {
		// 	url: "https://maps.vilnius.lt/darzeliai",
    //   production: true, //if theme is ready for production
    //   custom: true, // true if theme funcionality is custom
    //   name: "Darželiai", //theme name
    //   //id: "theme-buildings", //theme id class and theme URL query name
    //   id: "darzeliai", //theme id class and theme URL query name
    //   imgUrl: "/maps_vilnius/img/darzeliai.png", //image URL
    //   imgAlt: "Darželiai", // image alt attribute
    //   layers: {
    //     darzeliai: { // layer unique name
    //       dynimacLayerUrls:  // dynamicService URL, only 1 url per uniquer Layer
    //       "https://zemelapiai.vplanas.lt/arcgis/rest/services/Interaktyvus_zemelapis/Darzeliai/MapServer",
    //       name: "Darželiai"
    //     }
    //   }
    // },
    // teritory: {
		// 	url: "https://maps.vilnius.lt/teritoriju-planavimas",
    //   production: true, //if theme is ready for production
    //   name: "Planavimas ir statyba", //theme name
    //   //id: "teritory-planning", //theme id class and theme URL query name
    //   id: "teritoriju-planavimas", //theme id class and theme URL query name
    //   imgUrl: "/maps_vilnius/img/teritorijos.png", //image URL
    //   imgAlt: "Teritorijų planavimas", // image alt attribute
    //   layers: {
    //     teritorijuPlanavimas: { // layer unique name //
    //       dynimacLayerUrls:  // dynamicService URL, only 1 url per uniquer Layer
    //       "https://zemelapiai.vplanas.lt/arcgis/rest/services/Interaktyvus_zemelapis/Teritoriju_planavimas/MapServer",
    //       name: "Teritorijų planavimas ir statyba:",
    //       isGroupService: true,
    //       opacity: 0.9
    //     }
    //   }
    // },
    // teritoryReturn: {
		// 	url: "https://maps.vilnius.lt/zemes-grazinimas",
    //   production: true, //if theme is ready for production
    //   name: "Žemės grąžinimas", //theme name
    //   //id: "teritory-return", //theme id class and theme URL query name
    //   id: "zemes-grazinimas", //theme id class and theme URL query name
    //   imgUrl: "/maps_vilnius/img/zeme.png", //image URL
    //   imgAlt: "Teritorijų grąžinimas", // image alt attribute
    //   layers: {
    //     teritorijuGrazinimas: { // layer unique name //
    //       dynimacLayerUrls:  // dynamicService URL, only 1 url per uniquer Layer
    //       "https://zemelapiai.vplanas.lt/arcgis/rest/services/Interaktyvus_zemelapis/Zemes_grazinimas/MapServer",
    //       name: "Teritorijų grąžinimas:",
    //       isGroupService: true
    //     }
    //   }
    // },
    // TeritoryMaintenance: {
		// 	url: "https://maps.vilnius.lt/miesto-tvarkymas",
    //   production: true, //if theme is ready for production
    //   name: "Miesto tvarkymas", //theme name
    //   //id: "teritory-maintenance", //theme id class and theme URL query name
    //   id: "miesto-tvarkymas", //theme id class and theme URL query name
    //   imgUrl: "/maps_vilnius/img/miesto-tvarkymas.png", //image URL
    //   imgAlt: "Miesto tvarkymas", // image alt attribute
    //   layers: {
    //     miestoTvarkymas: { // layer unique name //
    //       dynimacLayerUrls:  // dynamicService URL, only 1 url per uniquer Layer
    //       "https://gis.vplanas.lt/arcgisin/rest/services/Interaktyvus_zemelapis/Miesto_tvarkymas/MapServer",
    //       name: "Miesto tvarkymas:", // dynamicLayers group name
    //       isGroupService: true
    //     }
    //   }
    // },
    // environment: {
		// 	url: "https://maps.vilnius.lt/aplinkosauga",
    //   production: true, //if theme is ready for production
    //   name: "Aplinkosauga", //theme name
    //   //id: "env", //theme id class and theme URL query name
    //   id: "aplinkosauga", //theme id class and theme URL query name
    //   imgUrl: "/maps_vilnius/img/aplinkosauga.png", //image URL
    //   imgAlt: "Aplinkosauga", // image alt attribute
    //   layers: {
    //     aplinkosauga: { // layer unique name //
    //       dynimacLayerUrls:  // dynamicService URL, only 1 url per uniquer Layer
    //       "https://zemelapiai.vplanas.lt/arcgis/rest/services/Interaktyvus_zemelapis/Aplinkosauga/MapServer",
    //       name: "Aplinkosauginiai sluoksniai:", // dynamicLayers group name
    //       opacity: 0.7,
    //       isGroupService: true // if layers has grouping in mxd / value for administration purpose only
    //     }
    //   }
    // },
    // publicOffices: {
		// 	url: "https://maps.vilnius.lt/viesosios-istaigos",
    //   production: false, //if theme is ready for production
    //   name: "Viešos įstaigos", //theme name
    //   //id: "public-offices", //theme id class and theme URL query name
    //   id: "viesosios-istaigos", //theme id class and theme URL query name
    //   imgUrl: "/maps_vilnius/img/tvarkymas.png", //image URL
    //   imgAlt: "Viešos įstaigos", // image alt attribute
    //   layers: {
    //     viesosIstaigos: { // layer unique name //
    //       dynimacLayerUrls:  // dynamicService URL, only 1 url per uniquer Layer
    //       "https://zemelapiai.vplanas.lt/arcgis/rest/services/Interaktyvus_zemelapis/Viesos_istaigos/MapServer",
    //       opacity: 0.6,
    //       name: "Viešos įstaigos" // dynamicLayers group name
    //     }
    //   }
    // },
    // cyclingTracks: {
		// 	url: "https://maps.vilnius.lt/transportas",
    //   production: true, //if theme is ready for production
    //   name: "Transportas / Dviračiai", //theme name
    //   //id: "cycling-tracks", //theme id class and theme URL query name
    //   id: "transportas", //theme id class and theme URL query name
    //   imgUrl: "/maps_vilnius/img/dviraciai.png", //image URL
    //   imgAlt: "Transportas / Dviračiai", // image alt attribute
    //   layers: {
    //     // accidentsRaster: { // layer unique name //
    //     //   dynimacLayerUrls:  // dynamicService URL, only 1 url per uniquer Layer
    //     //   "https://zemelapiai.vplanas.lt/arcgis/rest/services/Interaktyvus_zemelapis/Eismo_ivykiu_tankumas/MapServer",
    //     //   name: "Eismo įvykių tankumas", // dynamicLayers group name
    //     //   opacity: 0.7,
    //     //   isRaster: true //is layer Ratser , do not identify layer if true / default value is false
    //     // },
    //     transportas: { // layer unique name //
    //       dynimacLayerUrls:  // dynamicService URL, only 1 url per uniquer Layer
    //       "https://zemelapiai.vplanas.lt/arcgis/rest/services/Interaktyvus_zemelapis/Transportas/MapServer",
    //       name: "Transportas / Dviračiai:",// dynamicLayers group name
    //       opacity: 0.9
    //     }
    //   }
    // },
    // leisure: {
		// 	url: "https://maps.vilnius.lt/laisvalaikis",
    //   production: true, //if theme is ready for production
    //   name: "Laisvalaikis", //theme name
    //   id: "laisvalaikis", //theme id class and theme URL query name
    //   imgUrl: "/maps_vilnius/img/laisvalaikis.png", //image URL
    //   imgAlt: "Laisvalaikis", // image alt attribute
    //   layers: {
    //     laisvalaikis: { // layer unique name //
    //       dynimacLayerUrls:  // dynamicService URL, only 1 url per uniquer Layer
    //       "https://zemelapiai.vplanas.lt/arcgis/rest/services/Interaktyvus_zemelapis/Laisvalaikis/MapServer",
    //       name: "Laisvalaikis" // dynamicLayers group name
    //     }
    //   }
    // },
    // publicCaffes: {
		// 	url: "https://maps.vilnius.lt/kavines",
    //   production: true, //if theme is ready for production
    //   name: "Lauko kavinės", //theme name
    //   //id: "caffee", //theme id class and theme URL query name
    //   id: "kavines", //theme id class and theme URL query name
    //   imgUrl: "/maps_vilnius/img/kavines.png", //image URL
    //   imgAlt: "Lauko kavinės", // image alt attribute
    //   layers: {
    //     publicCaf: { // layer unique name //
    //       dynimacLayerUrls:  // dynamicService URL, only 1 url per uniquer Layer
    //       "https://zemelapiai.vplanas.lt/arcgis/rest/services/Interaktyvus_zemelapis/lauko_kavines/MapServer",
    //       name: "Lauko kavinės" // dynamicLayers group name
    //     }
    //   }
    // },
    // civilSecurity: {
		// 	url: "https://maps.vilnius.lt/civiline-sauga",
    //   production: true, //if theme is ready for production
    //   name: "Civilinė sauga", //theme name
    //   //id: "civ-sauga", //theme id class and theme URL query name
    //   id: "civiline-sauga", //theme id class and theme URL query name
    //   imgUrl: "/maps_vilnius/img/civiline-sauga.png", //image URL
    //   imgAlt: "Civilinė sauga", // image alt attribute
    //   layers: {
    //     publicCaf: { // layer unique name //
    //       dynimacLayerUrls:  // dynamicService URL, only 1 url per uniquer Layer
    //       "https://zemelapiai.vplanas.lt/arcgis/rest/services/Interaktyvus_zemelapis/Civiline_sauga/MapServer",
    //       opacity: 0.8,
    //       name: "Civilinė sauga" // dynamicLayers group name
    //     }
    //   }
    // },
    // elderships: {
		// 	url: "https://maps.vilnius.lt/seniunijos",
    //   production: true, //if theme is ready for production
    //   name: "Seniūnijos", //theme name
    //   //id: "civ-sauga", //theme id class and theme URL query name
    //   id: "seniunijos", //theme id class and theme URL query name
    //   imgUrl: "/maps_vilnius/img/seniunijos.png", //image URL
    //   imgAlt: "Seniūnijos", // image alt attribute
    //   layers: {
    //     elderships: { // layer unique name //
    //       dynimacLayerUrls:  // dynamicService URL, only 1 url per uniquer Layer
    //       "https://zemelapiai.vplanas.lt/arcgis/rest/services/Interaktyvus_zemelapis/Seniunijos/MapServer",
    //       opacity: 1,
    //       name: "Seniūnijos" // dynamicLayers group name
    //     }
    //   }
    // },
    // legacyMap: {
    //   production: false, //if theme is ready for production
    //   custom: true, // true if theme funcionality is custom
    //   name: "Senoji žemėlapio versija", //theme name
    //   id: "legacy", //theme id class and theme URL query name
    //   imgUrl: "/app/img/old_version.png", //image URL
    //   imgAlt: "Senoji versija", // image alt attribute
    //   url: "http://www.vilnius.lt/vmap/t1.php" // external url if required, if not - gets internal url depending on id property
    // },
    // emptyTeam: {
    //   //url: "https://maps.vilnius.lt/maps_vilnius/?theme=civ-sauga",
    //   production: true, //if theme is ready for production
    //   hide: true, //hide from themes menu, but add route with functionality
    //   name: "Tuščia tema", //theme name
    //   //id: "civ-sauga", //theme id class and theme URL query name
    //   id: "empty", //theme id class and theme URL query name
    //   imgUrl: "/maps_vilnius/img/civiline-sauga.png", //image URL
    //   imgAlt: "Tuščia tema" // image alt attribute
    // }
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
        dynamicLayerAdverts: "https://zemelapiai.vplanas.lt/arcgis/rest/services/Interaktyvus_zemelapis/Reklamos_registro_leidimai/MapServer",
        featureLayerAdverts: "https://zemelapiai.vplanas.lt/arcgis/rest/services/Interaktyvus_zemelapis/Reklamos_registro_leidimai/MapServer/0"
    }
};
;/*
2016-06-21
MV 0.0.2
JS
*/

//get unique array str values
Array.prototype.getUnique = function () {
	'use strict';
	var u = {},
		a = [],
		i = 0,
		l = this.length;

	for (i, l; i < l; i += 1) {
		if (u.hasOwnProperty(this[i])) {
			//continue;
		} else {
			a.push(this[i]);
			u[this[i]] = 1;
		}
	}
	return a;
};

//temporary: Hash toggle, reload, new page,
window.location.hash = '#';

require([
	"dojo/i18n!esri/nls/jsapi",
    "esri/map",
	"esri/dijit/HorizontalSlider",
    "dojo/_base/connect",
    "esri/toolbars/navigation",
    "esri/config",
    "dojo/on",
    "dojo/query",
    "esri/layers/ArcGISTiledMapServiceLayer",
    "esri/layers/ArcGISDynamicMapServiceLayer",
    "esri/dijit/Legend",
    "dojo/_base/array",
    "dojo/parser", /* http://dojotoolkit.org/reference-guide/1.10/dojo/parser.html */
    "esri/dijit/Popup",
    "esri/dijit/PopupTemplate",
    "esri/InfoTemplate",
    "esri/layers/FeatureLayer",
    /*START Grid */
    "dojo/_base/declare",
    "dojo/promise/all", "dojo/Deferred",
    "dgrid/OnDemandGrid",
    "dgrid/Selection",
    "dojo/store/Memory",
    "dijit/form/CheckBox",
    "dijit/registry",
    "esri/tasks/query",
    "esri/tasks/QueryTask",
    /*END Grid */
    "esri/request",
    "dojo/dom",
    "dojo/dom-construct",
    "dojo/dom-class",
    "esri/renderers/ClassBreaksRenderer", "esri/symbols/PictureMarkerSymbol",
    //Measure
    "esri/dijit/Measurement", "esri/units",
    "esri/dijit/Search", "esri/tasks/locator",
    "esri/symbols/SimpleFillSymbol", "esri/symbols/SimpleMarkerSymbol",  "esri/renderers/SimpleRenderer", "esri/symbols/SimpleLineSymbol", "esri/Color", "esri/geometry/Extent",
	"esri/tasks/GeometryService",
    //cluster
	"app/clusterfeaturelayer", "esri/graphic", "esri/graphicsUtils", "dojo/dom-style", "dojo/_base/fx", "dojo/fx/easing",
    "esri/dijit/Scalebar",
    "esri/layers/LayerInfo",
	"esri/tasks/IdentifyTask",
    "esri/tasks/IdentifyParameters",
	"dijit/layout/ContentPane",
    "dijit/layout/TabContainer",
    "dijit/layout/BorderContainer",
    "dojo/domReady!"
], function (
	bundle,
    Map,
	HorizontalSlider,
    connect,
    Navigation,
    esriConfig,
    on,
    dojoQuery,
    ArcGISTiledMapServiceLayer,
    ArcGISDynamicMapServiceLayer,
    Legend,
    arrayUtils,
    parser,
    Popup,
    PopupTemplate,
    InfoTemplate,
    FeatureLayer,
    /*START Grid */
    declare,
    all, Deferred,
    Grid,
    Selection,
    Memory,
    CheckBox,
    registry,
    Query,
    QueryTask,
    //Query,
    /*END Grid */
    esriRequest,
    dom,
    domConstruct,
    domClass,
    //SimpleFillSymbol,
    ClassBreaksRenderer, PictureMarkerSymbol,
    //Measure
    Measurement, Units,
    Search, Locator, SimpleFillSymbol, SimpleMarkerSymbol, SimpleRenderer, SimpleLineSymbol, Color, Extent,
	GeometryService,
    //cluster
    ClusterFeatureLayer, Graphic, graphicsUtils, domStyle, fx, easing,
    Scalebar,
    LayerInfo,
	IdentifyTask, IdentifyParameters, ContentPane
) {
	var visible = [];
	var identifyPerameters;
	var identifyTask;
	var visibleLayersResult = {};
	var horizontalSlider;
	var popup;
	var a = 0;

	var DEFCONFIG = {
		extent: new esri.geometry.Extent(MAPCONFIG.mapExtent),
		//TODO not implemented yet: integrate
		popupProperties: {
			titleInBody: false // showing title outside
		},
		popupDom: domConstruct.create("div", {
			id: "default-popup"
		}),
		popup: function () {
			var that = this;
			return new Popup(that.popupProperties, that.popupDom);
		}
	};

	var CONTROL = {
		_getUrlQueryName: function (name, url) {
			if (!url) url = window.location.href;
			url = url.toLowerCase(); // avoid case sensitiveness
			name = name.replace(/[\[\]]/g, "\\$&").toLowerCase();// avoid case sensitiveness for query parameter name
			var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
				results = regex.exec(url);
			if (!results) return null;
			if (!results[2]) return '';
			return decodeURIComponent(results[2].replace(/\+/g, " "));
		},
		mapInit: function() {
			return new Map("map", {
						extent: DEFCONFIG.extent,
						logo: false,
						showAttribution: false,
						zoom: 5,
						infoWindow: DEFCONFIG.popup(),
						nav: false // hides Pan Arrows
					});
		},
		currentTheme: function () {
			return this._getUrlQueryName("theme");
		},
		currenthemeLabel: function () {
			var theme = this.currentTheme();
			var themeDom = document.getElementById("theme");
			var themeDomDivs = themeDom.getElementsByTagName("div");
			for (var i = 0; i < themeDomDivs.length; i++) {
				if (themeDomDivs[i].id === theme) {
					themeDomDivs[i].className += " current-theme";
				} else {
					//AG else: remove class from element TODO: check if class exists
					themeDomDivs[i].className = themeDomDivs[i].className.replace( /(?:^|\s)current-theme(?!\S)/g , '' );
					//AG TEMP default theme #buildings
					if (!theme) {
						document.getElementById("theme-buildings").className += " current-theme";
					}
				}

			}
		},
		//Mouse cursor
		showCursor: function(layers, arrayUtils) {
			arrayUtils.forEach(layers, function(a, i) {
				//console.log(a, i);
				a.on("mouse-over", function() {
					map.setMapCursor("pointer");

				});
				a.on("mouse-out", function() {
					map.setMapCursor("default");
				});
			});
		},
		//END Mouse cursor
		createThemeDom: function() {
			var themesObj = MAPCONFIG.themes;
			var count = 1;
			for (var theme in themesObj) {
				if (themesObj.hasOwnProperty(theme)) {
					var divTag, aTag, pTag, imgTag, alignClass, urlTag;
					divTag = aTag = pTag = imgTag = alignClass = urlTag = null;
					if (themesObj.hasOwnProperty(theme)&&(themesObj[theme].production)&&(!themesObj[theme].hide)) {
						count ++;
						var countMod;
						countMod = count % 2 > 0 ? alignClass = "align-right" : alignClass = "align-left" ;
						//console.log(theme); //ad float: right or left
						divTag = domConstruct.create("div", {id: themesObj[theme].id, class: "sub-theme " + alignClass, style: ""}, "theme", "last"); //AG static width in px, because we're using overflow-y: auto in main div
						urlTag = !themesObj[theme].url ? "./?theme=" + themesObj[theme].id : themesObj[theme].url; //check if theme has url defined
						aTag = domConstruct.create("a", {href: urlTag}, divTag);
						imgTag = domConstruct.create("img", {src: themesObj[theme].imgUrl, alt: themesObj[theme].imgAlt}, aTag);
						pTag = domConstruct.create("p", {innerHTML: themesObj[theme].name}, divTag);
					}
				}
			}
		},
		initTheme: function() {
			//var map = this.mapInit();
			//var that = this;
			var themesObj = MAPCONFIG.themes,
				currentTheme = this.currentTheme(),
				dynimacThemesLayer;
			//alert(Object.keys(themesObj).length); //reorder layers, get lenght (with custome layers) TODO: minus custom layers + basemap layers (2 of them)
			for (var theme in themesObj) {
				if (themesObj.hasOwnProperty(theme)) {
					var themeId = themesObj[theme].id; //get unique theme id
					var themeFunc = themesObj[theme].custom; //get funcionality
					if (themeId === currentTheme) {
						if (!themeFunc) { // show ONLY themes width default funcionality
							var dynamicLayersArray = [];
							dynimacThemesLayer = this.createDynicLayers(themesObj[theme], theme); //create dynimac specific themes' layers
							for (var layerAdd in dynimacThemesLayer) { //run through layers and add them to the map with all default functionality
								if (dynimacThemesLayer.hasOwnProperty(layerAdd)) {
									dynamicLayersArray.push(dynimacThemesLayer[layerAdd]); //push layers to array
									//console.log("DYNAMIC LAyeriai");
									//console.log(dynimacThemesLayer);
									//console.log(Object.getOwnPropertyNames(dynimacThemesLayer[layerAdd]));
								}
							}
							dynamicLayersArray = dynamicLayersArray.reverse(); //reverse array for correct map visibility (according to legend tab) // TODO change , reverser method is slow
							this.addDynamicLayers(dynamicLayersArray);

							this.runShowLegendInput(dynimacThemesLayer);
						}
					}
				}
			}
			//reorderlayers
			//this.reorderLayers();

			//set Opacity slider for each dynamic layer
			return dynimacThemesLayer;
		},
		runShowLegendInput: function (layers) {
			var that = this;
			setTimeout(function () {
				that.showLegendInput(layers);
			}, 1000);
		},
		//for correct map layers visibility add  reversed dynamic theme layers to map
		//we're using reversed array
		addDynamicLayers: function(reversedLayersArr) {
			for (var i = 0; i < reversedLayersArr.length ; i++) {
				map.addLayer(reversedLayersArr[i]);
			}
		},
		reorderLayers: function(){
			arrayUtils.forEach(map.layerIds, function(anchor, i) {
				if (i > 1) {
					map.reorderLayer("dyn-demo-bp", 2);
				}
			});
		},
		//create dynamic map layers for all theme layers
		createDynicLayers: function (theme, themeName){
			var uniqueID = 0;
			var dynamicLayers = {};
			var themeLayers = theme.layers;
			for (var layer in themeLayers) {
				if (typeof layer !== 'undefined') {
					var groupIdStr = "dyn-" + themeName + "-" + layer; //group name id for legend group dom
					var groupNameStr = themeLayers[layer].name;
					this.createLegendGroups(groupIdStr, groupNameStr, theme.name);

					dynamicLayers["dyn" + themeName + layer] = new ArcGISDynamicMapServiceLayer( themeLayers[layer].dynimacLayerUrls, {id: "dyn" + "-" + themeName + "-" + layer}); //create unique property (ArcGISDynamicMapServiceLayer) dynamcLayers property, then add to map layer
					dynamicLayers["dyn" + themeName + layer].configLayerName = layer; // property for infowindow infotemplate
					if (themeLayers[layer].name) {
						dynamicLayers["dyn" + themeName + layer].groupName = themeLayers[layer].name; // legend group name
					} else {
						dynamicLayers["dyn" + themeName + layer].groupName = theme.name; // legend group name
					}
				}
			}
			return dynamicLayers;
		},
		//create legend groups dom element for each dynamic layer group
		createLegendGroups: function (groupIdStr, name, themeName) {
			//check if dom exists
			var tmp = document.createElement("div");
			//var groupDom = dom.byId(groupStr);
			var layerDom = dom.byId("legend-list");
			var msg;
			if (!dom.byId(groupIdStr))
			if (name) {
				msg = domConstruct.toDom("<div class='layer-group'><p>" + name + "</p></div><div id='" + groupIdStr + "'></div>");
			} else {
				msg = domConstruct.toDom("<div class='layer-group'><p>" + themeName + "</p></div><div id='" + groupIdStr + "'></div>");
			}
			tmp.setAttribute("class", "legend-group");
			//tmp.setAttribute("id", groupIdStr);
			tmp.appendChild(msg);
			domConstruct.place(tmp, layerDom, "last");
		},
		setOpacity: function(layers) {
			for (var layer in layers) {
				if (layers.hasOwnProperty(layer)) {
					layers[layer].setOpacity(value / 100);
				}
			}
		},
		createLayerInfosArr: function (dynLayersObject) {
			var commonLayerInfos = [];
			// push Layrinfos arrays of each layer and asign to commonLayerInfos variable
			for (var layer in dynLayersObject) {
				if (dynLayersObject.hasOwnProperty(layer)) {
					dynLayersObject[layer].layerInfos.nameGroup = layer; // create name for same layerInfos group, will be use fo layer toggling via checkbox
					dynLayersObject[layer].layerInfos.layersGroupName = dynLayersObject[layer].groupName; //visisible layers and legend block layersGroupName
					commonLayerInfos.push(dynLayersObject[layer].layerInfos);
				}
			}
			return this.createLayerInfosWithGroupName(commonLayerInfos);
		},
		createLayerInfosWithGroupName: function (commonLayerInfos) {
			var layerinfosArr;
			// concat commonLayerInfos arrays of each layer and asign to layerinfosArr variable
			for (var i = 0; i < commonLayerInfos.length ; i++) { // length - 1
				commonLayerInfos[i] = this.createGroupName(commonLayerInfos[i], commonLayerInfos[i].nameGroup, commonLayerInfos[i].layersGroupName); //create groupName and visisible layers and legend block layersGroupName for inner arrays
			}
			return this.createLayerInfosResultArr(commonLayerInfos);
		},
		createLayerInfosResultArr: function(commonLayerInfos) {
			var layerinfosArr;
			//NEW: merge arrays
			layerinfosArr = [].concat.apply([], commonLayerInfos);
			return layerinfosArr;
		},
		createGroupName: function (innerLayerInfosArr, name, layersName) {
			//create groupName for inner arrays
			for (var i = 0; i < innerLayerInfosArr.length; i++) { // length - 1
				innerLayerInfosArr[i].groupName = name;
				innerLayerInfosArr[i].layersGroupName = layersName;
			}
			return innerLayerInfosArr;
		},
		//create vissible dom layer groups for layers block
		createLayersGroupsDom: function (commonLayerInfosResult) {
			var layerDom = dom.byId("layer-list");
			var nameItems = arrayUtils.map(commonLayerInfosResult, function(info, i){
				return info.groupName;
			});
			var uniqueValue = nameItems.filter(function(item, i, ar){ return ar.indexOf(item) === i; });
			//loop unique values and create dom
			arrayUtils.forEach(uniqueValue, function(info, i){
				var tmp = document.createElement("div");
				tmp.setAttribute("id", info);
				tmp.setAttribute("class", "default-theme-layers");
				layerDom.appendChild(tmp);
			});
			this.addtitleToGroups(commonLayerInfosResult);
		},
		//TODO improve  inefficient method
		addtitleToGroups: function (commonLayerInfosResult){
			arrayUtils.map(commonLayerInfosResult, function(info){
				document.getElementById(info.groupName).innerHTML = "<div class='layer-group'><p>" + info.layersGroupName + "</p></div>";
			});
		},
	    //create / control inputs and legend of each theme
	    showLegendInput: function (layerName) {
			//console.log(layerName);
			var layerDom = dom.byId("layer-list");
			var that = this;
			setTimeout(function () { //AG set time out for slow network
				var commonLayerInfosResult = that.createLayerInfosArr(layerName);



				that.createLayersGroupsDom(commonLayerInfosResult);

				var items = arrayUtils.forEach(commonLayerInfosResult, function (info, i) {
					//console.log(info);
					//console.log(i);
					var checkBox = new CheckBox({
						class: "layers-labels",
						tabindex: info.id.toString(), //AG important: will use tabindex to determind visible layer
						value: info.groupName, //creat same value for sublayers of the same dynamicLayer
						checked: info.defaultVisibility ? true : false,
						id: i.toString()
					});

					if (info.defaultVisibility) {
						visible.push(info.id);
						//console.log(visible);
					}

					var domElement = document.getElementById(info.groupName);
					var label;
					var tmp = document.createElement("div");
					//check if layer is inner layer (with info.subLayerIds === null),  not a group layer
					if ((info.subLayerIds === null)) {
						//convert to dom
						var inputsList = checkBox.domNode;
						//label
						label = domConstruct.toDom("<label for='" + i + "'>" + info.name + "</label>");
						inputsList.appendChild(label);
						//workaround, TEMP return string
						tmp.appendChild(inputsList);
						//return input via chekcbox widget, will start dojo change event
						if (domElement) {
							domElement.appendChild(tmp);
						}
					} else {
						//for group name layers add only name
						label = domConstruct.toDom("<div class='layer-group one-service"  + (i === 0 ? " first-one-service" : "") + "'><p>" + info.name + "</p></div>");
						tmp.appendChild(label);
						if (domElement) {
							domElement.appendChild(tmp);
							domClass.add(document.body, "one-service-theme");
						}
					}
				});

				//layerDom.innerHTML = items.join(' ');

				//set default layers visibility
				for (var layer in layerName) {
					//console.log(layer);
					//console.log(layerName[layer]._defaultVisibleLayers);
					if (layerName.hasOwnProperty(layer)) {
						//AG fix for slow connection
						if (layerName[layer]._defaultVisibleLayers) {
							layerName[layer].setVisibleLayers(layerName[layer]._defaultVisibleLayers);
						} else {
							layerName[layer].setVisibleLayers([]); //empty visible layers Array;
						}
					}
				}

				//legend widget
				var layerInfo = that.setupDefaultLegendLayers(layerName);

				//init Legend
				that.initLegend(layerInfo, layerDom, layerName);

				// End legend widget

				that.initIdentify(layerInfo); // initiate identify visible layers by default
			}, 400);
        },
		createLegendGroup: function (layerInfo) {
			var that = this;
			//loop through unique values and create dom
			setTimeout(function () {
				arrayUtils.forEach(layerInfo, function (info, i) {
					var tmp = document.createElement("div");
					var idName = "legend-list" + "_" + info.layer.id;
					var layerDom = dom.byId(idName);
					var msg = domConstruct.toDom("<p>" + info.layer.groupName + "</p>");
					tmp.setAttribute("class", "layer-group");
					tmp.appendChild(msg);
					domConstruct.place(tmp, layerDom, "first");
				});
			}, 400);
		},
		//initiate legend with correct order
		initLegend: function (layerInfo, layerDom, layerName) {
			var that = this;
			var reversed = layerInfo.reverse();
			//legend widget
			arrayUtils.forEach(layerInfo, function (layer, i) {
				that.startUpLegendGroup(layer, layerDom, layerName, layerInfo);
			});

			return layerInfo;
		},
		startUpLegendGroup: function (layer, layerDom, layerName, layerInfo){
			var that = this;
	    	var legendDijit = new Legend({
	    		map: map,
	    		layerInfos: [layer]
	    	}, layer.layer.id);
	    	legendDijit.startup();

			on(layerDom, "click", function(e) {that.updateLayerVisibility(layerName, e, legendDijit, [layer], layerInfo);});
		},
		showGroups: function (layerInfo) {
			//create legend Groups
			this.createLegendGroup(layerInfo);
		},
		//set default legend
		setupDefaultLegendLayers: function(layerName) {
			var layerInfo = [];
			for (var layer in layerName) {
				if (layerName.hasOwnProperty(layer)) {
					layerInfo.push({
						layer: layerName[layer],
						title: " "
					}); // TODO
				}
			}
			//AG return reversed Array
			return layerInfo; //
		},
		//control layers visibility with inputs
		updateLayerVisibility: function (layerName, e, legendDijit, layer, layerInfo) {
			//alert(layerName);
			var inputs = dojoQuery(".layers-labels input");
			var inputValues = [];
			var visibleLayers = {};

			arrayUtils.forEach(inputs, function (input) {
				if (input.checked) {
					visible.push(input.id);
					inputValues.push(input.value);
					//check if same group has any values already
					if (visibleLayers.hasOwnProperty(input.value)) {
						visibleLayers[input.value].push(input.tabIndex); //AG Important: make sure to set right visible  layer / will use tabindex
					} else {
						visibleLayers[input.value] = [input.tabIndex]; //AG Important: make sure to set right / will use tabindex visible  layer
						//if there aren't any layers visible set the array to be -1
						visibleLayersResult[input.value] = ["-1"];
					}
				}
			});

			//if there aren't any layers visible set the array to be -1
			for (var el in visibleLayers) {
				if (visibleLayers.hasOwnProperty(el)) {
					if (visibleLayers[el].length === 0) {
						visibleLayers[el].push(-1);
					}
				}
			}
			if (e) { //TODO remove if clause
				this.showHideLayers(layerName, this.cloneVisibleLayer(visibleLayers, visibleLayersResult, e), e);
			}
			// if layer is switched off, refresh legend and show only visible layers
			legendDijit.refresh(layer); //show refreshed legend only from current Theme
			this.updatedIdentify(layerInfo); // initiate identify visible layers by new visibility after update
		},
		cloneVisibleLayer: function (visibleLayers, visibleLayersResult, e) {
			for (var layer in visibleLayersResult){
				if (visibleLayersResult.hasOwnProperty(layer)) {
					for (var visibleLayer in visibleLayers) {
						if ((visibleLayers.hasOwnProperty(visibleLayer)) && (layer === visibleLayer)) {
							if (layer == e.target.value) {
								visibleLayersResult[visibleLayer] = visibleLayers[visibleLayer]; //AG Important: make sure to set right visible  layer
							}
						} else { // -1 value must be written in specific order
							if (layer === e.target.value) {
								visibleLayersResult[visibleLayer] = ["-1"]; // if there aren't any layers visible set the array to be -1
							}
						}
					}
				}
			}
			return visibleLayersResult;
		},
		showHideLayers: function (layerName, visibleLayers, e) {
			for (var layer in layerName){
				if (layerName.hasOwnProperty(layer)) {
					if (layerName[layer].layerInfos.nameGroup === e.target.value) {
						this.getCurrentInput(e, layerName[layer], visibleLayers);
					}
				}
			}
		},
		getCurrentInput: function(e, layer, visibleLayers) {
			if (visibleLayers.hasOwnProperty(e.target.value)){
				layer.setVisibleLayers(visibleLayers[e.target.value]);
			}
		},
		//initiate Idendentify taskss parameters for visible dynamic layers
		initIdentify: function(layerInfo) {
			//layers in reverse order to indetify depending on inputs and legend order
			//var layersReveresed = layerInfo.reverse(); //TODO change it, reverse is slow method
			identifyPerameters = this.getParameters(layerInfo);
			map.on("click", this.executeIdentify);
		},
		//identify after checkbox update
		updatedIdentify: function(layerInfo) {
			//layers in reverse order to indetify depending on inputs and legend order
			//var layersReveresed = layerInfo.reverse(); //TODO change it, reverse is slow method
			identifyPerameters = this.getParameters(layerInfo);
		},
		getParameters: function(layerInfo) {
			var parametersList = {}; // create Parameters list obj
			var identifyPerameters;
			for (var layer in layerInfo) {
				if (layer !== "getUnique"){ //TODO layer = "getUnique" appears, fix that later, currently - TEMP fix
					identifyTask = new IdentifyTask(layerInfo[layer].layer.url); //TODO check every url
					identifyPerameters = new IdentifyParameters();
					identifyPerameters.tolerance = 3;
					identifyPerameters.returnGeometry = true;
					//identifyPerameters.layerIds = layerInfo[layer].layer._defaultVisibleLayers;
					identifyPerameters.layerIds = this.getVisibleLayerIds(layerInfo[layer].layer.visibleLayers);
					identifyPerameters.layerOption = IdentifyParameters.LAYER_OPTION_VISIBLE; //identify only visible layers
					identifyPerameters.width = map.width;
					identifyPerameters.height = map.height;
					parametersList[layerInfo[layer].layer.configLayerName] = identifyPerameters; //add to Parameters list obj
					parametersList[layerInfo[layer].layer.configLayerName].identifyTask = identifyTask; //add to Parameters different indentify tasks wiht unique url
				}
			}
			return parametersList;
		},
		getVisibleLayerIds: function (visible) {
			var ids = [];
			arrayUtils.map(visible, function (infoL, i) {
				ids.push(infoL);
			});
			return ids;
		},
		executeIdentify: function(evt) {
			if (!toolsMeasure.activeTool){
				//validate ArcGis date string
				var reg = /(\d+)[.](\d+)[.](\d+)\s.*/; //regex: match number with . char, clear everything else
				var isValidDate = function (dateStr) {
					return dateStr.match(reg) !== null;
				};
				var deferredList = [];
				var getDeferred = function () {
					return identifyPerameters[parameter].identifyTask
						.execute(identifyPerameters[parameter])
						.addCallback(function (response) {
							// response is an array of identify result objects
							// Let's return an array of features.
							return arrayUtils.map(response, function (result) {
								//console.log(result);
								defResponse = response;
								var feature = result.feature,
									content = " ",
									layerName = result.layerName,
									attributes = feature.attributes;

								feature.attributes.layerName = layerName;

								for (var resultAtr in attributes) {
									if (attributes.hasOwnProperty(resultAtr)) {
										//console.log(resultAtr);
										if (!(resultAtr == "OBJECTID" || resultAtr == "layerName" || resultAtr == "SHAPE" || resultAtr == "SHAPE.area" || resultAtr == "Shape.area" || resultAtr == "SHAPE.STArea()" || resultAtr == "Shape" || resultAtr == "SHAPE.len" || resultAtr == "Shape.len" || resultAtr == "SHAPE.STLength()" || resultAtr == "SHAPE.fid" ||
										resultAtr == "Class value" || resultAtr == "Pixel Value"  || resultAtr == "Count_" //TEMP check for raster properties
											 )) { //add layers attributes that you do not want to show
											//AG check for date string

											if (isValidDate(attributes[resultAtr])) {
												var attributeDate = attributes[resultAtr];
												content += "<p class='bord'>" + attributes[resultAtr].replace(reg, '$1-$2-$3') + "</br><span>" + resultAtr + "</span>" + "<p>";
											} else {
												var attributeResult = attributes[resultAtr];
												if (attributeResult !== null) { //attributes[resultAtr] == null  equals to (attributes[resultAtr]  === undefined || attributes[resultAtr]  === null)
													if ((attributeResult === " ") || (attributeResult === "Null")) {
														attributeResult = "-";
													}

												} else {
													attributeResult = "-";
												}
												content += "<p class='bord'>" + attributeResult + "</br><span>" + resultAtr + "</span>" + "<p>";
											}

										} else if (resultAtr == "Class value" || resultAtr == "Pixel Value") {
											//TEMP check for raster properties 	and add custom msg
											content = '<p class="raster">Išsamesnė sluoksnio informacija pateikiama Meniu lauke <strong>"Žymėjimas"</strong></p>';
										}

									}
								}

								var tempInfo = new InfoTemplate("<p>${layerName}</p>", content);
								feature.setInfoTemplate(tempInfo);
								domClass.add("default-popup", "default-popup");
								return feature;
							});
						});
				};
				for (var parameter in identifyPerameters){
					var pointGeometry;
					var pxWidth = map.extent.getWidth() / map.width;
					var padding = 8 * pxWidth;
					if (identifyPerameters.hasOwnProperty(parameter)) {
						//if (parameter = "bp"){
						identifyPerameters[parameter].geometry = evt.mapPoint;
						identifyPerameters[parameter].mapExtent = map.extent;
						//add padding to point geometry or use tolerance porperty, in this case we add padding
						pointGeometry = new Extent({
							"xmin": identifyPerameters[parameter].geometry.x - padding,
							"ymin": identifyPerameters[parameter].geometry.y - padding,
							"xmax": identifyPerameters[parameter].geometry.x + padding,
							"ymax": identifyPerameters[parameter].geometry.y + padding,
							"spatialReference": identifyPerameters[parameter].geometry.spatialReference
						});
						identifyPerameters[parameter].geometry = pointGeometry;

						var deferred = getDeferred();

						deferredList.push(deferred); // create deferred objects llist obj
					}
				}
					//reverse deferredList to identify correctly
					all(deferredList.reverse()).then(function(result){ //AG run then() method with all/promise widget
						var resultsMerge = [].concat.apply([], result); // if we have list of results - merger all results
						//console.log(result);
						if (resultsMerge.length > 0) { // check if we have response by checking resultsMerge array
							map.infoWindow.setFeatures([].concat.apply([], deferredList)); //set features with all deferred objects
							map.infoWindow.show(evt.mapPoint);
							//domClass.add("default-popup", "animate"); //add animation to pup up
						}
					});
			}
        },
		//set default selection symbol
		setDefaultSelectionSymbol: function(feature) {
			// selection symbol used to draw the selected census block points within the buffer polygon
			var symbol = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID, new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([193, 39, 45, 1]), 3), new Color([129, 183, 206, 0]));
			feature.setSymbol(symbol);
			map.graphics.add(feature);
		}
	};

	//create theme menu elements
	CONTROL.createThemeDom();

    //DOM to dijit
    parser.parse();

    //AG  current theme
    CONTROL.currenthemeLabel();

	//console.dir(bundle)
	//Change locale strings
	bundle.widgets.legend.NLS_noLegend = "Grupės sluoksniai išjungti arba per didelis mastelis";
	bundle.widgets.popup.NLS_zoomTo = "Priartinti";
	bundle.widgets.popup.NLS_pagingInfo = "<span class='index-total'>(${index} iš ${total})</span>";

    var loadGif = dom.byId("loading-gif");

    var extent = new esri.geometry.Extent(MAPCONFIG.mapExtent); //DONE

    var popupProperties = {  //DONE
        fillSymbol: new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID, new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([193, 39, 45, 1]), 3), new Color([129, 183, 206, 0])), //add default selection symbol
		markerSymbol: new SimpleMarkerSymbol("circle", 24,
				new SimpleLineSymbol(SimpleLineSymbol.STYLE_LONGDASH, new Color([223, 52, 59, 0]), 3),
									new Color([255, 255, 255, 0])),
		lineSymbol: new SimpleLineSymbol(
			SimpleLineSymbol.STYLE_DASH,
			new Color([193, 39, 45, 1]),
			3
		),
		//outerText: "Priartinti",  //xhange default outerText;
        titleInBody: false // showing title outside
    };

    var popupDom = domConstruct.create("div", { id: "default-popup" });  //DONE
    popup = new Popup(popupProperties, popupDom);  //DONE


/*	var defaulMarkertSelect = new SimpleMarkerSymbol("circle", 24,
									new SimpleLineSymbol(SimpleLineSymbol.STYLE_LONGDASH, new Color([223, 52, 59, 1]), 3),
									new Color([255, 255, 255, 0]));
	popup.markerSymbol = defaulMarkertSelect;*/

	//popup.markerSymbol.setOffset(20, 32);

   var map = new Map("map", {  //DONE
        extent: extent,
        logo: false,
        showAttribution: false, // MXD credits attribution
        zoom: 1,
        infoWindow: popup,
        nav: false // hides Pan Arrows
    });

	//map.infoWindow._highlighted.yoffset = -25;

	//map.infoWindow.highlight = false;  // do not show default highlight
	//map.infoWindow.markerSymbol.outline.color;  // do not show default highlight

    var navToolbar = new Navigation(map);
    var extentCenter = dojo.byId("zoomfullext");

    on(extentCenter, "click", function() {
        //navToolbar.zoomToFullExtent(); //AG buggy, switching to centerAndZoom
        var location = extent.getCenter();
        map.centerAndZoom(location, 0);
        //console.log("CENTER COORD:" + JSON.stringify(location));
    });

	//S center map after resize event
	map.on("resize", function() {centerMap();});

	// centerMap function declaration
	function centerMap() {
		var top = document.getElementById('map').offsetHeight / 2;
		var left = document.getElementById('map').offsetWidth / 2;
		var screenPoint = new esri.geometry.ScreenPoint(left, top, map.spatialReference);
		var mapPoint = map.toMap(screenPoint);
		setTimeout(function() {
			map.centerAt(mapPoint);
		}, 50);
	}
	//E center map after resize event

    var scale = new Scalebar({
        map: map,
        scalebarUnit: "metric"
    });

    esriConfig.defaults.io.proxyUrl = "proxy/proxy.php";
    esriConfig.defaults.io.corsEnabledServers.push("https://zemelapiai.vplanas.lt"); //https://developers.arcgis.com/javascript/jshelp/inside_defaults.html

    //Dependencies from Config file
    //Basemaps / tiled services
    var baseUrl = MAPCONFIG.staticServices.basemapUrl,
        ortoUrl = MAPCONFIG.staticServices.ortofotoUrl,
        //Feature services
        featBuildingsUrl = MAPCONFIG.themesServices.buildingTheme.featureLayerBuildings,
        advertsFeatureUrl = MAPCONFIG.themesServices.featureLayerAdverts,
        //Dynamic services
        //theme=build
        dynUrl = MAPCONFIG.themesServices.buildingTheme.dynamicLayerBuildings,
        //theme=ad
        advertsUrl = MAPCONFIG.themesServices.dynamicLayerAdverts,
        //geometry services
        geomBuildUrl =  MAPCONFIG.staticServices.geometryUrl;

    //custom Info Templates
    //theme adverts template
	var adTemplate = new InfoTemplate();

    //Basemaps / tiled services
    var basemap = new ArcGISTiledMapServiceLayer(baseUrl, {
	    id: "topo"
    });
    var ortofoto = new ArcGISTiledMapServiceLayer(ortoUrl, {
	    id: "orto"
    });

    //Feature services
    var featureBuildings = new FeatureLayer(featBuildingsUrl, {
        id: "buildings-feat",
        mode: FeatureLayer.MODE_ONDEMAND,
        maxAllowableOffset: calcOffset(),
        outFields: ["*"]
    });

    var advertsFeatureLayer = new FeatureLayer(advertsFeatureUrl, {
        id: "adverts-feat",
        //infoTemplate: adTemplate,
        mode: FeatureLayer.MODE_ONDEMAND,
        outFields: ["*"]
    });

    //Dynamic services
    var layerBuild = new ArcGISDynamicMapServiceLayer(dynUrl, {
          opacity: 1.0,
          id: "buildings-dyn"
    });

    //theme adverts, only for legend and inputs, for graphics use cluster layer instead (cluster layer has no layerinfo property)
    var advertsDynLayer = new ArcGISDynamicMapServiceLayer(advertsUrl, {
        id: "adverts"
    });
    //suspend layer drawing
    advertsDynLayer.suspend();

    var baseMaps = [basemap, ortofoto];
    map.addLayers(baseMaps);

	var initiateDefaultLayer = CONTROL.initTheme();

    //measurements geometric service, changed to VP service
    esri.config.defaults.geometryService = new GeometryService(geomBuildUrl);
	var geometryService =  esri.config.defaults.geometryService;

    var toolsMeasure = new Measurement({
        map: map,
        defaultAreaUnit: Units.HECTARES,
        defaultLengthUnit: Units.KILOMETERS,
        deactivate: function() {
                var toolName  = this.getTool();
                if (toolName) {
                    this.setTool(toolName.toolName, false);
                    this.clearResult();
                }
        }
    }, dom.byId("tools-measure"));

    toolsMeasure.startup();

	//hide infowindow on every top menu anchor click
	var topMenuAnchors = document.getElementById("top-menu").getElementsByTagName("a");
	arrayUtils.forEach(topMenuAnchors, function(anchor) {
		on(anchor, "click", function() {
			//hide infowindow on menu click event
			//map.infoWindow.hide();
			toolsMeasure.deactivate(); //deacitvate toolsmeasure

		});
	});


    // Ortofoto toggle
    basemap.show();
    ortofoto.hide();

   // map.addLayer(baseMaps[1]);
    ortofoto.hide();

    var ortoBtn = document.getElementById("ortofoto");

    on(ortoBtn, "click", function() {
        if (dojo.byId("zem").style.display === "none") {
            dojo.byId("ort").style.display = "none";
            dojo.byId("zem").style.display = "block";
            ortofoto.show();
            basemap.hide();
        } else {
            dojo.byId("ort").style.display = "block";
            dojo.byId("zem").style.display = "none";
            basemap.show();
            ortofoto.hide();
        }
    });
    // End Ortofoto toggle

    //Search START
	var geocoders = [{
		url: "https://zemelapiai.vplanas.lt/arcgis/rest/services/Lokatoriai/ADRESAI_V1/GeocodeServer",
		name: "Vilniaus adresai"
	}];

   var geocoder = new Search({
		//arcgisGeocoder: false,
		//geocoders: geocoders,
		sources: [{
			locator: new Locator("https://zemelapiai.vplanas.lt/arcgis/rest/services/Lokatoriai/PAIESKA_COMPOSITE/GeocodeServer"),
			singleLineFieldName: "SingleLine", //AG name of 'Single Line Address Field:'
			outFields: ["*"],
			enableSuggestions: true, //AG only with 10.3 version
			name: "Paieška",
			enableHighlight: true, //highlight symbol
			enableLabel: false,
			//distance: 20, //search distance
			//enableButtonMode: true,
			//expanded: true,
			localSearchOptions: {
			  minScale: 300000,
			  distance: 50000
			},
			placeholder: "Paieška",
			highlightSymbol: new PictureMarkerSymbol("/maps_vilnius/img/map_marker.png", 36, 36).setOffset(0, 12)
		}],
	    //enableInfoWindow: false,
		map: map
		//highlightLocation: true,
/*        autoComplete: true,
        highlightLocation: true,
        arcgisGeocoder: {
            sourceCountry: "LT",
            placeholder: "Gatvė arba adresas"
        }   */
    }, "search");
    geocoder.startup();

	//console.log(geocoder);

	on(geocoder, 'select-result', function () {
		setTimeout(function() {
			popup.hide(); //let's hide popup after 4 seconds
		}, 4000);
	});
    //Geocoder END

    //Opacity slider
	horizontalSlider = new HorizontalSlider({
		labels: ["0 %", "100 %"],
		value: 90,
		minimum: 0,
		maximum: 100,
		intermediateChanges: true,
		discreteValues: 100,
		showButtons: false,
		onChange: function (value) {
			if (CONTROL.currentTheme() === "ad") {
				permitsCluster.setOpacity(value / 100);
			} else if ((CONTROL.currentTheme() === "theme-buildings") || (CONTROL.currentTheme() === null) || (CONTROL.currentTheme() === "")) {
				featureBuildings.setOpacity(value / 100);
				layerBuild.setOpacity(value / 100);
			} else { //set opacity for every default funcionality dynamic layer
				for (var layer in initiateDefaultLayer) {
					if (initiateDefaultLayer.hasOwnProperty(layer)) {
						initiateDefaultLayer[layer].setOpacity(value / 100);
					}
				}
			}
		}
	}, "tools-opacity-widget");
	horizontalSlider.startup();

	//AG initiate layers default opacity
	if (initiateDefaultLayer) {
		for (var layer in initiateDefaultLayer) {
			if (initiateDefaultLayer.hasOwnProperty(layer)) {
				initiateDefaultLayer[layer].setOpacity(horizontalSlider.value / 100);

				//TEMP staticly change raster layer opacity, TODO change raster layers oapcity dynamicly
				if (initiateDefaultLayer[layer].configLayerName === "accidentsRaster") {
					initiateDefaultLayer[layer].setOpacity(0.6);
				}
			}
		}
	}
	if (CONTROL.currentTheme() === "ad") {

	} else if ((CONTROL.currentTheme() === "theme-buildings") || (CONTROL.currentTheme() === null) || (CONTROL.currentTheme() === "")) {
		//featureBuildings.setOpacity(horizontalSlider.value / 10);
		layerBuild.setOpacity(horizontalSlider.value / 100);
	}
    //End Opacity slider

	//console.log(CONTROL.currentTheme("theme"));

    // Add custom themes
	switch (CONTROL.currentTheme("theme")) {
		case "ad": //add permits theme
			var permitsCluster = permitsTheme(map);
			map.on("layer-add-result", function(e) {
			});
			break; //add buildings theme
		//case "theme-buildings" || "": //if theme building or null or empty
		case "theme-buildings": //if theme building
			domClass.add(document.body, "building-theme");
			buildingsTheme(map, featureBuildings, toolsMeasure, featBuildingsUrl, CONTROL.showCursor);
			break;
		case null: //if theme building or null or empty
			domClass.add(document.body, "building-theme");
			buildingsTheme(map, featureBuildings, toolsMeasure, featBuildingsUrl, CONTROL.showCursor);
			break;
		case "schools": //add schools theme

			var mainDijit = registry.byId("mainWindow");

			var rContent = new ContentPane({
				region: "right",
				style: "width: 346px; padding: 0",
				class: "schools",
				content: "<p class='build-p'>Mokyklų paieška pagal adresą:</p><div id='schools-filter'><p>Mokyklų filtravimas<a href='/maps_vilnius/schools.htm' target='_blank' class='red' style='display: none;'>( išimtys )</a>: <br><label>pagal kalbą</label><label class='class-year'>pagal klasę</label><span id='language-filter'></span><span id='year-filter'></span></p></div><div id='search-schools'></div><div id='schools-list' class='module-schools animate'><div id='schools-data'></div><div class='bg-w'><p><span>Priskirtas mokyklų sąrašas:</span></p><ul id='schools-filtered-list'></ul></div></div><div id='schools-info'></div>"
			}).placeAt("mainWindow").startup();

			domClass.add(document.body, "schools-theme");
			schoolsTheme(map, MAPCONFIG, toolsMeasure, CONTROL.showCursor, horizontalSlider, popup, geometryService);
			break;
		default:
			domClass.add(document.body, "default-theme");
	}
	// End add custom themes

    map.on("update-start", function () {
    	//esri.show(loadGif);
		domClass.add("loading-gif", "show");
		domClass.remove("loading-gif", "hide");

    });

    map.on("update-end", function () {
       //esri.hide(loadGif);
	   domClass.remove("loading-gif", "show");
	   domClass.add("loading-gif", "hide");
    });

    //TEMP check url query theme and add/remove layers
    if (CONTROL.currentTheme() === "ad"){
	     map.addLayers([advertsDynLayer]);
    } else if ((CONTROL.currentTheme() === "theme-buildings") || (CONTROL.currentTheme() === null) || (CONTROL.currentTheme() === "")){
    	map.addLayers([layerBuild]);
    }

    //var visible = [];


    on(map, 'onZoomEnd', function() {
        maxOffset = calcOffset();
        layer.setMaxAllowableOffset(maxOffset);
    });

    function calcOffset() {
        return (map.extent.getWidth() / map.width);
    }

    map.infoWindow.resize(350, 300);

    function updateLayerVisibility() {
            var inputs = dojoQuery(".dijitCheckBoxInput");
            //var input;
            var visible = [];

            arrayUtils.forEach(inputs, function(input) {
                if (input.checked) {
                    visible.push(input.id);
                    //TEMP push layer id 0 / CHANGE / REMOVE IT
                    visible.push(0);
                }

                    //TEMP featureL visibility / CHANGE / REMOVE IT
                    if (inputs[0].checked) {
                        // TEMP show featureL
                        //buildings theme
                        featureBuildings.show();

                        //adverts theme
                        advertsDynLayer.show();
                        advertsFeatureLayer.show();

                        if (CONTROL.currentTheme() === "ad"){ //sukurt masyva ir pushint pagal tema
                        	permitsCluster.show();
                        }
                    } else {
                        // TEMP hide featureL
                        featureBuildings.hide();
                        //advert theme
                        advertsDynLayer.hide();
                        advertsFeatureLayer.hide();
                        if (CONTROL.currentTheme() === "ad"){ //sukurt masyva ir pushint pagal tema
                        	permitsCluster.hide();
                        }
                    }
                    //End TEMP featureL visibility, CHANGE / REMOVE IT

            });
              //if there aren't any layers visible set the array to be -1
            if (visible.length === 0) {
                visible.push(-1);
            }
            layerBuild.setVisibleLayers(visible);



            // if layer is switched off, refresh legend and show only visible layers
            //refresh building theme or advertise theme
            var currentTheme = CONTROL.currentTheme();
			if ((currentTheme) === "ad") {
				currentTheme = {layer:advertsDynLayer};
			} else if ((currentTheme) === "theme-buildings") {
				currentTheme = {layer:layerBuild};
			}
            legendDijit.refresh([currentTheme]); //show refreshed legend only from current Theme

    }

    //legend
    map.on("layers-add-result", function (evt) {
		//console.log("EVENTAS");
		//console.log(evt);
	 if ((CONTROL.currentTheme() === "ad") || (CONTROL.currentTheme() === "theme-buildings") || (CONTROL.currentTheme() === null) || (CONTROL.currentTheme() === "")){
	    //create / control inputs and legend of each theme
	  	var showLegendInput = function(layerName, layerId) {
	        var items = arrayUtils.map(layerName.layerInfos, function (info, i) {
				var checkBox;
	       		//console.log(info);
	       		//TEMP
	       		//Pastatai: input for second Layer
	       		//Reklama: input for first layer
	       		if (i === layerId) {
	       			//Sukuriam inputus, labelius su dojo checkbox
	       			checkBox = new CheckBox({
	       				class: "layers-labels",
	       				checked: info.defaultVisibility ? "checked=checked" : "",
	       				id: info.id.toString()
	       					//value: layer.layerInfos[i].toString()
	       					//value: layer.visibleLayers[i].toString()
	       			});
	       		} else {
	       			if (info.defaultVisibility) {
	       				visible.push(info.id);
	       			}
	       			return;
	       		}
	       		//End TEMP
	       		if (info.defaultVisibility) {
	       			visible.push(info.id);
	       		}
	       		//console.log(visible);
	       		//senas metodas
	       		//return "<div class='layers-labels'><input type='checkbox' value='" + (layer.visibleLayers[i]) + "' class='list_item'" + (info.defaultVisibility ? "checked=checked" : "") + "' id='" + info.id + "'' /><label for='" + info.id + "'>" + info.name + "</label></div>";
	       		//convert to dom
	       		inputsList = checkBox.domNode;
	       		//label
	       		label = domConstruct.toDom("<label for='" + info.id + "'>" + info.name + "</label>");
	       		inputsList.appendChild(label);
	       		//workaround, TEMP return string
	       		tmp = document.createElement("div");
	       		tmp.appendChild(inputsList);
	       		//return input via chekcbox widget, will start dojo change event
	       		return tmp.innerHTML;
	       		// return "checkBox.domNode";

	        });

	        var ll = dom.byId("layer-list");
	        ll.innerHTML = items.join(' ');
	        layerBuild.setVisibleLayers(visible);
	        on(ll, "click", updateLayerVisibility);

	        //legend
	        var layerInfo = arrayUtils.map(evt.layers, function (layer, index) {
	          return {layer: layer.layer, title: "Įjungti sluoksniai"};
	    });

	        //console.log(evt);
	        //if (layerInfo.length > 0) {
	        if (layerInfo.length < 2) { //TEMP do not show legend for base layers
	            legendDijit = new Legend({
	                map: map,
	                layerInfos: layerInfo
	            }, "legend-list");
	            legendDijit.startup();
	        }


	        //console.log("layerInfo matomi sluoksniai: " + layerInfo[0].layer.visibleLayers);
	        //legend visibility toggle

	        //console.log(layerBuild.visibleLayers);
        };

	    //check url query theme and run create/control inputs and legend of each theme
	    if (CONTROL.currentTheme() === "ad"){
		    showLegendInput(advertsDynLayer, 0);
	    } else if ((CONTROL.currentTheme() === "theme-buildings") || (CONTROL.currentTheme() === null) || (CONTROL.currentTheme() === "")){
	    	showLegendInput(layerBuild, 1); // theme - Pastatai
	    }
	 }
    });

    //Hash toggle
    var aTagList = document.getElementsByTagName('a');

    for(var i = 0; i < aTagList.length; i++){
      aTagList[i].addEventListener('click', hash, false);
    }

    function hash(e){
        if (window.location.hash === e.currentTarget.getAttribute('href')) {
                window.location.hash = '#closed';
                e.preventDefault();  // AG for JQuery same as": return false (in this case, prevents event handlers after click event)

                //Deactivate tool #2nd /change it
                toolsMeasure.deactivate();
        }

    }

    //Date
    var today = new Date();
    var year = today.getFullYear();
    document.getElementById("credits").innerHTML  = year + " m. | VMS interaktyvūs žemėlapiai | <a href='#' id='copyright'>Autorinės teisės</a> | <a href='http://www.vilniausplanas.lt/' target='_blank'>SĮ „Vilniaus planas“</a>";

    //Mouse cursor
	var activeLayers = [featureBuildings, advertsFeatureLayer];
	CONTROL.showCursor(activeLayers, arrayUtils);
    //END Mouse cursor

	//copyright
	require(["dijit/Tooltip"], function (Tooltip) {
		var copyTooltip = new Tooltip({
			connectId: "copyright",
			id: "cop-class",
			position: ["above"],
			label: "© SĮ Vilniaus planas <br>© Vilniaus miesto savivaldybė<br>ORT5LT © Nacionalinė žemės tarnyba prie ŽŪM<br>© Valstybinė saugomų teritorijų tarnyba prie Aplinkos ministerijos<br>© Policijos departamentas prie Vidaus reikalų ministerijos"
		});
		//console.log(copyTooltip);
	});
});
;var permitsTheme = function (map) {
    var cluster;
    
    require([
        "dojo/on",
        "esri/dijit/Popup",
        "esri/dijit/PopupTemplate",
        "esri/InfoTemplate",
        "dojo/promise/all", "dojo/Deferred",
        "esri/tasks/query",
        "esri/tasks/QueryTask",
        "esri/request",
        "dojo/dom",
        "dojo/dom-construct",
        "dojo/dom-class",
        "esri/renderers/ClassBreaksRenderer",
        "esri/symbols/SimpleFillSymbol", "esri/symbols/SimpleMarkerSymbol",  "esri/renderers/SimpleRenderer", "esri/symbols/SimpleLineSymbol", "esri/Color", "esri/geometry/Extent",
        //cluster
        "app/clusterfeaturelayer", "esri/graphic", "esri/graphicsUtils", "dojo/dom-style", "dojo/_base/fx", "dojo/fx/easing",
        "esri/layers/LayerInfo"
    ], function(
        on,
        Popup,
        PopupTemplate,
        InfoTemplate,
        all, Deferred,
        Query,
        QueryTask,
        /*END Grid */
        esriRequest,
        dom,
        domConstruct,
        domClass,
        ClassBreaksRenderer,
        SimpleFillSymbol, SimpleMarkerSymbol, SimpleRenderer, SimpleLineSymbol, Color, Extent, 
        //cluster
        ClusterFeatureLayer, Graphic, graphicsUtils, domStyle, fx, easing,
        LayerInfo
    ) {
		
			var loadGif = dom.byId("loading-gif"); 

			map.on("update-start", function () {
				  esri.show(loadGif);          
			});

			map.on("update-end", function () {
				esri.hide(loadGif);
			});
			
			map.on("click", function (e) {
				
			});		
		
            var activeClusterElement,
                adClusterTemplate,
                defaultSym,
                selectedSym,
                urlLinks;

           var urLinksArray = [];
		            // Set popup
            popup = map.infoWindow;
            popup.highlight = false;
            popup.titleInBody = false;      
		        // Popup content        	        
		        adClusterTemplate = new InfoTemplate();
		        adClusterTemplate.setContent(        
                    "<ul><li>${DATA:DateFormat(selector: 'date', fullYear: true)}<br><span>Leidimo data</span></li>" + "<li>${GALIOJA_IKI:DateFormat(selector: 'date', fullYear: true)}<br><span>Galioja iki</span></li>" + 
                    "<li>${ADRESAS}<br><span>Adresas</span></li>" + "<li>${SENIUNIJA}<br><span>Seniūnija</span></li>" + 
                    "<li>${UZSAKOVAS}<br><span>Užsakovas</span></li>" + "<li>${UZSAKOVO_KODAS}<br><span>Užsakovo kodas</span></li></ul>"  + 
                    "<p>Dokumentai atsisiųsti:</p><div id='default-attachment'><p style='text-align: center;'><img src='./img/ajax-loader.gif' style=' width: 20px;    text-align: Center;    margin: 0 auto;'></p></div>" + 
                    "<p>${SHOWS}<br><span>Reg. nr.</span></p>" +
                    "<p>${REKLAMOS_TIPAS}<br><span>Reklamos Tipas</span></p>" + 
                    "<p>${TURINYS}<br><span>Turinys</span></p>" + 
                    "<p>${REKLAMOS_PLOTAS}<br><span>Plotas m <sup>2</sup></span></p>"
                );

    
                function urlLinksStr(a){
                    //alert(a);
                    var adMsgComplete = "";
                    var linksLength = a.length;
					var adMsg;
                    if (linksLength > 1 ) {
                        for (var i = 0; i < linksLength; i++){
                            adMsg = "<p></i><a href='" + a[i].url + "' target='blank'>" + a[i].icon + "</a></p>";  
                            adMsgComplete += adMsg;
                        }
                    } else if (a[0] === "Dokumentų nėra") { //AG TEMP
                        adMsg = "<p><i class='fa fa-exclamation'></i><span>" +  a[0] + "</span></p>";
                        adMsgComplete += adMsg;
                    }
                    

                    dom.byId("default-attachment").innerHTML = adMsgComplete;
                    //map.infoWindow.setContent(adMsg);
                    return a;
                }
    
		        selectedSym = new SimpleMarkerSymbol("circle", 24,
		                        new SimpleLineSymbol(SimpleLineSymbol.STYLE_LONGDASH, new Color([223, 52, 59, 1]), 3),
		                        new Color([255, 255, 255, 0]));	

		                        	        
		        // Create a feature layer to get feature service
		        //function addClusterLayer() {
		            var clusterLayer,
						renderer,
		                small,
		                medium,
		                large,
		                xlarge;
		
		            // Add cluster renderer
		            clusterLayer = new ClusterFeatureLayer({
		                "url": "https://zemelapiai.vplanas.lt/arcgis/rest/services/Interaktyvus_zemelapis/Reklamos_registro_leidimai/MapServer/0",
		                "distance": 30,
		                "id": "clusters",
		                "labelColor": "#484848",
		                "resolution": map.extent.getWidth() / map.width,
		                //"where": "GALIOJA =" + 2, 
		                //"singleColor": "#888",
		                //"singleSymbol": defaultSym,
		                "singleTemplate": adClusterTemplate,
		                "useDefaultSymbol": false, //AG false - we're using custom clusterFeaturelayer.js 
                        "maxSingles": 2000,
		                "zoomOnClick": true,
		                "showSingles": true,
		                //"objectIdField": "GALIOJA",
		                outFields: ["*"]
		            });
		
					
		
		            renderer = new ClassBreaksRenderer(defaultSym, "clusterCount");
                    
                    // Yellow clusters
                    // AG Based on https://coolors.co/app/ffbf00-e83f6f-2274a5-32936f-ffffff 
                    small = new SimpleMarkerSymbol('circle', 30,
                            new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([255, 210, 75, 0.4]), 15),
                            new Color([255, 210, 75, 0.85]));
                    medium = new SimpleMarkerSymbol('circle', 40,
                            new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([255, 210, 75, 0.4]), 15),
                            new Color([255, 210, 75, 0.85]));
                    large = new SimpleMarkerSymbol('circle', 50,
                            new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([255, 210, 75, 0.4]), 15),
                            new Color([255, 210, 75, 0.75]));
                    xlarge = new SimpleMarkerSymbol('circle', 60,
                            new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([255, 210, 75, 0.4]), 15),
                            new Color([255, 210, 75, 0.85]));
		
		            // Break values - can adjust easily
		            renderer.addBreak(2, 50, small);
		            renderer.addBreak(50, 250, medium);
		            renderer.addBreak(250, 1000, large);
		            renderer.addBreak(1000, 50000, xlarge);
		
		            // Providing a ClassBreakRenderer is also optional
		            clusterLayer.setRenderer(renderer);
		            
                    map.addLayer(clusterLayer);
					
					//AG add padding for cluster point click event // BUG FIX FOR CHROME
					on(clusterLayer, "click", function(e) {
						//console.log(e);
						clusterLayer.geometry = e.mapPoint;
						//add padding to point feature and get featureset attributes 
						pxWidth = map.extent.getWidth() / map.width;
						padding = 30 * pxWidth;
						qGeom = new Extent({
							"xmin": clusterLayer.geometry.x - padding,
							"ymin": clusterLayer.geometry.y - padding,
							"xmax": clusterLayer.geometry.x + padding,
							"ymax": clusterLayer.geometry.y + padding,
								"spatialReference": clusterLayer.geometry.spatialReference
						});
						// use the extent for the query geometry
						clusterLayer.geometry = qGeom;
						//console.log("clusterLayer.geometry: ");
						//console.log(clusterLayer.geometry);						
						//alert("asdsa");
					});

						
                var timeOut;
		
		        // Create new graphic and add to map.graphics
		        function addSelectedFeature() {
                    clearTimeout(timeOut);
                    timeOut = setTimeout(function(){
		            var selIndex = map.infoWindow.selectedIndex,
		                selFeature;
		            if (selIndex !== -1) {
		                selFeature = map.infoWindow.features[selIndex];
		                // Remove old feature first
		                removeSelectedFeature();
		                // Add new graphic
		                map.infoWindow._lastSelected = new Graphic(selFeature.toJson());
		                map.infoWindow._lastSelected.setSymbol(selectedSym);
		                map.graphics.add(map.infoWindow._lastSelected);
                        
                        //AG get different symbols with newlys created VALID ID = GALIOJA on popup selection change
                        var process =  popupState(selFeature);	   
                        process.then(function(a){
                                             
							//alert(results);
							//console.log("REDAS");
							//console.log(a);
                    	});
                    }
                    }, 50);
		        }
                
                function queryURL(id) {
                    var promise = new Deferred();
                    //QueryTask: url 
                    
                    var queryAdURL = new Query();
                    //queryAdURL.where = "1=1";
                    queryAdURL.returnGeometry = false;
                    queryAdURL.outFields = ["ID", "VLN_REKLAMOS_ID", "CONTENTTYPE", "TITLE "];                  
                    queryAdURL.where = "VLN_REKLAMOS_ID = '" + id + "'";
                    //AG check if querytask service instance number is equal or more then actual entries, in this case service instance > 12K
                    var queryTaskAdURL;
                    queryTaskAdURL = new QueryTask("https://zemelapiai.vplanas.lt/arcgis/rest/services/Interaktyvus_zemelapis/Reklamos_registro_leidimai/MapServer/1");
                    
                    promise.resolve({query: queryAdURL, task: queryTaskAdURL});
    
                    //promise.resolve(queryTaskAdURL.execute(queryAdURL, queryURLresults));
                    
                    return promise.promise;
                }
    
                var timer;

                function queryURLresults(results) {
                	timer = setTimeout(function () {

                		urLinksArray.length = 0; //AG reset urLinksArray

                		window.clearTimeout(timer);

                		//console.log("REZULATATAI");
                		// console.log(results);
                		// console.log("END REZULATATAI");           
                		var urlBase = "http://www.vilnius.lt/isorei/isorinereklama/files/";
                		var resultsFeaturesA = results.features;
                		//AG check if results has features
						
						var runUrl;
						
                		if (resultsFeaturesA.length !== 0) {
							
							var runUrlInner = function () {
								runURL = function (url) {
									urlLinksStr.call(null, urLinksArray);
								};
								setTimeout(function () {
									runURL(urLinksArray);
								}, 500);
							};
							
                			for (var i = 0; i < resultsFeaturesA.length; i++) {
                				var urlDocStyle = results.features[i].attributes.CONTENTTYPE;

                				var urlId = parseInt(results.features[i].attributes.VLN_REKLAMOS_ID, 10);
                				var urlEnd = results.features[i].attributes.TITLE;
                				var urLinks = urlBase + urlId + "_" + urlEnd;

                				var urlObj = {
                					url: urLinks,
                					icon: docStyle(urlDocStyle)
                				};

                				urLinksArray.push(urlObj);

                				runUrlInner();
							}
                		} else {
                			urLinksArray = ["Dokumentų nėra"];

                			runURL = function (url) {
                				urlLinksStr.call(null, urLinksArray);
                			};
                			setTimeout(function () {
                				runURL(urLinksArray);
                			}, 50);
                		}

                		return urLinksArray;
                	}, 1000);
                }
                function docStyle (string) {
                    var iconStr = "";
                    var stringParts = string.split("/");
                    var partLenght = stringParts.length;
                    var docIcon = stringParts[partLenght - 1];
                    switch (docIcon) {
	                        case "pdf":
	                            iconStr = "<i class='fa fa-file-pdf-o' aria-hidden='true'></i>";
	                            break;
	                        case "vnd.openxmlformats-officedocument.wordprocessingml.document":
	                            iconStr = "<i class='fa fa-file-word-o' aria-hidden='true'></i>";
	                            break;
	                        case "vnd.lt.archyvai.adoc-2008":
	                            iconStr = "<i class='fa fa-file-word-o' aria-hidden='true'></i>";
	                            break;                              
	                        case "vnd.ms-excel":
	                            iconStr = "<i class='fa fa-file-excel-o' aria-hidden='true'></i>";
	                            break;                              
	                        case "jpeg":
	                            iconStr = "<i class='fa fa-file-image-o' aria-hidden='true'></i>";
	                            break;
	                        default:
	                            iconStr = "<i class='fa fa-file-o' aria-hidden='true'></i>";
	                }
                    return iconStr;
                }
    
                function popupState(selected) {
	                var promise = new Deferred();
					var hasClass;
					
					//remove classes if exists 
					if (domClass.contains("default-popup", "invalid-ad")) {
						domClass.remove("default-popup", "invalid-ad");
					} else if (domClass.contains("default-popup", "valid-ad")) {
						domClass.remove("default-popup", "valid-ad");
					}
                    
                    //AG get different symbols with newlys created VALID ID = GALIOJA on popup selection change
                    //var graphic = popup.getSelectedFeature();
                    var galiojaKEY = selected.attributes.GALIOJA;
                    var idKEY = selected.attributes.ID;
                    //queryTask for url
                    if (idKEY && galiojaKEY) {
                    var process =  queryURL(idKEY);
                    process.then(function(queryObject){
                        setTimeout(function() {
                        queryObject.task.execute(queryObject.query, queryURLresults);         
                        //console.log("DEFAS");
                       //console.log(queryObject);
                        promise.resolve(queryObject);
                        }, 100);
                    });
                        if ((galiojaKEY === 1) || (galiojaKEY === 3)) {
                            map.infoWindow.setTitle("Galiojantis reklamos registro leidimas " );   //BUG FIX for showing titles               
                            adClusterTemplate.setTitle("Galiojantis reklamos registro leidimas ");   //BUG FIX for showing titles               
                            hasClass = domClass.contains("default-popup", "invalid-ad") ? domClass.remove("default-popup", "invalid-ad") : domClass.add("default-popup", "valid-ad");
                            domClass.add("default-popup", "valid-ad");  
                        } else if (galiojaKEY === 2) {
                            map.infoWindow.setTitle("Negaliojantis reklamos registro leidimas "); //BUG FIX for showing titles
                            adClusterTemplate.setTitle("Negaliojantis reklamos registro leidimas "); //BUG FIX for showing titles
                            hasClass = domClass.contains("default-popup", "valid-ad") ? domClass.remove("default-popup", "valid-ad") : domClass.add("default-popup", "invalid-ad"); 
                            domClass.add("default-popup", "invalid-ad");  
                        }             
                   // console.log("features set");
                   // console.log(selected);
                    } 
 
                    return promise.promise;                   
                }
		
		        // Remove graphic from map.graphics
		        function removeSelectedFeature() {
		            if (map.infoWindow._lastSelected) {
		                map.graphics.remove(map.infoWindow._lastSelected);
		                map.infoWindow._lastSelected = null;
		            }
		        }
		
		        // Highlight clusters
		        function setActiveClusterOpacity(elem, fillOpacity, strokeOpacity) {
		            var textElm;
		            if (elem) {
		                elem.setAttribute("fill-opacity", fillOpacity);
		                elem.setAttribute("stroke-opacity", strokeOpacity);
		                // Overide inherited properties for the text in the circle
		                textElm = elem.nextElementSibling;
		                if (textElm && textElm.nodeName === "text") {
		                    textElm.setAttribute("fill-opacity", 1);
		                }
		            }
		        }
		
		        // Save the last selected graphic so we can highlight it
		        map.infoWindow.on("selection-change", function () {
		            addSelectedFeature();
		            animateInfoWindow();
		        });
		
		        // Clear selected graphic when infoWindow is hidden
		        map.infoWindow.on("hide", function () {
		            // re-activate cluster
		            setActiveClusterOpacity(activeClusterElement, 0.75, 0.5);
		            removeSelectedFeature();
		        });
		
		
        function animateInfoWindow() {
            domStyle.set(map.infoWindow.domNode, "opacity", 0);
            fx.fadeIn({node: map.infoWindow.domNode,
                       duration: 150,
		              easing: easing.quadIn}).play();
        }
		
    	cluster = clusterLayer;
		
        return cluster;
        
    });
    
    return cluster;
};;var buildingsTheme = function (map, featureBuildings, toolsMeasure, featBuildingsUrl, showCursor) {
	
	require([
		"dijit/TooltipDialog",
		"dijit/popup",
		"dojo/mouse",
		"dojo/_base/connect",
		"esri/toolbars/navigation",
		"esri/config",
		"dojo/on",
		"dojo/query",
		"esri/layers/ArcGISTiledMapServiceLayer",
		"esri/layers/ArcGISDynamicMapServiceLayer",
		"esri/dijit/Legend",
		"dojo/_base/array",
		"dojo/parser", /* http://dojotoolkit.org/reference-guide/1.10/dojo/parser.html */
		"esri/dijit/Popup",
		"esri/dijit/PopupTemplate",
		"esri/InfoTemplate",
		"esri/layers/FeatureLayer",
		/*START Grid */
		"dojo/_base/declare",
		"dojo/promise/all", "dojo/Deferred",
		"dgrid/OnDemandGrid",
		"dgrid/Selection",
		"dojo/store/Memory",
		"dijit/form/CheckBox",
		"esri/tasks/query",
		"esri/tasks/QueryTask",
		"esri/symbols/SimpleMarkerSymbol",
		"esri/renderers/SimpleRenderer",
		"esri/Color",
		/*END Grid */
		"esri/request",
		"dojo/dom",
		"dojo/dom-construct",
		"dojo/dom-class",
		"esri/symbols/SimpleFillSymbol",
		"esri/renderers/ClassBreaksRenderer",
		//Measure
		"esri/dijit/Measurement", "esri/units",
		"esri/dijit/Geocoder",
		"esri/symbols/SimpleLineSymbol", "esri/geometry/Extent",
		//cluster
		"app/clusterfeaturelayer", "esri/graphic", "esri/graphicsUtils", "dojo/dom-style", "dojo/_base/fx", "dojo/fx/easing",
		"dijit/registry",
		"esri/dijit/Scalebar",
		"esri/layers/LayerInfo",
		"js/photoswipe.min.js",
        "js/photoswipe-ui-default.min.js",
		"dijit/layout/TabContainer",
		"dijit/layout/BorderContainer",
		"dijit/layout/ContentPane",
		"dojo/domReady!"
	], function (
		TooltipDialog, dijitPopup,
		mouse,
		connect,
		Navigation,
		esriConfig,
		on,
		dojoQuery,
		ArcGISTiledMapServiceLayer,
		ArcGISDynamicMapServiceLayer,
		Legend,
		arrayUtils,
		parser,
		Popup,
		PopupTemplate,
		InfoTemplate,
		FeatureLayer,
		/*START Grid */
		declare,
		all, Deferred,
		Grid,
		Selection,
		Memory,
		CheckBox,
		Query,
		QueryTask,
		//Query,
		SimpleMarkerSymbol,
		SimpleRenderer,
		Color,
		/*END Grid */
		esriRequest,
		dom,
		domConstruct,
		domClass,
		SimpleFillSymbol,
		ClassBreaksRenderer,
		Measurement,
		Units,
		Geocoder, SimpleLineSymbol, Extent,
		//cluster
		ClusterFeatureLayer, Graphic, graphicsUtils, domStyle, fx, easing,
		registry,
		Scalebar,
		LayerInfo,
		PhotoSwipe, PhotoSwipeUI_Default
	) {
		//Photoswipe
		var pswpElement = document.querySelectorAll('.pswp')[0];
		var galleryHelp = document.getElementById("building-help");

		galleryHelp.addEventListener("click", function () {

			// build items array
			var items = [
				{
					src: '/maps_vilnius/img/help_1.png',
					title: '1. Adresų paieškos lauko arba navigacijos meniu (jei ieškote tiesiogiai žemėlapyje) pagalba priartinkite žemėlapio vaizdą kol matysite pastatų kontūrus',
					w: 1408,
					h: 828
			    },
				{
					src: '/maps_vilnius/img/help_2.png',
					title: '2. Pažymėkite konkretų pastatą, dešinėje atsidarusiame lange rasite visą turimą pastato informaciją bei paryškintas potemes',
					w: 1408,
					h: 828
			    },
				{
					src: '/maps_vilnius/img/help_3.png',
					title: '3. Norėdami palyginti pastatų tarifus, pasirinkite "Tarifų palyginimas" potemę',
					w: 1408,
					h: 828
			    },
				{
					src: '/maps_vilnius/img/help_4.png',
					title: '4. Norėdami palyginti dviejų pastatų tarifus, spūstelkite mygtuką "Pasirinkite pastatą palyginimui" ',
					w: 1408,
					h: 828
			    },
				{
					src: '/maps_vilnius/img/help_5.png',
					title: '5. Pelės pagalba pažymėkite naują pastatą palyginimui',
					w: 1408,
					h: 828
			    },
				{
					src: '/maps_vilnius/img/help_6.png',
					title: '6. Pažymėjus pastatą palyginimui, dešinėje atsidarusiame lange rasite dviejų pastatų turimų tarifų lentelę. Norėdami nutraukti palyginimą spūtelkite mygtuką "Atgal"',
					w: 1408,
					h: 828
			    },
				{
					src: '/maps_vilnius/img/help_7.png',
					title: '7. Norėdami palyginti visų administratorių pastatų tarifų vidurkius, spūstelkite opciją "Pasirinkite palyginamąjį vidutinį tarifą" bei pažymėkite konkretų tarifą ',
					w: 1408,
					h: 828
			    },
				{
					src: '/maps_vilnius/img/help_8.png',
					title: '8. Pažymėjus konkretų tarifą grafike matysite administratorių vidutinius vidurkius. PASTABA: bendrijų ir JVS duomenis nėra tikslūs',
					w: 1408,
					h: 828
			    }
			];

			// define options (if needed)
			var options = {
				showAnimationDuration: 200,
				errorMsg: '<div class="pswp__error-msg"><a href="%url%" target="_blank">Įvyko klaida.</a> Atsiprašome galerija nepasiekiama.</div>',
				// optionName: 'option value'
				// for example:
				index: 0 // start at first slide
			};

			// Initializes and opens PhotoSwipe
			var gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
			gallery.init();
		});
		//End Photoswipe

		// Full  administrators comparison
		var administratorGraph = {
			bendrijosColor: "rgba(115, 178, 255, 1)",
			jvsColor: "rgba(115, 255, 223, 1)",
			admColor: "rgba(168, 226, 251, 1)",
			createSelection: function () {
				return require(["dijit/form/Select"], function (Select) {
					var selection = new Select({
						name: "selectGraph",
						options: [
							{
								label: "Pasirinkite palyginamajį vidutinį tarifą:",
								value: "none",
								selected: true
							},
							{
								label: "Administracinis tarifas (Eur/m²)",
								value: "adm"
							},
							{
								label: "Techninės priežiūros tarifas (Eur/m²)",
								value: "tech"
							},
							{
								label: "Šildymo sistemų priežiūros tarifas (Eur/m²)",
								value: "sist"
							},
							{
								label: "Atliekų tarifas (Eur/m²)",
								value: "atl"
							}
						//{ label: "Šildymo s. vidutinio mėn. šildymo", value: "sild" }
						]
					}, "selection-list");
					selection.startup();
				});
			},
			setQuery: function (currentSelect, valdName) {
				var promise = new Deferred(),
					graphQuery = new Query(),
					graphQueryTask = new QueryTask("https://zemelapiai.vplanas.lt/arcgis/rest/services/Interaktyvus_zemelapis/Pastatu_administravimas/MapServer/4"),
					self = this;
				graphQuery.where = "1=1";
				graphQuery.returnGeometry = false;
				graphQuery.outFields = ["*"];

				graphQueryTask.execute(graphQuery).then(function (deferred) {
					var res = self.showGraphData(deferred, currentSelect, valdName);
					promise.resolve(res);
				});
				return promise.promise;
			},
			showGraphData: function (results, currentSelect, valdName) {
				var labels = [],
					labelsStr = [],
					admT = [],
					atliek = [],
					techP = [],
					sildP = [],
					sildVid = [],
					bgColour = [],
					strokeColour = [],
					i = 0,
					dataPath;
				for (i; i < results.features.length; i += 1) {
					dataPath = results.features[i].attributes;
					labels.push(dataPath.VALDF_GR);
					labelsStr.push(dataPath.VALDF_GR_T);
					admT.push(dataPath.Namo_administracinis);
					atliek.push(dataPath.Atliekos);
					techP.push(dataPath.Tech_priez);
					sildP.push(dataPath.Sild_sist_priez);
					sildVid.push(dataPath.Sildymas);

					switch (dataPath.VALDF_GR) {
						case 2: //Bendrijos
							bgColour.push(this.bendrijosColor);
							strokeColour.push("rgba(0, 112, 255, 1)");
							break;
						case 3: //JVS
							bgColour.push(this.jvsColor);
							strokeColour.push("rgba(0, 168, 132, 1)");
							break;
						default:
							bgColour.push(this.admColor);
							strokeColour.push("rgba(136, 187, 216, 1)");
							break;
					}
				}
				var graphData = {
					labels: labels,
					labelsStr: labelsStr,
					admT: admT,
					atliek: atliek,
					techP: techP,
					sildP: sildP,
					sildVid: sildVid,
					bgColour: bgColour
				};

				this.showGraphics(graphData, currentSelect);

				//set unique bar atrtibutes for only 1 dataset
				//console.log(myBar.datasets[0]);
				for (var a = 0; a < myBar.datasets[0].fillColor.length; a += 1) {
					myBar.datasets[0].bars[a].fillColor = bgColour[a];
					//add current border
					var l = myBar.datasets[0].bars[a].label;
					//AG check current administrator and highlight dif color
					if (valdName === myBar.datasets[0].bars[a].label) {
						myBar.datasets[0].bars[a].strokeColor = "red";
					} else {
						myBar.datasets[0].bars[a].strokeColor = strokeColour[a];
					}
					myBar.datasets[0].bars[a].strokeWidth = 1;

				}
				myBar.update();
			},
			showGraphics: function (a, currentSelect) {

				//TEMP destroy chart
				if (typeof myBar != "undefined") {
					myBar.destroy();
				}

				//check current selection value and draw relative graphic
				var currentGraphic;
				switch (currentSelect) {
					case "adm":
						currentGraphic = a.admT;
						break;
					case "tech":
						currentGraphic = a.techP;
						break;
					case "sist":
						currentGraphic = a.sildP;
						break;
					case "sild":
						currentGraphic = a.sildVid;
						break;
					case "atl":
						currentGraphic = a.atliek;
						break;
				}

				//alert(currentGraphic);
				var data = {
					labels: a.labelsStr,
					datasets: [
						{
							//label: "Skirtingų valdymo formų tarifų palyginimas",

							// The properties below allow an array to be specified to change the value of the item at the given index
							// String  or array - the bar color
							fillColor: a.bgColour,

							// String or array - bar stroke color
							borderColor: a.bgColour,

							// Number or array - bar border width
							borderWidth: 1,

							highlightFill: "#F7F7F7",

							highlightStroke: "rgba(159, 159, 159, 0.91)",

							// String or array - fill color when hovered
							//hoverBackgroundColor: "rgba(255,99,132,0.4)",

							// String or array - border color when hovered
							//hoverBorderColor: "rgba(255,99,132,1)",

							// The actual data
							data: currentGraphic,

							// String - If specified, binds the dataset to a certain y-axis. If not specified, the first y-axis is used.
							yAxisID: "y-axis-0"
					}
				]
				};
				var options = {
					scaleLineColor: "rgba(0,0,0,.4)",
					showScale: true,
					scaleFontSize: 12,
					scaleFontColor: "#555",
					scaleShowLabels: true,
					//scaleLabel: "<%=value + ' Eur/m²'%>",
					scaleLabel: "<%=value%>",
					tooltipCornerRadius: 2,
					tooltipTemplate: "<%= label%>: <%= value + ' Eur/m²'%>",
					scaleSteps: 1,
					barValueSpacing: 1,
					responsive: false //true mode buggy - top much elements			
				};
				var ctb = document.getElementById("myBarChart").getContext("2d");
				window.myBar = new Chart(ctb).Bar(data, options);
				//myBar.width.ratio = 0.1;
				var myBarLegend = myBar.datasets[0].fillColor;
				var uniqueLegend = myBarLegend.getUnique();
				var myBarLengendStr = "";
				for (var i = 0; i < myBarLegend.length; i += 1) {
					if (uniqueLegend[i] === this.admColor)
						myBarLengendStr += "<p><span style='background-color:" + uniqueLegend[i] + " '></span>Administratoriai</p>";
					if (uniqueLegend[i] === this.bendrijosColor)
						myBarLengendStr += "<p><span style='background-color:" + uniqueLegend[i] + " '></span>Bendrijos</p>";
					if (uniqueLegend[i] === this.jvsColor)
						myBarLengendStr += "<p><span style='background-color:" + uniqueLegend[i] + " '></span>JVS</p>";
				}
				dom.byId("bar-legend").innerHTML = "<div id='chart-legend'><div class='line-legend'>" + myBarLengendStr + "</div></div>";

				dom.byId("bar-tips").innerHTML = "<div id='chart-legend'><div class='line-legend'><h5><i class='fa fa-exclamation' style='color: #C1272D; height: auto'></i>Dėl bendrijų ir JVS vidutinių tarifų:</h5><p>Bendrijų ir JVS duomenys nėra tikslūs, nes informacija apie tarifus pateikta mažiau kaip 50 proc. bendrijų arba  jungtinės veiklos sutartimi  valdomų namų.</br>Sprendimas  dėl įmokų tarifų dydžio priimamas Civilinio kodekso 4.85 straipsnyje nustatyta tvarka</p><p><i class='fa fa-exclamation' style='color: #C1272D; height: auto'></i>Duomenys atliekų tarifo grafike pateikiami neįvertinus atliekų tvarkymo paskirstymo skaičiavimo būdo. Bendrijų ir JVS valdomų daugiabučių namų butų ir kitų patalpų savininkams mokestis už atliekų tvarkymą skaičiuojamas ne tik nuo buto naudingo  ploto, bet ir nuo gyventojų skaičiaus bute. Sprendimas priimamas Civilinio kodekso 4.85 straipsnyje nustatyta tvarka.</p></div></div>";
			}
		};


		//administratorGraph.setQuery().then(function(a) {return a});

		//NEW 2015 11
		//QueryTask: namo bendrieji tarifai
		var buildingAdministrationTask = new QueryTask("https://zemelapiai.vplanas.lt/arcgis/rest/services/Interaktyvus_zemelapis/Pastatu_administravimas/MapServer/1");
		var buildingAdministration = new Query();
		buildingAdministration.outSpatialReference = {
			wkid: 3346
		};
		buildingAdministration.returnGeometry = false;
		buildingAdministration.outFields = ["*"];

		//QueryTask: namo šilumos tarifai
		var queryHeating = new Query();
		var queryTaskHeating;
		setTimeout(function () {
			queryTaskHeating = new QueryTask("https://zemelapiai.vplanas.lt/arcgis/rest/services/Interaktyvus_zemelapis/Pastatu_administravimas/MapServer/2");
		}, 150);


		// selection symbol used to draw the selected census block points within polygon
		var symbol = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID, new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([193, 39, 45, 1]), 3), new Color([129, 183, 206, 0]));

		featureBuildings.setSelectionSymbol(symbol);

		//feature layer symbol invisible
		var symbolBuild = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID, new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([78, 78, 78, 0]), 1), new Color([195, 219, 159, 0]));

		featureBuildings.setRenderer(new SimpleRenderer(symbolBuild));

		map.addLayer(featureBuildings);

		function runQuery(e) {

			if (dijit.byId("selection-list")) {
				dijit.byId("selection-list").destroy(); // destroy selection widget if exists
			}

			window.location.hash = '#close'; //remove panel

			var zoomLevel = map.getMaxZoom() - 1;
			map.centerAndZoom(e.mapPoint, zoomLevel); //AG center & zoom

			buildingAdministration.geometry = e.mapPoint;
			buildingAdministrationTask.execute(buildingAdministration, showData).then(function () {
				administratorGraph.createSelection(); //create selection options
			});

			//run everytime new selection
			featureBuildings.selectFeatures(buildingAdministration, featureBuildings.SELECTION_NEW);

			//AG add timeout for UI delay 
			setTimeout(function () {

				//Building Hash
				window.location.hash = '#build-data';

				//Deactivate tool #2nd /change it
				toolsMeasure.deactivate();
			}, 100);
		}

		on(featureBuildings, "click", runQuery);

		function showData(results) {

			// AG TEMP destroy Chart.js canvas graphic
			if (typeof myLine !== "undefined") {
				myLine.destroy();
			}

			if (typeof myLineHeating !== "undefined") {
				myLineHeating.destroy();
			}

			var einMetai, galiojMetai, adresas, 
				administr, administrLast, admChangeYear, statM, statPask, nrPlane, bendrPlotas, patalpugsk, naudPlotas, patalpunks,
				valdForm, valdFormString, bnovAdr, bnovPask, bnovPaskMsg,
				bnovVadov, bnovTel, bnovVadyb, bnovVadybTel,
				bnovVadov1, bnovTel1, bnovVadyb1, bnovVadybTel1, bnovElP1,
				bnovVadov2, bnovTel2, bnovVadyb2, bnovVadybTel2, bnovElP2,
				bnovVadov3, bnovTel3, bnovVadyb3, bnovVadybTel3, bnovElP3,
				bnovVadov4, bnovTel4, bnovVadyb4, bnovVadybTel4, bnovElP4, vadovVisi,
				bnovKodas, skundSk, skundPob,
				energE, renov, renovApr,
				atliekMax, atliekMid, atliekMin,
				liftImok, ltptMax, ltptMid, ltptMin,
				ntptMin, ntptMid, ntptMax,
				nsptMin, nsptMid, nsptMax,
				kitMin, kitMid, kitMax, sukauptLes,
				adm, skl, sav, ntrun, ntrunStr,
				techPr, sildPr, liftPr;

			var dataPath = results.features[0].attributes;
			var dataFiltered = {};

			//AG filter null/undefined properties and change object properties
			for (var prop in dataPath) {

				//AG check the prop is property of the dataPath object
				if (dataPath.hasOwnProperty(prop)) {

					//console.log(dataPath[prop]);
					var pName = prop;
					if (!dataPath[prop]) {
						if ((prop == "ATLKMAX") || (prop == "ATLKMID") || (prop == "ATLKMIN") || (prop == "LTPTMAX") || (prop == "LTPTMID") || (prop == "LTPTMIN") || (prop == "NTPTMAX") || (prop == "NTPTMID") || (prop == "NTPTMIN") || (prop == "KITMAX") || (prop == "KITMID") || (prop == "KITMIN") || (prop == "LKITMAX") || (prop == "LKITMID") || (prop == "LKITMIN") || (prop == "NSPTMAX") || (prop == "NSPTMID") || (prop == "NSPTMIN")) {
							//dataPath[prop] = null;
							dataFiltered = dataPath;
						} else {
							dataPath[prop] = "Nėra duomenų";
							dataFiltered = dataPath;
						}
					}
				}
			}
			//Bendroji informacija
			einMetai = dataPath.METAIMAX;
			galiojMetai = dataPath.A_ADMINIKI == "Nėra duomenų" ? "Nėra duomenų" : dataPath.A_ADMINIKI_T; //Administratoriaus paskyrimo galiojimo terminas
			adresas = dataPath.ADRESAS;
			statM = dataPath.STATMET == "Nėra duomenų" ? "Nėra duomenų" : dataPath.STATMET + " metai";
			statPask = dataPath.STATPASK;
			nrPlane = dataPath.NR_PLANE;
			bendrPlotas = dataPath.BENDR_PLOT;
			naudPlotas = dataPath.NAUD_PLOT;
			patalpugsk = dataPath.PATALPUGSK;
			patalpunks = dataPath.PATALPUNSK == "Nėra duomenų" ? "Nėra" : dataPath.PATALPUNSK;
			adm = dataPath.ADMTARIF == "Nėra duomenų" ? "Nėra duomenų" : dataPath.ADMTARIF;
			skl = dataPath.SKL_PLOT == "Nėra duomenų" ? "Nėra duomenų" : dataPath.SKL_PLOT + " a";
			sav = dataPath.SAV_TEISES;
			ntrun = dataPath.NTRUNKNR;
			ntrunStr = ntrun.toString().substr(0, 4) + "-" + ntrun.toString().substr(4, 4) + "-" + ntrun.toString().substr(8);
			//Valdytojai BNOV
			administr = dataPath.ADMINISTR; //valdytojas
			administrLast = dataPath.ADMINISTR_BUV || "Nėra duomenų"; //senas valdytojas 
			admChangeYear = dataPath.ADMINISTR_BUV_DAT; //valdytojo pasikeitimo metai
			//check if admChangeYear is undefined
			if ((typeof admChangeYear === "undefined")) {
				admChangeYear = "Nėra duomenų";
			}
			valdForm = dataPath.VALDFORM; //valdymo forma
			valdFormString = valdFormFunc();
			bnovAdr = dataPath.A_ADRES; //bnov adresas
			bnovPask = dataPath.A_PASKPAGR; //vmsa įsakymas
			//msg
			bnovPaskMsg = ((valdForm == 1 ? "<p>" + bnovPask + "<br><span><span class='bnov'>Vilniaus miesto savivaldybės administracijos įsakymas</span></span></p>" : "") + 
				(valdForm == 2 ? "<p>" + bnovPask + "<br><span><span class='bnov'>BNOV  registravimo data  JAR‘e (Juridinių asmenų registras)</span></span></p>" : "") +
				(valdForm == 3 ? "<p>" + bnovPask + "<br><span><span class='bnov'>BNOV  registravimo data NTR‘e (Nekilnojamo turto registras)</span></span></p>" : "") );
			bnovVadov = dataPath.A_VADOVAS;
			bnovTel = dataPath.A_VADTEL;
			bnovVadov1 = dataPath.A_VADOVAS1;
			bnovTel1 = dataPath.A_VADTEL1;
			bnovElP1 = dataPath.A_ELPAST1;
			bnovVadov2 = dataPath.A_VADOVAS2;
			bnovTel2 = dataPath.A_VADTEL2;
			bnovElP2 = dataPath.A_ELPAST2;
			bnovVadov3 = dataPath.A_VADOVAS3;
			bnovTel3 = dataPath.A_VADTEL3;
			bnovElP3 = dataPath.A_ELPAST3;
			bnovVadov4 = dataPath.A_VADOVAS4;
			bnovTel4 = dataPath.A_VADTEL4;
			bnovElP4 = dataPath.A_ELPAST4;
			bnovVadyb = dataPath.NPVADYB;
			bnovVadybTel = dataPath.A_VADYBTEL;
			bnovElP = dataPath.A_ELPAST;
			vadovVisi = (bnovVadov1 == "Nėra duomenų" ? "" : "<p>" + bnovVadov1 + "<br><span><span class='bnov'>BNOV</span> vadovas</span></p><p>" + bnovTel1 + "<br><span><span class='bnov'>BNOV</span> vadovo telefonas</span></p>" + (bnovElP1 == "Nėra duomenų" ? "" : "<p>" + bnovElP1 + "<br><span><span class='bnov'>BNOV</span> vadovo el. paštas</span></p>")) + 
				(bnovVadov2 == "Nėra duomenų" ? "" : "<p>" + bnovVadov2 + "<br><span><span class='bnov'>BNOV</span> vadovas</span></p><p>" + bnovTel2 + "<br><span><span class='bnov'>BNOV</span> vadovo telefonas</span></p>" + (bnovElP2 == "Nėra duomenų" ? "" : "<p>" + bnovElP2 + "<br><span><span class='bnov'>BNOV</span> vadovo el. paštas</span></p>")) +
				(bnovVadov3 == "Nėra duomenų" ? "" : "<p>" + bnovVadov3 + "<br><span><span class='bnov'>BNOV</span> vadovas</span></p><p>" + bnovTel3 + "<br><span><span class='bnov'>BNOV</span> vadovo telefonas</span></p>" + (bnovElP3 == "Nėra duomenų" ? "" : "<p>" + bnovElP3 + "<br><span><span class='bnov'>BNOV</span> vadovo el. paštas</span></p>")) +
				(bnovVadov4 == "Nėra duomenų" ? "" : "<p>" + bnovVadov4 + "<br><span><span class='bnov'>BNOV</span> vadovas</span></p><p>" + bnovTel4 + "<br><span><span class='bnov'>BNOV</span> vadovo telefonas</span></p>"  + (bnovElP4 == "Nėra duomenų" ? "" : "<p>" + bnovElP4 + "<br><span><span class='bnov'>BNOV</span> vadovo el. paštas</span></p>"));
			bnovKodas = dataPath.A_KODAS;
			skundSk = dataPath.SKUNDUSK == "Nėra duomenų" ? "Nėra duomenų" : dataPath.SKUNDUSK + " vnt.";
			skundPob = dataPath.SKUNDPOB;
			//Renovacija
			energE = dataPath.ENEFKL == "Nėra duomenų" ? "Nėra duomenų" : dataPath.ENEFKL + " klasė";
			renov = dataPath.RENOVMET == "Nėra duomenų" ? "Nėra duomenų" : dataPath.RENOVMET + " metai";
			renovApr = dataPath.RENOVUOTA;
			//Kaina už atliekas
			atliekMax = dataPath.ATLKMAX; // Metai
			atliekMid = dataPath.ATLKMID; //Metai - 1
			atliekMin = dataPath.ATLKMIN; //Metai - 2
			//Lifto techninės priežiūros tarifas
			liftImok = dataPath.LTPTMAX;
			ltptMax = dataPath.LTPTMAX; // Metai
			ltptMid = dataPath.LTPTMID; //Metai - 1
			ltptMin = dataPath.LTPTMIN; //Metai - 2
			//Namo techninės priežiūros tarifas
			ntptMax = dataPath.NTPTMAX; // Metai
			ntptMid = dataPath.NTPTMID; //Metai - 1
			ntptMin = dataPath.NTPTMIN; //Metai - 2
			//Namo šildymo sistemų tarifas
			nsptMax = dataPath.NSPTMAX; // Metai
			nsptMid = dataPath.NSPTMID; //Metai - 1
			nsptMin = dataPath.NSPTMIN; //Metai - 2                 
			//Kaupiamosios įmokos tarifas
			sukauptLes = dataPath.SUKAUPTA == "Nėra duomenų" ? "Nėra duomenų" : dataPath.SUKAUPTA + " Eur";
			kitMax = dataPath.KITMAX; // Metai
			kitMid = dataPath.KITMID; //Metai - 1
			kitMin = dataPath.KITMIN; //Metai - 2 
			kaupTar = kitMax === null ? "Nėra duomenų" : kitMax + " Eur/m²";
			//Techniniai prižiūrėtojai
			techPr = dataPath.NTPRIZ;
			sildPr = dataPath.NSPRIZ;
			liftPr = dataPath.LTPRIZ;


			var table = [adresas, nrPlane, bendrPlotas, patalpugsk, naudPlotas, patalpunks, adm, skl, sav, ntrun];
			var bnov = [valdForm, bnovAdr, bnovPask, bnovVadov, bnovTel, bnovVadyb, bnovVadybTel, bnovElP, bnovKodas, skundSk, skundPob];
			var atliekTarifai = [atliekMin, atliekMid, atliekMax];
			var liftuPriezTarifai = [ltptMin, ltptMid, ltptMax];
			var namoPriezTarifai = [ntptMin, ntptMid, ntptMax];
			var namoSildPriezTarifai = [nsptMin, nsptMid, nsptMax];
			//console.log("Pastato duomenys: " + table);

			function valdFormFunc() {
				switch (valdForm) {
					case 1:
						valdFormString = "Savivaldybės paskirtas administratorius";
						break;
					case 2:
						valdFormString = "Bendrija";
						break;
					case 3:
						valdFormString = "JVS";
						break;
					case 6:
						valdFormString = "Bendrija (statybos)";
						break;
					case 8:
						valdFormString = "Nenustatyta valdymo forma";
						break;
					case 9:
						valdFormString = "Neprižiūrimi pastatai";
						break;
					default:
						valdFormString = "Nėra duomenų";
				}
				return valdFormString;
			}

			var buildMsg = "<h3>" + adresas + "</h3>" + "<p>" + ntrunStr + "<br><span>Unikalus numeris</span></p>" + "<p>" + statM + "<br><span>Statybos metai</span></p>" + "<p>" + nrPlane + "<br><span>Korpusas</span></p>" + "<p>" + statPask + "<br><span>Namo paskirtis</span></p>" + "<p class='build-bt build-top'><a href='#build-info' class='animate'>Bendroji informacija</a></p><p class='build-bt'><a href='#build-manage' class='animate'>Valdytojų informacija</a></p><p class='build-bt'><a href='#build-temp' id='build-temp-bt' class='animate'>Šildymo duomenys / Renovacija</a></p><p class='build-bt'><a href='#build-maintenance' class='animate'>Namo priežiūros tarifai</a></p><p class='build-bt'><a href='#build-docs' class='animate'>Ataskaitos ir planai</a></p><p class='build-bt'><a href='#build-attachments' class='animate'>Priežiūros aktai</a></p><p class='build-bt'><a href='#build-statistics' class='animate'>Tarifų palyginimas</a></p><p class='build-bt'><a href='#build-help' class='animate'>Pagalba ir duomenų suvedimas</a></p><p class='build-bt'><a href='#build-imp-info' class='animate'>Svarbi informacija</a></p>";

			dom.byId("build-inner").innerHTML = buildMsg;

			var buildInfo = "<h3>" + adresas + "</h3>" + "<p>" + bendrPlotas + " m²<br><span>Bendras plotas</span></p>" + "<p>" + naudPlotas + " m²<br><span>Naudingasis plotas</span></p>" + "<p>" + patalpugsk + "<br><span>Gyvenamų patalpų skaičius</span></p>" + "<p>" + patalpunks + "<br><span>Negyvenamų patalpų skaičius</span></p>" + "<p>" + skl + "<br><span>Sklypo plotas arais</span></p>" + "<p>" + sav + "<br><span>Namui priskirto žemės sklypo patalpų savivinkų teisės</span></p>";

			dom.byId("build-inner-i").innerHTML = buildInfo;

			var buildManager = "<h3>" + adresas + "<br></h3>" + "<p>" + valdFormString + " <br><span>Valdymo forma</span></p>" + "<p>" + administr + " <br><span>" + (valdFormString == "JVS" ? "Jungtinės veiklos sutartimi valdomas namas" : "<span class='bnov'>BNOV administratorius</span>") + "<br><span class='bnov'>BNOV (Bendrojo naudojimo objektų valdytojas)</span></span></p>" + "<p>" + galiojMetai + " <br><span>administratoriaus paskyrimo terminas</span></p>" + "<p>" + bnovAdr + "<br><span><span class='bnov'>BNOV</span> adresas</span></p>" + bnovPaskMsg + "<p>" + bnovVadov + "<br><span><span class='bnov'>BNOV</span> vadovas</span></p>" + "<p>" + bnovTel + "<br><span><span class='bnov'>BNOV</span> vadovo telefonas</span></p>" + vadovVisi + "<p>" + bnovVadyb + "<br><span>Namo priežiūros vadybininkas:</span></p>" + "<p style='display:none;'>" + bnovVadybTel + "<br><span>Namo priežiūros vadybininko telefonas</span></p>" + "<p>" + skundSk + "<br><span><span class='bnov'>BNOV</span> gaunamų skundų skaičius</span></p>" + "<p>" + skundPob + "<br><span><span class='bnov'>BNOV</span> gaunamų skundų pobūdis</span></p>" + "<p>" + bnovKodas + " <br><span><span class='bnov'>BNOV</span> kodas</span></p>" + "<p><a href='mailto:" + bnovElP + "' class='email'>" + bnovElP + "</a><br><span><span class='bnov'>BNOV</span> el. paštas</span></p>" + "<span><p class='info-highlight'><i class='fa fa-exclamation' style='color: #C1272D;'></i>Informacija apie <a href='http://www.vilnius.lt/index.php?4265980094' class='email' target='_blank'>bendrijų steigimą</a></p></span>";

			dom.byId("build-inner-mng").innerHTML = buildManager;

			var buildTemp = "<h3>" + adresas + "<br></h3>" + "<p>" + energE + "<br><span>Namo energetinis efektyvumas</span></p>" + "<p>" + renov + "<br><span>Renovacijos metai</span></p>" + "<p>" + renovApr + "<br><span>Kas renovuota</span></p>";

			dom.byId("build-inner-t-msg").innerHTML = buildTemp;

			var buildMaintenance = "<h3>" + adresas + "</h3>" + "<p>" + techPr + "<br><span>Namo techninis prižiūrėtojas</span></p>" + "<p>" + sildPr + "<br><span>Namo šildymo sistemos techinis prižiūrėtojas</span></p>" + "<p>" + liftPr + "<br><span>Lifto techninis prižiūrėtojas</span></p>" + "<p>" + (typeof (adm) == "number" ? adm + " Eur/m²" : adm) + "<br><span>Administracinis tarifas</span></p>" + "<p>" + kaupTar + "<br><span>Kaupiamosios įmokos tarifas</span></p>" + "<p>" + sukauptLes + "<br><span>Sukauptos lėšos</span></p>";

			dom.byId("build-inner-m-msg").innerHTML = buildMaintenance;

			var buildCompare = "<h3>" + adresas + "</h3>" + "<h4>Dviejų pastatų palyginimas:</h4>" +
				"<div id='compare-btn-block'><span id='start-compare' class='compare'><p>Norėdami  palyginti du skirtingu pastatus, spūstelkite žemiau esantį mygtuką ir palyginimui žemėlapyje pažymėkite naują pastatą .</p><div id='compare-btn' class='bt animate'><a class='button'><i class='fa fa-angle-left' aria-hidden='true'></i>Pasirinkite kitą pastatą palyginimui</a></div>" + "<h4 class='border-top'>Sužinokite skirtingų administratorių tarifų vidurkius:</h4>" + "<div id='selection-list'></div></span><div id='build-inner-stat-table'></div></div><div id='bar-legend'></div><canvas id='myBarChart' width='433' height='833'></canvas>" + "<div id='bar-tips'></div>";

			dom.byId("build-inner-stat").innerHTML = buildCompare;

			//compare different administrators
			//AG last year total consumption
			//AG last year total consumption
			var totalLastYear; //current buildings' consumption
			var totalLastYearCompared; //compared buildgins' consumption
			var statusCompare = false; // true if using Comparing mode
			//special tooltips for cursors
			function compareTooltip() {
				var tooltipC;

				on(map, "mouse-move", function (evt) {
					if (statusCompare) { //check status
						//destroy widget on every move
						if (typeof (tooltipC) != "undefined") {
							tooltipC.destroy();
						}

						tooltipC = new TooltipDialog({
							id: 'myTooltipDialogCompare',
							style: "width: 160px;",
							content: "<p>Pažymėkite kitą pastatą palyginimui</p>",
							onMouseEnter: function () {
								dijitPopup.close(tooltipC);
							}
						});

						tooltipC.startup();
						dijitPopup.open({
							popup: tooltipC,
							x: evt.pageX + 10, //AG add padding for mouse hovering and click events
							y: evt.pageY + 10
						});
					}
				});
				on(map, "mouse-out", function () {
					if (typeof (tooltipC) != "undefined") {
						tooltipC.destroy();
					}
				});



			}

			function compareAdm() {
				//create close button on Map immediately
				var div =  document.createElement('div');				
				var p = document.createElement('p');
				var mapDom = dom.byId("map");
				div.setAttribute('id', 'stats-close-button');
				div.setAttribute('class', 'animate');
				div.appendChild(p).innerHTML = "Baigti palyginimą"
				mapDom.appendChild(div);
				domClass.add("map", "start-compare-hide");
				
				//hide graphic if exists
				//TEMP hide chart
				//if (typeof myBar != "undefined") {
				domClass.add("myBarChart", "hide");
				domClass.remove("myBarChart", "show");
				//}		
				domClass.add("bar-legend", "hide");
				domClass.remove("bar-legend", "show");

				statusCompare = true; // set compare status mode true

				window.location.hash = '#close'; //remove panel

				//remove comapre btn, add exit btn
				domClass.add("start-compare", "hide");
				domClass.remove("start-compare", "show");

				domClass.add("bar-tips", "hide");
				domClass.remove("bar-tips", "show");

				tooltipCompare = compareTooltip(); //asign tooltip to tooltipCompare var

				//disable firts buildings featureLayer mouse events
				featureBuildings.disableMouseEvents();
				//alert("S"); 
				var layerBuildignsCompare = new FeatureLayer(featBuildingsUrl, {
					id: "buildings-compare",
					mode: FeatureLayer.MODE_ONDEMAND,
					outFields: ["*"]
				});

				// selection symbol used to draw the selected census block points within the buffer polygon
				var symbol = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID, new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([88, 23, 179, 1]), 3), new Color([129, 183, 206, 0]));

				layerBuildignsCompare.setSelectionSymbol(symbol);

				//feature layer symbol invisible
				var symbolBuild = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID, new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([78, 78, 78, 0]), 1), new Color([195, 219, 159, 0]));

				layerBuildignsCompare.setRenderer(new SimpleRenderer(symbolBuild));

				map.addLayer(layerBuildignsCompare);
				
				//get back from comparign block to main block and remove compared layer
				var statsCloseBtn = dom.byId("stats-close");
				var statsCloseBtnOnMap = dom.byId("stats-close-button");
				statsCloseBtn.addEventListener("click", function () {
					statusCompare = false; //set compare status mode true				
					//close compare functionality and remove compared feature layers
					closeCompareAdm(featureBuildings, layerBuildignsCompare);

				}, false);				
				statsCloseBtnOnMap.addEventListener("click", function () {
					statusCompare = false; //set compare status mode true					
					//close compare functionality and remove compared feature layers
					closeCompareAdm(featureBuildings, layerBuildignsCompare);

				}, false);				


				//QueryTask for comparing: namo bendrieji tarifai
				var buildingAdministrationTaskCompare = new QueryTask("https://zemelapiai.vplanas.lt/arcgis/rest/services/Interaktyvus_zemelapis/Pastatu_administravimas/MapServer/1");
				var buildingAdministrationCompare = new Query();
				buildingAdministrationCompare.outSpatialReference = {
					wkid: 3346
				};
				buildingAdministrationCompare.returnGeometry = false;
				buildingAdministrationCompare.outFields = ["*"];

				//show cursor on feature layer
				showCursor([layerBuildignsCompare], arrayUtils);

				function runQueryCompare(e) {
					//console.log("POINT");
					//console.log(e);

					window.location.hash = '#close'; //remove panel

					var zoomLevel = map.getMaxZoom() - 1;
					map.centerAndZoom(e.mapPoint, zoomLevel); //AG center & zoom

					buildingAdministrationCompare.geometry = e.mapPoint;
					buildingAdministrationTaskCompare.execute(buildingAdministrationCompare, showDataCompare);
					//run everytime new selection
					layerBuildignsCompare.selectFeatures(buildingAdministrationCompare, layerBuildignsCompare.SELECTION_NEW);

					//Deactivate tool #2nd /change it
					toolsMeasure.deactivate();
				}

				on(layerBuildignsCompare, "click", runQueryCompare);

				function showDataCompare(results) {
					var dataPath = results.features[0].attributes;

					//AG filter null/undefined properties and change object properties
					for (var prop in dataPath) {

						//AG check the prop is property of the dataPath object
						if (dataPath.hasOwnProperty(prop)) {

							//console.log(dataPath[prop]);
							var pName = prop;
							//if attribute property doesn't exist add  string value
							if (!dataPath[prop]) {
								dataPath[prop] = "Nėra duomenų";
								dataFiltered = dataPath;
							}
						}
					}

					var adresasC, administrC, bendrPlotasC,
						atliekMaxC, ntptMaxC,
						nsptMaxC,
						ntrunC, admC;

					//Bendroji informacija
					ntrunC = dataPath.NTRUNKNR; //unikalus id 
					adresasC = dataPath.ADRESAS;
					admC = dataPath.ADMTARIF;
					bendrPlotasC = dataPath.BENDR_PLOT;
					//Valdytojai BNOV
					administrC = dataPath.ADMINISTR; //valdytojas  
					//Renovacija           
					//Kaina už atliekas
					atliekMaxC = dataPath.ATLKMAX; // Metai
					//Namo techninės priežiūros tarifas
					ntptMaxC = dataPath.NTPTMAX; // Metai
					//Namo šildymo sistemų tarifas
					nsptMaxC = dataPath.NSPTMAX; // Metai
					totalLastYear = typeof totalLastYear === "undefined" ? totalLastYear = "Nėra duomenų" : totalLastYear;

					var process = setQuery(ntrunC); //set Query for compared building
					//console.log(ntrunC);
					process.then(function (t) {
						var buildCompareAdministrators =
							"<div id='build-inner-stat-adm' class='section group animate'> <div class='colu span_1_of_3'><p ></p></div>" +
							"<div class='colu span_1_of_3 first-build'> <p><span>JŪSŲ PASTATAS</span></p></div> <div class='colu span_1_of_3 second-build'> <p><span>PASTATAS PALYGINIMUI</span></p></div>" +
							"<div class='colu span_1_of_3'><p class='normalf'>Adresas: </p></div> <div class='colu span_1_of_3' style='background: #F7F7F7;'><p>" + adresas +
							"</p></div><div class='colu span_1_of_3' style='background: #F7F7F7;'> <p>" +
							adresasC +
							"</p></div>" +
							"<div class='colu span_1_of_3'><p class='normalf'>Žymėjimas: </p></div> <div class='colu span_1_of_3' style='background: #F7F7F7;'><p>" + "<span class='box first'></span>" +
							"</p> </div> <div class='colu span_1_of_3' style='background: #F7F7F7;'> <p>" +
							"<span class='box second'></span>" +
							"</p></div>" +
							"<div class='colu span_1_of_3'><p class='normalf'>Valdytojas: </p></div> <div class='colu span_1_of_3 vald' style='background: #F7F7F7;'><p>" + administr +
							"</p> </div> <div class='colu span_1_of_3 vald' style='background: #F7F7F7;'> <p>" +
							administrC +
							"</p></div>" +
							"<div class='colu span_1_of_3'><p class='normalf'>Bendras plotas <br><b> (m²)</b>: </p> </div> <div class='colu span_1_of_3' style='background: #F7F7F7;'><p>" +
							bendrPlotas +
							"</p> </div> <div class='colu span_1_of_3' style='background: #F7F7F7;'> <p>" +
							bendrPlotasC +
							"</p></div>" +
							"<div class='colu span_1_of_3'> <p class='normalf'>Administracinis tarifas <br><b> (Eur/m²)</b>:</p> </div> <div class='colu span_1_of_3' style='background: #F7F7F7;'> <p>" +
							adm + "</p> </div> <div class='colu span_1_of_3' style='background: #F7F7F7;'> <p>" +
							admC +
							"</p></div>" +
							"<div class='colu span_1_of_3'> <p class='normalf'>Atliekų tarifas <b> (Eur/m²)</b>:</p> </div> <div class='colu span_1_of_3' style='background: #F7F7F7;'> <p>" +
							(atliekMax === null ? "Nėra duomenų" : atliekMax) + "</p> </div>" +
							"<div class='colu span_1_of_3' style='background: #F7F7F7;'> <p>" +
							atliekMaxC +
							"</p> </div> <div class='colu span_1_of_3'> <p class='normalf'>Techninės priežiūros tarifas <b> (Eur/m²)</b>:</p></div>" +
							"<div class='colu span_1_of_3' style='background: #F7F7F7;'><p>" + (ntptMax === null ? "Nėra duomenų" : ntptMax) + "</p> </div> <div class='colu span_1_of_3' style='background: #F7F7F7;'> <p>" +
							ntptMaxC +
							"</p></div> <div class='colu span_1_of_3'> <p class='normalf'>Šildymo sistemų priežiūros tarifas <b> (Eur/m²)</b>: </p> </div>" +
							"<div class='colu span_1_of_3' style='background: #F7F7F7;'><p>" + (nsptMax === null ? "Nėra duomenų" : nsptMax) + "</p> </div> <div class='colu span_1_of_3' style='background: #F7F7F7;'> <p>" +
							nsptMaxC +
							"</p></div>" +
							"<div class='colu span_1_of_3'> <p class='normalf'>Šildymo s. vidutinė mėn. šildymo kaina <b> (Eur/m²)</b>: </p> </div> <div class='colu span_1_of_3' style='background: #F7F7F7;'> <p>" +
							totalLastYear + "</p> </div> <div class='colu span_1_of_3' style='background: #F7F7F7;'> <p>" +
							t +
							"</p></div>";

						//console.log("PR:");
						console.log(buildCompareAdministrators);
						//console.log(t);

						dom.byId("build-inner-stat-table").innerHTML = buildCompareAdministrators;
						window.location.hash = '#build-statistics'; //show statistcs block								
					});
				}
			}
			
			//close buildings compare funcionality and remove compared feature layers
			function closeCompareAdm(featureBuildings, layerBuildignsCompare) {
				//destroy comapare button on map
				domConstruct.destroy("stats-close-button");
				
				domClass.remove("map", "start-compare-hide");
				
				//TEMP show bar graphic if exists
				//if (typeof myBar != "undefined") {
				domClass.add("myBarChart", "show");
				domClass.remove("myBarChart", "hide");
				//}	

				domClass.remove("start-compare", "hide");
				domClass.add("start-compare", "show");

				domClass.remove("bar-legend", "hide");
				domClass.add("bar-legend", "show");

				domClass.remove("bar-tips", "hide");
				domClass.add("bar-tips", "show");

				//domConstruct.destroy("tooltip-span"); // AG destroy tooltip
				window.location.hash = '#build-statistics'; //AG get back

				//map.removeLayer(layerBuildignsCompare);
				//layerBuildignsCompare = {}; //AG BUG fix, beacause removeLayer doesn't completely remove layer from map (layer is still accesible with getLayer(layerid) method)

				dom.byId("build-inner-stat-table").innerHTML = ""; //when closing block remove compare table
				featureBuildings.enableMouseEvents(); //enable first buildings featureLayer mouse events
				
				//console.log(map);
				
				//remove layer
				var tempBuildCompareLayer = map.getLayer("buildings-compare");
				if (tempBuildCompareLayer) {
					map.removeLayer(tempBuildCompareLayer);
					tempBuildCompareLayer = {};
				}							
			}
			
			var compareBtn = dom.byId("compare-btn");
			compareBtn.addEventListener("click", compareAdm, false);

			//End compare different administrators


			//checking valid url for documents
			//AG TODO sukurti dokumentu einamuju metu atributo irasa, kiekviena kart ikeliant dokumentus i serveri
			var urlStack = {
				ilgalaikisPlanas: "https://zemelapiai.vplanas.lt/Statiniai/Adm_Stat/" + (parseInt(einMetai, 10) - 1) + "/IP_" + ntrun + ".pdf",
				ukinisPlanas: "https://zemelapiai.vplanas.lt/Statiniai/Adm_Stat/" + (parseInt(einMetai, 10) - 1) + "/P_" + ntrun + ".pdf",
				metineVeiklosAtaskaita: "https://zemelapiai.vplanas.lt/Statiniai/Adm_Stat/" + (parseInt(einMetai, 10) - 1) + "/AT_" + ntrun + ".pdf"
			};

			//AG checking for broken docs URL 
			var urlStackStatus = {};
			//TEST TEMP
			var urlStackStatusTemp = 0;
			var StackStatusTemp = 0;
			// End TEST TEMP
			var urlDocsMessage = {
				messagePlanas: "",
				messageUPlanas: "",
				messageAtaskaita: ""
			};

			function checkUrlDocs(url, docName) {
				var request = new XMLHttpRequest();
				request.open("HEAD", url, true);
				request.send();
				request.onreadystatechange = function () {
					if (request.readyState === 4) {
						if (request.status === 404) {
							//console.log("BROKEN URL 404 STATUS + STATUS: " + request.status);
							//console.log("BROKEN URL 404 STATUS + URL: " + url);
							StackStatusTemp += 1;
							//console.log(StackStatusTemp);
							//invoke docNameCheckOnError
							docNameCheckOnError(docName, url);
							return false;
						} else {
							//console.log("URL STATUS + STATUS: " + request.status);
							//console.log("URL STATUS + URL : " + url);
							urlStackStatusTemp += 1;
							//console.log(urlStackStatusTemp);
							//invoke docNameCheck
							docNameCheck(docName, url);
							return true;
						}
					}
				};
			}
			// AG check documents name and add to dom            
			function docNameCheck(name, urlPath) {
				var p = document.createElement('p');
				var domElement = document.getElementById("build-inner-d");
				switch (name) {
					case "ilgalaikisPlanas":
						urlDocsMessage.messagePlanas = "<i class='fa fa-file-pdf-o'></i> <a href='" + urlPath + "' target='_blank'>Ilgalaikis planas</a>";
						p.innerHTML = urlDocsMessage.messagePlanas;
						domElement.appendChild(p);
						break;
					case "ukinisPlanas":
						urlDocsMessage.messageUPlanas = "<i class='fa fa-file-pdf-o'></i> <a href='" + urlPath + "' target='_blank'>Ūkinis planas</a>";
						p.innerHTML = urlDocsMessage.messageUPlanas;
						domElement.appendChild(p);
						break;
					case "metineVeiklosAtaskaita":
						urlDocsMessage.messageAtaskaita = "<i class='fa fa-file-pdf-o'></i> <a href='" + urlPath + "' target='_blank'>" + einMetai + " m. metinė veiklos ataskaita</a>";
						p.innerHTML = urlDocsMessage.messageAtaskaita;
						domElement.appendChild(p);
						break;
				}
			}

			function docNameCheckOnError(name, urlPath) {
				var p = document.createElement('p');
				var domElement = document.getElementById("build-inner-d");
				switch (name) {
					case "ilgalaikisPlanas":
						urlDocsMessage.messagePlanas = "<i class='fa fa-exclamation'></i>Nėra ilgalaikio plano duomenų";
						p.innerHTML = urlDocsMessage.messagePlanas;
						domElement.appendChild(p);
						break;
					case "ukinisPlanas":
						urlDocsMessage.messageUPlanas = "<i class='fa fa-exclamation'></i>Nėra ūkinio plano duomenų";
						p.innerHTML = urlDocsMessage.messageUPlanas;
						domElement.appendChild(p);
						break;
					case "metineVeiklosAtaskaita":
						urlDocsMessage.messageAtaskaita = "<i class='fa fa-exclamation'></i>Nėra metinės veiklos ataskaitos duomenų";
						p.innerHTML = urlDocsMessage.messageAtaskaita;
						domElement.appendChild(p);
						break;
				}
			}

			for (var docUrlName in urlStack) {
				if (urlStack.hasOwnProperty(docUrlName)) {
					checkUrlDocs(urlStack[docUrlName], docUrlName);
				}
			}

			//Get attachments
			window.attachmentsObj = {}; //store attachments functions to save files with file.js // TOTO eliminate global object
			var attachmentsHtml = "";
			var attachmentTask = new QueryTask("https://zemelapiai.vplanas.lt/arcgis/rest/services/Interaktyvus_zemelapis/Pastatu_administravimas/MapServer/5");
			var attachmentQuery = new Query();
			attachmentQuery.outSpatialReference = {
				wkid: 3346
			};
			//base64 string
			//attachmentQuery.where = "fld_unikalus_nr1= '" + ntrun + "' OR att_title= '" + "2016-02-29 Žadeikos g. 10.pdf" + "' ";
			//base64 blob
			attachmentQuery.where = "fld_unikalus_nr1= '" + ntrun + "' OR fld_unikalus_nr2= '" + ntrun + "' OR fld_unikalus_nr3= '" + ntrun + "'";
			attachmentQuery.returnGeometry = false;
			attachmentQuery.outFields = ["*"];
			attachmentTask.execute(attachmentQuery, showAttachments);

			function showAttachments(results) {
				//get features array
				var features = results.features,
					i = 0;
				if (features.length > 0) {
					for (i; i < features.length; i += 1) {
						var name = "";
						name += i;

						//Add attachment anchor with  unique onclick function
						attachmentsHtml += "<p><span class='anchor-tag' href='' onclick='attachmentsObj[" + i + "](" + i + ")'>" + features[i].attributes.att_title + "</span></p>";

						attachmentsObj[name] = function (i) {
							//base 64 string
							var blobType = features[i].attributes.att_contentType;
							var byteCharacters = atob(features[i].attributes.att_encodedContent);
							var fileName = "Aktas: " + features[i].attributes.att_title;
							var byteNumbers = new Array(byteCharacters.length);

							for (var n = 0; n < byteCharacters.length; n++) {
								byteNumbers[n] = byteCharacters.charCodeAt(n);
							}
							var byteArray = new Uint8Array(byteNumbers);

							// construct the blob from from byte array
							var blob = new Blob([byteArray], {
								type: blobType
							});

							saveAs(blob, fileName);
						}

					}
				}

				//var buildAtt = "<h3>" + adresas + "<br></h3>" + "<p>Atsisiųskite priežiūros aktus: </p>" + attachmentsHtml;

				//console.log(typeof(attachmentsHtml));
				var buildAtt = "<h3>" + adresas + "<br></h3>" + (attachmentsHtml === '' ? "<p>Priežiūros aktų nėra</p>" : "<p>Atsisiųskite priežiūros aktus: </p>" + attachmentsHtml);

				dom.byId("build-inner-att").innerHTML = buildAtt;
			}
			//EDN Get attachments 

			var buildDocs = "<h3>" + adresas + "<br></h3>";

			dom.byId("build-inner-d").innerHTML = buildDocs;


			var buildHelp = "<h3>" + adresas + "<br></h3>" + "<p>Turite pasiūlymų ar pastabų? Matote klaidų?</p> <p>Susisiekite el. paštu: <a href='mailto:pastatai@vilnius.lt'>pastatai@vilnius.lt</a></p><p>Norėdami pateikti duomenys apie konkretų pastatą, kviečiame užpildyti <a href='https://zemelapiai.vplanas.lt/Statiniai/Adm_Stat/lentele.xlsx'>duomenų suvedimo lentelę</a> ir persiųsti aukščiau nurodytu el. pašto adresu.</p><p>Informacija apie <a href='http://www.vilnius.lt/index.php?4265980094' target='_blank'>bendrijų steigimą</a></p>";

			dom.byId("build-inner-h").innerHTML = buildHelp;

			var buildImpInfo = "<h3>" + adresas + "<br></h3>" + "<p><a href='http://www.vilnius.lt/index.php?4265980094' target='_blank'> Bendrijų steigimas </a></p><p><a href='http://www.vilnius.lt/index.php?1568645331' target='_blank'>Jungtinės veiklos sutarties sudarymas</a></p><p><a href='http://www.vilnius.lt/index.php?4278773191' target='_blank'>Administratoriaus keitimas</a></p>";

			dom.byId("build-inner-imp-i").innerHTML = buildImpInfo;
			
			
			//calculate chart datasets data, add data if only one attribtue exists
			function caclculateDatasets() {
				var dataset = [];
				if ((atliekTarifai.reduce(function(a, b){ return a + b })) > 0) {
					var dataObj = {
						label: "Atliekų tarifai",
						fillColor: "rgba(84,59,13, 0.4)",
						strokeColor: "rgba(212,203,188,1)",
						pointColor: "rgba(212,203,188,1)",
						pointStrokeColor: "#fff",
						pointHighlightFill: "#fff",
						pointHighlightStroke: "rgba(212,203,188,1)",
						data: atliekTarifai
					};
					dataset.push(dataObj)
				}
				if ((liftuPriezTarifai.reduce(function(a, b){ return a + b })) > 0) {
					var dataObj = {
						label: "Lifto techninės priežiūros tarifai Eur/m²",
						fillColor: "rgba(151, 187, 205, 1)",
						strokeColor: "rgba(151, 187, 205, 1)",
						pointColor: "rgba(151, 187, 205, 1)",
						pointStrokeColor: "#fff",
						pointHighlightFill: "#fff",
						pointHighlightStroke: "rgba(151,187,205,1)",
						data: liftuPriezTarifai
					};
					dataset.push(dataObj)
				}
				if ((namoPriezTarifai.reduce(function(a, b){ return a + b })) > 0) {
					var dataObj = {
						label: "Namo techninės priežiūros tarifai Eur/m²",
						fillColor: "rgba(154, 195, 146, 1)",
						strokeColor: "rgba(154, 195, 146, 1)",
						pointColor: "rgba(154, 195, 146, 1)",
						pointStrokeColor: "#fff",
						pointHighlightFill: "#fff",
						pointHighlightStroke: "rgba(220, 220, 220, 1)",
						data: namoPriezTarifai
					};
					dataset.push(dataObj)
				}
				if ((namoSildPriezTarifai.reduce(function(a, b){ return a + b })) > 0) {
					var dataObj = {
						label: "Namo šildymo sistemų priežiūros tarifai Eur/m²",
						fillColor: "rgba(222, 135, 71, 1)",
						strokeColor: "rgba(222, 135, 71, 1)",
						pointColor: "rgba(222, 135, 71, 1)",
						pointStrokeColor: "#fff",
						pointHighlightFill: "#fff",
						pointHighlightStroke: "rgba(222, 135, 71, 1)",
						data: namoSildPriezTarifai
					};
					dataset.push(dataObj)
				}
				return dataset;
			}

			//check if tarfofs arrays properties are null / tariffs has nor value
			function checkTariffs(arr) {
				var i = 0,
					length = arr.length,
					nullCount = 0; //tariffs are shown for only last 3 years, if array is empty
				for (i; i < length; i += 1) {
					if ((!arr[i]) || (typeof (arr) === "undefined")) {
						nullCount += 1;
					} else {
						return true; //if at least 1 array element is not empty return true 				
					}
				}
			}

			if (!checkTariffs(atliekTarifai) && !checkTariffs(liftuPriezTarifai) && !checkTariffs(namoPriezTarifai) && !checkTariffs(namoSildPriezTarifai)) {
				var divLegendTip = document.getElementById("chart-legend");
				divLegendTip.innerHTML = "<p>Nėra duomenų apie priežiūros tarifus</p>";
			} else {
				//Charts
				var lineChartData = {
					labels: [einMetai - 2 + " metai", einMetai - 1 + " metai", einMetai + " metai"],
					datasets: caclculateDatasets()

				};

				var chartOptions = {

					///Boolean - Whether grid lines are shown across the chart
					scaleShowGridLines: true,

					//Boolean - Whether to show labels on the scale
					scaleShowLabels: true,

					//String - Colour of the grid lines
					scaleGridLineColor: "rgba(0,0,0,.05)",

					//Number - Width of the grid lines
					scaleGridLineWidth: 1,

					//Boolean - Whether to show horizontal lines (except X axis)
					scaleShowHorizontalLines: true,

					//Boolean - Whether to show vertical lines (except Y axis)
					scaleShowVerticalLines: true,

					//Boolean - Whether the line is curved between points
					bezierCurve: true,

					//Number - Tension of the bezier curve between points
					bezierCurveTension: 0.4,

					//Boolean - Whether to show a dot for each point
					pointDot: true,

					//Number - Radius of each point dot in pixels
					pointDotRadius: 6,

					//Number - Pixel width of point dot stroke
					pointDotStrokeWidth: 1,

					//Number - amount extra to add to the radius to cater for hit detection outside the drawn point
					pointHitDetectionRadius: 20,

					//Boolean - Whether to show a stroke for datasets
					datasetStroke: true,

					//Number - Pixel width of dataset stroke
					datasetStrokeWidth: 2,

					//Boolean - Whether to fill the dataset with a colour
					datasetFill: false,

					tooltipCornerRadius: 2,

					multiTooltipTemplate: "<%= value %> Eur/m² ", //"<%= datasetLabel %> - <%= value %>",

					//String - A legend template
					legendTemplate: "<div class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i += 1){%><p><span style=\"background-color:<%=datasets[i].fillColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></p><%}%></div>" + ( admChangeYear != "Nėra duomenų" ? "<span><p><strong>" + ((new Date(admChangeYear)).getFullYear()) + " m.</strong> paskirtas naujas administratorius - <strong>" +  administr + "</strong> (buvęs administratorius - " + administrLast + ")</p></span>" : "")

				};

				var ctx = document.getElementById("myChart").getContext("2d");
				window.myLine = new Chart(ctx).Line(lineChartData, chartOptions, {
					responsive: false
				});

				var chartLegend = myLine.generateLegend();
				dom.byId("chart-legend").innerHTML = "<p><b>TARIFŲ GRAFIKAS:</b></p>" + chartLegend;
				//End Charts
			}

			//Charts Heating / TEMP
			setQuery(ntrun); //set Query for current building
			//Query vp_sde.INFRASTR.SIL_SEZON layer
			function setQuery(uniqueKey) {
				var promise = new Deferred();
				queryHeating.where = "NTRUNKNR = '" + uniqueKey + "'";
				queryHeating.returnGeometry = false;
				queryHeating.outFields = ["*"];
				var heatingTotal = queryTaskHeating.execute(queryHeating);
				heatingTotal.then(function (b) {
					var a = heatingResults(b);
					a.then(function (c) {
						//alert(c);
						return promise.resolve(c);
					});

				});

				return promise.promise;
			}


			var heatingStatusOn;

			function heatingResults(results) {
				var promise = new Deferred();
				var totalLastYearCompared = null;

				setTimeout(function () {

					var runHeatGraph;

					//Last 3 years data
					if (typeof results.features[0] === "undefined") {
						heatingStatusOn = false;
						totalLastYearCompared = "Nėra duomenų";
						promise.resolve(totalLastYearCompared);
					} else {
						heatingStatusOn = true;

						var lastYearHeating = results.features[0].attributes.METAIMAX;
						var sezonHeating = results.features,
							metaiMax = lastYearHeating,
							metaiMed = lastYearHeating - 1,
							metaiLast = lastYearHeating - 2,
							yearArr = [],
							heatingGraphData = {};

						heatingGraphData.einamiejiMetai = lastYearHeating;

						var silumosKaina,
							spalKiek, lapkKiek, gruodKiek, sausKiek, vasarKiek, kovasKiek, balKiek;

						for (var i = 0, length = sezonHeating.length; i < length; i += 1) {
							var metaiH = results.features[i].attributes.SEZONAS;
							if ((metaiH === metaiMax) || (metaiH === metaiMed) || (metaiH === metaiLast)) {
								yearArr.push(metaiH);

								//Šilumos kainos EUR/m² informacija
								spalKiek = results.features[i].attributes.SPAL_K;
								lapkKiek = results.features[i].attributes.LAPKR_K;
								gruodKiek = results.features[i].attributes.GRUOD_K;
								sausKiek = results.features[i].attributes.SAUS_K;
								vasarKiek = results.features[i].attributes.VASAR_K;
								kovasKiek = results.features[i].attributes.KOVAS_K;
								balKiek = results.features[i].attributes.BALAN_K;

								switch (metaiH) {
									case metaiMax:
										heatingGraphData.paskutiniaiMetai = [spalKiek, lapkKiek, gruodKiek, sausKiek, vasarKiek, kovasKiek, balKiek];
										break;
									case metaiMed:
										heatingGraphData.viduriniaiMetai = [spalKiek, lapkKiek, gruodKiek, sausKiek, vasarKiek, kovasKiek, balKiek];
										break;
									case metaiLast:
										heatingGraphData.galiniaiMetai = [spalKiek, lapkKiek, gruodKiek, sausKiek, vasarKiek, kovasKiek, balKiek];
										break;
								}

							}
						}

						var duomenysSilumosGrafikui = [heatingGraphData.paskutiniaiMetai, heatingGraphData.viduriniaiMetai, heatingGraphData.galiniaiMetai, heatingGraphData.einamiejiMetai];

						runHeatGraph = function (priceArray) {
							heatingGraph.apply(null, priceArray);
							//alert(priceArray);
						};
						
						setTimeout(function () {
							//AG check if heating data is defined, otherwise set heatingStatusOn to false and eliminate chart rendering
							if ((typeof (heatingGraphData.paskutiniaiMetai) != "undefined") & (typeof (heatingGraphData.viduriniaiMetai) != "undefined") & (typeof (heatingGraphData.galiniaiMetai) != "undefined")) {
								runHeatGraph(duomenysSilumosGrafikui);
							}
						}, 50);

						//AG last year total consumption, devided from 7 months
						//alert(statusCompare);
						if (statusCompare) {

							heatingGraphData.paskutiniaiMetai = typeof heatingGraphData.paskutiniaiMetai === "undefined" ? totalLastYearCompared = "Nėra duomenų" : totalLastYearCompared = (heatingGraphData.paskutiniaiMetai.reduce(function (a, b) {
								return a + b;
							}) / 7).toFixed(3);
						} else {
							if (typeof heatingGraphData.paskutiniaiMetai !== 'undefined') {
								totalLastYear = heatingGraphData.paskutiniaiMetai.reduce(function (a, b) {
									return a + b;
								});
								totalLastYear = (totalLastYear / 7).toFixed(3);
							}

						}
						promise.resolve(totalLastYearCompared);
					}

				}, 50);
				return promise.promise;

			}

			if (!heatingStatusOn) {
				//console.log("No Heat DATA");
				var divLegendTipHeating = document.getElementById("chart-legend-heating");
				divLegendTipHeating.innerHTML = "<p>Nėra duomenų apie šilumos tarifus</p>";
			}

			//END Query vp_sde.INFRASTR.SIL_SEZON layer
			function heatingGraph(pask, vid, gal, paskM) {
				var heatArr = [pask, vid, gal];
				//console.log("Grazintos kainos: " + heatArr);

				var mPr = paskM + 1,
					mVid = paskM,
					mGal = paskM - 1;

				var lineChartData = {
					labels: ["Spalis", "Lapkritis", "Gruodis", "Sausis", "Vasaris", "Kovas", "Balandis"],
					datasets: [
						{
							label: mVid + "-" + mPr + " m. vidutinė šildymo kaina  EUR/m²",
							fillColor: "rgba(151, 187, 205, 0.6)",
							strokeColor: "rgba(151, 187, 205, 1)",
							pointColor: "rgba(151, 187, 205, 1)",
							pointStrokeColor: "#fff",
							pointHighlightFill: "#fff",
							pointHighlightStroke: "rgba(151,187,205,1)",
							data: pask
	                        },
						{
							label: mGal + "-" + mVid + " m. vidutinė šildymo kaina EUR/m²",
							fillColor: "rgba(154, 195, 146, 0.6)",
							strokeColor: "rgba(154, 195, 146, 1)",
							pointColor: "rgba(154, 195, 146, 1)",
							pointStrokeColor: "#fff",
							pointHighlightFill: "#fff",
							pointHighlightStroke: "rgba(220, 220, 220, 1)",
							data: vid
	                        },
						{
							label: (mGal - 1) + "-" + mGal + " m. vidutinė šildymo kaina EUR/m²",
							fillColor: "rgba(222, 135, 71, 0.6)",
							strokeColor: "rgba(222, 135, 71, 1)",
							pointColor: "rgba(222, 135, 71, 1)",
							pointStrokeColor: "#fff",
							pointHighlightFill: "#fff",
							pointHighlightStroke: "rgba(222, 135, 71, 1)",
							data: gal
	                        }
	                    ]

				};

				var chartOptions = {

					///Boolean - Whether grid lines are shown across the chart
					scaleShowGridLines: true,

					//Boolean - Whether to show labels on the scale
					scaleShowLabels: true,

					//String - Colour of the grid lines
					scaleGridLineColor: "rgba(0,0,0,.05)",

					//Number - Width of the grid lines
					scaleGridLineWidth: 1,

					//Boolean - Whether to show horizontal lines (except X axis)
					scaleShowHorizontalLines: true,

					//Boolean - Whether to show vertical lines (except Y axis)
					scaleShowVerticalLines: true,

					//Boolean - Whether the line is curved between points
					bezierCurve: true,

					//Number - Tension of the bezier curve between points
					bezierCurveTension: 0.4,

					//Boolean - Whether to show a dot for each point
					pointDot: true,

					//Number - Radius of each point dot in pixels
					pointDotRadius: 6,

					//Number - Pixel width of point dot stroke
					pointDotStrokeWidth: 1,

					//Number - amount extra to add to the radius to cater for hit detection outside the drawn point
					pointHitDetectionRadius: 20,

					//Boolean - Whether to show a stroke for datasets
					datasetStroke: true,

					//Number - Pixel width of dataset stroke
					datasetStrokeWidth: 2,

					//Boolean - Whether to fill the dataset with a colour
					datasetFill: false,

					tooltipCornerRadius: 2,

					multiTooltipTemplate: "<%= value %> Eur/m² ", //"<%= datasetLabel %> - <%= value %>",

					//String - A legend template
					legendTemplate: "<div class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i += 1){%><p><span style=\"background-color:<%=datasets[i].fillColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></p><%}%></div>"
				};
				//AG change to one common click executed first time only
				runGraphicCharts();

				function runGraphicCharts() {
					on(dojo.byId("build-temp-bt"), "click", function () {
						var ctxHeating = document.getElementById("myChart-heating").getContext("2d");
						window.myLineHeating = new Chart(ctxHeating).Line(lineChartData, chartOptions, {
							responsive: false
						});

						var chartLegend = myLineHeating.generateLegend();
						dom.byId("chart-legend-heating").innerHTML = "<p><b>ŠILUMOS GRAFIKAS:</b></p><p>Vidutinė mėnesinė šildymo kaina EUR/m²</p>" + chartLegend;
					});
				}
			}

			//End Charts
			setTimeout(function () {
				var selectAdm = dijit.byId("selection-list");
				selectAdm.on("change", function (newValue) {
					//AG run query and draw relative graphic, if value  = "none" - destroy graphic
					if (newValue !== "none") {
						administratorGraph.setQuery(newValue, administr); //start query and add Chart							
						domClass.add("bar-legend", "show");
						domClass.remove("bar-legend", "hide");
						domClass.add("bar-tips", "show");
						domClass.remove("bar-tips", "hide");
					} else {
						myBar.destroy();
						dom.byId("bar-legend").innerHTML = "";
						dom.byId("bar-tips").innerHTML = "";						
						domClass.add("bar-legend", "hide");
						domClass.remove("bar-legend", "show");
						domClass.add("bar-tips", "hide");
						domClass.remove("bar-tips", "show");
					}
				});
			}, 1000);
		}

		//show tooltip for building theme
		var tooltip;

		on(featureBuildings, "mouse-move", function (evt) {
			//destroy widget on every move
			if (typeof (tooltip) != "undefined") {
				tooltip.destroy();
			}

			tooltip = new TooltipDialog({
				id: 'myTooltipDialog',
				style: "width: 160px;",
				content: "<p>Pažymėkite pastatą</p>",
				onMouseEnter: function () {
					dijitPopup.close(tooltip);
				}
			});

			tooltip.startup();
			dijitPopup.open({
				popup: tooltip,
				padding: {
					x: 10,
					y: 10
				},
				x: evt.pageX, //AG add padding for mouse hovering and click events
				y: evt.pageY
			});
		});
		on(featureBuildings, "mouse-out", function () {
			tooltip.destroy();
		});
	});
};;var schoolsTheme = function (map, MAPCONFIG, toolsMeasure, showCursor, horizontalSlider, popup, geometryService) {
	
	require([
		"dojo/i18n!esri/nls/jsapi",
		"dijit/TooltipDialog",
		"dijit/popup",
		"esri/dijit/Search", "esri/tasks/locator", 
		"esri/symbols/PictureMarkerSymbol",
		"esri/layers/GraphicsLayer",
		"dojo/_base/connect",
		"esri/toolbars/navigation",
		"esri/config",
		"dojo/on",
		"dojo/query",
		"esri/layers/ArcGISTiledMapServiceLayer",
		"esri/layers/ArcGISDynamicMapServiceLayer",
		"esri/dijit/Legend",
		"dojo/_base/array",
		"dojo/parser", /* http://dojotoolkit.org/reference-guide/1.10/dojo/parser.html */
		"esri/dijit/Popup",
		"esri/dijit/PopupTemplate",
		"esri/InfoTemplate",
		"esri/layers/FeatureLayer",
		/*START Grid */
		"dojo/_base/declare",
		"dojo/promise/all", "dojo/Deferred",
		"dgrid/OnDemandGrid",
		"dgrid/Selection",
		"dijit/form/Select",
		"dojo/store/Memory",
		"dijit/form/CheckBox",
		"esri/tasks/query",
		"esri/tasks/QueryTask",
		"esri/symbols/SimpleMarkerSymbol",
		"esri/renderers/SimpleRenderer",
		"esri/renderers/UniqueValueRenderer",
		"esri/Color",
		/*END Grid */
		"esri/request",
		"dojo/dom",
		"dojo/dom-construct",
		"dojo/dom-class",
		"esri/symbols/SimpleFillSymbol",
		//TOC START
		"esri/renderers/ClassBreaksRenderer",
		//Measure
		"esri/dijit/Measurement", "esri/units",
		//TOC END
		"esri/dijit/Geocoder",
		"esri/symbols/SimpleLineSymbol", "esri/geometry/Extent",
		//cluster
		"app/clusterfeaturelayer", "esri/graphic", "esri/graphicsUtils", "dojo/dom-style", "dojo/_base/fx", "dojo/fx/easing",
		"dijit/registry",
		"esri/dijit/Scalebar",
		"esri/layers/LayerInfo",
		"dijit/layout/TabContainer",
		"dijit/layout/BorderContainer",
		"dijit/layout/ContentPane",
		"dojo/domReady!"
	], function (
		bundle,
		TooltipDialog, dijitPopup,
		Search, Locator,
		PictureMarkerSymbol,
		GraphicsLayer,
		connect,
		Navigation,
		esriConfig,
		on,
		dojoQuery,
		ArcGISTiledMapServiceLayer,
		ArcGISDynamicMapServiceLayer,
		Legend,
		arrayUtils,
		parser,
		Popup,
		PopupTemplate,
		InfoTemplate,
		FeatureLayer,
		/*START Grid */
		declare,
		all, Deferred,
		Grid,
		Selection,
		Select,
		Memory,
		CheckBox,
		Query,
		QueryTask,
		//Query,
		SimpleMarkerSymbol,
		SimpleRenderer,
		UniqueValueRenderer,
		Color,
		/*END Grid */
		esriRequest,
		dom,
		domConstruct,
		domClass,
		SimpleFillSymbol,
		ClassBreaksRenderer,
		Measurement,
		Units,
		Geocoder, SimpleLineSymbol, Extent,
		//cluster
		ClusterFeatureLayer, Graphic, graphicsUtils, domStyle, fx, easing,
		registry,
		Scalebar,
		LayerInfo
	) {
		var visible = [];
		var addressResult = "";
		var extentSearchResult = {};
		var schoolCount = "";
		var symbolSelectionPoint = new SimpleMarkerSymbol("circle", 36,
			new SimpleLineSymbol(SimpleLineSymbol.STYLE_LONGDASH, new Color([193, 39, 45, 1]), 3),
			new Color([255, 255, 255, 0]), 1);
		var symbolSelectionPolygon = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID, new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([193, 39, 45, 0]), 3), new Color([47, 47, 47, 0.6]));
		var pxWidth = map.extent.getWidth() / map.width; //get main extent of the map for points extent padding

		var content = "<p class='bord'>${VARDAS}<br><span>Mokyklos pavadinimas</span></p>" + "<p class='bord'>${ADRESAS}<br><span>Adresas</span></p>" + "<p class='bord'>${KALBA}<br><span>Kalba</span></p>" + "<p class='school-type' class='bord'>${TIPAST}<br><span>Mokyklos tipas</span></p>";
		var title = "Ugdymo įstaigos duomenys";
		var temp = new InfoTemplate(title, content);
		var featureUrlTeritory = "https://zemelapiai.vplanas.lt/arcgis/rest/services/Interaktyvus_zemelapis/Mokyklos/MapServer/1",
			featureUrlPoint = "https://zemelapiai.vplanas.lt/arcgis/rest/services/Interaktyvus_zemelapis/Mokyklos/MapServer/0",
			//currently not using polygon feature layer, we/re using polygon feature url instead
/*			featureTeritory = new FeatureLayer(featureUrlTeritory, {
				id: "school-feature-teritory",
				mode: FeatureLayer.MODE_ONDEMAND,
				//maxAllowableOffset: calcOffset(),
				outFields: ["*"]
			}),*/
			featurePoint = new FeatureLayer(featureUrlPoint, {
				id: "school-feature-point",
				infoTemplate: temp,
				mode: FeatureLayer.MODE_ONDEMAND,
				//maxAllowableOffset: calcOffset(),
				outFields: ["*"]
			}),
			specialPolygon = new FeatureLayer("https://zemelapiai.vplanas.lt/arcgis/rest/services/Interaktyvus_zemelapis/Mokyklos/MapServer/2", {
				id: "school-special-polygon",
				//infoTemplate: temp,
				//mode: FeatureLayer.MODE_ONDEMAND,
				//maxAllowableOffset: calcOffset(),
				outFields: ["*"]
			}),
			dynamicPoint = new ArcGISDynamicMapServiceLayer("https://zemelapiai.vplanas.lt/arcgis/rest/services/Interaktyvus_zemelapis/Mokyklos/MapServer", { //dyn layer fo the legend
				id: "points-dyn"
			});
			//suspend layer drawing
			//dynamicPoint.suspend();
		
		setTimeout(function () {
			var p = document.createElement("p");
			p.innerHtml = "<p class='build-p'>Mokyklų paieška:</p>";
			var sidebar = document.getElementById("dijit_layout_TabContainer_1");
			//sidebar.appendChild(p);
		}, 1600);
		
		//filter language and school year select
		var languageSelection = new Select({
			name: "selectGraph",
			options: [
				{
					label: "Visos k.",
					value: [0],
					selected: true
				},
				{
					label: "Lietuvių k.",
					value: [1]
				},
				{
					label: "Rusų k.",
					value: [2, 5] //2 = rusų or 5 = rusų lenkų
				},
				{
					label: "Lenkų k.",
					value: [3, 4] // 3 = lenkų or 4 = lenkų rusų
				}
				//Not implemented in database yet 2016 10 14
				/*,
				{
					label: "Kitos k.",
					value: 6
				}*/
						//{ label: "Šildymo s. vidutinio mėn. šildymo", value: "sild" }
						]
		}, "language-filter");
		languageSelection.startup();
		
		var schoolSelection = new Select({
			name: "selectGraph",
			options: [
				{
					label: "Visos kl.",
					value: "none",
					selected: true
				},
				{
					label: "1 klasė",
					value: 1
							},
				{
					label: "2 klasė",
					value: 2
							},
				{
					label: "3 klasė",
					value: 3
							},
				{
					label: "4 klasė",
					value: 4
				},
				{
					label: "5 klasė",
					value: 5
				},
				{
					label: "6 klasė",
					value: 6
				},
				{
					label: "7 klasė",
					value: 7
				},
				{
					label: "8 klasė",
					value: 8
				},
				{
					label: "9 klasė",
					value: 9
				},
				{
					label: "10 klasė",
					value: 10
				},
				{
					label: "11 klasė",
					value: 11
				},
				{
					label: "12 klasė",
					value: 12
				}
			]
		}, "year-filter");
		schoolSelection.startup();
			
		//Schools geocoder start
		var geocoder = new Search({
			//arcgisGeocoder: false,
			//geocoders: geocoders,
			expanded: true,
			sources: [{
				locator: new Locator("https://gis.vplanas.lt/arcgis/rest/services/Lokatoriai/ADRESAI_V1/GeocodeServer"),
				singleLineFieldName: "Single Line Input", //AG name of 'Single Line Address Field:'
				outFields: ["*"],
				enableSuggestions: true, //AG only with 10.3 version
				name: "Paieška",
				enableHighlight: true, //highlight symbol
				enableLabel: false,
				//distance: 20, //search distance
				localSearchOptions: {
					minScale: 300000,
					distance: 50000
				},
				placeholder: "Adresas, pvz.: Konstitucijos pr. 3",
				highlightSymbol: new PictureMarkerSymbol("/maps_vilnius/img/map_marker.png", 36, 36).setOffset(0, 12)
		}],
			map: map
		}, "search-schools");
		geocoder.startup();
		//Schools geocoder END
		
		//console.dir(bundle);
		bundle.widgets.Search.main.emptyValue = "Įveskite savo adresą";
		
		//search on select value changed
		on(languageSelection, "change", initSearch);
		on(schoolSelection, "change", initSearch);
		function initSearch() {
			geocoder.search();
		}		
		
		//selection query for feature points, graphic points and side list, we're using this infowindow selection instead of infoTemplate to rid of dublicate popups
		function runSelectionQuery(query) {
			var deferred = featurePoint.selectFeatures(query, FeatureLayer.SELECTION_NEW, function (results) {
				//console.log(results[0].geometry);
				//console.log(results);
				var path = results[0].attributes;
				var address = path.ADRESAS;
				var lang = path.KALBA;
				var name = path.VARDAS;
				var type = path.TIPAST;
				//create new infotemplate variable
				var tempResults = new InfoTemplate(title, content);
				
				var content = "<p class='bord'>" + name + " <br><span>Mokyklos pavadinimas</span></p>" + "<p class='bord'>" + address + "<br><span>Adresas</span></p>" + "<p class='bord'>" + lang + "<br><span>Kalba</span></p>" + "<p class='school-type' class='bord'>" + type + "<br><span>Mokyklos tipas</span></p>";

				//select points
				pointsSelection(results[0].geometry, results[0].attributes);

				//console.log(featurePoint.infoTemplate);

				//map.infoWindow.setTitle("Ugdymo įstaigos duomenys");
				tempResults.setContent(content);
				map.infoWindow.show(results[0].geometry);
				//console.log(featurePoint.infoTemplate);
				
				//center selected school point
				map.centerAt(results[0].geometry); //AG center & zoom
			});

			map.infoWindow.setFeatures([deferred]);
		}
		
		//add points selection Graphic
		function pointsSelection(pointGeometry, attributes) {
			//remvoe select graphics
			removeSelection();

			var pointSelected = new GraphicsLayer();
			pointSelected.id = "Points selection";

			pointSelected.add(new Graphic(pointGeometry, symbolSelectionPoint, attributes));

			setTimeout(function () {
				map.addLayer(pointSelected);
			}, 100);
			//show tooltip
			addTooltip(pointSelected);
		}
		
		var schoolsTask = new QueryTask("https://zemelapiai.vplanas.lt/arcgis/rest/services/Interaktyvus_zemelapis/Mokyklos/MapServer/1");
		//query for school teritories
		var schoolsQuery = new Query();
		schoolsQuery.outSpatialReference = {
			wkid: 3346
		};
		schoolsQuery.returnGeometry = false;
		schoolsQuery.outFields = ["*"];
		
		//disable search zoom
		geocoder.zoomScale = null;
		
		//TEMP solution for accesing form submit for VMSA application
		setTimeout(function() {
			var formDOM = document.getElementsByTagName("form");
			var formInputs = formDOM[1].getElementsByTagName("input");
			formInputs[0].name = "search-schools_input";	
		}, 400);

		
		on(geocoder, "select-result", function(e) {
			dom.byId("schools-info").innerHTML = ""; //remove data on search if exists	
			dom.byId("schools-filtered-list").innerHTML = ""; //remove data on search if exists	
			//remove school list dom
			domClass.remove("schools-list", "active");
			
			//remove selection graphic if exists
			var pointSelect = map.getLayer("Points selection");
			var featurepointSelect = map.getLayer("Feature points selection");
			if (pointSelect) {
				map.removeLayer(pointSelect);
				pointSelect = {};
			}
			if (featurepointSelect) {
				map.removeLayer(featurepointSelect);
				featurepointSelect = {};
			}
			
			addressResult = e.result.name;	
			extentSearchResult = e.result.feature.geometry;
			//run query Task 
			executeSchoolsQueryTask(e);

			//if locator has more then one result show popup, else hide
			if (geocoder.searchResults[0].length > 1) {
				setTimeout(function() {
					popup.hide(); //let's hide popup after 4 seconds
				}, 4000);						
			} else {
				popup.hide();
			}
	
		});
		
		on(geocoder, "search-results", function(e) {
			removeSelection();
			dom.byId("schools-info").innerHTML = ""; //remove data on search if exists	
			dom.byId("schools-filtered-list").innerHTML = ""; //remove data on search if exists	
		});
		
		on(geocoder, "clear-search", function () {
			removeSelection();
			//clear current selection on new search event
			//featurePoint.clearSelection();
			//console.log(geocoder);
			//featurePoint.show();
			dom.byId("schools-info").innerHTML = ""; //remove data on search if exists	
			
			//remove school list dom
			domClass.remove("schools-list", "active");

			featurePoint.setOpacity(1);
			var layerSchools = map.getLayer("Mokyklos");

			if (layerSchools) {
				map.removeLayer(layerSchools);
			}
			
			//remove selection graphic if exists
			var pointSelect = map.getLayer("Points selection");
			var featurepointSelect = map.getLayer("Feature points selection");

			if (pointSelect) {
				map.removeLayer(pointSelect);
				pointSelect = {};
			}

			if (featurepointSelect) {
				map.removeLayer(featurepointSelect);
				featurepointSelect = {};
			}			
		});	
		
		//add remove Selection on infowindow hide event
		on(map.infoWindow, "hide", removeSelection);
		function removeSelection(removeValue) { //specify removeValue true ||  false 
			//remove selection graphic if exists
			var pointSelect = map.getLayer("Points selection");
			var polygonSelect = map.getLayer("Polygon selection");
			var featurepointSelect = map.getLayer("Feature points selection");

			if (pointSelect) {
				map.removeLayer(pointSelect);
				pointSelect = {};
			}

			if (featurepointSelect) {
				map.removeLayer(featurepointSelect);
				featurepointSelect = {};
			}

			if (polygonSelect && !removeValue) {
				map.removeLayer(polygonSelect);
				polygonSelect = {};
			}
		}	
		//console.log(geocoder);
		
		function executeSchoolsQueryTask(e) {	
			//console.log(getFilterValue("language-filter"));
			var queryStr; //final query str
			var languageValue = getFilterValue("language-filter");
			var yearValue = getFilterValue("year-filter");
			var yearGroup = getYearGroupAttr(yearValue);
			var queryLangStr = getQueryLang(languageValue);
			var queryYearStr = getQueryYear(yearGroup);
			
			queryStr = getFinalQueryStr(languageValue, queryLangStr, yearValue, queryYearStr);
			
			//console.log(yearGroup);
			
			//AG in order to show selected layer on point extent, add padding to min max values of x,y coordinates 
			schoolsQuery.geometry = e.result.feature.geometry;
			schoolsQuery.where  = queryStr;

			//Execute task
			schoolsTask.execute(schoolsQuery, showResults);
		}
		
		function getFinalQueryStr(languageValue, queryLangStr, yearGroup, queryYearStr) {
			if (((languageValue.length == 1) && (languageValue[0] === 0)) && ((yearGroup.length == 1) && (yearGroup[0] === 0))) {
				return "1=1";
			} else if ((languageValue[0] !== 0) && (yearGroup[0] !== 0)) {	
				//console.log("(" + queryLangStr + ") AND ("  + queryYearStr + ")");
				return "(" + queryLangStr + ") AND ("  + queryYearStr + ")";
			} else {
				if ((languageValue[0] === 0) && (yearGroup[0] !== 0)) {
					//console.log(queryYearStr);
					return queryYearStr;
				} else if (((languageValue[0] !== 0) && (yearGroup[0] === 0))) {
					//console.log(queryLangStr);
					return queryLangStr;
				}
			}
		}
		
		//getYearGroupAttr, get 1 of  4 attributes of year group
		function getYearGroupAttr(year) {
			if ((year > 0) && (year < 5)) {
				return ["Sraut_0104"];
			} else if ((year > 4) && (year < 9)) {
				return ["Sraut_0508"];
			} else if ((year > 8) && (year < 11)) {
				return ["Sraut_0910", "Sraut_0912"]; // 2 values can be accepted
			} else if ((year > 8) && (year < 13)) {
				return ["Sraut_0912"];
			} else {
				return [0];
			}
		}
				
		//get language or year filter value
		function getFilterValue(param) {
			var select = dijit.byId(param); // param string = "language-filter" || "year-flter"
			return select.get("value");
		}
		
		//get query clause by certain schools polygons fields of yar
		function getQueryYear(yearGroup) {
			if (yearGroup.length == 1) { 
				if (yearGroup[0] !== 0) { 
					return yearGroup[0] + "='1'";
				} else {
					return "1=1"; //if not selected
				}
			} else { // else : year from 9 to 10 selected 
				return yearGroup[0] + "='1' OR " + yearGroup[1] + "='1'";
			}
		}
		
		//get query clause by certain schools polygons fields of languge 
		function getQueryLang(languageValue) {
			if (languageValue.length == 1) { //check if all language  or lithuanian languages selected
				if (languageValue[0] !== 0) { //check if not all languages selected
					return "KALBA = '" + languageValue[0] + "'";
				} else {
					return "1=1"; //if all languages selected show everything
				}
			} else { // else : russian or polish languages selected 
				return "KALBA = '" + languageValue[0] + "' OR KALBA='" + languageValue[1] + "'";
			}
		}
		
		function showResults(results) {
			//console.log(results);
			var queryStringClause = "", // string for query.where statement
				i = 0;
			//add query clause by schools polygons' OBJ_ID field
			for (i; i < results.features.length; i += 1) {
				if (results.features[i].attributes.OBJ_ID) {
					if ((results.features.length - 1 - i) === 0) {
							queryStringClause += "OBJ_ID = '" + results.features[i].attributes.OBJ_ID + "'";
					} else {
							queryStringClause += "OBJ_ID = '" + results.features[i].attributes.OBJ_ID + "' OR ";
					}
				}
			}
			
			//console.log(queryStringClause);
			//query for school points
			var query = new Query();	
			//query.objectIds	= ["OBJ_ID"];
			// TODO 2019 02 05 intergrate solyution for spec schools,
			// currently adding static queyr selection 
			query.where = queryStringClause;
			//query.returnGeometry = true;
			query.outFields = ["*"];
			//query.geometry = featurePoint.geometry;
			
			//new selection and new graphic symbol
			var symbolDefault = new SimpleMarkerSymbol("circle", 22,
									new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([132, 0, 168, 0.9]), 2),
									new Color([232, 190, 255, 1.0]),1);		
			var symbolLt = new SimpleMarkerSymbol("circle", 22,
									new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([0, 106, 68, 0.9]), 2),
									new Color([74, 181, 90, 1.0]),1);
			var symbolRu = new SimpleMarkerSymbol("circle", 22,
									new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([0, 112, 255, 0.9]), 2),
									new Color([115, 178, 255, 1.0]),1);
			var symbolPl = new SimpleMarkerSymbol("circle", 22,
									new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([220, 20, 60, 0.9]), 2),
									new Color([255, 127, 127, 1.0]),1);
			var symbolRuPl = new SimpleMarkerSymbol("circle", 22,
									new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([220, 20, 60, 0.9]), 2),
									new Color([255, 255, 255, 1.0]),1);				
			var symbolSpec = new SimpleMarkerSymbol("circle", 22,
									new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([122, 122, 0, 0.9]), 2),
									new Color([167, 167, 0, 1.0]),1);				
			
			
			//select schools by polygon OBJ_ID
			featurePoint.selectFeatures(query, FeatureLayer.SELECTION_NEW, function (results) {
				var points = map.getLayer("Mokyklos");
				if (points) {
					map.removeLayer(points);
					points = {};
				}
				//console.log("TASKU REZULTATAI");
				//console.log(results);

				points = new GraphicsLayer(); //create new school points graphics layer
				points.id = "Mokyklos";
				//console.dir(points)
				
				
				schoolCount = results.length;

				//show results number in search content
				var dataDom = dom.byId("schools-data");
				dataDom.innerHTML = "<p class='address'>" + addressResult + "<br><span>Rastas adresas</span></p>"  + "<p class='school-count'><span class='school-no'>" + schoolCount + "</span> <br><span>Pagal rastą adresą priskirtas mokyklų skaičius</span></p>";
				//end show results number in search content 

				featurePoint.setOpacity(0.6);
				//featurePoint.hide();
				var xValues = [];
				var yValues = [];
				
				//add schools list to school-list dom
				var schoolsListStr = "";
				var filteredList = document.getElementById("schools-filtered-list");
				function schoolsList (name, lang) {
					var schoolName = name.attributes.VARDAS;
					if (schoolName) {
						schoolsListStr += '<li class="' + lang + '"><button id="' + name.attributes.OBJ_ID + " " + name.attributes.OBJECTID + '" class="animate">' + schoolName + '</button></li>' ;
					}
				}				

				arrayUtils.forEach(results, function (result) {
					//console.log(result);
					var language = result.attributes.KALBA;
					if (result.attributes.GYV_ID === 26) {
						// TODO REMOVE, quick demo feature fro special schools
						language = '26';
					}
					//var shortlanguage = language.slice(0, 3); //get only 3 first letters for class name
					var shortlanguage = ""; 
					//get max min y and x values of each points
					xValues.push(result.geometry.x);
					yValues.push(result.geometry.y);

					//create new point layer with feature attributes and check school language
					switch (language) {
						case "lietuvių":
							points.add(new Graphic(result.geometry, symbolLt, result.attributes));
							shortlanguage += "lie";
							break;
						case "rusų":
							points.add(new Graphic(result.geometry, symbolRu, result.attributes));
							shortlanguage += "rus";
							break;
						case "lenkų":
							points.add(new Graphic(result.geometry, symbolPl, result.attributes));
							shortlanguage += "len";
							break;
						case "rusų lenkų":
							points.add(new Graphic(result.geometry, symbolRuPl, result.attributes));
							//additional language
							shortlanguage += "rus-len";
							break;
						case "lenkų rusų":
							points.add(new Graphic(result.geometry, symbolRuPl, result.attributes));
							//additional language
							shortlanguage += "len-rus";
							break;
						case "26":
							points.add(new Graphic(result.geometry, symbolSpec, result.attributes));
							//additional language
							shortlanguage += "spec";
							break;
						default:
							points.add(new Graphic(result.geometry, symbolDefault, result.attributes));
							break;
					}
					
					//add schools list to str
					//console.log(results);
					schoolsList(result, shortlanguage);
				});
				
				//place schools list to dom
				domConstruct.place(schoolsListStr, filteredList, "last");
				
				//show schols list
				setTimeout(function () {
					domClass.add(dom.byId("schools-list"), "active");
					//window.location.hash = '#schools-list'; //show schools-list block
				}, 200);
				
				
				//add address points' coordinates to arrays
				xValues.push(extentSearchResult.x);
				yValues.push(extentSearchResult.y);
				
				function getMaxOfArray(numArray) {
					return Math.max.apply(null, numArray);
				}

				function getMinOfArray(numArray) {
					return Math.min.apply(null, numArray);
				}

				//console.log(xValues);
				//console.log(Math.min(...xValues));
				//console.log(Math.max(...xValues));

				//var zoomLevel = map.getMaxZoom() - 5;

				var padding = 30 * pxWidth;

				var extentPoints = new esri.geometry.Extent({
					//"type": "multipoint ",
					"xmin": getMinOfArray(xValues) - padding,
					"ymin": getMinOfArray(yValues) - padding,
					"xmax": getMaxOfArray(xValues) + padding,
					"ymax": getMaxOfArray(yValues) + padding,
					"spatialReference": {
						"wkid": 3346
					}
				});

				map.setExtent(extentPoints, true); //set new extent, true value - show extent completely on the map
				//map.setZoom(map.getZoom() + 1); //set new zoom 

				setTimeout(function () {
					map.addLayer(points);
				}, 1000);

				//show cursor on feature layer
				showCursor([points], arrayUtils);
				//console.log(points);

				//add info on points click
				on(points, "click", function (e) {
					showInfoWindow(e);
				});
				
				function showInfoWindow(e) {
					//preventfeaturepoint bubbling
					e.stopPropagation();
					//console.log(e);
					var path = e.graphic.attributes;

					//add class
					var str = path.OBJ_ID.toString() + " " +  path.OBJECTID.toString();
					var dom = document.getElementById(str);
					
					//query
					var query = new Query();
					//select point by unique field OBJECTID (dynamic but unique values)
					query.where = "OBJECTID=" + path.OBJECTID;
					//query.returnGeometry = true;
					query.outFields = ["*"];
					runSelectionQuery(query); //run button selection query	
			
					
					//remove focus class on each buttons
					removeFocusClass();
					
					//select points
					pointsSelection(e.graphic.geometry, e.graphic.attributes);				
					
					//get polygons by OBJ_ID attribute
					getSchoolPolygon( e.graphic.attributes.OBJ_ID);
					
					//add class
					domClass.add(dom, "focus");					
				}
				
				//read schools list buttons and show infowindow
				var lisTags = document.getElementById("schools-filtered-list");
				
				
				var buttonList = lisTags.getElementsByTagName("button");
				
				arrayUtils.forEach(buttonList, function (button, i) {
					//console.log(button);
					button.addEventListener("click", initiateInfoWindow, true);
				});
				
				function initiateInfoWindow(e) {
					//console.log(e);
					var query = new Query();
					var objId = e.target.id;
					var srcElementIDArr = objId.split(" ");
					
					//remove focus class on each buttons
					removeFocusClass();
				
					//select point by unique field OBJECTID (dynamic but unique values)
					query.where = "OBJECTID=" + srcElementIDArr[1];
					//query.returnGeometry = true;
					query.outFields = ["*"];
					runSelectionQuery(query); //run button selection query			
					
					//get polygons by OBJ_ID attribute , which is first array
					getSchoolPolygon(srcElementIDArr[0]);
					
					//add class
					 domClass.add(e.target, "focus");
				}
				
				function removeFocusClass() {
					arrayUtils.forEach(buttonList, function (button, i) {
						domClass.remove(button, "focus");
					});					
					
				}
				
				//get query, check if school year is selected
				function getSchoolPolygon(id) {
					var polygonQuery = new Query();
					var yearValue = getFilterValue("year-filter");
					var yearGroup = getYearGroupAttr(yearValue);
					var queryYearStr = getQueryYear(yearGroup);
					
					//select polygon by common /static field OBJ_ID
					if (yearValue === "none") {
						polygonQuery.where = "OBJ_ID=" + id;
					} else {
						polygonQuery.where = "OBJ_ID=" + id + " AND (" + queryYearStr + ")";
					}
					
					polygonQuery.outSpatialReference = {
						wkid: 3346
					};
					polygonQuery.returnGeometry = true;
					polygonQuery.outFields = ["*"];		
					schoolsTask.execute(polygonQuery, runSchoolPolygonQuery); //run query to execute drawing polgyon border					
				}
				
				function runSchoolPolygonQuery(results) {
					//featurePoint.selectFeatures(query, FeatureLayer.SELECTION_NEW, function (results) {
					//console.log(results);
					
					if (results.features.length === 1) {
						polygonSelection(results.features[0].geometry);
					} else {
						//geomtery array from each result
						var geometriesAr = results.features.map(function (feature) {
							return feature.geometry;
						});
						//select polygon
						//run union method and unite every egeomtery service
						//console.log(geometriesAr);
						geometryService.union(geometriesAr, function (finalGeometry) {
							polygonSelection(finalGeometry);
						});
					}
				}

				//ad poygon selection
				function polygonSelection(polygonGeometry) {
					//removeSelection(false); 
					var polygonSelected = new GraphicsLayer(); 
					polygonSelected.id = "Polygon selection";
					
					polygonSelected.add(new Graphic(polygonGeometry, symbolSelectionPolygon));
					
					setTimeout(function () {
						map.addLayer(polygonSelected, 0);
					}, 100);			
				}

				//show tooltip 
				addTooltip(points);

			});
		}
		
		//add tooltip
		function addTooltip(layer) {
			//show tooltip 
			var tooltip;

			on(layer, "mouse-move", function (evt) {
				var path = evt.graphic.attributes;
				var name = path.VARDAS;
				//destroy widget on every move
				if (typeof (tooltip) !== "undefined") {
					tooltip.destroy();
				}

				tooltip = new TooltipDialog({
					id: 'myTooltipDialogFeature',
					style: "width: 160px;",
					content: "<p>" + name + "</p>",
					onMouseEnter: function () {
						dijitPopup.close(tooltip);
					}
				});

				tooltip.startup();
				dijitPopup.open({
					popup: tooltip,
					/*padding: {
						x: 10, 
						y: 10
					},*/
					x: evt.pageX + 2, //AG add padding for mouse hovering and click events
					y: evt.pageY + 2
				});
			});

			on(layer, "mouse-out", function () {
				if (typeof tooltip !== "undefined") {} {
					tooltip.destroy();
				}
			});
		}//End show tooltip

		// selection symbol used to draw the selected census block points within the buffer polygon
		var symbolSelect = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID, new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([193, 39, 45, 1]), 3), new Color([129, 183, 206, 1]));

		//featureTeritory.setSelectionSymbol(symbolSelect);

		//feature layer symbol invisible
		var symbolLayer = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID, new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([78, 78, 78, 0]), 1), new Color([195, 219, 159, 0]));
		
		//set renderer and hide layers
		//featureTeritory.setRenderer(new SimpleRenderer(symbolLayer));

		map.addLayers([featurePoint, dynamicPoint,]);
		
		//show cursor on feature layer
		showCursor([featurePoint], arrayUtils);	
		
		//add info on featurePoint click
		on(featurePoint, "click", function (e) {
			//add featurepoints selection
			featurepointsSelection(e);	
		});
		
		//add faturepoints selection Graphic
		function featurepointsSelection(e) {
			//console.log(e);	
			//remove selection graphic if exists
			var pointSelect = map.getLayer("Points selection");
			var featurepointSelect = map.getLayer("Feature points selection");

			if (pointSelect) {
				map.removeLayer(pointSelect);
				pointSelect = {};
			}

			if (featurepointSelect) {
				map.removeLayer(featurepointSelect);
				featurepointSelect = {};
			}

			var featurepointSelected = new GraphicsLayer();
			featurepointSelected.id = "Feature points selection";

			featurepointSelected.add(new Graphic(e.graphic.geometry, symbolSelectionPoint, e.graphic.attributes));

			setTimeout(function () {
				map.addLayer(featurepointSelected);
			}, 100);
			
			//show tooltip 
			addTooltip(featurepointSelected);
		}	
		
		//legend
		function updateLayerVisibility() {
			var inputs = dojoQuery(".dijitCheckBoxInput");
			//var input;
			var visible = [];

			arrayUtils.forEach(inputs, function (input) {
				if (input.checked) {
					//visible.push(input.id);
					visible.push(input.id);
					//TEMP push layer id 0 / CHANGE / REMOVE IT
					visible.push(0);
					// push special polygon and schools
					visible.push(2);
					visible.push(3);
				}

				//TEMP featureL visibility / CHANGE / REMOVE IT
				if (inputs[0].checked) {
					featurePoint.show();
					dynamicPoint.show();
				} else {
					featurePoint.hide();
					dynamicPoint.hide();
				}
				//End TEMP featureL visibility, CHANGE / REMOVE IT        

			});
			//if there aren't any layers visible set the array to be -1
			if (visible.length === 0) {
				visible.push(-1);
			}
			dynamicPoint.setVisibleLayers(visible);

			// if layer is switched off, refresh legend and show only visible layers
			//refresh building theme or advertise theme
			var currentTheme = {
				layer: dynamicPoint
			};
			legendDijit.refresh([currentTheme]); //show refreshed legend only from current Theme     
		}

		map.on("layers-add-result", function (evt) {
			//console.log("EVENTAS");
			//console.log(evt);   
			//create / control inputs and legend of each theme
			var showLegendInput = function (layerName, layerId) {
				var items = arrayUtils.map(layerName.layerInfos, function (info, i) {
					var checkBox;
					console.log(info, layerId);

					if (i === layerId[0] || i === layerId[1] || i === layerId[2] ) {
						checkBox = new CheckBox({
							class: "layers-labels",
							checked: info.defaultVisibility ? "checked=checked" : "",
							id: info.id.toString()
						});
					} else {
						if (info.defaultVisibility) {
							//visible.push(info.id);
						}
						return;
					}
					//End TEMP
					if (info.defaultVisibility) {
						visible.push(info.id);
					}
					//convert to dom
					inputsList = checkBox.domNode;
					//label
					label = domConstruct.toDom("<label for='" + info.id + "'>" + info.name + "</label>");
					inputsList.appendChild(label);
					//workaround, TEMP return string
					tmp = document.createElement("div");
					tmp.appendChild(inputsList);
					//return input via chekcbox widget, will start dojo change event
					return tmp.innerHTML;

				});

				var ll = dom.byId("layer-list");
				ll.innerHTML = items.join(' ');
				dynamicPoint.setVisibleLayers(visible);
				on(ll, "click", updateLayerVisibility);

				//legend
				var layerInfo = [];
				arrayUtils.map(evt.layers, function (layer, index) {
					console.log(layer.layer.id);
					if (layer.layer.id === "points-dyn" || layer.layer.id === "points-dyn") {
						layerInfo.push({
							layer: layer.layer,
							title: "Įjungti sluoksniai"
						});
					}
				});

				//console.log(layerInfo);


				legendDijit = new Legend({
					map: map,
					layerInfos: layerInfo //TEMP show schools
				}, "legend-list");
				legendDijit.startup();

			};

			//check url query theme and run create/control inputs and legend of each theme
			showLegendInput(dynamicPoint, [0, 2, 3]); // theme - Pastatai

			
			//Opacity slider
			//console.log(horizontalSlider);
			horizontalSlider.onChange = function(value) {
				featurePoint.setOpacity(value / 100);	
			};
			
			featurePoint.setOpacity(horizontalSlider.value / 100);
			
			//End Opacity slider			
		});
		
		//show tooltip 
		addTooltip(featurePoint);
	});
};