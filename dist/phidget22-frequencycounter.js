"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var phidget22 = require("phidget22-net");
var common_1 = require("./common");
module.exports = function (RED) {
    function Phidget22FrequencyCounterNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        var state = { didAttach: false };
        var frequencyCounter = new phidget22.FrequencyCounter();
        var invokeMethod = (0, common_1.getInvokePhidgetMethod)(node, config.debug);
        frequencyCounter.onAttach = function () {
            invokeMethod(function () { return frequencyCounter.setDataInterval(config.dataInterval); }, 'setDataInterval (in onAttach)');
            invokeMethod(function () { return frequencyCounter.setFrequencyCutoff(config.frequencyCutoff); }, 'setFrequencyCutoff (in onAttach)');
            invokeMethod(function () { return frequencyCounter.setFilterType(config.filterType); }, 'setFilterType (in onAttach)');
            invokeMethod(function () { return frequencyCounter.setInputMode(config.inputMode); }, 'setInputMode (in onAttach)');
            invokeMethod(function () { return frequencyCounter.setPowerSupply(config.powerSupply); }, 'setPowerSupply (in onAttach)');
            var msg = { topic: 'Attach', payload: {} };
            state.didAttach = true;
            node.status({ fill: 'green', shape: 'dot', text: 'attached' });
            node.send(msg);
        };
        frequencyCounter.onCountChange = function (counts, timeChange) {
            var msg = {
                topic: 'CountChange',
                payload: { counts: counts, timeChange: timeChange },
            };
            node.send(msg);
        };
        frequencyCounter.onFrequencyChange = function (frequency) {
            var msg = {
                topic: 'FrequencyChange',
                payload: { frequency: frequency },
            };
            node.send(msg);
        };
        (0, common_1.setupPhidgetDevice)(frequencyCounter, node, config);
        (0, common_1.openPhidgetDevice)(frequencyCounter, 'FrequencyCounter', node, state, config);
        node.on('input', function (msg) {
            switch (msg.topic) {
                case 'setEnabled': {
                    invokeMethod(function () { var _a; return frequencyCounter.setEnabled((_a = msg.payload) === null || _a === void 0 ? void 0 : _a.enabled); }, 'setEnabled');
                    break;
                }
                case 'setDataInterval': {
                    invokeMethod(function () { var _a; return frequencyCounter.setDataInterval((_a = msg.payload) === null || _a === void 0 ? void 0 : _a.dataInterval); }, 'setDataInterval');
                    break;
                }
                case 'setFilterType': {
                    invokeMethod(function () { var _a; return frequencyCounter.setFilterType((_a = msg.payload) === null || _a === void 0 ? void 0 : _a.filterType); }, 'setFilterType');
                    break;
                }
                case 'setFrequencyCutoff': {
                    invokeMethod(function () { var _a; return frequencyCounter.setFrequencyCutoff((_a = msg.payload) === null || _a === void 0 ? void 0 : _a.frequencyCutoff); }, 'setFrequencyCutoff');
                    break;
                }
                case 'setInputMode': {
                    invokeMethod(function () { var _a; return frequencyCounter.setInputMode((_a = msg.payload) === null || _a === void 0 ? void 0 : _a.inputMode); }, 'setInputMode');
                    break;
                }
                case 'setPowerSupply': {
                    invokeMethod(function () { var _a; return frequencyCounter.setPowerSupply((_a = msg.payload) === null || _a === void 0 ? void 0 : _a.powerSupply); }, 'setPowerSupply');
                    break;
                }
                case 'reset': {
                    invokeMethod(function () { return frequencyCounter.reset(); }, 'reset');
                    break;
                }
                default: {
                    node.error('Unsupported message topic: ' + msg.topic);
                    break;
                }
            }
        });
    }
    RED.nodes.registerType('phidget22-frequencycounter', Phidget22FrequencyCounterNode);
};
