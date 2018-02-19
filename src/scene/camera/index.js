import { createAction, handleActions } from 'redux-actions'
import { toggleControl, REACT_TO_KEY } from '../../application'
import { tryMoving } from '../../scene'
import { Vector3, Vector2 } from 'three'

const defaultState = {
  controlActive: false,
  movement: null,
  cameraAt: {
    position: null,
    transform: null
  }
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

export const moveCamera = createAction(MOVE_CAMERA)
export const stopMoving = createAction(STOP_MOVEMENT)

export const keyEpic = (action$, store) => action$.ofType(REACT_TO_KEY)
  .map(action => {
    const keyPressed = action.payload
    let result = null
    switch (keyPressed) {
      case 'w':
        result = tryMoving({
          steps: CAMERA_STEPS,
          direction: FORWARD,
          position: store.getState().camera.cameraAt.position,
          transform: store.getState().camera.cameraAt.transform })
        break
      case 's':
        result = tryMoving({
          steps: CAMERA_STEPS,
          direction: BACKWARD,
          position: store.getState().camera.cameraAt.position,
          transform: store.getState().camera.cameraAt.transform })
        break
      case 'a':
        result = tryMoving({
          steps: CAMERA_STEPS,
          direction: LEFT,
          position: store.getState().camera.cameraAt.position,
          transform: store.getState().camera.cameraAt.transform })
        break
      case 'd':
        result = tryMoving({
          steps: CAMERA_STEPS,
          direction: RIGHT,
          position: store.getState().camera.cameraAt.position,
          transform: store.getState().camera.cameraAt.transform })
        break
      case 'Shift':
        result = tryMoving({
          steps: CAMERA_STEPS,
          direction: UP,
          position: store.getState().camera.cameraAt.position,
          transform: store.getState().camera.cameraAt.transform })
        break
      case 'Ctrl':
        result = tryMoving({
          steps: CAMERA_STEPS,
          direction: DOWN,
          position: store.getState().camera.cameraAt.position,
          transform: store.getState().camera.cameraAt.transform })
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
    return {
      ...state,
      movement: {
        direction: action.payload.direction.clone().multiplyScalar(CAMERA_STEPS),
        orientation: null
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
  STOP_MOVEMENT: (state, action) => {
    return {
      ...state,
      movement: null,
      cameraAt: action.payload || state.cameraAt
    }
  }

}, defaultState)
