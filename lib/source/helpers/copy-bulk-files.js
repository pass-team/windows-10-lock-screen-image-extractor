"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.default=_default;var _copyFile=_interopRequireDefault(require("./copy-file"));function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}/* eslint-disable global-require, no-console */ /**
 *  @Helper
 *  @Input:
 *    - files: An array of file meta objects
 *    - src: path to source folder
 *    - dest: path to destination folder
 *    - pattern: file name format to be save as, presently support
 *      - hash: content hash
 *      - date: current date
 *      - origin: the original file name
 *  @Output:
 *    - files are copy to dest folder
 *    - return the number of files copied
 */function _default(files,src,dest,pattern){return files.reduce((count,file,index)=>{try{/**
       *  @Helper: copy-file.js
       *  Copy single file with index to number file if using the 'date' file name pattern
       */(0,_copyFile.default)(file,src,dest,pattern,index);return count+1}catch(e){if(e.code!=="EEXIST")return count}return count},0)};