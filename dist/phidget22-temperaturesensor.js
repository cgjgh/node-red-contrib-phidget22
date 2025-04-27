"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var phidget22 = require("phidget22-net");
var common_1 = require("./common");
module.exports = function (RED) {
    function Phidget22TemperatureSensorNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        var state = { didAttach: false };
        var temperatureSensor = new phidget22.TemperatureSensor();
        var invokeMethod = (0, common_1.getInvokePhidgetMethod)(node, config.debug);
        temperatureSensor.onAttach = function () {
            invokeMethod(function () { return temperatureSensor.setDataInterval(config.dataInterval); }, 'setDataInterval (in onAttach)');
            invokeMethod(function () { return temperatureSensor.setTemperatureChangeTrigger(config.temperatureChangeTrigger); }, 'setTemperatureChangeTrigger (in onAttach)');
            invokeMethod(function () { return temperatureSensor.setRTDType(config.RTDType); }, 'setRTDType (in onAttach)');
            invokeMethod(function () { return temperatureSensor.setRTDWireSetup(config.RTDWireSetup); }, 'setRTDWireSetup (in onAttach)');
            invokeMethod(function () { return temperatureSensor.setThermocoupleType(config.thermocoupleType); }, 'setThermocoupleType (in onAttach)');
            var msg = { topic: 'Attach', payload: {} };
            state.didAttach = true;
            node.status({ fill: 'green', shape: 'dot', text: 'attached' });
            node.send(msg);
        };
        temperatureSensor.onTemperatureChange = function (temperature) {
            var msg = {
                topic: 'TemperatureChange',
                payload: { temperature: temperature },
            };
            node.send(msg);
        };
        (0, common_1.setupPhidgetDevice)(temperatureSensor, node, config);
        (0, common_1.openPhidgetDevice)(temperatureSensor, 'TemperatureSensor', node, state, config);
        node.on('input', function (msg) {
            switch (msg.topic) {
                case 'getDataInterval': {
                    var DataInterval = invokeMethod(function () { return temperatureSensor.getDataInterval(); }, 'getDataInterval');
                    msg.payload = { DataInterval: DataInterval };
                    node.send(msg);
                    break;
                }
                case 'setDataInterval': {
                    invokeMethod(function () { var _a; return temperatureSensor.setDataInterval((_a = msg.payload) === null || _a === void 0 ? void 0 : _a.dataInterval); }, 'setDataInterval');
                    break;
                }
                case 'getMinDataInterval': {
                    var MinDataInterval = invokeMethod(function () { return temperatureSensor.getMinDataInterval(); }, 'getMinDataInterval');
                    msg.payload = { MinDataInterval: MinDataInterval };
                    node.send(msg);
                    break;
                }
                case 'getMaxDataInterval': {
                    var MaxDataInterval = invokeMethod(function () { return temperatureSensor.getMaxDataInterval(); }, 'getMaxDataInterval');
                    msg.payload = { MaxDataInterval: MaxDataInterval };
                    node.send(msg);
                    break;
                }
                case 'getRTDType': {
                    var RTDType = invokeMethod(function () { return temperatureSensor.getRTDType(); }, 'getRTDType');
                    msg.payload = { RTDType: RTDType };
                    node.send(msg);
                    break;
                }
                case 'setRTDType': {
                    invokeMethod(function () { var _a; return temperatureSensor.setRTDType((_a = msg.payload) === null || _a === void 0 ? void 0 : _a.RTDType); }, 'setRTDType');
                    break;
                }
                case 'getRTDWireSetup': {
                    var RTDWireSetup = invokeMethod(function () { return temperatureSensor.getRTDWireSetup(); }, 'getRTDWireSetup');
                    msg.payload = { RTDWireSetup: RTDWireSetup };
                    node.send(msg);
                    break;
                }
                case 'setRTDWireSetup': {
                    invokeMethod(function () { var _a; return temperatureSensor.setRTDWireSetup((_a = msg.payload) === null || _a === void 0 ? void 0 : _a.RTDWireSetup); }, 'setRTDWireSetup');
                    break;
                }
                case 'getTemperature': {
                    var Temperature = invokeMethod(function () { return temperatureSensor.getTemperature(); }, 'getTemperature');
                    msg.payload = { Temperature: Temperature };
                    node.send(msg);
                    break;
                }
                case 'getMinTemperature': {
                    var MinTemperature = invokeMethod(function () { return temperatureSensor.getMinTemperature(); }, 'getMinTemperature');
                    msg.payload = { MinTemperature: MinTemperature };
                    node.send(msg);
                    break;
                }
                case 'getMaxTemperature': {
                    var MaxTemperature = invokeMethod(function () { return temperatureSensor.getMaxTemperature(); }, 'getMaxTemperature');
                    msg.payload = { MaxTemperature: MaxTemperature };
                    node.send(msg);
                    break;
                }
                case 'getTemperatureChangeTrigger': {
                    var TemperatureChangeTrigger = invokeMethod(function () { return temperatureSensor.getTemperatureChangeTrigger(); }, 'getTemperatureChangeTrigger');
                    msg.payload = { TemperatureChangeTrigger: TemperatureChangeTrigger };
                    node.send(msg);
                    break;
                }
                case 'setTemperatureChangeTrigger': {
                    invokeMethod(function () { var _a; return temperatureSensor.setTemperatureChangeTrigger((_a = msg.payload) === null || _a === void 0 ? void 0 : _a.temperatureChangeTrigger); }, 'setTemperatureChangeTrigger');
                    break;
                }
                case 'getMinTemperatureChangeTrigger': {
                    var MinTemperatureChangeTrigger = invokeMethod(function () { return temperatureSensor.getMinTemperatureChangeTrigger(); }, 'getMinTemperatureChangeTrigger');
                    msg.payload = { MinTemperatureChangeTrigger: MinTemperatureChangeTrigger };
                    node.send(msg);
                    break;
                }
                case 'getMaxTemperatureChangeTrigger': {
                    var MaxTemperatureChangeTrigger = invokeMethod(function () { return temperatureSensor.getMaxTemperatureChangeTrigger(); }, 'getMaxTemperatureChangeTrigger');
                    msg.payload = { MaxTemperatureChangeTrigger: MaxTemperatureChangeTrigger };
                    node.send(msg);
                    break;
                }
                case 'getThermocoupleType': {
                    var ThermocoupleType = invokeMethod(function () { return temperatureSensor.getThermocoupleType(); }, 'getThermocoupleType');
                    msg.payload = { ThermocoupleType: ThermocoupleType };
                    node.send(msg);
                    break;
                }
                case 'setThermocoupleType': {
                    invokeMethod(function () { var _a; return temperatureSensor.setThermocoupleType((_a = msg.payload) === null || _a === void 0 ? void 0 : _a.thermocoupleType); }, 'setThermocoupleType');
                    break;
                }
                default: {
                    node.error('Unsupported message topic: ' + msg.topic);
                    break;
                }
            }
        });
    }
    RED.nodes.registerType('phidget22-temperaturesensor', Phidget22TemperatureSensorNode);
};
