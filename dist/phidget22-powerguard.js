"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var phidget22 = require("phidget22-net");
var common_1 = require("./common");
module.exports = function (RED) {
    function Phidget22PowerGuardNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        var state = { didAttach: false };
        var powerGuard = new phidget22.PowerGuard();
        var invokeMethod = (0, common_1.getInvokePhidgetMethod)(node, config.debug);
        powerGuard.onAttach = function () {
            invokeMethod(function () { return powerGuard.setFanMode(config.fanMode); }, 'setFanMode (in onAttach)');
            invokeMethod(function () { return powerGuard.setOverVoltage(config.overVoltage); }, 'setOverVoltage (in onAttach)');
            var msg = { topic: 'Attach', payload: {} };
            state.didAttach = true;
            node.status({ fill: 'green', shape: 'dot', text: 'attached' });
            node.send(msg);
        };
        (0, common_1.setupPhidgetDevice)(powerGuard, node, config);
        (0, common_1.openPhidgetDevice)(powerGuard, 'PowerGuard', node, state, config);
        node.on('input', function (msg) {
            switch (msg.topic) {
                case 'enableFailsafe': {
                    invokeMethod(function () { var _a; return powerGuard.enableFailsafe((_a = msg.payload) === null || _a === void 0 ? void 0 : _a.failsafeTime); }, 'enableFailsafe');
                    break;
                }
                case 'setFanMode': {
                    invokeMethod(function () { var _a; return powerGuard.setFanMode((_a = msg.payload) === null || _a === void 0 ? void 0 : _a.fanMode); }, 'setFanMode');
                    break;
                }
                case 'setOverVoltage': {
                    invokeMethod(function () { var _a; return powerGuard.setOverVoltage((_a = msg.payload) === null || _a === void 0 ? void 0 : _a.overVoltage); }, 'setOverVoltage');
                    break;
                }
                case 'setPowerEnabled': {
                    invokeMethod(function () { var _a; return powerGuard.setPowerEnabled((_a = msg.payload) === null || _a === void 0 ? void 0 : _a.powerEnabled); }, 'setPowerEnabled');
                    break;
                }
                case 'resetFailsafe': {
                    invokeMethod(function () { return powerGuard.resetFailsafe(); }, 'resetFailsafe');
                    break;
                }
                default: {
                    node.error('Unsupported message topic: ' + msg.topic);
                    break;
                }
            }
        });
    }
    RED.nodes.registerType('phidget22-powerguard', Phidget22PowerGuardNode);
};
