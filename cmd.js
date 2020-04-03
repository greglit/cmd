"use strict";
/// <reference path="Command.ts" />
/// <reference path="Glitch.ts" />
/// <reference path="Utility.ts" />
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
        while (_) try {
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
var cmd;
(function (cmd) {
    var cmdC;
    $(document).ready(function () {
        cmdC = new CommandController();
        $('#prompt-indicator').text(cmdC.activeCmd.promptIndicatorText);
        cmdC.displayText = $('#display').text();
        updateSize();
        $('#textbox').val('').focus();
        $('#bottom-space').height($(window).height() - $('#prompt-indicator').height() - $('#display').height());
    });
    $(window).on('resize', function () {
        updateSize();
    });
    function updateSize() {
        $('#textbox').width($('body').innerWidth() - $('#prompt-indicator').width());
    }
    $(document).on('click', function () {
        $('#textbox').focus();
    });
    document.onkeydown = function (e) {
        switch (e.keyCode) {
            case 13: //enter 
                if (cmdC.inputEnabled) {
                    cmdC.readInput();
                }
                break;
            case 38: //up
                cmdC.histUp();
                break;
            case 40: //down
                cmdC.histDown();
                break;
            case 9: //tab
            case 39: //right
                cmdC.doAutoFill();
                break;
            default:
                cmdC.autofillInput = '';
        }
    };
    var CommandController = /** @class */ (function () {
        function CommandController() {
            this.displayText = '';
            this.firstEnter = true;
            this.inputEnabled = false;
            this.hist = [];
            this.histIndex = 0;
            this.autofillInput = '';
            this.lastAutofill = '';
            this.defaultDelay = 5;
            this.files = {
                'log1': { type: 'txt', content: '|01| Tue May 22nd 2087\n|02|\n|03| today nothing happened' },
                'log2': { type: 'txt', content: '|01| Mon June 13th 2087\n|02|\n|03| nothing happend today' },
                'lucy': { type: 'txt', content: '|01|\n|02|\n|03|\n|04| PW: sunflower' },
                'virus': { type: 'img', content: '<img src="media/art.png"></img>' }
            };
            this.activeCmd = new cmd.Default(this);
            this.enableInput();
            this.glitch = new cmd.Glitch();
        }
        /*----CommandDelegate----*/
        CommandController.prototype.switchActiveCommandTo = function (command) {
            $('#prompt-indicator').text(command.promptIndicatorText);
            updateSize();
            $('#textbox').focus();
            this.activeCmd = command;
        };
        CommandController.prototype.getFiles = function () {
            return this.files;
        };
        CommandController.prototype.printText = function (out, delayTenthseconds, newLine) {
            if (delayTenthseconds === void 0) { delayTenthseconds = this.defaultDelay; }
            if (newLine === void 0) { newLine = true; }
            return __awaiter(this, void 0, void 0, function () {
                var _i, out_1, char;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.displayText += newLine ? '\n' : '';
                            _i = 0, out_1 = out;
                            _a.label = 1;
                        case 1:
                            if (!(_i < out_1.length)) return [3 /*break*/, 4];
                            char = out_1[_i];
                            this.displayText += char;
                            $('#display').text(this.displayText);
                            updateSize();
                            return [4 /*yield*/, cmd.wait(delayTenthseconds)];
                        case 2:
                            _a.sent();
                            _a.label = 3;
                        case 3:
                            _i++;
                            return [3 /*break*/, 1];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        CommandController.prototype.enableInput = function () {
            $('#textbox').css('display', 'inline-block').val('').focus();
            $('#prompt-indicator').css('display', 'inline-block');
            this.inputEnabled = true;
        };
        CommandController.prototype.disableInput = function () {
            this.inputEnabled = false;
            $('#textbox').css('display', 'none');
            $('#prompt-indicator').css('display', 'none');
        };
        /*----CommandDelegate----*/
        CommandController.prototype.readInput = function () {
            return __awaiter(this, void 0, void 0, function () {
                var input;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            input = String($('#textbox').val());
                            if (!(this.displayText.slice(-2) == '\n' || this.firstEnter)) {
                                this.displayText += '\n';
                            }
                            this.firstEnter = false;
                            this.displayText += this.activeCmd.promptIndicatorText + cmd.rmvSpace(input);
                            $('#display').text(this.displayText);
                            $('#textbox').val('');
                            updateSize();
                            if (!(input != '')) return [3 /*break*/, 2];
                            this.disableInput();
                            this.hist.push(input);
                            this.histIndex = this.hist.length;
                            return [4 /*yield*/, this.activeCmd.evalInput(input)];
                        case 1:
                            _a.sent();
                            this.enableInput();
                            _a.label = 2;
                        case 2: return [2 /*return*/];
                    }
                });
            });
        };
        CommandController.prototype.histUp = function () {
            if (this.histIndex >= 0 && this.hist.length > 0) {
                if (this.histIndex > 0) {
                    this.histIndex -= 1;
                }
                $('#textbox').val(this.hist[this.histIndex]);
            }
        };
        CommandController.prototype.histDown = function () {
            if (this.histIndex <= this.hist.length - 1 && this.hist.length > 0) {
                if (this.histIndex < this.hist.length - 1) {
                    this.histIndex += 1;
                }
                $('#textbox').val(this.hist[this.histIndex]);
            }
        };
        CommandController.prototype.doAutoFill = function () {
            var autofillList = this.activeCmd.getAutofillList(cmd.rmvSpace(this.autofillInput));
            if (this.autofillInput == '') {
                this.autofillInput = String($('#textbox').val());
            }
            if (this.autofillInput == '') {
                return;
            }
            var startIndex = 0;
            if (String($('#textbox').val()) == this.lastAutofill) {
                var autoIndex = autofillList.indexOf(this.lastAutofill);
                startIndex = autoIndex == autofillList.length - 1 ? 0 : autoIndex + 1;
            }
            var searchDuration = 0;
            for (var j = startIndex; j < autofillList.length; j++) {
                if (autofillList[j].slice(0, this.autofillInput.length) == this.autofillInput) {
                    $('#textbox').val(autofillList[j]);
                    $('#textbox').focus();
                    this.lastAutofill = autofillList[j];
                    break;
                }
                if (searchDuration > autofillList.length) {
                    break;
                }
                searchDuration++;
                if (j == autofillList.length - 1) {
                    j = -1;
                }
            }
        };
        return CommandController;
    }());
    cmd.CommandController = CommandController;
})(cmd || (cmd = {}));
