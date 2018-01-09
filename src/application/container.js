import React from 'react'
import Scene from '../scene/component'
import { connect } from 'react-redux'
import { toggleControl, reactToKey } from './index'
import PropTypes from 'react-proptypes'

const onKeyPress = (event, props) => {
  if (props.controlActive) {
    props.reactToKey(event.key)
  }
}

const App = props => (
  <div onClick={props.toggleControl}
    onKeyPress={event => onKeyPress(event, props)}
  >
    <Scene store={props.store} />
  </div>
)

const mapStateToProps = (state, ownProps) => ({
  controlActive: state.camera.controlActive,
  store: ownProps.store
})

const mapDispatchToProps = {
  toggleControl,
  reactToKey
}

App.propTypes = {
  toggleControl: PropTypes.func,
  store: PropTypes.object
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
