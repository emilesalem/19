import React from 'react'
import PropTypes from 'react-proptypes'
import * as THREE from 'three'

const PRISM_WIDTH = 20
const PRISM_HEIGHT = 20
const PRISM_DEPTH = 40
const PRISMOTRON_CUBIC_SIZE = 150

export default class Prismotron extends React.Component {
  constructor (props) {
    super()
    this.state = {
      head: props.head,
      prisms: []
    }
    setInterval(() => {
      this.addPrism()
    }, 1)
  }

  addPrism () {
    const head = this.state.head.clone()
    const prisms = this.state.prisms
    head.z += PRISM_DEPTH
    if (head.z >= PRISMOTRON_CUBIC_SIZE) {
      head.z = -PRISMOTRON_CUBIC_SIZE
      head.y += PRISM_HEIGHT
    }
    if (head.y >= PRISMOTRON_CUBIC_SIZE) {
      head.y = -PRISMOTRON_CUBIC_SIZE
      head.x += PRISM_WIDTH
    }
    prisms.push({ position: head })
    this.setState({
      head,
      prisms
    })
  }

  render () {
    const prisms = this.state.prisms.map((prism, key) => {
      const position = prism.position
      return (
        <group key={key}>
          <mesh position={position}>
            <planeGeometry width={PRISM_WIDTH} height={PRISM_HEIGHT} />
            <lineBasicMaterial color={0x00ff00} transparent opacity={0.1} />
          </mesh>
          <lineSegments position={position}
            rotation={new THREE.Euler(0, 0, Math.PI / 2)}>
            <planeGeometry width={PRISM_WIDTH} height={PRISM_HEIGHT} />
            <lineBasicMaterial color={0x00ff00} />
          </lineSegments>
          <lineSegments position={position}
            rotation={new THREE.Euler(0, Math.PI / 2, 0)}>
            <planeGeometry width={PRISM_DEPTH} height={PRISM_WIDTH} />
            <lineBasicMaterial color={0x00ff00} />
          </lineSegments>
        </group>
      )
    })
    return <group>{prisms}</group>
  }
}

Prismotron.propTypes = {
  head: PropTypes.object
}
