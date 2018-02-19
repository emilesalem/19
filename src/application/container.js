import React from 'react'
import Canvas from '../canvas/component'
import { connect } from 'react-redux'
import { toggleControl, reactToKey, reactToMouse, reactToWheel } from './index'
import PropTypes from 'react-proptypes'

const onKeyPress = (event, props) => {
  if (props.controlActive) {
    props.reactToKey(event.key)
  }
}

const onMouseMove = (event, props) => {
  if (props.controlActive) {
    props.reactToMouse(event)
  }
  event.stopPropagation()
  event.preventDefault()
}

const onMouseWheel = (event, props) => {
  if (props.controlActive) {
    props.reactToWheel(event)
  }
  event.stopPropagation()
  event.preventDefault()
}

const App = props => (
  <div onClick={props.toggleControl}
    onKeyPress={event => onKeyPress(event, props)}
    onMouseMove={event => onMouseMove(event, props)}
    onWheel={event => onMouseWheel(event, props)}
    tabIndex='0'>
    <Canvas store={props.store} />
  </div>
)

const mapStateToProps = (state) => ({
  controlActive: state.camera.controlActive
})

const mapDispatchToProps = {
  toggleControl,
  reactToKey,
  reactToMouse,
  reactToWheel
}

App.propTypes = {
  toggleControl: PropTypes.func,
  store: PropTypes.object
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
