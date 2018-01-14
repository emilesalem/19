import React from 'react'
import Scene from '../scene/component'
import { connect } from 'react-redux'
import { toggleControl, reactToKey, reactToMouse } from './index'
import PropTypes from 'react-proptypes'

const onKeyPress = (event, props) => {
  if (props.controlActive) {
    props.reactToKey(event.key)
  }
}

const onMouseMove = (event, props) => {
  console.log('mouse move')
  if (props.controlActive) {
    console.log('moving view')
    props.reactToMouse(event)
  }
  event.stopPropagation()
  event.preventDefault()
}

const App = props => (
  <div onClick={props.toggleControl}
    onKeyPress={event => onKeyPress(event, props)}
    onMouseMove={event => onMouseMove(event, props)}
    tabIndex='0'>
    <Scene store={props.store} />
  </div>
)

const mapStateToProps = (state) => ({
  controlActive: state.camera.controlActive
})

const mapDispatchToProps = {
  toggleControl,
  reactToKey,
  reactToMouse
}

App.propTypes = {
  toggleControl: PropTypes.func,
  store: PropTypes.object
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
