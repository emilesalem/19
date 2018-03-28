import CameraComponent from './component'
import { connect } from 'react-redux'
import { captureCamera } from './index'

const mapStateToProps = state => ({
  movement: state.camera.movement
})

const mapDispatchToProps = {
  motionCap: captureCamera
}

export default connect(mapStateToProps, mapDispatchToProps)(CameraComponent)
