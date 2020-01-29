
requirejs(['./WorldWindShim'], function () {
    "use strict";

    // Tell WorldWind to log only warnings and errors.
    WorldWind.Logger.setLoggingLevel(WorldWind.Logger.LEVEL_WARNING);

    // Make a layer that shows a Path and is shared among the WorldWindows.
    var makePathLayer = function () {
        var pathAttributes = new WorldWind.ShapeAttributes(null);
        pathAttributes.interiorColor = WorldWind.Color.RED;
        pathAttributes.outlineColor= WorldWind.Color.RED;

        var pathPositions = [
            new WorldWind.Position(40, -100, 10), //latitude, longitude, altitude
            new WorldWind.Position(45, -110, 1e4),
            new WorldWind.Position(46, -122, 1e4)
        ];
        var path = new WorldWind.Path(pathPositions);
        path.attributes = pathAttributes;
        path.altitudeMode = WorldWind.RELATIVE_TO_GROUND;
        path.followTerrain = true;

        var pathLayer = new WorldWind.RenderableLayer("Path Layer");
        pathLayer.addRenderable(path);

        return pathLayer;
    };

    // Create the shared shape layer and imagery layer
    var pathLayer = makePathLayer(),
        imageryLayer = new WorldWind.BingAerialWithLabelsLayer(null),
        atmosphereLayer = new WorldWind.AtmosphereLayer();

    var wwd1 = new WorldWind.WorldWindow("canvasOne");
    wwd1.addLayer(imageryLayer);
    wwd1.addLayer(atmosphereLayer);
    wwd1.addLayer(pathLayer);
    // Add a compass layer, view controls layer, and coordinates display layer. Each WorldWindow must have its own.
    //wwd1.addLayer(new WorldWind.CompassLayer());
    //wwd1.addLayer(new WorldWind.CoordinatesDisplayLayer(wwd1));
    //wwd1.addLayer(new WorldWind.ViewControlsLayer(wwd1));

    var wwd2 = new WorldWind.WorldWindow("canvasTwo");
    wwd2.addLayer(imageryLayer);
    //wwd2.addLayer(atmosphereLayer);
    wwd2.addLayer(pathLayer);
    //wwd2.addLayer(new WorldWind.CompassLayer());
    //wwd2.addLayer(new WorldWind.CoordinatesDisplayLayer(wwd2));
    //wwd2.addLayer(new WorldWind.ViewControlsLayer(wwd2));

    var wwd3 = new WorldWind.WorldWindow("canvasThree");
    //wwd3.addLayer(imageryLayer);
    wwd3.addLayer(atmosphereLayer);
    wwd3.addLayer(pathLayer);
    //wwd3.addLayer(new WorldWind.CompassLayer());
    //wwd3.addLayer(new WorldWind.CoordinatesDisplayLayer(wwd3));
    //wwd3.addLayer(new WorldWind.ViewControlsLayer(wwd3));
});