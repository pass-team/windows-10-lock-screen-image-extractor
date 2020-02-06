"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.default=_default;var _os=_interopRequireDefault(require("os"));var _constants=require("../constants");function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}/**
 *  @Helper
 *  @Input: No
 *  @Output:
 *    - return:
 *      - true: if platform is windows 10
 *      - false: otherwise
 */function _default(){return _os.default.platform()===_constants.WINDOWS10_ALIAS}