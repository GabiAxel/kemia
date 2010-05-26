goog.provide('jchemhub.view.DefaultToolbar');

goog.require('goog.dom');
goog.require('goog.dom.TagName');
goog.require('goog.dom.classes');
goog.require('jchemhub.view.Command');
goog.require('goog.string.StringBuffer');
goog.require('goog.style');
goog.require('goog.ui.ControlContent');
goog.require('jchemhub.view.ToolbarFactory');

// Font menu creation.

/** @desc Font menu item caption for the default sans-serif font. */
jchemhub.view.DefaultToolbar.MSG_FONT_NORMAL = goog.getMsg('Normal');

/** @desc Font menu item caption for the default serif font. */
jchemhub.view.DefaultToolbar.MSG_FONT_NORMAL_SERIF = goog
		.getMsg('Normal / serif');

/**
 * Common font descriptors for all locales. Each descriptor has the following
 * attributes:
 * <ul>
 * <li>{@code caption} - Caption to show in the font menu (e.g. 'Tahoma')
 * <li>{@code value} - Value for the corresponding 'font-family' CSS style
 * (e.g. 'Tahoma, Arial, sans-serif')
 * </ul>
 * 
 * @type {!Array.<{caption:string, value:string}>}
 * @private
 */
jchemhub.view.DefaultToolbar.FONTS_ = [ {
	caption : jchemhub.view.DefaultToolbar.MSG_FONT_NORMAL,
	value : 'arial,sans-serif'
}, {
	caption : jchemhub.view.DefaultToolbar.MSG_FONT_NORMAL_SERIF,
	value : 'times new roman,serif'
}, {
	caption : 'Courier New',
	value : 'courier new,monospace'
}, {
	caption : 'Georgia',
	value : 'georgia,serif'
}, {
	caption : 'Trebuchet',
	value : 'trebuchet ms,sans-serif'
}, {
	caption : 'Verdana',
	value : 'verdana,sans-serif'
} ];

/**
 * Locale-specific font descriptors. The object is a map of locale strings to
 * arrays of font descriptors.
 * 
 * @type {!Object.<!Array.<{caption:string, value:string}>>}
 * @private
 */
jchemhub.view.DefaultToolbar.I18N_FONTS_ = {
	'ja' : [ {
		caption : '\uff2d\uff33 \uff30\u30b4\u30b7\u30c3\u30af',
		value : 'ms pgothic,sans-serif'
	}, {
		caption : '\uff2d\uff33 \uff30\u660e\u671d',
		value : 'ms pmincho,serif'
	}, {
		caption : '\uff2d\uff33 \u30b4\u30b7\u30c3\u30af',
		value : 'ms gothic,monospace'
	} ],
	'ko' : [ {
		caption : '\uad74\ub9bc',
		value : 'gulim,sans-serif'
	}, {
		caption : '\ubc14\ud0d5',
		value : 'batang,serif'
	}, {
		caption : '\uad74\ub9bc\uccb4',
		value : 'gulimche,monospace'
	} ],
	'zh-tw' : [ {
		caption : '\u65b0\u7d30\u660e\u9ad4',
		value : 'pmingliu,serif'
	}, {
		caption : '\u7d30\u660e\u9ad4',
		value : 'mingliu,serif'
	} ],
	'zh-cn' : [ {
		caption : '\u5b8b\u4f53',
		value : 'simsun,serif'
	}, {
		caption : '\u9ed1\u4f53',
		value : 'simhei,sans-serif'
	}, {
		caption : 'MS Song',
		value : 'ms song,monospace'
	} ]
};

/**
 * Default locale for font names.
 * 
 * @type {string}
 * @private
 */
jchemhub.view.DefaultToolbar.locale_ = 'en-us';

/**
 * Sets the locale for the font names. If not set, defaults to 'en-us'. Used
 * only for default creation of font names name. Must be set before font name
 * menu is created.
 * 
 * @param {string}
 *            locale Locale to use for the toolbar font names.
 */
jchemhub.view.DefaultToolbar.setLocale = function(locale) {
	jchemhub.view.DefaultToolbar.locale_ = locale;
};

/**
 * Initializes the given font menu button by adding default fonts to the menu.
 * If jchemhub.view.DefaultToolbar.setLocale was called to specify a locale for
 * which locale-specific default fonts exist, those are added before common
 * fonts.
 * 
 * @param {!goog.ui.Select}
 *            button Font menu button.
 */
jchemhub.view.DefaultToolbar.addDefaultFonts = function(button) {
	// Normalize locale to lowercase, with a hyphen (see bug 1036165).
	var locale = jchemhub.view.DefaultToolbar.locale_.replace(/_/, '-')
			.toLowerCase();
	// Add locale-specific default fonts, if any.
	var fontlist = [];

	if (locale in jchemhub.view.DefaultToolbar.I18N_FONTS_) {
		fontlist = jchemhub.view.DefaultToolbar.I18N_FONTS_[locale];
	}
	if (fontlist.length) {
		jchemhub.view.ToolbarFactory.addFonts(button, fontlist);
	}
	// Add locale-independent default fonts.
	jchemhub.view.ToolbarFactory.addFonts(button,
			jchemhub.view.DefaultToolbar.FONTS_);
};

// Font size menu creation.

/** @desc Font size menu item caption for the 'Small' size. */
jchemhub.view.DefaultToolbar.MSG_FONT_SIZE_SMALL = goog.getMsg('Small');

/** @desc Font size menu item caption for the 'Normal' size. */
jchemhub.view.DefaultToolbar.MSG_FONT_SIZE_NORMAL = goog.getMsg('Normal');

/** @desc Font size menu item caption for the 'Large' size. */
jchemhub.view.DefaultToolbar.MSG_FONT_SIZE_LARGE = goog.getMsg('Large');

/** @desc Font size menu item caption for the 'Huge' size. */
jchemhub.view.DefaultToolbar.MSG_FONT_SIZE_HUGE = goog.getMsg('Huge');

/**
 * Font size descriptors, each with the following attributes:
 * <ul>
 * <li>{@code caption} - Caption to show in the font size menu (e.g. 'Huge')
 * <li>{@code value} - Value for the corresponding HTML font size (e.g. 6)
 * </ul>
 * 
 * @type {!Array.<{caption:string, value:number}>}
 * @private
 */
jchemhub.view.DefaultToolbar.FONT_SIZES_ = [ {
	caption : jchemhub.view.DefaultToolbar.MSG_FONT_SIZE_SMALL,
	value : 1
}, {
	caption : jchemhub.view.DefaultToolbar.MSG_FONT_SIZE_NORMAL,
	value : 2
}, {
	caption : jchemhub.view.DefaultToolbar.MSG_FONT_SIZE_LARGE,
	value : 4
}, {
	caption : jchemhub.view.DefaultToolbar.MSG_FONT_SIZE_HUGE,
	value : 6
} ];

/**
 * Initializes the given font size menu button by adding default font sizes to
 * it.
 * 
 * @param {!goog.ui.Select}
 *            button Font size menu button.
 */
jchemhub.view.DefaultToolbar.addDefaultFontSizes = function(button) {
	jchemhub.view.ToolbarFactory.addFontSizes(button,
			jchemhub.view.DefaultToolbar.FONT_SIZES_);
};

// Header format menu creation.

/** @desc Caption for "Heading" block format option. */
jchemhub.view.DefaultToolbar.MSG_FORMAT_HEADING = goog.getMsg('Heading');

/** @desc Caption for "Subheading" block format option. */
jchemhub.view.DefaultToolbar.MSG_FORMAT_SUBHEADING = goog.getMsg('Subheading');

/** @desc Caption for "Minor heading" block format option. */
jchemhub.view.DefaultToolbar.MSG_FORMAT_MINOR_HEADING = goog
		.getMsg('Minor heading');

/** @desc Caption for "Normal" block format option. */
jchemhub.view.DefaultToolbar.MSG_FORMAT_NORMAL = goog.getMsg('Normal');

/**
 * Format option descriptors, each with the following attributes:
 * <ul>
 * <li>{@code caption} - Caption to show in the menu (e.g. 'Minor heading')
 * <li>{@code command} - Corresponding {@link goog.dom.TagName} (e.g. 'H4')
 * </ul>
 * 
 * @type {!Array.<{caption:string, command:string}>}
 * @private
 */
jchemhub.view.DefaultToolbar.FORMAT_OPTIONS_ = [ {
	caption : jchemhub.view.DefaultToolbar.MSG_FORMAT_HEADING,
	command : goog.dom.TagName.H2
}, {
	caption : jchemhub.view.DefaultToolbar.MSG_FORMAT_SUBHEADING,
	command : goog.dom.TagName.H3
}, {
	caption : jchemhub.view.DefaultToolbar.MSG_FORMAT_MINOR_HEADING,
	command : goog.dom.TagName.H4
}, {
	caption : jchemhub.view.DefaultToolbar.MSG_FORMAT_NORMAL,
	command : goog.dom.TagName.P
} ];

/**
 * Initializes the given "Format block" menu button by adding default format
 * options to the menu.
 * 
 * @param {!goog.ui.Select}
 *            button "Format block" menu button.
 */
jchemhub.view.DefaultToolbar.addDefaultFormatOptions = function(button) {
	jchemhub.view.ToolbarFactory.addFormatOptions(button,
			jchemhub.view.DefaultToolbar.FORMAT_OPTIONS_);
};

/**
 * Creates a {@link goog.ui.Toolbar} containing a default set of editor toolbar
 * buttons, and renders it into the given parent element.
 * 
 * @param {!Element}
 *            elem Toolbar parent element.
 * @param {boolean=}
 *            opt_isRightToLeft Whether the editor chrome is right-to-left;
 *            defaults to the directionality of the toolbar parent element.
 * @return {!goog.ui.Toolbar} Default editor toolbar, rendered into the given
 *         parent element.
 * @see jchemhub.view.DefaultToolbar.DEFAULT_BUTTONS
 */
jchemhub.view.DefaultToolbar.makeDefaultToolbar = function(elem,
		opt_isRightToLeft) {
	var isRightToLeft = opt_isRightToLeft || goog.style.isRightToLeft(elem);
	var buttons = isRightToLeft ? jchemhub.view.DefaultToolbar.DEFAULT_BUTTONS_RTL
			: jchemhub.view.DefaultToolbar.DEFAULT_BUTTONS;
	return jchemhub.view.DefaultToolbar.makeToolbar(buttons, elem,
			opt_isRightToLeft);
};

/**
 * Creates a {@link goog.ui.Toolbar} containing the specified set of toolbar
 * buttons, and renders it into the given parent element. Each item in the
 * {@code items} array must either be a {@link goog.editor.Command} (to create a
 * built-in button) or a subclass of {@link goog.ui.Control} (to create a custom
 * control).
 * 
 * @param {!Array.
 *            <string|goog.ui.Control>} items Toolbar items; each must be a
 *            {@link goog.editor.Command} or a {@link goog.ui.Control}.
 * @param {!Element}
 *            elem Toolbar parent element.
 * @param {boolean=}
 *            opt_isRightToLeft Whether the editor chrome is right-to-left;
 *            defaults to the directionality of the toolbar parent element.
 * @return {!goog.ui.Toolbar} Editor toolbar, rendered into the given parent
 *         element.
 */
jchemhub.view.DefaultToolbar.makeToolbar = function(items, elem,
		opt_isRightToLeft) {
	var domHelper = goog.dom.getDomHelper(elem);
	var controls = [];

	for ( var i = 0, button; button = items[i]; i++) {
		if (goog.isString(button)) {
			button = jchemhub.view.DefaultToolbar.makeBuiltInToolbarButton(
					button, domHelper);
		}
		if (button) {
			controls.push(button);
		}
	}

	return jchemhub.view.ToolbarFactory.makeToolbar(controls, elem,
			opt_isRightToLeft);
};

/**
 * Creates an instance of a subclass of {@link goog.ui.Button} for the given
 * {@link goog.editor.Command}, or null if no built-in button exists for the
 * command. Note that this function is only intended to create built-in buttons;
 * please don't try to hack it!
 * 
 * @param {string}
 *            command Editor command ID.
 * @param {goog.dom.DomHelper=}
 *            opt_domHelper DOM helper, used for DOM creation; defaults to the
 *            current document if unspecified.
 * @return {goog.ui.Button} Toolbar button (null if no built-in button exists
 *         for the command).
 */
jchemhub.view.DefaultToolbar.makeBuiltInToolbarButton = function(command,
		opt_domHelper) {
	var button;
	var descriptor = jchemhub.view.DefaultToolbar.buttons_[command];
	if (descriptor) {
		// Default the factory method to makeToggleButton, since most built-in
		// toolbar buttons are toggle buttons. See also
		// jchemhub.view.DefaultToolbar.BUTTONS_.
		var factory = descriptor.factory
				|| jchemhub.view.ToolbarFactory.makeToggleButton;
		var id = descriptor.command;
		var tooltip = descriptor.tooltip;
		var caption = descriptor.caption;
		var classNames = descriptor.classes;
		// Default the DOM helper to the one for the current document.
		var domHelper = opt_domHelper || goog.dom.getDomHelper();
		// Instantiate the button based on the descriptor.
		button = factory(id, tooltip, caption, classNames, null, domHelper);
		// If this button's state should be queried when updating the toolbar,
		// set the button object's queryable property to true.
		if (descriptor.queryable) {
			button.queryable = true;
		}
	}
	return button;
};

/**
 * A set of built-in buttons to display in the default editor toolbar.
 * 
 * @type {!Array.<string>}
 */
jchemhub.view.DefaultToolbar.DEFAULT_BUTTONS = [ jchemhub.view.Command.IMAGE,
		jchemhub.view.Command.LINK, jchemhub.view.Command.BOLD,
		jchemhub.view.Command.ITALIC, jchemhub.view.Command.UNORDERED_LIST,
		jchemhub.view.Command.FONT_COLOR, jchemhub.view.Command.FONT_FACE,
		jchemhub.view.Command.FONT_SIZE, jchemhub.view.Command.JUSTIFY_LEFT,
		jchemhub.view.Command.JUSTIFY_CENTER,
		jchemhub.view.Command.JUSTIFY_RIGHT, jchemhub.view.Command.EDIT_HTML ];

/**
 * A set of built-in buttons to display in the default editor toolbar when the
 * editor chrome is right-to-left (BiDi mode only).
 * 
 * @type {!Array.<string>}
 */
jchemhub.view.DefaultToolbar.DEFAULT_BUTTONS_RTL = [
		jchemhub.view.Command.IMAGE, jchemhub.view.Command.LINK,
		jchemhub.view.Command.BOLD, jchemhub.view.Command.ITALIC,
		jchemhub.view.Command.UNORDERED_LIST, jchemhub.view.Command.FONT_COLOR,
		jchemhub.view.Command.FONT_FACE, jchemhub.view.Command.FONT_SIZE,
		jchemhub.view.Command.JUSTIFY_RIGHT,
		jchemhub.view.Command.JUSTIFY_CENTER,
		jchemhub.view.Command.JUSTIFY_LEFT, jchemhub.view.Command.DIR_RTL,
		jchemhub.view.Command.DIR_LTR, jchemhub.view.Command.EDIT_HTML ];

/**
 * Creates a toolbar button with the given ID, tooltip, and caption. Applies any
 * custom CSS class names to the button's caption element. This button is
 * designed to be used as the RTL button.
 * 
 * @param {string}
 *            id Button ID; must equal a {@link jchemhub.view.Command} for
 *            built-in buttons, anything else for custom buttons.
 * @param {string}
 *            tooltip Tooltip to be shown on hover.
 * @param {goog.ui.ControlContent}
 *            caption Button caption.
 * @param {string=}
 *            opt_classNames CSS class name(s) to apply to the caption element.
 * @param {goog.ui.ButtonRenderer=}
 *            opt_renderer Button renderer; defaults to
 *            {@link goog.ui.ToolbarButtonRenderer} if unspecified.
 * @param {goog.dom.DomHelper=}
 *            opt_domHelper DOM helper, used for DOM creation; defaults to the
 *            current document if unspecified.
 * @return {!goog.ui.Button} A toolbar button.
 * @private
 */
jchemhub.view.DefaultToolbar.rtlButtonFactory_ = function(id, tooltip, caption,
		opt_classNames, opt_renderer, opt_domHelper) {
	var button = jchemhub.view.ToolbarFactory.makeToggleButton(id, tooltip,
			caption, opt_classNames, opt_renderer, opt_domHelper);
	button.updateFromValue = function(value) {
		// Enable/disable right-to-left text editing mode in the toolbar.
		var isRtl = !!value;
		// Enable/disable a marker class on the toolbar's root element; the rest
		// is
		// done using CSS scoping in editortoolbar.css. This changes
		// direction-senitive toolbar icons (like indent/outdent)
		goog.dom.classes.enable(button.getParent().getElement(), goog
				.getCssName('tr-rtl-mode'), isRtl);
		button.setChecked(isRtl);
	}
	return button;
};

/**
 * Creates a toolbar button with the given ID, tooltip, and caption. Applies any
 * custom CSS class names to the button's caption element. Designed to be used
 * to create undo and redo buttons.
 * 
 * @param {string}
 *            id Button ID; must equal a {@link jchemhub.view.Command} for
 *            built-in buttons, anything else for custom buttons.
 * @param {string}
 *            tooltip Tooltip to be shown on hover.
 * @param {goog.ui.ControlContent}
 *            caption Button caption.
 * @param {string=}
 *            opt_classNames CSS class name(s) to apply to the caption element.
 * @param {goog.ui.ButtonRenderer=}
 *            opt_renderer Button renderer; defaults to
 *            {@link goog.ui.ToolbarButtonRenderer} if unspecified.
 * @param {goog.dom.DomHelper=}
 *            opt_domHelper DOM helper, used for DOM creation; defaults to the
 *            current document if unspecified.
 * @return {!goog.ui.Button} A toolbar button.
 * @private
 */
jchemhub.view.DefaultToolbar.undoRedoButtonFactory_ = function(id, tooltip,
		caption, opt_classNames, opt_renderer, opt_domHelper) {
	var button = jchemhub.view.ToolbarFactory.makeButton(id, tooltip, caption,
			opt_classNames, opt_renderer, opt_domHelper);
	button.updateFromValue = function(value) {
		button.setEnabled(value);
	}
	return button;
};

/**
 * Creates a toolbar button with the given ID, tooltip, and caption. Applies any
 * custom CSS class names to the button's caption element. Used to create a font
 * face button, filled with default fonts.
 * 
 * @param {string}
 *            id Button ID; must equal a {@link jchemhub.view.Command} for
 *            built-in buttons, anything else for custom buttons.
 * @param {string}
 *            tooltip Tooltip to be shown on hover.
 * @param {goog.ui.ControlContent}
 *            caption Button caption.
 * @param {string=}
 *            opt_classNames CSS class name(s) to apply to the caption element.
 * @param {goog.ui.MenuButtonRenderer=}
 *            opt_renderer Button renderer; defaults to
 *            {@link goog.ui.ToolbarMenuButtonRenderer} if unspecified.
 * @param {goog.dom.DomHelper=}
 *            opt_domHelper DOM helper, used for DOM creation; defaults to the
 *            current document if unspecified.
 * @return {!goog.ui.Button} A toolbar button.
 * @private
 */
jchemhub.view.DefaultToolbar.fontFaceFactory_ = function(id, tooltip, caption,
		opt_classNames, opt_renderer, opt_domHelper) {
	var button = jchemhub.view.ToolbarFactory.makeSelectButton(id, tooltip,
			caption, opt_classNames, opt_renderer, opt_domHelper);
	jchemhub.view.DefaultToolbar.addDefaultFonts(button);
	button.setDefaultCaption(jchemhub.view.DefaultToolbar.MSG_FONT_NORMAL);
	// Font options don't have keyboard accelerators.
	goog.dom.classes.add(button.getMenu().getContentElement(), goog
			.getCssName('goog-menu-noaccel'));

	// How to update this button's state.
	button.updateFromValue = function(value) {
		// Normalize value to null or a non-empty string (sometimes we get
		// the empty string, sometimes we get false...), extract the substring
		// up to the first comma to get the primary font name, and normalize
		// to lowercase. This allows us to map a font spec like "Arial,
		// Helvetica, sans-serif" to a font menu item.
		// TODO (attila): Try to make this more robust.
		var item = null;
		if (value && value.length > 0) {
			item = /** @type {goog.ui.MenuItem} */
			(button.getMenu().getChild(jchemhub.view.ToolbarFactory
					.getPrimaryFont(value)));
		}
		var selectedItem = button.getSelectedItem();
		if (item != selectedItem) {
			button.setSelectedItem(item);
		}
	}
	return button;
};

/**
 * Creates a toolbar button with the given ID, tooltip, and caption. Applies any
 * custom CSS class names to the button's caption element. Use to create a font
 * size button, filled with default font sizes.
 * 
 * @param {string}
 *            id Button ID; must equal a {@link jchemhub.view.Command} for
 *            built-in buttons, anything else for custom buttons.
 * @param {string}
 *            tooltip Tooltip to be shown on hover.
 * @param {goog.ui.ControlContent}
 *            caption Button caption.
 * @param {string=}
 *            opt_classNames CSS class name(s) to apply to the caption element.
 * @param {goog.ui.MenuButtonRenderer=}
 *            opt_renderer Button renderer; defaults to
 *            {@link goog.ui.ToolbarMebuButtonRenderer} if unspecified.
 * @param {goog.dom.DomHelper=}
 *            opt_domHelper DOM helper, used for DOM creation; defaults to the
 *            current document if unspecified.
 * @return {!goog.ui.Button} A toolbar button.
 * @private
 */
jchemhub.view.DefaultToolbar.fontSizeFactory_ = function(id, tooltip, caption,
		opt_classNames, opt_renderer, opt_domHelper) {
	var button = jchemhub.view.ToolbarFactory.makeSelectButton(id, tooltip,
			caption, opt_classNames, opt_renderer, opt_domHelper);
	jchemhub.view.DefaultToolbar.addDefaultFontSizes(button);
	button.setDefaultCaption(jchemhub.view.DefaultToolbar.MSG_FONT_SIZE_NORMAL);
	// Font size options don't have keyboard accelerators.
	goog.dom.classes.add(button.getMenu().getContentElement(), goog
			.getCssName('goog-menu-noaccel'));
	// How to update this button's state.
	button.updateFromValue = function(value) {
		// Webkit returns a string like '32px' instead of the equivalent
		// integer, so normalize that first.
		// NOTE: Gecko returns "6" so can't just normalize all
		// strings, only ones ending in "px".
		if (goog.isString(value) && goog.style.getLengthUnits(value) == 'px') {
			value = jchemhub.view.ToolbarFactory.getLegacySizeFromPx(parseInt(
					value, 10));
		}
		// Normalize value to null or a positive integer (sometimes we get
		// the empty string, sometimes we get false, or -1 if the above
		// normalization didn't match to a particular 0-7 size)
		value = value > 0 ? value : null;
		if (value != button.getValue()) {
			button.setValue(value);
		}
	}
	return button;
};

/**
 * Function to update the state of a color menu button.
 * 
 * @param {goog.ui.ToolbarColorMenuButton}
 *            button The button to which the color menu is attached.
 * @param {number}
 *            value Color value to update to.
 * @private
 */
jchemhub.view.DefaultToolbar.colorUpdateFromValue_ = function(button, value) {
	/** @preserveTry */
	try {
		if (goog.userAgent.IE) {
			// IE returns a number that, converted to hex, is a BGR color.
			// Convert from decimal to BGR to RGB.
			var hex = '000000' + value.toString(16);
			var bgr = hex.substr(hex.length - 6, 6);
			value = new goog.string.StringBuffer('#', bgr.substring(4, 6), bgr
					.substring(2, 4), bgr.substring(0, 2)).toString();
		}
		if (value != button.getValue()) {
			button.setValue(/** @type {string} */
			(value));
		}
	} catch (ex) {
		// TODO: Find out when/why this happens.
	}
};

/**
 * Creates a toolbar button with the given ID, tooltip, and caption. Applies any
 * custom CSS class names to the button's caption element. Use to create a font
 * color button.
 * 
 * @param {string}
 *            id Button ID; must equal a {@link jchemhub.view.Command} for
 *            built-in buttons, anything else for custom buttons.
 * @param {string}
 *            tooltip Tooltip to be shown on hover.
 * @param {goog.ui.ControlContent}
 *            caption Button caption.
 * @param {string=}
 *            opt_classNames CSS class name(s) to apply to the caption element.
 * @param {goog.ui.ColorMenuButtonRenderer=}
 *            opt_renderer Button renderer; defaults to
 *            {@link goog.ui.ToolbarColorMenuButtonRenderer} if unspecified.
 * @param {goog.dom.DomHelper=}
 *            opt_domHelper DOM helper, used for DOM creation; defaults to the
 *            current document if unspecified.
 * @return {!goog.ui.Button} A toolbar button.
 * @private
 */
jchemhub.view.DefaultToolbar.fontColorFactory_ = function(id, tooltip, caption,
		opt_classNames, opt_renderer, opt_domHelper) {
	var button = jchemhub.view.ToolbarFactory.makeColorMenuButton(id, tooltip,
			caption, opt_classNames, opt_renderer, opt_domHelper);
	// Initialize default foreground color.
	button.setSelectedColor('#000');
	button.updateFromValue = goog.partial(
			jchemhub.view.DefaultToolbar.colorUpdateFromValue_, button);
	return button;
};

/**
 * Creates a toolbar button with the given ID, tooltip, and caption. Applies any
 * custom CSS class names to the button's caption element. Use to create a font
 * background color button.
 * 
 * @param {string}
 *            id Button ID; must equal a {@link jchemhub.view.Command} for
 *            built-in buttons, anything else for custom buttons.
 * @param {string}
 *            tooltip Tooltip to be shown on hover.
 * @param {goog.ui.ControlContent}
 *            caption Button caption.
 * @param {string=}
 *            opt_classNames CSS class name(s) to apply to the caption element.
 * @param {goog.ui.ColorMenuButtonRenderer=}
 *            opt_renderer Button renderer; defaults to
 *            {@link goog.ui.ToolbarColorMenuButtonRenderer} if unspecified.
 * @param {goog.dom.DomHelper=}
 *            opt_domHelper DOM helper, used for DOM creation; defaults to the
 *            current document if unspecified.
 * @return {!goog.ui.Button} A toolbar button.
 * @private
 */
jchemhub.view.DefaultToolbar.backgroundColorFactory_ = function(id, tooltip,
		caption, opt_classNames, opt_renderer, opt_domHelper) {
	var button = jchemhub.view.ToolbarFactory.makeColorMenuButton(id, tooltip,
			caption, opt_classNames, opt_renderer, opt_domHelper);
	// Initialize default background color.
	button.setSelectedColor('#FFF');
	button.updateFromValue = goog.partial(
			jchemhub.view.DefaultToolbar.colorUpdateFromValue_, button);
	return button;
};

/**
 * Creates a toolbar button with the given ID, tooltip, and caption. Applies any
 * custom CSS class names to the button's caption element. Use to create the
 * format menu, prefilled with default formats.
 * 
 * @param {string}
 *            id Button ID; must equal a {@link jchemhub.view.Command} for
 *            built-in buttons, anything else for custom buttons.
 * @param {string}
 *            tooltip Tooltip to be shown on hover.
 * @param {goog.ui.ControlContent}
 *            caption Button caption.
 * @param {string=}
 *            opt_classNames CSS class name(s) to apply to the caption element.
 * @param {goog.ui.MenuButtonRenderer=}
 *            opt_renderer Button renderer; defaults to
 *            {@link goog.ui.ToolbarMenuButtonRenderer} if unspecified.
 * @param {goog.dom.DomHelper=}
 *            opt_domHelper DOM helper, used for DOM creation; defaults to the
 *            current document if unspecified.
 * @return {!goog.ui.Button} A toolbar button.
 * @private
 */
jchemhub.view.DefaultToolbar.formatBlockFactory_ = function(id, tooltip,
		caption, opt_classNames, opt_renderer, opt_domHelper) {
	var button = jchemhub.view.ToolbarFactory.makeSelectButton(id, tooltip,
			caption, opt_classNames, opt_renderer, opt_domHelper);
	jchemhub.view.DefaultToolbar.addDefaultFormatOptions(button);
	button.setDefaultCaption(jchemhub.view.DefaultToolbar.MSG_FORMAT_NORMAL);
	// Format options don't have keyboard accelerators.
	goog.dom.classes.add(button.getMenu().getContentElement(), goog
			.getCssName('goog-menu-noaccel'));
	// How to update this button.
	button.updateFromValue = function(value) {
		// Normalize value to null or a nonempty string (sometimes we get
		// the empty string, sometimes we get false...)
		value = value && value.length > 0 ? value : null;
		if (value != button.getValue()) {
			button.setValue(value);
		}
	}
	return button;
};

// Messages used for tooltips and captions.

/** @desc Format menu tooltip. */
jchemhub.view.DefaultToolbar.MSG_FORMAT_BLOCK_TITLE = goog.getMsg('Format');

/** @desc Format menu caption. */
jchemhub.view.DefaultToolbar.MSG_FORMAT_BLOCK_CAPTION = goog.getMsg('Format');

/** @desc Undo button tooltip. */
jchemhub.view.DefaultToolbar.MSG_UNDO_TITLE = goog.getMsg('Undo');

/** @desc Redo button tooltip. */
jchemhub.view.DefaultToolbar.MSG_REDO_TITLE = goog.getMsg('Redo');

/** @desc Font menu tooltip. */
jchemhub.view.DefaultToolbar.MSG_FONT_FACE_TITLE = goog.getMsg('Font');

/** @desc Font size menu tooltip. */
jchemhub.view.DefaultToolbar.MSG_FONT_SIZE_TITLE = goog.getMsg('Font size');

/** @desc Text foreground color menu tooltip. */
jchemhub.view.DefaultToolbar.MSG_FONT_COLOR_TITLE = goog.getMsg('Text color');

/** @desc Bold button tooltip. */
jchemhub.view.DefaultToolbar.MSG_BOLD_TITLE = goog.getMsg('Bold');

/** @desc Italic button tooltip. */
jchemhub.view.DefaultToolbar.MSG_ITALIC_TITLE = goog.getMsg('Italic');

/** @desc Underline button tooltip. */
jchemhub.view.DefaultToolbar.MSG_UNDERLINE_TITLE = goog.getMsg('Underline');

/** @desc Text background color menu tooltip. */
jchemhub.view.DefaultToolbar.MSG_BACKGROUND_COLOR_TITLE = goog
		.getMsg('Text background color');

/** @desc Link button tooltip. */
jchemhub.view.DefaultToolbar.MSG_LINK_TITLE = goog.getMsg('Add or remove link');

/** @desc Numbered list button tooltip. */
jchemhub.view.DefaultToolbar.MSG_ORDERED_LIST_TITLE = goog
		.getMsg('Numbered list');

/** @desc Bullet list button tooltip. */
jchemhub.view.DefaultToolbar.MSG_UNORDERED_LIST_TITLE = goog
		.getMsg('Bullet list');

/** @desc Outdent button tooltip. */
jchemhub.view.DefaultToolbar.MSG_OUTDENT_TITLE = goog.getMsg('Decrease indent');

/** @desc Indent button tooltip. */
jchemhub.view.DefaultToolbar.MSG_INDENT_TITLE = goog.getMsg('Increase indent');

/** @desc Align left button tooltip. */
jchemhub.view.DefaultToolbar.MSG_ALIGN_LEFT_TITLE = goog.getMsg('Align left');

/** @desc Align center button tooltip. */
jchemhub.view.DefaultToolbar.MSG_ALIGN_CENTER_TITLE = goog
		.getMsg('Align center');

/** @desc Align right button tooltip. */
jchemhub.view.DefaultToolbar.MSG_ALIGN_RIGHT_TITLE = goog.getMsg('Align right');

/** @desc Justify button tooltip. */
jchemhub.view.DefaultToolbar.MSG_JUSTIFY_TITLE = goog.getMsg('Justify');

/** @desc Remove formatting button tooltip. */
jchemhub.view.DefaultToolbar.MSG_REMOVE_FORMAT_TITLE = goog
		.getMsg('Remove formatting');

/** @desc Insert image button tooltip. */
jchemhub.view.DefaultToolbar.MSG_IMAGE_TITLE = goog.getMsg('Insert image');

/** @desc Strike through button tooltip. */
jchemhub.view.DefaultToolbar.MSG_STRIKE_THROUGH_TITLE = goog
		.getMsg('Strikethrough');

/** @desc Left-to-right button tooltip. */
jchemhub.view.DefaultToolbar.MSG_DIR_LTR_TITLE = goog.getMsg('Left-to-right');

/** @desc Right-to-left button tooltip. */
jchemhub.view.DefaultToolbar.MSG_DIR_RTL_TITLE = goog.getMsg('Right-to-left');

/** @desc Blockquote button tooltip. */
jchemhub.view.DefaultToolbar.MSG_BLOCKQUOTE_TITLE = goog.getMsg('Quote');

/** @desc Edit HTML button tooltip. */
jchemhub.view.DefaultToolbar.MSG_EDIT_HTML_TITLE = goog
		.getMsg('Edit HTML source');

/** @desc Link button caption. */
jchemhub.view.DefaultToolbar.MSG_LINK_CAPTION = goog.getMsg('Link');

/** @desc Subscript button tooltip. */
jchemhub.view.DefaultToolbar.MSG_SUBSCRIPT = goog.getMsg('Subscript');

/** @desc Superscript button tooltip. */
jchemhub.view.DefaultToolbar.MSG_SUPERSCRIPT = goog.getMsg('Superscript');

/** @desc Edit HTML button caption. */
jchemhub.view.DefaultToolbar.MSG_EDIT_HTML_CAPTION = goog.getMsg('Edit HTML');

/**
 * Map of {@code jchemhub.view.Command}s to toolbar button descriptor objects,
 * each of which has the following attributes:
 * <ul>
 * <li>{@code command} - The command corresponding to the button (mandatory)
 * <li>{@code tooltip} - Tooltip text (optional); if unspecified, the button
 * has no hover text
 * <li>{@code caption} - Caption to display on the button (optional); if
 * unspecified, the button has no text caption
 * <li>{@code classes} - CSS class name(s) to be applied to the button's
 * element when rendered (optional); if unspecified, defaults to 'tr-icon' plus
 * 'tr-' followed by the command ID, but without any leading '+' character (e.g.
 * if the command ID is '+undo', then {@code classes} defaults to 'tr-icon
 * tr-undo')
 * <li>{@code factory} - factory function used to create the button, which must
 * accept {@code id}, {@code tooltip}, {@code caption}, and {@code classes}
 * as arguments, and must return an instance of {@link goog.ui.Button} or an
 * appropriate subclass (optional); if unspecified, defaults to
 * {@link jchemhub.view.DefaultToolbar.makeToggleButton}, since most built-in
 * toolbar buttons are toggle buttons
 * <li>(@code queryable} - Whether the button's state should be queried when
 * updating the toolbar (optional).
 * </ul>
 * Note that this object is only used for creating toolbar buttons for built-in
 * editor commands; custom buttons aren't listed here. Please don't try to hack
 * this!
 * 
 * @type {Object.<!jchemhub.view.ReactionEditor.ButtonDescriptor>}.
 * @private
 */
jchemhub.view.DefaultToolbar.buttons_ = {};

/**
 * @type {{command: string, tooltip: ?string, caption: ?goog.ui.ControlContent,
 *       classes: ?string, factory: ?function(string, string,
 *       goog.ui.ControlContent, ?string, goog.ui.ButtonRenderer,
 *       goog.dom.DomHelper):goog.ui.Button, queryable:?boolean}}
 */
jchemhub.view.DefaultToolbar.ButtonDescriptor = goog.typedef;

/**
 * Built-in toolbar button descriptors. See
 * {@link jchemhub.view.DefaultToolbar.buttons_} for details on button
 * descriptor objects. This array is processed at JS parse time; each item is
 * inserted into {@link jchemhub.view.DefaultToolbar.buttons_}, and the array
 * itself is deleted and (hopefully) garbage-collected.
 * 
 * @type {Array.<!jchemhub.view.ReactionEditor.ButtonDescriptor>}.
 * @private
 */
jchemhub.view.DefaultToolbar.BUTTONS_ = [
		{
			command : jchemhub.view.Command.UNDO,
			tooltip : jchemhub.view.DefaultToolbar.MSG_UNDO_TITLE,
			classes : goog.getCssName('tr-icon') + ' '
					+ goog.getCssName('tr-undo'),
			factory : jchemhub.view.DefaultToolbar.undoRedoButtonFactory_,
			queryable : true
		},
		{
			command : jchemhub.view.Command.REDO,
			tooltip : jchemhub.view.DefaultToolbar.MSG_REDO_TITLE,
			classes : goog.getCssName('tr-icon') + ' '
					+ goog.getCssName('tr-redo'),
			factory : jchemhub.view.DefaultToolbar.undoRedoButtonFactory_,
			queryable : true
		},
		{
			command : jchemhub.view.Command.FONT_FACE,
			tooltip : jchemhub.view.DefaultToolbar.MSG_FONT_FACE_TITLE,
			classes : goog.getCssName('tr-fontName'),
			factory : jchemhub.view.DefaultToolbar.fontFaceFactory_,
			queryable : true
		},
		{
			command : jchemhub.view.Command.FONT_SIZE,
			tooltip : jchemhub.view.DefaultToolbar.MSG_FONT_SIZE_TITLE,
			classes : goog.getCssName('tr-fontSize'),
			factory : jchemhub.view.DefaultToolbar.fontSizeFactory_,
			queryable : true
		},
		{
			command : jchemhub.view.Command.BOLD,
			tooltip : jchemhub.view.DefaultToolbar.MSG_BOLD_TITLE,
			classes : goog.getCssName('tr-icon') + ' '
					+ goog.getCssName('tr-bold'),
			queryable : true
		},
		{
			command : jchemhub.view.Command.ITALIC,
			tooltip : jchemhub.view.DefaultToolbar.MSG_ITALIC_TITLE,
			classes : goog.getCssName('tr-icon') + ' '
					+ goog.getCssName('tr-italic'),
			queryable : true
		},
		{
			command : jchemhub.view.Command.UNDERLINE,
			tooltip : jchemhub.view.DefaultToolbar.MSG_UNDERLINE_TITLE,
			classes : goog.getCssName('tr-icon') + ' '
					+ goog.getCssName('tr-underline'),
			queryable : true
		},
		{
			command : jchemhub.view.Command.FONT_COLOR,
			tooltip : jchemhub.view.DefaultToolbar.MSG_FONT_COLOR_TITLE,
			classes : goog.getCssName('tr-icon') + ' '
					+ goog.getCssName('tr-foreColor'),
			factory : jchemhub.view.DefaultToolbar.fontColorFactory_,
			queryable : true
		},
		{
			command : jchemhub.view.Command.BACKGROUND_COLOR,
			tooltip : jchemhub.view.DefaultToolbar.MSG_BACKGROUND_COLOR_TITLE,
			classes : goog.getCssName('tr-icon') + ' '
					+ goog.getCssName('tr-backColor'),
			factory : jchemhub.view.DefaultToolbar.backgroundColorFactory_,
			queryable : true
		},
		{
			command : jchemhub.view.Command.LINK,
			tooltip : jchemhub.view.DefaultToolbar.MSG_LINK_TITLE,
			caption : jchemhub.view.DefaultToolbar.MSG_LINK_CAPTION,
			classes : goog.getCssName('tr-link'),
			queryable : true
		},
		{
			command : jchemhub.view.Command.ORDERED_LIST,
			tooltip : jchemhub.view.DefaultToolbar.MSG_ORDERED_LIST_TITLE,
			classes : goog.getCssName('tr-icon') + ' '
					+ goog.getCssName('tr-insertOrderedList'),
			queryable : true
		},
		{
			command : jchemhub.view.Command.UNORDERED_LIST,
			tooltip : jchemhub.view.DefaultToolbar.MSG_UNORDERED_LIST_TITLE,
			classes : goog.getCssName('tr-icon') + ' '
					+ goog.getCssName('tr-insertUnorderedList'),
			queryable : true
		},
		{
			command : jchemhub.view.Command.OUTDENT,
			tooltip : jchemhub.view.DefaultToolbar.MSG_OUTDENT_TITLE,
			classes : goog.getCssName('tr-icon') + ' '
					+ goog.getCssName('tr-outdent'),
			factory : jchemhub.view.ToolbarFactory.makeButton
		},
		{
			command : jchemhub.view.Command.INDENT,
			tooltip : jchemhub.view.DefaultToolbar.MSG_INDENT_TITLE,
			classes : goog.getCssName('tr-icon') + ' '
					+ goog.getCssName('tr-indent'),
			factory : jchemhub.view.ToolbarFactory.makeButton
		},
		{
			command : jchemhub.view.Command.JUSTIFY_LEFT,
			tooltip : jchemhub.view.DefaultToolbar.MSG_ALIGN_LEFT_TITLE,
			classes : goog.getCssName('tr-icon') + ' '
					+ goog.getCssName('tr-justifyLeft'),
			queryable : true
		},
		{
			command : jchemhub.view.Command.JUSTIFY_CENTER,
			tooltip : jchemhub.view.DefaultToolbar.MSG_ALIGN_CENTER_TITLE,
			classes : goog.getCssName('tr-icon') + ' '
					+ goog.getCssName('tr-justifyCenter'),
			queryable : true
		},
		{
			command : jchemhub.view.Command.JUSTIFY_RIGHT,
			tooltip : jchemhub.view.DefaultToolbar.MSG_ALIGN_RIGHT_TITLE,
			classes : goog.getCssName('tr-icon') + ' '
					+ goog.getCssName('tr-justifyRight'),
			queryable : true
		},
		{
			command : jchemhub.view.Command.JUSTIFY_FULL,
			tooltip : jchemhub.view.DefaultToolbar.MSG_JUSTIFY_TITLE,
			classes : goog.getCssName('tr-icon') + ' '
					+ goog.getCssName('tr-justifyFull'),
			queryable : true
		},
		{
			command : jchemhub.view.Command.REMOVE_FORMAT,
			tooltip : jchemhub.view.DefaultToolbar.MSG_REMOVE_FORMAT_TITLE,
			classes : goog.getCssName('tr-icon') + ' '
					+ goog.getCssName('tr-removeFormat'),
			factory : jchemhub.view.ToolbarFactory.makeButton
		},
		{
			command : jchemhub.view.Command.IMAGE,
			tooltip : jchemhub.view.DefaultToolbar.MSG_IMAGE_TITLE,
			classes : goog.getCssName('tr-icon') + ' '
					+ goog.getCssName('tr-image'),
			factory : jchemhub.view.ToolbarFactory.makeButton
		},
		{
			command : jchemhub.view.Command.STRIKE_THROUGH,
			tooltip : jchemhub.view.DefaultToolbar.MSG_STRIKE_THROUGH_TITLE,
			classes : goog.getCssName('tr-icon') + ' '
					+ goog.getCssName('tr-strikeThrough'),
			queryable : true
		},
		{
			command : jchemhub.view.Command.SUBSCRIPT,
			tooltip : jchemhub.view.DefaultToolbar.MSG_SUBSCRIPT,
			classes : goog.getCssName('tr-icon') + ' '
					+ goog.getCssName('tr-subscript'),
			queryable : true
		},
		{
			command : jchemhub.view.Command.SUPERSCRIPT,
			tooltip : jchemhub.view.DefaultToolbar.MSG_SUPERSCRIPT,
			classes : goog.getCssName('tr-icon') + ' '
					+ goog.getCssName('tr-superscript'),
			queryable : true
		},
		{
			command : jchemhub.view.Command.DIR_LTR,
			tooltip : jchemhub.view.DefaultToolbar.MSG_DIR_LTR_TITLE,
			classes : goog.getCssName('tr-icon') + ' '
					+ goog.getCssName('tr-ltr'),
			queryable : true
		},
		{
			command : jchemhub.view.Command.DIR_RTL,
			tooltip : jchemhub.view.DefaultToolbar.MSG_DIR_RTL_TITLE,
			classes : goog.getCssName('tr-icon') + ' '
					+ goog.getCssName('tr-rtl'),
			factory : jchemhub.view.DefaultToolbar.rtlButtonFactory_,
			queryable : true
		},
		{
			command : jchemhub.view.Command.BLOCKQUOTE,
			tooltip : jchemhub.view.DefaultToolbar.MSG_BLOCKQUOTE_TITLE,
			classes : goog.getCssName('tr-icon') + ' '
					+ goog.getCssName('tr-BLOCKQUOTE'),
			queryable : true
		}, {
			command : jchemhub.view.Command.FORMAT_BLOCK,
			tooltip : jchemhub.view.DefaultToolbar.MSG_FORMAT_BLOCK_TITLE,
			caption : jchemhub.view.DefaultToolbar.MSG_FORMAT_BLOCK_CAPTION,
			classes : goog.getCssName('tr-formatBlock'),
			factory : jchemhub.view.DefaultToolbar.formatBlockFactory_,
			queryable : true
		}, {
			command : jchemhub.view.Command.EDIT_HTML,
			tooltip : jchemhub.view.DefaultToolbar.MSG_EDIT_HTML_TITLE,
			caption : jchemhub.view.DefaultToolbar.MSG_EDIT_HTML_CAPTION,
			classes : goog.getCssName('tr-editHtml'),
			factory : jchemhub.view.ToolbarFactory.makeButton
		} ];

(function() {
	// Create the jchemhub.view.DefaultToolbar.buttons_ map from
	// jchemhub.view.DefaultToolbar.BUTTONS_.
	for ( var i = 0, button; button = jchemhub.view.DefaultToolbar.BUTTONS_[i]; i++) {
		jchemhub.view.DefaultToolbar.buttons_[button.command] = button;
	}

	// jchemhub.view.DefaultToolbar.BUTTONS_ is no longer needed
	// once the map is ready.
	delete jchemhub.view.DefaultToolbar.BUTTONS_;

})();
