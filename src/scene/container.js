import React from 'react'
import { connect } from 'react-redux'
import { Vector3 } from 'three'
import Camera from './camera/container'
import PropTypes from 'react-proptypes'
import Blogosphere from './blogosphere/container'

class Scene extends React.Component {
  render () {
    const width = window.innerWidth
    const height = window.innerHeight

    return (
      <scene>
        <Camera position={new Vector3(45, 1, 0)} aspect={width / height} store={this.props.store} />
        <ambientLight />
        <Blogosphere position={new Vector3(0, 0, 0)} store={this.props.store} />
      </scene>
    )
  }
}

Scene.propTypes = {
  store: PropTypes.object
}

function mapStateToProps (state, ownProps) {
  return {
    store: ownProps.store
  }
}

export default connect(mapStateToProps, null)(Scene)
