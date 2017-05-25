//
//
//
// qiqz
//
//
//
// Object based simple reactive architecture.
//
// Make a network of qiqz intances, configure "trigger" conditions.
// Provide inputs to get interesting dataflow.
// It can also be used for asynchronous programming.
//
// qiqz are objects that take any input data, and evaluate it. If the
// user defined condition is satisfised, the qiqz "fires". Which mean
// that it remembers the data, and passes it to all output linked qiqz.
//
// qiqz can be arranged in networks, and configured with special
// conditions, to get all kinds of interesting dataflows.
//
// Example network of connections: each o is a qiqz instance.
//        o -> o -> o
//         \-> o
//
//
//
class qiqz {
  constructor() {

    // List of output connections, qiqz objects.
    // Stored as a set to avoid repetitions.
    this._qiqzs = new Set()

    // The "in" method is the method called to pass input data to the
    // qiqz object. If the conditions are meet, the qiqz objects
    // fires the data as output. Passing it to all its output
    // connected qiqz.
    //
    // This method is defined directly on the instance, and not
    // on the prototype. This allows to use an arrow function, so that the
    // this keeps pointing to the qiqz instance, even if it is called from
    // a differen qiqz instance, or some other external object.
    //
    this.in = ( data ) => {
      // if there is some output, the qiqz "fires" and send that output
      // to other connected qiqz. It also remembers its.
      var output = this.on( data )
      if ( output !== undefined ) {
        // remember the data that satisfies the qiqz test
        this.data = data
        // output the data
        this._out( data )
      } else {
        // condition not meet. Drop any previous data.
        this.data = null
      }
    }

    this.data = null
  }

  // test input data.
  // This is the method that evaluates the input data.
  // If this method returns something, the qiqz fires that as output.
  // If this method returns nothing, the qiqz instance does nothing.
  // This method is intended to be redefined by the user, to make
  // the qiqz intance only fire as desired.
  // For example, a qiqz that only fires when it gets even numbers, etc.
  // @parameter data can be anything
  on( data ) {
    return true
  }

  // Output the data.
  // When the qiqz fires, this method passes the input data to all
  // connected qiqz intances.
  // This is a private method.
  _out( data ) {
    for ( let qiqzx of this._qiqzs )
      qiqzx.in( data )
  }

  // link method is to be used by users, to connect this qiqz output to
  // other qiqz instance objects.
  // This instance is the source. The parameter is the receiver.
  // Dataflow is as follows, between the two qiqz objects involved:
  //           (this) -> (toQiq)
  // From this instance, to the provider parameter instance.
  link( toQiq ) {
    // it simply adds the provided qiqz instance object, to the set
    // of output connections
    this._qiqzs.add( toQiq )
  }

  // Use to simply disconnect a previously connected qiqz.
  unlink( toQiq ) {
    // removes the linked object from the set.
    this._qiqzs.delete( toQiq )
  }

}
