import CameraComponent from './component'
import { connect } from 'react-redux'

const mapStateToProps = (state) => ({
  position: state.camera.position,
  lookAt: state.camera.lookAt
})

export default connect(mapStateToProps)(CameraComponent)
