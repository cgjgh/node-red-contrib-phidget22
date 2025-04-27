"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var phidget22 = require("phidget22-net");
var common_1 = require("./common");
module.exports = function (RED) {
    function Phidget22BLDCMotorNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        var state = { didAttach: false };
        var bldcMotor = new phidget22.BLDCMotor();
        var invokeMethod = (0, common_1.getInvokePhidgetMethod)(node, config.debug);
        bldcMotor.onAttach = function () {
            invokeMethod(function () { return bldcMotor.setDataInterval(config.dataInterval); }, 'setDataInterval (in onAttach)');
            invokeMethod(function () { return bldcMotor.setRescaleFactor(config.rescaleFactor); }, 'setDataInterval (in onAttach)');
            invokeMethod(function () { return bldcMotor.setAcceleration(config.acceleration); }, 'setDataInterval (in onAttach)');
            invokeMethod(function () { return bldcMotor.setTargetBrakingStrength(config.targetBrakingStrength); }, 'setDataInterval (in onAttach)');
            invokeMethod(function () { return bldcMotor.setStallVelocity(config.stallVelocity); }, 'setDataInterval (in onAttach)');
            var msg = { topic: 'Attach', payload: {} };
            state.didAttach = true;
            node.status({ fill: 'green', shape: 'dot', text: 'attached' });
            node.send(msg);
        };
        bldcMotor.onPositionChange = function (position) {
            var msg = { topic: 'PositionChange', payload: { position: position } };
            node.send(msg);
        };
        bldcMotor.onVelocityUpdate = function (velocity) {
            var msg = { topic: 'VelocityUpdate', payload: { velocity: velocity } };
            node.send(msg);
        };
        bldcMotor.onBrakingStrengthChange = function (brakingStrength) {
            var msg = { topic: 'BrakingStrengthChange', payload: { brakingStrength: brakingStrength } };
            node.send(msg);
        };
        (0, common_1.setupPhidgetDevice)(bldcMotor, node, config);
        (0, common_1.openPhidgetDevice)(bldcMotor, 'BLDCMotor', node, state, config);
        node.on('input', function (msg) {
            switch (msg.topic) {
                case 'setAcceleration': {
                    invokeMethod(function () { var _a; return bldcMotor.setAcceleration((_a = msg.payload) === null || _a === void 0 ? void 0 : _a.acceleration); }, 'setAcceleration');
                    break;
                }
                case 'setDataInterval': {
                    invokeMethod(function () { var _a; return bldcMotor.setDataInterval((_a = msg.payload) === null || _a === void 0 ? void 0 : _a.dataInterval); }, 'setDataInterval');
                    break;
                }
                case 'enableFailsafe': {
                    invokeMethod(function () { var _a; return bldcMotor.enableFailsafe((_a = msg.payload) === null || _a === void 0 ? void 0 : _a.failsafeTime); }, 'enableFailsafe');
                    break;
                }
                case 'addPositionOffset': {
                    invokeMethod(function () { var _a; return bldcMotor.addPositionOffset((_a = msg.payload) === null || _a === void 0 ? void 0 : _a.positionOffset); }, 'addPositionOffset');
                    break;
                }
                case 'setRescaleFactor': {
                    invokeMethod(function () { var _a; return bldcMotor.setRescaleFactor((_a = msg.payload) === null || _a === void 0 ? void 0 : _a.rescaleFactor); }, 'setRescaleFactor');
                    break;
                }
                case 'resetFailsafe': {
                    invokeMethod(function () { return bldcMotor.resetFailsafe(); }, 'resetFailsafe');
                    break;
                }
                case 'setStallVelocity': {
                    invokeMethod(function () { var _a; return bldcMotor.setStallVelocity((_a = msg.payload) === null || _a === void 0 ? void 0 : _a.stallVelocity); }, 'setStallVelocity');
                    break;
                }
                case 'setTargetBrakingStrength': {
                    invokeMethod(function () { var _a; return bldcMotor.setTargetBrakingStrength((_a = msg.payload) === null || _a === void 0 ? void 0 : _a.targetBrakingStrength); }, 'setTargetBrakingStrength');
                    break;
                }
                case 'setTargetVelocity': {
                    invokeMethod(function () { var _a; return bldcMotor.setTargetVelocity((_a = msg.payload) === null || _a === void 0 ? void 0 : _a.targetVelocity); }, 'setTargetVelocity');
                    break;
                }
                default:
                    node.error('Unsupported message topic: ' + msg.topic);
                    break;
            }
        });
    }
    RED.nodes.registerType('phidget22-bldcmotor', Phidget22BLDCMotorNode);
};
