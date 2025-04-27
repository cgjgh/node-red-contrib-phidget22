"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var phidget22 = require("phidget22-net");
var common_1 = require("./common");
module.exports = function (RED) {
    function Phidget22CurrentInputNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        var state = { didAttach: false };
        var currentInput = new phidget22.CurrentInput();
        var invokeMethod = (0, common_1.getInvokePhidgetMethod)(node, config.debug);
        currentInput.onAttach = function () {
            invokeMethod(function () { return currentInput.setDataInterval(config.dataInterval); }, 'setDataInterval (in onAttach)');
            invokeMethod(function () { return currentInput.setCurrentChangeTrigger(config.currentChangeTrigger); }, 'setCurrentChangeTrigger (in onAttach)');
            invokeMethod(function () { return currentInput.setPowerSupply(config.powerSupply); }, 'setPowerSupply (in onAttach)');
            var msg = { topic: 'Attach', payload: {} };
            state.didAttach = true;
            node.status({ fill: 'green', shape: 'dot', text: 'attached' });
            node.send(msg);
        };
        currentInput.onCurrentChange = function (current) {
            var msg = { topic: 'CurrentChange', payload: { current: current } };
            node.send(msg);
        };
        (0, common_1.setupPhidgetDevice)(currentInput, node, config);
        (0, common_1.openPhidgetDevice)(currentInput, 'CurrentInput', node, state, config);
        node.on('input', function (msg) {
            switch (msg.topic) {
                case 'setCurrentChangeTrigger': {
                    invokeMethod(function () { var _a; return currentInput.setCurrentChangeTrigger((_a = msg.payload) === null || _a === void 0 ? void 0 : _a.currentChangeTrigger); }, 'setCurrentChangeTrigger');
                    break;
                }
                case 'setDataInterval': {
                    invokeMethod(function () { var _a; return currentInput.setDataInterval((_a = msg.payload) === null || _a === void 0 ? void 0 : _a.dataInterval); }, 'setDataInterval');
                    break;
                }
                case 'setPowerSupply': {
                    invokeMethod(function () { var _a; return currentInput.setPowerSupply((_a = msg.payload) === null || _a === void 0 ? void 0 : _a.powerSupply); }, 'setPowerSupply');
                    break;
                }
                default: {
                    node.error('Unsupported message topic: ' + msg.topic);
                    break;
                }
            }
        });
    }
    RED.nodes.registerType('phidget22-currentinput', Phidget22CurrentInputNode);
};
