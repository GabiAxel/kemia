goog.provide("jchemhub.view.SingleBondUpDrawing");

/**
 * A single bond stereo up graphical element in the reaction editor.
 * 
 * @param {jchemhub.view.Drawing}
 *            parent Drawing object
 * 
 * @constructor
 * @extends {jchemhub.view.BondDrawing}
 */
jchemhub.view.SingleBondUpDrawing = function(x0, y0, x1, y1) {
	jchemhub.view.BondDrawing.call(this, x0, y0, x1, y1);
};
goog.inherits(jchemhub.view.SingleBondUpDrawing, jchemhub.view.BondDrawing);

/**
 * render this drawing and all its children
 */
jchemhub.view.SingleBondUpDrawing.prototype.render = function() {
	// TTD implement wedge-shape
	var bondPath = new goog.graphics.Path();
	var bondStroke = new goog.graphics.Stroke(
			this.getConfig().get("bond").stroke.width, this.getConfig().get(
					"bond").stroke.color);
	var bondFill = null;
	
	var coords = this.transformCoords(this.getTransform(), [this._coord0, this._coord1]);

	bondPath.moveTo(coords[0].x, coords[0].y);
	bondPath.lineTo(coords[1].x, coords[1].y);

	this.getGraphics()
			.drawPath(bondPath, bondStroke, bondFill, this.getGroup());
	
	jchemhub.view.SingleBondUpDrawing.superClass_.render.call(this);
}