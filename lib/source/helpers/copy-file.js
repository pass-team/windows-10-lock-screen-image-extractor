"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.default=_default;var _fs=_interopRequireDefault(require("fs"));var _normalizePath=_interopRequireDefault(require("./normalize-path"));var _constants=require("../constants");function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}/**
 *  @Helper
 *  @Input:
 *    - file: file meta objects
 *    - src: path to source folder
 *    - dest: path to destination folder
 *    - pattern: file name format to be save as, presently support
 *      - hash: content hash
 *      - date: current date
 *      - origin: the original file name
 *    - index:  number appended to file name when using the `date` name pattern
 *              because bulk of files will share the same date
 *  @Output:
 *    - file are copy to dest folder
 */function _default(file,src,dest,namePattern,index){/* Process the path, so different path format won't break nodejs copyFileSync api */const srcUri=(0,_normalizePath.default)(src)+file.name;const destUri=`${(0,_normalizePath.default)(dest)+file[namePattern]+(namePattern===_constants.IMAGE_NAME_FORMAT_DATE?`_${index}`:"")}.jpg`;_fs.default.copyFileSync(srcUri,destUri,_fs.default.constants.COPYFILE_EXCL)};