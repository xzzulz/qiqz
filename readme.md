![basement.js](http://lignixz.github.io/qiq.js/img/qiq2.png)

# qiq.js
v0.2

## Object based, reactive architecture in javascript.

qiq objects represent events. They take input with the ```qiq.on( data )```
method. If custom conditions are satisfied, the qiq object fires.

When a qiq fires, it triggers connected qiq objects, passing data (if provided)
to them. Each connected qiq object has its ```on``` method called, with the
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
 Customize the  by modifying the "on" method. The "on" method supplies
 qiq objects with input. That input may or may not trigger the qiq.
 If the custom "on" method, returns something, the qiq will "fire",
 and will send that returned value to all linked qiqs. To trigger qiqs
 without passing any data, simply return true.
```javascript
// This qiq will fire if data > 3
qiq1.on = function( data ) {
  if ( data > 3 ) return data
}
```

### Connect
Connect a qiq out to another qiq in. If the first qiq fires, it calls the on
of the second. The second then may also fire. Flow may continue to other
connected qiqs.
```javascript
// Connects qiqs in this direction: qiq1 -> qiq2
// when qiq1 fires, it calls qiq2 "on" method. Which may or may not make
// qiq2 to fire.
qiq1.link( qiq2 )

// remove the previous connection
qiq1.unlink( qiq2 )
```

## tests
Basement tests: [qiq tests](http://lignixz.github.com/qiq.js/test/)
To run tests, put whole project folder in a web server, then open
`test/index.html` file. The tests will run in browser.

## license
MIT license.
