Renderer = require("./renderer")

module.exports = class InterpolationRenderer extends Renderer
	constructor: ->
		@interpolatables = []

	addInterpolatable: (interpolatable) ->
		@interpolatables.push(interpolatable)

	removeInterpolatable: (interpolatable) ->
		for interpol,i in @interpolatables
			if (interpol == interpolatable)
				interpolatables.splice(i, 1)
				break

	draw: (interpolation) ->
		for interpol in @interpolatables
			interpol.interpolate(interpolation)