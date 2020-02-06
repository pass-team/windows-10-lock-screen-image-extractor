"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.default=_default;var _fs=_interopRequireDefault(require("fs"));var _normalizePath=_interopRequireDefault(require("./normalize-path"));function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}/**
 *  @Helper
 *  @Input:
 *    - path: path to containing folder
 *  @Output:
 *    - An array of file meta objects
 */function _default(path){/* Process the path, so different path format won't break nodejs readdirSync api */const filePath=(0,_normalizePath.default)(path);try{return _fs.default.readdirSync(filePath).map(file=>({name:file,path:filePath}))}catch(e){return[]}};