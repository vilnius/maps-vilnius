var schoolsTheme = function (map, MAPCONFIG, toolsMeasure, showCursor, horizontalSlider) {
	
	require([
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
		var pxWidth = map.extent.getWidth() / map.width; //get main extent of the map for points extent padding
		var featureUrlTeritory = "http://zemelapiai.vplanas.lt/arcgis/rest/services/Interaktyvus_zemelapis/Mokyklos/MapServer/1",
			featureUrlPoint = "http://zemelapiai.vplanas.lt/arcgis/rest/services/Interaktyvus_zemelapis/Mokyklos/MapServer/0",
			featureTeritory = new FeatureLayer(featureUrlTeritory, {
				id: "school-feature-teritory",
				mode: FeatureLayer.MODE_ONDEMAND,
				//maxAllowableOffset: calcOffset(),
				outFields: ["*"]
			}),
			featurePoint = new FeatureLayer(featureUrlPoint, {
				id: "school-feature-point",
				mode: FeatureLayer.MODE_ONDEMAND,
				//maxAllowableOffset: calcOffset(),
				outFields: ["*"]
			}),
			dynamicPoint = new ArcGISDynamicMapServiceLayer("http://zemelapiai.vplanas.lt/arcgis/rest/services/Interaktyvus_zemelapis/Mokyklos/MapServer", { //dyn layer fo the legend
				id: "points-dyn"
			});
			//suspend layer drawing
			dynamicPoint.suspend();
		
		setTimeout(function () {
			var p = document.createElement("p");
			p.innerHtml = "<p class='build-p'>Mokyklų paieška:</p>";
			var sidebar = document.getElementById("dijit_layout_TabContainer_1");
			//sidebar.appendChild(p);
		}, 1600);
		
		
		//Schools geocoder start
		var geocoder = new Search({
			//arcgisGeocoder: false,
			//geocoders: geocoders,
			sources: [{
				locator: new Locator("http://zemelapiai.vplanas.lt/arcgis/rest/services/Lokatoriai/ADRESAI_V1/GeocodeServer"),
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
				placeholder: "Įveskite savo gyvenamą adresą",
				highlightSymbol: new PictureMarkerSymbol("/maps_vilnius/img/map_marker.png", 36, 36).setOffset(0, 12)
		}],
			map: map
		}, "search-schools");
		geocoder.startup();
		//Schools geocoder END
		
		var schoolsTask = new QueryTask("http://zemelapiai.vplanas.lt/arcgis/rest/services/Interaktyvus_zemelapis/Mokyklos/MapServer/1");
		//query for school teritories
		var schoolsQuery = new Query();
		schoolsQuery.outSpatialReference = {
			wkid: 3346
		};
		schoolsQuery.returnGeometry = false;
		schoolsQuery.outFields = ["*"];
		
		//disable search zoom
		geocoder.zoomScale = null;
		
		on(geocoder, "select-result", function(e) {
			//console.log("PAIESKOS REZULTATAI:");
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
			
			addressResult = e.result.name;	
			extentSearchResult = e.result.feature.geometry;
			//run query Task 
			executeSchoolsQueryTask(e);
			
			setTimeout(function() {
				popup.hide(); //let's hide popup after 4 seconds
			}, 4000);
		});
		
		on(geocoder, "search-results", function(e) {	
			dom.byId("schools-info").innerHTML = ""; //remove data on search if exists	
		});
		
		on(geocoder, "clear-search", function () {
			//clear current selection on new search event
			//featurePoint.clearSelection();
			//console.log(geocoder);
			//featurePoint.show();
			dom.byId("schools-info").innerHTML = ""; //remove data on search if exists	

			featurePoint.setOpacity(1);
			var layerSchools = map.getLayer("Mokyklos");

			//remove schools-data dom node
			var dataDom = dom.byId("schools-data");
			dataDom.innerHTML = "";

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
		
		//console.log(geocoder);
		
		function executeSchoolsQueryTask(e) {			
			//AG in order to show selected layer on point extent, add padding to min max values of x,y coordinates 
			schoolsQuery.geometry = e.result.feature.geometry;

			//Execute task
			schoolsTask.execute(schoolsQuery, showResults);
		}
		
		function showResults(results) {
			var queryStringClause = "", // string for query.where statement
				i = 0;
			//console.log("REZULTATAI");
			//console.log(results);
			//console.log(results.features[0].attributes.OBJ_ID);
			
			for (i; i < results.features.length; i += 1) {
				if ((results.features.length - 1  - i) === 0) {
					queryStringClause += "OBJ_ID = '" + results.features[i].attributes.OBJ_ID + "'";
				} else {
					queryStringClause += "OBJ_ID = '" + results.features[i].attributes.OBJ_ID + "' OR ";
				}
			}
			
			//console.log(queryStringClause);
			//query for school points
			var query = new Query();	
			//query.objectIds	= ["OBJ_ID"];
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
			
			featurePoint.selectFeatures(query, FeatureLayer.SELECTION_NEW, function (results) {
				var points = map.getLayer("Mokyklos");
				if (points) {
					map.removeLayer(points);
					points = {};
				}
				//console.log("TASKU REZULTATAI");
				//console.log(results);
				//remove point layer if added previously			


				points = new GraphicsLayer(); //create new school points graphics layer
				points.id = "Mokyklos";
				
				
				schoolCount = results.length;

				//show results number in search content
				var dataDom = dom.byId("schools-data");
				dataDom.innerHTML = "<p class='address'>" + addressResult + "<br><span>Rastas adresas</span></p>"  + "<p class='school-count'><span class='school-no'>" + schoolCount + "</span> <br><span>Priskirtas mokyklų skaičius</span></p>";
				//end show results number in search content 

				featurePoint.setOpacity(0.6);
				//featurePoint.hide();
				var xValues = [];
				var yValues = [];

				arrayUtils.forEach(results, function (result) {
					//console.log(result);
					var language = result.attributes.KALBA;
					//get max min y and x values of each points
					xValues.push(result.geometry.x);
					yValues.push(result.geometry.y);

					//create new point layer with feature attributes and check school language
					switch (language) {
						case "lietuvių":
							points.add(new Graphic(result.geometry, symbolLt, result.attributes));
							break;
						case "rusų":
							points.add(new Graphic(result.geometry, symbolRu, result.attributes));
							break;
						case "lenkų":
							points.add(new Graphic(result.geometry, symbolPl, result.attributes));
							break;
						case "rusų lenkų":
							points.add(new Graphic(result.geometry, symbolRuPl, result.attributes));
							break;
						default:
							points.add(new Graphic(result.geometry, symbolDefault, result.attributes));
							break;
					}
				});
				
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
					//console.log(e);
					var path = e.graphic.attributes;
					var address = path.ADRESAS;
					var lang = path.KALBA;
					var name = path.VARDAS;
					var type = path.TIPAST;
					
					//select points
					pointsSelection(e);					

					dom.byId("schools-info").innerHTML = "<h3>Ugdymo įstaigos duomenys:</h3>" + "<p>" + name + " <br><span>Mokyklos pavadinimas</span></p>" + "<p>" + address + "<br><span>Adresas</span></p>" + "<p>" + lang + "<br><span>Kalba</span></p>" + "<p class='school-type'>" + type + "<br><span>Mokyklos tipas</span></p>";
					

				});
				
				//add points selection Graphic
				function pointsSelection(e) {
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
					
					pointSelected = new GraphicsLayer(); 
					pointSelected.id = "Points selection";
					
					pointSelected.add(new Graphic(e.graphic.geometry, symbolSelectionPoint, e.graphic.attributes));
					
					setTimeout(function () {
						map.addLayer(pointSelected);
					}, 100);
					//show tooltip
					addTooltip(pointSelected);
				}

				//show tooltip 
				addTooltip(points);
				
				//animate svg
				animatePoints(points);
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
				if (typeof (tooltip) != "undefined") {
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
				tooltip.destroy();
			});
		}//End show tooltip
		
		//add svg animation
		function animatePoints(points) {
			var t1;
			var timeline;
			var zoomCount = 0; //count Zoom events
			//add point animation on zoom end 
			setTimeout(function () {
				var pointsSvg = document.getElementById('Mokyklos_layer');
				//console.log(pointsSvg);
				var circlesSvg = pointsSvg.getElementsByTagName('circle');
				//console.log(circlesSvg);

/*				TweenLite.to(circlesSvg, 0.4, {
					scale: 0.5,
					transformOrigin: "50% 50%"
				});*/

				t1 = new TimelineMax({
					paused: true,
					repeat: -1
				});
				timeline = t1.to(circlesSvg, 0.2, {
						scale: 1,
						transformOrigin: "50% 50%",
						//delay: 0.1,
						ease: Power3.easeOut
					})
					.to(circlesSvg, 0.6, {
						scale: 0.5,
						transformOrigin: "50% 50%",
						ease: Power3.easeIn
					}).to(circlesSvg, 0.4, {
						delay: 0.2,
						transformOrigin: "50% 50%",
						scale: 1,
						ease: Power3.easeOut
					});
				
				timeline.play();
			}, 2000);

			

			on(points, "graphic-draw", function () {
				var circlesSvg;
				var pointsSvg;
				if (zoomCount === 1) { //do not run on first graphic drawing while viewing schools points, run only on second and stop animation
					//timeline.stop();
					timeline.kill();
					timeline.remove();
					pointsSvg = document.getElementById('Mokyklos_layer');
					circlesSvg = pointsSvg.getElementsByTagName('circle');
					
					TweenLite.to(circlesSvg, 0.4, {
					scale: 1,
					transformOrigin: "50% 50%"
					});
				}
				zoomCount += 1;
			});		
		}


		// selection symbol used to draw the selected census block points within the buffer polygon
		var symbolSelect = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID, new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([193, 39, 45, 1]), 3), new Color([129, 183, 206, 1]));

		featureTeritory.setSelectionSymbol(symbolSelect);

		//feature layer symbol invisible
		var symbolLayer = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID, new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([78, 78, 78, 0]), 1), new Color([195, 219, 159, 0]));
		
		//set renderer and hide layers
		featureTeritory.setRenderer(new SimpleRenderer(symbolLayer));

		map.addLayers([featureTeritory, featurePoint, dynamicPoint]);
		
		//show cursor on feature layer
		showCursor([featurePoint], arrayUtils);	
		
		//add info on featurePoint click
		on(featurePoint, "click", function (e) {
			//console.log(e);
			var path = e.graphic.attributes;
			var address = path.ADRESAS;
			var lang = path.KALBA;
			var name = path.VARDAS;
			var type = path.TIPAST;
			
			//add featurepoints selection
			featurepointsSelection(e);	

			dom.byId("schools-info").innerHTML = "<h3>Ugdymo įstaigos duomenys:</h3><p>" + name + " <br><span>Mokyklos pavadinimas</span></p>" + "<p>" + address + "<br><span>Adresas</span></p>" + "<p>" + lang + "<br><span>Kalba</span></p>" + "<p class='school-type'>" + type + "<br><span>Mokyklos tipas</span></p>";
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
					//console.log(info);

					if (i === layerId) {
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
					//console.log(layer.layer.id);
					if (layer.layer.id === "points-dyn") {
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
			showLegendInput(dynamicPoint, 0); // theme - Pastatai
			
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