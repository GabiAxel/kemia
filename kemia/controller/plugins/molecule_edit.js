goog.provide('kemia.controller.plugins.MoleculeEdit');
goog.require('kemia.controller.Plugin');
goog.require('goog.debug.Logger');
goog.require('kemia.model.Molecule');

/**
 * @constructor
 * @extends{kemia.controller.Plugin}s
 */
kemia.controller.plugins.MoleculeEdit = function() {
	kemia.controller.Plugin.call(this);
}
goog.inherits(kemia.controller.plugins.MoleculeEdit, kemia.controller.Plugin);
goog.exportSymbol('kemia.controller.plugins.MoleculeEdit',
		kemia.controller.plugins.MoleculeEdit);
/**
 * Logging object.
 * 
 * @type {goog.debug.Logger}
 * @protected
 */
kemia.controller.plugins.MoleculeEdit.prototype.logger = goog.debug.Logger
		.getLogger('kemia.controller.plugins.MoleculeEdit');
/**
 * Command implemented by this plugin.
 */
kemia.controller.plugins.MoleculeEdit.COMMAND = 'selectMoleculeTemplate';

/** @inheritDoc */
kemia.controller.plugins.MoleculeEdit.prototype.isSupportedCommand = function(
		command) {
	return command == kemia.controller.plugins.MoleculeEdit.COMMAND;
};

/** @inheritDoc */
kemia.controller.plugins.MoleculeEdit.prototype.getTrogClassId = goog.functions
		.constant(kemia.controller.plugins.MoleculeEdit.COMMAND);

kemia.controller.plugins.MoleculeEdit.SHORTCUTS = [ {
	id : 'benzene',
	key : 'a'
} ]

kemia.controller.plugins.MoleculeEdit.prototype.getKeyboardShortcuts = function() {
	return kemia.controller.plugins.MoleculeEdit.SHORTCUTS;
}

kemia.controller.plugins.MoleculeEdit.prototype.handleKeyboardShortcut = function(
		e) {
	this.logger.info('handleKeyboardShortcut');
	var id = e.identifier;
	var shortcut = goog.array.find(
			kemia.controller.plugins.MoleculeEdit.SHORTCUTS, function(obj) {
				return obj.id == e.identifier
			});
	if (shortcut) {
		var template = goog.array.find(
				kemia.controller.plugins.MoleculeEdit.TEMPLATES, function(t) {
					return t['name'] == shortcut.id;
				});
		var selected = this.editorObject.getSelected();
		if (selected.length) {
			goog.array.forEach(selected, function(target) {
				if (target instanceof kemia.model.Atom) {
					this.editorObject.dispatchBeforeChange();
					var atom = target;
					this.sproutTemplate(atom, template);
					this.editorObject.setModelsSilently(this.editorObject
							.getModels());
					this.editorObject.dispatchChange();
					return true;
				}
				if (target instanceof kemia.model.Bond) {
					this.editorObject.dispatchBeforeChange();
					this.fuseTemplate(target, template);
					this.editorObject.setModelsSilently(this.editorObject
							.getModels());
					this.editorObject.dispatchChange();
					return true;
				}
			}, this);
		} else {
			// TTD need to get current mouse coords
			return false;
			this.editorObject.dispatchBeforeChange();
//			this.createMolecule(this.editorObject
//					.getAtomicCoords(kemia.controller.ReactionEditor
//							.getMouseCoords(e)), template);
//			this.editorObject.setModelsSilently(this.editorObject.getModels());
//			this.editorObject.dispatchChange();
//			return true;
		}
	}
}

/**
 * sets template
 * 
 * @param {string}
 *            command Command to execute.
 * @return {Object|undefined} The result of the command.
 */
kemia.controller.plugins.MoleculeEdit.prototype.execCommandInternal = function(
		command, var_args) {

	this.template = arguments[1];
	// try {
	// var e = arguments[3];
	// var molecule = kemia.io.json.readMolecule(arguments[1]);
	// // place template as new molecule at 0,0 of graphics canvas
	// var origin = this.editorObject
	// .getAtomicCoords(new goog.math.Coordinate(0, 0));
	// var mol_bbox = molecule.getBoundingBox();
	// var mol_offset = new goog.math.Coordinate(mol_bbox.right, mol_bbox.top);
	// var diff = goog.math.Coordinate.difference(origin, mol_offset);
	// // diff = goog.math.Coordinate.difference(diff, mol_offset);
	// if (this.editorObject.getModels().length > 0) {
	// var reaction = this.editorObject.getModels()[0];
	// } else {
	// reaction = new kemia.model.Reaction();
	// }
	// reaction.addMolecule(molecule);
	// molecule.translate(diff);
	// this.editorObject.setModelsSilently( [ reaction ]);
	// var mol_center = molecule.getCenter();
	//
	// var center = this.editorObject.getGraphicsCoords(mol_center);
	// var origin = kemia.controller.ReactionEditor.getOffsetCoords(
	// this.editorObject.originalElement, document.body.scrollLeft
	// + document.documentElement.scrollLeft,
	// document.body.scrollTop + document.documentElement.scrollTop);
	//
	// e.clientX = center.x - origin.x;
	// e.clientY = center.y - origin.y;
	//
	// this.dragTemplate(e, molecule);
	//
	// } catch (e) {
	// this.logger.info(e);
	// }
};

kemia.controller.plugins.MoleculeEdit.prototype.handleMouseDown = function(e) {
	this.logger.info('handleMouseDown');
	var selected = this.editorObject.getSelected();
	if (selected.length && this.template) {
		goog.array.forEach(selected, function(target) {
			if (target instanceof kemia.model.Atom) {
				this.editorObject.dispatchBeforeChange();
				var atom = target;
				this.sproutTemplate(atom, this.template);
				this.editorObject.setModelsSilently(this.editorObject
						.getModels());
				this.editorObject.dispatchChange();
				return true;
			}
			if (target instanceof kemia.model.Bond) {
				this.editorObject.dispatchBeforeChange();
				this.fuseTemplate(target, this.template);
				this.editorObject.setModelsSilently(this.editorObject
						.getModels());
				this.editorObject.dispatchChange();
				return true;
			}
		}, this);
	} else {
		if (this.template) {
			this.editorObject.dispatchBeforeChange();
			this.createMolecule(this.editorObject
					.getAtomicCoords(kemia.controller.ReactionEditor
							.getMouseCoords(e)), this.template);
			this.editorObject.setModelsSilently(this.editorObject.getModels());
			this.editorObject.dispatchChange();
			return true;
		}
	}
};

kemia.controller.plugins.MoleculeEdit.prototype.handleMouseMove = function(e) {
	if (this.template) {
		var target = this.editorObject.findTarget(e);
		this.editorObject.clearSelected();
		this.editorObject.getOriginalElement().style.cursor = 'default';
		if (e.currentTarget.highlightGroup) {
			e.currentTarget.highlightGroup.clear();
		}
		e.currentTarget.highlightGroup = undefined;

		if (target instanceof kemia.model.Atom) {
			this.editorObject.addSelected(target);
			this.editorObject.getOriginalElement().style.cursor = 'pointer';
			if (!e.currentTarget.highlightGroup) {
				e.currentTarget.highlightGroup = this.highlightAtom(target);
			} else {
				e.currentTarget.highlightGroup = this.highlightAtom(target,
						e.currentTarget.highlightGroup);
			}
			return true;
		} else if (target instanceof kemia.model.Bond) {
			this.editorObject.addSelected(target);
			this.editorObject.getOriginalElement().style.cursor = 'pointer';
			if (!e.currentTarget.highlightGroup) {
				e.currentTarget.highlightGroup = this.highlightBond(target);
			} else {
				e.currentTarget.highlightGroup = this.highlightBond(target,
						e.currentTarget.highlightGroup);
			}
			return true;
		}
	}
	return false;
}

kemia.controller.plugins.MoleculeEdit.prototype.highlightAtom = function(atom,
		opt_group) {

	return this.editorObject.reactionRenderer.moleculeRenderer.atomRenderer
			.highlightOn(atom, 'yellow', opt_group);
};

kemia.controller.plugins.MoleculeEdit.prototype.highlightBond = function(bond,
		opt_group) {
	return this.editorObject.reactionRenderer.moleculeRenderer.bondRendererFactory
			.get(bond).highlightOn(bond, 'yellow', opt_group);
};

kemia.controller.plugins.MoleculeEdit.prototype.dragTemplate = function(e,
		molecule) {

	var d = new goog.fx.Dragger(this.editorObject.getOriginalElement());
	d._start = new goog.math.Coordinate(e.clientX, e.clientY);
	d._prev = d._start;
	d.molecule = molecule;
	d.editor = this.editorObject;
	d
			.addEventListener(goog.fx.Dragger.EventType.DRAG,
					function(e) {
						if (d._highlightGroups) {
							goog.array.forEach(d._highlightGroups, function(g) {
								g.clear();
							})
						}
						d._highlightGroups = [];
						var mouse_coord = new goog.math.Coordinate(e.clientX,
								e.clientY);

						var diff = goog.math.Coordinate.difference(mouse_coord,
								d._start);

						// move graphic
					d.molecule.group.setTransformation(diff.x, diff.y, 0, 0, 0);

					// move molecule
					var mol_coords = d.editor.reactionRenderer.transform
							.createInverse().transformCoords(
									[ mouse_coord, d._prev ]);

					var diff = goog.math.Coordinate.difference(mol_coords[0],
							mol_coords[1]);
					d.molecule.translate(diff);
					d._prev = mouse_coord;

					// highlight merge sites
					var merge_pairs = this.findAtomMergePairs(molecule);

					// only first merge pair for now
					if (merge_pairs.length > 0) {
						merge_pairs = [ merge_pairs[0] ];
					}
					goog.array
							.forEach(
									merge_pairs,
									function(pair) {
										d._highlightGroups
												.push(d.editor.reactionRenderer.moleculeRenderer.atomRenderer
														.highlightOn(pair[0]));
										d._highlightGroups
												.push(d.editor.reactionRenderer.moleculeRenderer.atomRenderer
														.highlightOn(pair[1]));
									});

				}, undefined, this);
	d.addEventListener(goog.fx.Dragger.EventType.END, function(e) {
		var merge_pairs = this.findAtomMergePairs(d.molecule);

		// only first merge pair for now
			if (merge_pairs.length > 0) {
				merge_pairs = [ merge_pairs[0] ];
			}
			goog.array.forEach(merge_pairs, function(pair) {
				kemia.model.Molecule.mergeMolecules(pair[0], pair[1]);
			}, this);
			this.resetState();
			d.editor.setModels(d.editor.getModels());
			d.dispose();
		}, undefined, this);
	d.startDrag(e);
};

/**
 * adds a new molecule to editor based on current template at atomic coords
 * 
 * @param {goog.math.Coordinate}
 *            coords
 * 
 */
kemia.controller.plugins.MoleculeEdit.prototype.createMolecule = function(
		coords, template) {
	if (template) {
		var molecule = kemia.io.json.readMolecule(template)
	}
	var diff = goog.math.Coordinate.difference(coords, molecule.getCenter());
	molecule.translate(diff);
	if (this.editorObject.getModels().length > 0) {
		var model = this.editorObject.getModels()[0];
		if (model instanceof kemia.model.Reaction) {
			model.addMolecule(molecule);
		} else if (model instanceof kemia.model.Molecule) {
			models.push(molecule);
		}
	} else {
		reaction = new kemia.model.Reaction();
		reaction.addMolecule(molecule);
	}
}

kemia.controller.plugins.MoleculeEdit.prototype.fuseTemplate = function(bond,
		template) {
	var fragment = kemia.io.json.readMolecule(template);
	bond.molecule.merge(fragment, fragment.bonds[0], bond,
			fragment.bonds[0].target, bond.source);
}

kemia.controller.plugins.MoleculeEdit.prototype.sproutTemplate = function(atom,
		template) {
	var sprout_bond = atom.molecule.sproutBond(atom,
			kemia.model.Bond.ORDER.SINGLE, kemia.model.Bond.STEREO.NOT_STEREO);
	var sprout_atom = sprout_bond.otherAtom(atom);
	var fragment = kemia.io.json.readMolecule(template);

	// TTD need to provide means to identify template attachment point for
	// assymetrical templates
	var attachment_atom = fragment.atoms[0];
	var attachment_bond = fragment.sproutBond(attachment_atom,
			kemia.model.Bond.ORDER.SINGLE, kemia.model.Bond.STEREO.NOT_STEREO);

	atom.molecule.merge(fragment, attachment_bond, sprout_bond,
			attachment_atom, sprout_atom);
}

/**
 * The logger for this class.
 * 
 * @type {goog.debug.Logger}
 * @protected
 */
kemia.controller.plugins.MoleculeEdit.prototype.logger = goog.debug.Logger
		.getLogger('kemia.controller.plugins.MoleculeEdit');

kemia.controller.plugins.MoleculeEdit.prototype.addTemplateToAtom = function(
		atom, template) {
	var new_angle = kemia.model.Atom.nextBondAngle(atom);

}

// kemia.controller.plugins.MoleculeEdit.prototype.handleMouseDown = function(e)
// {
//
// // if (this.isActive) {
// this.editorObject.dispatchBeforeChange();
// var target = this.editorObject.findTarget(e);
//
// this.editorObject.dispatchChange();
// // }
// };

/**
 * reset to default state called when another plugin is made active
 */
kemia.controller.plugins.MoleculeEdit.prototype.resetState = function() {
	this.template = undefined;
}

/** @inheritDoc */
kemia.controller.plugins.MoleculeEdit.prototype.queryCommandValue = function(
		command) {
	if (command == kemia.controller.plugins.MoleculeEdit.COMMAND) {
		return this.template;
	}
};

kemia.controller.plugins.MoleculeEdit.prototype.findAtomMergePairs = function(
		molecule) {
	return goog.array.filter(goog.array.map(molecule.atoms, function(atom) {
		var nearest = this.editorObject.neighborList.getNearestList( {
			x : atom.coord.x,
			y : atom.coord.y
		}, this);
		var other_atoms = goog.array.filter(nearest, function(other) {
			if (other instanceof kemia.model.Atom) {
				if (!goog.array.contains(molecule.atoms, other)) {
					return true;
				}
			}
			return false;
		});
		if (other_atoms.length > 0) {
			return [ atom, other_atoms[0] ];
		} else {
			return false;
		}
	}, this), function(pair) {
		return pair != false;
	}, this);
};

/**
 * @enum {Object}
 */
kemia.controller.plugins.MoleculeEdit.TEMPLATES = [ {
	"name" : "benzene",
	"atoms" : [ {
		"symbol" : "C",
		"coord" : {
			"x" : 2.5981,
			"y" : 0.75,
			"z" : 0
		},
		"charge" : 0
	}, {
		"symbol" : "C",
		"coord" : {
			"x" : 2.5981,
			"y" : 2.25,
			"z" : 0
		},
		"charge" : 0
	}, {
		"symbol" : "C",
		"coord" : {
			"x" : 1.30,
			"y" : 3.0,
			"z" : 0
		},
		"charge" : 0
	}, {
		"symbol" : "C",
		"coord" : {
			"x" : 0,
			"y" : 2.25,
			"z" : 0
		},
		"charge" : 0
	}, {
		"symbol" : "C",
		"coord" : {
			"x" : 0,
			"y" : 0.75,
			"z" : 0
		},
		"charge" : 0
	}, {
		"symbol" : "C",
		"coord" : {
			"x" : 1.30,
			"y" : 0,
			"z" : 0
		},
		"charge" : 0
	} ],
	"bondindex" : [ {
		"source" : 0,
		"target" : 1,
		"type" : "DOUBLE_BOND",
		"stereo" : "NOT_STEREO"
	}, {
		"source" : 1,
		"target" : 2,
		"type" : "SINGLE_BOND",
		"stereo" : "NOT_STEREO"
	}, {
		"source" : 2,
		"target" : 3,
		"type" : "DOUBLE_BOND",
		"stereo" : "NOT_STEREO"
	}, {
		"source" : 3,
		"target" : 4,
		"type" : "SINGLE_BOND",
		"stereo" : "NOT_STEREO"
	}, {
		"source" : 4,
		"target" : 5,
		"type" : "DOUBLE_BOND",
		"stereo" : "NOT_STEREO"
	}, {
		"source" : 5,
		"target" : 0,
		"type" : "SINGLE_BOND",
		"stereo" : "NOT_STEREO"
	} ]
}, {
	"name" : "cyclohexane",
	"atoms" : [ {
		"symbol" : "C",
		"coord" : {
			"x" : 2.5981,
			"y" : 0.75,
			"z" : 0
		},
		"charge" : 0
	}, {
		"symbol" : "C",
		"coord" : {
			"x" : 2.5981,
			"y" : 2.25,
			"z" : 0
		},
		"charge" : 0
	}, {
		"symbol" : "C",
		"coord" : {
			"x" : 1.30,
			"y" : 3.0,
			"z" : 0
		},
		"charge" : 0
	}, {
		"symbol" : "C",
		"coord" : {
			"x" : 0,
			"y" : 2.25,
			"z" : 0
		},
		"charge" : 0
	}, {
		"symbol" : "C",
		"coord" : {
			"x" : 0,
			"y" : 0.75,
			"z" : 0
		},
		"charge" : 0
	}, {
		"symbol" : "C",
		"coord" : {
			"x" : 1.30,
			"y" : 0,
			"z" : 0
		},
		"charge" : 0
	} ],
	"bondindex" : [ {
		"source" : 0,
		"target" : 1,
		"type" : "SINGLE_BOND",
		"stereo" : "NOT_STEREO"
	}, {
		"source" : 1,
		"target" : 2,
		"type" : "SINGLE_BOND",
		"stereo" : "NOT_STEREO"
	}, {
		"source" : 2,
		"target" : 3,
		"type" : "SINGLE_BOND",
		"stereo" : "NOT_STEREO"
	}, {
		"source" : 3,
		"target" : 4,
		"type" : "SINGLE_BOND",
		"stereo" : "NOT_STEREO"
	}, {
		"source" : 4,
		"target" : 5,
		"type" : "SINGLE_BOND",
		"stereo" : "NOT_STEREO"
	}, {
		"source" : 5,
		"target" : 0,
		"type" : "SINGLE_BOND",
		"stereo" : "NOT_STEREO"
	} ]
}, {
	"name" : "cyclopentane",
	"atoms" : [ {
		"symbol" : "C",
		"coord" : {
			"x" : -2.3083,
			"y" : 0.4635,
			"z" : 0
		},
		"charge" : 0
	}, {
		"symbol" : "C",
		"coord" : {
			"x" : -2.3083,
			"y" : 1.9635,
			"z" : 0
		},
		"charge" : 0
	}, {
		"symbol" : "C",
		"coord" : {
			"x" : -0.8817,
			"y" : 2.427,
			"z" : 0
		},
		"charge" : 0
	}, {
		"symbol" : "C",
		"coord" : {
			"x" : 0,
			"y" : 1.2135,
			"z" : 0
		},
		"charge" : 0
	}, {
		"symbol" : "C",
		"coord" : {
			"x" : -0.8817,
			"y" : 0,
			"z" : 0
		},
		"charge" : 0
	} ],
	"bondindex" : [ {
		"source" : 1,
		"target" : 0,
		"type" : "SINGLE_BOND",
		"stereo" : "NOT_STEREO"
	}, {
		"source" : 1,
		"target" : 2,
		"type" : "SINGLE_BOND",
		"stereo" : "NOT_STEREO"
	}, {
		"source" : 2,
		"target" : 3,
		"type" : "SINGLE_BOND",
		"stereo" : "NOT_STEREO"
	}, {
		"source" : 3,
		"target" : 4,
		"type" : "SINGLE_BOND",
		"stereo" : "NOT_STEREO"
	}, {
		"source" : 4,
		"target" : 0,
		"type" : "SINGLE_BOND",
		"stereo" : "NOT_STEREO"
	} ]
}, {
	"name" : "cyclopentane",
	"atoms" : [ {
		"symbol" : "C",
		"coord" : {
			"x" : 2.5981,
			"y" : 0.75,
			"z" : 0
		},
		"charge" : 0
	}, {
		"symbol" : "C",
		"coord" : {
			"x" : 2.5981,
			"y" : 2.25,
			"z" : 0
		},
		"charge" : 0
	}, {
		"symbol" : "C",
		"coord" : {
			"x" : 0,
			"y" : 2.25,
			"z" : 0
		},
		"charge" : 0
	}, {
		"symbol" : "C",
		"coord" : {
			"x" : 0,
			"y" : 0.75,
			"z" : 0
		},
		"charge" : 0
	}, {
		"symbol" : "C",
		"coord" : {
			"x" : 1.30,
			"y" : 0,
			"z" : 0
		},
		"charge" : 0
	} ],
	"bondindex" : [ {
		"source" : 0,
		"target" : 1,
		"type" : "SINGLE_BOND",
		"stereo" : "NOT_STEREO"
	}, {
		"source" : 1,
		"target" : 2,
		"type" : "SINGLE_BOND",
		"stereo" : "NOT_STEREO"
	}, {
		"source" : 2,
		"target" : 3,
		"type" : "SINGLE_BOND",
		"stereo" : "NOT_STEREO"
	}, {
		"source" : 3,
		"target" : 4,
		"type" : "SINGLE_BOND",
		"stereo" : "NOT_STEREO"
	}, {
		"source" : 4,
		"target" : 0,
		"type" : "SINGLE_BOND",
		"stereo" : "NOT_STEREO"
	} ]
}, {
	"name" : "pyrrole",
	"atoms" : [ {
		"symbol" : "C",
		"coord" : {
			"x" : 2.5981,
			"y" : 0.75,
			"z" : 0
		},
		"charge" : 0
	}, {
		"symbol" : "C",
		"coord" : {
			"x" : 2.5981,
			"y" : 2.25,
			"z" : 0
		},
		"charge" : 0
	}, {
		"symbol" : "C",
		"coord" : {
			"x" : 0,
			"y" : 2.25,
			"z" : 0
		},
		"charge" : 0
	}, {
		"symbol" : "C",
		"coord" : {
			"x" : 0,
			"y" : 0.75,
			"z" : 0
		},
		"charge" : 0
	}, {
		"symbol" : "N",
		"coord" : {
			"x" : 1.30,
			"y" : 0,
			"z" : 0
		},
		"charge" : 0
	} ],
	"bondindex" : [ {
		"source" : 0,
		"target" : 1,
		"type" : "DOUBLE_BOND",
		"stereo" : "NOT_STEREO"
	}, {
		"source" : 1,
		"target" : 2,
		"type" : "SINGLE_BOND",
		"stereo" : "NOT_STEREO"
	}, {
		"source" : 2,
		"target" : 3,
		"type" : "DOUBLE_BOND",
		"stereo" : "NOT_STEREO"
	}, {
		"source" : 3,
		"target" : 4,
		"type" : "SINGLE_BOND",
		"stereo" : "NOT_STEREO"
	}, {
		"source" : 4,
		"target" : 0,
		"type" : "SINGLE_BOND",
		"stereo" : "NOT_STEREO"
	} ]
}, {
	"name" : "pyrrole",
	"atoms" : [ {
		"symbol" : "C",
		"coord" : {
			"x" : -2.3083,
			"y" : 0.4635,
			"z" : 0
		},
		"charge" : 0
	}, {
		"symbol" : "C",
		"coord" : {
			"x" : -2.3083,
			"y" : 1.9635,
			"z" : 0
		},
		"charge" : 0
	}, {
		"symbol" : "C",
		"coord" : {
			"x" : -0.8817,
			"y" : 2.427,
			"z" : 0
		},
		"charge" : 0
	}, {
		"symbol" : "C",
		"coord" : {
			"x" : 0,
			"y" : 1.2135,
			"z" : 0
		},
		"charge" : 0
	}, {
		"symbol" : "N",
		"coord" : {
			"x" : -0.8817,
			"y" : 0,
			"z" : 0
		},
		"charge" : 0
	} ],
	"bondindex" : [ {
		"source" : 0,
		"target" : 1,
		"type" : "DOUBLE_BOND",
		"stereo" : "NOT_STEREO"
	}, {
		"source" : 1,
		"target" : 2,
		"type" : "SINGLE_BOND",
		"stereo" : "NOT_STEREO"
	}, {
		"source" : 2,
		"target" : 3,
		"type" : "DOUBLE_BOND",
		"stereo" : "NOT_STEREO"
	}, {
		"source" : 3,
		"target" : 4,
		"type" : "SINGLE_BOND",
		"stereo" : "NOT_STEREO"
	}, {
		"source" : 4,
		"target" : 0,
		"type" : "SINGLE_BOND",
		"stereo" : "NOT_STEREO"
	} ]
}, {
	"name" : "naphthalene",
	"atoms" : [ {
		"symbol" : "C",
		"coord" : {
			"x" : 2.5981,
			"y" : 0.75,
			"z" : 0
		},
		"charge" : 0
	}, {
		"symbol" : "C",
		"coord" : {
			"x" : 2.5981,
			"y" : 2.25,
			"z" : 0
		},
		"charge" : 0
	}, {
		"symbol" : "C",
		"coord" : {
			"x" : 1.2991,
			"y" : 3,
			"z" : 0
		},
		"charge" : 0
	}, {
		"symbol" : "C",
		"coord" : {
			"x" : 0,
			"y" : 2.25,
			"z" : 0
		},
		"charge" : 0
	}, {
		"symbol" : "C",
		"coord" : {
			"x" : 0,
			"y" : 0.75,
			"z" : 0
		},
		"charge" : 0
	}, {
		"symbol" : "C",
		"coord" : {
			"x" : 1.2991,
			"y" : 0,
			"z" : 0
		},
		"charge" : 0
	}, {
		"symbol" : "C",
		"coord" : {
			"x" : 3.8971,
			"y" : 3,
			"z" : 0
		},
		"charge" : 0
	}, {
		"symbol" : "C",
		"coord" : {
			"x" : 5.1962,
			"y" : 2.25,
			"z" : 0
		},
		"charge" : 0
	}, {
		"symbol" : "C",
		"coord" : {
			"x" : 5.1962,
			"y" : 0.75,
			"z" : 0
		},
		"charge" : 0
	}, {
		"symbol" : "C",
		"coord" : {
			"x" : 3.8971,
			"y" : 0,
			"z" : 0
		},
		"charge" : 0
	} ],
	"bondindex" : [ {
		"source" : 0,
		"target" : 1,
		"type" : "DOUBLE_BOND",
		"stereo" : "NOT_STEREO"
	}, {
		"source" : 1,
		"target" : 2,
		"type" : "SINGLE_BOND",
		"stereo" : "NOT_STEREO"
	}, {
		"source" : 2,
		"target" : 3,
		"type" : "DOUBLE_BOND",
		"stereo" : "NOT_STEREO"
	}, {
		"source" : 3,
		"target" : 4,
		"type" : "SINGLE_BOND",
		"stereo" : "NOT_STEREO"
	}, {
		"source" : 4,
		"target" : 5,
		"type" : "DOUBLE_BOND",
		"stereo" : "NOT_STEREO"
	}, {
		"source" : 5,
		"target" : 0,
		"type" : "SINGLE_BOND",
		"stereo" : "NOT_STEREO"
	}, {
		"source" : 1,
		"target" : 6,
		"type" : "SINGLE_BOND",
		"stereo" : "NOT_STEREO"
	}, {
		"source" : 6,
		"target" : 7,
		"type" : "DOUBLE_BOND",
		"stereo" : "NOT_STEREO"
	}, {
		"source" : 7,
		"target" : 8,
		"type" : "SINGLE_BOND",
		"stereo" : "NOT_STEREO"
	}, {
		"source" : 8,
		"target" : 9,
		"type" : "DOUBLE_BOND",
		"stereo" : "NOT_STEREO"
	}, {
		"source" : 9,
		"target" : 0,
		"type" : "SINGLE_BOND",
		"stereo" : "NOT_STEREO"
	} ]
} ];
