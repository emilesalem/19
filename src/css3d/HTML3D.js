import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'react-proptypes'
import * as THREE from 'three'
import CSS3DObject from './Css3dObject'
import { registerHtml3DObject, css3dRender } from '.'
import { connect } from 'react-redux'

class HTML3D extends React.Component {
  constructor (props) {
    super(props)
    this.css3dObject = this._createCSS3DObject()
    this.originalPosition = this.css3dObject.position.clone()
    this.originalRotation = this.css3dObject.rotation.clone()
  }

  _createCSS3DObject () {
    this.HTMLElement = document.createElement('div')
    ReactDOM.render(this.props.children, this.HTMLElement)
    const result = new CSS3DObject(this.HTMLElement)
    // result.position.copy(this.props.position.clone().applyQuaternion(this.props.quaternion))
    // result.rotation.copy(new THREE.Euler().setFromQuaternion(this.props.quaternion))
    result.position.copy(this.props.position)
    result.rotation.copy(this.props.rotation)
    return result
  }

  componentDidUpdate () {
    // this.css3dObject.position.copy(this.originalPosition.clone().applyQuaternion(this.props.quaternion))
    // this.css3dObject.rotation.copy(this.originalRotation.clone().setFromQuaternion(this.props.quaternion))
    this.props.render()
  }
  componentDidMount () {
    this.props.register(this.css3dObject)
  }

  render () {
    return null
  }
}

HTML3D.propTypes = {
  children: PropTypes.element,
  position: PropTypes.instanceOf(THREE.Vector3),
  register: PropTypes.func,
  render: PropTypes.func,
  rotation: PropTypes.instanceOf(THREE.Euler)
}

const mapDispatchToProps = {
  register: registerHtml3DObject,
  render: css3dRender
}

export default connect(null, mapDispatchToProps)(HTML3D)
