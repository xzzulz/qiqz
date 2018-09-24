![qiqz](http://xzzulz.github.io/qiqz/img/qiqz.svg)

# qiqz
v0.3

## Object based, reactive architecture in javascript.

qiqz is a simple, minimal, easy to use reactive architecture in javascript.

qiqz instances are objects that represent events. They can be interconnected
like nodes in a graph. Each qiqz instance object have inputs and outputs
connections, to other qiqz instances.

When a qiqz takes some input data, it evaluates it. If its conditions are
meet, it fires, then passing its output to all qiqz linked downward.

qiqz objects take input with the ```qiqz.in( data )```
method. If configured conditions are satisfied, the qiqz object fires.
The condition is configured by overwriting its ```on``` method.
The ```on``` methods evaluates the input, and if it returns anything,
the qiqz "fires" passing that output to all linked qiqz inputs.

When a qiqz fires, it triggers linked qiqz objects, passing data
to them. Each connected qiqz object has its ```in``` method called, with the
data as parameter. Data flow is unidirectional. qiqz outs are linked
to qiqz ins.

The qiqz arquitecture was designed for use in the [xoL](http://xzzulz.github.com/xoL/)
programming language. It can be used for reactive, dataflow programming,
asynchronous programming, events, etc.

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
 and will send that returned value to all linked qiqzs.
```javascript
// This qiqz will fire if data > 3
qiqz1.on = ( data ) => {
  if ( data > 3 ) return data
}
```

### Connect
Connect a qiqz out to another qiqz in. If the first qiqz fires, it calls
the ```on``` of the second. The second then may also fire. Flow may continue to
other connected qiqzs.
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
If the "on" condition is satisfied, the qiqz will output data to
other connected receiving qiqz (if any). The qiqz will also store
the data in the ```.data``` property.


### Read data
If the qiqz object was triggered with the last data, it remembers it.
If the qiqz is triggered, the data is stored. If not triggered, data
becomes null.

The data can be read as follows:
```javascript
qiqz1.data == 4        // will evaluate to true
```
When the qiqz is not triggered by an input, the ```data``` property will
be set to null.


## Summary

### new qiqz()
Use new to create qiqz instances
```javascript
// create a qiqz object
var qiqz_A = new qiqz()
```

### qiqz_A.on = function........
.on property is the function that evaluates inputs.
Return something to trigger.
```javascript
// This qiqz will fire if data > 3
qiqz_A.on = ( data ) => {
  if ( data > 3 ) return data
}
```

### qiqz_A.link( qiqz_B )
Link output to input, if required
```javascript
qiqz_A.link( qiqz_B )
```

### qiqz_A.unlink( qiqz_B )
Remove links
```javascript
qiqz_A.unlink( qiqz_B )
```

### qiqz_A.in( some_data )
Pass data as input
```javascript
qiqzA.in( some_data )
```
### dataflow
If the data triggers the qiqz object, it then passes its output to
other linked qiqz downward.

### qiqz_A.data
Read the data property. Will be ```null``` if the qiqz was not triggered.
```javascript
get_data = qiqzA.data
```

## tests
Basement tests: [qiqz tests](http://xzzulz.github.com/qiqz/test/)
To run tests, put whole project folder in a web server, then open
`test/index.html` file. The tests will run in browser.

## license
MIT license.
