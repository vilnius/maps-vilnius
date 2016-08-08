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
		legacyMap: {
			custom: true, // true if theme funcionality is custom  
			name: "Senoji žemėlapio versija", //theme name
			id: "legacy", //theme id class and theme URL query name
			imgUrl: "/maps_vilnius/img/old_version.png", //image URL
			imgAlt: "Senoji versija", // image alt attribute
			url: "http://www.vilnius.lt/vmap/t1.php" // external url if required, if not - gets internal url depending on id property 
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
			buildingsTheme(map, featureBuildings, toolsMeasure, featBuildingsUrl, CONTROL.showCursor);
			break;
		case null: //if theme building or null or empty
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
});;var permitsTheme = function (map) {
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
                    "<p>Dokumentai atsisiųsti:</p><div id='ad-attachment'><p style='text-align: center;'><img src='http://vilniausplanas.lt/maps_vilnius/img/ajax-loader.gif' style=' width: 20px;    text-align: Center;    margin: 0 auto;'></p></div>" + 
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
                    

                    dom.byId("ad-attachment").innerHTML = adMsgComplete;
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
		                "url": "http://zemelapiai.vplanas.lt/arcgis/rest/services/Interaktyvus_zemelapis/Reklamos_registro_leidimai/MapServer/0",
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
                    queryTaskAdURL = new QueryTask("http://zemelapiai.vplanas.lt/arcgis/rest/services/Interaktyvus_zemelapis/Reklamos_registro_leidimai/MapServer/1");
                    
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
                            hasClass = domClass.contains("ad-popup", "invalid-ad") ? domClass.remove("ad-popup", "invalid-ad") : domClass.add("ad-popup", "valid-ad");
                            domClass.add("ad-popup", "valid-ad");  
                        } else if (galiojaKEY === 2) {
                            map.infoWindow.setTitle("Negaliojantis reklamos registro leidimas "); //BUG FIX for showing titles
                            adClusterTemplate.setTitle("Negaliojantis reklamos registro leidimas "); //BUG FIX for showing titles
                            hasClass = domClass.contains("ad-popup", "valid-ad") ? domClass.remove("ad-popup", "valid-ad") : domClass.add("ad-popup", "invalid-ad"); 
                            domClass.add("ad-popup", "invalid-ad");  
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
		LayerInfo
	) {
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
					graphQueryTask = new QueryTask("http://zemelapiai.vplanas.lt/arcgis/rest/services/TESTAVIMAI/Pastatu_administravimas_test/MapServer/4"),
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
				var graphData = {labels:labels, labelsStr:labelsStr, admT:admT, atliek:atliek, techP:techP, sildP:sildP, sildVid:sildVid, bgColour:bgColour};

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
				var myBarLegend = myBar.datasets[0].fillColor.getUnique();
				var myBarLengendStr;
				for (var i = 0; i < myBarLegend.length; i += 1) {
					if (myBarLegend[i] === this.admColor)
						myBarLengendStr = "<p><span style='background-color:" + myBarLegend[i] + " '></span>Administratoriai</p>";
					if (myBarLegend[i] === this.bendrijosColor)
						myBarLengendStr += "<p><span style='background-color:" + myBarLegend[i] + " '></span>Bendrijos</p>";
					if (myBarLegend[i] === this.jvsColor)
						myBarLengendStr += "<p><span style='background-color:" + myBarLegend[i] + " '></span>JVS</p>";
				}
				dom.byId("bar-legend").innerHTML = "<div id='chart-legend'><div class='line-legend'>" + myBarLengendStr + "</div></div>";
				
				dom.byId("bar-tips").innerHTML = "<div id='chart-legend'><div class='line-legend'><h5><i class='fa fa-exclamation' style='color: #C1272D; height: auto'></i>Dėl bendrijų ir JVS vidutinių tarifų:</h5><p>Bendrijų ir JVS duomenys nėra tikslūs, nes informacija apie tarifus pateikta mažiau kaip 50 proc. bendrijų arba  jungtinės veiklos sutartimi  valdomų namų.</br>Sprendimas  dėl įmokų tarifų dydžio priimamas Civilinio kodekso 4.85 straipsnyje nustatyta tvarka</p><p><i class='fa fa-exclamation' style='color: #C1272D; height: auto'></i>Duomenys atliekų tarifo grafike pateikiami neįvertinus atliekų tvarkymo paskirstymo skaičiavimo būdo. Bendrijų ir JVS valdomų daugiabučių namų butų ir kitų patalpų savininkams mokestis už atliekų tvarkymą skaičiuojamas ne tik nuo buto naudingo  ploto, bet ir nuo gyventojų skaičiaus bute. Sprendimas priimamas Civilinio kodekso 4.85 straipsnyje nustatyta tvarka.</p></div></div>";				
			}
		};


		//administratorGraph.setQuery().then(function(a) {return a});

		//NEW 2015 11
		//QueryTask: namo bendrieji tarifai
		var buildingAdministrationTask = new QueryTask("http://zemelapiai.vplanas.lt/arcgis/rest/services/TESTAVIMAI/Pastatu_administravimas_test/MapServer/1");
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
			queryTaskHeating = new QueryTask("http://zemelapiai.vplanas.lt/arcgis/rest/services/TESTAVIMAI/Pastatu_administravimas_test/MapServer/2");
		}, 150);


		// selection symbol used to draw the selected census block points within the buffer polygon
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

			var einMetai, galiojMetai, adresas, administr, statM, statPask, nrPlane, bendrPlotas, patalpugsk, naudPlotas, patalpunks,
				valdForm, valdFormString, bnovAdr, bnovPask, bnovVadov, bnovTel, bnovVadyb, bnovVadybTel, bnovElP, bnovKodas, skundSk, skundPob,
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
			valdForm = dataPath.VALDFORM; //valdymo forma
			valdFormString = valdFormFunc();
			bnovAdr = dataPath.A_ADRES; //bnov adresas
			bnovPask = dataPath.A_PASKPAGR; //vmsa įsakymas
			bnovVadov = dataPath.A_VADOVAS;
			bnovTel = dataPath.A_VADTEL;
			bnovVadyb = dataPath.NPVADYB;
			bnovVadybTel = dataPath.A_VADYBTEL;
			bnovElP = dataPath.A_ELPAST;
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

			var buildManager = "<h3>" + adresas + "<br></h3>" + "<p>" + valdFormString + " <br><span>Valdymo forma</span></p>" + "<p>" + administr + " <br><span>administratorius</span></p>" + "<p>" + galiojMetai + " <br><span>administratoriaus paskyrimo terminas</span></p>" + "<p>" + bnovAdr + "<br><span><span class='bnov'>BNOV (Bendrojo naudojimo objektų valdytojas)</span> adresas</span></p>" + "<p>" + bnovPask + "<br><span> Vilniaus miesto savivaldybės administracijos įsakymas</span></p>" + "<p>" + bnovVadov + "<br><span><span class='bnov'>BNOV</span> vadovas</span></p>" + "<p>" + bnovTel + "<br><span><span class='bnov'>BNOV</span> vadovo telefonas</span></p>" + "<p>" + bnovVadyb + "<br><span>Namo priežiūros vadybininkas:</span></p>" + "<p style='display:none;'>" + bnovVadybTel + "<br><span>Namo priežiūros vadybininko telefonas</span></p>" + "<p>" + skundSk + "<br><span><span class='bnov'>BNOV</span> gaunamų skundų skaičius</span></p>" + "<p>" + skundPob + "<br><span><span class='bnov'>BNOV</span> gaunamų skundų pobūdis</span></p>" + "<p>" + bnovKodas + " <br><span><span class='bnov'>BNOV</span> kodas</span></p>" + "<p><a href='mailto:" + bnovElP + "' class='email'>" + bnovElP + "</a><br><span><span class='bnov'>BNOV</span> el. paštas</span></p>" + "<p class='info-highlight'><i class='fa fa-exclamation' style='color: #C1272D;'></i>Informacija apie <a href='http://www.vilnius.lt/index.php?4265980094' class='email' target='_blank'>bendrijų steigimą</a></p>";

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

								x: evt.pageX + 2, //AG add padding for mouse hovering and click events
								y: evt.pageY + 2
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

				//get back from comparign block to main block and remove compared layer
				var statsCloseBtn = dom.byId("stats-close");
				statsCloseBtn.addEventListener("click", function () {
					 statusCompare = false; //set compare status mode true
					
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

					//add comapre btn, remove exit btn
					/*							var backCompareDom = "<span class='compare'><p>Norėdami  palyginti du skirtingu pastatus, spūstelkite žemiau esantį mygtuką ir palyginimui žemėlapyje pažymėkite naują pastatą.</p><div id='compare-btn' class='bt'><a class='button'><i class='fa fa-angle-left' aria-hidden='true'></i> Pasirinkite sekantį pastatą palyginimui</a></div></span><div id='build-inner-stat-table'></div>"; 
												dom.byId("compare-btn-block").innerHTML = backCompareDom; */


					//domConstruct.destroy("tooltip-span"); // AG destroy tooltip
					window.location.hash = '#build-data'; //AG get back

					map.removeLayer(layerBuildignsCompare);
					layerBuildignsCompare = {}; //AG BUG fix, beacause removeLayer doesn't completely remove layer from map (layer is still accesible with getLayer(layerid) method)

					dom.byId("build-inner-stat-table").innerHTML = ""; //when closing block remove compare table
					featureBuildings.enableMouseEvents(); //enable first buildings featureLayer mouse events
				}, false);

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


				//QueryTask for comparing: namo bendrieji tarifai
				var buildingAdministrationTaskCompare = new QueryTask("http://zemelapiai.vplanas.lt/arcgis/rest/services/TESTAVIMAI/Pastatu_administravimas_test/MapServer/1");
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
						ntrunC;

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
						//console.log(t);

						dom.byId("build-inner-stat-table").innerHTML = buildCompareAdministrators;
						window.location.hash = '#build-statistics'; //show statistcs block								
					});
				}
			}
			var compareBtn = dom.byId("compare-btn");
			compareBtn.addEventListener("click", compareAdm, false);

			//End compare different administrators


			//checking valid url for documents
			//AG TODO sukurti dokumentu einamuju metu atributo irasa, kiekviena kart ikeliant dokumentus i serveri
			var urlStack = {
				ilgalaikisPlanas: "http://zemelapiai.vplanas.lt/Statiniai/Adm_Stat/" + (parseInt(einMetai, 10) + 1) + "/IP_" + ntrun + ".pdf",
				ukinisPlanas: "http://zemelapiai.vplanas.lt/Statiniai/Adm_Stat/" + (parseInt(einMetai, 10) + 1) + "/P_" + ntrun + ".pdf",
				metineVeiklosAtaskaita: "http://zemelapiai.vplanas.lt/Statiniai/Adm_Stat/" + (parseInt(einMetai, 10) + 1) + "/AT_" + ntrun + ".pdf"
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
							console.log(StackStatusTemp);
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
			var attachmentTask = new QueryTask("http://zemelapiai.vplanas.lt/arcgis/rest/services/TESTAVIMAI/Pastatu_administravimas_test/MapServer/5");
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
					for(i; i < features.length; i +=1) {
						var name = "";
						name += i;
						
						//Add attachment anchor with  unique onclick function
						attachmentsHtml += "<p><span class='anchor-tag' href='' onclick='attachmentsObj[" + i + "](" +i+")'>" + features[i].attributes.att_title +  "</span></p>";

						attachmentsObj[name] = function(i) {
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
							var blob = new Blob([byteArray], {type: blobType});

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
			

			var buildHelp = "<h3>" + adresas + "<br></h3>" + "<p>Turite pasiūlymų ar pastabų? Matote klaidų?</p> <p>Susisiekite el. paštu: <a href='mailto:pastatai@vilnius.lt'>pastatai@vilnius.lt</a></p><p>Norėdami pateikti duomenys apie konkretų pastatą, kviečiame užpildyti <a href='http://zemelapiai.vplanas.lt/Statiniai/Adm_Stat/lentele.xlsx'>duomenų suvedimo lentelę</a> ir persiųsti aukščiau nurodytu el. pašto adresu.</p><p>Informacija apie <a href='http://www.vilnius.lt/index.php?4265980094' target='_blank'>bendrijų steigimą</a></p>";

			dom.byId("build-inner-h").innerHTML = buildHelp;

			var buildImpInfo = "<h3>" + adresas + "<br></h3>" + "<p><a href='http://www.vilnius.lt/index.php?4265980094' target='_blank'> Bendrijų steigimas </a></p><p><a href='http://www.vilnius.lt/index.php?1568645331' target='_blank'>Jungtinės veiklos sutarties sudarymas</a></p><p><a href='http://www.vilnius.lt/index.php?4278773191' target='_blank'>Administratoriaus keitimas</a></p>";

			dom.byId("build-inner-imp-i").innerHTML = buildImpInfo;

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
					datasets: [
						{
							label: "Atliekų tarifai",
							fillColor: "rgba(84,59,13,0.2)",
							strokeColor: "rgba(212,203,188,1)",
							pointColor: "rgba(212,203,188,1)",
							pointStrokeColor: "#fff",
							pointHighlightFill: "#fff",
							pointHighlightStroke: "rgba(212,203,188,1)",
							data: atliekTarifai
								},

						{
							label: "Lifto techninės priežiūros tarifai Eur/m²",
							fillColor: "rgba(151, 187, 205, 0.6)",
							strokeColor: "rgba(151, 187, 205, 1)",
							pointColor: "rgba(151, 187, 205, 1)",
							pointStrokeColor: "#fff",
							pointHighlightFill: "#fff",
							pointHighlightStroke: "rgba(151,187,205,1)",
							data: liftuPriezTarifai
								},
						{
							label: "Namo techninės priežiūros tarifai Eur/m²",
							fillColor: "rgba(154, 195, 146, 0.6)",
							strokeColor: "rgba(154, 195, 146, 1)",
							pointColor: "rgba(154, 195, 146, 1)",
							pointStrokeColor: "#fff",
							pointHighlightFill: "#fff",
							pointHighlightStroke: "rgba(220, 220, 220, 1)",
							data: namoPriezTarifai
								},
						{
							label: "Namo šildymo sistemų priežiūros tarifai Eur/m²",
							fillColor: "rgba(222, 135, 71, 0.6)",
							strokeColor: "rgba(222, 135, 71, 1)",
							pointColor: "rgba(222, 135, 71, 1)",
							pointStrokeColor: "#fff",
							pointHighlightFill: "#fff",
							pointHighlightStroke: "rgba(222, 135, 71, 1)",
							data: namoSildPriezTarifai
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
							runHeatGraph(duomenysSilumosGrafikui);
						}, 50);

						//AG last year total consumption, devided from 7 months
						//alert(statusCompare);
						if (statusCompare) {

							heatingGraphData.paskutiniaiMetai = typeof heatingGraphData.paskutiniaiMetai === "undefined" ? totalLastYearCompared = "Nėra duomenų" : totalLastYearCompared = (heatingGraphData.paskutiniaiMetai.reduce(function (a, b) {
								return a + b;
							}) / 7).toFixed(3);
						} else {
							totalLastYear = heatingGraphData.paskutiniaiMetai.reduce(function (a, b) {
								return a + b;
							});
							totalLastYear = (totalLastYear / 7).toFixed(3);
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
			if (typeof(tooltip) != "undefined") {
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
					/*padding: {
						x: 10, 
						y: 10
					},*/
					x: evt.pageX + 2, //AG add padding for mouse hovering and click events
					y: evt.pageY + 2
				});
		});
		on(featureBuildings, "mouse-out", function () {
			tooltip.destroy();
		});	
	});
};