
goog.provide('jchemhub.view.plugins.Highlight');
goog.require('jchemhub.view.Plugin');
goog.require('goog.functions');


/**
 * simple Plugin for highlighting bonds and atoms
 *
 * @constructor
 * @extends {jchemhub.view.Plugin}
 */
jchemhub.view.plugins.Highlight = function() {
  jchemhub.view.Plugin.call(this);
};
goog.inherits(jchemhub.view.plugins.Highlight, jchemhub.view.Plugin);


/** The clear command. */
jchemhub.view.plugins.Highlight.COMMAND = 'highlight';


/** @inheritDoc */
jchemhub.view.plugins.Highlight.prototype.getTrogClassId =
    goog.functions.constant(jchemhub.view.plugins.Highlight.COMMAND);


/** @inheritDoc */
jchemhub.view.plugins.Highlight.prototype.isSupportedCommand = function(
    command) {
  return command == jchemhub.view.plugins.Highlight.COMMAND;
};


/**
 * 
 * @param {string} command Command to execute.
 * @return {Object|undefined} The result of the command.
 */
jchemhub.view.plugins.ClearEditor.prototype.execCommandInternal = function(
    command) {
};
