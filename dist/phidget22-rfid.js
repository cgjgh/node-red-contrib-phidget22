"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var phidget22 = require("phidget22-net");
var common_1 = require("./common");
module.exports = function (RED) {
    function Phidget22RFIDNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        var state = { didAttach: false };
        var rfid = new phidget22.RFID();
        var invokeMethod = (0, common_1.getInvokePhidgetMethod)(node, config.debug);
        rfid.onAttach = function () {
            var msg = { topic: 'Attach', payload: {} };
            state.didAttach = true;
            node.status({ fill: 'green', shape: 'dot', text: 'attached' });
            node.send(msg);
        };
        rfid.onTag = function (tag, protocol) {
            var msg = { topic: 'Tag', payload: { tag: tag, protocol: protocol } };
            node.send(msg);
        };
        rfid.onTagLost = function (tag, protocol) {
            var msg = {
                topic: 'TagLost',
                payload: { tag: tag, protocol: protocol },
            };
            node.send(msg);
        };
        (0, common_1.setupPhidgetDevice)(rfid, node, config);
        (0, common_1.openPhidgetDevice)(rfid, 'RFID', node, state, config);
        node.on('input', function (msg) {
            switch (msg.topic) {
                case 'setAntennaEnabled': {
                    invokeMethod(function () { var _a; return rfid.setAntennaEnabled((_a = msg.payload) === null || _a === void 0 ? void 0 : _a.antennaEnabled); }, 'setAntennaEnabled');
                    break;
                }
                case 'write': {
                    invokeMethod(function () { var _a, _b, _c; return rfid.write((_a = msg.payload) === null || _a === void 0 ? void 0 : _a.tagString, (_b = msg.payload) === null || _b === void 0 ? void 0 : _b.protocol, (_c = msg.payload) === null || _c === void 0 ? void 0 : _c.lockTag); }, 'write');
                    break;
                }
                default: {
                    node.error('Unsupported message topic: ' + msg.topic);
                    break;
                }
            }
        });
    }
    RED.nodes.registerType('phidget22-rfid', Phidget22RFIDNode);
};
