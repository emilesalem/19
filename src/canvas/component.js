import React from 'react'
import React3 from 'react-three-renderer'
import PropTypes from 'react-proptypes'
import Scene from '../scene/container'

export default function Canvas (props) {
  return (
    <React3
      mainCamera='camera'
      width={window.innerWidth}
      height={window.innerHeight}
      shadowMapEnabled
    >
      <Scene store={props.store} />
    </React3>
  )
}

Canvas.propTypes = {
  store: PropTypes.object
}
