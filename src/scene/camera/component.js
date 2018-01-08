import React from 'react'
import PropTypes from 'react-proptypes'

export default class Camera extends React.Component {
  render () {
    const {
      position,
      lookAt,
      aspect
    } = this.props

    return (
      <perspectiveCamera
        name='camera'
        fov={75}
        aspect={aspect}
        near={0.1}
        far={1000}
        lookAt={lookAt}
        position={position}
      />
    )
  }
}

Camera.propTypes = {
  position: PropTypes.object,
  lookAt: PropTypes.object,
  aspect: PropTypes.number
}
