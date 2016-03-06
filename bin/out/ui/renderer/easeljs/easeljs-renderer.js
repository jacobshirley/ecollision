// Generated by CoffeeScript 1.10.0
(function() {
  var EaselJSRenderer, ParticleRenderer, SimulationRenderer,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  ParticleRenderer = require('./particle-renderer');

  SimulationRenderer = require('../simulation-renderer');

  module.exports = EaselJSRenderer = (function(superClass) {
    extend(EaselJSRenderer, superClass);

    function EaselJSRenderer(canvasName, interpolator, settings) {
      this.canvasName = canvasName;
      this.interpolator = interpolator;
      this.settings = settings;
      EaselJSRenderer.__super__.constructor.call(this, this.canvasName, this.interpolator);
      this.stage = new createjs.Stage(this.canvasName);
      this.renderObjs = [];
      this.interpolator.addListener("before-update", (function(_this) {
        return function() {
          var i, len, particle, ref, results;
          ref = _this.renderObjs;
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            particle = ref[i];
            results.push(particle.capture());
          }
          return results;
        };
      })(this));
    }

    EaselJSRenderer.prototype.addParticle = function(particle) {
      var pr;
      pr = new ParticleRenderer(particle, this.settings.simulation.enableSelection);
      this.stage.addChild(pr.displayObj);
      return this.renderObjs.push(pr);
    };

    EaselJSRenderer.prototype.removeParticle = function(particle) {};

    EaselJSRenderer.prototype.draw = function(interpolation) {
      var i, len, particle, ref;
      ref = this.renderObjs;
      for (i = 0, len = ref.length; i < len; i++) {
        particle = ref[i];
        particle.draw(interpolation);
      }
      return this.stage.update();
    };

    return EaselJSRenderer;

  })(SimulationRenderer);

}).call(this);