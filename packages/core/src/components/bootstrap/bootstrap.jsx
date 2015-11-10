
import React from 'react'
import random from 'lodash.random'

import logger from 'utils/logger'
import appDispatcher from 'dispatchers/appDispatcher'
import EVENTS from 'constants/events'
import APP_STATES from 'constants/appStates'
import { wait } from 'utils/timing'

import appState from 'stores/appState'
import resources from 'stores/resources'


/**
 * Handles a loading progress indicator, albeit a fake one at present
 */
class Loading extends React.Component {
  constructor( props ) {
    super( props )
  }

  state = {
    loading: []
  }

  /**
   * Do some fake loading, should probably be done in the Bootstrap component
   */
  async componentDidMount() {
    let count = 5
    let time = 750 / count
    while( count-- ) {
      await wait( time + random( -time * .75, time * .75 ) )

      logger.info( 'Bootstrap event' )

      this.setState({
        state: this.state.loading.push( true )
      })
    }

    // Do some actual loading
    resources.loadTextures()
      .then( this.onComplete )
  }

  onComplete() {
    logger.info( 'Bootstrap complete' )

    // Change app state to the main frame
    appDispatcher.dispatch({
      type: EVENTS.get( 'CHANGE_STATE' ),
      payload: {
        requestedStateID: APP_STATES.get( 'MAIN' )
      }
    })
  }

  render() {
    let progress = 'Loading' + this.state.loading.reduce( prev => {
      return prev + '.'
    }, '' )

    return <span className="BS-loading">{ progress }</span>
  }
}

/**
 * Master component
 * Passes cursors down to children to actually do the work
 */
export default class Bootstrap extends React.Component {
  constructor( props ) {
    super( props )
  }

  componentWillMount() {
    logger.info( 'Bootstrapping...' )
  }

  render() {
    // Throw the load indicator an empty array to fill with dummy events for now
    return (
      <div className="BS u-fit">
        <Loading />
      </div>
    )
  }
}
