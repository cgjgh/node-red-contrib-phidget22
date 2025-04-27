"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var phidget22 = require("phidget22-net");
var common_1 = require("./common");
module.exports = function (RED) {
    function Phidget22MagnetometerNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        var state = { didAttach: false };
        var magnetometer = new phidget22.Magnetometer();
        var invokeMethod = (0, common_1.getInvokePhidgetMethod)(node, config.debug);
        magnetometer.onAttach = function () {
            invokeMethod(function () { return magnetometer.setDataInterval(config.dataInterval); }, 'setDataInterval (in onAttach)');
            invokeMethod(function () { return magnetometer.setMagneticFieldChangeTrigger(config.magneticFieldChangeTrigger); }, 'setMagneticFieldChangeTrigger (in onAttach)');
            if (config.setParams === true) {
                invokeMethod(function () {
                    return magnetometer.setCorrectionParameters(config.magneticField, config.offset0, config.offset1, config.offset2, config.gain0, config.gain1, config.gain2, config.T0, config.T1, config.T2, config.T3, config.T4, config.T5);
                }, 'setCorrectionParameters (in onAttach)');
            }
            var msg = { topic: 'Attach', payload: {} };
            state.didAttach = true;
            node.status({ fill: 'green', shape: 'dot', text: 'attached' });
            node.send(msg);
        };
        magnetometer.onMagneticFieldChange = function (magneticField, timestamp) {
            var msg = {
                topic: 'MagneticFieldChange',
                payload: { magneticField: magneticField, timestamp: timestamp },
            };
            node.send(msg);
        };
        (0, common_1.setupPhidgetDevice)(magnetometer, node, config);
        (0, common_1.openPhidgetDevice)(magnetometer, 'Magnetometer', node, state, config);
        node.on('input', function (msg) {
            switch (msg.topic) {
                case 'setCorrectionParameters': {
                    invokeMethod(function () {
                        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
                        return magnetometer.setCorrectionParameters((_a = msg.payload) === null || _a === void 0 ? void 0 : _a.magneticField, (_b = msg.payload) === null || _b === void 0 ? void 0 : _b.offset0, (_c = msg.payload) === null || _c === void 0 ? void 0 : _c.offset1, (_d = msg.payload) === null || _d === void 0 ? void 0 : _d.offset2, (_e = msg.payload) === null || _e === void 0 ? void 0 : _e.gain0, (_f = msg.payload) === null || _f === void 0 ? void 0 : _f.gain1, (_g = msg.payload) === null || _g === void 0 ? void 0 : _g.gain2, (_h = msg.payload) === null || _h === void 0 ? void 0 : _h.T0, (_j = msg.payload) === null || _j === void 0 ? void 0 : _j.T1, (_k = msg.payload) === null || _k === void 0 ? void 0 : _k.T2, (_l = msg.payload) === null || _l === void 0 ? void 0 : _l.T3, (_m = msg.payload) === null || _m === void 0 ? void 0 : _m.T4, (_o = msg.payload) === null || _o === void 0 ? void 0 : _o.T5);
                    }, 'setCorrectionParameters');
                    break;
                }
                case 'setDataInterval': {
                    invokeMethod(function () { var _a; return magnetometer.setDataInterval((_a = msg.payload) === null || _a === void 0 ? void 0 : _a.dataInterval); }, 'setDataInterval');
                    break;
                }
                case 'setMagneticFieldChangeTrigger': {
                    invokeMethod(function () { var _a; return magnetometer.setMagneticFieldChangeTrigger((_a = msg.payload) === null || _a === void 0 ? void 0 : _a.magneticFieldChangeTrigger); }, 'setMagneticFieldChangeTrigger');
                    break;
                }
                case 'resetCorrectionParameters': {
                    invokeMethod(function () { return magnetometer.resetCorrectionParameters(); }, 'resetCorrectionParameters');
                    break;
                }
                case 'saveCorrectionParameters': {
                    invokeMethod(function () { return magnetometer.saveCorrectionParameters(); }, 'saveCorrectionParameters');
                    break;
                }
                default: {
                    node.error('Unsupported message topic: ' + msg.topic);
                    break;
                }
            }
        });
    }
    RED.nodes.registerType('phidget22-magnetometer', Phidget22MagnetometerNode);
};
