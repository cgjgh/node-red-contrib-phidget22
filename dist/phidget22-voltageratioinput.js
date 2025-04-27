"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var phidget22 = require("phidget22-net");
var common_1 = require("./common");
module.exports = function (RED) {
    function Phidget22VoltageRatioInputNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        var state = { didAttach: false };
        var voltageRatioInput = new phidget22.VoltageRatioInput();
        var invokeMethod = (0, common_1.getInvokePhidgetMethod)(node, config.debug);
        voltageRatioInput.onAttach = function () {
            invokeMethod(function () { return voltageRatioInput.setDataInterval(config.dataInterval); }, 'setDataInterval (in onAttach)');
            invokeMethod(function () { return voltageRatioInput.setVoltageRatioChangeTrigger(config.voltageRatioChangeTrigger); }, 'setVoltageRatioChangeTrigger (in onAttach)');
            invokeMethod(function () { return voltageRatioInput.setSensorType(config.sensorType); }, 'setSensorType (in onAttach)');
            invokeMethod(function () { return voltageRatioInput.setBridgeGain(config.bridgeGain); }, 'setBridgeGain (in onAttach)');
            var msg = { topic: 'Attach', payload: {} };
            state.didAttach = true;
            node.status({ fill: 'green', shape: 'dot', text: 'attached' });
            node.log('attached');
            node.send(msg);
        };
        voltageRatioInput.onVoltageRatioChange = function (voltageRatio) {
            var msg = {
                topic: 'VoltageratioChange',
                payload: { voltageRatio: voltageRatio },
            };
            node.send(msg);
        };
        voltageRatioInput.onSensorChange = function (sensorValue, sensorUnit) {
            var msg = {
                topic: 'SensorChange',
                payload: { sensorValue: sensorValue, sensorUnit: sensorUnit },
            };
            node.send(msg);
        };
        (0, common_1.setupPhidgetDevice)(voltageRatioInput, node, config);
        (0, common_1.openPhidgetDevice)(voltageRatioInput, 'VoltageRatioInput', node, state, config);
        node.on('input', function (msg) {
            switch (msg.topic) {
                case 'setBridgeEnabled': {
                    invokeMethod(function () { var _a; return voltageRatioInput.setBridgeEnabled((_a = msg.payload) === null || _a === void 0 ? void 0 : _a.bridgeEnabled); }, 'setBridgeEnabled');
                    break;
                }
                case 'setBridgeGain': {
                    invokeMethod(function () { var _a; return voltageRatioInput.setBridgeGain((_a = msg.payload) === null || _a === void 0 ? void 0 : _a.bridgeGain); }, 'setBridgeGain');
                    break;
                }
                case 'setDataInterval': {
                    invokeMethod(function () { var _a; return voltageRatioInput.setDataInterval((_a = msg.payload) === null || _a === void 0 ? void 0 : _a.dataInterval); }, 'setDataInterval');
                    break;
                }
                case 'setSensorType': {
                    invokeMethod(function () { var _a; return voltageRatioInput.setSensorType((_a = msg.payload) === null || _a === void 0 ? void 0 : _a.sensorType); }, 'setSensorType');
                    break;
                }
                case 'setSensorValueChangeTrigger': {
                    invokeMethod(function () { var _a; return voltageRatioInput.setSensorValueChangeTrigger((_a = msg.payload) === null || _a === void 0 ? void 0 : _a.sensorValueChangeTrigger); }, 'setSensorValueChangeTrigger');
                    break;
                }
                case 'setVoltageRatioChangeTrigger': {
                    invokeMethod(function () {
                        var _a;
                        return voltageRatioInput.setVoltageRatioChangeTrigger((_a = msg.payload) === null || _a === void 0 ? void 0 : _a.voltageRatioChangeTrigger);
                    }, 'setVoltageRatioChangeTrigger');
                    break;
                }
                default: {
                    node.error('Unsupported message topic: ' + msg.topic);
                    break;
                }
            }
        });
    }
    RED.nodes.registerType('phidget22-voltageratioinput', Phidget22VoltageRatioInputNode);
};
