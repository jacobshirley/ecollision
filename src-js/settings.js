// Generated by CoffeeScript 1.10.0
(function() {
  var ECollisionSettings;

  module.exports = ECollisionSettings = (function() {
    function ECollisionSettings() {}

    ECollisionSettings.prototype.global = {
      refreshRate: 24,
      updateRate: 60,
      showVelocities: false,
      enableInterpolation: true,
      maxTraceLength: 30,
      speedConst: 1.0,
      maxParticles: 10000,
      minRadius: 5,
      maxRadius: 30,
      errorTime: 5000
    };

    ECollisionSettings.prototype.simulation = {
      simulationWidth: 1000,
      simulationHeight: 1000,
      simulationCanvas: "simulation-canvas",
      enableSelection: true
    };

    ECollisionSettings.prototype.graph = {
      graphCanvas: "graph-canvas",
      graphScaleX: 1 / 50,
      graphScaleY: 5,
      graphZoomFactor: 1.25,
      graphMinZoomIndex: 5,
      graphMaxZoomIndex: 5
    };

    ECollisionSettings.prototype.overlay = {
      overlayCanvas: "overlay-canvas"
    };

    return ECollisionSettings;

  })();

}).call(this);
