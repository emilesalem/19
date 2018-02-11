
import { createAction, handleActions } from 'redux-actions'
import { Quaternion } from 'three'

export const SCALE_UP = 'SCALE_UP'
export const ROTATE = 'ROTATE'

export const scaleUp = createAction(SCALE_UP)
export const rotate = createAction(ROTATE)

const defaultState = {
  rotation: new Quaternion(),
  radius: 50,
  widthSegments: 8,
  heightSegments: 8
}

export default handleActions({
  SCALE_UP: (state, action) => state,
  ROTATE: (state, action) => state
}, defaultState)
