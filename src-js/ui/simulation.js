// Generated by CoffeeScript 1.10.0
(function() {
  var EaselJSRenderer, EventManager, Particle, Simulation, Widget,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Widget = require("./widget");

  Particle = require('../objects/particle');

  EventManager = require("../events/event-manager");

  EaselJSRenderer = require("./renderer/easeljs/easeljs-renderer");

  module.exports = Simulation = (function(superClass) {
    extend(Simulation, superClass);

    Simulation.prototype.selected = null;

    function Simulation(canvasName, engine, interpolator, settings) {
      this.engine = engine;
      this.interpolator = interpolator;
      this.settings = settings;
      Simulation.__super__.constructor.call(this, canvasName);
      this.engine.width = this.width;
      this.engine.height = this.height;
      this.renderer = new EaselJSRenderer(this.canvasName, this.interpolator, this.settings);
      EventManager.eventify(this);
    }

    Simulation.prototype.resize = function(newWidth, newHeight) {
      return this.engine.setBounds(newWidth, newHeight);
    };

    Simulation.prototype.addParticle = function(x, y, mass, radius, style) {
      var particle;
      particle = new Particle(x, y, radius, style, this.settings);
      particle.mass = mass;
      this.renderer.addParticle(particle);
      particle.addListener("select", (function(_this) {
        return function(ev, particle) {
          return _this.selected = particle;
        };
      })(this)).addListener("deselect", (function(_this) {
        return function(ev, particle) {
          return _this.selected = null;
        };
      })(this));
      this.engine.particles.push(particle);
      return particle;
    };

    Simulation.prototype.removeParticle = function(index) {
      var i, j, len, p, ref, results;
      if (typeof index === "object") {
        this.renderer.removeParticle(index);
        ref = this.engine.particles;
        results = [];
        for (i = j = 0, len = ref.length; j < len; i = ++j) {
          p = ref[i];
          if (p === index) {
            this.engine.particles.splice(i, 1);
            break;
          } else {
            results.push(void 0);
          }
        }
        return results;
      } else {
        this.renderer.removeParticle(this.engine.particles[index]);
        return this.engine.particles.splice(index, 1);
      }
    };

    Simulation.prototype.loadParticles = function(toBeLoaded) {
      var j, len, obj, particle, results;
      this.restart();
      results = [];
      for (j = 0, len = toBeLoaded.length; j < len; j++) {
        obj = toBeLoaded[j];
        particle = this.addParticle(obj.x, obj.y, obj.mass, obj.radius, obj.style);
        particle.xVel = obj.xVel;
        particle.yVel = obj.yVel;
        results.push(particle.cOR = obj.cOR);
      }
      return results;
    };

    Simulation.prototype.saveParticles = function(saved) {
      var j, len, particle, ref, results;
      ref = this.engine.particles;
      results = [];
      for (j = 0, len = ref.length; j < len; j++) {
        particle = ref[j];
        results.push(saved.push(particle.copy()));
      }
      return results;
    };

    Simulation.prototype.removeSelected = function() {
      var i, j, len, particle, ref;
      if (this.selected !== null) {
        ref = this.particles;
        for (i = j = 0, len = ref.length; j < len; i = ++j) {
          particle = ref[i];
          if (particle === this.selected) {
            this.removeParticle(i);
          }
        }
        return this.selected = null;
      }
    };

    Simulation.prototype.getSelected = function() {
      return this.selected;
    };

    Simulation.prototype.restart = function() {
      this.renderer.clear();
      this.selected = null;
      this.engine.reset();
      return this.fire("restart");
    };

    Simulation.prototype.draw = function(interpolation) {
      this.renderer.draw(interpolation);
      return this.fire("draw");
    };

    return Simulation;

  })(Widget);

}).call(this);
