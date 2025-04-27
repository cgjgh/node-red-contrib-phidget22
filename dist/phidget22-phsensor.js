"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var phidget22 = require("phidget22-net");
var common_1 = require("./common");
module.exports = function (RED) {
    function Phidget22PHSensorNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        var state = { didAttach: false };
        var phSensor = new phidget22.PHSensor();
        var invokeMethod = (0, common_1.getInvokePhidgetMethod)(node, config.debug);
        phSensor.onAttach = function () {
            invokeMethod(function () { return phSensor.setDataInterval(config.dataInterval); }, 'setDataInterval (in onAttach)');
            invokeMethod(function () { return phSensor.setPHChangeTrigger(config.PHChangeTrigger); }, 'setPHChangeTrigger (in onAttach)');
            invokeMethod(function () { return phSensor.setCorrectionTemperature(config.correctionTemperature); }, 'setCorrectionTemperature (in onAttach)');
            var msg = { topic: 'Attach', payload: {} };
            state.didAttach = true;
            node.status({ fill: 'green', shape: 'dot', text: 'attached' });
            node.send(msg);
        };
        phSensor.onPHChange = function (PH) {
            var msg = { topic: 'PHChange', payload: { PH: PH } };
            node.send(msg);
        };
        (0, common_1.setupPhidgetDevice)(phSensor, node, config);
        (0, common_1.openPhidgetDevice)(phSensor, 'PHSensor', node, state, config);
        node.on('input', function (msg) {
            switch (msg.topic) {
                case 'setCorrectionTemperature': {
                    invokeMethod(function () { var _a; return phSensor.setCorrectionTemperature((_a = msg.payload) === null || _a === void 0 ? void 0 : _a.correctionTemperature); }, 'setCorrectionTemperature');
                    break;
                }
                case 'setDataInterval': {
                    invokeMethod(function () { var _a; return phSensor.setDataInterval((_a = msg.payload) === null || _a === void 0 ? void 0 : _a.dataInterval); }, 'setDataInterval');
                    break;
                }
                case 'setPHChangeTrigger': {
                    invokeMethod(function () { var _a; return phSensor.setPHChangeTrigger((_a = msg.payload) === null || _a === void 0 ? void 0 : _a.PHChangeTrigger); }, 'setPHChangeTrigger');
                    break;
                }
                default: {
                    node.error('Unsupported message topic: ' + msg.topic);
                    break;
                }
            }
        });
    }
    RED.nodes.registerType('phidget22-phsensor', Phidget22PHSensorNode);
};
