"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var phidget22 = require("phidget22-net");
var common_1 = require("./common");
module.exports = function (RED) {
    function Phidget22VoltageInputNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        var state = { didAttach: false };
        var voltageInput = new phidget22.VoltageInput();
        var invokeMethod = (0, common_1.getInvokePhidgetMethod)(node, config.debug);
        voltageInput.onAttach = function () {
            invokeMethod(function () { return voltageInput.setDataInterval(config.dataInterval); }, 'setDataInterval (in onAttach)');
            invokeMethod(function () { return voltageInput.setVoltageChangeTrigger(config.voltageChangeTrigger); }, 'setVoltageChangeTrigger (in onAttach)');
            invokeMethod(function () { return voltageInput.setSensorType(config.sensorType); }, 'setSensorType (in onAttach)');
            invokeMethod(function () { return voltageInput.setPowerSupply(config.powerSupply); }, 'setPowerSupply (in onAttach)');
            invokeMethod(function () { return voltageInput.setVoltageRange(config.voltageRange); }, 'setVoltageRange (in onAttach)');
            var msg = { topic: 'Attach', payload: {} };
            state.didAttach = true;
            node.status({ fill: 'green', shape: 'dot', text: 'attached' });
            node.log('attached');
            node.send(msg);
        };
        voltageInput.onVoltageChange = function (voltage) {
            var msg = { topic: 'VoltageChange', payload: { voltage: voltage } };
            node.send(msg);
        };
        voltageInput.onSensorChange = function (sensorValue, sensorUnit) {
            var msg = {
                topic: 'SensorChange',
                payload: { sensorValue: sensorValue, sensorUnit: sensorUnit },
            };
            node.send(msg);
        };
        (0, common_1.setupPhidgetDevice)(voltageInput, node, config);
        (0, common_1.openPhidgetDevice)(voltageInput, 'VoltageInput', node, state, config);
        node.on('input', function (msg) {
            switch (msg.topic) {
                case 'setDataInterval': {
                    invokeMethod(function () { var _a; return voltageInput.setDataInterval((_a = msg.payload) === null || _a === void 0 ? void 0 : _a.dataInterval); }, 'setDataInterval');
                    break;
                }
                case 'setPowerSupply': {
                    invokeMethod(function () { var _a; return voltageInput.setPowerSupply((_a = msg.payload) === null || _a === void 0 ? void 0 : _a.powerSupply); }, 'setPowerSupply');
                    break;
                }
                case 'setSensorType': {
                    invokeMethod(function () { var _a; return voltageInput.setSensorType((_a = msg.payload) === null || _a === void 0 ? void 0 : _a.sensorType); }, 'setSensorType');
                    break;
                }
                case 'setSensorValueChangeTrigger': {
                    invokeMethod(function () { var _a; return voltageInput.setSensorValueChangeTrigger((_a = msg.payload) === null || _a === void 0 ? void 0 : _a.sensorValueChangeTrigger); }, 'setSensorValueChangeTrigger');
                    break;
                }
                case 'setVoltageChangeTrigger': {
                    invokeMethod(function () { var _a; return voltageInput.setVoltageChangeTrigger((_a = msg.payload) === null || _a === void 0 ? void 0 : _a.voltageChangeTrigger); }, 'setVoltageChangeTrigger');
                    break;
                }
                case 'setVoltageRange': {
                    invokeMethod(function () { var _a; return voltageInput.setVoltageRange((_a = msg.payload) === null || _a === void 0 ? void 0 : _a.voltageRange); }, 'setVoltageRange');
                    break;
                }
                default: {
                    node.error('Unsupported message topic: ' + msg.topic);
                    break;
                }
            }
        });
    }
    RED.nodes.registerType('phidget22-voltageinput', Phidget22VoltageInputNode);
};
