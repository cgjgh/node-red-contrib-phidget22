"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var phidget22 = require("phidget22-net");
var common_1 = require("./common");
module.exports = function (RED) {
    function Phidget22HumiditySensorNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        var state = { didAttach: false };
        var humiditySensor = new phidget22.HumiditySensor();
        var invokeMethod = (0, common_1.getInvokePhidgetMethod)(node, config.debug);
        humiditySensor.onAttach = function () {
            invokeMethod(function () { return humiditySensor.setDataInterval(config.dataInterval); }, 'setDataInterval (in onAttach)');
            invokeMethod(function () { return humiditySensor.setHumidityChangeTrigger(config.humidityChangeTrigger); }, 'setHumidityChangeTrigger (in onAttach)');
            var msg = { topic: 'Attach', payload: {} };
            state.didAttach = true;
            node.status({ fill: 'green', shape: 'dot', text: 'attached' });
            node.send(msg);
        };
        humiditySensor.onHumidityChange = function (humidity) {
            var msg = { topic: 'HumidityChange', payload: { humidity: humidity } };
            node.send(msg);
        };
        (0, common_1.setupPhidgetDevice)(humiditySensor, node, config);
        (0, common_1.openPhidgetDevice)(humiditySensor, 'HumiditySensor', node, state, config);
        node.on('input', function (msg) {
            switch (msg.topic) {
                case 'setDataInterval': {
                    invokeMethod(function () { var _a; return humiditySensor.setDataInterval((_a = msg.payload) === null || _a === void 0 ? void 0 : _a.dataInterval); }, 'setDataInterval');
                    break;
                }
                case 'setHumidityChangeTrigger': {
                    invokeMethod(function () { var _a; return humiditySensor.setHumidityChangeTrigger((_a = msg.payload) === null || _a === void 0 ? void 0 : _a.humidityChangeTrigger); }, 'setHumidityChangeTrigger');
                    break;
                }
                default: {
                    node.error('Unsupported message topic: ' + msg.topic);
                    break;
                }
            }
        });
    }
    RED.nodes.registerType('phidget22-humiditysensor', Phidget22HumiditySensorNode);
};
