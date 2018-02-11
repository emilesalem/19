
import { createAction, handleActions } from 'redux-actions'
import { moveCamera } from './camera'
import * as THREE from 'three'

export const ADD_OBJECT = 'ADD_OBJECT'
export const TRY_MOVING = 'TRY_MOVING'

export const addObject = createAction(ADD_OBJECT)
export const tryMoving = createAction(TRY_MOVING)

export const collisionEpic = action$ => action$.ofType(TRY_MOVING)
  .map(action => {
    const {
      direction,
      position,
      transform
    } = action.payload

    const stepIn = direction.clone().applyQuaternion(transform)
    stepIn.setComponent(1, position.y)
    let collided = false
    for (const sceneObject of sceneObjects) {
      collided = checkCollision(sceneObject, position.clone().add(stepIn))
      if (collided) {
        break
      }
    }
    return collided ? moveCamera({ direction: direction.clone().multiplyScalar(-1) }) : moveCamera({ direction })
  })

const sceneObjects = [
  {
    width: 20,
    height: 100,
    depth: 2000,
    rotation: new THREE.Quaternion(),
    position: new THREE.Vector3(60, 0, -10)
  },
  {
    width: 20,
    height: 100,
    depth: 2000,
    rotation: new THREE.Quaternion(),
    position: new THREE.Vector3(-60, 0, -10)
  }
]

function checkCollision (box, point) {
  point.applyQuaternion(box.rotation.inverse())
  point.sub(box.position)
  let result = false
  if ((Math.abs(point.x) <= box.width) &&
    (Math.abs(point.y) <= box.height) &&
    (Math.abs(point.z) <= box.depth)) {
    result = true
  }
  return result
}

const defaultState = {
  sceneObjects
}

export default handleActions({}, defaultState)
