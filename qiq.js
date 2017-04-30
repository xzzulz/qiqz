//
// qiq.js
//
// Object based simple reactive architecture
//
//
class qiq {
  constructor() {
    this._qiqs = new Set()
    this.in = ( data ) => {
      var ret = this.on( data )
      if ( ret !== undefined ) this.out( data ) }
  }

  on( data ) {
    return true
  }

  out( data ) {
    for ( let qiqx of this._qiqs )
      qiqx.in( data )
  }

  link( oqiq ) {
    this._qiqs.add( oqiq )
  }

  unlink( oqiq ) {
    this._qiqs.delete( oqiq )
  }
}
