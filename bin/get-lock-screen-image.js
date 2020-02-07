#!/usr/bin/env node

/* eslint-disable global-require, no-console, no-unused-expressions */
import isWindows10 from '../source/helpers/is-windows-10';

/* Only run the app on Windows 10 */
if (!isWindows10) {
  console.log('Sorry! This app only runs on Windows 10 platform');
} else {
  import('../source');
}
