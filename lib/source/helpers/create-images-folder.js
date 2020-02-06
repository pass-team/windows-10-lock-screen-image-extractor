"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.default=_default;var _fs=_interopRequireDefault(require("fs"));function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}/**
 *  @Helper
 *  @Input:
 *    - path: path to image folder
 *  @Output:
 *    - true if create successfully or EEXIST exception occurs: means the folder already existed
 *    - false otherwise
 */function _default(path){try{_fs.default.mkdirSync(path,{recursive:true})}catch(e){if(e.code!=="EEXIST")return false}return true}