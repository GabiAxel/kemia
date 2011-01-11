goog.provide('kemia.controller.ReactionEditorDemo');
goog.require('goog.dom');
goog.require('kemia.controller.DefaultToolbar');
goog.require('kemia.controller.ReactionEditor');
goog.require('kemia.controller.Testdata');
goog.require('kemia.controller.ToolbarController');
goog.require('kemia.controller.plugins.ArrowPlusEdit');
goog.require('kemia.controller.plugins.AtomEdit');
goog.require('kemia.controller.plugins.BondEdit');
goog.require('kemia.controller.plugins.ClearEditor');
goog.require('kemia.controller.plugins.Erase');
goog.require('kemia.controller.plugins.MoleculeEdit');
goog.require('kemia.controller.plugins.Move');
goog.require('kemia.controller.plugins.UndoRedo');
goog.require('kemia.controller.plugins.Zoom');
goog.require('kemia.controller.plugins.View');
goog.require('kemia.io.json');



kemia.controller.ReactionEditorDemo.initPage = function() {
	var c = new goog.debug.Console();
	c.setCapturing(true);
	var logger = goog.debug.Logger.getLogger('kemia.controller.ReactionEditorDemo');
	logger.info('initPage')
	var toolbar = kemia.controller.DefaultToolbar
			.makeDefaultReactionToolbar(goog.dom
					.getElement('reactionEditorToolbar'));

	var model = kemia.io.json.readReaction(kemia.controller.Testdata.reactionDrawing);

	var editor = new kemia.controller.ReactionEditor(goog.dom
			.getElement('reactionEditorContainer'), {
		background: {
			color: 'white'
		},
		showTerminalCarbons: false
	});
	


	editor.registerPlugin(new kemia.controller.plugins.Move());
	editor.registerPlugin(new kemia.controller.plugins.ClearEditor());
	editor.registerPlugin(new kemia.controller.plugins.Zoom());
	editor.registerPlugin(new kemia.controller.plugins.UndoRedo());
	editor.registerPlugin(new kemia.controller.plugins.Erase());
	editor.registerPlugin(new kemia.controller.plugins.AtomEdit());
	editor.registerPlugin(new kemia.controller.plugins.BondEdit());
	editor.registerPlugin(new kemia.controller.plugins.ArrowPlusEdit());
	editor.registerPlugin(new kemia.controller.plugins.MoleculeEdit());
	editor.registerPlugin(new kemia.controller.plugins.View());

	var toolbarController = new kemia.controller.ToolbarController(editor,
			toolbar);


	editor.setModels([model]);
}

goog.exportSymbol('kemia.controller.ReactionEditorDemo.initPage', kemia.controller.ReactionEditorDemo.initPage);