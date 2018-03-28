
import { createAction, handleActions } from 'redux-actions'
import { moveCamera, stopMoving } from './camera'
export const ADD_COLLIDABLE = 'ADD_COLLIDABLE'
export const TRY_MOVING = 'TRY_MOVING'

export const addColidable = createAction(ADD_COLLIDABLE)
export const tryMoving = createAction(TRY_MOVING)

export const collisionEpic = (action$, store) => action$.ofType(TRY_MOVING)
  .map(action =>
    didCameraCollide(action.payload, store.getState().camera.camera)
      ? stopMoving()
      : moveCamera({ direction: action.payload.direction })
  )

function didCameraCollide (cameraMovement, camera) {
  let collided = false
  const {
    steps,
    direction
  } = cameraMovement

  const stepIn = direction.clone().applyQuaternion(camera.quaternion)
  stepIn.setComponent(1, camera.position.y)
  stepIn.multiplyScalar(steps)
  for (const collidable of collidables) {
    const checkPoint = camera.position.clone().add(stepIn)
    collided = collidable.didCollide(checkPoint)
    if (collided) {
      break
    }
  }
  return collided
}

const collidables = []

const defaultState = {
  collidables
}

export default handleActions({
  ADD_COLLIDABLE: (state, action) => {
    state.collidables.push(action.payload)
    return state
  }
}, defaultState)
