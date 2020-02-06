"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.default=_default;var _fs=_interopRequireDefault(require("fs"));var _constants=require("../constants");var _normalizePath=_interopRequireDefault(require("./normalize-path"));function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}/**
 *  @Helper
 *  @Input:
 *    - path: path to image saving folder
 *  @Output:
 *    - path to image saving folder is written to .userconfig
 */function _default(path){_fs.default.writeFileSync(_constants.PATH_TO_CONFIG,(0,_normalizePath.default)(path))}