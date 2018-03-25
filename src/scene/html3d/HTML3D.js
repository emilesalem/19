import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'react-proptypes'
import * as THREE from 'three'
import CSS3DRenderer from './Css3dRenderer'
import CSS3DObject from './Css3dObject'

export default class HTML3D extends React.Component {
  constructor (props) {
    super(props)
    this.cssScene = new THREE.Scene()
    this.cssRenderer = new CSS3DRenderer('mainWindow')
    const css3dObject = this._createCSS3DObject()
    this.cssScene.add(css3dObject)
  }

  /**
     * Create the CSS3D object from HTMLElement property
     * @private
     */
  _createCSS3DObject () {
    // Create DOM element with ReactDOM
    this.HTMLElement = document.createElement('div')
    ReactDOM.render(this.props.children, this.HTMLElement)
    const result = new CSS3DObject(this.HTMLElement)
    result.position.copy(this.props.position)
    result.quaternion.copy(this.props.quaternion)
    return result
  }

  componentDidUpdate () {
    this.cssRenderer.render(this.cssScene, this.props.camera)
  }

  render () {
    return null
  }
}

HTML3D.propTypes = {
  children: PropTypes.children,
  camera: PropTypes.object,
  position: PropTypes.instanceOf(THREE.Vector3),
  quaternion: PropTypes.instanceOf(THREE.Quaternion)
}
