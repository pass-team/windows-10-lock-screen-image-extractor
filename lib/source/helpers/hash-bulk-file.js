"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.default=_default;var _hashFile=_interopRequireDefault(require("./hash-file"));function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}/**
 *  @Helper
 *  @Input:
 *    - files: an array of file meta objects
 *  @Output:
 *    - return an array of file hashes
 */function _default(files){return files.map(({path,name})=>(0,_hashFile.default)(path+name))};