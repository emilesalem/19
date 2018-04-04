import { createAction, handleActions } from 'redux-actions'
import { Scene } from 'three'

export const REGISTER_HTML3D = 'REGISTER_HTML3D'
export const RENDER = 'RENDER'
export const registerHtml3DObject = createAction(REGISTER_HTML3D)
export const css3dRender = createAction(RENDER)

const defaultState = {
  scene: new Scene(),
  html3dObjects: []
}

export default handleActions({
  REGISTER_HTML3D: (state, action) => {
    state.html3dObjects.push(action.payload)
    const newScene = new Scene()
    state.html3dObjects.forEach(html3d => newScene.add(html3d))
    return {
      ...state,
      scene: newScene,
      html3dObjects: [].concat(state.html3dObjects)
    }
  },
  RENDER: (state, action) => {
    return {
      ...state
    }
  }
}, defaultState)
