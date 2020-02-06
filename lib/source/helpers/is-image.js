"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.default=void 0;var _constants=require("../constants");/**
 *  @Helper
 *  @Input:
 *    - {type}: a file meta object
 *  @Output:
 *    - return:
 *      - true: if file is an image
 *      - false: otherwise
 */var _default=({type})=>type===_constants.IMAGE_TYPE_JPG||type===_constants.IMAGE_TYPE_PNG;exports.default=_default;