module.exports = function(RED) {
        "use strict";
        var DMX = require('./dmx4all_driver.js');
        function DMXout(options) {
                RED.nodes.createNode(this,options);
                // console.log("this in DMXout: " + JSON.stringify(this));
                var node        = this;
                this.port       = options.port || "COM3";
                this.dmxOffset  = options.dmxStartingAddress || 1;

                var current_universe_buffer = new Buffer(512);

                var current_universe = [];
                for (var i = 0; i<512; i++){
                        current_universe[i] = 0;
                }
                current_universe_buffer = Buffer(current_universe);

                var DmxUsbDevice = new DMX(this.port, current_universe_buffer);

                node.on('input',function(msg) {
                        current_universe = msg.payload;
                        // console.log(current_universe);
                        DmxUsbDevice.update(current_universe, this.dmxOffset);
                        node.send(msg);
                });
                this.on('close', function(done) {
                        DmxUsbDevice.close(function (err) {
                            console.log('[info] DMX4ALL USB device closed', err);
                            done();
                        });
                });
    }
    RED.nodes.registerType("dmx4all",DMXout);
}
