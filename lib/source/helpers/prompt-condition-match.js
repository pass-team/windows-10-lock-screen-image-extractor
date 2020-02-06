"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.default=_default;/**
 *  @Helper
 *  @Input:
 *    - process: the current process run by node
 *  @Output:
 *    - return:
 *      - true: detect no additional arguments from user
 *      - false: detect additional arguments from user
 */function _default(process){return process.argv.splice(2).length<=0};