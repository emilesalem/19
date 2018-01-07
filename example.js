import React3 from 'react-three-renderer'

class Simple extends React.Component {
  constructor (props, context) {
    super(props, context)

    this.cameraPosition = new THREE.Vector3(0, 0, 5)
  }

  render () {
    const width = window.innerWidth
    const height = window.innerHeight

    return (<React3
      mainCamera="camera"
      width={width}
      height={height}
    >
      <scene>
        <perspectiveCamera
          name="camera"
          fov={75}
          aspect={width / height}
          near={0.1}
          far={1000}

          position={this.cameraPosition}
        />
        <mesh>
          <boxGeometry
            width={1}
            height={1}
            depth={1}
          />
          <meshBasicMaterial
            color={0x00ff00}
          />
        </mesh>
      </scene>
    </React3>)
  }
}

ReactDOM.render(<Simple/>, document.body)
