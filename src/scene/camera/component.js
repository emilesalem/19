import React from 'react'
import PropTypes from 'react-proptypes'
import { Vector3 } from 'three'

export default class Camera extends React.Component {
  constructor (props) {
    super(props)
    this.lookAt = new Vector3(0, 0, -10)
    this.position = this.props.position
    this.mainCamera = null
  }

  adjustCamera (movement) {
    if (movement.direction) {
      const stepIn = movement.direction.clone().applyQuaternion(this.mainCamera.quaternion)
      stepIn.setComponent(1, 0)
      this.position = this.position.clone().add(stepIn)
      this.lookAt = this.lookAt.clone().add(stepIn)
    }
    if (movement.orientation) {
      const cameraRefLookAt = this.lookAt.clone()
      this.mainCamera.worldToLocal(cameraRefLookAt)
      cameraRefLookAt.normalize()
      const baseDelta = new Vector3(movement.orientation.x, movement.orientation.y, 0)
        .multiplyScalar(this.props.aspect / 360)
      cameraRefLookAt.add(baseDelta)
      this.lookAt = this.mainCamera.localToWorld(cameraRefLookAt.multiplyScalar(100))
    }
  }

  componentDidUpdate () {
    if (this.props.movement) {
      this.props.stabilize({
        position: this.position,
        transform: this.mainCamera.quaternion
      })
      this.props.motionCap(this.mainCamera)
    }
  }

  componentDidMount () {
    this.adjustCamera({ direction: new Vector3(0, 0, 1) })
    this.props.stabilize({
      position: this.position,
      transform: this.mainCamera.quaternion
    })
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
        lookAt={this.lookAt}
        position={this.position}
      />
    )
  }
}

Camera.propTypes = {
  motionCap: PropTypes.object,
  position: PropTypes.object,
  movement: PropTypes.object,
  aspect: PropTypes.number,
  stabilize: PropTypes.func
}
