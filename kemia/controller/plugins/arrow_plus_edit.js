goog.provide('kemia.controller.plugins.ArrowPlusEdit');
goog.require('kemia.controller.Plugin');
goog.require('goog.debug.Logger');
goog.require('kemia.model.Arrow');
goog.require('kemia.model.Plus');

/**
 * @constructor
 * @extends{kemian.controller.Plugin}s
 */
kemia.controller.plugins.ArrowPlusEdit = function() {
	this.activeCommand = {};
	kemia.controller.Plugin.call(this);
}
goog.inherits(kemia.controller.plugins.ArrowPlusEdit, kemia.controller.Plugin);
goog.exportSymbol("kemia.controller.plugins.ArrowPlusEdit",
		kemia.controller.plugins.ArrowPlusEdit);

/**
 * Commands implemented by this plugin.
 * 
 * @enum {string}
 */
kemia.controller.plugins.ArrowPlusEdit.COMMAND = {
	EDIT_ARROW : 'editArrow',
	EDIT_PLUS : 'editPlus'
};

/**
 * Inverse map of execCommand strings to
 * {@link kemia.controller.plugins.ArrowPlusEdit.COMMAND} constants. Used to
 * determine whether a string corresponds to a command this plugin handles
 * 
 * @type {Object}
 * @private
 */
kemia.controller.plugins.ArrowPlusEdit.SUPPORTED_COMMANDS_ = goog.object
		.transpose(kemia.controller.plugins.ArrowPlusEdit.COMMAND);

/** @inheritDoc */
kemia.controller.plugins.ArrowPlusEdit.prototype.isSupportedCommand = function(
		command) {
	return command in kemia.controller.plugins.ArrowPlusEdit.SUPPORTED_COMMANDS_;
};

/** @inheritDoc */
kemia.controller.plugins.ArrowPlusEdit.prototype.getTrogClassId = goog.functions
		.constant("ArrowPlusEdit");

/**
 * sets active
 * 
 * @param {string}
 *            command Command to execute.
 * @return {Object|undefined} The result of the command.
 */
kemia.controller.plugins.ArrowPlusEdit.prototype.execCommandInternal = function(
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
kemia.controller.plugins.ArrowPlusEdit.prototype.logger = goog.debug.Logger
		.getLogger('kemia.controller.plugins.ArrowPlusEdit');

kemia.controller.plugins.ArrowPlusEdit.prototype.handleMouseDown = function(e) {
	try {

		if (this.activeCommand[kemia.controller.plugins.ArrowPlusEdit.COMMAND.EDIT_ARROW]) {
			this.editorObject.dispatchBeforeChange();
			var trans = this.editorObject.reactionRenderer.moleculeRenderer.transform
					.createInverse();
			var coords = trans.transformCoords( [ new goog.math.Coordinate(
					e.offsetX, e.offsetY) ]);
			this.editorObject.getModels()[0].addArrow(new kemia.model.Arrow(
					coords[0]));
			this.editorObject.setModels(this.editorObject.getModels());
			this.editorObject.dispatchChange();
		} else if (this.activeCommand[kemia.controller.plugins.ArrowPlusEdit.COMMAND.EDIT_PLUS]) {
			this.editorObject.dispatchBeforeChange();
			var trans = this.editorObject.reactionRenderer.moleculeRenderer.transform
					.createInverse();
			var coords = trans.transformCoords( [ new goog.math.Coordinate(
					e.offsetX, e.offsetY) ]);
			this.editorObject.getModels()[0].addPlus(new kemia.model.Plus(
					coords[0]));
			this.editorObject.setModels(this.editorObject.getModels());
			this.editorObject.dispatchChange();
		}
	} catch (e) {
		this.logger.info(e);
	}
}

/**
 * reset to default state called when another plugin is made active
 */
kemia.controller.plugins.ArrowPlusEdit.prototype.resetState = function() {
	this.activeCommand[kemia.controller.plugins.ArrowPlusEdit.COMMAND.EDIT_ARROW] = false;
	this.activeCommand[kemia.controller.plugins.ArrowPlusEdit.COMMAND.EDIT_PLUS] = false;
}

/** @inheritDoc */
kemia.controller.plugins.ArrowPlusEdit.prototype.queryCommandValue = function(
		command) {
	var state = null;
	if (this.isSupportedCommand(command)) {
		state = this.activeCommand[command];
	}
	return state;
};
