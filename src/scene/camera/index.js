import { createAction, handleActions } from 'redux-actions'
import { toggleControl, REACT_TO_KEY, REACT_TO_MOUSE } from '../../application'
import { tryMoving } from '../../scene'
import { Vector3, Vector2, PerspectiveCamera } from 'three'

const defaultState = {
  controlActive: false,
  movement: null,
  camera: new PerspectiveCamera(75, window.width / window.height)
}

const FORWARD = new Vector3(0, 0, -1)
const BACKWARD = new Vector3(0, 0, 1)
const LEFT = new Vector3(-1, 0, 0)
const RIGHT = new Vector3(1, 0, 0)
const UP = new Vector3(0, 1, 0)
const DOWN = new Vector3(0, -1, 0)

export const CAMERA_STEPS = 0.5

export const MOVE_CAMERA = 'MOVE_CAMERA'
export const STOP_MOVEMENT = 'STOP_MOVEMENT'
export const CAPTURE_CAMERA_STATE = 'CAPTURE_CAMERA_STATE'

export const moveCamera = createAction(MOVE_CAMERA)
export const stopMoving = createAction(STOP_MOVEMENT)

// FOR CSS3D
export const captureCamera = createAction(CAPTURE_CAMERA_STATE)

export const cameraEpic = (action$, store) => action$.ofType(REACT_TO_MOUSE)
  .map(action => {
    const deltaX = action.payload.clientX - store.getState().camera.previousX || 0
    const deltaY = action.payload.clientY - store.getState().camera.previousY || 0
    return moveCamera({
      orientation: new Vector2(deltaX, deltaY)
    })
  })

export const keyEpic = action$ => action$.ofType(REACT_TO_KEY)
  .map(action => {
    const keyPressed = action.payload
    let result = { payload: null, type: 'NOOP' }
    switch (keyPressed) {
      case 'w':
        result = tryMoving({
          steps: CAMERA_STEPS,
          direction: FORWARD })
        break
      case 's':
        result = tryMoving({
          steps: CAMERA_STEPS,
          direction: BACKWARD })
        break
      case 'a':
        result = tryMoving({
          steps: CAMERA_STEPS,
          direction: LEFT })
        break
      case 'd':
        result = tryMoving({
          steps: CAMERA_STEPS,
          direction: RIGHT })
        break
      case 'Shift':
        result = tryMoving({
          steps: CAMERA_STEPS,
          direction: UP })
        break
      case 'Ctrl':
        result = tryMoving({
          steps: CAMERA_STEPS,
          direction: DOWN })
        break
      case 'Escape':
        result = toggleControl()
        break
      default:
        break
    }
    return result
  })

export default handleActions({
  TOGGLE_CAMERA_CONTROL: (state, action) => {
    const result = {
      ...state,
      controlActive: !state.controlActive
    }
    if (!state.controlActive) {
      result.mouseX = action.payload.clientX
      result.mouseY = action.payload.clientY
    }
    return result
  },
  MOVE_CAMERA: (state, action) => {
    const movement = action.payload
    movement.direction && movement.direction.clone().multiplyScalar(CAMERA_STEPS)
    return {
      ...state,
      movement
    }
  },
  REACT_TO_KEY: (state, action) => {
    return state
  },
  REACT_TO_MOUSE: (state, action) => {
    const previousX = state.mouseX
    const previousY = state.mouseY
    return {
      ...state,
      previousX,
      previousY,
      mouseX: action.payload.clientX,
      mouseY: action.payload.clientY
    }
  },
  STOP_MOVEMENT: (state, action) => {
    return {
      ...state,
      movement: null
    }
  },
  CAPTURE_CAMERA_STATE: (state, action) => {
    return {
      ...state,
      camera: action.payload.clone()
    }
  }
}, defaultState)
