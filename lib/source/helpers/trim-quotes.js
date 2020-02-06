"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.default=_default;/**
 *  @Helper
 *  @Input: a random string
 *  @Output: remove all quotes and double quotes inside
 */function _default(string){return string.replace(/['"]+/g,"")}