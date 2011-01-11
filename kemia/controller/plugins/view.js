/**
 * @license Copyright 2011 Paul Novak (paul@wingu.com).
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 * @author paul@wingu.com (Paul Novak)
 */
goog.provide('kemia.controller.plugins.View');

goog.require('goog.debug.Logger');
goog.require('goog.functions');
goog.require('kemia.controller.Plugin');

/**
 * Plugin to provide functionality to erase drawing elements
 *
 * @constructor
 * @extends {kemian.controller.Plugin}s
 */
kemia.controller.plugins.View = function() {
    kemia.controller.Plugin.call(this);

    this.isActive = {};
    this.isActive[kemia.controller.plugins.View.COMMAND.SHOW_CONDITIONS] = true
    this.isActive[kemia.controller.plugins.View.COMMAND.SHOW_REAGENTS] = true;

};
goog.inherits(kemia.controller.plugins.View, kemia.controller.Plugin);


/**
 * Command implemented by this plugin.
 */
kemia.controller.plugins.View.COMMAND = {
    SHOW_CONDITIONS: 'show_conditions',
    SHOW_REAGENTS: 'show_reagents'
}

'erase';

/** @inheritDoc */
kemia.controller.plugins.View.prototype.isSupportedCommand = function(command) {
    return command in kemia.controller.plugins.View.SUPPORTED_COMMANDS_;
};

/** @inheritDoc */
kemia.controller.plugins.View.prototype.getTrogClassId = function() {
    return 'View';
}

/**
 * Inverse map of execCommand strings to
 * {@link kemia.controller.plugins.View.COMMAND} constants. Used to
 * determine whether a string corresponds to a command this plugin handles
 *
 * @type {Object}
 * @private
 */
kemia.controller.plugins.View.SUPPORTED_COMMANDS_ = goog.object
.transpose(kemia.controller.plugins.View.COMMAND);

/**
 * The logger for this class.
 *
 * @type {goog.debug.Logger}
 * @protected
 */
kemia.controller.plugins.View.prototype.logger = goog.debug.Logger
.getLogger('kemia.controller.plugins.View');

/**
 *
 * @param {string}
 *            command Command to execute.
 * @return {Object|undefined} The result of the command.
 */
kemia.controller.plugins.View.prototype.execCommandInternal = function(
command, value, active) {
    var model = this.editorObject.getModels()[0];
    try {
        if (model instanceof kemia.model.Reaction) {
            this.editorObject.dispatchBeforeChange();
            if (command == kemia.controller.plugins.View.COMMAND.SHOW_CONDITIONS) {
                this.isActive[command] = !this.isActive[command];
                model.isHiddenConditionsText = !this.isActive[command];
            }
            if (command == kemia.controller.plugins.View.COMMAND.SHOW_REAGENTS) {
                this.isActive[command] = !this.isActive[command];
                model.isHiddenReagentsText = !this.isActive[command];
            }
            this.editorObject.setModels(this.editorObject.getModels());
        }
    } catch(e) {
        this.logger.info(e);
    }

};

/** @inheritDoc */
kemia.controller.plugins.View.prototype.queryCommandValue = function(
command) {

       return this.isActive[command];

};


