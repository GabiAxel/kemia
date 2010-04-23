goog.provide("jchemhub.view.BondDrawing");
goog.require("jchemhub.view.Drawing");
goog.require("goog.events");

/**
 * A bond graphical element in the reaction editor.
 * 
 * @param {jchemhub.view.Drawing}
 *            parent Drawing object
 * 
 * @constructor
 * @extends {jchemhub.view.Drawing}
 */
jchemhub.view.BondDrawing = function(x0, y0, x1, y1) {
	jchemhub.view.Drawing.call(this);
	this._coord0 = new goog.math.Coordinate(x0, y0);
	this._coord1 = new goog.math.Coordinate(x1, y1);
};
goog.inherits(jchemhub.view.BondDrawing, jchemhub.view.Drawing);

/**
 * get bond coordinates as an array of goog.math.Coordinates
 */
jchemhub.view.BondDrawing.prototype.getCoordinates = function() {
	return [ this._coord0, this._coord1 ];
};

/**
 * render box to surround BondDrawing
 */
jchemhub.view.BondDrawing.prototype.render = function() {
	// render bond box path
	var fill = new goog.graphics.SolidFill('red', 0.001);
	var stroke = null;
	var radius = this.getConfig().get("highlight").radius;
	var slope = this.perpendicularSlope(new goog.math.Line(this._coord0.x,
			this._coord0.y, this._coord1.x, this._coord1.y));

	// shift centerline of bond by highlight radius to create box around bond
	var trans_a = goog.graphics.AffineTransform.getTranslateInstance(slope.x
			* radius, slope.y * radius);
	var trans_b = goog.graphics.AffineTransform.getTranslateInstance(-slope.x
			* radius, -slope.y * radius);

	var coords_a = this.transformCoords(this.getTransform().clone().concatenate(trans_a), [
			this._coord0, this._coord1 ]);
	var coords_b = this.transformCoords(this.getTransform().clone()
			.concatenate(trans_b), [ this._coord0, this._coord1 ]);

	bondBoxPath = new goog.graphics.Path();
	bondBoxPath.moveTo(coords_a[0].x, coords_a[0].y);
	bondBoxPath.lineTo(coords_a[1].x, coords_a[1].y);
	bondBoxPath.lineTo(coords_b[1].x, coords_b[1].y);
	bondBoxPath.lineTo(coords_b[0].x, coords_b[0].y);
	bondBoxPath.close();

	this.getGraphics().drawPath(bondBoxPath, stroke, fill, this.getGroup());

	// attach event listeners
	goog.events.listen(this.getGroup(), goog.events.EventType.MOUSEOVER,
			this.highlightOn, false, this);
	goog.events.listen(this.getGroup(), goog.events.EventType.MOUSEOUT,
			this.highlightOff, false, this);

};

/**
 * turn on highlighting
 */
jchemhub.view.BondDrawing.prototype.highlightOn = function(e) {
	var drawing = e.currentTarget.drawing;
	var config = drawing.getConfig();
	var strokeWidth = config.get("bond").stroke.width;
	var stroke = new goog.graphics.Stroke(strokeWidth,
			config.get("highlight").color);
	var fill = null
	var radius = config.get("highlight").radius
			* drawing.getTransform().getScaleX();
	var slope = drawing.getBondSlope();

	var angle;
	if (slope.x == 0) {
		angle = 0;
	} else {
		angle = ( -Math.atan(slope.x / slope.y) * 180 / Math.PI);
	}

	var arcExtent;
	if (angle <= 0)
		arcExtent = (drawing._coord0.y <= drawing._coord1.y) ? -180 : 180;
	else
		arcExtent = (drawing._coord0.y > drawing._coord1.y) ? 180 : -180;

	var coords = drawing.transformCoords(drawing.getTransform(), [
			drawing._coord0, drawing._coord1 ]);
	var path = new goog.graphics.Path();
	path
			.arc(coords[0].x, coords[0].y, radius, radius, angle,
					arcExtent);
	path.arc(coords[1].x, coords[1].y, radius, radius, angle,
			-arcExtent);

	if (!drawing.bondHightlightGroup) {
		drawing.bondHightlightGroup = drawing.getGraphics().createGroup();
	}
	drawing.getGraphics().drawPath(path, stroke, fill,
			drawing.bondHightlightGroup);

};
/**
 * turn off highlighting
 */
jchemhub.view.BondDrawing.prototype.highlightOff = function(e) {
	if (e.currentTarget.drawing.bondHightlightGroup) {
		e.currentTarget.drawing.bondHightlightGroup.clear();
	}
};

/**
 * Calculates normalized slope of
 * 
 * @param {goog.math.Line}
 *            line
 * @return {goog.math.Coordinate} of slope
 */
jchemhub.view.BondDrawing.prototype.normalSlope = function(line) {
	var delta_y = line.y0 - line.y1;
	var delta_x = line.x0 - line.x1;
	if (delta_x != 0) {
		delta_y = delta_y / delta_x;
		delta_x = 1;
	} else {
		delta_y = 1;
	}

	return new goog.math.Coordinate(delta_x, delta_y);
};

jchemhub.view.BondDrawing.prototype.getBondSlope = function() {
	return this.normalSlope(new goog.math.Line(this._coord0.x, this._coord0.y,
			this._coord1.x, this._coord1.y));
}

/**
 * Calculates perpedicular normalized slope of
 * 
 * @param {goog.math.Line}
 *            line
 * @return {goog.math.Coordinate} of slope
 */
jchemhub.view.BondDrawing.prototype.perpendicularSlope = function(line) {
	var s = this.normalSlope(line);
	return new goog.math.Coordinate(-s.y, s.x)
};