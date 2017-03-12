//
// basement.js test
//
// for tik events
//
// todo: add more tests
basement.set("testing qiq events")



// create 3 qiq objects
var qiqAll = new qiq()

var qiqOdd = new qiq()
// customize to allow odd numbers
qiqOdd.in = function( data ) {
  if ( ( (data+1) % 2 ) == 0 ) {
    this.fire( data )
  }
}

var qiqThird = new qiq()
// customize to allow numbers divisible by 3
qiqThird.in = function( data ) {
  if ( data % 3 == 0 ) {
    this.fire( data )
  }
}

var out = []
var qiqEnd = new qiq()
// customize to put any in payload in output array
qiqEnd.in = function( data ) {
  out.push( data )
}

// create a not connected qiq
var qiqNul = new qiq()
// put input in array (to detect possible bugs)
qiqNul.in = function( data ) {
  out.push( 0 )
}

// conect them in sequence
qiqAll.link( qiqOdd )
qiqOdd.link( qiqThird )
qiqThird.link( qiqEnd )

// test 1
var testBefore = basement.test("3 Qiqs set", "in sequence: Allow only odd numbers -> allow only divisibles by 3 -> put results in output array")
testBefore.check( 'before input', out.length == 0, 'array should be empty' )


// tip the qiqs
qiqAll.in( 1 )
qiqAll.in( 2 )
qiqAll.in( 3 )
qiqAll.in( 4 )
qiqAll.in( 5 )
qiqAll.in( 6 )
qiqAll.in( 7 )
qiqAll.in( 8 )
qiqAll.in( 9 )
qiqAll.in( 10 )


// test 2
//
// set a qiq that allows odd numbers, connected to one that allows only
// divisibles by 3. Then one that puts results in output array. Supply as input
// numbers from 1 to 10. Expected result in the array should be [ 3, 9 ]
// events added but not tiked yet


var testAfter = basement.test("Provide numbers 1-10", "supply to the prepared sequence of qiqs, as input, integer numbers 1 to 10")
testAfter.check( 'first 3', out[0] == 3, 'first number that passes should be 3' )
testAfter.check( 'second 9', out[1] == 9, 'second number that passes should be 9' )
testAfter.check( 'only 2', out.length == 2, 'no more than these 2 numbers should pass' )
