
import { createAction, handleActions } from 'redux-actions'
import { Quaternion, Vector3 } from 'three'
import { REACT_TO_WHEEL } from '../../application'

export const SCALE_UP = 'SCALE_UP'
export const ROTATE = 'ROTATE'

export const scaleUp = createAction(SCALE_UP)
export const rotate = createAction(ROTATE)

const defaultState = {
  rotation: new Quaternion(),
  radius: 1800,
  widthSegments: 32,
  heightSegments: 32,
  blogposts: blogposts()
}

function blogposts () {
  const result = []
  result.push('<iframe width="400px" height="320px" src="https://www.youtube.com/embed/gx6TBrfCW54" frameborder="0" allow="autoplay; encrypted-media"></iframe>')
  for (let i = 0; i < 50; i++) {
    const artefact = `<div style="overflow:scroll; opacity:0.3; width:400px; height:320px;background-color:white; color:black; font-size:xx-large">People read books to learn, to answer questions, to enjoy a good story, and to improve themselves. And perhaps no book provides these benefits as well as does the best-selling book in the world, the Holy Bible.

    Even when read as a work of literature rather than scripture, the Bible’s theme is clear: God, our Heavenly Father, has a presence and purpose on this earth. From the story of the Creation in Genesis to the miracles performed by Jesus Christ recorded in the New Testament, the Bible gives evidence of God’s interest in His children. Countless people throughout the Bible have been witness to God’s majesty and miracles. Following the teachings found in this record of divine interventions enables us to know God, learn from the lives of His followers, and better understand His will.
    
    Order your copy of this sacred scripture as a free gift from The Church of Jesus Christ of Latter-day Saints. Simply fill out the form above and missionaries will contact you to deliver a copy to your home. A limit of one book per household, please.</div>`
    result.push(`${artefact}`)
  }
  result.push('<iframe width="400px" height="320px" src="https://www.youtube.com/embed/GULItNlBvJc" frameborder="0" allow="autoplay; encrypted-media"></iframe>')
  for (let i = 50; i < 300; i++) {
    const artefact = `<div style="overflow:scroll;opacity:0.3;width:400px; height:320px;background-color:white; color:black; font-size:xx-large">People read books to learn, to answer questions, to enjoy a good story, and to improve themselves. And perhaps no book provides these benefits as well as does the best-selling book in the world, the Holy Bible.

    Even when read as a work of literature rather than scripture, the Bible’s theme is clear: God, our Heavenly Father, has a presence and purpose on this earth. From the story of the Creation in Genesis to the miracles performed by Jesus Christ recorded in the New Testament, the Bible gives evidence of God’s interest in His children. Countless people throughout the Bible have been witness to God’s majesty and miracles. Following the teachings found in this record of divine interventions enables us to know God, learn from the lives of His followers, and better understand His will.
    
    Order your copy of this sacred scripture as a free gift from The Church of Jesus Christ of Latter-day Saints. Simply fill out the form above and missionaries will contact you to deliver a copy to your home. A limit of one book per household, please.</div>`
    result.push(`${artefact}`)
  }
  return result
}

export default handleActions({
  SCALE_UP: (state, action) => state,
  ROTATE: (state, action) => {
    const rotation = state.rotation.clone()
    rotation.multiply(new Quaternion().setFromAxisAngle(new Vector3(1, 0, 0), action.payload))
    return {
      ...state,
      rotation
    }
  }
}, defaultState)

export const rollEpic = action$ => action$.ofType(REACT_TO_WHEEL)
  .map(action => rotate(action.payload.deltaY > 0 ? 5 * Math.PI / 180 : -5 * Math.PI / 180))
