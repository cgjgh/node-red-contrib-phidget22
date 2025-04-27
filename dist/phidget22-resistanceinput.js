"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var phidget22 = require("phidget22-net");
var common_1 = require("./common");
module.exports = function (RED) {
    function Phidget22ResistanceInputNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        var state = { didAttach: false };
        var resistanceInput = new phidget22.ResistanceInput();
        var invokeMethod = (0, common_1.getInvokePhidgetMethod)(node, config.debug);
        resistanceInput.onAttach = function () {
            invokeMethod(function () { return resistanceInput.setDataInterval(config.dataInterval); }, 'setDataInterval (in onAttach)');
            invokeMethod(function () { return resistanceInput.setResistanceChangeTrigger(config.resistanceChangeTrigger); }, 'setResistanceChangeTrigger (in onAttach)');
            invokeMethod(function () { return resistanceInput.setRTDWireSetup(config.RTDWireSetup); }, 'setRTDWireSetup (in onAttach)');
            var msg = { topic: 'Attach', payload: {} };
            state.didAttach = true;
            node.status({ fill: 'green', shape: 'dot', text: 'attached' });
            node.send(msg);
        };
        resistanceInput.onResistanceChange = function (resistance) {
            var msg = {
                topic: 'ResistanceChange',
                payload: { resistance: resistance },
            };
            node.send(msg);
        };
        (0, common_1.setupPhidgetDevice)(resistanceInput, node, config);
        (0, common_1.openPhidgetDevice)(resistanceInput, 'ResistanceInput', node, state, config);
        node.on('input', function (msg) {
            switch (msg.topic) {
                case 'setDataInterval': {
                    invokeMethod(function () { var _a; return resistanceInput.setDataInterval((_a = msg.payload) === null || _a === void 0 ? void 0 : _a.dataInterval); }, 'setDataInterval');
                    break;
                }
                case 'setResistanceChangeTrigger': {
                    invokeMethod(function () { var _a; return resistanceInput.setResistanceChangeTrigger((_a = msg.payload) === null || _a === void 0 ? void 0 : _a.resistanceChangeTrigger); }, 'setResistanceChangeTrigger');
                    break;
                }
                case 'setRTDWireSetup': {
                    invokeMethod(function () { var _a; return resistanceInput.setRTDWireSetup((_a = msg.payload) === null || _a === void 0 ? void 0 : _a.RTDWireSetup); }, 'setRTDWireSetup');
                    break;
                }
                default: {
                    node.error('Unsupported message topic: ' + msg.topic);
                    break;
                }
            }
        });
    }
    RED.nodes.registerType('phidget22-resistanceinput', Phidget22ResistanceInputNode);
};
