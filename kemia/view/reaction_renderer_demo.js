	goog.require('kemia.io.mdl');
	goog.require('kemia.io.json');
	goog.require('kemia.view.ReactionRenderer');
	goog.require('goog.events.EventType');
	goog.require('goog.dom');
	goog.require('goog.graphics');
	goog.require('goog.debug.Console');
	goog.require('kemia.io.Testdata');

    
function initPage(){
	var c = new goog.debug.Console(); 
	c.setCapturing(true); 
	
	var reaction = kemia.io.json.readReaction(kemia.io.Testdata.reactionDrawing);
	var element = goog.dom.getElement('reactionContainer')
	var graphics = goog.graphics.createGraphics(element.clientWidth,
			element.clientHeight);
	graphics.render(element);
	var rr = new kemia.view.ReactionRenderer( graphics);
	rr.render(reaction);
	rr.moleculeRenderer.highlightOn(
			reaction.getReactants()[0], 'blue');
			
	var reactionNoReactants = kemia.io.json.readReaction(kemia.io.Testdata.reactionDrawingNoReactants);
	var elementNoReactants = goog.dom.getElement('reactionContainerNoReactants');
	var graphics2 = goog.graphics.createGraphics(elementNoReactants.clientWidth, element.clientHeight);
	graphics2.render(elementNoReactants);
	var rr2 = new kemia.view.ReactionRenderer( graphics2);
	rr2.render(reactionNoReactants);
};

goog.events.listen(window, goog.events.EventType.LOAD, initPage);