goog.provide("jchemhub.view.SingleBondDownDrawing");
goog.require("jchemhub.view.BondDrawing");

/**
 * A single bond stereo down graphical element in the reaction editor.
 * 
 * @param {jchemhub.view.Drawing}
 *            parent Drawing object
 * 
 * @constructor
 * @extends {jchemhub.view.BondDrawing}
 */
jchemhub.view.SingleBondDownDrawing = function(x0, y0, x1, y1) {
	jchemhub.view.BondDrawing.call(this, x0, y0, x1, y1);
};
goog.inherits(jchemhub.view.SingleBondDownDrawing, jchemhub.view.BondDrawing);

/**
 * render this drawing and all its children
 */
jchemhub.view.SingleBondDownDrawing.prototype.render = function() {
	
	var bondPath = new goog.graphics.Path();
	var bondStroke = new goog.graphics.Stroke(
			this.getConfig().get("bond").stroke.width, this.getConfig().get(
					"bond").stroke.color);
	var bondFill = null;

	var coords = this.transformCoords(this.getTransform(), [ this._coord0,
			this._coord1 ]);

	bondPath.moveTo(coords[0].x, coords[0].y);
	bondPath.lineTo(coords[1].x, coords[1].y);

	this._elements.push(this.getGraphics().drawPath(bondPath, bondStroke,
			bondFill, this.getGroup()));
	jchemhub.view.SingleBondDownDrawing.superClass_.render.call(this);
}