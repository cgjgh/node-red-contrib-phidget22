"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var phidget22 = require("phidget22-net");
var common_1 = require("./common");
module.exports = function (RED) {
    function Phidget22CapacitiveTouchNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        var state = { didAttach: false };
        var capacitiveTouch = new phidget22.CapacitiveTouch();
        var invokeMethod = (0, common_1.getInvokePhidgetMethod)(node, config.debug);
        capacitiveTouch.onAttach = function () {
            invokeMethod(function () { return capacitiveTouch.setDataInterval(config.dataInterval); }, 'setDataInterval (in onAttach)');
            invokeMethod(function () { return capacitiveTouch.setTouchValueChangeTrigger(config.touchValueChangeTrigger); }, 'setTouchValueChangeTrigger (in onAttach)');
            var msg = { topic: 'Attach', payload: {} };
            state.didAttach = true;
            node.status({ fill: 'green', shape: 'dot', text: 'attached' });
            node.send(msg);
        };
        capacitiveTouch.onTouch = function (touchValue) {
            var msg = { topic: 'Touch', payload: { touchValue: touchValue } };
            node.send(msg);
        };
        capacitiveTouch.onTouchEnd = function () {
            var msg = { topic: 'TouchEnd', payload: {} };
            node.send(msg);
        };
        (0, common_1.setupPhidgetDevice)(capacitiveTouch, node, config);
        (0, common_1.openPhidgetDevice)(capacitiveTouch, 'CapacitiveTouch', node, state, config);
        node.on('input', function (msg) {
            switch (msg.topic) {
                case 'setDataInterval': {
                    invokeMethod(function () { var _a; return capacitiveTouch.setDataInterval((_a = msg.payload) === null || _a === void 0 ? void 0 : _a.dataInterval); }, 'setDataInterval');
                    break;
                }
                case 'setSensitivity': {
                    invokeMethod(function () { var _a; return capacitiveTouch.setSensitivity((_a = msg.payload) === null || _a === void 0 ? void 0 : _a.sensitivity); }, 'setSensitivity');
                    break;
                }
                case 'setTouchValueChangeTrigger': {
                    invokeMethod(function () { var _a; return capacitiveTouch.setTouchValueChangeTrigger((_a = msg.payload) === null || _a === void 0 ? void 0 : _a.touchValueChangeTrigger); }, 'setTouchValueChangeTrigger');
                    break;
                }
                default: {
                    node.error('Unsupported message topic: ' + msg.topic);
                    break;
                }
            }
        });
    }
    RED.nodes.registerType('phidget22-capacitivetouch', Phidget22CapacitiveTouchNode);
};
