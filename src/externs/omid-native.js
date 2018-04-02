/**
 * @typedef {{
 *   setTimeout: function(function(), number):number,
 *   clearTimeout: function(number),
 *   setInterval: function(function(), number):number,
 *   clearInterval: function(number),
 *   sendUrl: function(string, function()=, function()=),
 *   injectJavascriptResource: function(string),
 * }}
 */
const OmidNativeType = {};

/**
 * Top level object (variable) provided by OMID Native as a means for OMID JS
 * to invoke it. omidNative object provides functionality that otherwise cannot
 * be found in a Javascript Core environment, due to the lack of a window top
 * level object.
 * @type {!OmidNativeType}
 */
const omidNative = /** @type {!OmidNativeType} */ ({});

/**
 * NativeViewInfo object passed from native layer to service. Including this in
 * the externs prevents minifying object keys when the service is built.
 * @type {!OmidNativeViewInfo}
 */

/** @constructor */
function OmidNativeViewInfo() {}

/** @type {number} */
OmidNativeViewInfo.prototype.x;

/** @type {number} */
OmidNativeViewInfo.prototype.y;

/** @type {number} */
OmidNativeViewInfo.prototype.endX;

/** @type {number} */
OmidNativeViewInfo.prototype.endY;

/** @type {number} */
OmidNativeViewInfo.prototype.width;

/** @type {number} */
OmidNativeViewInfo.prototype.height;

/** @type {string|undefined} */
OmidNativeViewInfo.prototype.adSessionId;

/** @type {string|undefined} */
OmidNativeViewInfo.prototype.isFriendlyObstructionFor;

/** @type {boolean|undefined} */
OmidNativeViewInfo.prototype.clipsToBounds;

/** @type {!Array<!OmidNativeViewInfo>|undefined} */
OmidNativeViewInfo.prototype.childViews;

/** @type {boolean|undefined} */
OmidNativeViewInfo.prototype.isCreative;
