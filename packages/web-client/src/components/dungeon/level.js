
import modules from 'stores/modules'
import resources from 'stores/resources'

class Level {
  static ID = 'Dungeon-Level'

  constructor( stage ) {
    this.stage = stage
    this.data = null
  }

  init( data ) {
    this.data = data
    
  }
}

modules.register( Level )

export default modules.get( Level.ID )
