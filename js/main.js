/*
2016-06-21
MV 0.0.2
JS
*/

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
			imgUrl: "/maps_vilnius/img/statyba.png", //image URL
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

//get unique array values
Array.prototype.getUnique = function () {
	var u = {},
		a = [],
		i = 0,
		l = this.length;
	
	for (i, l; i < l; i += 1) {
		if (u.hasOwnProperty(this[i])) {
			//continue;
		}
		a.push(this[i]);
		u[this[i]] = 1;
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
    //TOC START
    "esri/renderers/ClassBreaksRenderer", "esri/symbols/PictureMarkerSymbol",
    //Measure
    "esri/dijit/Measurement", "esri/units",
    //TOC END
    "esri/dijit/Search", "esri/tasks/locator", 
    "esri/symbols/SimpleFillSymbol", "esri/symbols/SimpleMarkerSymbol",  "esri/renderers/SimpleRenderer", "esri/symbols/SimpleLineSymbol", "esri/Color", "esri/geometry/Extent",
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
    //TOC,
    //Measure
    Measurement, Units,
    Search, Locator, SimpleFillSymbol, SimpleMarkerSymbol, SimpleRenderer, SimpleLineSymbol, Color, Extent, 
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
	
	var DEFCONFIG = {
		extent:  new esri.geometry.Extent(MAPCONFIG.mapExtent),
		//TODO not implemented yet: integrate
		popupProperties: { 
        	fillSymbol: new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID, new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([193, 39, 45, 1]), 3), new Color([129, 183, 206, 0])),  //add default selection symbol	
        	titleInBody: false // showing title outside
    	},
		popupDom: domConstruct.create("div", { id: "ad-popup" }),
		popup: function() {
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
					if (themesObj.hasOwnProperty(theme)) {
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
			var themesObj = MAPCONFIG.themes,
				currentTheme = this.currentTheme(),
				dynimacThemesLayer;
			var runShowLegendInput = function () {
				setTimeout(function () {
					that.showLegendInput(dynimacThemesLayer); //add layers object							
				}, 500);
			};
			//alert(Object.keys(themesObj).length); //reorder layers, get lenght (with custome layers) TODO: minus custom layers + basemap layers (2 of them)
			for (var theme in themesObj) {
				if (themesObj.hasOwnProperty(theme)) {
					var themeId = themesObj[theme].id; //get unique theme id
					var themeFunc = themesObj[theme].custom; //get funcionality
					if (themeId === currentTheme) {
						if (!themeFunc) { // show ONLY themes width default funcionality
							var that = this;
							dynimacThemesLayer = this.createDynicLayers(themesObj[theme], theme); //create dynimac specific themes' layers
							for (var layerAdd in dynimacThemesLayer) { //run through layers and add them to the map with all default functionality
								if (dynimacThemesLayer.hasOwnProperty(layerAdd)) {

									map.addLayer(dynimacThemesLayer[layerAdd]);
									//console.log("DYNAMIC LAyeriai");
									//console.log(dynimacThemesLayer);
									//console.log(Object.getOwnPropertyNames(dynimacThemesLayer[layerAdd]));	
								}
							}
							runShowLegendInput();
						}
					}
				}
			}
			//reorderlayers
			//this.reorderLayers();
			
			//set Opacity slider for each dynamic layer							
			return dynimacThemesLayer;			
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
					dynamicLayers["dyn" + themeName + layer] = new ArcGISDynamicMapServiceLayer( themeLayers[layer].dynimacLayerUrls, {id: "dyn" + "-" + themeName + "-" + layer}); //create unique property (ArcGISDynamicMapServiceLayer) dynamcLayers property, then add to map layer
					dynamicLayers["dyn" + themeName + layer].configLayerName = layer; // property for infowindow infotemplate 
			
				}
			}
			return dynamicLayers;
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
					commonLayerInfos.push(dynLayersObject[layer].layerInfos);
				}
			}
			return this.createLayerInfosWithGroupName(commonLayerInfos);
		},
		createLayerInfosWithGroupName: function (commonLayerInfos) {
			var layerinfosArr;
			// concat commonLayerInfos arrays of each layer and asign to layerinfosArr variable
			for (var i = 0; i < commonLayerInfos.length ; i++) { // length - 1
				commonLayerInfos[i] = this.createGroupName(commonLayerInfos[i], commonLayerInfos[i].nameGroup); //create groupName for inner arrays
			}
			return this.createLayerInfosResultArr(commonLayerInfos);
		},
		createLayerInfosResultArr: function(commonLayerInfos) {
			var layerinfosArr;
			//NEW: merge arrays
			layerinfosArr = [].concat.apply([], commonLayerInfos);	
			return layerinfosArr;			
		},
		createGroupName: function (innerLayerInfosArr, name) {
			//create groupName for inner arrays
			for (var i = 0; i < innerLayerInfosArr.length; i++) { // length - 1			
				innerLayerInfosArr[i].groupName = name;
			}			
			return innerLayerInfosArr;				
		},
	    //create / control inputs and legend of each theme
	    showLegendInput: function (layerName) {
			var commonLayerInfosResult = this.createLayerInfosArr(layerName); 										
	        var items = arrayUtils.map(commonLayerInfosResult, function (info, i) {
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
				
	       		//convert to dom
	       		var inputsList = checkBox.domNode;
	       		//label
	       		var label = domConstruct.toDom("<label for='" + i + "'>" + info.name + "</label>");
	       		inputsList.appendChild(label);
	       		//workaround, TEMP return string
	       		var tmp = document.createElement("div");
	       		tmp.appendChild(inputsList);
	       		//return input via chekcbox widget, will start dojo change event
	       		return tmp.innerHTML;             
	        });
	        
	        var layerDom = dom.byId("layer-list");
	        layerDom.innerHTML = items.join(' ');
			
			//set default layers visibility
			for (var layer in layerName) {
				if (layerName.hasOwnProperty(layer)) {
					layerName[layer].setVisibleLayers(layerName[layer]._defaultVisibleLayers);
				}
			}				
			
			//legend widget
			var layerInfo = this.setupDefaultLegendLayers(layerName);					
	          
	        if (layerInfo.length > 0) {
	          var legendDijit = new Legend({
	                map: map,
	                layerInfos: layerInfo
	            }, "legend-list");
	            legendDijit.startup();
	        }
			// End legend widget
			
			var that = this;
	        on(layerDom, "click", function(e) {that.updateLayerVisibility(layerName, e, legendDijit, layerInfo);});
			
			this.initIdentify(layerInfo); // initiate identify visible layers by default
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
			return layerInfo.reverse(); //TODO  reverse() method is slow, change to custom one
		},
		//control layers visibility with inputs
		updateLayerVisibility: function (layerName, e, legendDijit, layerInfo) {
			//alert(layerName);
				var inputs = dojoQuery(".layers-labels input");
				inputValues = [];
				visibleLayers = {};
				
				arrayUtils.forEach(inputs, function(input) {
					if (input.checked) {
						visible.push(input.id);
						inputValues.push(input.value);				
						//check if same group has any values already
						if (visibleLayers.hasOwnProperty(input.value)){
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
				legendDijit.refresh(layerInfo); //show refreshed legend only from current Theme  
				this.initIdentify(layerInfo); // initiate identify visible layers by new visibility
		},
		cloneVisibleLayer: function (visibleLayers, visibleLayersResult, e) {
			for (var layer in visibleLayersResult){
				if (visibleLayersResult.hasOwnProperty(layer)) {
					for (var visibleLayer in visibleLayers) {
						if ((visibleLayers.hasOwnProperty(visibleLayer)) && (layer === visibleLayer)) {
							if (layer == e.toElement.value) {
								visibleLayersResult[visibleLayer] = visibleLayers[visibleLayer]; //AG Important: make sure to set right visible  layer
							}
						} else { // -1 value must be written in specific order
							if (layer === e.toElement.value) {
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
					if (layerName[layer].layerInfos.nameGroup === e.toElement.value) {
						this.getCurrentInput(e, layerName[layer], visibleLayers);
					}
				}
			} 			
		},
		getCurrentInput: function(e, layer, visibleLayers) {			
			if (visibleLayers.hasOwnProperty(e.toElement.value)){
				layer.setVisibleLayers(visibleLayers[e.toElement.value]);
			}		
		},
		//initiate Idendentify taskss parameters for visible dynamic layers
		initIdentify: function(layerInfo) {					
			identifyPerameters = this.getParameters(layerInfo);			
			map.on("click", this.executeIdentify); //TODO remove global map
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
				var deferredList = [];
				var getDeferred = function () {
					return identifyPerameters[parameter].identifyTask
						.execute(identifyPerameters[parameter])
						.addCallback(function (response) {
							// response is an array of identify result objects
							// Let's return an array of features.
							return arrayUtils.map(response, function (result) {
								defResponse = response;
								var feature = result.feature,
									content = " ",
									layerName = result.layerName,
									attributes = feature.attributes;

								/*					var symbol = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID, new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([193, 39, 45, 1]), 3), new Color([129, 183, 206, 0]));
													feature.setSymbol(symbol);	
													map.graphics.add(feature);*/

								//console.log("identifyPerameters");
								//console.log(feature);
								//console.log(layerName);

								feature.attributes.layerName = layerName;


								for (var resultAtr in attributes) {
									if (attributes.hasOwnProperty(resultAtr)) {
										//do not add layername and objectid attributes
										if (!(resultAtr == "OBJECTID" || resultAtr == "layerName")) {
											content += "<p class='bord'>" + attributes[resultAtr] + "</br><span>" + resultAtr + "</span>" + "<p>";
										}
									}
								}

								var tempInfo = new InfoTemplate("<p>${layerName}</p>", content);
								feature.setInfoTemplate(tempInfo);
								domClass.add("ad-popup", "default-popup");
								return feature;
							});
						});
				};
				for (var parameter in identifyPerameters){
					if (identifyPerameters.hasOwnProperty(parameter)) {
						//if (parameter = "bp"){
						identifyPerameters[parameter].geometry = evt.mapPoint;
						identifyPerameters[parameter].mapExtent = map.extent;
						var deferred = getDeferred();

						deferredList.push(deferred); // create deferred objects llist obj
					}
				}
					all(deferredList).then(function(result){ //AG run then() method with all/promise widget
						var resultsMerge = [].concat.apply([], result); // if we have list of results - merger all results
						if (resultsMerge.length > 0) { // check if we have response by checking resultsMerge array				
							map.infoWindow.setFeatures([].concat.apply([], deferredList)); //set features with all deferred objects
							map.infoWindow.show(evt.mapPoint);
							//domClass.add("ad-popup", "animate"); //add animation to pup up
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
	bundle.widgets.popup.NLS_zoomTo = "Priartinti";
	bundle.widgets.popup.NLS_pagingInfo = "<span class='index-total'>(${index} iš ${total})</span>";
    
    var loadGif = dom.byId("loading-gif"); 
    
    var extent = new esri.geometry.Extent(MAPCONFIG.mapExtent); //DONE

    var popupProperties = {  //DONE
        fillSymbol: new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID, new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([193, 39, 45, 1]), 3), new Color([129, 183, 206, 0])),  //add default selection symbol	
		//outerText: "Priartinti",  //xhange default outerText;
        titleInBody: false // showing title outside
    };

    var popupDom = domConstruct.create("div", { id: "ad-popup" });  //DONE
    popup = new Popup(popupProperties, popupDom);  //DONE

	
	var defaultSelect = new SimpleMarkerSymbol("circle", 24,
									new SimpleLineSymbol(SimpleLineSymbol.STYLE_LONGDASH, new Color([223, 52, 59, 0]), 3),
									new Color([255, 255, 255, 0]));	
	popup.markerSymbol = defaultSelect;
	
	//popup.markerSymbol.setOffset(20, 32);
	
   var map = new Map("map", {  //DONE
        extent: extent,
        logo: false,
        showAttribution: false,
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
    esriConfig.defaults.io.corsEnabledServers.push("http://zemelapiai.vplanas.lt"); //https://developers.arcgis.com/javascript/jshelp/inside_defaults.html
    
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
    esri.config.defaults.geometryService = new esri.tasks.GeometryService(geomBuildUrl);
    
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
			map.infoWindow.hide();
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
		url: "http://zemelapiai.vplanas.lt/arcgis/rest/services/Lokatoriai/ADRESAI_V1/GeocodeServer",
		name: "Vilniaus adresai"
	}];
	
   var geocoder = new Search({
		//arcgisGeocoder: false,
		//geocoders: geocoders,
		sources: [{
			locator: new Locator("http://zemelapiai.vplanas.lt/arcgis/rest/services/Lokatoriai/PAIESKA_COMPOSITE/GeocodeServer"),
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
		case "theme-buildings" || "": //if theme building or null or empty
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
				content: "<p class='build-p'>Mokyklų paieška pagal adresą:</p><div id='search-schools'></div><div id='schools-data'></div><div id='schools-info'></div>"
			}).placeAt("mainWindow").startup();
			
			domClass.add(document.body, "schools-theme");
			schoolsTheme(map, MAPCONFIG, toolsMeasure, CONTROL.showCursor, horizontalSlider);
			break;
	}
	// End add custom themes	
	
    map.on("update-start", function () {
          esri.show(loadGif);          
    });

    map.on("update-end", function () {
        esri.hide(loadGif);
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

    map.infoWindow.resize(350, 400);			
    
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
                        //building theme
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
            var currentTheme = CONTROL.currentTheme() === "ad" ? {layer:advertsDynLayer} : {layer:layerBuild};
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
    document.getElementById("credits").innerHTML  = year + " m. | VMS interaktyvūs žemėlapiai | <a href='http://www.vilniausplanas.lt/' target='_blank'>SĮ „Vilniaus planas“</a>";

    //Mouse cursor
	var activeLayers = [featureBuildings, advertsFeatureLayer];
	CONTROL.showCursor(activeLayers, arrayUtils);
    //END Mouse cursor  	
});