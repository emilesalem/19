import React from 'react'
import PropTypes from 'react-proptypes'
import { Vector2, Vector3, Matrix3 } from 'three'

export default class Camera extends React.Component {
  constructor (props) {
    super(props)
    this.lookAt = new Vector3(0, 0, 0)
    this.position = new Vector3(0, 0, 10)
    this.mainCamera = null
  }

  adjustCamera (movement) {
    console.log(`movement: ${JSON.stringify(movement)}`)
    const cameraTransform = new Matrix3().getInverse(new Matrix3().setFromMatrix4(this.mainCamera.matrixWorldInverse))

    if (movement.direction) {
      const stepIn = movement.direction.applyMatrix3(cameraTransform)
      stepIn.setComponent(1, this.position.y)
      this.position = this.position.clone().add(stepIn)
      this.lookAt = this.lookAt.clone().add(stepIn)
    }
    if (movement.orientation) {
      const newLookat = new Vector3(this.lookAt.x + movement.orientation.x,
        this.lookAt.y + movement.orientation.y, this.lookAt.z)
      this.lookAt = newLookat
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
