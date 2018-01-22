import { connect } from 'react-redux'
import Scene from './component'
import { addPrism } from './index'
const mapStateToProps = state => ({
  initialObjects: state.scene.sceneObjects,
  prismotronDone: state.scene.prismotron.done
})

export default connect(mapStateToProps, { addPrism })(Scene)
