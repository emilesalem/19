# 06/01/2018 - DAY 1  
 - trying to get the simple example from https://github.com/toxicFork/react-three-renderer/wiki/Usage to run
   
**Problem 1**  
react-three-renderer does not support react Fiber [see issue 197](https://github.com/toxicFork/react-three-renderer/issues/197).  
Reverting to React 15.

**Problem 2**   
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

Removed "transform-runtime" babel plugin, error goes away, magnificient green cube is rendered, Darnleluya!

# 07/01/2018 - DAY 2
 - Experimenting with React3, drawing differents shapes.
 - Starting on application state and user input observable, so I can move the camera with the mouse and keyboard.

**Problem 3**
*Uncaught Error: Could not find "store" in either the context or props of "Connect(Camera)". Either wrap the root component in a <Provider>, or explicitly pass "store" as a prop to "Connect(Camera)".
    at invariant (19bernard.js:43989)
    at new Connect (19bernard.js:44265)
    at 19bernard.js:90302
    at measureLifeCyclePerf (19bernard.js:90037)
    at React3CompositeComponentWrapper._constructComponentWithoutOwner (19bernard.js:90301)
    at React3CompositeComponentWrapper._constructComponent (19bernard.js:90286)
    at React3CompositeComponentWrapper.mountComponent (19bernard.js:90197)
    at Object.mountComponent (19bernard.js:30467)
    at InternalComponent.mountChildren (19bernard.js:91046)
    at InternalComponent.mountComponent (19bernard.js:90886)*

this might help: https://github.com/toxicFork/react-three-renderer/issues/140

almost... passing the store down from the root app component to the camera removes the error...
... but causes weirder incomprehensible error 
*Uncaught TypeError: Cannot read property '0F9410C3-70EE-41C1-B87A-E0DF7EE4ECC8' of undefined
    at serialize (19bernard.js:58749)
    at Mesh.toJSON (19bernard.js:58759)
    at derez (<anonymous>:2:5451)
    at derez (<anonymous>:2:6072)
    at derez (<anonymous>:2:6072)
    at derez (<anonymous>:2:6072)
    at derez (<anonymous>:2:6072)
    at derez (<anonymous>:2:6072)
    at derez (<anonymous>:2:6072)*

    I should probably not trigger a reRender of React3 on every store change.
    Lets find another way to listen to user inputs.