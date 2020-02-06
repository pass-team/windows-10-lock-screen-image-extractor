"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.default=_default;var _ora=_interopRequireDefault(require("ora"));function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}const executor=function(task,fakeTime){return new Promise(resolve=>setTimeout(()=>resolve(task),fakeTime))};/**
 *  @Helper
 *  @Input:
 *    - task: the callback/function to execute
 *    - message: text to display to user when executing task
 *    - fakeTime: buffered time if the task running too fast to improve UX
 *  @Output:
 *    - return: task's output
 */async function _default(task,message,fakeTime){const spinner=(0,_ora.default)({text:message,spinner:"dots",indent:0});spinner.start();const output=await executor(task,fakeTime);spinner.succeed();return output}