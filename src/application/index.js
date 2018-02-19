import { createAction } from 'redux-actions'

export const REACT_TO_KEY = 'REACT_TO_KEY'
export const REACT_TO_MOUSE = 'REACT_TO_MOUSE'
export const TOGGLE_CAMERA_CONTROL = 'TOGGLE_CAMERA_CONTROL'
export const REACT_TO_WHEEL = 'REACT_TO_WHEEL'

export const toggleControl = createAction(TOGGLE_CAMERA_CONTROL)
export const reactToKey = createAction(REACT_TO_KEY)
export const reactToMouse = createAction(REACT_TO_MOUSE)
export const reactToWheel = createAction(REACT_TO_WHEEL)
