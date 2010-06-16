goog.provide('jchemhub.controller.plugins.ArrowPlusEdit');
goog.require('jchemhub.controller.Plugin');
goog.require('goog.debug.Logger');

/**
 * @constructor
 * @extends{jchemhubn.controller.Plugin}s
 */
jchemhub.controller.plugins.ArrowPlusEdit = function() {
	this.activeCommand = {};
	jchemhub.controller.Plugin.call(this);
}
goog.inherits(jchemhub.controller.plugins.ArrowPlusEdit,
		jchemhub.controller.Plugin);

/**
 * Commands implemented by this plugin.
 * 
 * @enum {string}
 */
jchemhub.controller.plugins.ArrowPlusEdit.COMMAND = {
	EDIT_ARROW : 'editArrow',
	EDIT_PLUS : 'editPlus'
};

/**
 * Inverse map of execCommand strings to
 * {@link jchemhub.controller.plugins.ArrowPlusEdit.COMMAND} constants. Used to
 * determine whether a string corresponds to a command this plugin handles
 * 
 * @type {Object}
 * @private
 */
jchemhub.controller.plugins.ArrowPlusEdit.SUPPORTED_COMMANDS_ = goog.object
		.transpose(jchemhub.controller.plugins.ArrowPlusEdit.COMMAND);

/** @inheritDoc */
jchemhub.controller.plugins.ArrowPlusEdit.prototype.isSupportedCommand = function(
		command) {
	return command in jchemhub.controller.plugins.ArrowPlusEdit.SUPPORTED_COMMANDS_;
};

/** @inheritDoc */
jchemhub.controller.plugins.ArrowPlusEdit.prototype.getTrogClassId = goog.functions
		.constant("ArrowPlusEdit");

/**
 * sets atom symbol.
 * 
 * @param {string}
 *            command Command to execute.
 * @return {Object|undefined} The result of the command.
 */
jchemhub.controller.plugins.ArrowPlusEdit.prototype.execCommandInternal = function(
		command, value, active) {
	this.logger.info(command + " active: " + active);
	this.activeCommand[command] = active;
};

/**
 * The logger for this class.
 * 
 * @type {goog.debug.Logger}
 * @protected
 */
jchemhub.controller.plugins.ArrowPlusEdit.prototype.logger = goog.debug.Logger
		.getLogger('jchemhub.controller.plugins.ArrowPlusEdit');

jchemhub.controller.plugins.ArrowPlusEdit.prototype.handleArrowMouseDown = function(
		e) {
	if (this.activeCommand[jchemhub.controller.plugins.ArrowPlusEdit.COMMAND.EDIT_ARROW]) {
		this.editorObject.dispatchBeforeChange();
		this.dragArrow(e);
		this.editorObject.dispatchChange();
	}
}

jchemhub.controller.plugins.ArrowPlusEdit.prototype.handleMouseDown = function(
		e) {
	if (this.activeCommand[jchemhub.controller.plugins.ArrowPlusEdit.COMMAND.EDIT_ARROW]) {
		this.editorObject.dispatchBeforeChange();
		var trans = this.editorObject.reactionRenderer.moleculeRenderer.transform
				.createInverse();
		var coords = trans.transformCoords( [ new goog.math.Coordinate(
				e.clientX, e.clientY) ]);
		this.editorObject.getModels()[0].addArrow(coords[0]);
		this.editorObject.setModels(this.editorObject.getModels());
		this.editorObject.dispatchChange();
	} else if (this.activeCommand[jchemhub.controller.plugins.ArrowPlusEdit.COMMAND.EDIT_PLUS]) {
		this.editorObject.dispatchBeforeChange();
		var trans = this.editorObject.reactionRenderer.moleculeRenderer.transform
				.createInverse();
		var coords = trans.transformCoords( [ new goog.math.Coordinate(
				e.clientX, e.clientY) ]);
		this.editorObject.getModels()[0].addPlus(coords[0]);
		this.editorObject.setModels(this.editorObject.getModels());
		this.editorObject.dispatchChange();
	}
}

jchemhub.controller.plugins.ArrowPlusEdit.prototype.dragArrow = function(e) {
	this.logger.info("dragArrow");
	var coord = e.coord;
	var d = new goog.fx.Dragger(e.group);
	d._prevX = e.clientX;
	d._prevY = e.clientY;
	d._startX = e.clientX;
	d._startY = e.clientY;

	d.coord = coord;
	d.group = e.group;
	d.addEventListener(goog.fx.Dragger.EventType.DRAG, function(e) {

		// goog.array.forEach(d.molecule.getChildren(), function(child) {
			// var g_trans = child.getGroup().getTransform();
			// var newX = e.clientX - d._prevX + g_trans.getTranslateX();
			// var newY = e.clientY - d._prevY + g_trans.getTranslateY();
			// child.getGroup().setTransformation(newX, newY, 0, 0, 0);
			// });
			var trans = d.group.transform;
			var newX = e.clientX - d._prevX + trans.getTranslateX();
			var newY = e.clientY - d._prevY + trans.getTranslateY();
			d.group.setTransformation(newX, newY, 0, 0, 0);

			d._prevX = e.clientX;
			d._prevY = e.clientY;

		});
	d.addEventListener(goog.fx.Dragger.EventType.END, function(e) {
		// var trans = new goog.graphics.AffineTransform.getTranslateInstance(
			// e.clientX - d._startX, e.clientY - d._startY);
			//
			// d.molecule.transformDrawing(trans);
			d.dispose();
		});
	d.startDrag(e);
};
