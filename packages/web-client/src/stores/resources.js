
import path from 'path'

import Preloader from 'preload.io'
import PixiLoader from 'preload.io-pixi'


class Resources {
  constructor() {
    this.preloader = new Preloader()
    this.preloader.register( new PixiLoader() )

    this.textures = new Map()
  }

  loadAtlases() {
    return new Promise( ( resolve, reject ) => {
      let toLoad = [ 'chara.json', 'greywall.json' ]
      toLoad.forEach( resource => {
        this.preloader.load({
          id: resource,
          resource: path.join( '/assets', resource ),
          loader: 'pixiLoader'
        })
      })

      var onLoad = function( resource ) {
        // Pixi loader will return an object of textures from the sheet
        var textures = resource.res.textures
        Object.keys( textures ).forEach( textureID => {
          this.textures.set( textureID.replace( /\.png$/, '' ), textures[ textureID ] )
        })
      }.bind( this )

      var onComplete = function( resources ) {
        this.preloader.off( 'load', onLoad )
        return resolve( resources )
      }.bind( this )

      this.preloader.on( 'load', onLoad )
      this.preloader.once( 'preload:complete', onComplete )
    })
  }

  loadTextures() {
    return new Promise( ( resolve, reject ) => {

      let toLoad = [ 'circle4.png' ]
      toLoad.forEach( url => {
        this.preloader.load({
          id: url,
          resource: path.join( '/assets', url )
        })
      })

      this.preloader.on( 'load', resource => this.textures.set( resource.id, resource.texture ) )
      this.preloader.on( 'preload:complete', resources => resolve( resources ) )
    })
  }

  getTexture( id ) {
    return this.textures.get( id )
  }

}

export default new Resources()
