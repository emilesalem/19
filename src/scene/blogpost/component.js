import React from 'react'
import PropTypes from 'react-proptypes'
import HTML3D from '../../css3d/HTML3D'
import { Vector3, Quaternion } from 'three'
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
      store
    } = this.props
    /*
      TODO: Add more webGL stuff, like a frame
       */
    return <HTML3D position={position} rotation={rotation} store={store}>
      <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content, { USE_PROFILES: { html: true } }) }} />
    </HTML3D>
  }
}

Blogpost.propTypes = {
  position: PropTypes.instanceOf(Vector3),
  rotation: PropTypes.instanceOf(Quaternion),
  content: PropTypes.string,
  store: PropTypes.object
}

export const WIDTH = 320
export const HEIGHT = 400
