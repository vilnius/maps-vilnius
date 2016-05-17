/*
2016-05-05
MV 0.0.1
JS
*/

var MAPCONFIG = {
    mapSettings: {

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
}

//get unique array values
Array.prototype.getUnique = function(){
   var u = {}, a = [];
   for(var i = 0, l = this.length; i < l; ++i){
	  if(u.hasOwnProperty(this[i])) {
		 continue;
	  }
	  a.push(this[i]);
	  u[this[i]] = 1;
   }
   return a;
}

//temporary: Hash toggle, reload, new page,
window.location.hash = '#';

require([
    "esri/map",
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
    "esri/symbols/SimpleMarkerSymbol",
    "esri/renderers/SimpleRenderer",
    "esri/Color",
    /*END Grid */
    "esri/request",
    "dojo/dom",
    "dojo/dom-construct",
    "dojo/dom-class",
    //TOC START
    "esri/renderers/ClassBreaksRenderer",
    //Measure
    "esri/dijit/Measurement", "esri/units",
    //TOC END
    "esri/dijit/Geocoder",
    "esri/symbols/SimpleFillSymbol", "esri/symbols/SimpleMarkerSymbol",  "esri/renderers/SimpleRenderer", "esri/symbols/SimpleLineSymbol", "esri/Color", "esri/geometry/Extent",
        //cluster
		"app/clusterfeaturelayer", "esri/graphic", "esri/graphicsUtils", "dojo/dom-style", "dojo/_base/fx", "dojo/fx/easing",
    "esri/dijit/Scalebar",
    "esri/layers/LayerInfo",
    "dijit/layout/TabContainer",
    "dijit/layout/BorderContainer",
    "dijit/layout/ContentPane",
    "dojo/domReady!"
], function(
    Map,
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
    SimpleMarkerSymbol,
    SimpleRenderer,
    Color,
    /*END Grid */
    esriRequest,
    dom,
    domConstruct,
    domClass,
    //SimpleFillSymbol, 
    ClassBreaksRenderer,
    //TOC,
    //Measure
    Measurement, Units,
    Geocoder, SimpleFillSymbol, SimpleMarkerSymbol, SimpleRenderer, SimpleLineSymbol, Color, Extent, 
        //cluster
        ClusterFeatureLayer, Graphic, graphicsUtils, domStyle, fx, easing,
    Scalebar,
    LayerInfo
) {

    //DOM to dijit
    parser.parse();
    
    
    //AG  current theme
    CONTROL.currenthemeLabel();
    
    var loadGif = dom.byId("loading-gif"); 
    
    var extent = new esri.geometry.Extent(MAPCONFIG.mapExtent);

    var popupProperties = {
        titleInBody: false // showing title outside
    };

    var popupDom = domConstruct.create("div", { id: "ad-popup" });
    var popup = new Popup(popupProperties, popupDom);

    map = new Map("map", {
        extent: extent,
        logo: false,
        showAttribution: false,
        zoom: 5,
        infoWindow: popup,
        nav: false // hides Pan Arrows
    });

    var navToolbar = new Navigation(map);
    var extentCenter = dojo.byId("zoomfullext");
	
    on(extentCenter, "click", function() {
        //navToolbar.zoomToFullExtent(); //AG buggy, switching to centerAndZoom
        var location = extent.getCenter();
        map.centerAndZoom(location, 0);
        console.log("CENTER COORD:" + JSON.stringify(location));
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

    //esriConfig.defaults.io.proxyUrl = "proxy/proxy.php";
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
    var layer = new ArcGISDynamicMapServiceLayer(dynUrl, {
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
    map.addLayer(baseMaps[0]);
    
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
    
    // Ortofoto toggle	
    basemap.show();
    ortofoto.hide();

    map.addLayer(baseMaps[1]);
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
    
    // Add Permits theme	            
    if (CONTROL.currentTheme("theme") === "ad"){           
        var permitsCluster = permitsTheme(map);
        //map.addLayer(permitsCluster);
        map.on("layer-add-result", function(e) {
           console.log("PERMITS LAYER"); 
           console.log(e); 
        });
    }
    //End Add Permits theme
	else {
		buildingsTheme(map, featureBuildings, toolsMeasure, featBuildingsUrl, CONTROL.showCursor);
	}

    map.on("update-start", function () {
          esri.show(loadGif);          
    });

    map.on("update-end", function () {
        esri.hide(loadGif);
    });
 
    //check url query theme and add/remove layers
    if (CONTROL.currentTheme() === "ad"){
	     map.addLayers([advertsDynLayer]);
    } else { 
    	map.addLayers([layer]);
    }
    
    //Opacity slider
    require(["esri/dijit/HorizontalSlider"], function(HorizontalSlider ) {
        var horizontalSlider = new HorizontalSlider({
            labels: ["0 %", "100 %"],
            value: 90,
            minimum: 0,
            maximum: 100,
            intermediateChanges: true,
            discreteValues: 100,
            showButtons: false,
            onChange: function(value) {
				if (CONTROL.currentTheme() === "ad"){
					permitsCluster.setOpacity(value / 100);
				} else {
                	featureBuildings.setOpacity(value / 100);
                    layer.setOpacity(value / 100);					
				}
            }
        }, "tools-opacity-widget");
        horizontalSlider.startup();
        
        //AG initiate layers default opacity 
        featureBuildings.setOpacity(horizontalSlider.value / 10);
        layer.setOpacity(horizontalSlider.value / 10);
    }); 
    //End Opacity slider
    
    var visible = [];
    

    on(map, 'onZoomEnd', function() {
        maxOffset = calcOffset();
        layer.setMaxAllowableOffset(maxOffset);
    });

    function calcOffset() {
        return (map.extent.getWidth() / map.width);
    }

    map.infoWindow.resize(350, 400);

    //Geocoder START
    var geocoder = new Geocoder({
        map: map,
        autoComplete: true,
        highlightLocation: true,
        arcgisGeocoder: {
            sourceCountry: "LT",
            placeholder: "Gatvė arba adresas"
        }      
    }, "search");
    geocoder.startup();
    //Geocoder END				
    
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
            layer.setVisibleLayers(visible);
            
              
            
            // if layer is switched off, refresh legend and show only visible layers
            //refresh building theme or advertise theme
            var currentTheme = CONTROL.currentTheme() === "ad" ? {layer:advertsDynLayer} : {layer:layer};
            legendDijit.refresh([currentTheme]); //show refreshed legend only from current Theme     

    }
    
    //legend
    map.on("layers-add-result", function (evt) {
	    
	    //create / control inputs and legend of each theme
	    function showLegendInput(layerName, layerId) {
	        var items = arrayUtils.map(layerName.layerInfos, function(info, i) {
	             console.log(info);
	             
	             //TEMP 
	             //Pastatai: input for second Layer
	             //Reklama: input for first layer
	             if (i === layerId) {
	             
	                //Sukuriam inputus, labelius su dojo checkbox
	                  checkBox = new CheckBox({
	                  class: "layers-labels",
	                  checked: info.defaultVisibility ? "checked=checked" : "",
	                  id:  info.id.toString()
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
	             
	            console.log(visible);
	            
	             
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
	        layer.setVisibleLayers(visible);
	        on(ll, "click", updateLayerVisibility);  
	        
	        //legend
	        layerInfo = arrayUtils.map(evt.layers, function (layer, index) {
	          return {layer: layer.layer, title: "Įjungti sluoksniai"};
	    });
	          
	        console.log(evt);
	        if (layerInfo.length > 0) {
	            legendDijit = new Legend({
	                map: map,
	                layerInfos: layerInfo
	            }, "legend-list");
	            legendDijit.startup();
	        } 
	        
	        
	        console.log("layerInfo matomi sluoksniai: " + layerInfo[0].layer.visibleLayers);
	        //legend visibility toggle
	        
	        console.log(layer.visibleLayers);
        }
        
	    //check url query theme and run create/control inputs and legend of each theme
	    if (CONTROL.currentTheme() === "ad"){
		    showLegendInput(advertsDynLayer, 0);
	    } else { 
	    	showLegendInput(layer, 1); // theme - Pastatai
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
    document.getElementById("credits").innerHTML  = year + " m. | VMS interaktyvūs žemėlapiai | <a href='http://www.vilniausplanas.lt/' target='_blank'>SĮ Vilniaus planas</a>";

    //Mouse cursor
	var activeLayers = [featureBuildings, advertsFeatureLayer];
	CONTROL.showCursor(activeLayers, arrayUtils);
    //END Mouse cursor  
});