//
// basement.js test
//
// for tik events
//
//
basement.set("testing qiqz events")



// create 3 qiqz objects
var qiqzAll = new qiqz()

var qiqzOdd = new qiqz()
// customize to allow odd numbers
qiqzOdd.on = function( data ) {
  if ( ( (data+1) % 2 ) == 0 ) {
    return data
  }
}

var qiqzThird = new qiqz()
// customize to allow numbers divisible by 3
qiqzThird.on = function( data ) {
  if ( data % 3 == 0 ) {
    return data
  }
}

var out = []
var qiqzEnd = new qiqz()
// customize to put any in payload in output array
qiqzEnd.on = function( data ) {
  out.push( data )
}

// create a not connected qiqz
var qiqzNul = new qiqz()
// put input in array (to detect possible bugs)
qiqzNul.on = function( data ) {
  out.push( 0 )
}

// conect them in sequence
qiqzAll.link( qiqzOdd )
qiqzOdd.link( qiqzThird )
qiqzThird.link( qiqzEnd )

// test 1
var testBefore = basement.test("3 qiqzs set", "in sequence: Allow only odd numbers -> allow only divisibles by 3 -> put results in output array")
testBefore.check( 'before input', out.length == 0, 'array should be empty' )


// tip the qiqzs
qiqzAll.in( 1 )
qiqzAll.in( 2 )
qiqzAll.in( 3 )
qiqzAll.in( 4 )
qiqzAll.in( 5 )
qiqzAll.in( 6 )
qiqzAll.in( 7 )
qiqzAll.in( 8 )
qiqzAll.in( 9 )
qiqzAll.in( 10 )


// test 2
//
// set a qiqz that allows odd numbers, connected to one that allows only
// divisibles by 3. Then one that puts results in output array. Supply as input
// numbers from 1 to 10. Expected result in the array should be [ 3, 9 ]
// events added but not tiked yet


var testAfter = basement.test("Provide numbers 1-10", "supply to the prepared sequence of qiqzs, as input, integer numbers 1 to 10")
testAfter.check( 'first 3', out[0] == 3, 'first number that passes should be 3' )
testAfter.check( 'second 9', out[1] == 9, 'second number that passes should be 9' )
testAfter.check( 'only 2', out.length == 2, 'no more than these 2 numbers should pass' )



// test 3
// remove the last link, repeat the input
qiqzThird.unlink( qiqzEnd )

// reset output array
out = []

// tip the qiqzs
qiqzAll.in( 1 )
qiqzAll.in( 2 )
qiqzAll.in( 3 )
qiqzAll.in( 4 )
qiqzAll.in( 5 )
qiqzAll.in( 6 )
qiqzAll.in( 7 )
qiqzAll.in( 8 )
qiqzAll.in( 9 )
qiqzAll.in( 10 )

var testUnlink = basement.test("Unlink last qiqz", "provide the same input. The output array should stay the same")
testUnlink.check( 'empty', out.length == 0, 'output array should be empty' )



// test 4
// rearrange qiqzs
// conect them in a different arrangement
qiqzAll.unlink( qiqzOdd )
qiqzOdd.unlink( qiqzThird )

qiqzAll.link( qiqzOdd )
qiqzAll.link( qiqzThird )

qiqzOdd.link( qiqzEnd )
qiqzThird.link( qiqzEnd )

// reset output array
out = []

// tip the qiqzs
qiqzAll.in( 1 )
qiqzAll.in( 2 )
qiqzAll.in( 3 )
qiqzAll.in( 4 )
qiqzAll.in( 5 )
qiqzAll.in( 6 )


var testRearrange = basement.test("Parallel arrangment", "Rearrange qiqzs in parallel. Reset output array. Supply numbers 1 to 10")
testRearrange.check( 'first 1', out[0] == 1, 'first number that passes should be 1' )
testRearrange.check( 'second 3', out[1] == 3, 'second number that passes should be 3' )
testRearrange.check( 'third 3', out[2] == 3, 'the 3 should pass again' )
testRearrange.check( 'four 5', out[3] == 5, 'four number should be 5' )
testRearrange.check( 'then 6', out[4] == 6, 'fith number should be 6' )
testRearrange.check( 'total 5', out.length == 5, 'output array should have 5 numbers' )
