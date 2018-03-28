import React from 'react'
import PropTypes from 'react-proptypes'
import * as THREE from 'three'
import { connect } from 'react-redux'
import CSS3DRenderer from './Css3dRenderer'

class Css3dComponent extends React.Component {
  constructor (props) {
    super(props)
    this.cssRenderer = new CSS3DRenderer(props.containerId)
  }
  render () {
    const {
      camera,
      scene
    } = this.props
    this.cssRenderer.render(scene, camera)
    return null
  }
}

function mapStateToProps (state) {
  return {
    camera: state.camera.camera,
    scene: state.css3d.scene
  }
}

Css3dComponent.propTypes = {
  containerId: PropTypes.string,
  camera: PropTypes.instanceOf(THREE.PerspectiveCamera),
  scene: PropTypes.instanceOf(THREE.Scene)
}

export default connect(mapStateToProps, null)(Css3dComponent)
