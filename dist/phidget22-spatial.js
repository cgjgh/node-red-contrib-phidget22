"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var phidget22 = require("phidget22-net");
var common_1 = require("./common");
module.exports = function (RED) {
    function Phidget22SpatialNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        var state = { didAttach: false };
        var spatial = new phidget22.Spatial();
        var invokeMethod = (0, common_1.getInvokePhidgetMethod)(node, config.debug);
        spatial.onAttach = function () {
            invokeMethod(function () { return spatial.setDataInterval(config.dataInterval); }, 'setDataInterval (in onAttach)');
            invokeMethod(function () { return spatial.setAlgorithm(config.algorithm); }, 'setAlgorithm (in onAttach)');
            invokeMethod(function () { return spatial.setAlgorithmMagnetometerGain(config.algorithmMagnetometerGain); }, 'setAlgorithmMagnetometerGain (in onAttach)');
            var msg = { topic: 'Attach', payload: {} };
            state.didAttach = true;
            node.status({ fill: 'green', shape: 'dot', text: 'attached' });
            node.send(msg);
        };
        spatial.onSpatialData = function (acceleration, angularRate, magneticField, timestamp) {
            var msg = {
                topic: 'SpatialData',
                payload: {
                    acceleration: acceleration,
                    angularRate: angularRate,
                    magneticField: magneticField,
                    timestamp: timestamp,
                },
            };
            node.send(msg);
        };
        spatial.onAlgorithmData = function (quaternion, timestamp) {
            var msg = {
                topic: 'AlgorithmData',
                payload: { quaternion: quaternion, timestamp: timestamp },
            };
            node.send(msg);
        };
        (0, common_1.setupPhidgetDevice)(spatial, node, config);
        (0, common_1.openPhidgetDevice)(spatial, 'Spatial', node, state, config);
        node.on('input', function (msg) {
            switch (msg.topic) {
                case 'setAlgorithm': {
                    invokeMethod(function () { var _a; return spatial.setAlgorithm((_a = msg.payload) === null || _a === void 0 ? void 0 : _a.algorithm); }, 'setAlgorithm');
                    break;
                }
                case 'setAlgorithmMagnetometerGain': {
                    invokeMethod(function () { var _a; return spatial.setAlgorithmMagnetometerGain((_a = msg.payload) === null || _a === void 0 ? void 0 : _a.algorithmMagnetometerGain); }, 'setAlgorithmMagnetometerGain');
                    break;
                }
                case 'setDataInterval': {
                    invokeMethod(function () { var _a; return spatial.setDataInterval((_a = msg.payload) === null || _a === void 0 ? void 0 : _a.dataInterval); }, 'setDataInterval');
                    break;
                }
                case 'setMagnetometerCorrectionParameters': {
                    invokeMethod(function () {
                        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
                        return spatial.setMagnetometerCorrectionParameters((_a = msg.payload) === null || _a === void 0 ? void 0 : _a.magneticField, (_b = msg.payload) === null || _b === void 0 ? void 0 : _b.offset0, (_c = msg.payload) === null || _c === void 0 ? void 0 : _c.offset1, (_d = msg.payload) === null || _d === void 0 ? void 0 : _d.offset2, (_e = msg.payload) === null || _e === void 0 ? void 0 : _e.gain0, (_f = msg.payload) === null || _f === void 0 ? void 0 : _f.gain1, (_g = msg.payload) === null || _g === void 0 ? void 0 : _g.gain2, (_h = msg.payload) === null || _h === void 0 ? void 0 : _h.T0, (_j = msg.payload) === null || _j === void 0 ? void 0 : _j.T1, (_k = msg.payload) === null || _k === void 0 ? void 0 : _k.T2, (_l = msg.payload) === null || _l === void 0 ? void 0 : _l.T3, (_m = msg.payload) === null || _m === void 0 ? void 0 : _m.T4, (_o = msg.payload) === null || _o === void 0 ? void 0 : _o.T5);
                    }, 'setMagnetometerCorrectionParameters');
                    break;
                }
                case 'resetMagnetometerCorrectionParameters': {
                    invokeMethod(function () { return spatial.resetMagnetometerCorrectionParameters(); }, 'resetMagnetometerCorrectionParameters');
                    break;
                }
                case 'saveMagnetometerCorrectionParameters': {
                    invokeMethod(function () { return spatial.saveMagnetometerCorrectionParameters(); }, 'saveMagnetometerCorrectionParameters');
                    break;
                }
                case 'zeroAlgorithm': {
                    invokeMethod(function () { return spatial.zeroAlgorithm(); }, 'zeroAlgorithm');
                    break;
                }
                case 'zeroGyro': {
                    invokeMethod(function () { return spatial.zeroGyro(); }, 'zeroGyro');
                    break;
                }
                default: {
                    node.error('Unsupported message topic: ' + msg.topic);
                    break;
                }
            }
        });
    }
    RED.nodes.registerType('phidget22-spatial', Phidget22SpatialNode);
};
