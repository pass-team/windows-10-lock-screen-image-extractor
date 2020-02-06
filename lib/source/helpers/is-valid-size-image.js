"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.default=void 0;var _constants=require("../constants");/**
 *  @Helper
 *  @Input:
 *    - { width, height }: a file meta object
 *  @Output:
 *    - return:
 *      - true: if image has a valid resolution
 *      - false: otherwise
 */var _default=({height,width})=>height>=_constants.IMAGE_MIN_HEIGHT&&width>=_constants.IMAGE_MIN_WIDTH||height>=_constants.IMAGE_MIN_WIDTH&&width>=_constants.IMAGE_MIN_HEIGHT;exports.default=_default;