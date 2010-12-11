goog.require('goog.testing.jsunit');
goog.require('kemia.graphics.AffineTransform');
goog.require('goog.math.Coordinate');

function testCreateInverse() {
	var t = new kemia.graphics.AffineTransform(28.507215396883762, 0, 0,
			-28.507215396883762, 102.57113357145245, 156.78968468286087);
	var input = new goog.math.Coordinate(0, 1.5);
	var result = t.transformCoords([ input ]);
	var i = t.createInverse();
	assertEquals(input.x, i.transformCoords(result)[0].x);
	assertEquals(input.y, i.transformCoords(result)[0].y);
}