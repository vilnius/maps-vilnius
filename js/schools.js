var schoolsTheme = function (map, MAPCONFIG, toolsMeasure, showCursor, horizontalSlider, popup, geometryService) {
	
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