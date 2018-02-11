import React from 'react'
import { connect } from 'react-redux'
import { Vector3 } from 'three'
import Camera from './camera/container'
import PropTypes from 'react-proptypes'
import Wall from './wall/component'

class Scene extends React.Component {
  render () {
    const {
      sceneObjects
    } = this.props
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
        {sceneObjects.map((sceneObject, k) => (
          <Wall key={k}
            width={sceneObject.width}
            height={sceneObject.height}
            depth={sceneObject.depth}
            rotation={sceneObject.rotation}
            position={sceneObject.position} />
        ))}
      </scene>)
  }
}

Scene.propTypes = {
  store: PropTypes.object,
  sceneObjects: PropTypes.array
}

function mapStateToProps (state, ownProps) {
  return {
    store: ownProps.store,
    sceneObjects: state.scene.sceneObjects
  }
}

export default connect(mapStateToProps, null)(Scene)
