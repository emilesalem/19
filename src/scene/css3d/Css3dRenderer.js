import Css3dObject from './Css3dObject'
import { Math as Math3 } from 'three'

export default class CSS3DRenderer {
  constructor (containerId) {
    this.cache = {
      camera: { perspective: 0, style: '' },
      objects: {}
    }

    this.domElement = document.createElement('div')
    this.domElement.style.position = 'absolute'
    this.domElement.style.top = 0
    this.domElement.style.overflow = 'hidden'
    this.domElement.style.WebkitTransformStyle = 'preserve-3d'
    this.domElement.style.MozTransformStyle = 'preserve-3d'
    this.domElement.style.oTransformStyle = 'preserve-3d'
    this.domElement.style.transformStyle = 'preserve-3d'

    this.cameraElement = document.createElement('div')
    this.cameraElement.style.WebkitTransformStyle = 'preserve-3d'
    this.cameraElement.style.MozTransformStyle = 'preserve-3d'
    this.cameraElement.style.oTransformStyle = 'preserve-3d'
    this.cameraElement.style.transformStyle = 'preserve-3d'

    this.domElement.appendChild(this.cameraElement)
    document.getElementById(containerId).appendChild(this.domElement)

    this.width = window.innerWidth
    this.height = window.innerHeight

    this.domElement.style.width = this.width + 'px'
    this.domElement.style.height = this.height + 'px'
    this.cameraElement.style.width = this.width + 'px'
    this.cameraElement.style.height = this.height + 'px'
  }

  renderObject (object) {
    if (object instanceof Css3dObject) {
      const style = `${getObjectCSSMatrix(object.matrixWorld)}`
      const element = object.element
      const cachedStyle = this.cache.objects[ object.id ]

      if (cachedStyle === undefined || cachedStyle !== style) {
        element.style.WebkitTransform = style
        element.style.MozTransform = style
        element.style.oTransform = style
        element.style.transform = style
        this.cache.objects[ object.id ] = style
      }
      if (element.parentNode !== this.cameraElement) {
        this.cameraElement.appendChild(element)
      }
    }
    object.children.forEach(children => this.renderObject(children))
  }

  render (scene, camera) {
    const perspective = 0.5 / Math.tan(Math3.degToRad(camera.fov * 0.5)) * this.height
    if (this.cache.camera.perspective !== perspective) {
      this.domElement.style.WebkitPerspective = perspective + 'px'
      this.domElement.style.MozPerspective = perspective + 'px'
      this.domElement.style.oPerspective = perspective + 'px'
      this.domElement.style.perspective = perspective + 'px'
      this.cache.camera.perspective = perspective
    }
    scene.updateMatrixWorld()

    const style = `translate3d(0, 0, ${epsilon(perspective)}px)` +
     getCameraCSSMatrix(camera.matrixWorldInverse) +
    `translate3d(${this.width / 2}px, ${this.height / 2}px, 0)`

    if (this.cache.camera.style !== style) {
      this.cameraElement.style.WebkitTransform = style
      this.cameraElement.style.MozTransform = style
      this.cameraElement.style.oTransform = style
      this.cameraElement.style.transform = style
      this.cache.camera.style = style
    }
    this.renderObject(scene, camera)
  }
}

function epsilon (value) {
  return Math.abs(value) < Number.EPSILON ? 0 : value
}

/*
flips y coordinates so 0 is on top
 */
function getObjectCSSMatrix (matrix) {
  const elements = matrix.elements;
  [4, 5, 6, 7].forEach(i => { elements[i] = -elements[i] })
  return `translate(-50%,-50%) matrix3d(${elements.map(epsilon).join()})`
}

/*
transforms from webGL coordinates to CSS3d coordinates
*/
function getCameraCSSMatrix (matrix) {
  const elements = matrix.elements;
  [1, 5, 9, 13].forEach(i => { elements[i] = -elements[i] })
  return `matrix3d(${elements.map(epsilon).join()})`
}
