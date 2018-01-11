import { createAction } from 'redux-actions'

export const REACT_TO_KEY = 'REACT_TO_KEY'
export const TOGGLE_CAMERA_CONTROL = 'TOGGLE_CAMERA_CONTROL'

export const toggleControl = createAction(TOGGLE_CAMERA_CONTROL)
export const reactToKey = createAction(REACT_TO_KEY)
