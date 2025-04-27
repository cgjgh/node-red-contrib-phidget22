"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var phidget22 = require("phidget22-net");
var common_1 = require("./common");
module.exports = function (RED) {
    function Phidget22SoundSensorNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        var state = { didAttach: false };
        var soundSensor = new phidget22.SoundSensor();
        var invokeMethod = (0, common_1.getInvokePhidgetMethod)(node, config.debug);
        soundSensor.onAttach = function () {
            invokeMethod(function () { return soundSensor.setDataInterval(config.dataInterval); }, 'setDataInterval (in onAttach)');
            invokeMethod(function () { return soundSensor.setSPLChangeTrigger(config.SPLChangeTrigger); }, 'setSPLChangeTrigger (in onAttach)');
            invokeMethod(function () { return soundSensor.setSPLRange(config.SPLRange); }, 'setSPLRange (in onAttach)');
            var msg = { topic: 'Attach', payload: {} };
            state.didAttach = true;
            node.status({ fill: 'green', shape: 'dot', text: 'attached' });
            node.send(msg);
        };
        soundSensor.onSPLChange = function (dB, dBA, dBC, octaves) {
            var msg = {
                topic: 'SPLChange',
                payload: { dB: dB, dBA: dBA, dBC: dBC, octaves: octaves },
            };
            node.send(msg);
        };
        (0, common_1.setupPhidgetDevice)(soundSensor, node, config);
        (0, common_1.openPhidgetDevice)(soundSensor, 'SoundSensor', node, state, config);
        node.on('input', function (msg) {
            switch (msg.topic) {
                case 'setDataInterval': {
                    invokeMethod(function () { var _a; return soundSensor.setDataInterval((_a = msg.payload) === null || _a === void 0 ? void 0 : _a.dataInterval); }, 'setDataInterval');
                    break;
                }
                case 'setSPLChangeTrigger': {
                    invokeMethod(function () { var _a; return soundSensor.setSPLChangeTrigger((_a = msg.payload) === null || _a === void 0 ? void 0 : _a.SPLChangeTrigger); }, 'setSPLChangeTrigger');
                    break;
                }
                case 'setSPLRange': {
                    invokeMethod(function () { var _a; return soundSensor.setSPLRange((_a = msg.payload) === null || _a === void 0 ? void 0 : _a.SPLRange); }, 'setSPLRange');
                    break;
                }
                default: {
                    node.error('Unsupported message topic: ' + msg.topic);
                    break;
                }
            }
        });
    }
    RED.nodes.registerType('phidget22-soundsensor', Phidget22SoundSensorNode);
};
