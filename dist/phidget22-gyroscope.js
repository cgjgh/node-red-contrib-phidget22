"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var phidget22 = require("phidget22-net");
var common_1 = require("./common");
module.exports = function (RED) {
    function Phidget22GyroscopeNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        var state = { didAttach: false };
        var gyroscope = new phidget22.Gyroscope();
        var invokeMethod = (0, common_1.getInvokePhidgetMethod)(node, config.debug);
        gyroscope.onAttach = function () {
            invokeMethod(function () { return gyroscope.setDataInterval(config.dataInterval); }, 'setDataInterval (in onAttach)');
            var msg = { topic: 'Attach', payload: {} };
            state.didAttach = true;
            node.status({ fill: 'green', shape: 'dot', text: 'attached' });
            node.send(msg);
        };
        gyroscope.onAngularRateUpdate = function (angularRate, timestamp) {
            var msg = {
                topic: 'AngularRateUpdate',
                payload: { angularRate: angularRate, timestamp: timestamp },
            };
            node.send(msg);
        };
        (0, common_1.setupPhidgetDevice)(gyroscope, node, config);
        (0, common_1.openPhidgetDevice)(gyroscope, 'Gyroscope', node, state, config);
        node.on('input', function (msg) {
            switch (msg.topic) {
                case 'setDataInterval': {
                    invokeMethod(function () { var _a; return gyroscope.setDataInterval((_a = msg.payload) === null || _a === void 0 ? void 0 : _a.dataInterval); }, 'setDataInterval');
                    break;
                }
                case 'zero': {
                    invokeMethod(function () { return gyroscope.zero(); }, 'zero');
                    break;
                }
                default: {
                    node.error('Unsupported message topic: ' + msg.topic);
                    break;
                }
            }
        });
    }
    RED.nodes.registerType('phidget22-gyroscope', Phidget22GyroscopeNode);
};
