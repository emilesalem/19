import { createActions, handleActions } from 'redux-actions'
import { toggleControl, reactToKey } from '../../application'
import * as THREE from 'three'

const defaultState = {
  controlActive: false,
  lookAt: new THREE.Vector3(0, 0, 0),
  position: new THREE.Vector3(-3, 3, 10)
}

const steps = 1

export const {
  cameraForward,
  cameraBackward,
  cameraStrafeLeft,
  cameraStrafeRight,
  cameraFlyUp,
  cameraFlyDown
} = createActions(
  'CAMERA_FORWARD',
  'CAMERA_BACKWARD',
  'CAMERA_STRAFE_LEFT',
  'CAMERA_STRAFE_RIGHT',
  'CAMERA_FLY_UP',
  'CAMERA_FLY_DOWN')

export const keyEpic = action$ => action$.ofType(reactToKey.type)
  .mapTo(action => {
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
  TOGGLE_CAMERA_CONTROL: state => ({
    ...state,
    controlActive: !state.controlActive

  }),
  CAMERA_FORWARD: state => ({
    ...state,
    position: state.position + steps * state.lookAt
  }),
  CAMERA_BACKWARD: state => ({
    ...state,
    position: state.position - steps * state.lookAt
  })
}, defaultState)
