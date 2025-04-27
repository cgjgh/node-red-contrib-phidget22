"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var phidget22 = require("phidget22-net");
var common_1 = require("./common");
module.exports = function (RED) {
    function Phidget22MotorPositionControllerNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        var state = { didAttach: false };
        var motorPositionController = new phidget22.MotorPositionController();
        var invokeMethod = (0, common_1.getInvokePhidgetMethod)(node, config.debug);
        motorPositionController.onAttach = function () {
            invokeMethod(function () { return motorPositionController.setDataInterval(config.dataInterval); }, 'setDataInterval (in onAttach)');
            invokeMethod(function () { return motorPositionController.setKp(config.kp); }, 'setKp (in onAttach)');
            invokeMethod(function () { return motorPositionController.setKi(config.ki); }, 'setKi (in onAttach)');
            invokeMethod(function () { return motorPositionController.setKd(config.kd); }, 'setKd (in onAttach)');
            invokeMethod(function () { return motorPositionController.setAcceleration(config.acceleration); }, 'setAcceleration (in onAttach)');
            invokeMethod(function () { return motorPositionController.setVelocityLimit(config.velocityLimit); }, 'setVelocityLimit (in onAttach)');
            invokeMethod(function () { return motorPositionController.setStallVelocity(config.stallVelocity); }, 'setStallVelocity (in onAttach)');
            invokeMethod(function () { return motorPositionController.setDeadBand(config.deadBand); }, 'setDeadBand (in onAttach)');
            var msg = { topic: 'Attach', payload: {} };
            state.didAttach = true;
            node.status({ fill: 'green', shape: 'dot', text: 'attached' });
            node.send(msg);
        };
        motorPositionController.onPositionChange = function (position) {
            var msg = { topic: 'PositionChange', payload: { position: position } };
            node.send(msg);
        };
        motorPositionController.onDutyCycleUpdate = function (dutyCycle) {
            var msg = {
                topic: 'DutyCycleUpdate',
                payload: { dutyCycle: dutyCycle },
            };
            node.send(msg);
        };
        (0, common_1.setupPhidgetDevice)(motorPositionController, node, config);
        (0, common_1.openPhidgetDevice)(motorPositionController, 'MotorPositionController', node, state, config);
        node.on('input', function (msg) {
            switch (msg.topic) {
                case 'getAcceleration': {
                    var Acceleration = invokeMethod(function () { return motorPositionController.getAcceleration(); }, 'getAcceleration');
                    msg.payload = { Acceleration: Acceleration };
                    node.send(msg);
                    break;
                }
                case 'setAcceleration': {
                    invokeMethod(function () { var _a; return motorPositionController.setAcceleration((_a = msg.payload) === null || _a === void 0 ? void 0 : _a.acceleration); }, 'setAcceleration');
                    break;
                }
                case 'getMinAcceleration': {
                    var MinAcceleration = invokeMethod(function () { return motorPositionController.getMinAcceleration(); }, 'getMinAcceleration');
                    msg.payload = { MinAcceleration: MinAcceleration };
                    node.send(msg);
                    break;
                }
                case 'getMaxAcceleration': {
                    var MaxAcceleration = invokeMethod(function () { return motorPositionController.getMaxAcceleration(); }, 'getMaxAcceleration');
                    msg.payload = { MaxAcceleration: MaxAcceleration };
                    node.send(msg);
                    break;
                }
                case 'getCurrentLimit': {
                    var CurrentLimit = invokeMethod(function () { return motorPositionController.getCurrentLimit(); }, 'getCurrentLimit');
                    msg.payload = { CurrentLimit: CurrentLimit };
                    node.send(msg);
                    break;
                }
                case 'setCurrentLimit': {
                    invokeMethod(function () { var _a; return motorPositionController.setCurrentLimit((_a = msg.payload) === null || _a === void 0 ? void 0 : _a.currentLimit); }, 'setCurrentLimit');
                    break;
                }
                case 'getMinCurrentLimit': {
                    var MinCurrentLimit = invokeMethod(function () { return motorPositionController.getMinCurrentLimit(); }, 'getMinCurrentLimit');
                    msg.payload = { MinCurrentLimit: MinCurrentLimit };
                    node.send(msg);
                    break;
                }
                case 'getMaxCurrentLimit': {
                    var MaxCurrentLimit = invokeMethod(function () { return motorPositionController.getMaxCurrentLimit(); }, 'getMaxCurrentLimit');
                    msg.payload = { MaxCurrentLimit: MaxCurrentLimit };
                    node.send(msg);
                    break;
                }
                case 'getCurrentRegulatorGain': {
                    var CurrentRegulatorGain = invokeMethod(function () { return motorPositionController.getCurrentRegulatorGain(); }, 'getCurrentRegulatorGain');
                    msg.payload = { CurrentRegulatorGain: CurrentRegulatorGain };
                    node.send(msg);
                    break;
                }
                case 'setCurrentRegulatorGain': {
                    invokeMethod(function () { var _a; return motorPositionController.setCurrentRegulatorGain((_a = msg.payload) === null || _a === void 0 ? void 0 : _a.currentRegulatorGain); }, 'setCurrentRegulatorGain');
                    break;
                }
                case 'getMinCurrentRegulatorGain': {
                    var MinCurrentRegulatorGain = invokeMethod(function () { return motorPositionController.getMinCurrentRegulatorGain(); }, 'getMinCurrentRegulatorGain');
                    msg.payload = { MinCurrentRegulatorGain: MinCurrentRegulatorGain };
                    node.send(msg);
                    break;
                }
                case 'getMaxCurrentRegulatorGain': {
                    var MaxCurrentRegulatorGain = invokeMethod(function () { return motorPositionController.getMaxCurrentRegulatorGain(); }, 'getMaxCurrentRegulatorGain');
                    msg.payload = { MaxCurrentRegulatorGain: MaxCurrentRegulatorGain };
                    node.send(msg);
                    break;
                }
                case 'getDataInterval': {
                    var DataInterval = invokeMethod(function () { return motorPositionController.getDataInterval(); }, 'getDataInterval');
                    msg.payload = { DataInterval: DataInterval };
                    node.send(msg);
                    break;
                }
                case 'setDataInterval': {
                    invokeMethod(function () { var _a; return motorPositionController.setDataInterval((_a = msg.payload) === null || _a === void 0 ? void 0 : _a.dataInterval); }, 'setDataInterval');
                    break;
                }
                case 'getMinDataInterval': {
                    var MinDataInterval = invokeMethod(function () { return motorPositionController.getMinDataInterval(); }, 'getMinDataInterval');
                    msg.payload = { MinDataInterval: MinDataInterval };
                    node.send(msg);
                    break;
                }
                case 'getMaxDataInterval': {
                    var MaxDataInterval = invokeMethod(function () { return motorPositionController.getMaxDataInterval(); }, 'getMaxDataInterval');
                    msg.payload = { MaxDataInterval: MaxDataInterval };
                    node.send(msg);
                    break;
                }
                case 'getDeadBand': {
                    var DeadBand = invokeMethod(function () { return motorPositionController.getDeadBand(); }, 'getDeadBand');
                    msg.payload = { DeadBand: DeadBand };
                    node.send(msg);
                    break;
                }
                case 'setDeadBand': {
                    invokeMethod(function () { var _a; return motorPositionController.setDeadBand((_a = msg.payload) === null || _a === void 0 ? void 0 : _a.deadBand); }, 'setDeadBand');
                    break;
                }
                case 'getDutyCycle': {
                    var DutyCycle = invokeMethod(function () { return motorPositionController.getDutyCycle(); }, 'getDutyCycle');
                    msg.payload = { DutyCycle: DutyCycle };
                    node.send(msg);
                    break;
                }
                case 'getEngaged': {
                    var Engaged = invokeMethod(function () { return motorPositionController.getEngaged(); }, 'getEngaged');
                    msg.payload = { Engaged: Engaged };
                    node.send(msg);
                    break;
                }
                case 'setEngaged': {
                    invokeMethod(function () { var _a; return motorPositionController.setEngaged((_a = msg.payload) === null || _a === void 0 ? void 0 : _a.engaged); }, 'setEngaged');
                    break;
                }
                case 'enableFailsafe': {
                    invokeMethod(function () { var _a; return motorPositionController.enableFailsafe((_a = msg.payload) === null || _a === void 0 ? void 0 : _a.failsafeTime); }, 'enableFailsafe');
                    break;
                }
                case 'getMinFailsafeTime': {
                    var MinFailsafeTime = invokeMethod(function () { return motorPositionController.getMinFailsafeTime(); }, 'getMinFailsafeTime');
                    msg.payload = { MinFailsafeTime: MinFailsafeTime };
                    node.send(msg);
                    break;
                }
                case 'getMaxFailsafeTime': {
                    var MaxFailsafeTime = invokeMethod(function () { return motorPositionController.getMaxFailsafeTime(); }, 'getMaxFailsafeTime');
                    msg.payload = { MaxFailsafeTime: MaxFailsafeTime };
                    node.send(msg);
                    break;
                }
                case 'getFanMode': {
                    var FanMode = invokeMethod(function () { return motorPositionController.getFanMode(); }, 'getFanMode');
                    msg.payload = { FanMode: FanMode };
                    node.send(msg);
                    break;
                }
                case 'setFanMode': {
                    invokeMethod(function () { var _a; return motorPositionController.setFanMode((_a = msg.payload) === null || _a === void 0 ? void 0 : _a.fanMode); }, 'setFanMode');
                    break;
                }
                case 'getIOMode': {
                    var IOMode = invokeMethod(function () { return motorPositionController.getIOMode(); }, 'getIOMode');
                    msg.payload = { IOMode: IOMode };
                    node.send(msg);
                    break;
                }
                case 'setIOMode': {
                    invokeMethod(function () { var _a; return motorPositionController.setIOMode((_a = msg.payload) === null || _a === void 0 ? void 0 : _a.IOMode); }, 'setIOMode');
                    break;
                }
                case 'getKd': {
                    var Kd = invokeMethod(function () { return motorPositionController.getKd(); }, 'getKd');
                    msg.payload = { Kd: Kd };
                    node.send(msg);
                    break;
                }
                case 'setKd': {
                    invokeMethod(function () { var _a; return motorPositionController.setKd((_a = msg.payload) === null || _a === void 0 ? void 0 : _a.kd); }, 'setKd');
                    break;
                }
                case 'getKi': {
                    var Ki = invokeMethod(function () { return motorPositionController.getKi(); }, 'getKi');
                    msg.payload = { Ki: Ki };
                    node.send(msg);
                    break;
                }
                case 'setKi': {
                    invokeMethod(function () { var _a; return motorPositionController.setKi((_a = msg.payload) === null || _a === void 0 ? void 0 : _a.ki); }, 'setKi');
                    break;
                }
                case 'getKp': {
                    var Kp = invokeMethod(function () { return motorPositionController.getKp(); }, 'getKp');
                    msg.payload = { Kp: Kp };
                    node.send(msg);
                    break;
                }
                case 'setKp': {
                    invokeMethod(function () { var _a; return motorPositionController.setKp((_a = msg.payload) === null || _a === void 0 ? void 0 : _a.kp); }, 'setKp');
                    break;
                }
                case 'getPosition': {
                    var Position = invokeMethod(function () { return motorPositionController.getPosition(); }, 'getPosition');
                    msg.payload = { Position: Position };
                    node.send(msg);
                    break;
                }
                case 'getMinPosition': {
                    var MinPosition = invokeMethod(function () { return motorPositionController.getMinPosition(); }, 'getMinPosition');
                    msg.payload = { MinPosition: MinPosition };
                    node.send(msg);
                    break;
                }
                case 'getMaxPosition': {
                    var MaxPosition = invokeMethod(function () { return motorPositionController.getMaxPosition(); }, 'getMaxPosition');
                    msg.payload = { MaxPosition: MaxPosition };
                    node.send(msg);
                    break;
                }
                case 'addPositionOffset': {
                    invokeMethod(function () { var _a; return motorPositionController.addPositionOffset((_a = msg.payload) === null || _a === void 0 ? void 0 : _a.positionOffset); }, 'addPositionOffset');
                    break;
                }
                case 'getRescaleFactor': {
                    var RescaleFactor = invokeMethod(function () { return motorPositionController.getRescaleFactor(); }, 'getRescaleFactor');
                    msg.payload = { RescaleFactor: RescaleFactor };
                    node.send(msg);
                    break;
                }
                case 'setRescaleFactor': {
                    invokeMethod(function () { var _a; return motorPositionController.setRescaleFactor((_a = msg.payload) === null || _a === void 0 ? void 0 : _a.rescaleFactor); }, 'setRescaleFactor');
                    break;
                }
                case 'resetFailsafe': {
                    invokeMethod(function () { return motorPositionController.resetFailsafe(); }, 'resetFailsafe');
                    break;
                }
                case 'getStallVelocity': {
                    var StallVelocity = invokeMethod(function () { return motorPositionController.getStallVelocity(); }, 'getStallVelocity');
                    msg.payload = { StallVelocity: StallVelocity };
                    node.send(msg);
                    break;
                }
                case 'setStallVelocity': {
                    invokeMethod(function () { var _a; return motorPositionController.setStallVelocity((_a = msg.payload) === null || _a === void 0 ? void 0 : _a.stallVelocity); }, 'setStallVelocity');
                    break;
                }
                case 'getMinStallVelocity': {
                    var MinStallVelocity = invokeMethod(function () { return motorPositionController.getMinStallVelocity(); }, 'getMinStallVelocity');
                    msg.payload = { MinStallVelocity: MinStallVelocity };
                    node.send(msg);
                    break;
                }
                case 'getMaxStallVelocity': {
                    var MaxStallVelocity = invokeMethod(function () { return motorPositionController.getMaxStallVelocity(); }, 'getMaxStallVelocity');
                    msg.payload = { MaxStallVelocity: MaxStallVelocity };
                    node.send(msg);
                    break;
                }
                case 'getTargetPosition': {
                    var TargetPosition = invokeMethod(function () { return motorPositionController.getTargetPosition(); }, 'getTargetPosition');
                    msg.payload = { TargetPosition: TargetPosition };
                    node.send(msg);
                    break;
                }
                case 'setTargetPosition': {
                    invokeMethod(function () { var _a; return motorPositionController.setTargetPosition((_a = msg.payload) === null || _a === void 0 ? void 0 : _a.targetPosition); }, 'setTargetPosition');
                    break;
                }
                case 'getVelocityLimit': {
                    var VelocityLimit = invokeMethod(function () { return motorPositionController.getVelocityLimit(); }, 'getVelocityLimit');
                    msg.payload = { VelocityLimit: VelocityLimit };
                    node.send(msg);
                    break;
                }
                case 'setVelocityLimit': {
                    invokeMethod(function () { var _a; return motorPositionController.setVelocityLimit((_a = msg.payload) === null || _a === void 0 ? void 0 : _a.velocityLimit); }, 'setVelocityLimit');
                    break;
                }
                case 'getMinVelocityLimit': {
                    var MinVelocityLimit = invokeMethod(function () { return motorPositionController.getMinVelocityLimit(); }, 'getMinVelocityLimit');
                    msg.payload = { MinVelocityLimit: MinVelocityLimit };
                    node.send(msg);
                    break;
                }
                case 'getMaxVelocityLimit': {
                    var MaxVelocityLimit = invokeMethod(function () { return motorPositionController.getMaxVelocityLimit(); }, 'getMaxVelocityLimit');
                    msg.payload = { MaxVelocityLimit: MaxVelocityLimit };
                    node.send(msg);
                    break;
                }
                default: {
                    node.error('Unsupported message topic: ' + msg.topic);
                    break;
                }
            }
        });
    }
    RED.nodes.registerType('phidget22-motorpositioncontroller', Phidget22MotorPositionControllerNode);
};
