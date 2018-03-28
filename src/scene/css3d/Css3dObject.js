import { Object3D } from 'three'

const CSS3DObject = function (element) {
  Object3D.call(this)

  this.element = element
  this.element.style.position = 'absolute'

  this.addEventListener('removed', function (event) {
    if (this.element.parentNode !== null) {
      this.element.parentNode.removeChild(this.element)
    }
  })
  this.isObject3D = true
}

CSS3DObject.prototype = Object.create(Object3D.prototype)
CSS3DObject.prototype.constructor = CSS3DObject

export default CSS3DObject
