/** Michael's Placemark thing */

requirejs(['./WorldWindShim',      //Gets WorldWind object from WorldWind.js
        './LayerManager'],         //Makes the buttons on the left do something with the LayerManager object
    function (WorldWind, LayerManager) {

        // Create the WorldWindow.
        var wwd = new WorldWind.WorldWindow("canvasOne");

        //Add the layers
        wwd.addLayer(new WorldWind.BingAerialWithLabelsLayer(null));
        wwd.addLayer(new WorldWind.AtmosphereLayer());
        wwd.addLayer(new WorldWind.CoordinatesDisplayLayer(wwd));

        // Image for placemark
        // https://i.imgur.com/f3d66UH.png

        //create layer for the placemark
        var placemarkLayer = new WorldWind.RenderableLayer("Placemarks");
        var latitude = 47.684444;
        var longitude = -121.129722;

        // Set up the common placemark attributes.
        var placemarkAttributes = new WorldWind.PlacemarkAttributes(null);
        placemarkAttributes.imageScale = 1;
        placemarkAttributes.imageOffset = new WorldWind.Offset( WorldWind.OFFSET_FRACTION, 0.3, WorldWind.OFFSET_FRACTION, 0.0);
        placemarkAttributes.imageColor = WorldWind.Color.WHITE;
        placemarkAttributes.labelAttributes.offset = new WorldWind.Offset( WorldWind.OFFSET_FRACTION, 0.5, WorldWind.OFFSET_FRACTION, 1.0);
        placemarkAttributes.labelAttributes.color = WorldWind.Color.YELLOW;
        placemarkAttributes.drawLeaderLine = true;
        placemarkAttributes.leaderLineAttributes.outlineColor = WorldWind.Color.RED;


        // Create the placemark and its label.
        var placemark;
        placemark = new WorldWind.Placemark(new WorldWind.Position(latitude, longitude, 100), true, null);
        placemark.label = "My placemark" + "\n" + "Lat " + placemark.position.latitude.toPrecision(4).toString() + "\n" + "Lon " + placemark.position.longitude.toPrecision(5).toString();
        placemark.altitudeMode = WorldWind.RELATIVE_TO_GROUND;

        // Create the placemark attributes for this placemark. Note that the attributes differ only by their
        // image URL.
        placemarkAttributes = new WorldWind.PlacemarkAttributes(placemarkAttributes);
        placemarkAttributes.imageSource = "https://i.imgur.com/f3d66UH.png";
        placemark.attributes = placemarkAttributes;


        highlightAttributes = new WorldWind.PlacemarkAttributes(placemarkAttributes);
        highlightAttributes.imageScale = 1.2;
    placemark.highlightAttributes = highlightAttributes;

        // Add the placemark to the layer.
        placemarkLayer.addRenderable(placemark);


        // Add the placemarks layer to the WorldWindow's layer list.
        wwd.addLayer(placemarkLayer);


        // Create a layer manager for controlling layer visibility.
        var layerManager = new LayerManager(wwd);
    });