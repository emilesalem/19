
import { createAction, handleActions } from 'redux-actions'
import { Quaternion, Vector3 } from 'three'
import { REACT_TO_WHEEL } from '../../application'

export const SCALE_UP = 'SCALE_UP'
export const ROTATE = 'ROTATE'

export const scaleUp = createAction(SCALE_UP)
export const rotate = createAction(ROTATE)

const defaultState = {
  rotation: new Quaternion(),
  radius: 1800,
  widthSegments: 32,
  heightSegments: 32,
  blogposts: blogposts()
}

function blogposts () {
  const result = []
  for (let i = 0; i < 125; i++) {
    let artefact = `<img src="/dist/me.png" width="400px" height="320px"/>`
    if (i % 5 === 0) {
      artefact = `<video src="/dist/me.webm"height="320" width="400" loop="true" autoplay="true" controls="true" id="vid${i}">
</video>`
    }
    result.push(`${artefact}`)
  }
  // <video src="/dist/day12.ogv" autoplay width="400px" heith="320px" loop controls/>
  return result
}

export default handleActions({
  SCALE_UP: (state, action) => state,
  ROTATE: (state, action) => {
    const rotation = state.rotation.clone()
    rotation.multiply(new Quaternion().setFromAxisAngle(new Vector3(1, 0, 0), action.payload))
    return {
      ...state,
      rotation
    }
  }
}, defaultState)

export const rollEpic = action$ => action$.ofType(REACT_TO_WHEEL)
  .map(action => rotate(action.payload.deltaY > 0 ? 5 * Math.PI / 180 : -5 * Math.PI / 180))
