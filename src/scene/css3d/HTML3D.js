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
  }

  _createCSS3DObject () {
    this.HTMLElement = document.createElement('div')
    ReactDOM.render(this.props.children, this.HTMLElement)
    const result = new CSS3DObject(this.HTMLElement)
    result.position.copy(this.props.position)
    result.quaternion.copy(this.props.quaternion)
    return result
  }

  componentDidUpdate () {
    this.css3dObject.applyQuaternion(this.props.quaternion)
    this.css3dObject.position.set(this.props.position)
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
  quaternion: PropTypes.instanceOf(THREE.Quaternion),
  register: PropTypes.func,
  render: PropTypes.func
}

const mapDispatchToProps = {
  register: registerHtml3DObject,
  render: css3dRender
}

export default connect(null, mapDispatchToProps)(HTML3D)
