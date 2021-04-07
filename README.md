# node-red-contrib-nanodmx

A simple [Node-Red](http://nodered.org) driver for the NanoDMX USB interface by DMX4ALL.

## Pre-requisites

Requires [Node-Red](http://nodered.org)

## Installation

    $ npm i --save node-red-contrib-nanodmx

## Description

* Sends DMX data through the DMX4ALL NanoDMX device
* Adapted, simplified, hacked from the existing [node-dmx package](https://www.npmjs.com/package/dmx) 
* requires node-serialport module
* node-red-contrib-nanodmx node takes an array of ints (0-255) as input.
* node-red-contrib-nanodmx requires the serialport node library. Similarly, the serialport needs to be assigned, COM3, COM4, or /dev/ttyS0, etc
* The DMX starting address is assignable in the object. This shifts where the preset array is stored in the Universe buffer.
* Checkout the example Flow called "DMX Presets with MongoDB2 and DMXUSBPRO node"
