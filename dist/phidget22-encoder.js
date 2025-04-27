"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var phidget22 = require("phidget22-net");
var common_1 = require("./common");
module.exports = function (RED) {
    function Phidget22EncoderNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        var state = { didAttach: false };
        var encoder = new phidget22.Encoder();
        var invokeMethod = (0, common_1.getInvokePhidgetMethod)(node, config.debug);
        encoder.onAttach = function () {
            invokeMethod(function () { return encoder.setDataInterval(config.dataInterval); }, 'setDataInterval (in onAttach)');
            invokeMethod(function () { return encoder.setPositionChangeTrigger(config.positionChangeTrigger); }, 'setPositionChangeTrigger (in onAttach)');
            invokeMethod(function () { return encoder.setIOMode(config.IOMode); }, 'setIOMode (in onAttach)');
            var msg = { topic: 'Attach', payload: {} };
            state.didAttach = true;
            node.status({ fill: 'green', shape: 'dot', text: 'attached' });
            node.send(msg);
        };
        encoder.onPositionChange = function (positionChange, timeChange, indexTriggered) {
            var msg = {
                topic: 'PositionChange',
                payload: {
                    positionChange: positionChange,
                    timeChange: timeChange,
                    indexTriggered: indexTriggered,
                },
            };
            node.send(msg);
        };
        (0, common_1.setupPhidgetDevice)(encoder, node, config);
        (0, common_1.openPhidgetDevice)(encoder, 'Encoder', node, state, config);
        node.on('input', function (msg) {
            switch (msg.topic) {
                case 'setEnabled': {
                    invokeMethod(function () { var _a; return encoder.setEnabled((_a = msg.payload) === null || _a === void 0 ? void 0 : _a.enabled); }, 'setEnabled');
                    break;
                }
                case 'setDataInterval': {
                    invokeMethod(function () { var _a; return encoder.setDataInterval((_a = msg.payload) === null || _a === void 0 ? void 0 : _a.dataInterval); }, 'setDataInterval');
                    break;
                }
                case 'setIOMode': {
                    invokeMethod(function () { var _a; return encoder.setIOMode((_a = msg.payload) === null || _a === void 0 ? void 0 : _a.IOMode); }, 'setIOMode');
                    break;
                }
                case 'setPosition': {
                    invokeMethod(function () { var _a; return encoder.setPosition((_a = msg.payload) === null || _a === void 0 ? void 0 : _a.position); }, 'setPosition');
                    break;
                }
                case 'setPositionChangeTrigger': {
                    invokeMethod(function () { var _a; return encoder.setPositionChangeTrigger((_a = msg.payload) === null || _a === void 0 ? void 0 : _a.positionChangeTrigger); }, 'setPositionChangeTrigger');
                    break;
                }
                default: {
                    node.error('Unsupported message topic: ' + msg.topic);
                    break;
                }
            }
        });
    }
    RED.nodes.registerType('phidget22-encoder', Phidget22EncoderNode);
};
