goog.provide('jchemhub.view.BondRenderer');
goog.require('jchemhub.view.Renderer');
goog.require('jchemhub.math.Line');

/**
 * Class to render a bond object to a graphics object
 * 
 * @constructor
 * @param graphics
 *            {goog.graphics.AbstractGraphics} graphics to draw on.
 * @extends {jchemhub.view.Renderer}
 */
jchemhub.view.BondRenderer = function(controller, graphics, opt_config, defaultConfig) {
	jchemhub.view.Renderer.call(this, controller, graphics, opt_config,
			jchemhub.view.BondRenderer.defaultConfig);
}
goog.inherits(jchemhub.view.BondRenderer, jchemhub.view.Renderer);
/**
 * 
 * @param {jchemhub.model.Bond} bond
 * @param {jchemhub.graphics.AffineTransform} transform
 * @return {goog.graphics.GroupElement}
 */
jchemhub.view.BondRenderer.prototype.render = function(bond, transform) {
	this.transform = transform;

};

jchemhub.view.BondRenderer.prototype.highlightOn = function(bond, opt_group) {

	var strokeWidth = this.config.get("bond").stroke.width * 2;
	var color = this.config.get("highlight").color;
	var stroke = new goog.graphics.Stroke(strokeWidth, color);
	var fill = null;
	var radius = this.config.get("highlight").radius
			* this.transform.getScaleX();
	var theta = -jchemhub.view.BondRenderer.getTheta(bond) * 180 / Math.PI;
	var angle = theta + 90;

	var arcExtent;
	if (theta <= 0) {
		arcExtent = (bond.source.coord.y <= bond.target.coord.y) ? 180 : -180;
	} else {
		arcExtent = (bond.source.coord.y > bond.target.coord.y) ? 180 : -180;
	}

	var coords = this.transform.transformCoords( [ bond.source.coord,
			bond.target.coord ]);

	var path = new goog.graphics.Path();
	path.arc(coords[0].x, coords[0].y, radius, radius, angle, arcExtent);
	path.arc(coords[1].x, coords[1].y, radius, radius, angle, -arcExtent);

	if (!opt_group) {
		opt_group = this.graphics.createGroup();
	}
	this.graphics.drawPath(path, stroke, fill, opt_group);
	return opt_group;
}

/**
 * 
 * @return{number} bond angle of elevation
 */
jchemhub.view.BondRenderer.getTheta = function(bond) {
	return new jchemhub.math.Line(bond.source.coord, bond.target.coord)
			.getTheta();
}


jchemhub.view.BondRenderer.hasSymbol = function(atom) {
    return (atom.symbol != "C" || atom.countBonds() == 1);
}

/**
 * A default configuration for renderer
 */
jchemhub.view.BondRenderer.defaultConfig = {
	'bond' : {
		stroke : {
			width : 2,
			color : 'black'
		},
		fill : {
			color : 'black'
		}
	},
	'highlight' : {
		radius : .3,
		color : 'blue'
	}
};



