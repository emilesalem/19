import CameraComponent from './component'
import { connect } from 'react-redux'
import { stopMoving } from './index'

const mapStateToProps = (state) => ({
  movement: state.camera.movement
})

const mapDispatchToProps = () => ({
  stabilize: stopMoving
})

export default connect(mapStateToProps, mapDispatchToProps)(CameraComponent)
