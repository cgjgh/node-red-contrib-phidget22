"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var phidget22 = require("phidget22-net");
var common_1 = require("./common");
module.exports = function (RED) {
    function Phidget22DigitalOutputNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        var state = { didAttach: false };
        var digitalOutput = new phidget22.DigitalOutput();
        var invokeMethod = (0, common_1.getInvokePhidgetMethod)(node, config.debug);
        digitalOutput.onAttach = function () {
            invokeMethod(function () { return digitalOutput.setLEDForwardVoltage(config.LEDForwardVoltage); }, 'setLEDForwardVoltage (in onAttach)');
            invokeMethod(function () { return digitalOutput.setLEDCurrentLimit(config.LEDCurrentLimit); }, 'setLEDCurrentLimit (in onAttach)');
            var msg = { topic: 'Attach', payload: {} };
            state.didAttach = true;
            node.status({ fill: 'green', shape: 'dot', text: 'attached' });
            node.send(msg);
        };
        (0, common_1.setupPhidgetDevice)(digitalOutput, node, config);
        (0, common_1.openPhidgetDevice)(digitalOutput, 'DigitalOutput', node, state, config);
        node.on('input', function (msg) {
            switch (msg.topic) {
                case 'setDutyCycle': {
                    invokeMethod(function () { var _a; return digitalOutput.setDutyCycle((_a = msg.payload) === null || _a === void 0 ? void 0 : _a.dutyCycle); }, 'setDutyCycle');
                    break;
                }
                case 'enableFailsafe': {
                    invokeMethod(function () { var _a; return digitalOutput.enableFailsafe((_a = msg.payload) === null || _a === void 0 ? void 0 : _a.failsafeTime); }, 'enableFailsafe');
                    break;
                }
                case 'setLEDCurrentLimit': {
                    invokeMethod(function () { var _a; return digitalOutput.setLEDCurrentLimit((_a = msg.payload) === null || _a === void 0 ? void 0 : _a.LEDCurrentLimit); }, 'setLEDCurrentLimit');
                    break;
                }
                case 'setLEDForwardVoltage': {
                    invokeMethod(function () { var _a; return digitalOutput.setLEDForwardVoltage((_a = msg.payload) === null || _a === void 0 ? void 0 : _a.LEDForwardVoltage); }, 'setLEDForwardVoltage');
                    break;
                }
                case 'resetFailsafe': {
                    invokeMethod(function () { return digitalOutput.resetFailsafe(); }, 'resetFailsafe');
                    break;
                }
                case 'setState': {
                    invokeMethod(function () { var _a; return digitalOutput.setState((_a = msg.payload) === null || _a === void 0 ? void 0 : _a.state); }, 'setState');
                    break;
                }
                default: {
                    node.error('Unsupported message topic: ' + msg.topic);
                    break;
                }
            }
        });
    }
    RED.nodes.registerType('phidget22-digitaloutput', Phidget22DigitalOutputNode);
};
