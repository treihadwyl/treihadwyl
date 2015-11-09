
import React from 'react'

import APP_STATES from 'constants/appStates'
import Bootstrap from 'bootstrap/bootstrap'
import Main from 'main/main'


/**
 * State factory
 * Creates the various high level application states and default data to accompany them
 * Creating data within each component is preferable (as this.state does), however,
 * to diff between states and use pure render functions everything needs to be passed
 * down as props so components can not create their own data as it must be passed.
 * @class
 */
export default class StateFactory {
    /**
     * @constructs
     * @param appState <String> initial application state id
     */
    constructor( appState ) {
        if ( !appState ) {
            throw new Error( 'StateFactory should be instantiated with an initial state')
        }
        this.appState = appState
    }

    /**
     * Returns a state if it exists by invoking a creation function
     * @param id <String> id's are referenced by string
     * @param opts <Object> options to pass to creation functions
     */
    get( id, opts ) {
        if ( this[ id ] ) {
            return this[ id ]( opts )
        }
    }

    /*-----------------------------------------------------------*
     *
     *  Creation functions
     *  ---
     *  Creates the top-level functions that determine
     *  application state
     *
     *-----------------------------------------------------------*/


    /**
     * The bootstrap state
     * Responsible for loading app resources and setting up the app
     */
    bootstrap( opts ) {
        let key = APP_STATES.get( 'BOOTSTRAP' )

        return <Bootstrap key={ key } state={ key } />
    }

    /**
     * Main
     * Here be dragons!
     */
    main( opts ) {
        let key = APP_STATES.get( 'MAIN' )

        return <Main
            key={ key }
            state={ key }
            canvas={ key }
        />
    }
}
