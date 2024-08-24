# node-red-contrib-nanodmx

A simple [Node-Red](http://nodered.org) driver for the NanoDMX USB interface by DMX4ALL.

## Pre-requisites

Requires [Node-Red](http://nodered.org)

## Installation

    $ npm i node-red-contrib-nanodmx

## Description

* Sends DMX data through the DMX4ALL NanoDMX device.
* Adapted, simplified, hacked from the existing [node-dmx package](https://www.npmjs.com/package/dmx).
* Requires the serialport nodejs library. Similarly, the serialport needs to be assigned, COM3, COM4, or /dev/ttyS0, etc.

## How it works
The node has one input connector and one output connector. It expects an object in msg.payload and outputs an object to msg.payload.

### Input
The node expects an object with key-value pairs with integer numbers as value. The key is the address of the DMX channel, the value is the value that the channel should take.

For example, if you want to assign a value of 255 to channel 7, then you send this payload: `{"7": 255}`. If you want to address multiple channels at the same time, expand the object to `{"7": 255, "11": 73, "12": 0}`, for example. This would send value 255 to channel 7, value 73 to channel 11 and value 0 to channel 12. The channels do not have to be in the exact order, they can be mixed up, but it is recommended for the sake of clarity. So `{"7": 255, "11": 73, "12": 0}` generates the same as `{"11": 73, "12": 0, "7": 255}`.

You can address up to 512 channels (1 - 512), but it is not necessary to address all of them each time. It is sufficient if you only address those channels that you want to change. For example, if you address three channels, all the others will retain their current value.

### Output
The output is what you have sent to the input, unless you send an empty object or an empty string to the node. In this case, the current values of all 512 channels are returned.

## Hints
The user running Node Red must have read and write access to the serial interface. Under Linux, it is generally sufficient to add this user to the dialout group.
