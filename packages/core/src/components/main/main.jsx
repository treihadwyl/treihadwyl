
import React from 'react'

import resources from 'stores/resources'
import config from 'stores/config'


/**
 * @class
 * Main class holds the main game state
 */
export default class Main extends React.Component {
  static propTypes = {

  }

  static defaultProps = {

  }

  constructor( props ) {
    super( props )
  }

  componentWillMount() {

  }

  componentDidMount() {

  }

  render() {
    return (
      <div ref="main" className="js-main u-fit">
        <h1>Main State</h1>
      </div>
    )
  }
}
