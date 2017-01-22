# busyOrNot?

Another Arduino exercise that I've re-factored to use Node js with the Johnny-Five library. I think I might use this as the basis for a "bed time traffic light" for my daughter; with the addition of some photo-resistors to check how much light is coming in.

![pic!](https://github.com/Banjerr/busyOrNot/blob/master/busyOrNot.gif)

## original C/C++ Arduino code

```c
/**
 * BUSY OR NOT?
 * by Benjamin Redden
 */

#include <Servo.h>
Servo myServo;

int const potPin = A0;
int potVal;
int angle;

void setup() {
  myServo.attach(9);

  Serial.begin(9600);
}

void loop() {
  potVal = analogRead(potPin);
  Serial.print("potVal: ");
  Serial.print(potVal);

  angle = map(potVal, 0, 1023, 0, 179);
  Serial.print(", angle: ");
  Serial.print(angle);

  myServo.write(angle);
  delay(15);
}
```

## refactored, Node JS (Johnny-Five) code

```javascript
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
```
