"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.default=_default;/**
 *  @Helper
 *  @Input:
 *    - path: Input path from user
 *  @Output:
 *    - return: path that has been reformatted
 */function _default(path){let output=path;if(!path.endsWith("\\")&&!path.endsWith("/")){output+="\\"}return output};