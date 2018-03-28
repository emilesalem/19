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

# 10/01/2018 - DAY 3
 - Found out previous error was not the problem (side error that doesnt break the app, caused by redux-devtools)  
   Real error was caused by 'mapTo' observable function used instead of 'map' (TODO: investigate what mapTo does)
 - **MILESTONE**: succeeded first navigation in 3D world


# 13/01/2018 - DAY 4
 - freshening up on linear algebra for camera strafing.(https://en.wikipedia.org/wiki/Quaternion)
  1- Any finite set of vectors can be represented by a matrix with each column storing the coordinates of the vectors.
  2- A 3D basis is a set of 3 vectors that serves as space coordinates reference point.
  (ex: the standard basis is v1(1,0,0), v2(0,1,0), v3(0,0,1))
  3- If we want to change any vector's coordinates to a new basis, we only need to left-multiply its components by the
     inverse of this new basis matrix.
  4- wtf is a quaterion?
  5- a quaternion is the key to everything


# 14/01/2018 - DAY 5
 - Discovered that Chrome on linux wont capture onMouseMove events, switched to Firefox [see react issue #11984](https://github.com/facebook/react/issues/11984)
 - Firefox is cooking my processor, Chromium seems better at using the GPU, switching to Chromium
 - working on looking around. Trying to project mouse deltaX and deltaY on sphere encircling camera, [using this ref](https://www.scratchapixel.com/lessons/mathematics-physics-for-computer-graphics/geometry/spherical-coordinates-and-trigonometric-functions).
 - almost there, still having trouble changing basis

# 16/01/2018 - DAY 6
 - Done it! And without trigonometry. Just added mouse deltaX and deltaY to camera lookAt vector in camera reference and placed lookAt back in world reference.

# 20/01/2018 - DAY 7
 - playing around, drawing stuff, added self contained animation: Prismotron, a component which changes its state every milliseconds by addinng children shapes.

# 10/02/2018 DAY 8
 - working on camera collision: added a wall and testing for collision. 
 - decided to stop fearing quaternions. Three.js was designed to make use of them and they rock, apparently.
 - well. Quaternions do rock. They solved all my problems. All of them.

# 18/02/2018 DAY 8
 - created blogosphere with lights.
 - spent way too much time on lighting, not yet satisfied with material shaders but need to move on. Will have to come back to shaders later on.
 - TODO: blogosphere shaders


# 25/02/2018 DAY 9
 - created Firebase project
 - added Firebase auth support + firestore for reactive DB.
 - Added private users list through firestore rule.
 - TODO: welcome/login page and unauthorized page.


# 04/03/2018 DAY 10
 - Joe Lindien is disrupting my work. I Wont be as productive from now on. Dont matter, Joe Lindien is the chief, I must obey his will.
 - Starting work on html3d part of application. [This might prove useful.](https://github.com/Colmea/react-three-renderer-html3d)
 - Branching off on html3d, goal: inline editing of html rendered in 3D blogosphere space.

# 18/03/2018 DAY 11
 - Did it! Can now read HTML and watch videos of the internet in the internet blogosphere!! Awesome.
 - TODO: rearrange code, CSSRenderer must be a singleton and receive the diverse HTML3d objects.
 
 How does it work? 
 source: http://www.emagix.net/images/portfolio/academic/mscs-project/code_projects/projects/webgl-three-css3-sync01.html
Three.js doesn't let me render DOM elements in 3D space. What other people have done so far is displaying the elements over the WebGL canvas and apply
the CSS3D transforms that will make them seem like they're part of the scene. To do that, all you need is the webGl camera's matrix world inverse
to compute the elements model view matrix, which is in effect the elements transforms in the camera's coordinate system. 
(see https://threejs.org/docs/#api/math/Matrix4).The fact that CSS3d transforms are not expressed in the same coordinate system as webGl must be accounted for.
Of course since the DOM elements are placed over the webGL canvas, a limitation to this solution is that no webGL object can be placed in front of the DOM elements,
as the DOM elements will always appear over them. Fortunately it doesnt apply to the Blogosphere. Splendid.

