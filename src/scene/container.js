import React from 'react'
import { connect } from 'react-redux'
import { Vector3, Quaternion } from 'three'
import Camera from './camera/container'
import PropTypes from 'react-proptypes'
import Wall from './wall/container'

class Scene extends React.Component {
  render () {
    const width = window.innerWidth
    const height = window.innerHeight

    return (
      <scene>
        <ambientLight color={0x666666} />
        <directionalLight
          name='sun'
          position={new Vector3(10, 10, -5)}
          castShadow
          color={0xF8F4AC}
          lookAt={new Vector3(-3, 0, 3)}
        />
        <Camera aspect={width / height} store={this.props.store} />
        <Wall
          store={this.props.store}
          width={20}
          height={100}
          depth={2000}
          rotation={new Quaternion()}
          position={new Vector3(60, 0, -10)} />
        <Wall
          store={this.props.store}
          width={20}
          height={100}
          depth={2000}
          rotation={new Quaternion()}
          position={new Vector3(-60, 0, -10)} />
      </scene>)
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
