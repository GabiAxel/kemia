goog.provide('jchemhub.model.AromaticBond');
goog.require('jchemhub.model.Bond');

/**
 * Class representing a Aromatic Bond
 * @param {jchemhub.model.Atom} source Atom at one end of bond.
 * @param {jchemhub.model.Atom} target Atom at other end of bond.
 * @constructor
 * @extends {jchemhub.model.Bond}
 */
jchemhub.model.AromaticBond = function(source, target){
	jchemhub.model.Bond.call(this, source, target);
}
goog.inherits(jchemhub.model.AromaticBond, jchemhub.model.Bond);