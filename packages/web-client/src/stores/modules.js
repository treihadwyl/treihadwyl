
/**
 * Module creation factory
 */
class Modules {
  constructor() {
    this.modules = new Map()
  }

  register( Mod ) {
    this.modules.set( Mod.ID, Mod )
  }

  get( id ) {
    if ( !this.modules.has( id ) ) {
      throw new Error( 'Module ' + id + ' not registered' )
    }

    return this.modules.get( id )
  }
}

var modules = new Modules()

export default modules
