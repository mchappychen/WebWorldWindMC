/** Michael's Placemark thing */

requirejs(['./WorldWindShim',      //Gets WorldWind object from WorldWind.js
        './LayerManager'],         //Makes the buttons on the left do something with the LayerManager object
    function (WorldWind, LayerManager) {

        // Create the WorldWindow.
        var wwd = new WorldWind.WorldWindow("canvasOne");

        //Add the default layers
        wwd.addLayer(new WorldWind.BingAerialWithLabelsLayer(null));
        wwd.addLayer(new WorldWind.AtmosphereLayer());
        wwd.addLayer(new WorldWind.CoordinatesDisplayLayer(wwd));

        // Image for placemark: https://i.imgur.com/f3d66UH.png

        //create the layer for the placemark
        var placemarkLayer = new WorldWind.RenderableLayer("Placemarks");
        var latitude = 41.4532221;
        var longitude = -74.4375256;


        // Create the placemark and its label.
        var placemark = new WorldWind.Placemark(new WorldWind.Position(latitude, longitude, 100), true, null);
        placemark.label = "My placemark" + "\n" + "Lat " + placemark.position.latitude.toPrecision(4).toString() + "\n" + "Lon " + placemark.position.longitude.toPrecision(5).toString();
        placemark.altitudeMode = WorldWind.RELATIVE_TO_GROUND;

        // Set up the common placemark attributes.
        var placemarkAttributes = new WorldWind.PlacemarkAttributes(null);
        placemarkAttributes.imageScale = 0.1;
        placemarkAttributes.imageOffset = new WorldWind.Offset( WorldWind.OFFSET_FRACTION, 0.3, WorldWind.OFFSET_FRACTION, 0.0);
        placemarkAttributes.labelAttributes.offset = new WorldWind.Offset( WorldWind.OFFSET_FRACTION, 0.5, WorldWind.OFFSET_FRACTION, 1.0);
        placemarkAttributes.drawLeaderLine = true;
        placemarkAttributes.leaderLineAttributes.outlineColor = WorldWind.Color.RED;
        placemarkAttributes.imageSource = "https://i.imgur.com/f3d66UH.png";
        placemark.attributes = placemarkAttributes;

        // Add the placemark to the layer.
        placemarkLayer.addRenderable(placemark);

        // Add the placemarks layer to the WorldWindow's layer list.
        wwd.addLayer(placemarkLayer);

        // Create a layer manager for controlling layer visibility.
        var layerManager = new LayerManager(wwd);
    });