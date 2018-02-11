import React from 'react'
import PropTypes from 'react-proptypes'

export default class Wall extends React.Component {
  getMesh () {
    return this.mesh
  }

  render () {
    const {
      width,
      height,
      depth,
      rotation,
      position
    } = this.props

    return (
      <group>
        <mesh ref={mesh => { this.mesh = mesh }}
          position={position}
          quaternion={rotation}>
          <boxGeometry width={width} height={height} depth={depth} />
          <lineBasicMaterial color={0x00ff00} transparent opacity={0.1} />
        </mesh>
      </group>
    )
  }
}

Wall.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  depth: PropTypes.number,
  rotation: PropTypes.object,
  position: PropTypes.object
}
