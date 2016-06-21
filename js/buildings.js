var buildingsTheme = function (map, featureBuildings, toolsMeasure, featBuildingsUrl, showCursor) {

	require([
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
		buildingAdministration = new Query();
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

			var buildMsg = "<h3>" + adresas + "</h3>" + "<p>" + ntrunStr + "<br><span>Unikalus numeris</span></p>" + "<p>" + statM + "<br><span>Statybos metai</span></p>" + "<p>" + nrPlane + "<br><span>Korpusas</span></p>" + "<p>" + statPask + "<br><span>Namo paskirtis</span></p>" + "<p class='build-bt build-top'><a href='#build-info' class='animate'>Bendroji informacija</a></p><p class='build-bt'><a href='#build-manage' class='animate'>Valdytojų informacija</a></p><p class='build-bt'><a href='#build-temp' id='build-temp-bt' class='animate'>Šildymo duomenys / Renovacija</a></p><p class='build-bt'><a href='#build-maintenance' class='animate'>Namo priežiūros tarifai</a></p><p class='build-bt'><a href='#build-docs' class='animate'>Ataskaitos ir planai</a></p><p class='build-bt'><a href='#build-statistics' class='animate'>Tarifų palyginimas</a></p><p class='build-bt'><a href='#build-help' class='animate'>Pagalba ir duomenų suvedimas</a></p><p class='build-bt'><a href='#build-imp-info' class='animate'>Svarbi informacija</a></p>";

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
				"<div id='compare-btn-block'><span id='start-compare' class='compare'><p>Norėdami  palyginti du skirtingu pastatus, spūstelkite žemiau esantį mygtuką ir palyginimui žemėlapyje pažymėkite naują pastatą .</p><div id='compare-btn' class='bt animate'><a class='button'><i class='fa fa-angle-left' aria-hidden='true'></i>Pasirinkite sekantį pastatą palyginimui</a></div>" + "<h4 class='border-top'>Skirtingų administratorių vid. tarifų palyginimas:</h4>" + "<div id='selection-list'></div></span><div id='build-inner-stat-table'></div></div><div id='bar-legend'></div><canvas id='myBarChart' width='433' height='833'></canvas>" + "<div id='bar-tips'></div>";

			dom.byId("build-inner-stat").innerHTML = buildCompare;

			//compare different administrators
			//AG last year total consumption
			//AG last year total consumption
			var totalLastYear; //current buildings' consumption
			var totalLastYearCompared; //compared buildgins' consumption
			var statusCompare = false; // true if using Comparing mode
			//special tooltips for cursors
			function compareTooltip() {
				tip = domConstruct.toDom("<span id='tooltip-span'>Pažymėkite kitą pastatą palyginimui</span>");

				domConstruct.place(tip, "map");

				var tooltip = document.querySelectorAll('#tooltip-span');

				map.on('mouse-move', function (e) {
					for (var i = tooltip.length; i--;) {
						tooltip[i].style.display = "block";
						tooltip[i].style.left = e.pageX + 'px';
						tooltip[i].style.top = e.pageY + 'px';

					}
				}, false);

				map.on('mouse-over', function (e) {
					for (var i = tooltip.length; i--;) {
						tooltip[i].style.display = "block";
						tooltip[i].style.left = e.pageX + 'px';
						tooltip[i].style.top = e.pageY + 'px';
						//map.setMapCursor("pointer");							
					}
				}, false);

				map.on('mouse-drag', function (e) {
					for (var i = tooltip.length; i--;) {
						tooltip[i].style.left = e.pageX + 'px';
						tooltip[i].style.top = e.pageY + 'px';
						//map.setMapCursor("grabbing");
						//map.setMapCursor("-webkit-grabbing");
					}
				}, false);

				map.on('mouse-out', function (e) {
					for (var i = tooltip.length; i--;) {
						tooltip[i].style.display = "none";
					}
				}, false);

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

				compareTooltip();

				//get back from comparign block to main block and remove compared layer
				var statsCloseBtn = dom.byId("stats-close");
				statsCloseBtn.addEventListener("click", function () {
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


					domConstruct.destroy("tooltip-span"); // AG destroy tooltip
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

			var buildDocs = "<h3>" + adresas + "<br></h3>";

			dom.byId("build-inner-d").innerHTML = buildDocs;

			var buildHelp = "<h3>" + adresas + "<br></h3>" + "<p>Turite pasiūlymų ar pastabų? Matote klaidų?</p> <p>Susisiekite el. paštu: <a href='mailto:pastatai@vilnius.lt'>pastatai@vilnius.lt</a></p><p>Norėdami pateikti duomenys apie konkretų pastatą, kviečiame užpildyti <a href='http://zemelapiai.vplanas.lt/Statiniai/Adm_Stat/lentele.xlsx'>duomenų suvedimo lentelę</a> ir persiųsti aukščiau nurodytu el. pašto adresu.</p><p>Informacija apie <a href='http://www.vilnius.lt/index.php?4265980094' target='_blank'>bendrijų steigimą</a></p>";

			dom.byId("build-inner-h").innerHTML = buildHelp;

			var buildImpInfo = "<h3>" + adresas + "<br></h3>" + "<p><a href='http://www.vilnius.lt/index.php?4265980094' target='_blank'> Bendrijų steigimas </a></p><p><a href='http://zemelapiai.vplanas.lt/Statiniai/Adm_Stat/2015-08-05_Nr_831_Administravimo_nauji_nuostatai.docx' target='_blank'>Administratoriaus teisės ir pareigos</a></p><p><a href='http://www.vilnius.lt/index.php?4278773191' target='_blank'>Administratoriaus keitimas</a></p><p><a href='http://www3.lrs.lt/pls/inter3/dokpaieska.showdoc_l?p_id=478769&p_tr2=2' target='_blank'>Valdytojų priežiūros ir kontrolės pavyzdinės taisyklės</a></p><p><a href='http://www.vilnius.lt/vaktai2011/DefaultLite.aspx?Id=3&DocId=30247240' target='_blank'>Vilniaus valdytojų priežiūros ir kontrolės taisyklės </a></p><p><a href='http://www.vtpsi.lt/node/1060' target='_blank'>STR 1.12.08:2010 „Statinių naudojimo priežiūros tvarkos aprašas“</a></p>";

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
	});
};