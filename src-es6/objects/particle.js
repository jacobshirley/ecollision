// Generated by CoffeeScript 2.2.2
var Particle;

import PhysicsObject from "./physics-object";

import Point2D from "../math/point-2d";

export default Particle = (function() {
  class Particle extends PhysicsObject {
    constructor(x, y, radius, style, settings) {
      super(x, y, 0);
      this.radius = radius;
      this.style = style;
      this.settings = settings;
    }

    update() {
      this.x += this.xVel * this.settings.global.speedConst;
      return this.y += this.yVel * this.settings.global.speedConst;
    }

    copy() {
      var p;
      p = new Particle(this.x, this.y, this.radius, this.style, this.settings);
      p.index = this.index;
      p.cOR = this.cOR;
      p.mass = this.mass;
      p.xVel = this.xVel;
      p.yVel = this.yVel;
      return p;
    }

  };

  Particle.prototype.cOR = 1.0;

  Particle.prototype.renderer = null;

  return Particle;

}).call(this);
