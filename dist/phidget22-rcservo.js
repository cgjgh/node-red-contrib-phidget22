"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var phidget22 = require("phidget22-net");
var common_1 = require("./common");
module.exports = function (RED) {
    function Phidget22RCServoNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        var state = { didAttach: false };
        var rcServo = new phidget22.RCServo();
        var invokeMethod = (0, common_1.getInvokePhidgetMethod)(node, config.debug);
        rcServo.onAttach = function () {
            invokeMethod(function () { return rcServo.setDataInterval(config.dataInterval); }, 'setDataInterval (in onAttach)');
            invokeMethod(function () { return rcServo.setAcceleration(config.acceleration); }, 'setAcceleration (in onAttach)');
            invokeMethod(function () { return rcServo.setSpeedRampingState(config.speedRampingState); }, 'setSpeedRampingState (in onAttach)');
            invokeMethod(function () { return rcServo.setVelocityLimit(config.velocityLimit); }, 'setVelocityLimit (in onAttach)');
            invokeMethod(function () { return rcServo.setVoltage(config.voltage); }, 'setVoltage (in onAttach)');
            invokeMethod(function () { return rcServo.setMinPulseWidth(config.minPulseWidth); }, 'setMinPulseWidth (in onAttach)');
            invokeMethod(function () { return rcServo.setMaxPulseWidth(config.maxPulseWidth); }, 'setMaxPulseWidth (in onAttach)');
            invokeMethod(function () { return rcServo.setMinPosition(config.minPosition); }, 'setMinPosition (in onAttach)');
            invokeMethod(function () { return rcServo.setMaxPosition(config.maxPosition); }, 'setMaxPosition (in onAttach)');
            var msg = { topic: 'Attach', payload: {} };
            state.didAttach = true;
            node.status({ fill: 'green', shape: 'dot', text: 'attached' });
            node.send(msg);
        };
        rcServo.onPositionChange = function (position) {
            var msg = { topic: 'PositionChange', payload: { position: position } };
            node.send(msg);
        };
        rcServo.onTargetPositionReached = function (position) {
            var msg = {
                topic: 'TargetPositionReached',
                payload: { position: position },
            };
            node.send(msg);
        };
        rcServo.onVelocityChange = function (velocity) {
            var msg = { topic: 'VelocityChange', payload: { velocity: velocity } };
            node.send(msg);
        };
        (0, common_1.setupPhidgetDevice)(rcServo, node, config);
        (0, common_1.openPhidgetDevice)(rcServo, 'RCServo', node, state, config);
        node.on('input', function (msg) {
            switch (msg.topic) {
                case 'setAcceleration': {
                    invokeMethod(function () { var _a; return rcServo.setAcceleration((_a = msg.payload) === null || _a === void 0 ? void 0 : _a.acceleration); }, 'setAcceleration');
                    break;
                }
                case 'setDataInterval': {
                    invokeMethod(function () { var _a; return rcServo.setDataInterval((_a = msg.payload) === null || _a === void 0 ? void 0 : _a.dataInterval); }, 'setDataInterval');
                    break;
                }
                case 'setEngaged': {
                    invokeMethod(function () { var _a; return rcServo.setEngaged((_a = msg.payload) === null || _a === void 0 ? void 0 : _a.engaged); }, 'setEngaged');
                    break;
                }
                case 'enableFailsafe': {
                    invokeMethod(function () { var _a; return rcServo.enableFailsafe((_a = msg.payload) === null || _a === void 0 ? void 0 : _a.failsafeTime); }, 'enableFailsafe');
                    break;
                }
                case 'setMinPosition': {
                    invokeMethod(function () { var _a; return rcServo.setMinPosition((_a = msg.payload) === null || _a === void 0 ? void 0 : _a.minPosition); }, 'setMinPosition');
                    break;
                }
                case 'setMaxPosition': {
                    invokeMethod(function () { var _a; return rcServo.setMaxPosition((_a = msg.payload) === null || _a === void 0 ? void 0 : _a.maxPosition); }, 'setMaxPosition');
                    break;
                }
                case 'setMinPulseWidth': {
                    invokeMethod(function () { var _a; return rcServo.setMinPulseWidth((_a = msg.payload) === null || _a === void 0 ? void 0 : _a.minPulseWidth); }, 'setMinPulseWidth');
                    break;
                }
                case 'setMaxPulseWidth': {
                    invokeMethod(function () { var _a; return rcServo.setMaxPulseWidth((_a = msg.payload) === null || _a === void 0 ? void 0 : _a.maxPulseWidth); }, 'setMaxPulseWidth');
                    break;
                }
                case 'resetFailsafe': {
                    invokeMethod(function () { return rcServo.resetFailsafe(); }, 'resetFailsafe');
                    break;
                }
                case 'setSpeedRampingState': {
                    invokeMethod(function () { var _a; return rcServo.setSpeedRampingState((_a = msg.payload) === null || _a === void 0 ? void 0 : _a.speedRampingState); }, 'setSpeedRampingState');
                    break;
                }
                case 'setTargetPosition': {
                    invokeMethod(function () { var _a; return rcServo.setTargetPosition((_a = msg.payload) === null || _a === void 0 ? void 0 : _a.targetPosition); }, 'setTargetPosition');
                    break;
                }
                case 'setTorque': {
                    invokeMethod(function () { var _a; return rcServo.setTorque((_a = msg.payload) === null || _a === void 0 ? void 0 : _a.torque); }, 'setTorque');
                    break;
                }
                case 'setVelocityLimit': {
                    invokeMethod(function () { var _a; return rcServo.setVelocityLimit((_a = msg.payload) === null || _a === void 0 ? void 0 : _a.velocityLimit); }, 'setVelocityLimit');
                    break;
                }
                case 'setVoltage': {
                    invokeMethod(function () { var _a; return rcServo.setVoltage((_a = msg.payload) === null || _a === void 0 ? void 0 : _a.voltage); }, 'setVoltage');
                    break;
                }
                default: {
                    node.error('Unsupported message topic: ' + msg.topic);
                    break;
                }
            }
        });
    }
    RED.nodes.registerType('phidget22-rcservo', Phidget22RCServoNode);
};
