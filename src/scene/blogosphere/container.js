import React from 'react'
import PropTypes from 'react-proptypes'
import { connect } from 'react-redux'
import * as THREE from 'three'

class Blogosphere extends React.Component {
  constructor () {
    super()
    this.deltaLight = 0.05
    this.lastPulse = performance.now()
    this.state = {
      lightIntensity: 4
    }
  }

  componentDidMount () {
    requestAnimationFrame(now => this.pulseLights(now))
  }

  pulseLights (now) {
    if (now - this.lastPulse > 100) {
      this.lastPulse = now

      let lightIntensity = this.state.lightIntensity
      lightIntensity += this.deltaLight
      if (lightIntensity > 5 || lightIntensity < 2) {
        this.deltaLight *= -1
      }
      this.setState({
        lightIntensity
      })
    }
    requestAnimationFrame(now => this.pulseLights(now))
  }

  render () {
    const {
      position,
      rotation,
      radius,
      widthSegments,
      heightSegments
    } = this.props

    const topLight1 = position.clone()
    topLight1.setX(radius / 2)
    topLight1.setY(Math.sqrt(Math.pow(radius, 2) - topLight1.x) - 10)
    const topLight2 = position.clone()
    topLight2.setX(-radius / 2)
    topLight2.setY(Math.sqrt(Math.pow(radius, 2) - topLight2.x) - 10)
    const topLight3 = position.clone()
    topLight3.setZ(radius / 2)
    topLight3.setY(Math.sqrt(Math.pow(radius, 2) - topLight3.z) - 10)
    const topLight4 = position.clone()
    topLight4.setZ(-radius / 2)
    topLight4.setY(Math.sqrt(Math.pow(radius, 2) - topLight4.z) - 10)

    const centerLight1 = position.clone()
    centerLight1.setX(radius - 1)
    const centerLight2 = position.clone()
    centerLight2.setX(-radius + 1)
    const centerLight3 = position.clone()
    centerLight3.setZ(radius - 1)
    const centerLight4 = position.clone()
    centerLight4.setZ(-radius + 1)

    const lowerLight1 = position.clone()
    lowerLight1.setX(radius / 2)
    lowerLight1.setY(-Math.sqrt(Math.pow(radius, 2) - lowerLight1.x) + 10)
    const lowerLight2 = position.clone()
    lowerLight2.setX(-radius / 2)
    lowerLight2.setY(-Math.sqrt(Math.pow(radius, 2) - lowerLight2.x) + 10)
    const lowerLight3 = position.clone()
    lowerLight3.setZ(radius / 2)
    lowerLight3.setY(-Math.sqrt(Math.pow(radius, 2) - lowerLight3.z) + 10)
    const lowerLight4 = position.clone()
    lowerLight4.setZ(-radius / 2)
    lowerLight4.setY(-Math.sqrt(Math.pow(radius, 2) - lowerLight4.z) + 10)

    const lightDistance = radius * 2

    return <group>

      <pointLight visible color={0xc4c4ff}position={topLight1} intensity={this.state.lightIntensity} decay={2} distance={lightDistance} />
      <pointLight visible color={0xc4c4ff}position={topLight2} intensity={this.state.lightIntensity} decay={2} distance={lightDistance} />
      <pointLight visible color={0xc4c4ff}position={topLight3} intensity={this.state.lightIntensity} decay={2} distance={lightDistance} />
      <pointLight visible color={0xc4c4ff}position={topLight4} intensity={this.state.lightIntensity} decay={2} distance={lightDistance} />

      <pointLight visible color={0xc4c4ff}position={centerLight1} intensity={this.state.lightIntensity} decay={2} distance={lightDistance} />
      <pointLight visible color={0xc4c4ff}position={centerLight2} intensity={this.state.lightIntensity} decay={2} distance={lightDistance} />
      <pointLight visible color={0xc4c4ff}position={centerLight3} intensity={this.state.lightIntensity} decay={2} distance={lightDistance} />
      <pointLight visible color={0xc4c4ff}position={centerLight4} intensity={this.state.lightIntensity} decay={2} distance={lightDistance} />

      <pointLight visible color={0xc4c4ff}position={lowerLight1} intensity={this.state.lightIntensity} decay={2} distance={lightDistance} />
      <pointLight visible color={0xc4c4ff}position={lowerLight2} intensity={this.state.lightIntensity} decay={2} distance={lightDistance} />
      <pointLight visible color={0xc4c4ff}position={lowerLight3} intensity={this.state.lightIntensity} decay={2} distance={lightDistance} />
      <pointLight visible color={0xc4c4ff}position={lowerLight4} intensity={this.state.lightIntensity} decay={2} distance={lightDistance} />

      <mesh position={position} quaternion={rotation}>
        <sphereGeometry radius={radius} widthSegments={widthSegments} heightSegments={heightSegments} />
        <meshPhongMaterial reflectivity={5} shininess={20}side={THREE.BackSide} color={0x00027} />
      </mesh>

      <mesh position={position} rotation={new THREE.Euler(Math.PI / 2, 0, 0)}>
        <ringGeometry outerRadius={radius} innerRadius={radius / 2} />
        <meshPhongMaterial reflectivity={5} shininess={20} opacity={0.7} transparent color={0x000000} side={THREE.DoubleSide} />
      </mesh>
    </group>
  }
}

Blogosphere.propTypes = {
  position: PropTypes.object,
  rotation: PropTypes.object,
  radius: PropTypes.number,
  widthSegments: PropTypes.number,
  heightSegments: PropTypes.number
}

const mapStateToProps = (state, ownProps) => ({
  position: ownProps.position,
  rotation: state.blogosphere.rotation,
  radius: state.blogosphere.radius,
  widthSegments: state.blogosphere.widthSegments,
  heightSegments: state.blogosphere.heightSegments
})

export default connect(mapStateToProps, null)(Blogosphere)
