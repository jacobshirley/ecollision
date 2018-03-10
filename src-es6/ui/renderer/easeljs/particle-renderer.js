// Generated by CoffeeScript 2.2.2
var ParticleRenderer;

import Renderer from "../renderer.js";

import Point2D from "../../../math/point-2d.js";

import EventManager from "../../../events/event-manager.js";

import Interpolator from "../../../interpolator.js";

export default ParticleRenderer = (function() {
  class ParticleRenderer extends Renderer {
    constructor(particle, enableSelection) {
      super();
      this.particle = particle;
      this.enableSelection = enableSelection;
      this.displayObj = new createjs.Shape();
      this.lastX = this.particle.x;
      this.lastY = this.particle.y;
      this.selected = false;
      this.displayObj.x = this.particle.x;
      this.displayObj.y = this.particle.y;
      this.displayObj.addEventListener("click", (ev) => {
        if (this.selected) {
          this.fire("deselect", [ev, this]);
          return this.deselect();
        } else {
          this.fire("select", [ev, this]);
          return this.select();
        }
      });
      this.graphics = this.displayObj.graphics;
      this.update();
      EventManager.eventify(this);
    }

    capture() {
      this.lastX = this.particle.x;
      return this.lastY = this.particle.y;
    }

    select() {
      return this.selected = true;
    }

    deselect() {
      this.selected = false;
      return this.pastPositions = [];
    }

    update() {
      var r;
      this.graphics.clear().beginFill(this.particle.style).drawCircle(0, 0, this.particle.radius).endFill();
      r = this.particle.radius;
      return this.displayObj.cache(-r, -r, r * 2, r * 2);
    }

    draw(interpolation) {
      var newX, newY;
      newX = this.particle.x;
      newY = this.particle.y;
      if (interpolation > 0.0) {
        newX = Interpolator.interpolate(this.lastX, newX, interpolation);
        newY = Interpolator.interpolate(this.lastY, newY, interpolation);
      }
      this.displayObj.x = newX;
      this.displayObj.y = newY;
      if (this.particle.needsUpdate) {
        this.particle.needsUpdate = false;
        return this.graphics.clear().beginFill(this.particle.style).drawCircle(0, 0, this.particle.radius).endFill();
      }
    }

  };

  ParticleRenderer.prototype.pastPositions = [];

  ParticleRenderer.prototype.curPos = 0;

  return ParticleRenderer;

}).call(this);
