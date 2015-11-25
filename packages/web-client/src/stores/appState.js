
import React from 'react'
import ReactDOM from 'react-dom'
import toMap from 'to-map'

import logger from 'utils/logger'
import appDispatcher from 'dispatchers/appDispatcher'
import { StateError } from 'constants/err'
import EVENTS from 'constants/events'
import APP_STATES from 'constants/appStates'

import StateFactory from 'stores/stateFactory'

const _state = Symbol( 'state' )


/**
 * Holds the centralised immutable state of the application
 * @class
 */
class AppState {
  /**
   * @constructs
   */
  constructor() {
    this.el = null

    /**
     * Holds the current state of the application
     * Initially configured to the bootstrap state
     */
    this[ _state ] = APP_STATES.get( 'BOOTSTRAP' )

    /**
     * The state factory used to create states
     */
    this.factory = new StateFactory( this[ _state ] )

    /**
     * Set up app dispatch listener
     */
    appDispatcher.register( dispatch => {
      // Convert to get function to execute on dispatch
      if ( dispatch.type === EVENTS.get( 'CHANGE_STATE' ) ) {
        if ( !this.factory[ dispatch.payload.requestedStateID ] ) {
          throw new StateError( 'Application state not recognised: ' + dispatch.payload.requestedStateID )
        }

        this.setState( dispatch.payload.requestedStateID )
      }
    })
  }

  /**
   * Returns state for stores to allow mutation
   * @TODO should this be clamped to only privileged classes?
   */
  getState() {
    return this[ _state ]
  }

  /**
   * Sets the state and triggers a refresh
   */
  setState( state ) {
    this[ _state ] = state
    this.render()
  }

  /**
   * Top level render function
   */
  render() {
    ReactDOM.render( this.factory.get( this.getState() ), this.el )
  }

  /**
   * Sets up the render listener and starts things off
   * Akin to App.run in other frameworks
   * @param el <DOMElement> element to render into
   */
  run( el ) {
    this.el = el || document.querySelector( '.js-app' )

    // Initial render
    this.render()
  }
}

export default new AppState()
