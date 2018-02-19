import React from 'react'
import { connect } from 'react-redux'
import { Vector3 } from 'three'
import Camera from './camera/container'
import PropTypes from 'react-proptypes'
import Blogosphere from './blogosphere/container'

class Scene extends React.Component {
  blogoSpheres (total) {
    const spheres = []
    for (let i = 0; i < total; i++) {
      spheres.push(<Blogosphere key={i} position={new Vector3(i + 70 * i, 0, 0)} store={this.props.store} />)
    }
    return spheres
  }

  render () {
    const width = window.innerWidth
    const height = window.innerHeight

    return (
      <scene>
        <Camera position={new Vector3(0, 1, 0)} aspect={width / height} store={this.props.store} />
        <ambientLight />
        {this.blogoSpheres(1)}
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
