"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var phidget22 = require("phidget22-net");
var common_1 = require("./common");
module.exports = function (RED) {
    function Phidget22DigitalInputNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        var state = { didAttach: false };
        var digitalInput = new phidget22.DigitalInput();
        var invokeMethod = (0, common_1.getInvokePhidgetMethod)(node, config.debug);
        digitalInput.onAttach = function () {
            invokeMethod(function () { return digitalInput.setPowerSupply(config.powerSupply); }, 'setPowerSupply (in onAttach)');
            invokeMethod(function () { return digitalInput.setInputMode(config.inputMode); }, 'setInputMode (in onAttach)');
            var attachMsg = { topic: 'Attach', payload: {} };
            state.didAttach = true;
            node.status({ fill: 'green', shape: 'dot', text: 'attached' });
            node.send(attachMsg);
            // Send initial stateChange event so the user knows the starting state
            var stateChangeMsg = {
                topic: 'StateChange',
                payload: { state: digitalInput.getState() },
            };
            node.send(stateChangeMsg);
        };
        digitalInput.onStateChange = function (state) {
            var msg = { topic: 'StateChange', payload: { state: state } };
            node.send(msg);
        };
        (0, common_1.setupPhidgetDevice)(digitalInput, node, config);
        (0, common_1.openPhidgetDevice)(digitalInput, 'DigitalInput', node, state, config);
        node.on('input', function (msg) {
            switch (msg.topic) {
                case 'setInputMode': {
                    invokeMethod(function () { var _a; return digitalInput.setInputMode((_a = msg.payload) === null || _a === void 0 ? void 0 : _a.inputMode); }, 'setInputMode');
                    break;
                }
                case 'setPowerSupply': {
                    invokeMethod(function () { var _a; return digitalInput.setPowerSupply((_a = msg.payload) === null || _a === void 0 ? void 0 : _a.powerSupply); }, 'setPowerSupply');
                    break;
                }
                default: {
                    node.error('Unsupported message topic: ' + msg.topic);
                    break;
                }
            }
        });
    }
    RED.nodes.registerType('phidget22-digitalinput', Phidget22DigitalInputNode);
};
