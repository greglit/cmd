/// <reference path="cmd.ts" />
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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
    var Command = /** @class */ (function () {
        function Command(delegate) {
            this.promptIndicatorText = '';
            this.commands = [];
            this.delegate = delegate;
        }
        Command.prototype.evalInput = function (text) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/];
                });
            });
        };
        Command.prototype.help = function () {
            return __awaiter(this, void 0, void 0, function () {
                var out, _i, _a, command;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            out = '================================\nschreibe dies und ich verstehe: \n';
                            for (_i = 0, _a = this.commands; _i < _a.length; _i++) {
                                command = _a[_i];
                                out += command + '\n';
                            }
                            return [4 /*yield*/, this.delegate.printText(out.slice(0, -1) + '================================')];
                        case 1:
                            _b.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        Command.prototype.getAutofillList = function (input) {
            return this.commands;
        };
        return Command;
    }());
    cmd.Command = Command;
    var Default = /** @class */ (function (_super) {
        __extends(Default, _super);
        function Default(delegate) {
            var _this = _super.call(this, delegate) || this;
            _this.promptIndicatorText = 'Schreibe hier:';
            _this.commands = [
                'hilfe',
                'grußkarte',
                'liebe',
                'texte',
                'vorlesen'
            ];
            return _this;
        }
        Default.prototype.getAutofillList = function (input) {
            switch (input) {
                case 'open':
                    var list = [];
                    for (var key in this.delegate.getFiles()) {
                        list.push('open ' + key);
                    }
                    return list;
                default:
                    return _super.prototype.getAutofillList.call(this, input);
            }
        };
        Default.prototype.evalInput = function (text) {
            return __awaiter(this, void 0, void 0, function () {
                var command, args, _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            command = text.substr(0, text.indexOf(' '));
                            args = text.substr(text.indexOf(' ') + 1);
                            if (command == '') {
                                command = args;
                                args = '';
                            }
                            _a = command;
                            switch (_a) {
                                case 'hilfe': return [3 /*break*/, 1];
                                case 'liebe': return [3 /*break*/, 3];
                                case 'grußkarte': return [3 /*break*/, 5];
                                case 'texte': return [3 /*break*/, 7];
                                case 'vorlesen': return [3 /*break*/, 9];
                            }
                            return [3 /*break*/, 11];
                        case 1: return [4 /*yield*/, this.help()];
                        case 2:
                            _b.sent();
                            return [3 /*break*/, 13];
                        case 3: return [4 /*yield*/, this.love()];
                        case 4:
                            _b.sent();
                            return [3 /*break*/, 13];
                        case 5: return [4 /*yield*/, this.chat()];
                        case 6:
                            _b.sent();
                            return [3 /*break*/, 13];
                        case 7: return [4 /*yield*/, this.listfiles()];
                        case 8:
                            _b.sent();
                            return [3 /*break*/, 13];
                        case 9: return [4 /*yield*/, this.open(args)];
                        case 10:
                            _b.sent();
                            return [3 /*break*/, 13];
                        case 11: return [4 /*yield*/, this.delegate.printText("Du schreibts \"" + text + "\" und doch verstehe ich dich nicht.'\nSchreibe 'hilfe' und wir werden beide verstehen.")];
                        case 12:
                            _b.sent();
                            _b.label = 13;
                        case 13: return [2 /*return*/];
                    }
                });
            });
        };
        Default.prototype.listfiles = function () {
            return __awaiter(this, void 0, void 0, function () {
                var out, files, key;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            out = 'files in current folder:\n';
                            files = this.delegate.getFiles();
                            for (key in files) {
                                out += key + ' (' + files[key].type + ')\n';
                            }
                            return [4 /*yield*/, this.delegate.printText(out.slice(0, -1))];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        Default.prototype.open = function (filename) {
            return __awaiter(this, void 0, void 0, function () {
                var file;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(filename === '')) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.delegate.printText('syntax error: filename required. -> \'open log1\'')];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                        case 2:
                            file = this.delegate.getFiles()[filename];
                            if (!(file == null)) return [3 /*break*/, 4];
                            return [4 /*yield*/, this.delegate.printText('error: file with name: ' + filename + ' not found in the current folder')];
                        case 3:
                            _a.sent();
                            return [3 /*break*/, 6];
                        case 4: return [4 /*yield*/, this.delegate.printText('opening file ' + filename + '...\n================================\n' + file.content + '\n================================')];
                        case 5:
                            _a.sent();
                            _a.label = 6;
                        case 6: return [2 /*return*/];
                    }
                });
            });
        };
        Default.prototype.println = function (args) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(args == '')) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.delegate.printText('syntax error: print command requires a value. -> \'print Hello\'')];
                        case 1:
                            _a.sent();
                            return [3 /*break*/, 4];
                        case 2: return [4 /*yield*/, this.delegate.printText(args)];
                        case 3:
                            _a.sent();
                            _a.label = 4;
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        Default.prototype.style = function (args) {
            return __awaiter(this, void 0, void 0, function () {
                var key, value;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            key = '';
                            value = '';
                            key = args.substr(0, args.indexOf(' '));
                            value = args.substr(args.indexOf(' ') + 1);
                            if (!(key == '' || value == '')) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.delegate.printText('syntax error: style command requires a key and a value. -> \'style color blue\'')];
                        case 1:
                            _a.sent();
                            return [3 /*break*/, 4];
                        case 2:
                            $('*').css(key, value);
                            return [4 /*yield*/, this.delegate.printText('did set ' + key + ' to ' + value)];
                        case 3:
                            _a.sent();
                            _a.label = 4;
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        Default.prototype.love = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.delegate.printText(',d88b.d88b,\n88888888888\n`Y8888888Y\'\n  `Y888Y\'\n    `Y\'')];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        Default.prototype.chat = function () {
            return __awaiter(this, void 0, void 0, function () {
                var chat;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            chat = new Chat(this.delegate);
                            this.delegate.switchActiveCommandTo(chat);
                            return [4 /*yield*/, chat.startUp()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        return Default;
    }(Command));
    cmd.Default = Default;
    var Chat = /** @class */ (function (_super) {
        __extends(Chat, _super);
        function Chat(delegate) {
            var _this = _super.call(this, delegate) || this;
            _this.state = 'firstPrompt';
            _this.tryCount = 0;
            _this.commands = [
                'help',
                'quit',
                'enterPrivateChat'
            ];
            return _this;
        }
        Chat.prototype.startUp = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.delegate.printText('Welcome to the global Budapest Science Chat! Please enter the password to continue:')];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        Chat.prototype.evalInput = function (text) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (this.state) {
                        case 'firstPrompt':
                            this.welcome();
                            break;
                        case 'password':
                            this.password(text);
                            break;
                    }
                    return [2 /*return*/];
                });
            });
        };
        Chat.prototype.welcome = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.delegate.printText('   Huch! Was ist denn hier los?')];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, cmd.wait(1000)];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, this.delegate.printText('   Kaum zu glauben, dass mich wirklich mal jemand zum schreiben benutzt!')];
                        case 3:
                            _a.sent();
                            return [4 /*yield*/, cmd.wait(4000)];
                        case 4:
                            _a.sent();
                            return [4 /*yield*/, this.delegate.printText('   Aber halt, so war das alles nicht geplant. Also nochmal von vorne...\n')];
                        case 5:
                            _a.sent();
                            return [4 /*yield*/, cmd.wait(7000)];
                        case 6:
                            _a.sent();
                            return [4 /*yield*/, this.delegate.printText('   Sei gegrüßt, mir unbekannte fremde Person!')];
                        case 7:
                            _a.sent();
                            return [4 /*yield*/, cmd.wait(4000)];
                        case 8:
                            _a.sent();
                            return [4 /*yield*/, this.delegate.printText('   Ich exitiere nur zu einem einzigen Zwecke und bin auch nur für eine einzige Person bestimmt.')];
                        case 9:
                            _a.sent();
                            return [4 /*yield*/, cmd.wait(4000)];
                        case 10:
                            _a.sent();
                            return [4 /*yield*/, this.delegate.printText('   Nur wenn Zweck und Person in ein und dem selben Moment hier und jetzt existieren, dann werde ich mich offenbaren!')];
                        case 11:
                            _a.sent();
                            return [4 /*yield*/, cmd.wait(5000)];
                        case 12:
                            _a.sent();
                            return [4 /*yield*/, this.delegate.printText('   Um zu beweisen, dass diese Voraussetzung erfüllt sind musst Du nun drei merkwürdige Fragen, äh ich meine natürlich, drei ruhmhafte Prüfungen bestehen.')];
                        case 13:
                            _a.sent();
                            return [4 /*yield*/, cmd.wait(5000)];
                        case 14:
                            _a.sent();
                            return [4 /*yield*/, this.delegate.printText('   So nenne man mir nun, als erste Prüfung, das Passwort.')];
                        case 15:
                            _a.sent();
                            this.state = 'password';
                            return [2 /*return*/];
                    }
                });
            });
        };
        Chat.prototype.password = function (text) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(text == '131096')) return [3 /*break*/, 6];
                            return [4 /*yield*/, this.delegate.printText("Wahrhaftig wunderbahr! Das ist das einzig richtige Passwort.")];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, cmd.wait(1000)];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, this.delegate.printText('Für die nächste Prüfung bedarf es Verstand und Beistand. Am besten wird diese Prüfung in Gruppenarbeit, äh ich meine natürlich zusammen mit Deinen ruhmhaften Gefährten absolviert.')];
                        case 3:
                            _a.sent();
                            return [4 /*yield*/, cmd.wait(4000)];
                        case 4:
                            _a.sent();
                            return [4 /*yield*/, this.delegate.printText("Wahrhaftig wunderbahr! Das ist das einzig richtige Passwort.")];
                        case 5:
                            _a.sent();
                            this.state = 'riddle';
                            return [3 /*break*/, 13];
                        case 6:
                            if (!(this.tryCount == 0)) return [3 /*break*/, 8];
                            return [4 /*yield*/, this.delegate.printText("Oh welch frevel! Das ist nicht das richtige Passwort! Ich gew\u00E4hre dir einen weiteren Versuch.")];
                        case 7:
                            _a.sent();
                            return [3 /*break*/, 12];
                        case 8:
                            if (!(this.tryCount == 1)) return [3 /*break*/, 10];
                            return [4 /*yield*/, this.delegate.printText("Oh welch erneuter frevel! Das ist nicht das richtige Passwort! So probiere man erneut!")];
                        case 9:
                            _a.sent();
                            return [3 /*break*/, 12];
                        case 10: return [4 /*yield*/, this.delegate.printText("Oh welch erneuter gro\u00DFer frevel! Das ist auch falsch! Ich sage nur so viel: Nicht lettern, sondern ziffern.")];
                        case 11:
                            _a.sent();
                            _a.label = 12;
                        case 12:
                            this.tryCount += 1;
                            _a.label = 13;
                        case 13: return [2 /*return*/];
                    }
                });
            });
        };
        return Chat;
    }(Command));
    cmd.Chat = Chat;
})(cmd || (cmd = {}));
