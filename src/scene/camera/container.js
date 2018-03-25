import CameraComponent from './component'
import { connect } from 'react-redux'
import { stopMoving } from './index'
import { captureCamera } from '..'

const mapStateToProps = state => ({
  movement: state.camera.movement
})

const mapDispatchToProps = {
  stabilize: stopMoving,
  motionCap: captureCamera
}

export default connect(mapStateToProps, mapDispatchToProps)(CameraComponent)
