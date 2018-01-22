import React from 'react'
import PropTypes from 'react-proptypes'
import { Vector3, Matrix3 } from 'three'

export default class Camera extends React.Component {
  constructor (props) {
    super(props)
    this.lookAt = new Vector3(0, 0, -10)
    this.position = new Vector3(0, 0, 300)
    this.mainCamera = null
  }

  adjustCamera (movement) {
    const cameraInverseTransform = new Matrix3().setFromMatrix4(this.mainCamera.matrixWorldInverse)
    const cameraTransform = new Matrix3().getInverse(cameraInverseTransform)
    if (movement.direction) {
      const stepIn = movement.direction.applyMatrix3(cameraTransform)
      stepIn.setComponent(1, this.position.y)
      this.position = this.position.clone().add(stepIn)
      this.lookAt = this.lookAt.clone().add(stepIn)
    }
    if (movement.orientation) {
      const baseLookAt = this.lookAt.clone().applyMatrix3(cameraInverseTransform).normalize()
      const baseDelta = new Vector3(movement.orientation.x, movement.orientation.y, 0)
        .multiplyScalar(this.props.aspect / 360)
      const newBaseLookAt = baseLookAt.add(baseDelta)
      this.lookAt = newBaseLookAt.multiplyScalar(100).applyMatrix3(cameraTransform)
    }
  }

  componentDidUpdate () {
    console.log('camera did update')
    if (this.props.movement) {
      this.props.stabilize()
    }
  }

  render () {
    const {
      movement,
      aspect
    } = this.props

    if (movement) {
      this.adjustCamera(movement)
    }

    return (
      <perspectiveCamera
        ref={mainCamera => { this.mainCamera = mainCamera }}
        name='camera'
        fov={75}
        aspect={aspect}
        near={0.1}
        far={1000}
        lookAt={this.lookAt}
        position={this.position}
      />
    )
  }
}

Camera.propTypes = {
  movement: PropTypes.object,
  aspect: PropTypes.number,
  stabilize: PropTypes.func
}
