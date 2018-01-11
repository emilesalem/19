import { createAction, handleActions } from 'redux-actions'
import { toggleControl, REACT_TO_KEY } from '../../application'
import * as THREE from 'three'

const defaultState = {
  controlActive: false,
  lookAt: new THREE.Vector3(0, 0, 0),
  position: new THREE.Vector3(-3, 3, 10)
}

const steps = 5

export const CAMERA_FORWARD = 'CAMERA_FORWARD'
export const CAMERA_BACKWARD = 'CAMERA_BACKWARD'
export const CAMERA_STRAFE_LEFT = 'CAMERA_STRAFE_LEFT'
export const CAMERA_STRAFE_RIGHT = 'CAMERA_STRAFE_RIGHT'
export const CAMERA_FLY_UP = 'CAMERA_FLY_UP'
export const CAMERA_FLY_DOWN = 'CAMERA_FLY_DOWN'

export const cameraForward = createAction(CAMERA_FORWARD)
export const cameraBackward = createAction(CAMERA_BACKWARD)
export const cameraStrafeLeft = createAction(CAMERA_STRAFE_LEFT)
export const cameraStrafeRight = createAction(CAMERA_STRAFE_RIGHT)
export const cameraFlyUp = createAction(CAMERA_FLY_UP)
export const cameraFlyDown = createAction(CAMERA_FLY_DOWN)

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
  TOGGLE_CAMERA_CONTROL: state => {
    return {
      ...state,
      controlActive: !state.controlActive
    }
  },
  CAMERA_FORWARD: state => {
    const negativePosition = state.position.clone().multiplyScalar(-1)
    const stepForward = state.lookAt.clone().add(negativePosition).normalize().multiplyScalar(steps)
    return {
      ...state,
      position: state.position.clone().add(stepForward)
    }
  },
  CAMERA_BACKWARD: state => {
    const negativeLookAt = state.lookAt.clone().multiplyScalar(-1)
    const stepBackward = state.position.clone().add(negativeLookAt).normalize().multiplyScalar(steps)
    return {
      ...state,
      position: state.position.clone().add(stepBackward)
    }
  },
  REACT_TO_KEY: (state, action) => {
    return state
  }

}, defaultState)
