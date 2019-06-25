/*
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
    "esri/InfoTemplate",
    "esri/layers/FeatureLayer",
    /*START Grid */
    "dojo/promise/all",
    "dijit/form/CheckBox",
    "dijit/registry",
    /*END Grid */
    "dojo/dom",
    "dojo/dom-construct",
    "dojo/dom-class",
    "esri/symbols/PictureMarkerSymbol",
    //Measure
    "esri/dijit/Measurement", "esri/units",
    "esri/dijit/Search", "esri/tasks/locator",
    "esri/symbols/SimpleFillSymbol", "esri/symbols/SimpleMarkerSymbol",  "esri/renderers/SimpleRenderer", "esri/symbols/SimpleLineSymbol", "esri/Color", "esri/geometry/Extent",
	"esri/tasks/GeometryService",
    //cluster
    "esri/dijit/Scalebar",
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
    InfoTemplate,
    FeatureLayer,
    /*START Grid */
    all,
    CheckBox,
    registry,
    dom,
    domConstruct,
    domClass,
    //SimpleFillSymbol,
    PictureMarkerSymbol,
    //Measure
    Measurement, Units,
    Search, Locator, SimpleFillSymbol, SimpleMarkerSymbol, SimpleRenderer, SimpleLineSymbol, Color, Extent,
	GeometryService,
    Scalebar,
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
	esriConfig.defaults.io.corsEnabledServers.push("https://gis.vplanas.lt");
	
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
		url: "https://gis.vplanas.lt/arcgis/rest/services/Lokatoriai/ADRESAI_V1/GeocodeServer",
		name: "Vilniaus adresai"
	}];

   var geocoder = new Search({
		//arcgisGeocoder: false,
		//geocoders: geocoders,
		sources: [{
			locator: new Locator("https://gis.vplanas.lt/arcgis/rest/services/Lokatoriai/PAIESKA_COMPOSITE/GeocodeServer"),
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

	var permitsCluster;
    // Add custom themes
	switch (CONTROL.currentTheme("theme")) {
		case "ad": //add permits theme
			map.on("layer-add-result", function(e) {
				permitsCluster = permitsTheme(map);	
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

	 if ((CONTROL.currentTheme() === "ad") || (CONTROL.currentTheme() === "theme-buildings") || (CONTROL.currentTheme() === null) || (CONTROL.currentTheme() === "")){
	    //create / control inputs and legend of each theme
	  	var showLegendInput = function(layerName, layerId) {
	        var items = arrayUtils.map(layerName.layerInfos, function (info, i) {
				var checkBox;
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

	        //if (layerInfo.length > 0) {
	        if (layerInfo.length < 2) { //TEMP do not show legend for base layers
	            legendDijit = new Legend({
	                map: map,
	                layerInfos: layerInfo
	            }, "legend-list");
	            legendDijit.startup();
	        }
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
	});
});
