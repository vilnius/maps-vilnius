var permitsTheme = function(map) {
    var cluster;
    
    require([
        "dojo/on",
        "esri/dijit/Popup",
        "esri/dijit/PopupTemplate",
        "esri/InfoTemplate",
        "dojo/promise/all", "dojo/Deferred",
        "esri/tasks/query",
        "esri/tasks/QueryTask",
        "esri/symbols/SimpleMarkerSymbol",
        "esri/renderers/SimpleRenderer",
        "esri/Color",
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
        SimpleMarkerSymbol,
        SimpleRenderer,
        Color,
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
                    if (linksLength > 1 ) {
                        for (var i = 0; i < linksLength; i++){
                            var adMsg = "<p></i><a href='" + a[i].url + "' target='blank'>" + a[i].icon + "</a></p>";  
                            adMsgComplete += adMsg;
                        }
                    } else if (a[0] === "Dokumentų nėra") { //AG TEMP
                        var adMsg = "<p><i class='fa fa-exclamation'></i><span>" +  a[0] + "</span></p>";
                        adMsgComplete += adMsg;
                    }
                    

                    dom.byId("ad-attachment").innerHTML = adMsgComplete;
                    //map.infoWindow.setContent(adMsg);
                    return a;
                };
    
		        selectedSym = new SimpleMarkerSymbol("circle", 24,
		                        new SimpleLineSymbol(SimpleLineSymbol.STYLE_LONGDASH, new Color([193, 39, 45, 1]), 3),
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
                        "maxSingles": 12000,
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
						console.log(e);
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
						console.log("clusterLayer.geometry: ");
						console.log(clusterLayer.geometry);						
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
							console.log("REDAS");
							console.log(a);
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
	            timer = setTimeout(function() {
                    
                    urLinksArray.length = 0; //AG reset urLinksArray
                    
                    window.clearTimeout(timer);
                    
                    console.log("REZULATATAI");
                    console.log(results);
                    console.log("END REZULATATAI");           
                    var urlBase = "http://www.vilnius.lt/isorei/isorinereklama/files/";
                    var resultsFeaturesA = results.features;
                    //AG check if results has features
                    if (resultsFeaturesA.length != 0) {
                        for (var i = 0; i < resultsFeaturesA.length; i++){
                            var urlDocStyle = results.features[i].attributes.CONTENTTYPE; 

                            var urlId = parseInt(results.features[i].attributes.VLN_REKLAMOS_ID, 10);
                            var urlEnd = results.features[i].attributes.TITLE;
                            var urLinks = urlBase + urlId + "_" + urlEnd;
                            
                            var urlObj = {url: urLinks, icon: docStyle(urlDocStyle)};
                            
                            urLinksArray.push(urlObj);
                            
                            
                            runURL = function (url) {
                                urlLinksStr.call(null, urLinksArray);
                            };
                            setTimeout(function() {
                               runURL(urLinksArray);
                            }, 500);                        
                        }
                    } else {
                        urLinksArray = ["Dokumentų nėra"];
                        
                        runURL = function (url) {
                            urlLinksStr.call(null, urLinksArray);
                        };
                        setTimeout(function() {
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
                        console.log("DEFAS");
                        console.log(queryObject);
                        promise.resolve(queryObject);
                        }, 100);
                    });
                        if ((galiojaKEY === 1) || (galiojaKEY === 3)) {
                            map.infoWindow.setTitle("Galiojantis reklamos registro leidimas " );   //BUG FIX for showing titles               
                            adClusterTemplate.setTitle("Galiojantis reklamos registro leidimas ");   //BUG FIX for showing titles               
                            domClass.contains("ad-popup", "invalid-ad") ? domClass.remove("ad-popup", "invalid-ad") : domClass.add("ad-popup", "valid-ad");
                            domClass.add("ad-popup", "valid-ad");  
                        } else if (galiojaKEY === 2) {
                            map.infoWindow.setTitle("Negaliojantis reklamos registro leidimas "); //BUG FIX for showing titles
                            adClusterTemplate.setTitle("Negaliojantis reklamos registro leidimas "); //BUG FIX for showing titles
                            domClass.contains("ad-popup", "valid-ad") ? domClass.remove("ad-popup", "valid-ad") : domClass.add("ad-popup", "invalid-ad"); 
                            domClass.add("ad-popup", "invalid-ad");  
                        }             
                    console.log("features set");
                    console.log(selected);
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
    
        return cluster = clusterLayer;
        
    });
    
    return cluster;
}