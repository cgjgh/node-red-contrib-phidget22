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
    function Phidget22DictionaryNode(config) {
        var _this = this;
        RED.nodes.createNode(this, config);
        var node = this;
        var state = { didAttach: false };
        var dictionary = new phidget22.Dictionary();
        var invokeMethod = (0, common_1.getInvokePhidgetMethod)(node, config.debug);
        if (config.label !== '')
            dictionary.setDeviceLabel(config.label);
        dictionary.onAttach = function () {
            var msg = { topic: 'Attach', payload: {} };
            state.didAttach = true;
            node.status({ fill: 'green', shape: 'dot', text: 'attached' });
            node.send(msg);
        };
        dictionary.onAdd = function (key, value) {
            var msg = { topic: 'Add', payload: { key: key, value: value } };
            node.send(msg);
        };
        dictionary.onRemove = function (key) {
            var msg = { topic: 'Remove', payload: { key: key } };
            node.send(msg);
        };
        dictionary.onUpdate = function (key, value) {
            var msg = { topic: 'Update', payload: { key: key, value: value } };
            node.send(msg);
        };
        (0, common_1.setupPhidgetDevice)(dictionary, node, config);
        (0, common_1.openPhidgetDevice)(dictionary, 'Dictionary', node, state, config);
        node.on('input', function (msg) { return __awaiter(_this, void 0, void 0, function () {
            var _a, value, keyList;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = msg.topic;
                        switch (_a) {
                            case 'add': return [3 /*break*/, 1];
                            case 'get': return [3 /*break*/, 2];
                            case 'removeAll': return [3 /*break*/, 4];
                            case 'remove': return [3 /*break*/, 5];
                            case 'scan': return [3 /*break*/, 6];
                            case 'set': return [3 /*break*/, 8];
                            case 'update': return [3 /*break*/, 9];
                        }
                        return [3 /*break*/, 10];
                    case 1:
                        {
                            invokeMethod(function () { var _a, _b; return dictionary.add((_a = msg.payload) === null || _a === void 0 ? void 0 : _a.key, (_b = msg.payload) === null || _b === void 0 ? void 0 : _b.value); }, 'add');
                            return [3 /*break*/, 11];
                        }
                        _b.label = 2;
                    case 2: return [4 /*yield*/, invokeMethod(function () { return dictionary.get(msg.payload.key, msg.payload.def); }, 'get')];
                    case 3:
                        value = _b.sent();
                        msg.payload = { value: value };
                        node.send(msg);
                        return [3 /*break*/, 11];
                    case 4:
                        {
                            invokeMethod(function () { return dictionary.removeAll(); }, 'removeAll');
                            return [3 /*break*/, 11];
                        }
                        _b.label = 5;
                    case 5:
                        {
                            invokeMethod(function () { return dictionary.remove(msg.payload.key); }, 'remove');
                            return [3 /*break*/, 11];
                        }
                        _b.label = 6;
                    case 6: return [4 /*yield*/, invokeMethod(function () { return dictionary.scan(msg.payload.start); }, 'scan')];
                    case 7:
                        keyList = _b.sent();
                        msg.payload = { keyList: keyList };
                        node.send(msg);
                        return [3 /*break*/, 11];
                    case 8:
                        {
                            invokeMethod(function () { return dictionary.set(msg.payload.key, msg.payload.value); }, 'set');
                            return [3 /*break*/, 11];
                        }
                        _b.label = 9;
                    case 9:
                        {
                            invokeMethod(function () { return dictionary.update(msg.payload.key, msg.payload.value); }, 'update');
                            return [3 /*break*/, 11];
                        }
                        _b.label = 10;
                    case 10:
                        {
                            node.error('Unsupported message topic: ' + msg.topic);
                            return [3 /*break*/, 11];
                        }
                        _b.label = 11;
                    case 11: return [2 /*return*/];
                }
            });
        }); });
    }
    RED.nodes.registerType('phidget22-dictionary', Phidget22DictionaryNode);
};
