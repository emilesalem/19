import { createAction, handleActions } from 'redux-actions'
import { toggleControl, REACT_TO_KEY } from '../../application'
import { Vector3, Vector2 } from 'three'

const defaultState = {
  controlActive: false,
  movement: null
}

export const CAMERA_STEPS = 5

export const CAMERA_FORWARD = 'CAMERA_FORWARD'
export const CAMERA_BACKWARD = 'CAMERA_BACKWARD'
export const CAMERA_STRAFE_LEFT = 'CAMERA_STRAFE_LEFT'
export const CAMERA_STRAFE_RIGHT = 'CAMERA_STRAFE_RIGHT'
export const CAMERA_FLY_UP = 'CAMERA_FLY_UP'
export const CAMERA_FLY_DOWN = 'CAMERA_FLY_DOWN'
export const STOP_MOVEMENT = 'STOP_MOVEMENT'

export const cameraForward = createAction(CAMERA_FORWARD)
export const cameraBackward = createAction(CAMERA_BACKWARD)
export const cameraStrafeLeft = createAction(CAMERA_STRAFE_LEFT)
export const cameraStrafeRight = createAction(CAMERA_STRAFE_RIGHT)
export const cameraFlyUp = createAction(CAMERA_FLY_UP)
export const cameraFlyDown = createAction(CAMERA_FLY_DOWN)
export const stopMoving = createAction(STOP_MOVEMENT)

export const keyEpic = action$ => action$.ofType(REACT_TO_KEY)
  .map(action => {
    const keyPressed = action.payload
    let result = null
    switch (keyPressed) {
      case 'w':
        result = cameraForward()
        break
      case 's':
        result = cameraBackward()
        break
      case 'a':
        result = cameraStrafeLeft()
        break
      case 'd':
        result = cameraStrafeRight()
        break
      case 'Shift':
        result = cameraFlyUp()
        break
      case 'Ctrl':
        result = cameraFlyDown()
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
  CAMERA_FORWARD: state => {
    return {
      ...state,
      movement: {
        direction: new Vector3(0, 0, -1),
        orientation: 0
      }
    }
  },
  CAMERA_BACKWARD: state => {
    return {
      ...state,
      movement: {
        direction: new Vector3(0, 0, 1),
        orientation: 0
      }
    }
  },
  CAMERA_STRAFE_LEFT: state => {
    return {
      ...state,
      movement: {
        direction: new Vector3(-1, 0, 0),
        orientation: 0
      }
    }
  },
  CAMERA_STRAFE_RIGHT: state => {
    return {
      ...state,
      movement: {
        direction: new Vector3(1, 0, 0),
        orientation: 0
      }
    }
  },
  CAMERA_FLY_UP: state => {
    console.log('flying up')
    return {
      ...state,
      movement: {
        direction: new Vector3(0, 1, 0),
        orientation: 0
      }
    }
  },
  CAMERA_FLY_DOWN: state => {
    return {
      ...state,
      movement: {
        direction: new Vector3(0, -1, 0),
        orientation: 0
      }
    }
  },
  REACT_TO_KEY: (state, action) => {
    return state
  },
  REACT_TO_MOUSE: (state, action) => {
    const deltaX = action.payload.clientX - state.mouseX
    const deltaY = action.payload.clientY - state.mouseY
    return {
      ...state,
      mouseX: action.payload.clientX,
      mouseY: action.payload.clientY,
      movement: {
        direction: null,
        orientation: new Vector2(deltaX, deltaY)
      }
    }
  },
  STOP_MOVEMENT: (state) => {
    return {
      ...state,
      movement: null
    }
  }

}, defaultState)
