import React from 'react'
import { connect } from 'react-redux'
import { Vector3, Quaternion } from 'three'
import Css3dContainer from './css3d/Css3dContainer'
import Camera from './camera/container'
import PropTypes from 'react-proptypes'
import Blogosphere from './blogosphere/container'
import HTML3D from './css3d/HTML3D'

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
        <Css3dContainer containerId='mainWindow' store={this.props.store} />
        <HTML3D position={new Vector3(0, 20, -1800)} quaternion={this.props.blogoRotation} store={this.props.store}>
          <div>
            <iframe width='100' height='80'
              src='https://www.youtube.com/embed/7_JUBgPHYmY' frameBorder='1' allow='autoplay; encrypted-media' />
            <p style={{ color: 'white' }}>This is my TEST post</p>
          </div>
        </HTML3D>
      </scene>
    )
  }
}

Scene.propTypes = {
  store: PropTypes.object,
  blogoRotation: PropTypes.instanceOf(Quaternion)
}

function mapStateToProps (state, ownProps) {
  return {
    store: ownProps.store,
    blogoRotation: state.blogosphere.rotation
  }
}

export default connect(mapStateToProps, null)(Scene)
