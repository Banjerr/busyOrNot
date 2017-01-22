'use strict'

/**
 * BUSY OR NOT?
 * by Benjamin Redden
 */

const five = require('johnny-five'),
  board = new five.Board();

board.on('ready', function() {
  let myServo = new five.Servo(9),
    potPin = new five.Sensor({
      pin: "A0",
      freq: 250
    }),
    potVal,
    angle = five.Fn.map(potVal, 0, 1023, 0 ,179);

  // get the current reading
  potPin.on('data', function(){
    potVal = this.value;

    myServo.to(angle);
  });
});
