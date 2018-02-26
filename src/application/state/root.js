import { combineEpics } from 'redux-observable'
import { combineReducers } from 'redux'
import camera, { keyEpic } from '../../scene/camera'
import scene, { collisionEpic } from '../../scene'
import blogosphere, { rollEpic } from '../../scene/blogosphere'
import app, { appEpic } from '../../application'

export const rootEpic = combineEpics(
  keyEpic,
  collisionEpic,
  rollEpic,
  appEpic
)

export const rootReducer = combineReducers({
  app,
  scene,
  camera,
  blogosphere
})
