![basement.js](http://lignixz.github.io/qiq.js/img/qiq2.svg)

# qiq.js
v0.1

## Object based, reactive architecture in javascript.

qiq objects represent events. They take input with the ```qiq.in( data )```
method. If custom conditions are satisfied, the qiq object fires.

When a qiq fires, it triggers connected qiq objects, optionally passing data
to them. Each connected qiq object has its ```in``` method called, with the
data. Data flow is unidirectional. qiq outs are connected to qiq ins.

The qiq arquitecture was designed for use in the [xoL](http://lignixz.github.com/xoL/) programming language.
It can be used for reactive, dataflow programming.

## Usage

### Create qiq objects
A qiq object represents a single event. Create a qiq object:

```javascript
// create a qiq object
var qiq1 = new qiq()
```

### Customize
 Customize the  by modifying the "in" method. The "in" method supplies
 qiq objects with input. That input may or may not trigger the qiq.
 In a custom "in" method, call ```this.fire()``` to trigger the fire
 event.
```javascript
// This qiq will fire if data > 3
qiq1.in = function( data ) {
  if ( data > 3 ) this.fire( data )
}
```

### Connect
Connect a qiq out to another qiq in. If the first qiq fires, it calls the in
of the second. The second then may also fire. Flow may continue to other
connected qiqs.
```javascript
// Connects qiqs in this direction: qiq1 -> qiq2
// when qiq1 fires, it calls qiq2 in method. Which may or may not make
// qiq2 to fire.
qiq1.link( qiq2 )

// remove the previous connection
qiq1.unlink( qiq2 )
```

## tests
Basement tests: [qiq tests](http://lignixz.github.com/qiq.js/)

MIT license.
