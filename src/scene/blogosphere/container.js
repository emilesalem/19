import React from 'react'
import PropTypes from 'react-proptypes'
import { connect } from 'react-redux'
import * as THREE from 'three'
import { addColidable } from '../index'
import Blogpost, { WIDTH, HEIGHT } from '../blogpost/component'

class Blogosphere extends React.Component {
  constructor (props) {
    super(props)
    this.deltaLight = 0.3
    this.lastPulse = performance.now()
    this.state = {
      lightIntensity: 4
    }
    this.blogposts = this.positionBlogPosts()
  }

  componentDidMount () {
    // this.floorGeo.computeBoundingSphere()
    // this.floor.boundingSphere = this.floorGeo.boundingSphere
    // this.floor.didCollide = this.floorCollision.bind(this)
    // this.props.registerColidable(this.floor)

    requestAnimationFrame(now => this.pulseLights(now))
  }

  pulseLights (now) {
    if (now - this.lastPulse > 50) {
      this.lastPulse = now

      let lightIntensity = this.state.lightIntensity
      lightIntensity += this.deltaLight
      if (lightIntensity > 15 || lightIntensity < 1) {
        this.deltaLight *= -1
      }
      this.setState({
        lightIntensity
      })
    }
    requestAnimationFrame(now => this.pulseLights(now))
  }

  floorCollision (point) {
    return this.floor.boundingSphere.distanceToPoint(point) > 0
  }

  render () {
    const {
      position,
      rotation,
      radius,
      widthSegments,
      heightSegments
    } = this.props

    const floorPosition = position.clone()
    floorPosition.setY(floorPosition.y - 3)
    return <group>
      <mesh position={position} quaternion={rotation}>
        <sphereGeometry ref={sphereGeometry => {
          this.sphereGeometry = sphereGeometry
        }} radius={radius} widthSegments={widthSegments} heightSegments={heightSegments} />
        <meshPhongMaterial transparent opacity={1 - this.state.lightIntensity / 30} specular={0xffffff}
          shininess={400} emissiveIntensity={this.state.lightIntensity / 10} side={THREE.BackSide} color={0x000022} />
      </mesh>
      {/* <mesh ref={floor => { this.floor = floor }} position={floorPosition} >
        <cylinderGeometry ref={floorGeo => { this.floorGeo = floorGeo }}radiusTop={15}
        radiusBottom={5} height={2}radialSegments={widthSegments} heightSegments={heightSegments} />
        <meshPhongMaterial shininess={200} emissiveIntensity={this.state.lightIntensity / 10} color={0x000022} />
      </mesh> */}
      <lineSegments position={position} quaternion={rotation}>
        <edgesGeometry geometry={new THREE.SphereGeometry(radius + 1, widthSegments, heightSegments)} />
        <lineBasicMaterial lights color={0x111144} />
      </lineSegments>
      {this.lights(new THREE.Sphere(position, Math.floor(radius * 0.99)), rotation)}
      <ambientLight intensity={0.3} />
      {this.blogposts}
    </group>
  }

  renderBlogposts () {
    return this.blogposts.map(blogpost => {
      const originalRotation = new THREE.Quaternion().setFromEuler(blogpost.rotation)
      const compoundRotation = this.props.rotation.clone().multiply(originalRotation)
      const position = blogpost.position.clone().applyQuaternion(compoundRotation)
      const rotation = blogpost.rotation.clone().setFromQuaternion(compoundRotation)
      return <Blogpost key={blogpost.key} position={position}
        rotation={rotation} content={blogpost.content} store={this.props.store} />
    })
  }
  positionBlogPosts () {
    const blogposts = this.props.blogposts
    const postWidth = WIDTH
    const postHeigth = HEIGHT
    const columnInterspace = 300
    const rowInterspace = 50
    const rowRotationDelta = (postHeigth + rowInterspace) / this.props.radius
    let cumulColRotation = 0
    let cumulRowRotation = 0
    let currentRow = 0
    let columnIndex = 0
    let rowIndex = 0
    const r = this.props.radius
    const result = []
    let index = 0
    let originalPosition = new THREE.Vector3(0, 0, r)
    for (const post of blogposts) {
      const rPrime = Math.cos(Math.abs(cumulRowRotation)) * r
      const maxPerRow = 2 * Math.PI * rPrime / (postWidth + columnInterspace)
      cumulColRotation = columnIndex++ * (postWidth + columnInterspace) / rPrime
      if (columnIndex > maxPerRow) {
        rowIndex++
        originalPosition = new THREE.Vector3(0, 0, rPrime)
        currentRow = (rowIndex % 2 === 0 && rowIndex > 0) ? -currentRow : Math.abs(currentRow) + 1
        cumulRowRotation = rowRotationDelta * currentRow
        columnIndex = 0
        cumulColRotation = 0
      }
      const rotation = new THREE.Euler().set(cumulRowRotation, cumulColRotation, 0, 'YXZ')
      result.push(<Blogpost key={index++} position={originalPosition.clone().applyEuler(rotation)}
        rotation={rotation} quaternion={this.props.rotation} content={post} store={this.props.store} />)
      // result.push({
      //   key: index++,
      //   position: originalPosition.clone().applyEuler(rotation),
      //   rotation,
      //   content: post
      // })
    }
    return result
  }

  lights (sphere, rotation) {
    const lights = []
    const nbOfLights = 4
    const deltaX = sphere.radius * 2 / nbOfLights
    let i = 1
    const lightDistance = sphere.radius
    for (let x = -sphere.radius; x < sphere.radius + deltaX; x += deltaX, i += 6) {
      const position = sphere.clampPoint(new THREE.Vector3(x, 0, Math.sqrt(Math.pow(sphere.radius, 2) - Math.pow(x, 2))))
      const position2 = sphere.clampPoint(new THREE.Vector3(x, 0, -(Math.sqrt(Math.pow(sphere.radius, 2) - Math.pow(x, 2)))))
      lights.push(<pointLight key={x} visible color={0xc4c4ff}position={position.applyQuaternion(rotation)} intensity={this.state.lightIntensity} decay={2} distance={lightDistance} />)
      lights.push(<pointLight key={x + i}visible color={0xc4c4ff}position={position2.applyQuaternion(rotation)} intensity={this.state.lightIntensity} decay={2} distance={lightDistance} />)
      if (x > -sphere.radius && x < sphere.radius) {
        const position3 = sphere.clampPoint(new THREE.Vector3(x, Math.sqrt(Math.pow(sphere.radius, 2) - Math.pow(x, 2), 0)))
        const position4 = sphere.clampPoint(new THREE.Vector3(x, -(Math.sqrt(Math.pow(sphere.radius, 2) - Math.pow(x, 2))), 0))
        const position5 = sphere.clampPoint(new THREE.Vector3(0, Math.sqrt(Math.pow(sphere.radius, 2) - Math.pow(x, 2)), x))
        const position6 = sphere.clampPoint(new THREE.Vector3(0, -(Math.sqrt(Math.pow(sphere.radius, 2) - Math.pow(x, 2))), x))
        lights.push(<pointLight key={x + i + 1} visible={false} color={0xc4c4ff}position={position3.applyQuaternion(rotation)} intensity={this.state.lightIntensity} decay={2} distance={lightDistance} />)
        lights.push(<pointLight key={x + i + 2}visible color={0xc4c4ff}position={position4.applyQuaternion(rotation)} intensity={this.state.lightIntensity} decay={2} distance={lightDistance} />)
        lights.push(<pointLight key={x + i + 3} visible color={0xc4c4ff}position={position6.applyQuaternion(rotation)} intensity={this.state.lightIntensity} decay={2} distance={lightDistance} />)
        lights.push(<pointLight key={x + i + 4}visible color={0xc4c4ff}position={position5.applyQuaternion(rotation)} intensity={this.state.lightIntensity} decay={2} distance={lightDistance} />)
      }
    }
    return lights
  }
}

Blogosphere.propTypes = {
  position: PropTypes.object,
  rotation: PropTypes.instanceOf(THREE.Quaternion),
  radius: PropTypes.number,
  widthSegments: PropTypes.number,
  heightSegments: PropTypes.number,
  registerColidable: PropTypes.func,
  blogposts: PropTypes.array,
  store: PropTypes.object
}

const mapStateToProps = (state, ownProps) => ({
  position: ownProps.position,
  rotation: state.blogosphere.rotation,
  radius: state.blogosphere.radius,
  widthSegments: state.blogosphere.widthSegments,
  heightSegments: state.blogosphere.heightSegments,
  blogposts: state.blogosphere.blogposts
})

const mapDispatchToProps = {
  registerColidable: addColidable
}

export default connect(mapStateToProps, mapDispatchToProps)(Blogosphere)
