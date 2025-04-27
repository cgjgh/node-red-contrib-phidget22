"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var phidget22 = require("phidget22-net");
var common_1 = require("./common");
module.exports = function (RED) {
    function Phidget22DCMotorNode(config) {
        var _this = this;
        RED.nodes.createNode(this, config);
        var node = this;
        var state = { didAttach: false };
        var dcMotor = new phidget22.DCMotor();
        var invokeMethod = (0, common_1.getInvokePhidgetMethod)(node, config.debug);
        dcMotor.onAttach = function () {
            invokeMethod(function () { return dcMotor.setDataInterval(config.dataInterval); }, 'setDataInterval (in onAttach)');
            invokeMethod(function () { return dcMotor.setBackEMFSensingState(config.backEMFSensingState); }, 'setBackEMFSensingState (in onAttach)');
            invokeMethod(function () { return dcMotor.setAcceleration(config.acceleration); }, 'setAcceleration (in onAttach)');
            invokeMethod(function () { return dcMotor.setCurrentLimit(config.currentLimit); }, 'setCurrentLimit (in onAttach)');
            invokeMethod(function () { return dcMotor.setCurrentRegulatorGain(config.currentRegulatorGain); }, 'setCurrentRegulatorGain');
            invokeMethod(function () { return dcMotor.setTargetBrakingStrength(config.targetBrakingStrength); }, 'setTargetBrakingStrength');
            invokeMethod(function () { return dcMotor.setFanMode(config.fanMode); }, 'setFanMode');
            var msg = { topic: 'Attach', payload: {} };
            state.didAttach = true;
            node.status({ fill: 'green', shape: 'dot', text: 'attached' });
            node.send(msg);
        };
        dcMotor.onBackEMFChange = function (backEMF) {
            var msg = { topic: 'BackEMFChange', payload: { backEMF: backEMF } };
            node.send(msg);
        };
        dcMotor.onBrakingStrengthChange = function (brakingStrength) {
            var msg = {
                topic: 'BrakingStrengthChange',
                payload: { brakingStrength: brakingStrength },
            };
            node.send(msg);
        };
        dcMotor.onVelocityUpdate = function (velocity) {
            var msg = { topic: 'VelocityUpdate', payload: { velocity: velocity } };
            node.send(msg);
        };
        (0, common_1.setupPhidgetDevice)(dcMotor, node, config);
        (0, common_1.openPhidgetDevice)(dcMotor, 'DCMotor', node, state, config);
        node.on('input', function (msg) { return __awaiter(_this, void 0, void 0, function () {
            var _a, Acceleration, MinAcceleration, MaxAcceleration, BackEMF, BackEMFSensingState, BrakingStrength, MinBrakingStrength, MaxBrakingStrength, CurrentLimit, MinCurrentLimit, MaxCurrentLimit, CurrentRegulatorGain, MinCurrentRegulatorGain, MaxCurrentRegulatorGain, DataInterval, MinDataInterval, MaxDataInterval, MinFailsafeTime, MaxFailsafeTime, FanMode, TargetBrakingStrength, TargetVelocity, Velocity, MinVelocity, MaxVelocity;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = msg.topic;
                        switch (_a) {
                            case 'getAcceleration': return [3 /*break*/, 1];
                            case 'setAcceleration': return [3 /*break*/, 3];
                            case 'getMinAcceleration': return [3 /*break*/, 4];
                            case 'getMaxAcceleration': return [3 /*break*/, 6];
                            case 'getBackEMF': return [3 /*break*/, 8];
                            case 'getBackEMFSensingState': return [3 /*break*/, 10];
                            case 'setBackEMFSensingState': return [3 /*break*/, 12];
                            case 'getBrakingStrength': return [3 /*break*/, 13];
                            case 'getMinBrakingStrength': return [3 /*break*/, 15];
                            case 'getMaxBrakingStrength': return [3 /*break*/, 17];
                            case 'getCurrentLimit': return [3 /*break*/, 19];
                            case 'setCurrentLimit': return [3 /*break*/, 21];
                            case 'getMinCurrentLimit': return [3 /*break*/, 22];
                            case 'getMaxCurrentLimit': return [3 /*break*/, 24];
                            case 'getCurrentRegulatorGain': return [3 /*break*/, 26];
                            case 'setCurrentRegulatorGain': return [3 /*break*/, 28];
                            case 'getMinCurrentRegulatorGain': return [3 /*break*/, 29];
                            case 'getMaxCurrentRegulatorGain': return [3 /*break*/, 31];
                            case 'getDataInterval': return [3 /*break*/, 33];
                            case 'setDataInterval': return [3 /*break*/, 35];
                            case 'getMinDataInterval': return [3 /*break*/, 36];
                            case 'getMaxDataInterval': return [3 /*break*/, 38];
                            case 'enableFailsafe': return [3 /*break*/, 40];
                            case 'getMinFailsafeTime': return [3 /*break*/, 41];
                            case 'getMaxFailsafeTime': return [3 /*break*/, 43];
                            case 'resetFailsafe': return [3 /*break*/, 45];
                            case 'getFanMode': return [3 /*break*/, 46];
                            case 'setFanMode': return [3 /*break*/, 48];
                            case 'getTargetBrakingStrength': return [3 /*break*/, 49];
                            case 'setTargetBrakingStrength': return [3 /*break*/, 51];
                            case 'getTargetVelocity': return [3 /*break*/, 52];
                            case 'setTargetVelocity': return [3 /*break*/, 54];
                            case 'getVelocity': return [3 /*break*/, 55];
                            case 'getMinVelocity': return [3 /*break*/, 57];
                            case 'getMaxVelocity': return [3 /*break*/, 59];
                        }
                        return [3 /*break*/, 61];
                    case 1: return [4 /*yield*/, invokeMethod(function () { return dcMotor.getAcceleration(); }, 'getAcceleration')];
                    case 2:
                        Acceleration = _b.sent();
                        msg.payload = { Acceleration: Acceleration };
                        node.send(msg);
                        return [3 /*break*/, 62];
                    case 3:
                        {
                            invokeMethod(function () { var _a; return dcMotor.setAcceleration((_a = msg.payload) === null || _a === void 0 ? void 0 : _a.acceleration); }, 'setAcceleration');
                            return [3 /*break*/, 62];
                        }
                        _b.label = 4;
                    case 4: return [4 /*yield*/, invokeMethod(function () { return dcMotor.getMinAcceleration(); }, 'getMinAcceleration')];
                    case 5:
                        MinAcceleration = _b.sent();
                        msg.payload = { MinAcceleration: MinAcceleration };
                        node.send(msg);
                        return [3 /*break*/, 62];
                    case 6: return [4 /*yield*/, invokeMethod(function () { return dcMotor.getMaxAcceleration(); }, 'getMaxAcceleration')];
                    case 7:
                        MaxAcceleration = _b.sent();
                        msg.payload = { MaxAcceleration: MaxAcceleration };
                        node.send(msg);
                        return [3 /*break*/, 62];
                    case 8: return [4 /*yield*/, invokeMethod(function () { return dcMotor.getBackEMF(); }, 'getBackEMF')];
                    case 9:
                        BackEMF = _b.sent();
                        msg.payload = { BackEMF: BackEMF };
                        node.send(msg);
                        return [3 /*break*/, 62];
                    case 10: return [4 /*yield*/, invokeMethod(function () { return dcMotor.getBackEMFSensingState(); }, 'getBackEMFSensingState')];
                    case 11:
                        BackEMFSensingState = _b.sent();
                        msg.payload = { BackEMFSensingState: BackEMFSensingState };
                        node.send(msg);
                        return [3 /*break*/, 62];
                    case 12:
                        {
                            invokeMethod(function () { var _a; return dcMotor.setBackEMFSensingState((_a = msg.payload) === null || _a === void 0 ? void 0 : _a.backEMFSensingState); }, 'setBackEMFSensingState');
                            return [3 /*break*/, 62];
                        }
                        _b.label = 13;
                    case 13: return [4 /*yield*/, invokeMethod(function () { return dcMotor.getBrakingStrength(); }, 'getBrakingStrength')];
                    case 14:
                        BrakingStrength = _b.sent();
                        msg.payload = { BrakingStrength: BrakingStrength };
                        node.send(msg);
                        return [3 /*break*/, 62];
                    case 15: return [4 /*yield*/, invokeMethod(function () { return dcMotor.getMinBrakingStrength(); }, 'getMinBrakingStrength')];
                    case 16:
                        MinBrakingStrength = _b.sent();
                        msg.payload = { MinBrakingStrength: MinBrakingStrength };
                        return [3 /*break*/, 62];
                    case 17: return [4 /*yield*/, invokeMethod(function () { return dcMotor.getMaxBrakingStrength(); }, 'getMaxBrakingStrength')];
                    case 18:
                        MaxBrakingStrength = _b.sent();
                        msg.payload = { MaxBrakingStrength: MaxBrakingStrength };
                        node.send(msg);
                        return [3 /*break*/, 62];
                    case 19: return [4 /*yield*/, invokeMethod(function () { return dcMotor.getCurrentLimit(); }, 'getCurrentLimit')];
                    case 20:
                        CurrentLimit = _b.sent();
                        msg.payload = { CurrentLimit: CurrentLimit };
                        node.send(msg);
                        return [3 /*break*/, 62];
                    case 21:
                        {
                            invokeMethod(function () { var _a; return dcMotor.setCurrentLimit((_a = msg.payload) === null || _a === void 0 ? void 0 : _a.currentLimit); }, 'setCurrentLimit');
                            return [3 /*break*/, 62];
                        }
                        _b.label = 22;
                    case 22: return [4 /*yield*/, invokeMethod(function () { return dcMotor.getMinCurrentLimit(); }, 'getMinCurrentLimit')];
                    case 23:
                        MinCurrentLimit = _b.sent();
                        msg.payload = { MinCurrentLimit: MinCurrentLimit };
                        node.send(msg);
                        return [3 /*break*/, 62];
                    case 24: return [4 /*yield*/, invokeMethod(function () { return dcMotor.getMaxCurrentLimit(); }, 'getMaxCurrentLimit')];
                    case 25:
                        MaxCurrentLimit = _b.sent();
                        msg.payload = { MaxCurrentLimit: MaxCurrentLimit };
                        node.send(msg);
                        return [3 /*break*/, 62];
                    case 26: return [4 /*yield*/, invokeMethod(function () { return dcMotor.getCurrentRegulatorGain(); }, 'getCurrentRegulatorGain')];
                    case 27:
                        CurrentRegulatorGain = _b.sent();
                        msg.payload = { CurrentRegulatorGain: CurrentRegulatorGain };
                        node.send(msg);
                        return [3 /*break*/, 62];
                    case 28:
                        {
                            invokeMethod(function () { var _a; return dcMotor.setCurrentRegulatorGain((_a = msg.payload) === null || _a === void 0 ? void 0 : _a.currentRegulatorGain); }, 'setCurrentRegulatorGain');
                            return [3 /*break*/, 62];
                        }
                        _b.label = 29;
                    case 29: return [4 /*yield*/, invokeMethod(function () { return dcMotor.getMinCurrentRegulatorGain(); }, 'getMinCurrentRegulatorGain')];
                    case 30:
                        MinCurrentRegulatorGain = _b.sent();
                        msg.payload = { MinCurrentRegulatorGain: MinCurrentRegulatorGain };
                        node.send(msg);
                        return [3 /*break*/, 62];
                    case 31: return [4 /*yield*/, invokeMethod(function () { return dcMotor.getMaxCurrentRegulatorGain(); }, 'getMaxCurrentRegulatorGain')];
                    case 32:
                        MaxCurrentRegulatorGain = _b.sent();
                        msg.payload = { MaxCurrentRegulatorGain: MaxCurrentRegulatorGain };
                        node.send(msg);
                        return [3 /*break*/, 62];
                    case 33: return [4 /*yield*/, invokeMethod(function () { return dcMotor.getDataInterval(); }, 'getDataInterval')];
                    case 34:
                        DataInterval = _b.sent();
                        msg.payload = { DataInterval: DataInterval };
                        node.send(msg);
                        return [3 /*break*/, 62];
                    case 35:
                        {
                            invokeMethod(function () { var _a; return dcMotor.setDataInterval((_a = msg.payload) === null || _a === void 0 ? void 0 : _a.dataInterval); }, 'setDataInterval');
                            return [3 /*break*/, 62];
                        }
                        _b.label = 36;
                    case 36: return [4 /*yield*/, invokeMethod(function () { return dcMotor.getMinDataInterval(); }, 'getMinDataInterval')];
                    case 37:
                        MinDataInterval = _b.sent();
                        msg.payload = { MinDataInterval: MinDataInterval };
                        node.send(msg);
                        return [3 /*break*/, 62];
                    case 38: return [4 /*yield*/, invokeMethod(function () { return dcMotor.getMaxDataInterval(); }, 'getMaxDataInterval')];
                    case 39:
                        MaxDataInterval = _b.sent();
                        msg.payload = { MaxDataInterval: MaxDataInterval };
                        node.send(msg);
                        return [3 /*break*/, 62];
                    case 40:
                        {
                            invokeMethod(function () { var _a; return dcMotor.enableFailsafe((_a = msg.payload) === null || _a === void 0 ? void 0 : _a.failsafeTime); }, 'enableFailsafe');
                            return [3 /*break*/, 62];
                        }
                        _b.label = 41;
                    case 41: return [4 /*yield*/, invokeMethod(function () { return dcMotor.getMinFailsafeTime(); }, 'getMinFailsafeTime')];
                    case 42:
                        MinFailsafeTime = _b.sent();
                        msg.payload = { MinFailsafeTime: MinFailsafeTime };
                        node.send(msg);
                        return [3 /*break*/, 62];
                    case 43: return [4 /*yield*/, invokeMethod(function () { return dcMotor.getMaxFailsafeTime(); }, 'getMaxFailsafeTime')];
                    case 44:
                        MaxFailsafeTime = _b.sent();
                        msg.payload = { MaxFailsafeTime: MaxFailsafeTime };
                        node.send(msg);
                        return [3 /*break*/, 62];
                    case 45:
                        {
                            invokeMethod(function () { return dcMotor.resetFailsafe(); }, 'resetFailsafe');
                            return [3 /*break*/, 62];
                        }
                        _b.label = 46;
                    case 46: return [4 /*yield*/, invokeMethod(function () { return dcMotor.getFanMode(); }, 'getFanMode')];
                    case 47:
                        FanMode = _b.sent();
                        msg.payload = { FanMode: FanMode };
                        node.send(msg);
                        return [3 /*break*/, 62];
                    case 48:
                        {
                            invokeMethod(function () { var _a; return dcMotor.setFanMode((_a = msg.payload) === null || _a === void 0 ? void 0 : _a.fanMode); }, 'setFanMode');
                            return [3 /*break*/, 62];
                        }
                        _b.label = 49;
                    case 49: return [4 /*yield*/, invokeMethod(function () { return dcMotor.getTargetBrakingStrength(); }, 'getTargetBrakingStrength')];
                    case 50:
                        TargetBrakingStrength = _b.sent();
                        msg.payload = { TargetBrakingStrength: TargetBrakingStrength };
                        node.send(msg);
                        return [3 /*break*/, 62];
                    case 51:
                        {
                            invokeMethod(function () { var _a; return dcMotor.setTargetBrakingStrength((_a = msg.payload) === null || _a === void 0 ? void 0 : _a.targetBrakingStrength); }, 'setTargetBrakingStrength');
                            return [3 /*break*/, 62];
                        }
                        _b.label = 52;
                    case 52: return [4 /*yield*/, invokeMethod(function () { return dcMotor.getTargetVelocity(); }, 'getTargetVelocity')];
                    case 53:
                        TargetVelocity = _b.sent();
                        msg.payload = { TargetVelocity: TargetVelocity };
                        node.send(msg);
                        return [3 /*break*/, 62];
                    case 54:
                        {
                            invokeMethod(function () { var _a; return dcMotor.setTargetVelocity((_a = msg.payload) === null || _a === void 0 ? void 0 : _a.targetVelocity); }, 'setTargetVelocity');
                            return [3 /*break*/, 62];
                        }
                        _b.label = 55;
                    case 55: return [4 /*yield*/, invokeMethod(function () { return dcMotor.getVelocity(); }, 'getVelocity')];
                    case 56:
                        Velocity = _b.sent();
                        msg.payload = { Velocity: Velocity };
                        node.send(msg);
                        return [3 /*break*/, 62];
                    case 57: return [4 /*yield*/, invokeMethod(function () { return dcMotor.getMinVelocity(); }, 'getMinVelocity')];
                    case 58:
                        MinVelocity = _b.sent();
                        msg.payload = { MinVelocity: MinVelocity };
                        node.send(msg);
                        return [3 /*break*/, 62];
                    case 59: return [4 /*yield*/, invokeMethod(function () { return dcMotor.getMaxVelocity(); }, 'getMaxVelocity')];
                    case 60:
                        MaxVelocity = _b.sent();
                        msg.payload = { MaxVelocity: MaxVelocity };
                        node.send(msg);
                        return [3 /*break*/, 62];
                    case 61:
                        {
                            node.error('Unsupported message topic: ' + msg.topic);
                            return [3 /*break*/, 62];
                        }
                        _b.label = 62;
                    case 62: return [2 /*return*/];
                }
            });
        }); });
    }
    RED.nodes.registerType('phidget22-dcmotor', Phidget22DCMotorNode);
};
