import React from 'react'
import { connect } from 'react-redux'
import { Vector3, Quaternion } from 'three'
import Camera from './camera/container'
import PropTypes from 'react-proptypes'
import Blogosphere from './blogosphere/container'
import HTML3D from './html3d/HTML3D'

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
    const camera2 = this.props.mainCameraState
    return (
      <scene>
        <Camera position={new Vector3(0, 1, 0)} aspect={width / height} store={this.props.store} />
        <ambientLight />
        {this.blogoSpheres(1)}
        <HTML3D camera={camera2} position={new Vector3(0, 20, -1800)} quaternion={new Quaternion()}>
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
  mainCameraState: PropTypes.object
}

function mapStateToProps (state, ownProps) {
  return {
    store: ownProps.store,
    mainCameraState: state.scene.camera
  }
}

export default connect(mapStateToProps, null)(Scene)
