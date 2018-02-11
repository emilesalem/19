import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'react-proptypes'
import { addColidable } from '../index'

class Wall extends React.Component {
  componentDidMount () {
    this.geometry.computeBoundingBox()
    this.geometry.boundingBox.setFromObject(this.mesh)
    this.props.registerColidable(this.geometry.boundingBox)
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
        <mesh ref={mesh => { this.mesh = mesh }} position={position} quaternion={rotation}>
          <boxGeometry ref={geo => { this.geometry = geo }} width={width} height={height} depth={depth} />
          <meshPhongMaterial />
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
  position: PropTypes.object,
  registerColidable: PropTypes.func
}

const mapDispatchToProps = {
  registerColidable: addColidable
}

export default connect(null, mapDispatchToProps)(Wall)
