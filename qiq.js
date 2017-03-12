//
// qiq.js
//
// Object based simple reactive architecture
//
//
export class qiq {
  constructor() {
    this._qiqs = new Set()
  }

  in( data ) {
    this.fire( data )
  }

  fire( data ) {
    this._qiqs.forEach( ( qiq ) => qiq.in( data ) )
  }

  link( oqiq ) {
    this._qiqs.add( oqiq )
  }

  unlink( oqiq ) {
    this._qiqs.delete( oqiq )
  }
}
