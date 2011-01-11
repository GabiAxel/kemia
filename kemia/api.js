goog.require('goog.debug.Console');
goog.require('goog.dom');
goog.require('goog.ui.MenuItem');
goog.require('goog.ui.Prompt');
goog.require('goog.ui.Select');
goog.require('kemia.controller.DefaultToolbar');
goog.require('kemia.controller.ToolbarController');
goog.require('kemia.io.mdl');
goog.require('kemia.io.smiles.SmilesParser');
goog.require('kemia.layout.CoordinateGenerator');
goog.require('kemia.io.xhr');
goog.require('goog.array');

// utilities
goog.exportSymbol('goog.dom.getElement', goog.dom.getElement);
goog.exportSymbol('goog.dom.getAncestor', goog.dom.getAncestor);
goog.exportSymbol('goog.dom.getElementsByClass', goog.dom.getElementsByClass);
goog.exportSymbol('goog.dom.getElementByClass', goog.dom.getElementByClass);
goog.exportSymbol('goog.dom.getFirstElementChild', goog.dom.getFirstElementChild);
goog.exportSymbol('goog.dom.getNextElementSibling', goog.dom.getNextElementSibling);
goog.exportSymbol('goog.array.forEach', goog.array.forEach);
goog.exportSymbol('goog.dom.setTextContent', goog.dom.setTextContent);
goog.exportSymbol('goog.ui.Prompt', goog.ui.Prompt);
goog.exportSymbol('goog.ui.Prompt.prototype.setDefaultValue', goog.ui.Prompt.prototype.setDefaultValue);
goog.exportSymbol('goog.ui.Prompt.prototype.setVisible', goog.ui.Prompt.prototype.setVisible);
goog.exportSymbol('goog.now', goog.now);
goog.exportSymbol('goog.debug.Console', goog.debug.Console);
goog.exportSymbol('goog.debug.Console.prototype.setCapturing', goog.debug.Console.prototype.setCapturing);
goog.exportSymbol('goog.debug.Logger.getLogger', goog.debug.Logger.getLogger);
goog.exportSymbol('goog.ui.Select', goog.ui.Select);
goog.exportSymbol('goog.ui.Select.prototype.addItem', goog.ui.Select.prototype.addItem);
goog.exportSymbol('goog.ui.Select.prototype.setSelectedIndex', goog.ui.Select.prototype.setSelectedIndex);
goog.exportSymbol('goog.ui.Select.prototype.render', goog.ui.Select.prototype.render);
goog.exportSymbol('goog.ui.Select.prototype.getValue', goog.ui.Select.prototype.getValue);
goog.exportSymbol('goog.ui.MenuItem', goog.ui.MenuItem);
goog.exportSymbol('goog.ui.Component.EventType.ACTION', goog.ui.Component.EventType.ACTION);
goog.exportSymbol('goog.events.EventType.LOAD', goog.events.EventType.LOAD);
goog.exportSymbol('goog.events.listen', goog.events.listen);
goog.exportSymbol('goog.array.filter', goog.array.filter);

// io
goog.exportSymbol('kemia.io.json.readMolecule', kemia.io.json.readMolecule);
goog.exportSymbol('kemia.io.json.writeMolecule', kemia.io.json.writeMolecule);
goog.exportSymbol('kemia.io.json.readReaction', kemia.io.json.readReaction);
goog.exportSymbol('kemia.io.json.writeReaction', kemia.io.json.writeReaction);
goog.exportSymbol('kemia.io.json.reactionToJson', kemia.io.json.reactionToJson);
goog.exportSymbol('kemia.io.mdl.readMolfile', kemia.io.mdl.readMolfile);
goog.exportSymbol('kemia.io.mdl.readRxnfile', kemia.io.mdl.readRxnfile);
goog.exportSymbol('kemia.io.mdl.writeRxnfile', kemia.io.mdl.writeRxnfile);
goog.exportSymbol('kemia.io.smiles.SmilesParser.parse',
kemia.io.smiles.SmilesParser.parse);
goog.exportSymbol('kemia.io.xhr', kemia.io.xhr);
goog.exportSymbol('kemia.io.xhr.get', kemia.io.xhr.get);

// layout
goog.exportSymbol('kemia.layout.CoordinateGenerator.generate', kemia.layout.CoordinateGenerator.generate);

//model
goog.exportSymbol('kemia.model.Reaction', kemia.model.Reaction);
goog.exportSymbol('kemia.model.Reaction.prototype.addReactant', kemia.model.Reaction.prototype.addReactant);
goog.exportSymbol('kemia.model.Reaction.prototype.addProduct', kemia.model.Reaction.prototype.addProduct);
goog.exportSymbol('kemia.model.Reaction.prototype.getReactants', kemia.model.Reaction.prototype.getReactants);
goog.exportSymbol('kemia.model.Reaction.prototype.getProducts', kemia.model.Reaction.prototype.getProducts);
goog.exportSymbol('kemia.model.Reaction.prototype.setConditionsText', kemia.model.Reaction.prototype.setConditionsText);
goog.exportSymbol('kemia.model.Reaction.prototype.setReagentsText', kemia.model.Reaction.prototype.setReagentsText);
goog.exportSymbol('kemia.model.Reaction.prototype.getPluses', kemia.model.Reaction.prototype.getPluses);
goog.exportSymbol('kemia.model.Reaction.prototype.generatePluses', kemia.model.Reaction.prototype.generatePluses);

// editor
goog.exportSymbol('kemia.controller.ReactionEditor',
kemia.controller.ReactionEditor);
goog.exportSymbol('kemia.controller.ReactionEditor.prototype.setModels',
kemia.controller.ReactionEditor.prototype.setModels);
goog.exportSymbol('kemia.controller.ReactionEditor.prototype.getModels',
kemia.controller.ReactionEditor.prototype.getModels);
goog.exportSymbol('kemia.controller.ReactionEditor.prototype.render',
kemia.controller.ReactionEditor.prototype.render);
goog.exportSymbol('kemia.controller.ReactionEditor.prototype.registerPlugin',
kemia.controller.ReactionEditor.prototype.registerPlugin);
goog.exportSymbol('kemia.controller.ReactionEditor.EventType.CHANGE',
kemia.controller.ReactionEditor.EventType.CHANGE)

// toolbar
 goog.exportSymbol('kemia.controller.ToolbarController', kemia.controller.ToolbarController);
goog.exportSymbol('kemia.controller.DefaultToolbar.makeDefaultMoleculeToolbar', kemia.controller.DefaultToolbar.makeDefaultMoleculeToolbar);

// plugins
goog.exportSymbol('kemia.controller.plugins.ArrowPlusEdit',
kemia.controller.plugins.ArrowPlusEdit);
goog.exportSymbol('kemia.controller.DefaultToolbar.makeDefaultMoleculeToolbar',
kemia.controller.DefaultToolbar.makeDefaultMoleculeToolbar);
goog.exportSymbol('kemia.controller.DefaultToolbar.makeDefaultReactionToolbar',
kemia.controller.DefaultToolbar.makeDefaultReactionToolbar);
goog.exportSymbol('kemia.controller.plugins.AtomEdit',
kemia.controller.plugins.AtomEdit);
goog.exportSymbol('kemia.controller.plugins.BondEdit',
kemia.controller.plugins.BondEdit);
goog.exportSymbol('kemia.controller.plugins.ClearEditor',
kemia.controller.plugins.ClearEditor);
goog.exportSymbol('kemia.controller.plugins.Erase',
kemia.controller.plugins.Erase);
goog.exportSymbol('kemia.controller.plugins.MoleculeEdit',
kemia.controller.plugins.MoleculeEdit);
goog.exportSymbol('kemia.controller.plugins.Move',
kemia.controller.plugins.Move);
goog.exportSymbol('kemia.controller.plugins.UndoRedo',
kemia.controller.plugins.UndoRedo);
goog.exportSymbol('kemia.controller.plugins.Zoom',
kemia.controller.plugins.Zoom);
goog.exportSymbol('kemia.controller.plugins.View', kemia.controller.plugins.View);
