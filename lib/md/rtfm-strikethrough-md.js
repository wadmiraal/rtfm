
var strikeThroughHtml = require( '../html/rtfm-strikethrough-html' );

// Markdown does not have a strike-through implementation. It can,
// however, use normal HTML. Extend the HTML strike-through plugin.
var strikeThroughMarkdown = strikeThroughHtml.extend({});

module.exports = strikeThroughMarkdown;
