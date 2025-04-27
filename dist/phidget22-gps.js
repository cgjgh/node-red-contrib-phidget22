"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var phidget22 = require("phidget22-net");
var common_1 = require("./common");
module.exports = function (RED) {
    function Phidget22GPSNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        var state = { didAttach: false };
        var gps = new phidget22.GPS();
        gps.onAttach = function () {
            var msg = { topic: 'Attach', payload: {} };
            state.didAttach = true;
            node.status({ fill: 'green', shape: 'dot', text: 'attached' });
            node.send(msg);
        };
        gps.onHeadingChange = function (heading, velocity) {
            var msg = {
                topic: 'HeadingChange',
                payload: { heading: heading, velocity: velocity },
            };
            node.send(msg);
        };
        gps.onPositionChange = function (latitude, longitude, altitude) {
            var msg = {
                topic: 'PositionChange',
                payload: {
                    latitude: latitude,
                    longitude: longitude,
                    altitude: altitude,
                },
            };
            node.send(msg);
        };
        gps.onPositionFixStateChange = function (positionFixState) {
            var msg = {
                topic: 'PositionFixStateChange',
                payload: { positionFixState: positionFixState },
            };
            node.send(msg);
        };
        (0, common_1.setupPhidgetDevice)(gps, node, config);
        (0, common_1.openPhidgetDevice)(gps, 'GPS', node, state, config);
    }
    RED.nodes.registerType('phidget22-gps', Phidget22GPSNode);
};
