![basement.js](http://lignixz.github.io/qiqz/img/qiqz.png)

# qiq.js
v0.2

## Object based, reactive architecture in javascript.

qiqz is a simple, minimal, easy to use reactive architecture in javascript.

qiqz instances are objects that represent events. They can be interconnected
like nodes in a graph. Each qiqz instance object have inputs and outputs
connections, to other qiqz instances.

When a qiqz takes some input data, it evaluates it. If its conditions are
meet, it fires, passing the data to all qiqz connected to its output.

qiqz objects take input with the ```qiqz.in( data )```
method. If configured conditions are satisfied, the qiqz object fires.
The condition is configured by overwriting its ```on``` method.
The ```on``` methods evaluates the input, and if it returns anything,
the qiqz "fires" passing the data as its output, to all linked inputs
from other qiqz instances.

When a qiqz fires, it triggers connected qiqz objects, passing data
to them. Each connected qiqz object has its ```in``` method called, with the
data. Data flow is unidirectional. qiqz outs are connected to qiqz ins.

The qiqz arquitecture was designed for use in the [xoL](http://lignixz.github.com/xoL/)
programming language. It can be used for reactive, dataflow programming,
asynchronous programming.

## Usage

### Create qiqz objects
A qiqz object represents a single event. Create a qiqz object:

```javascript
// create a qiqz object
var qiqz1 = new qiqz()
```

### Customize
 Customize the  by modifying the "on" method. The "on" method supplies
 qiqz objects with input. That input may or may not trigger the qiqz.
 If the custom "on" method, returns something, the qiqz will "fire",
 and will send that returned value to all linked qiqzs. To trigger qiqzs
 without passing any data, simply return true.
```javascript
// This qiqz will fire if data > 3
qiqz1.on = function( data ) {
  if ( data > 3 ) return data
}
```

### Connect
Connect a qiqz out to another qiqz in. If the first qiqz fires, it calls the on
of the second. The second then may also fire. Flow may continue to other
connected qiqzs.
```javascript
// Connects qiqzs in this direction: qiqz1 -> qiqz2
// when qiqz1 fires, it calls qiqz2 "on" method. Which may or may not make
// qiqz2 to fire.
qiqz1.link( qiqz2 )

// remove the previous connection
qiqz1.unlink( qiqz2 )
```

### Pass input data
Use the ```in``` method to pass data to a qiqz instance
```javascript
qiqz1.in( 4 )
```
If the "on" condition is satisfied, the data qiqz will outputthis data to
other connected receiving qiqz (if any).

## Read remembered data
If the qiqz object was triggered with the last data, it remembers it.
The data can be read as follows:
```javascript
qiqz1.data == 4        // will evaluate to true
```
If the qiqz was not triggered by the data, then ```data``` property will
be set to null.


## tests
Basement tests: [qiqz tests](http://lignixz.github.com/qiqz/test/)
To run tests, put whole project folder in a web server, then open
`test/index.html` file. The tests will run in browser.

## license
MIT license.
