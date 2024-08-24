module.exports = function(RED) {
    "use strict";
    const DMX = require('./nanodmx_driver.js');

    function DMXout(config) {
        RED.nodes.createNode(this, config);
        var node = this;

        this.configNode = RED.nodes.getNode(config.config);
        if (this.configNode) {
            this.port = this.configNode.port;
            this.dmxOffset = this.configNode.dmxStartingAddress;
            this.baudrate = this.configNode.baudrate;
            this.DmxUsbDevice = this.configNode.DmxUsbDevice;
        } else {
            this.error("No configuration node found");
            return;
        }

        var currentUniverse = [];

        node.on('input', function(msg) {
            var input = Object.keys(msg.payload).length;
            if (input) {
                currentUniverse = msg.payload;
                node.DmxUsbDevice.update(currentUniverse, node.dmxOffset);
            } else {
                msg.payload = node.DmxUsbDevice.universeToObject();
            }
            node.send(msg);
        });

        this.on('close', function(done) {
            // Nothing to do here, as the port is managed by the config node
            done();
        });
    }
    RED.nodes.registerType("nanodmx", DMXout);

    function DMXConfigNode(n) {
        RED.nodes.createNode(this, n);
        this.port = n.port;
        this.dmxStartingAddress = n.dmxStartingAddress;
        this.baudrate = n.baudrate;
        this.databits = 8;
        this.stopbits = 1;
        this.parity = "none";

        if (!this.DmxUsbDevice) {
            var currentUniverseBuffer = Buffer.alloc(512);
            this.DmxUsbDevice = new DMX(this.port, this.baudrate, this.databits, this.stopbits, this.parity, currentUniverseBuffer);
        }

        this.on('close', function(done) {
            if (this.DmxUsbDevice) {
                this.DmxUsbDevice.close(function(err) {
                    console.log('[info] DMX4ALL NanoDMX USB device closed', err);
                    done();
                });
            } else {
                done();
            }
        });
    }
    RED.nodes.registerType("nanodmx-config", DMXConfigNode);
}
