"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.default=void 0;/**
 *  @Helper
 *  @Input:
 *    - { width, height }: a file meta object
 *  @Output:
 *    - return:
 *      - true: if image is landscape
 *      - false: otherwise
 */var _default=({width,height})=>width>height;exports.default=_default;