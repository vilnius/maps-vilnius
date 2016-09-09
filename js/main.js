/*
2016-06-21
MV 0.0.2
JS
*/

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
    "esri/renderers/ClassBreaksRenderer", "esri/symbols/PictureMarkerSymbol",
    //Measure
    "esri/dijit/Measurement", "esri/units",
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
		extent: new esri.geometry.Extent(MAPCONFIG.mapExtent),
		//TODO not implemented yet: integrate
		popupProperties: {
			titleInBody: false // showing title outside
		},
		popupDom: domConstruct.create("div", {
			id: "ad-popup"
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
	          
	        this.initLegend(layerInfo, layerDom, layerName);
			// End legend widget

			
			this.initIdentify(layerInfo); // initiate identify visible layers by default
        },
		//initiate legend with correct order
		initLegend: function (layerInfo, layerDom, layerName) {
			var reversed = layerInfo.reverse();
			//legend widget		          
	        if (reversed.length > 0) {
	          var legendDijit = new Legend({
	                map: map,
	                layerInfos: reversed
	            }, "legend-list");
	            legendDijit.startup();
	        }
			
		var that = this;
	    on(layerDom, "click", function(e) {that.updateLayerVisibility(layerName, e, legendDijit, layerInfo);});			
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
				this.updatedIdentify(layerInfo); // initiate identify visible layers by new visibility after update
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
			//layers in reverse order to indetify depending on inputs and legend order
			//var layersReveresed = layerInfo.reverse(); //TODO change it, reverse is slow method
			identifyPerameters = this.getParameters(layerInfo);			
			map.on("click", this.executeIdentify); //TODO remove global map
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

								feature.attributes.layerName = layerName;

								for (var resultAtr in attributes) {
									if (attributes.hasOwnProperty(resultAtr)) {
										//console.log(resultAtr);									
										if (!(resultAtr == "OBJECTID" || resultAtr == "layerName" || resultAtr == "SHAPE" || resultAtr == "SHAPE.area" || resultAtr == "SHAPE.len" || resultAtr == "SHAPE.fid")) { //add layers attributes that you do not want to show
											//AG check for date string
											if (Date.parse(attributes[resultAtr])) {
												var attributeDate = attributes[resultAtr];
												var reg = /(\d+)[.](\d+)[.](\d+)\s.*/; //regex: match number with . char, clear everything else
												content += "<p class='bord'>" + attributes[resultAtr].replace(reg, '$1-$2-$3') + "</br><span>" + resultAtr + "</span>" + "<p>";
											} else {
												var attributeResult = attributes[resultAtr];
												if (attributeResult == null) { //attributes[resultAtr] == null  equals to (attributes[resultAtr]  === undefined || attributes[resultAtr]  === null)
													attributeResult = "-";
												} else if ((attributeResult === " ") || (attributeResult === "Null")) {
													attributeResult = "-";
												}
												content += "<p class='bord'>" + attributeResult + "</br><span>" + resultAtr + "</span>" + "<p>";
											}
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

    var popupDom = domConstruct.create("div", { id: "ad-popup" });  //DONE
    popup = new Popup(popupProperties, popupDom);  //DONE

	
/*	var defaulMarkertSelect = new SimpleMarkerSymbol("circle", 24,
									new SimpleLineSymbol(SimpleLineSymbol.STYLE_LONGDASH, new Color([223, 52, 59, 1]), 3),
									new Color([255, 255, 255, 0]));	
	popup.markerSymbol = defaulMarkertSelect;*/
	
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