import React from 'react'
import PropTypes from 'react-proptypes'
import { Vector2, Vector3, Matrix3, Sphere } from 'three'

export default class Camera extends React.Component {
  constructor (props) {
    super(props)
    this.lookAt = new Vector3(0, 0, 0)
    this.position = new Vector3(0, 0, 10)
    this.mainCamera = null
    this.visualSphere = new Sphere(this.position, 10)
  }

  positionOnVisualSphere (lookAt) {

  }

  adjustCamera (movement) {
    const cameraTransform = new Matrix3().getInverse(new Matrix3().setFromMatrix4(this.mainCamera.matrixWorldInverse))

    if (movement.direction) {
      const stepIn = movement.direction.applyMatrix3(cameraTransform)
      stepIn.setComponent(1, this.position.y)
      this.position = this.position.clone().add(stepIn)
      this.lookAt = this.lookAt.clone().add(stepIn)
    } else if (movement.orientation) {
      const baseLookAt = this.lookAt.clone().applyMatrix3(new Matrix3().getInverse(cameraTransform)).normalize()

      const phi = Math.atan(baseLookAt.x / baseLookAt.z)
      const theta = Math.acos(baseLookAt.y)

      const deltaPhi = movement.orientation.y * this.props.aspect * (2 * Math.PI) / 3600
      const deltaTeta = movement.orientation.x * this.props.aspect * (2 * Math.PI) / 3600
      const newTheta = theta + deltaTeta
      const newPhi = phi + deltaPhi

      const newX = -Math.cos(newTheta)
      const newY = -Math.sin(newTheta) * Math.sin(newPhi)
      const newZ = -Math.cos(newPhi) * Math.sin(newTheta)

      const newBaseLookAt = new Vector3(newX, newY, newZ)
      this.lookAt = newBaseLookAt.applyMatrix3(cameraTransform).multiplyScalar(1000)
      console.log(`lookAt: ${JSON.stringify(this.lookAt)}`)
    }
  }

  componentDidUpdate () {
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
