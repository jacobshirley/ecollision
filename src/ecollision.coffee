import SimulationEngine from "./engine/simulation-engine";
import Simulation from "./ui/simulation";
import Graph from "./ui/graph";
import Overlay from "./ui/overlay"
import ECollisionSettings from "./settings";
import EventManager from "./events/event-manager";
import Interpolator from "./interpolator";

export default class ECollision
    constructor: (@settings) ->
        @engine = new SimulationEngine(@settings.simulation.simulationWidth, @settings.simulation.simulationHeight, @settings)

        @interpol = new Interpolator(@settings.global.refreshRate, @settings.global.updateRate)
        @interpol.lockFPS = true

        @simulationUI = new Simulation(@settings.simulation.simulationCanvas, @engine, @interpol, @settings)
        @graphUI = new Graph(@settings.graph.graphCanvas, @engine, 1/50, 5, @settings)
        @overlayUI = new Overlay(@settings.overlay.overlayCanvas, @simulationUI, @interpol, @settings)

        @paused = false

        @fpsCount = @fps = @fpsTime = 0
        @updateRate = @updateTime = @refreshTime = 0

        @widgets = [@simulationUI, @graphUI, @overlayUI]

        @interpol.addListener("update", () =>
            if (!@paused)
                @update()
        ).addListener("render", @tick)

        @updateRate = @settings.global.updateRate
        @updateTime = 1000.0 / @updateRate
        @refreshTime = 1000 / @settings.global.refreshRate

        EventManager.eventify(@)

    start: ->
        for widget in @widgets
            widget.init()

        @interpol.start()

    restart: ->
        for widget in @widgets
            widget.restart()

    resume: ->
        @paused = false

        for widget in @widgets
            widget.resume()

    pause: ->
        @paused = true

        for widget in @widgets
            widget.pause()

    stop: ->
        if (@thread != -1)
            clearInterval(@thread)

            @thread = -1

    getUpdateRate: ->
        return @updateRate

    getUpdateTime: ->
        return @updateTime

    setUpdateRate = (rate) ->
        @updateRate = rate
        @updateTime = 1000.0 / @updateRate

    setSpeedConst = (speedConst) ->
        @engine.speedConst = speedConst

    update: ->
        @engine.update()

    tick: (interpolation) =>
        @fpsCurTime = Date.now();
        @fpsCount++

        if (@fpsCurTime - @fpsTime >= 1000)
            @fps = @fpsCount

            @fpsCount = 0
            @fpsTime = @fpsCurTime

        for widget in @widgets
            widget.draw(interpolation)

        @fire('tick', [interpolation])
