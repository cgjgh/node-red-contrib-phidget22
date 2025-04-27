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
    function Phidget22LCDNode(config) {
        var _this = this;
        RED.nodes.createNode(this, config);
        var node = this;
        var state = { didAttach: false };
        var lcd = new phidget22.LCD();
        var invokeMethod = (0, common_1.getInvokePhidgetMethod)(node, config.debug);
        lcd.onAttach = function () {
            invokeMethod(function () { return lcd.setScreenSize(config.screenSize); }, 'setScreenSize (in onAttach)');
            var msg = { topic: 'Attach', payload: {} };
            state.didAttach = true;
            node.status({ fill: 'green', shape: 'dot', text: 'attached' });
            node.send(msg);
        };
        (0, common_1.setupPhidgetDevice)(lcd, node, config);
        (0, common_1.openPhidgetDevice)(lcd, 'LCD', node, state, config);
        node.on('input', function (msg) { return __awaiter(_this, void 0, void 0, function () {
            var _a, Backlight, MinBacklight, MaxBacklight, MaxCharacters, Contrast, MinContrast, MaxContrast, CursorBlink, CursorOn, FontSize, FrameBuffer, Height, ScreenSize, Sleeping, Width;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = msg.topic;
                        switch (_a) {
                            case 'getBacklight': return [3 /*break*/, 1];
                            case 'setBacklight': return [3 /*break*/, 3];
                            case 'getMinBacklight': return [3 /*break*/, 4];
                            case 'getMaxBacklight': return [3 /*break*/, 6];
                            case 'setCharacterBitmap': return [3 /*break*/, 8];
                            case 'getMaxCharacters': return [3 /*break*/, 9];
                            case 'clear': return [3 /*break*/, 11];
                            case 'getContrast': return [3 /*break*/, 12];
                            case 'setContrast': return [3 /*break*/, 14];
                            case 'getMinContrast': return [3 /*break*/, 15];
                            case 'getMaxContrast': return [3 /*break*/, 17];
                            case 'copy': return [3 /*break*/, 19];
                            case 'getCursorBlink': return [3 /*break*/, 20];
                            case 'setCursorBlink': return [3 /*break*/, 22];
                            case 'getCursorOn': return [3 /*break*/, 23];
                            case 'setCursorOn': return [3 /*break*/, 25];
                            case 'drawLine': return [3 /*break*/, 26];
                            case 'drawPixel': return [3 /*break*/, 27];
                            case 'drawRect': return [3 /*break*/, 28];
                            case 'flush': return [3 /*break*/, 29];
                            case 'getFontSize': return [3 /*break*/, 30];
                            case 'setFontSize': return [3 /*break*/, 32];
                            case 'getFrameBuffer': return [3 /*break*/, 33];
                            case 'setFrameBuffer': return [3 /*break*/, 35];
                            case 'getHeight': return [3 /*break*/, 36];
                            case 'initialize': return [3 /*break*/, 38];
                            case 'saveFrameBuffer': return [3 /*break*/, 39];
                            case 'getScreenSize': return [3 /*break*/, 40];
                            case 'setScreenSize': return [3 /*break*/, 42];
                            case 'getSleeping': return [3 /*break*/, 43];
                            case 'setSleeping': return [3 /*break*/, 45];
                            case 'getWidth': return [3 /*break*/, 46];
                            case 'writeBitmap': return [3 /*break*/, 48];
                            case 'writeText': return [3 /*break*/, 49];
                        }
                        return [3 /*break*/, 50];
                    case 1: return [4 /*yield*/, invokeMethod(function () { return lcd.getBacklight(); }, 'getBacklight')];
                    case 2:
                        Backlight = _b.sent();
                        msg.payload = { Backlight: Backlight };
                        node.send(msg);
                        return [3 /*break*/, 51];
                    case 3:
                        {
                            invokeMethod(function () { var _a; return lcd.setBacklight((_a = msg.payload) === null || _a === void 0 ? void 0 : _a.backlight); }, 'setBacklight');
                            return [3 /*break*/, 51];
                        }
                        _b.label = 4;
                    case 4: return [4 /*yield*/, invokeMethod(function () { return lcd.getMinBacklight(); }, 'getMinBacklight')];
                    case 5:
                        MinBacklight = _b.sent();
                        msg.payload = { MinBacklight: MinBacklight };
                        node.send(msg);
                        return [3 /*break*/, 51];
                    case 6: return [4 /*yield*/, invokeMethod(function () { return lcd.getMaxBacklight(); }, 'getMaxBacklight')];
                    case 7:
                        MaxBacklight = _b.sent();
                        msg.payload = { MaxBacklight: MaxBacklight };
                        node.send(msg);
                        return [3 /*break*/, 51];
                    case 8:
                        {
                            invokeMethod(function () {
                                var _a, _b, _c;
                                return lcd.setCharacterBitmap((_a = msg.payload) === null || _a === void 0 ? void 0 : _a.font, (_b = msg.payload) === null || _b === void 0 ? void 0 : _b.character, (_c = msg.payload) === null || _c === void 0 ? void 0 : _c.bitmap);
                            }, 'setCharacterBitmap');
                            return [3 /*break*/, 51];
                        }
                        _b.label = 9;
                    case 9: return [4 /*yield*/, invokeMethod(function () { var _a; return lcd.getMaxCharacters((_a = msg.payload) === null || _a === void 0 ? void 0 : _a.font); }, 'getMaxCharacters')];
                    case 10:
                        MaxCharacters = _b.sent();
                        msg.payload = { MaxCharacters: MaxCharacters };
                        node.send(msg);
                        return [3 /*break*/, 51];
                    case 11:
                        {
                            invokeMethod(function () { return lcd.clear(); }, 'clear');
                            return [3 /*break*/, 51];
                        }
                        _b.label = 12;
                    case 12: return [4 /*yield*/, invokeMethod(function () { return lcd.getContrast(); }, 'getContrast')];
                    case 13:
                        Contrast = _b.sent();
                        msg.payload = { Contrast: Contrast };
                        node.send(msg);
                        return [3 /*break*/, 51];
                    case 14:
                        {
                            invokeMethod(function () { var _a; return lcd.setContrast((_a = msg.payload) === null || _a === void 0 ? void 0 : _a.contrast); }, 'setContrast');
                            return [3 /*break*/, 51];
                        }
                        _b.label = 15;
                    case 15: return [4 /*yield*/, invokeMethod(function () { return lcd.getMinContrast(); }, 'getMinContrast')];
                    case 16:
                        MinContrast = _b.sent();
                        msg.payload = { MinContrast: MinContrast };
                        node.send(msg);
                        return [3 /*break*/, 51];
                    case 17: return [4 /*yield*/, invokeMethod(function () { return lcd.getMaxContrast(); }, 'getMaxContrast')];
                    case 18:
                        MaxContrast = _b.sent();
                        msg.payload = { MaxContrast: MaxContrast };
                        node.send(msg);
                        return [3 /*break*/, 51];
                    case 19:
                        {
                            invokeMethod(function () {
                                var _a, _b, _c, _d, _e, _f, _g, _h, _j;
                                return lcd.copy((_a = msg.payload) === null || _a === void 0 ? void 0 : _a.sourceFramebuffer, (_b = msg.payload) === null || _b === void 0 ? void 0 : _b.destFramebuffer, (_c = msg.payload) === null || _c === void 0 ? void 0 : _c.sourceX1, (_d = msg.payload) === null || _d === void 0 ? void 0 : _d.sourceY1, (_e = msg.payload) === null || _e === void 0 ? void 0 : _e.sourceX2, (_f = msg.payload) === null || _f === void 0 ? void 0 : _f.sourceY2, (_g = msg.payload) === null || _g === void 0 ? void 0 : _g.destX, (_h = msg.payload) === null || _h === void 0 ? void 0 : _h.destY, (_j = msg.payload) === null || _j === void 0 ? void 0 : _j.inverted);
                            }, 'copy');
                            return [3 /*break*/, 51];
                        }
                        _b.label = 20;
                    case 20: return [4 /*yield*/, invokeMethod(function () { return lcd.getCursorBlink(); }, 'getCursorBlink')];
                    case 21:
                        CursorBlink = _b.sent();
                        msg.payload = { CursorBlink: CursorBlink };
                        node.send(msg);
                        return [3 /*break*/, 51];
                    case 22:
                        {
                            invokeMethod(function () { var _a; return lcd.setCursorBlink((_a = msg.payload) === null || _a === void 0 ? void 0 : _a.cursorBlink); }, 'setCursorBlink');
                            return [3 /*break*/, 51];
                        }
                        _b.label = 23;
                    case 23: return [4 /*yield*/, invokeMethod(function () { return lcd.getCursorOn(); }, 'getCursorOn')];
                    case 24:
                        CursorOn = _b.sent();
                        msg.payload = { CursorOn: CursorOn };
                        node.send(msg);
                        return [3 /*break*/, 51];
                    case 25:
                        {
                            invokeMethod(function () { var _a; return lcd.setCursorOn((_a = msg.payload) === null || _a === void 0 ? void 0 : _a.cursorOn); }, 'setCursorOn');
                            return [3 /*break*/, 51];
                        }
                        _b.label = 26;
                    case 26:
                        {
                            invokeMethod(function () { var _a, _b, _c, _d; return lcd.drawLine((_a = msg.payload) === null || _a === void 0 ? void 0 : _a.x1, (_b = msg.payload) === null || _b === void 0 ? void 0 : _b.y1, (_c = msg.payload) === null || _c === void 0 ? void 0 : _c.x2, (_d = msg.payload) === null || _d === void 0 ? void 0 : _d.y2); }, 'drawLine');
                            return [3 /*break*/, 51];
                        }
                        _b.label = 27;
                    case 27:
                        {
                            invokeMethod(function () { var _a, _b, _c; return lcd.drawPixel((_a = msg.payload) === null || _a === void 0 ? void 0 : _a.x, (_b = msg.payload) === null || _b === void 0 ? void 0 : _b.y, (_c = msg.payload) === null || _c === void 0 ? void 0 : _c.pixelState); }, 'drawPixel');
                            return [3 /*break*/, 51];
                        }
                        _b.label = 28;
                    case 28:
                        {
                            invokeMethod(function () {
                                var _a, _b, _c, _d, _e, _f;
                                return lcd.drawRect((_a = msg.payload) === null || _a === void 0 ? void 0 : _a.x1, (_b = msg.payload) === null || _b === void 0 ? void 0 : _b.y1, (_c = msg.payload) === null || _c === void 0 ? void 0 : _c.x2, (_d = msg.payload) === null || _d === void 0 ? void 0 : _d.y2, (_e = msg.payload) === null || _e === void 0 ? void 0 : _e.filled, (_f = msg.payload) === null || _f === void 0 ? void 0 : _f.inverted);
                            }, 'drawRect');
                            return [3 /*break*/, 51];
                        }
                        _b.label = 29;
                    case 29:
                        {
                            invokeMethod(function () { return lcd.flush(); }, 'flush');
                            return [3 /*break*/, 51];
                        }
                        _b.label = 30;
                    case 30: return [4 /*yield*/, invokeMethod(function () { var _a; return lcd.getFontSize((_a = msg.payload) === null || _a === void 0 ? void 0 : _a.font); }, 'getFontSize')];
                    case 31:
                        FontSize = _b.sent();
                        msg.payload = { FontSize: FontSize };
                        node.send(msg);
                        return [3 /*break*/, 51];
                    case 32:
                        {
                            invokeMethod(function () { var _a, _b, _c; return lcd.setFontSize((_a = msg.payload) === null || _a === void 0 ? void 0 : _a.font, (_b = msg.payload) === null || _b === void 0 ? void 0 : _b.width, (_c = msg.payload) === null || _c === void 0 ? void 0 : _c.height); }, 'setFontSize');
                            return [3 /*break*/, 51];
                        }
                        _b.label = 33;
                    case 33: return [4 /*yield*/, invokeMethod(function () { return lcd.getFrameBuffer(); }, 'getFrameBuffer')];
                    case 34:
                        FrameBuffer = _b.sent();
                        msg.payload = { FrameBuffer: FrameBuffer };
                        node.send(msg);
                        return [3 /*break*/, 51];
                    case 35:
                        {
                            invokeMethod(function () { var _a; return lcd.setFrameBuffer((_a = msg.payload) === null || _a === void 0 ? void 0 : _a.frameBuffer); }, 'setFrameBuffer');
                            return [3 /*break*/, 51];
                        }
                        _b.label = 36;
                    case 36: return [4 /*yield*/, invokeMethod(function () { return lcd.getHeight(); }, 'getHeight')];
                    case 37:
                        Height = _b.sent();
                        msg.payload = { Height: Height };
                        node.send(msg);
                        return [3 /*break*/, 51];
                    case 38:
                        {
                            invokeMethod(function () { return lcd.initialize(); }, 'initialize');
                            return [3 /*break*/, 51];
                        }
                        _b.label = 39;
                    case 39:
                        {
                            invokeMethod(function () { var _a; return lcd.saveFrameBuffer((_a = msg.payload) === null || _a === void 0 ? void 0 : _a.frameBuffer); }, 'saveFrameBuffer');
                            return [3 /*break*/, 51];
                        }
                        _b.label = 40;
                    case 40: return [4 /*yield*/, invokeMethod(function () { return lcd.getScreenSize(); }, 'getScreenSize')];
                    case 41:
                        ScreenSize = _b.sent();
                        msg.payload = { ScreenSize: ScreenSize };
                        node.send(msg);
                        return [3 /*break*/, 51];
                    case 42:
                        {
                            invokeMethod(function () { var _a; return lcd.setScreenSize((_a = msg.payload) === null || _a === void 0 ? void 0 : _a.screenSize); }, 'setScreenSize');
                            return [3 /*break*/, 51];
                        }
                        _b.label = 43;
                    case 43: return [4 /*yield*/, invokeMethod(function () { return lcd.getSleeping(); }, 'getSleeping')];
                    case 44:
                        Sleeping = _b.sent();
                        msg.payload = { Sleeping: Sleeping };
                        node.send(msg);
                        return [3 /*break*/, 51];
                    case 45:
                        {
                            invokeMethod(function () { var _a; return lcd.setSleeping((_a = msg.payload) === null || _a === void 0 ? void 0 : _a.sleeping); }, 'setSleeping');
                            return [3 /*break*/, 51];
                        }
                        _b.label = 46;
                    case 46: return [4 /*yield*/, invokeMethod(function () { return lcd.getWidth(); }, 'getWidth')];
                    case 47:
                        Width = _b.sent();
                        msg.payload = { Width: Width };
                        node.send(msg);
                        return [3 /*break*/, 51];
                    case 48:
                        {
                            invokeMethod(function () {
                                var _a, _b, _c, _d, _e;
                                return lcd.writeBitmap((_a = msg.payload) === null || _a === void 0 ? void 0 : _a.xPosition, (_b = msg.payload) === null || _b === void 0 ? void 0 : _b.yPosition, (_c = msg.payload) === null || _c === void 0 ? void 0 : _c.xSize, (_d = msg.payload) === null || _d === void 0 ? void 0 : _d.ySize, (_e = msg.payload) === null || _e === void 0 ? void 0 : _e.bitmap);
                            }, 'writeBitmap');
                            return [3 /*break*/, 51];
                        }
                        _b.label = 49;
                    case 49:
                        {
                            invokeMethod(function () {
                                var _a, _b, _c, _d;
                                return lcd.writeText((_a = msg.payload) === null || _a === void 0 ? void 0 : _a.font, (_b = msg.payload) === null || _b === void 0 ? void 0 : _b.xPosition, (_c = msg.payload) === null || _c === void 0 ? void 0 : _c.yPosition, (_d = msg.payload) === null || _d === void 0 ? void 0 : _d.text);
                            }, 'writeText');
                            return [3 /*break*/, 51];
                        }
                        _b.label = 50;
                    case 50:
                        {
                            node.error('Unsupported message topic: ' + msg.topic);
                            return [3 /*break*/, 51];
                        }
                        _b.label = 51;
                    case 51: return [2 /*return*/];
                }
            });
        }); });
    }
    RED.nodes.registerType('phidget22-lcd', Phidget22LCDNode);
};
