"use strict"

// var SerialPort = require("serialport")
const { SerialPort } = require("serialport");


var UNIVERSE_LEN = 512;

function DMX(port, baudrate, databits, stopbits, parity, current_universe) {
	console.log("[info] Initalizing NanoDMX USB interface on " + port + " (" + baudrate + " baud, " + databits + "-" + parity + "-" + stopbits + ")");
	var self = this

	this.universe = current_universe;
	this.dev = new SerialPort({
		path: port,
		baudRate: parseInt(baudrate),
		dataBits: parseInt(databits),
		stopBits: parseInt(stopbits),
		parity: parity
	}, function(err) {
		if(err != null){
			console.log("[warn] NanoDMX driver device error:" + err);
		}
	});
	this.dev.on('error', function(err) {
		console.error("[error] NanoDMX port error: ", err);
	});

	this.dev.on('data', function(data) {
		console.log("[info] NanoDMX received data: ", data);
	});
}

DMX.prototype.send_universe = function() {
	const msg = Buffer.alloc(UNIVERSE_LEN * 3);

	for (let i = 0; i < UNIVERSE_LEN; i++) {
		msg[i * 3 + 0] = (i < 256) ? 0xE2 : 0xE3;
		msg[i * 3 + 1] = i;
		msg[i * 3 + 2] = this.universe[i + 1];
	}
	this.dev.write(msg, (err) => {
		if (err) {
			console.error("[error] Failed to send DMX datai to NanoDMX: ", err);
		} else {
			console.log("[info] DMX data sent successfullyi to NanoDMX.");
		}
	});
}

DMX.prototype.close = function(cb) {
	console.log("[info] Trying to close NanoDMX device... ");
	this.dev.close((err) => {
		if (err) {
			console.error("[error] Error closing NanoDMX device: ", err);
		} else {
			console.log("[info] NanoDMX device closed successfully.");
		}
		if (cb) {
			cb(err);
		}
	});
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
