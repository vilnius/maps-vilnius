<!DOCTYPE html>
<html>
  <head>
    <title>Vilniaus m. interaktyvūs žemėlapiai</title>
    <meta charset="utf-8">
    <meta name="viewport" content="initial-scale=1, maximum-scale=1,user-scalable=no">
    <!--2014: Render IE-version as IE9-->
    <meta http-equiv='X-UA-Compatible' content='IE=EmulateIE9'>
    <meta name="robots" content="noindex,nofollow">
    <link rel="shortcut icon" type="image/ico" href="/maps_vilnius/img/favicon.ico">
    <link rel="stylesheet" href="http://js.arcgis.com/3.14/dijit/themes/claro/claro.css">
    <link href='http://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600,700,900,600italic&subset=latin,latin-ext' rel='stylesheet' type='text/css'>
    <link rel="stylesheet" href="http://js.arcgis.com/3.14/esri/css/esri.css">
    <link rel="stylesheet" href="/maps_vilnius/css/page.css">
    <link rel="stylesheet" href="/maps_vilnius/webfont/stylesheet.css">
    <link rel="stylesheet" href="/maps_vilnius/css/font-awesome.min.css">
    <script src="../maps_vilnius/js/Chart.js"></script>
    <script type="text/javascript">
        var dojoConfig = {
            isDebug: true,
            async: true,
            locale: 'lt',
            packages: [
			{
                name: 'app',
                location: window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/')) + '/js'
            }
			]
        };
    </script>
    <script src="http://js.arcgis.com/3.14/"></script>
    <script src="/maps_vilnius/js/permits.js"></script>
    <script src="/maps_vilnius/js/buildings.js"></script>
    <script src="/maps_vilnius/js/main.js"></script>
  </head>
  
  <body class="claro">
  <img id="loading-gif" src="img/vilnius_load.gif" alt="Luktelkite" />

      <div id="mainWindow" data-dojo-type="dijit/layout/BorderContainer" data-dojo-props="design:'sidebar', gutters:false" style="width:100%; height:100%;">
          
        <div id="map" data-dojo-type="dijit/layout/ContentPane" data-dojo-props="splitter:false, region:'center'">
            
            <!--Navigation content-->
            <div id="theme" class="sub-menu module animate color-layers">
                <p>Pasirinkite temą:</p>
                <a href="#theme" class="button close animate" title="Uždaryti">✕</a>
            </div>
            <div id="layers" class="sub-menu module animate color-layers">
                <p>Temos sluoksniai:</p>
                <a href="#layers" class="button close animate" title="Uždaryti">✕</a>
                <div id="layer-list" class="inner"></div>
            </div>
            <div id="legend" class="sub-menu module animate color-layers">
                <p>Sutartiniai ženklai:</p>
                <a href="#legend" class="button close animate" title="Uždaryti">✕</a>
                <div id="legend-list" class="inner"></div>
            </div>
            <div id="tools" class="sub-menu module animate color-layers">
                <p>Pasirinkite įrankį:</p>
                <a href="#tools" class="button close animate" title="Uždaryti">✕</a>
                <div id="tools-measure"></div>
                <div id="tools-opacity">
                    <span>Sluoksnių nepermatomumo valdymas:</span>
                    <div id="tools-opacity-widget"></div>
                </div>
            </div>
            <div id="open-data" class="sub-menu module animate color-layers">
                <p>Atviri duomenys / Open data:</p>
                <a href="#open-data" class="button close animate" title="Uždaryti">✕</a>
                <div class="inner">
                    <p>GIS atvirų duomenų tinklalapyje skelbiami (su galimybe peržiūrėti ir atsisiųsti) vieši Vilniaus miesto savivaldybės GIS duomenys. Duomenis galite atsisiųsti .csv, .kml, .shp formatais.</p>
                    <p><a href="http://gis.opendata.lt/" target="_blank">www.gis.opendata.lt</a></p></div>
                <div id="tools-measure"></div>
            </div>            
            <!--End Navigation content-->
            <!-- Buildings info -->
            <div id="build-data" class="sub-menu module-build animate color-layers">
                <p class="build-p">Pastatų administravimas:</p>
                <a href="#build-data" class="button close animate build-close" title="Uždaryti"><i class="fa fa-angle-right" aria-hidden="true"></i></a>
                <div id="build-inner" class="inner sub-build">
                </div>
            </div> 
                    <!--Inner building blocks-->
                    <div id="build-info" class="sub-menu module-build animate color-layers build-s">
                        <p class="build-p">Bendroji informacija:</p>
                        <a href="#build-data" class="button close animate">Atgal </a>
                        <div id="build-inner-i" class="inner sub-build">
                        </div>
                    </div>
                    <div id="build-manage" class="sub-menu module-build animate color-layers build-s">
                        <p class="build-p">Valdytojų informacija:</p>
                        <a href="#build-data" class="button close animate">Atgal </a>
                        <div id="build-inner-mng" class="inner sub-build">
                        </div>
                    </div>     
                    <div id="build-temp" class="sub-menu module-build animate color-layers build-s">
                        <p class="build-p">Šildymo duomenys:</p>
                        <a href="#build-data" class="button close animate">Atgal </a>
                        <div id="build-inner-t" class="inner sub-build">
                            <div id="build-inner-t-msg" class="inner"></div>
                            <div id="chart-legend-heating"></div>
	                        <div id="chart-graph-heating">
	                        	<canvas id="myChart-heating" width="286" height="326"></canvas> 
	                        </div>                            
                        </div>
                    </div>
                    <div id="build-maintenance" class="sub-menu module-build animate color-layers build-s">
                        <p class="build-p">Priežiūros tarifai:</p>
                        <a href="#build-data" class="button close animate">Atgal </a>
                        <div id="build-inner-m" class="inner sub-build">
                        	<div id="build-inner-m-msg"></div>
	                        <div id="chart-legend"></div>
	                        <div id="chart-graph">
	                        	<canvas id="myChart" width="286" height="326"></canvas> 
	                        </div>
                        </div>                      
                    </div>
                    <div id="build-docs" class="sub-menu module-build animate color-layers build-s">
                        <p class="build-p">Ataskaitos ir planai:</p>
                        <a href="#build-data" class="button close animate">Atgal </a>
                        <div id="build-inner-d" class="inner sub-build">
                        </div>
                    </div>
                    <div id="build-help" class="sub-menu module-build animate color-layers build-s">
                        <p class="build-p">Pagalba</p>
                        <a href="#build-data" class="button close animate">Atgal </a>
                        <div id="build-inner-h" class="inner sub-build">
                        </div>
                    </div>
                    <div id="build-statistics" class="sub-menu module-build animate color-layers build-s">
                        <p class="build-p">Tarifų palyginimas</p>
                        <div id="stats-close"><a href="#build-data" class="button close animate">Atgal </a></div>
                        <div id="build-inner-stat" class="inner sub-build">
                        </div>
                    </div> 
                    <div id="build-imp-info" class="sub-menu module-build animate color-layers build-s">
                        <p class="build-p">Svarbi informacija</p>
                        <a href="#build-data" class="button close animate">Atgal </a>
                        <div id="build-inner-imp-i" class="inner sub-build">
                        </div>
                    </div>			
                    <!--End Inner building blocks-->
            <!-- End Buildings info -->
                    <div id="ortofoto">
                        <div id="ort" style="display:block;"><h4>Ortofoto</h4></div>
                        <div id="zem" style="display:none;"><h4>Žemėlapis</h4></div>
                    </div>
                    <div id="search"></div>
                    <div id="extent">
                        <div data-dojo-type="dijit/form/Button" id="zoomfullext"><i class="xt fa-expand"></i></div>
                    </div>
                    <div id="printwindow">
                        <div data-dojo-type="dijit/layout/TabContainer" style="width: 100%;" doLayout="false">
                            <div data-dojo-type="dijit/layout/ContentPane" title="Spausdinimas" data-dojo-props="selected:true">
                                <div id="note"></div>
                                <!-- print dijit -->
                                <div id="print_button"></div>
                            </div>
                            <div data-dojo-type="dijit/layout/ContentPane" title="D.U.K.">
                                <div id="note">
                                <p><strong>Pritraukimas</strong>: redagavimo rėžime spauskite CTRL  (Windows) arba CMD (Mac)</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div id="vilnius-logo"><img src="/maps_vilnius/img/vilnius_logo_r.png" border="0"></div>
                    <div id="credits">Sukurta <a href="http://www.vilniausplanas.lt/" target="_blank">SĮ Vilniaus planas</a></div>
            
                    <div id="top-menu" class="top-nav maps-nav col app animate col5 modes bottom small pad4x dark fill-denim">
                      <a id="menu-theme"  href="#theme" class="cell line-right button nav-menu icon big">Temos</a>
                      <a id="menu-layers" href="#layers" class="cell line-right button nav-menu icon big animate"><i class="fa fa-list"></i> Sluoksniai</a>
                      <a id="menu-legend" class="cell pad1y button hide-mobile nav-menu line-right col4 icon paint animate" href="#legend"><i class="fa fa-th-large"></i> Žymėjimas </a>
                      <a id="menu-tools" class="cell pad1y button nav-menu hide-mobile line-right col4 icon animate" href="#tools"><i class="fa fa-cog"></i> Įrankiai</a>
                      <a id="menu-open-data" class="cell pad1 button nav-menu hide-mobile col4 icon animate" href="#open-data">Atviri duomenys</a>
                    </div>
        </div>                    
      </div>
	<script>
	  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
	  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
	  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
	  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

	  ga('create', 'UA-73336418-1', 'auto');
	  ga('send', 'pageview');

	</script>
    </body>
</html>