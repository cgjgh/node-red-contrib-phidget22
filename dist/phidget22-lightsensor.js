"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var phidget22 = require("phidget22-net");
var common_1 = require("./common");
module.exports = function (RED) {
    function Phidget22LightSensorNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        var state = { didAttach: false };
        var lightSensor = new phidget22.LightSensor();
        var invokeMethod = (0, common_1.getInvokePhidgetMethod)(node, config.debug);
        lightSensor.onAttach = function () {
            invokeMethod(function () { return lightSensor.setDataInterval(config.dataInterval); }, 'setDataInterval (in onAttach)');
            invokeMethod(function () { return lightSensor.setIlluminanceChangeTrigger(config.illuminanceChangeTrigger); }, 'setIlluminanceChangeTrigger (in onAttach)');
            var msg = { topic: 'Attach', payload: {} };
            state.didAttach = true;
            node.status({ fill: 'green', shape: 'dot', text: 'attached' });
            node.send(msg);
        };
        lightSensor.onIlluminanceChange = function (illuminance) {
            var msg = {
                topic: 'IlluminanceChange',
                payload: { illuminance: illuminance },
            };
            node.send(msg);
        };
        (0, common_1.setupPhidgetDevice)(lightSensor, node, config);
        (0, common_1.openPhidgetDevice)(lightSensor, 'LightSensor', node, state, config);
        node.on('input', function (msg) {
            switch (msg.topic) {
                case 'setDataInterval': {
                    invokeMethod(function () { var _a; return lightSensor.setDataInterval((_a = msg.payload) === null || _a === void 0 ? void 0 : _a.dataInterval); }, 'setDataInterval');
                    break;
                }
                case 'setIlluminanceChangeTrigger': {
                    invokeMethod(function () { var _a; return lightSensor.setIlluminanceChangeTrigger((_a = msg.payload) === null || _a === void 0 ? void 0 : _a.illuminanceChangeTrigger); }, 'setIlluminanceChangeTrigger');
                    break;
                }
                default: {
                    node.error('Unsupported message topic: ' + msg.topic);
                    break;
                }
            }
        });
    }
    RED.nodes.registerType('phidget22-lightsensor', Phidget22LightSensorNode);
};
