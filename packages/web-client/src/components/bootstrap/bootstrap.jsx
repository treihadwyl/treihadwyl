
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

  render() {
    let progress = 'Loading'
    for( let i = 0; i < this.props.progress; i++ ) {
      progress += '.'
    }

    return <span className="BS-loading">{ progress }</span>
  }
}

/**
 * Bootstrap component
 * Handles loading and updating the UI to show progress
 * @stateful
 */
export default class Bootstrap extends React.Component {
  /**
   * @constructs
   */
  constructor( props ) {
    super( props )

    this.count = 5
  }

  state = {
    loading: []
  }

  componentWillMount() {
    logger.info( 'Bootstrapping...' )
  }

  componentDidMount() {
    this.load()
  }

  componentWillUnmount() {
    logger.info( 'Bootstrap complete' )
  }

  /**
   * Currently loads the only texture and fires through a fake load
   */
  async load() {
    let time = 750 / this.count
    while ( this.count-- ) {
      await wait( time + random( -time * .75, time * .75 ) )

      logger.info( 'Bootstrap event' )

      this.setState( state => {
        loading: state.loading.push( true )
      })
    }

    // Do some real loading
    resources.loadAtlases()
      .then( this.onComplete )
  }

  /**
   * Triggers a state change when the load completes
   */
  onComplete = () => {
    // Trigger to update change of state
    appDispatcher.dispatch({
      type: EVENTS.get( 'CHANGE_STATE' ),
      payload: {
        requestedStateID: APP_STATES.get( 'MAIN' )
      }
    })
  }

  render() {
    // Throw the load indicator an empty array to fill with dummy events for now
    return (
      <div className="BS u-fit">
        <Loading progress={ this.state.loading.length } total={ this.count }/>
      </div>
    )
  }
}
