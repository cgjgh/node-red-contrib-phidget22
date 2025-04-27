"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var phidget22 = require("phidget22-net");
var common_1 = require("./common");
module.exports = function (RED) {
    function Phidget22IRNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        var state = { didAttach: false };
        var ir = new phidget22.IR();
        var invokeMethod = (0, common_1.getInvokePhidgetMethod)(node, config.debug);
        (0, common_1.setupPhidgetDevice)(ir, node, config);
        (0, common_1.openPhidgetDevice)(ir, 'IR', node, state, config);
        ir.onAttach = function () {
            var msg = { topic: 'Attach', payload: {} };
            state.didAttach = true;
            node.status({ fill: 'green', shape: 'dot', text: 'attached' });
            node.send(msg);
        };
        ir.onCode = function (code, bitCount, isRepeat) {
            var msg = {
                topic: 'Code',
                payload: { code: code, bitCount: bitCount, isRepeat: isRepeat },
            };
            node.send(msg);
        };
        ir.onLearn = function (code, codeInfo) {
            var msg = {
                topic: 'Learn',
                payload: { code: code, codeInfo: codeInfo },
            };
            node.send(msg);
        };
        ir.onRawData = function (data) {
            var msg = { topic: 'RawData', payload: { data: data } };
            node.send(msg);
        };
        node.on('input', function (msg) {
            switch (msg.topic) {
                case 'transmit': {
                    invokeMethod(function () { var _a, _b; return ir.transmit((_a = msg.payload) === null || _a === void 0 ? void 0 : _a.code, (_b = msg.payload) === null || _b === void 0 ? void 0 : _b.codeInfo); }, 'transmit');
                    break;
                }
                case 'transmitRaw': {
                    invokeMethod(function () {
                        var _a, _b, _c, _d;
                        return ir.transmitRaw((_a = msg.payload) === null || _a === void 0 ? void 0 : _a.data, (_b = msg.payload) === null || _b === void 0 ? void 0 : _b.carrierFrequency, (_c = msg.payload) === null || _c === void 0 ? void 0 : _c.dutyCycle, (_d = msg.payload) === null || _d === void 0 ? void 0 : _d.gap);
                    }, 'transmitRaw');
                    break;
                }
                case 'transmitRepeat': {
                    invokeMethod(function () { return ir.transmitRepeat(); }, 'transmitRepeat');
                    break;
                }
                default: {
                    node.error('Unsupported message topic: ' + msg.topic);
                    break;
                }
            }
        });
    }
    RED.nodes.registerType('phidget22-ir', Phidget22IRNode);
};
