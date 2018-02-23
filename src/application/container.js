import React from 'react'
import Canvas from '../canvas/component'
import { connect } from 'react-redux'
import { toggleControl, reactToKey, reactToMouse, reactToWheel, signIn } from './index'
import PropTypes from 'react-proptypes'
import firebase from 'firebase'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'

class App extends React.Component {
  constructor (props) {
    super(props)
    firebase.initializeApp({
      apiKey: 'AIzaSyBUfHvTpf6XuqVMCNLTqXbmjJTBJ-4g2qQ',
      authDomain: 'bernard-fac52.firebaseapp.com',
      databaseURL: 'https://bernard-fac52.firebaseio.com',
      projectId: 'bernard-fac52',
      storageBucket: 'bernard-fac52.appspot.com',
      messagingSenderId: '47682735218'
    })
    this.uiConfig = {
      tosUrl: '',
      signInFlow: 'popup',
      // We will display Google and Facebook as auth providers.
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID
      ],
      callbacks: {
        // Avoid redirects after sign-in.
        signInSuccess: () => false
      }
    }
  }
  componentDidMount () {
    firebase.auth().onAuthStateChanged(user => this.props.signIn(!!user))
  }
  onKeyPress = (event, props) => {
    if (props.controlActive) {
      props.reactToKey(event.key)
    }
  }
  onMouseMove = (event, props) => {
    if (props.controlActive) {
      props.reactToMouse(event)
    }
    event.stopPropagation()
    event.preventDefault()
  }
  onMouseWheel = (event, props) => {
    if (props.controlActive) {
      props.reactToWheel(event)
    }
    event.stopPropagation()
    event.preventDefault()
  }

  render () {
    if (!this.props.signedIn) {
      return <div backgroundColor='black'>
        <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()} />
      </div>
    } else {
      return <div onClick={this.props.toggleControl}
        onKeyPress={event => this.onKeyPress(event, this.props)}
        onMouseMove={event => this.onMouseMove(event, this.props)}
        onWheel={event => this.onMouseWheel(event, this.props)}
        tabIndex='0'>
        <Canvas store={this.props.store} />
      </div>
    }
  }
}

const mapStateToProps = (state) => ({
  controlActive: state.camera.controlActive,
  signedIn: state.app.signedIn
})

const mapDispatchToProps = {
  toggleControl,
  reactToKey,
  reactToMouse,
  reactToWheel,
  signIn
}

App.propTypes = {
  toggleControl: PropTypes.func,
  store: PropTypes.object,
  signedIn: PropTypes.bool,
  signIn: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
