import { createAction, handleActions } from 'redux-actions'
import * as THREE from 'three'
import React from 'react'

export const ADD_OBJECT = 'ADD_OBJECT'
export const ADD_PRISM = 'ADD_PRISM'

export const addObject = createAction(ADD_OBJECT)
export const addPrism = createAction(ADD_PRISM)

const PRISMOTRON_CUBIC_SIZE = 150
const PRISM_WIDTH = 20
const PRISM_HEIGHT = 20
const PRISM_DEPTH = 40

const sceneObjects = []

function newPrism (x, y, z) {
  const result = []
  const matos1 = (<lineBasicMaterial
    color={0x00ff00} transparent opacity={0.1}
  />)
  const matos2 = (<lineBasicMaterial
    color={0x00ff00}
  />)
  const matos3 = (<lineBasicMaterial
    color={0x00ff00}
  />)
  const lines = (<mesh position={new THREE.Vector3(x, y, z)}>
    <planeGeometry width={PRISM_WIDTH} height={PRISM_HEIGHT} />
    {matos1}
  </mesh>
  )
  const lines2 = (<lineSegments position={new THREE.Vector3(x, y, z)}
    rotation={new THREE.Euler(0, 0, Math.PI / 2)}>
    <planeGeometry width={PRISM_WIDTH} height={PRISM_HEIGHT} />
    {matos2}
  </lineSegments>)
  const lines3 = (<lineSegments position={new THREE.Vector3(x, y, z)}
    rotation={new THREE.Euler(0, Math.PI / 2, 0)}>
    <planeGeometry width={PRISM_DEPTH} height={PRISM_WIDTH} />
    {matos3}
  </lineSegments>)
  result.push(lines)
  result.push(lines2)
  result.push(lines3)
  return result
}

const defaultState = {
  sceneObjects: sceneObjects,
  prismotron: {
    currentX: -PRISMOTRON_CUBIC_SIZE,
    currentY: -PRISMOTRON_CUBIC_SIZE,
    currentZ: -PRISMOTRON_CUBIC_SIZE,
    prisms: 0,
    done: false
  }
}

export default handleActions({
  ADD_PRISM: (state, action) => {
    let x = state.prismotron.currentX
    let y = state.prismotron.currentY
    let z = state.prismotron.currentZ + PRISM_DEPTH
    if (z >= PRISMOTRON_CUBIC_SIZE) {
      z = -PRISMOTRON_CUBIC_SIZE
      y += PRISM_HEIGHT
    }
    if (y >= PRISMOTRON_CUBIC_SIZE) {
      y = -PRISMOTRON_CUBIC_SIZE
      x += PRISM_WIDTH
    }
    const prisms = state.prismotron.prisms + 1
    const done = prisms >= Math.pow(PRISMOTRON_CUBIC_SIZE * 2, 2)

    sceneObjects.push(newPrism(x, y, z))
    return {
      ...state,
      sceneObjects: Array.from(sceneObjects),
      prismotron: {
        currentX: x,
        currentY: y,
        currentZ: z,
        prisms,
        done
      }
    }
  }
}, defaultState)
