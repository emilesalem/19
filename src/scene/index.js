
import { createAction, handleActions } from 'redux-actions'
import { moveCamera, stopMoving } from './camera'
import * as THREE from 'three'
export const ADD_COLLIDABLE = 'ADD_COLLIDABLE'
export const TRY_MOVING = 'TRY_MOVING'
export const CAPTURE_CAMERA_STATE = 'CAPTURE_CAMERA_STATE'

export const addColidable = createAction(ADD_COLLIDABLE)
export const tryMoving = createAction(TRY_MOVING)
export const captureCamera = createAction(CAPTURE_CAMERA_STATE)

export const collisionEpic = action$ => action$.ofType(TRY_MOVING)
  .map(action =>
    didCameraCollide(action.payload)
      ? stopMoving()
      : moveCamera({ direction: action.payload.direction })
  )

function didCameraCollide (cameraMovement) {
  let collided = false
  const {
    steps,
    direction,
    position,
    transform
  } = cameraMovement

  const stepIn = direction.clone().applyQuaternion(transform)
  stepIn.setComponent(1, position.y)
  stepIn.multiplyScalar(steps)
  for (const collidable of collidables) {
    const checkPoint = position.clone().add(stepIn)
    collided = collidable.didCollide(checkPoint)
    if (collided) {
      break
    }
  }
  return collided
}

const collidables = []

const defaultState = {
  collidables,
  camera: new THREE.PerspectiveCamera(75, window.width / window.height)
}

export default handleActions({
  ADD_COLLIDABLE: (state, action) => {
    state.collidables.push(action.payload)
    return state
  },
  CAPTURE_CAMERA_STATE: (state, action) => {
    return {
      ...state,
      camera: action.payload.clone()
    }
  }
}, defaultState)
