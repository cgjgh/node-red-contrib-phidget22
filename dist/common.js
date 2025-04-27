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
exports.openPhidgetDevice = exports.setupPhidgetDevice = exports.getInvokePhidgetMethod = exports.phidgetMethodErrorHandler = exports.isUnexpectedPhidgetError = exports.isUnsupportedPhidgetError = void 0;
var phidget22 = require("phidget22-net");
var PhidgetEvent;
(function (PhidgetEvent) {
    PhidgetEvent["ATTACH"] = "Attach";
    PhidgetEvent["DETACH"] = "Detach";
    PhidgetEvent["ERROR"] = "Error";
    PhidgetEvent["PROPERTY_CHANGE"] = "PropertyChange";
})(PhidgetEvent || (PhidgetEvent = {}));
// Matches the previous node behavior before there was a timeout option.
var DEFAULT_PHIDGET_OPEN_TIMEOUT = 5000;
var isUnsupportedPhidgetError = function (err) {
    return err instanceof phidget22.PhidgetError && err.errorCode == phidget22.ErrorCode.UNSUPPORTED;
};
exports.isUnsupportedPhidgetError = isUnsupportedPhidgetError;
var isUnexpectedPhidgetError = function (err) {
    return err instanceof phidget22.PhidgetError && err.errorCode == phidget22.ErrorCode.UNEXPECTED;
};
exports.isUnexpectedPhidgetError = isUnexpectedPhidgetError;
var phidgetMethodErrorHandler = function (err, label, node, debug) {
    if ((0, exports.isUnsupportedPhidgetError)(err)) {
        if (debug)
            node.warn("".concat(label, " not supported"));
    }
    else {
        node.error("".concat(label, " failed: ") + err);
    }
};
exports.phidgetMethodErrorHandler = phidgetMethodErrorHandler;
function getInvokePhidgetMethod(node, debug) {
    return function (method, label) {
        return __awaiter(this, void 0, void 0, function () {
            var response, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, method()];
                    case 1:
                        response = _a.sent();
                        if (debug) {
                            node.warn("".concat(label, " success"));
                        }
                        return [2 /*return*/, response];
                    case 2:
                        err_1 = _a.sent();
                        (0, exports.phidgetMethodErrorHandler)(err_1, label, node, debug);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
}
exports.getInvokePhidgetMethod = getInvokePhidgetMethod;
/**
 * Does the common setup for a phidgets device. This includes:
 * - Setting the parameters of the device to attach to (hub port, serial number, channel).
 * - Setting handlers for common events: onDetach, onError, onPropertyChange.
 * - Setting the node onClose handler (will close the phidgets device).
 * @param phidget - The phidgets device.
 * @param node - The Node-RED node object.
 * @param {number} [config.channel] - The phidgets channel.
 * @param {number} config.deviceSerialNumber - The phidgets device serial number. -1 if any.
 * @param {number} [config.hubPort] - The hub port the phidgets device is plugged into.
 * @param {boolean} [config.isHubPortDevice] - Whether this device is a hub port device.
 */
var setupPhidgetDevice = function (phidget, node, config) {
    // Common/required configuration.
    phidget.setDeviceSerialNumber(config.deviceSerialNumber);
    // Optional configuration depending on device type.
    if (config.channel !== undefined) {
        phidget.setChannel(config.channel);
    }
    if (config.hubPort !== undefined) {
        phidget.setHubPort(config.hubPort);
    }
    if (config.isHubPortDevice !== undefined) {
        phidget.setIsHubPortDevice(config.isHubPortDevice);
    }
    // Handlers for events.
    phidget.onDetach = function () {
        var msg = { topic: PhidgetEvent.DETACH, payload: {} };
        node.status({ fill: 'red', shape: 'ring', text: 'detached' });
        node.send(msg);
    };
    phidget.onError = function (code, description) {
        var msg = {
            topic: PhidgetEvent.ERROR,
            payload: { code: code, description: description },
        };
        node.send(msg);
    };
    phidget.onPropertyChange = function (propertyName) {
        var msg = {
            topic: PhidgetEvent.PROPERTY_CHANGE,
            payload: { propertyName: propertyName },
        };
        node.send(msg);
    };
    // Node close handler. Waits for device to close before invoking done callback.
    node.on('close', function (done) { return __awaiter(void 0, void 0, void 0, function () {
        var err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, phidget.close()];
                case 1:
                    _a.sent();
                    node.status({ fill: 'green', shape: 'ring', text: 'closed' });
                    done();
                    return [3 /*break*/, 3];
                case 2:
                    err_2 = _a.sent();
                    if ((0, exports.isUnexpectedPhidgetError)(err_2)) {
                        // Ignore error code 28: occurs when the connection closes before this node
                        node.debug('closed failed, ignoring: ' + err_2);
                        node.status({ fill: 'green', shape: 'ring', text: 'closed' });
                        done();
                    }
                    else {
                        node.error('close failed: ' + err_2);
                        node.status({ fill: 'red', shape: 'ring', text: 'close failed' });
                        done(err_2);
                    }
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
};
exports.setupPhidgetDevice = setupPhidgetDevice;
/**
 * Opens the phidget device.
 * @param {Phidget} phidget - The phidgets device.
 * @param {string} phidgetName - The display name for this phidget device type.
 * @param {Node} node - The Node-RED node object.
 * @param {number} [config.channel] - The phidgets channel.
 * @param {boolean} config.debug - Whether to print debug messages when the device is being sopened.
 * @param {number} config.deviceSerialNumber - The phidgets device serial number. -1 if any.
 * @param {number} [config.openTimeout] - The timeout for open. Defaults to 5 seconds.
 */
var openPhidgetDevice = function (phidget, phidgetName, node, state, config) {
    node.status({ fill: 'green', shape: 'ring', text: 'opening' });
    var openTimeout = config.openTimeout === undefined ? DEFAULT_PHIDGET_OPEN_TIMEOUT : config.openTimeout;
    if (config.debug)
        node.warn("Attempting to Open ".concat(phidgetName, " (SN: ").concat(config.deviceSerialNumber, ", Ch: ").concat(config.channel, ")"));
    phidget
        .open(openTimeout)
        .then(function () {
        if (config.debug) {
            if (config.channel) {
                node.warn("".concat(phidgetName, " Opened (SN: ").concat(config.deviceSerialNumber, ", Ch: ").concat(config.channel, ")"));
            }
            else {
                node.warn("".concat(phidgetName, " Opened (SN: ").concat(config.deviceSerialNumber, ")"));
            }
        }
        if (!state.didAttach) {
            // don't overwrite attached status if attach cb fired before open
            node.status({ fill: 'green', shape: 'ring', text: 'open' });
        }
    })
        .catch(function (err) {
        node.status({ fill: 'red', shape: 'dot', text: 'open failed' });
        node.error('Open failed: ' + err);
    });
};
exports.openPhidgetDevice = openPhidgetDevice;
