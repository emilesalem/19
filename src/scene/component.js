import React from 'react'
import React3 from 'react-three-renderer'
import * as THREE from 'three'
import Camera from './camera/container'

export default class Scene extends React.Component {
  constructor (props, context) {
    super(props, context)
    this.sunPosition = new THREE.Vector3(10, 10, -5)
    this.sunTarget = new THREE.Vector3(-3, 0, 3)
  }

  render () {
    const width = window.innerWidth
    const height = window.innerHeight

    return (<React3
      mainCamera='camera'
      width={width}
      height={height}
      shadowMapEnabled
    >
      <scene>

        <ambientLight
          color={0x666666}
        />

        <directionalLight
          name='sun'
          position={this.sunPosition}
          castShadow
          color={0xF8F4AC}
          lookAt={this.sunTarget}
        />

        <Camera aspect={width / height} />

        <mesh
          position={new THREE.Vector3(0, 0, 0)}
          castShadow
          receiveShadow
        >
          <boxGeometry
            width={4}
            height={4}
            depth={4}

          />
          <meshLambertMaterial
            color={0x00ffff}
          />
        </mesh>

        <mesh
          position={new THREE.Vector3(0, -2, 0)}
          rotation={new THREE.Euler(1.5 * Math.PI, 0, 0)}
          receiveShadow
        >
          <planeGeometry
            width={200}
            height={20}
          />
          <meshLambertMaterial
            color={0xcccccc}
          />
        </mesh>
      </scene>
    </React3>)
  }
}
