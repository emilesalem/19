import React from 'react'
import React3 from 'react-three-renderer'
import ReactDOM from 'react-dom'
import * as THREE from 'three'

class Simple extends React.Component {
  constructor (props, context) {
    super(props, context)

    this.cameraPosition = new THREE.Vector3(10, 5, 10)
    this.sunPosition = new THREE.Vector3(10, 10, -5)
    this.sunTarget = new THREE.Vector3(-3, 0, 3)
  }

  render () {
    const width = window.innerWidth
    const height = window.innerHeight

    return (
    
    <div onClick={() => console.log('CLICKED THE CANVAS')}>
    <React3
      mainCamera="camera"
      width={width}
      height={height}
      shadowMapEnabled
      
    >
      <scene>

      <ambientLight
            color={0x666666}
          />

        <directionalLight
          name="sun"
          position={this.sunPosition}
          castShadow
          color={0xF8F4AC}
          lookAt={this.sunTarget}
        />

        <perspectiveCamera
          name="camera"
          fov={75}
          aspect={width / height}
          near={0.1}
          far={1000}
          lookAt={new THREE.Vector3(0,0,0)}
          position={this.cameraPosition}
        />

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
          rotation={new THREE.Euler(1.5* Math.PI, 0, 0)}
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
    </React3></div>)
  }
}

ReactDOM.render(<Simple/>, document.body)
