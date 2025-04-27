"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var phidget22 = require("phidget22-net");
var common_1 = require("./common");
module.exports = function (RED) {
    function Phidget22AccelerometerNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        var state = { didAttach: false };
        var accelerometer = new phidget22.Accelerometer();
        var invokeMethod = (0, common_1.getInvokePhidgetMethod)(node, config.debug);
        accelerometer.onAttach = function () {
            invokeMethod(function () { return accelerometer.setAccelerationChangeTrigger(config.accelerationChangeTrigger); }, 'setAccelerationChangeTrigger (in onAttach)');
            invokeMethod(function () { return accelerometer.setDataInterval(config.dataInterval); }, 'setDataInterval (in onAttach)');
            var msg = { topic: 'Attach', payload: {} };
            state.didAttach = true;
            node.status({ fill: 'green', shape: 'dot', text: 'attached' });
            node.send(msg);
        };
        accelerometer.onAccelerationChange = function (acceleration, timestamp) {
            var msg = { topic: 'AccelerationChange', payload: { acceleration: acceleration, timestamp: timestamp } };
            node.send(msg);
        };
        (0, common_1.setupPhidgetDevice)(accelerometer, node, config);
        (0, common_1.openPhidgetDevice)(accelerometer, 'Accelerometer', node, state, config);
        node.on('input', function (msg) {
            switch (msg.topic) {
                case 'setAccelerationChangeTrigger': {
                    invokeMethod(function () { var _a; return accelerometer.setAccelerationChangeTrigger((_a = msg.payload) === null || _a === void 0 ? void 0 : _a.accelerationChangeTrigger); }, 'setAccelerationChangeTrigger');
                    break;
                }
                case 'setDataInterval': {
                    invokeMethod(function () { var _a; return accelerometer.setDataInterval((_a = msg.payload) === null || _a === void 0 ? void 0 : _a.dataInterval); }, 'setDataInterval');
                    break;
                }
                default: {
                    node.error('Unsupported message topic: ' + msg.topic);
                    break;
                }
            }
        });
    }
    RED.nodes.registerType('phidget22-accelerometer', Phidget22AccelerometerNode);
};
