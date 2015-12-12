
import React from 'react'
import Pixi from 'pixi.js'
import Quay from 'quay'
import Tick from '@mattstyles/tick'

import resources from 'stores/resources'
import config from 'stores/config'
import modules from 'stores/modules'

import canvas from 'core/canvas'
import renderer from 'core/renderer'
import Stats from 'core/stats'

import Level from 'dungeon/level'

/**
 * @class
 * Main class holds the main game state
 */
export default class Main extends React.Component {
  static propTypes = {
    canvas: React.PropTypes.string
  }

  static defaultProps = {
    canvas: 'js-main'
  }

  constructor( props ) {
    super( props )

    this.stats = null
    this.renderer = null
    this.renderTick = null
    this.quay = null
    this.stage = null
  }

  componentWillMount() {
    this.stats = new Stats([ 0, 2 ])
  }

  componentDidMount() {
    // Set up the canvas & renderer
    let id = this.props.canvas
    canvas.create( id, this.refs.main )
    renderer.create( id, canvas.get( id ) )
    this.renderer = renderer.get( id )

    this.quay = new Quay()

    this.stage = new Pixi.Container()
    this.level = new modules.get( Level.ID )

    // Set up the render tick
    this.renderTick = new Tick()
      // .on( 'data', this.onUpdate )
      .on( 'data', this.onRender )


    window.pause = () => {
      this.renderTick.pause()
    }
    window.resume = () => {
      this.renderTick.resume()
    }
  }

  onUpdate = dt => {

  }

  onRender = dt => {
    this.stats.begin()

    this.renderer.render( this.stage )

    this.stats.end()
  }

  render() {
    return (
      <div ref="main" className="js-main u-fit">
        <h1>Main State</h1>
      </div>
    )
  }
}
