goog.provide("jchemhub.view.SingleBondEitherDrawing");

/**
 * A single bond stereo either graphical element in the reaction editor.
 * 
 * @param {jchemhub.model.Bond}
 *            bond
 * 
 * @constructor
 * @extends {jchemhub.view.BondDrawing}
 */
jchemhub.view.SingleBondEitherDrawing = function(bond) {
	jchemhub.view.BondDrawing.call(this, bond);
};
goog.inherits(jchemhub.view.SingleBondEitherDrawing, jchemhub.view.BondDrawing);

/**
 * render this drawing and all its children
 */
jchemhub.view.SingleBondEitherDrawing.prototype.render = function() {
	var path = new goog.graphics.Path();
	var width = this.getConfig().get("bond").stroke.width / 10;
	var theta = this.getTheta();

	var angle_left = theta + (Math.PI / 2);
	var angle_right = theta - (Math.PI / 2);

	var transleft = goog.graphics.AffineTransform.getTranslateInstance(Math
			.cos(angle_left)
			* width, Math.sin(angle_left) * width, 0, 0, 0);

	var transright = goog.graphics.AffineTransform.getTranslateInstance(Math
			.cos(angle_right)
			* width, Math.sin(angle_right) * width, 0, 0, 0);

	var leftside = this.transformCoords(transleft, this.getCoords());
	var rightside = this.transformCoords(transright, this.getCoords());

	var coords = this.transformCoords(this.getTransform(), [ leftside[0],
			leftside[1], rightside[0], rightside[1] ]);

	var stroke = new goog.graphics.Stroke(
			this.getConfig().get("bond").stroke.width, this.getConfig().get(
					"bond").stroke.color);
	var fill = null;

	path.moveTo(coords[0].x, coords[0].y);
	for ( var j = 1, lines = 10; j < lines; j++) {
		if (j % 2) {
			path.lineTo(coords[0].x + (coords[1].x - coords[0].x) * j / lines,
					coords[0].y + (coords[1].y - coords[0].y) * j / lines);
		} else {
			path.lineTo(coords[2].x + (coords[3].x - coords[2].x) * j / lines,
					coords[2].y + (coords[3].y - coords[2].y) * j / lines);
		}
	}

	this._elements.push(this.getGraphics().drawPath(path, stroke, fill,
			this.getGroup()));
	jchemhub.view.SingleBondDownDrawing.superClass_.render.call(this);

}