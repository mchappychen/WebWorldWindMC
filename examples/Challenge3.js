/** Michael's Placemark thing */

requirejs(['./WorldWindShim',      //Gets WorldWind object from WorldWind.js
        './LayerManager'],         //Makes the buttons on the left do something with the LayerManager object
    function (WorldWind, LayerManager) {


        var wwd = new WorldWind.WorldWindow("canvasOne");
        wwd.addLayer(new WorldWind.BingAerialWithLabelsLayer(null));
        wwd.addLayer(new WorldWind.AtmosphereLayer());
        wwd.addLayer(new WorldWind.CoordinatesDisplayLayer(wwd));
        var placemarkLayer = new WorldWind.RenderableLayer("Placemarks");

        /* Add some placemarks */
        for(let i=0;i<5;i++){
                var placemark = new WorldWind.Placemark(new WorldWind.Position(41.4532221, -74.4375256-3*i, 100), true, null);
                placemark.label = "My placemark" + "\n" + "Lat " + placemark.position.latitude.toPrecision(4).toString() + "\n" + "Lon " + placemark.position.longitude.toPrecision(5).toString();
                placemark.altitudeMode = WorldWind.RELATIVE_TO_GROUND;
                var placemarkAttributes = new WorldWind.PlacemarkAttributes(null);
                placemarkAttributes.imageScale = 0.1;
                placemarkAttributes.imageOffset = new WorldWind.Offset( WorldWind.OFFSET_FRACTION, 0.3, WorldWind.OFFSET_FRACTION, 0.0);
                placemarkAttributes.labelAttributes.offset = new WorldWind.Offset( WorldWind.OFFSET_FRACTION, 0.5, WorldWind.OFFSET_FRACTION, 1.0);
                placemarkAttributes.drawLeaderLine = true;
                placemarkAttributes.leaderLineAttributes.outlineColor = WorldWind.Color.RED;
                placemarkAttributes.imageSource = "https://i.imgur.com/f3d66UH.png";
                placemark.attributes = placemarkAttributes;
                placemarkLayer.addRenderable(placemark);
        }
        wwd.addLayer(placemarkLayer);

        let pickedItems = [];
        let popupLayer = new WorldWind.RenderableLayer("Popups");

        var handleClick = function(o){
                var pickList = wwd.pick(wwd.canvasCoordinates(o.clientX, o.clientY));
                if(pickedItems.length > 0){
                        let clickedOnPlacemark = false;
                        for(let i=0;i<pickList.objects.length;i++){
                                if(pickList.objects[i].userObject instanceof WorldWind.Placemark){
                                        clickedOnPlacemark = true;
                                }
                        }
                        if(clickedOnPlacemark){
                                for(let i=0;i<pickList.objects.length;i++){
                                        if(pickList.objects[i].userObject instanceof WorldWind.Placemark) {
                                                var annotationAttributes = new WorldWind.AnnotationAttributes(null);
                                                annotationAttributes.cornerRadius = 14;
                                                annotationAttributes.backgroundColor = WorldWind.Color.BLUE;
                                                annotationAttributes.drawLeader = true;
                                                annotationAttributes.leaderGapWidth = 40;
                                                annotationAttributes.leaderGapHeight = 50;
                                                annotationAttributes.opacity = 1;
                                                annotationAttributes.scale = 1;
                                                annotationAttributes.width = 200;
                                                annotationAttributes.height = 100;
                                                annotationAttributes.textAttributes.color = WorldWind.Color.WHITE;
                                                annotationAttributes.insets = new WorldWind.Insets(10, 10, 10, 10);
                                                // Set a location for the annotation to point to and create it.
                                                var location = pickList.objects[i].position;
                                                var annotation = new WorldWind.Annotation(location, annotationAttributes);
                                                // Text can be assigned to the annotation after creating it.
                                                annotation.label = "Sample popup with text here";
                                                pickedItems.push(annotation);
                                                popupLayer.addRenderable(annotation);
                                        }
                                }
                        } else {
                                for(let i=0;i<pickedItems.length;i++){
                                        pickedItems[i].enabled = false;
                                }
                                pickedItems = [];
                        }

                        wwd.redraw();
                } else {
                        for(let i=0;i<pickList.objects.length;i++){
                                if(pickList.objects[i].userObject instanceof WorldWind.Placemark){
                                        if(pickedItems.length > 0){
                                                pickedItems[0].enabled = false;
                                                pickedItems = [];
                                        } else {
                                                var annotationAttributes = new WorldWind.AnnotationAttributes(null);
                                                annotationAttributes.cornerRadius = 14;
                                                annotationAttributes.backgroundColor = WorldWind.Color.BLUE;
                                                annotationAttributes.drawLeader = true;
                                                annotationAttributes.leaderGapWidth = 40;
                                                annotationAttributes.leaderGapHeight = 50;
                                                annotationAttributes.opacity = 1;
                                                annotationAttributes.scale = 1;
                                                annotationAttributes.width = 200;
                                                annotationAttributes.height = 100;
                                                annotationAttributes.textAttributes.color = WorldWind.Color.WHITE;
                                                annotationAttributes.insets = new WorldWind.Insets(10, 10, 10, 10);
                                                // Set a location for the annotation to point to and create it.
                                                var location = pickList.objects[i].position;
                                                var annotation = new WorldWind.Annotation(location, annotationAttributes);
                                                // Text can be assigned to the annotation after creating it.
                                                annotation.label = "Sample popup with text here";
                                                pickedItems.push(annotation);
                                                popupLayer.addRenderable(annotation);
                                        }
                                }
                        }
                }
        }
        wwd.addLayer(popupLayer);

        wwd.addEventListener("click", handleClick);

        // Create a layer manager for controlling layer visibility.
        var layerManager = new LayerManager(wwd);
    });



