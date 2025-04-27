"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var phidget22 = require("phidget22-net");
var common_1 = require("./common");
module.exports = function (RED) {
    function Phidget22DistanceSensorNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        var state = { didAttach: false };
        var distanceSensor = new phidget22.DistanceSensor();
        var invokeMethod = (0, common_1.getInvokePhidgetMethod)(node, config.debug);
        distanceSensor.onAttach = function () {
            invokeMethod(function () { return distanceSensor.setDataInterval(config.dataInterval); }, 'setDataInterval (in onAttach)');
            invokeMethod(function () { return distanceSensor.setDistanceChangeTrigger(config.distanceChangeTrigger); }, 'setDistanceChangeTrigger (in onAttach)');
            invokeMethod(function () { return distanceSensor.setSonarQuietMode(config.sonarQuietMode); }, 'setSonarQuietMode (in onAttach)');
            var msg = { topic: 'Attach', payload: {} };
            state.didAttach = true;
            node.status({ fill: 'green', shape: 'dot', text: 'attached' });
            node.send(msg);
        };
        distanceSensor.onDistanceChange = function (distance) {
            var msg = { topic: 'DistanceChange', payload: { distance: distance } };
            node.send(msg);
        };
        distanceSensor.onSonarReflectionsUpdate = function (distances, amplitudes, count) {
            var msg = {
                topic: 'SonarReflectionsUpdate',
                payload: { distances: distances, amplitudes: amplitudes, count: count },
            };
            node.send(msg);
        };
        (0, common_1.setupPhidgetDevice)(distanceSensor, node, config);
        (0, common_1.openPhidgetDevice)(distanceSensor, 'DistanceSensor', node, state, config);
        node.on('input', function (msg) {
            switch (msg.topic) {
                case 'setDataInteval': {
                    invokeMethod(function () { var _a; return distanceSensor.setDataInterval((_a = msg.payload) === null || _a === void 0 ? void 0 : _a.dataInterval); }, 'setDataInterval');
                    break;
                }
                case 'setDistanceChangeTrigger': {
                    invokeMethod(function () { var _a; return distanceSensor.setDistanceChangeTrigger((_a = msg.payload) === null || _a === void 0 ? void 0 : _a.distanceChangeTrigger); }, 'setDistanceChangeTrigger');
                    break;
                }
                case 'setSonarQuietMode': {
                    invokeMethod(function () { var _a; return distanceSensor.setSonarQuietMode((_a = msg.payload) === null || _a === void 0 ? void 0 : _a.sonarQuietMode); }, 'setSonarQuietMode');
                    break;
                }
                default: {
                    node.error('Unsupported message topic: ' + msg.topic);
                    break;
                }
            }
        });
    }
    RED.nodes.registerType('phidget22-distancesensor', Phidget22DistanceSensorNode);
};
