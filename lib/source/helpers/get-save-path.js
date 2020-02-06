"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.default=_default;var _fs=_interopRequireDefault(require("fs"));var _constants=require("../constants");function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}/**
 *  @Helper
 *  @Input: No
 *  @Output:
 *    - path to image saving folder that user specified in the last run
 */function _default(){let currentSavePath=null;try{currentSavePath=_fs.default.readFileSync(_constants.PATH_TO_CONFIG).toString()}catch(e){return""}return currentSavePath}