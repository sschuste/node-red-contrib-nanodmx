"use strict"

var SerialPort = require("serialport")

var UNIVERSE_LEN = 512;

function DMX(device_id, current_universe) {
	console.log("initalizing NanoDMX USB interface...");
	var self = this
	this.universe = current_universe;

	this.dev = new SerialPort(device_id, {
		'baudRate': 38400,
		'databits': 8,
		'stopbits': 1,
		'parity': 'none'
	}, function(err) {
		if(err != null){
			console.log("NanoDMX driver device error:" + err);
		}
	});
}

DMX.prototype.send_universe = function() {
	const msg = Buffer.alloc(UNIVERSE_LEN * 3);

	for (let i = 0; i < UNIVERSE_LEN; i++) {
		msg[i * 3 + 0] = (i < 256) ? 0xE2 : 0xE3;
		msg[i * 3 + 1] = i;
		msg[i * 3 + 2] = this.universe[i + 1];
	}
	this.dev.write(msg)
}

DMX.prototype.close = function(cb) {
	console.log("closing NanoDMX device... " + cb);
	this.dev.close(cb)
}

DMX.prototype.update = function(u, offset) {
	for(var c in u) {
		this.universe[c] = u[c];
	}
	this.send_universe()
}

DMX.prototype.updateAll = function(v) {
	for(var i = 1; i <= 512; i++) {
		this.universe[i] = v
	}
	this.send_universe()
}

DMX.prototype.universeToObject = function() {
	var u = {}
	for(var i = 1; i <= this.universe.length; i++) {
		u[i] = this.get(i)
	}
	return u
}

DMX.prototype.get = function(c) {
	return this.universe[c]
}

module.exports = DMX
