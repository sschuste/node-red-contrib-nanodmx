# node-red-contrib-nanodmx

A simple [Node-Red](http://nodered.org) driver for the DMX USB interface by DMX4ALL.

## Pre-requisites

Requires [Node-Red](http://nodered.org)

## Installation

    $ npm i --save node-red-contrib-nanodmx

## Description

* Sends DMX data through the DMX4ALL NanoDMX device
* Adapted, simplified, hacked from the existing [node-dmx package](https://www.npmjs.com/package/dmx) 
* node-red-contrib-nanodmx node takes an array of integers (0-255) as input.
* node-red-contrib-nanodmx requires the serialport node library. Similarly, the serialport needs to be assigned, COM3, COM4, or /dev/ttyS0, etc
* The DMX starting address is assignable in the object. This shifts where the preset array is stored in the Universe buffer.

## How it works

The palette has one input connector and one output connector. It expects an object in msg.payload and outputs to mag.payload.

### Input
The node expects an object with key-value pairs with integer numbers as value. The key is the address of the DMX channel, the value is the value that the channel should take.

For example, if you want to assign a value of 255 to channel 7, then you send this payload: `{"7": 255}`. If you want to address several channels at the same time, expand the object to `{"7": 255, "11": 73, "12": 0}`, for example.

You can address a maximum of 512 channels (0 - 255).

### Output
The output is what you have sent to the input, unless you send an empty object (alternatively also true or false) to the palette. In this case, the current values of the entire universe are returned.
