# 01/2018 - DAY 1

## Setup
trying to get the simple example from https://github.com/toxicFork/react-three-renderer/wiki/Usage to run
   
  
**Problem 1**  
react-three-renderer does not support react 16 (fiber) [see issue 197](https://github.com/toxicFork/react-three-renderer/issues/197).  
Setting React version to 15.

**Problem 2**   
spent 2 hours on this so far:  
*__Uncaught Error: Cannot find module 'babel-runtime/core-js/object/freeze'__
    at newRequire (e139c04ad11a1947c415ac53776ec422.js:sourcemap:33)
    at localRequire (e139c04ad11a1947c415ac53776ec422.js:sourcemap:48)
    at Object.require.133 (e139c04ad11a1947c415ac53776ec422.js:sourcemap:5274)
    at newRequire (e139c04ad11a1947c415ac53776ec422.js:sourcemap:42)
    at localRequire (e139c04ad11a1947c415ac53776ec422.js:sourcemap:48)
    at Object.require.3.react (e139c04ad11a1947c415ac53776ec422.js:sourcemap:72250)
    at newRequire (e139c04ad11a1947c415ac53776ec422.js:sourcemap:42)
    at localRequire (e139c04ad11a1947c415ac53776ec422.js:sourcemap:48)
    at Object.require.2.react-three-renderer (e139c04ad11a1947c415ac53776ec422.js:sourcemap:72428)
    at newRequire (e139c04ad11a1947c415ac53776ec422.js:sourcemap:42)*
