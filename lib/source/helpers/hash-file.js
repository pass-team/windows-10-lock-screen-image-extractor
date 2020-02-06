"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.default=_default;var _hasha=_interopRequireDefault(require("hasha"));function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}/**
 *  @Helper
 *  @Input:
 *    - uri: path of a file need hashing
 *  @Output:
 *    - return the file hash as string
 */function _default(uri){return _hasha.default.fromFileSync(uri,{algorithm:"md5"})};