goog.provide('jchemhub.model.Bond');
goog.require('jchemhub.model.Atom');

/**
 * Base class representing a Bond
 * 
 * @param {jchemhub.model.Atom}
 *            source, Atom at one end of bond.
 * @param {jchemhub.model.Atom}
 *            target, Atom at other end of bond.
 * @constructor
 */
jchemhub.model.Bond = function(source, target, opt_order, opt_molecule) {
	/**
	 * source Atom
	 * 
	 * @type {jchemhub.model.Atom}
	 */
	this.source = source;
	/**
	 * target Atom
	 * 
	 * @type{jchemhub.model.Atom}
	 */
	this.target = target;

	if (opt_molecule) {
		this.molecule = opt_molecule;
	}

        /**
         * The bond order.
         * @type {number}
         */
        this.order = opt_order ? opt_order : 1;

        /**
         * Aromatic flag.
         * @type {boolean}
         */
        this.aromatic = false;

        /**
         * Stereo flag (i.e. 'up', 'down', 'up_or_down', 'cis_or_trans')
         * @type {string}
         */
        this.stereo = '';
};

/**
 * Get the other bond atom
 * 
 * @return {jchemhub.model.Atom} The other bond atom or null if the specified
 *         atom is not part of the bond.
 */
jchemhub.model.Bond.prototype.otherAtom = function(atom) {
    if (atom === this.source) {
        return this.target;
    }
    if (atom === this.target) {
        return this.source
    }
    return null;
};

/**
 * 
 * @return {jchemhub.model.Bond}
 */
jchemhub.model.Bond.prototype.clone = function() {
    var bond = new jchemhub.model.Bond(this.source, this.target, this.order, this.molecule);
    bond.aromatic = this.aromatic;
    bond.stereo = this.stereo;
    return bond;
}
