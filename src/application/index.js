import { createAction, handleActions } from 'redux-actions'

export const REACT_TO_KEY = 'REACT_TO_KEY'
export const REACT_TO_MOUSE = 'REACT_TO_MOUSE'
export const TOGGLE_CAMERA_CONTROL = 'TOGGLE_CAMERA_CONTROL'
export const REACT_TO_WHEEL = 'REACT_TO_WHEEL'
export const SIGN_IN = 'SIGN_IN'
export const SIGN_OUT = 'SIGN_OUT'

export const toggleControl = createAction(TOGGLE_CAMERA_CONTROL)
export const reactToKey = createAction(REACT_TO_KEY)
export const reactToMouse = createAction(REACT_TO_MOUSE)
export const reactToWheel = createAction(REACT_TO_WHEEL)
export const signIn = createAction(SIGN_IN)
export const signOut = createAction(SIGN_OUT)

const defaultState = {
  signedIn: false
}

export const epic = action$ => action$.ofType(REACT_TO_KEY).map(action => action.payload === 'ESC' ? signOut() : null)

export default handleActions({
  SIGN_IN: (state, action) => ({
    ...state,
    signedIn: true
  }),
  SIGN_OUT: (state, action) => ({
    ...state,
    signedIn: false
  })
}, defaultState)
