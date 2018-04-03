import React from 'react'
import { Vector3 } from 'three'
import Css3dContainer from '../css3d/Css3dContainer'
import Camera from './camera/container'
import PropTypes from 'react-proptypes'
import Blogosphere from './blogosphere/container'

export default function Scene (props) {
  return (
    <scene>
      <Camera position={new Vector3(0, 1, 0)} aspect={window.innerWidth / window.innerHeight} store={props.store} />
      <ambientLight />
      <Blogosphere position={new Vector3(0, 0, 0)} store={props.store} />
      <Css3dContainer containerId='mainWindow' store={props.store} />
    </scene>
  )
}

Scene.propTypes = {
  store: PropTypes.object
}
