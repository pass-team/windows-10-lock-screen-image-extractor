"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.default=_default;var _imageSize=_interopRequireDefault(require("image-size"));var _constants=require("../constants");var _=require(".");function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);if(enumerableOnly)symbols=symbols.filter(function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable});keys.push.apply(keys,symbols)}return keys}function _objectSpread(target){for(var i=1;i<arguments.length;i++){var source=arguments[i]!=null?arguments[i]:{};if(i%2){ownKeys(Object(source),true).forEach(function(key){_defineProperty(target,key,source[key])})}else if(Object.getOwnPropertyDescriptors){Object.defineProperties(target,Object.getOwnPropertyDescriptors(source))}else{ownKeys(Object(source)).forEach(function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key))})}}return target}function _defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true})}else{obj[key]=value}return obj}/**
 *  @Helper
 *  @Input:
 *    - files: An array of file meta objects that add stats
 *    - constraint: object contains criteria to filter image,
 *                  presently support filter by orientation:
 *      - landscape
 *      - portrait
 *  @Output:
 *    - return array of image meta objects that match criteria
 */function _default(files,constraint){const{orientation}=constraint;/* Measure file stats to pass to filters */const images=files.map(image=>{const uri=image.path+image.name;const stats=(0,_imageSize.default)(uri);return _objectSpread({},image,{},stats)});/**
   *  - Filter images out of windo  ws files
   *  - Then filter images with hd resolution
   */const imageValidSize=images.filter(_.isImage).filter(_.isValidSizeImage);/* Filter images by orientation */switch(orientation){case _constants.ORIENTATION_PORTRAIT:return imageValidSize.filter(_.isPortraitImage);case _constants.ORIENTATION_LANDSCAPE:return imageValidSize.filter(_.isLandscapeImage);default:break;}return imageValidSize};