goog.provide('jchemhub.controller.ReactionController');
goog.require('goog.events.EventTarget');
goog.require('goog.debug.Logger');

/** 
 * @constructor 
 * @extends {goog.events.EventTarget} 
 */ 
jchemhub.controller.ReactionController = function(parentController) { 
  goog.events.EventTarget.call(this);
  this.setParentEventTarget(parentController);
}; 
goog.inherits(jchemhub.controller.ReactionController, goog.events.EventTarget); 

jchemhub.controller.ReactionController.prototype.handleMouseOver = function(Reaction, e){
	this.dispatchEvent(jchemhub.controller.ReactionController.EventType.MOUSEOVER);
};

jchemhub.controller.ReactionController.prototype.handleMouseOut = function(Reaction, e){
	this.dispatchEvent(jchemhub.controller.ReactionController.EventType.MOUSEOUT);
};
/** @enum {string} */ 
jchemhub.controller.ReactionController.EventType = { 
  MOUSEOVER: 'reaction_mouseover',
  MOUSEOUT: 'reaction_mouseout'
}; 

/**
 * Logging object.
 * 
 * @type {goog.debug.Logger}
 * @protected
 */
jchemhub.controller.ReactionController.prototype.logger = goog.debug.Logger
		.getLogger('jchemhub.controller.ReactionController');
