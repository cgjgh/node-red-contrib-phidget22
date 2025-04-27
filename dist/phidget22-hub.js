"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var phidget22 = require("phidget22-net");
var common_1 = require("./common");
module.exports = function (RED) {
    function Phidget22HubNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        var state = { didAttach: false };
        var hub = new phidget22.Hub();
        var invokeMethod = (0, common_1.getInvokePhidgetMethod)(node, config.debug);
        hub.onAttach = function () {
            var msg = { topic: 'Attach', payload: {} };
            state.didAttach = true;
            node.status({ fill: 'green', shape: 'dot', text: 'attached' });
            node.send(msg);
        };
        (0, common_1.setupPhidgetDevice)(hub, node, config);
        (0, common_1.openPhidgetDevice)(hub, 'Hub', node, state, config);
        node.on('input', function (msg) {
            switch (msg.topic) {
                case 'setPortPower': {
                    invokeMethod(function () { var _a, _b; return hub.setPortPower((_a = msg.payload) === null || _a === void 0 ? void 0 : _a.port, (_b = msg.payload) === null || _b === void 0 ? void 0 : _b.state); }, 'setPortPower');
                    break;
                }
                default: {
                    node.error('Unsupported message topic: ' + msg.topic);
                    break;
                }
            }
        });
    }
    RED.nodes.registerType('phidget22-hub', Phidget22HubNode);
};
