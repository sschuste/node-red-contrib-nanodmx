# node-red-contrib-nanodmx

A simple [Node-Red](http://nodered.org) driver for the DMX USB interface by DMX4ALL.

## Pre-requisites

Requires [Node-Red](http://nodered.org)

## Installation

    $ npm i --save node-red-contrib-dmx4all

## Description

* Sends DMX data through the DMX4ALL NanoDMX device
* Adapted, simplified, hacked from the existing [node-dmx package](https://www.npmjs.com/package/dmx) 
* requires node-serialport module
* node-red-contrib-dmx4all node takes an array of ints (0-255) as input.
* node-red-contrib-dmx4all requires the serialport node library. Similarly, the serialport needs to be assigned, COM3, COM4, or /dev/ttyS0, etc
* The DMX starting address is assignable in the object. This shifts where the preset array is stored in the Universe buffer.

## Thanks
Thanks to blechdom 
