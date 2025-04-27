"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var phidget22 = require("phidget22-net");
var common_1 = require("./common");
module.exports = function (RED) {
    function Phidget22StepperNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        var state = { didAttach: false };
        var stepper = new phidget22.Stepper();
        var invokeMethod = (0, common_1.getInvokePhidgetMethod)(node, config.debug);
        stepper.onAttach = function () {
            invokeMethod(function () { return stepper.setDataInterval(config.dataInterval); }, 'setDataInterval (in onAttach)');
            invokeMethod(function () { return stepper.setAcceleration(config.acceleration); }, 'setAcceleration (in onAttach)');
            invokeMethod(function () { return stepper.setVelocityLimit(config.velocitylimit); }, 'setVelocityLimit (in onAttach)');
            invokeMethod(function () { return stepper.setCurrentLimit(config.currentLimit); }, 'setCurrentLimit (in onAttach)');
            invokeMethod(function () { return stepper.setHoldingCurrentLimit(config.holdingCurrentLimit); }, 'setHoldingCurrentLimit (in onAttach)');
            invokeMethod(function () { return stepper.setControlMode(config.controlMode); }, 'setControlMode (in onAttach)');
            var msg = { topic: 'Attach', payload: {} };
            state.didAttach = true;
            node.status({ fill: 'green', shape: 'dot', text: 'attached' });
            node.send(msg);
        };
        stepper.onPositionChange = function (position) {
            var msg = { topic: 'PositionChange', payload: { position: position } };
            node.send(msg);
        };
        stepper.onVelocityChange = function (velocity) {
            var msg = { topic: 'VelocityChange', payload: { velocity: velocity } };
            node.send(msg);
        };
        stepper.onStopped = function () {
            var msg = { topic: 'Stopped', payload: {} };
            node.send(msg);
        };
        (0, common_1.setupPhidgetDevice)(stepper, node, config);
        (0, common_1.openPhidgetDevice)(stepper, 'Stepper', node, state, config);
        node.on('input', function (msg) {
            switch (msg.topic) {
                case 'setAcceleration': {
                    invokeMethod(function () { var _a; return stepper.setAcceleration((_a = msg.payload) === null || _a === void 0 ? void 0 : _a.acceleration); }, 'setAcceleration');
                    break;
                }
                case 'setControlMode': {
                    invokeMethod(function () { var _a; return stepper.setControlMode((_a = msg.payload) === null || _a === void 0 ? void 0 : _a.controlMode); }, 'setControlMode');
                    break;
                }
                case 'setCurrentLimit': {
                    invokeMethod(function () { var _a; return stepper.setCurrentLimit((_a = msg.payload) === null || _a === void 0 ? void 0 : _a.currentLimit); }, 'setCurrentLimit');
                    break;
                }
                case 'setDataInterval': {
                    invokeMethod(function () { var _a; return stepper.setDataInterval((_a = msg.payload) === null || _a === void 0 ? void 0 : _a.dataInterval); }, 'setDataInterval');
                    break;
                }
                case 'setEngaged': {
                    invokeMethod(function () { var _a; return stepper.setEngaged((_a = msg.payload) === null || _a === void 0 ? void 0 : _a.engaged); }, 'setEngaged');
                    break;
                }
                case 'enableFailsafe': {
                    invokeMethod(function () { var _a; return stepper.enableFailsafe((_a = msg.payload) === null || _a === void 0 ? void 0 : _a.failsafeTime); }, 'enableFailsafe');
                    break;
                }
                case 'setHoldingCurrentLimit': {
                    invokeMethod(function () { var _a; return stepper.setHoldingCurrentLimit((_a = msg.payload) === null || _a === void 0 ? void 0 : _a.holdingCurrent); }, 'setHoldingCurrentLimit');
                    break;
                }
                case 'addPositionOffset': {
                    invokeMethod(function () { var _a; return stepper.addPositionOffset((_a = msg.payload) === null || _a === void 0 ? void 0 : _a.positionOffset); }, 'addPositionOffset');
                    break;
                }
                case 'setRescaleFactor': {
                    invokeMethod(function () { var _a; return stepper.setRescaleFactor((_a = msg.payload) === null || _a === void 0 ? void 0 : _a.rescaleFactor); }, 'setRescaleFactor');
                    break;
                }
                case 'resetFailsafe': {
                    invokeMethod(function () { return stepper.resetFailsafe(); }, 'resetFailsafe');
                    break;
                }
                case 'setTargetPosition': {
                    invokeMethod(function () { var _a; return stepper.setTargetPosition((_a = msg.payload) === null || _a === void 0 ? void 0 : _a.targetPosition); }, 'setTargetPosition');
                    break;
                }
                case 'setVelocityLimit': {
                    invokeMethod(function () { var _a; return stepper.setVelocityLimit((_a = msg.payload) === null || _a === void 0 ? void 0 : _a.velocityLimit); }, 'setVelocityLimit');
                    break;
                }
                default: {
                    node.error('Unsupported message topic: ' + msg.topic);
                    break;
                }
            }
        });
    }
    RED.nodes.registerType('phidget22-stepper', Phidget22StepperNode);
};
