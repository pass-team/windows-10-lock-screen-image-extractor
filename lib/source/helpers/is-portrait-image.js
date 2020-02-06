"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.default=void 0;/**
 *  @Helper
 *  @Input:
 *    - { width, height }: a file meta object
 *  @Output:
 *    - return:
 *      - true: if image is portrait
 *      - false: otherwise
 */var _default=({width,height})=>height>width;exports.default=_default;