
import toMap from 'to-map'

/**
 * Immutable map of application states
 * These map directly to the constructor functions within stores/stateFactory
 */
const APP_STATES = toMap({
    BOOTSTRAP: 'bootstrap',
    MAIN: 'main'
})


export default APP_STATES
