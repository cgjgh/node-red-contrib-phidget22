"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var phidget22 = require("phidget22-net");
var common_1 = require("./common");
module.exports = function (RED) {
    function Phidget22VoltageOutputNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        var state = { didAttach: false };
        var voltageOutput = new phidget22.VoltageOutput();
        var invokeMethod = (0, common_1.getInvokePhidgetMethod)(node, config.debug);
        voltageOutput.onAttach = function () {
            invokeMethod(function () { return voltageOutput.setVoltageOutputRange(config.voltageOutputRange); }, 'setVoltageOutputRange (in onAttach)');
            var msg = { topic: 'Attach', payload: {} };
            state.didAttach = true;
            node.status({ fill: 'green', shape: 'dot', text: 'attached' });
            node.send(msg);
        };
        (0, common_1.setupPhidgetDevice)(voltageOutput, node, config);
        (0, common_1.openPhidgetDevice)(voltageOutput, 'VoltageOutput', node, state, config);
        node.on('input', function (msg) {
            switch (msg.topic) {
                case 'setEnabled': {
                    invokeMethod(function () { var _a; return voltageOutput.setEnabled((_a = msg.payload) === null || _a === void 0 ? void 0 : _a.enabled); }, 'setEnabled');
                    break;
                }
                case 'enableFailsafe': {
                    invokeMethod(function () { var _a; return voltageOutput.enableFailsafe((_a = msg.payload) === null || _a === void 0 ? void 0 : _a.failsafeTime); }, 'enableFailsafe');
                    break;
                }
                case 'resetFailsafe': {
                    invokeMethod(function () { return voltageOutput.resetFailsafe(); }, 'resetFailsafe');
                    break;
                }
                case 'setVoltage': {
                    invokeMethod(function () { var _a; return voltageOutput.setVoltage((_a = msg.payload) === null || _a === void 0 ? void 0 : _a.voltage); }, 'setVoltage');
                    break;
                }
                case 'setVoltageOutputRange': {
                    invokeMethod(function () { var _a; return voltageOutput.setVoltageOutputRange((_a = msg.payload) === null || _a === void 0 ? void 0 : _a.voltageOutputRange); }, 'setVoltageOutputRange');
                    break;
                }
                default: {
                    node.error('Unsupported message topic: ' + msg.topic);
                    break;
                }
            }
        });
    }
    RED.nodes.registerType('phidget22-voltageoutput', Phidget22VoltageOutputNode);
};
