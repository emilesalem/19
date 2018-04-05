import React from 'react'
import PropTypes from 'react-proptypes'
import HTML3D from '../../css3d/HTML3D'
import { Vector3, Quaternion, Euler } from 'three'
import DOMPurify from 'dompurify'

export default class Blogpost extends React.Component {
  constructor (props) {
    super(props)
    this.originalPosition = props.position.clone()
    this.originalRotation = props.rotation.clone()
  }

  render () {
    const {
      position,
      rotation,
      content,
      store,
      quaternion
    } = this.props
    /*
      TODO: Add more webGL stuff, like a frame
       */
    position.copy(this.originalPosition.clone().applyQuaternion(quaternion))
    const originalQuaternion = new Quaternion().setFromEuler(this.originalRotation)
    const compoundRotation = originalQuaternion.multiply(quaternion)
    rotation.copy(new Euler().setFromQuaternion(compoundRotation))
    return <HTML3D position={position} rotation={rotation} store={store}>
      {/* <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content, { USE_PROFILES: { html: true } }) }} /> */}
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </HTML3D>
  }
}

Blogpost.propTypes = {
  position: PropTypes.instanceOf(Vector3),
  rotation: PropTypes.instanceOf(Quaternion),
  content: PropTypes.string,
  store: PropTypes.object,
  quaternion: PropTypes.instanceOf(Quaternion)
}

export const WIDTH = 320
export const HEIGHT = 400
