"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var phidget22 = require("phidget22-net");
var common_1 = require("./common");
module.exports = function (RED) {
    function Phidget22PressureSensorNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        var state = { didAttach: false };
        var pressureSensor = new phidget22.PressureSensor();
        var invokeMethod = (0, common_1.getInvokePhidgetMethod)(node, config.debug);
        pressureSensor.onAttach = function () {
            invokeMethod(function () { return pressureSensor.setDataInterval(config.dataInterval); }, 'setDataInterval (in onAttach)');
            invokeMethod(function () { return pressureSensor.setPressureChangeTrigger(config.pressureChangeTrigger); }, 'setPressureChangeTrigger (in onAttach)');
            var msg = { topic: 'Attach', payload: {} };
            state.didAttach = true;
            node.status({ fill: 'green', shape: 'dot', text: 'attached' });
            node.send(msg);
        };
        pressureSensor.onPressureChange = function (pressure) {
            var msg = { topic: 'PressureChange', payload: { pressure: pressure } };
            node.send(msg);
        };
        (0, common_1.setupPhidgetDevice)(pressureSensor, node, config);
        (0, common_1.openPhidgetDevice)(pressureSensor, 'PressureSensor', node, state, config);
        node.on('input', function (msg) {
            switch (msg.topic) {
                case 'setDataInterval': {
                    invokeMethod(function () { var _a; return pressureSensor.setDataInterval((_a = msg.payload) === null || _a === void 0 ? void 0 : _a.dataInterval); }, 'setDataInterval');
                    break;
                }
                case 'setPressureChangeTrigger': {
                    invokeMethod(function () { var _a; return pressureSensor.setPressureChangeTrigger((_a = msg.payload) === null || _a === void 0 ? void 0 : _a.pressureChangeTrigger); }, 'setPressureChangeTrigger');
                    break;
                }
                default: {
                    node.error('Unsupported message topic: ' + msg.topic);
                    break;
                }
            }
        });
    }
    RED.nodes.registerType('phidget22-pressuresensor', Phidget22PressureSensorNode);
};
