import React from 'react'
import { Vector3 } from 'three'
import Camera from './camera/container'
import PropTypes from 'react-proptypes'
export default class Scene extends React.Component {
  constructor (props, context) {
    super(props, context)
    setInterval(() => {
      this.props.addPrism()
    }, 100)
  }

  render () {
    const width = window.innerWidth
    const height = window.innerHeight

    return (
      <scene>
        <ambientLight
          color={0x666666}
        />
        <directionalLight
          name='sun'
          position={new Vector3(10, 10, -5)}
          castShadow
          color={0xF8F4AC}
          lookAt={new Vector3(-3, 0, 3)}
        />
        <Camera aspect={width / height} store={this.props.store} />
        {this.props.initialObjects}
      </scene>)
  }
}

Scene.propTypes = {
  store: PropTypes.object,
  initialObjects: PropTypes.array,
  addPrism: PropTypes.func
}
