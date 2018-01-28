import { createAction, handleActions } from 'redux-actions'

export const ADD_OBJECT = 'ADD_OBJECT'

export const addObject = createAction(ADD_OBJECT)

const sceneObjects = []

const defaultState = {
  sceneObjects: sceneObjects
}

export default handleActions({
}, defaultState)
