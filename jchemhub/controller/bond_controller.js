goog.provide('jchemhub.controller.BondController');
goog.provide('jchemhub.controller.BondController.BondEvent');
goog.require('goog.events.EventTarget');

/**
 * @constructor
 * @extends {goog.events.EventTarget}
 */
jchemhub.controller.BondController = function(parentController) {
	goog.events.EventTarget.call(this);
	this.setParentEventTarget(parentController);
};
goog.inherits(jchemhub.controller.BondController, goog.events.EventTarget);

jchemhub.controller.BondController.prototype.handleMouseOver = function(bond, e) {
	console.log(bond);
	this.dispatchEvent(new jchemhub.controller.BondController.BondEvent(this,
			bond, jchemhub.controller.BondController.EventType.MOUSEOVER));
};

jchemhub.controller.BondController.prototype.handleMouseOut = function(bond, e) {
	this.dispatchEvent(jchemhub.controller.BondController.EventType.MOUSEOUT);
};
/** @enum {string} */
jchemhub.controller.BondController.EventType = {
	MOUSEOVER : 'bond_mouseover',
	MOUSEOUT : 'bond_mouseout'
};

jchemhub.controller.BondController.BondEvent = function(controller, bond, type) {
	goog.events.Event.call(this, type, controller);
	this.bond = bond;
};
goog.inherits(jchemhub.controller.BondController.BondEvent, goog.events.Event);
