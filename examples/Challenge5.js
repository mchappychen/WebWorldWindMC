/** Make drop down menu by using accordion method via bootstrap library. Thye drop down menu will have at least 2 sub levels. There will be a toggle switch next to the bottom level of the menu, that will show/hide the placemark layer */

requirejs(['./WorldWindShim',      //Gets WorldWind object from WorldWind.js
        './LayerManager'],         //Makes the buttons on the left do something with the LayerManager object
    function (WorldWind, LayerManager) {



        var wwd = new WorldWind.WorldWindow("canvasOne");
        wwd.addLayer(new WorldWind.BingAerialWithLabelsLayer(null));
        wwd.addLayer(new WorldWind.AtmosphereLayer());
        wwd.addLayer(new WorldWind.CoordinatesDisplayLayer(wwd));
        var placemarkLayer = new WorldWind.RenderableLayer("Placemarks");




        var placemarks = [];

        //Add 2 placemarks
        var placemark = new WorldWind.Placemark(new WorldWind.Position(41.4532221, -74.4375256, 100), true, null);
        placemark.label = "My College";
        placemark.altitudeMode = WorldWind.RELATIVE_TO_GROUND;
        var placemarkAttributes = new WorldWind.PlacemarkAttributes(null);
        placemarkAttributes.imageScale = 0.1;
        placemarkAttributes.imageOffset = new WorldWind.Offset( WorldWind.OFFSET_FRACTION, 0.3, WorldWind.OFFSET_FRACTION, 0.0);
        placemarkAttributes.labelAttributes.offset = new WorldWind.Offset( WorldWind.OFFSET_FRACTION, 0.5, WorldWind.OFFSET_FRACTION, 1.0);
        placemarkAttributes.drawLeaderLine = true;
        placemarkAttributes.leaderLineAttributes.outlineColor = WorldWind.Color.RED;
        placemarkAttributes.imageSource = "https://i.imgur.com/f3d66UH.png";
        placemark.attributes = placemarkAttributes;
        placemark.popupHTML = "<h1>My Home</h1>Welcome to my home guys.";
        placemarkLayer.addRenderable(placemark);
        placemarks.push(placemark);

        var placemark = new WorldWind.Placemark(new WorldWind.Position(41.4532221, -71.4375256, 100), true, null);
        placemark.label = "Random Place";
        placemark.altitudeMode = WorldWind.RELATIVE_TO_GROUND;
        var placemarkAttributes = new WorldWind.PlacemarkAttributes(null);
        placemarkAttributes.imageScale = 0.1;
        placemarkAttributes.imageOffset = new WorldWind.Offset( WorldWind.OFFSET_FRACTION, 0.3, WorldWind.OFFSET_FRACTION, 0.0);
        placemarkAttributes.labelAttributes.offset = new WorldWind.Offset( WorldWind.OFFSET_FRACTION, 0.5, WorldWind.OFFSET_FRACTION, 1.0);
        placemarkAttributes.drawLeaderLine = true;
        placemarkAttributes.leaderLineAttributes.outlineColor = WorldWind.Color.RED;
        placemarkAttributes.imageSource = "https://i.imgur.com/f3d66UH.png";
        placemark.attributes = placemarkAttributes;
        placemark.popupHTML = "This is a totally random place in Rhode Island<img src='https://i.imgur.com/f3d66UH.png'>";
        placemarkLayer.addRenderable(placemark);
        placemarks.push(placemark);

        wwd.addLayer(placemarkLayer);

        // Add the CSS for the modal popup
        var modalCSS = document.createElement("style");
        modalCSS.innerHTML = '.modal {\n' +
                '  display: none; /* Hidden by default */\n' +
                '  position: fixed; /* Stay in place */\n' +
                '  z-index: 10; /* Sit on top */\n' +
                '  padding-top: 100px; /* Location of the box */\n' +
                '  left: 0;\n' +
                '  top: 0;\n' +
                '  width: 100%; /* Full width */\n' +
                '  height: 100%; /* Full height */\n' +
                '  overflow: auto; /* Enable scroll if needed */\n' +
                '  background-color: rgb(0,0,0); /* Fallback color */\n' +
                '  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */\n' +
                '}\n' +
                '\n' +
                '/* Modal Content */\n' +
                '.modal-content {\n' +
                '  background-color: #fefefe;\n' +
                '  margin: auto;\n' +
                '  padding: 20px;\n' +
                '  border: 1px solid #888;\n' +
                '  width: 80%;\n' +
                '}\n' +
                '\n' +
                '/* The Close Button */\n' +
                '.close {\n' +
                '  color: #aaaaaa;\n' +
                '  float: right;\n' +
                '  font-size: 28px;\n' +
                '  font-weight: bold;\n' +
                '}\n' +
                '\n' +
                '.close:hover,\n' +
                '.close:focus {\n' +
                '  color: #000;\n' +
                '  text-decoration: none;\n' +
                '  cursor: pointer;\n' +
                '}';
        document.head.append(modalCSS);


        //Create a modal for each popup
        for(let i=0;i<placemarks.length;i++){
            var modal = document.createElement("div");
            modal.className = "modal";
            modal.id = placemarks[i].label;
            modal.innerHTML = "<div class='modal-content'><span class='close' onclick='this.parentElement.parentElement.style.display=\"none\";'>x</span>"+placemarks[i].popupHTML+"</div>";
            document.body.append(modal);
        }


            // Web Map Service information from NASA's Near Earth Observations WMS
            var serviceAddress = "https://neo.sci.gsfc.nasa.gov/wms/wms?SERVICE=WMS&REQUEST=GetCapabilities&VERSION=1.3.0";
            // Named layer displaying Average Temperature data
            var layerName = "MOD_LSTD_CLIM_M";

            var wmsLayer;

            // Called asynchronously to parse and create the WMS layer
            var createLayer = function (xmlDom) {
                    // Create a WmsCapabilities object from the XML DOM
                    var wms = new WorldWind.WmsCapabilities(xmlDom);
                    // Retrieve a WmsLayerCapabilities object by the desired layer name
                    var wmsLayerCapabilities = wms.getNamedLayer(layerName);
                    // Form a configuration object from the WmsLayerCapability object
                    var wmsConfig = WorldWind.WmsLayer.formLayerConfiguration(wmsLayerCapabilities);
                    // Modify the configuration objects title property to a more user friendly title
                    wmsConfig.title = "Average Surface Temp";
                    // Create the WMS Layer from the configuration object
                    wmsLayer = new WorldWind.WmsLayer(wmsConfig);

                    // Add the layers to WorldWind and update the layer manager
                    wwd.addLayer(wmsLayer);
                    layerManager.synchronizeLayerList();
            };

            // Called if an error occurs during WMS Capabilities document retrieval
            var logError = function (jqXhr, text, exception) {
                    console.log("There was a failure retrieving the capabilities document: " + text + " exception: " + exception);
            };

            $.get(serviceAddress).done(createLayer).fail(logError);

        var handleClick = function(o){
                var pickList = wwd.pick(wwd.canvasCoordinates(o.clientX, o.clientY));
                        for(let i=0;i<pickList.objects.length;i++){
                                if(pickList.objects[i].userObject instanceof WorldWind.Placemark){
                                        var modal = document.getElementById(pickList.objects[i].userObject.label);
                                        modal.style.display = "block";
                                }
                        }
        }
        wwd.addEventListener("click", handleClick);

        $("#hidePlacemarks")[0].onclick = function(){
                console.log("why");
                wmsLayer.enabled = !wmsLayer.enabled;
                wwd.redraw();
        };

        // Create a layer manager for controlling layer visibility.
        var layerManager = new LayerManager(wwd);
    });



