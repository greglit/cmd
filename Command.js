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
                    chat = new Chat(this.delegate);
                    this.delegate.switchActiveCommandTo(chat);
                    return [2 /*return*/];
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
            _this.commands = [];
            return _this;
        }
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
                        case 'riddle':
                            this.riddle(text);
                            break;
                        case 'dance':
                            this.dance(text);
                            break;
                        case 'pia':
                            this.pia(text);
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
                            return [4 /*yield*/, this.delegate.printText('   Kaum zu glauben, dass mich wirklich \n   mal jemand zum schreiben benutzt!')];
                        case 3:
                            _a.sent();
                            return [4 /*yield*/, cmd.wait(2000)];
                        case 4:
                            _a.sent();
                            return [4 /*yield*/, this.delegate.printText('   Aber halt, so war das alles nicht geplant. \n   Also nochmal von vorne...\n')];
                        case 5:
                            _a.sent();
                            return [4 /*yield*/, cmd.wait(5000)];
                        case 6:
                            _a.sent();
                            return [4 /*yield*/, this.delegate.printText('   Sei gegrüßt, mir unbekannte, fremde Person!')];
                        case 7:
                            _a.sent();
                            return [4 /*yield*/, cmd.wait(4000)];
                        case 8:
                            _a.sent();
                            return [4 /*yield*/, this.delegate.printText('   Ich exitiere nur zu einem einzigen Zwecke \n   und bin auch nur für eine einzige Person bestimmt.')];
                        case 9:
                            _a.sent();
                            return [4 /*yield*/, cmd.wait(4000)];
                        case 10:
                            _a.sent();
                            return [4 /*yield*/, this.delegate.printText('   Nur wenn Zweck und Person in ein und dem \n   selben Moment hier und jetzt existieren, \n   dann werde ich mich offenbaren!')];
                        case 11:
                            _a.sent();
                            return [4 /*yield*/, cmd.wait(5000)];
                        case 12:
                            _a.sent();
                            return [4 /*yield*/, this.delegate.printText('   Um zu beweisen, dass diese Voraussetzungen erfüllt \n   sind, musst Du nun drei merkwürdige Fragen, \n   äh ich meine natürlich, \n   drei ruhmhafte Prüfungen bestehen.')];
                        case 13:
                            _a.sent();
                            return [4 /*yield*/, cmd.wait(5000)];
                        case 14:
                            _a.sent();
                            return [4 /*yield*/, this.delegate.printText('   Als erste Prüfung, \n   nenne man mir das Passwort:')];
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
                            if (!(text == '131096')) return [3 /*break*/, 10];
                            return [4 /*yield*/, this.delegate.printText("   Wahrhaftig! Das ist das einzig \n   richtige Passwort.")];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, cmd.wait(1000)];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, this.delegate.printText('   Für die nächste Prüfung bedarf es \n   Verstand und Beistand. \n   Am besten wird diese Prüfung \n   in Gruppenarbeit, \n   äh ich meine natürlich zusammen mit Deinen \n   ruhmhaften Gefährten absolviert.')];
                        case 3:
                            _a.sent();
                            return [4 /*yield*/, cmd.wait(6000)];
                        case 4:
                            _a.sent();
                            return [4 /*yield*/, this.delegate.printText("   So folget nun ein R\u00E4tsel:\n")];
                        case 5:
                            _a.sent();
                            return [4 /*yield*/, cmd.wait(2000)];
                        case 6:
                            _a.sent();
                            return [4 /*yield*/, this.delegate.printText("   \u201EAlle Menschen haben mich, \n   unm\u00F6glich der Verzicht.\nDoch mancher Mensch verachtet mich \n   und w\u00FCnscht, es g\u00E4b mich nicht.\n\n                Beachte mich, betrachte mich, \n   bis dein Verstand erweicht. \nDabei kannst du mir doch nichts tun, \n   weil mich kein Schlag erreicht.\n\n                Kinder lachen \u00FCber mich, \n   und Alte m\u00FCssen weinen. \nH\u00FCbschen M\u00E4dchen muss ich wohl \n   ganz allerliebst erscheinen.\n\n                Wenn du schluchzt, so weine ich - \n   g\u00E4hnst du, will ich schlafen.\nL\u00E4chle, und ich strahle, \n   als erkl\u00E4ngen tausend Harfen.\u201C")];
                        case 7:
                            _a.sent();
                            return [4 /*yield*/, cmd.wait(8000)];
                        case 8:
                            _a.sent();
                            return [4 /*yield*/, this.delegate.printText("\n   Wer beschreibet sich selbst \n   in diesem Zitat?")];
                        case 9:
                            _a.sent();
                            this.state = 'riddle';
                            this.tryCount = 0;
                            return [3 /*break*/, 17];
                        case 10:
                            if (!(this.tryCount == 0)) return [3 /*break*/, 12];
                            return [4 /*yield*/, this.delegate.printText("   Oh welch frevel! \n   Das ist nicht das richtige Passwort! \n   Ich gew\u00E4hre dir einen weiteren Versuch.")];
                        case 11:
                            _a.sent();
                            return [3 /*break*/, 16];
                        case 12:
                            if (!(this.tryCount == 1)) return [3 /*break*/, 14];
                            return [4 /*yield*/, this.delegate.printText("   Oh welch erneuter frevel! \n   Das ist nicht das richtige Passwort! \n   So probiere man erneut!")];
                        case 13:
                            _a.sent();
                            return [3 /*break*/, 16];
                        case 14: return [4 /*yield*/, this.delegate.printText("   Oh welch erneuter gro\u00DFer frevel! \n   Das ist auch falsch! \n   Ich sage nur so viel: \n   Nicht lettern, sondern ziffern.")];
                        case 15:
                            _a.sent();
                            _a.label = 16;
                        case 16:
                            this.tryCount += 1;
                            _a.label = 17;
                        case 17: return [2 /*return*/];
                    }
                });
            });
        };
        Chat.prototype.riddle = function (text) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(text == 'Spiegelbild' || text == 'spiegelbild')) return [3 /*break*/, 6];
                            return [4 /*yield*/, this.delegate.printText("   Wahrhaftig und wunderbahr! \n   Das Spiegelbild hat hier gesprochen!")];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, cmd.wait(1000)];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, this.delegate.printText('   Für die letzte Prüfung bedarf es \n   ein bisschen balla balla im Kopf, \n   äh ich meine natürlich \n   eine frohlockende Fantasie!.')];
                        case 3:
                            _a.sent();
                            return [4 /*yield*/, cmd.wait(4000)];
                        case 4:
                            _a.sent();
                            return [4 /*yield*/, this.delegate.printText("   Man nenne mir den Namen \n   des Tanzes den man \n   beim Z\u00E4hneputzen pflegt \n   zu vollf\u00FChren:")];
                        case 5:
                            _a.sent();
                            this.state = 'dance';
                            this.tryCount = 0;
                            return [3 /*break*/, 13];
                        case 6:
                            if (!(this.tryCount == 0)) return [3 /*break*/, 8];
                            return [4 /*yield*/, this.delegate.printText("   Oh welch frevel! \n   \"" + text + "\" ist nicht richtig. \n   Ich gew\u00E4hre dir einen weiteren Versuch.")];
                        case 7:
                            _a.sent();
                            return [3 /*break*/, 12];
                        case 8:
                            if (!(this.tryCount == 1)) return [3 /*break*/, 10];
                            return [4 /*yield*/, this.delegate.printText("   Oh welch erneuter frevel! \n   \"" + text + "\" ist auch nicht richtig. \n   So probiere man erneut!")];
                        case 9:
                            _a.sent();
                            return [3 /*break*/, 12];
                        case 10: return [4 /*yield*/, this.delegate.printText("   Oh welch erneuter gro\u00DFer frevel! \n   \"" + text + "\" ist auch falsch! \n   Hier f\u00E4llt mir beim besten willen \n   kein guter Tipp ein.")];
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
        Chat.prototype.dance = function (text) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(text == 'boogie' || text == 'Boogie' || text == 'Zahnputzboogie' || text == 'zahnputzboogie')) return [3 /*break*/, 10];
                            return [4 /*yield*/, this.delegate.printText("   Wahrhaftig, wunderbahr \n   und wundersch\u00F6n \n   ist dieser Zahnputzboogie!")];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, cmd.wait(1000)];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, this.delegate.printText('   So ist es nun vollbracht, \n   alle Prüfungen wurden bestanden. \n   Du hast nun bewiesen, \n   dass du die einzig wahre Person \n   und das der einzig wahre Zweck ist...')];
                        case 3:
                            _a.sent();
                            return [4 /*yield*/, cmd.wait(2000)];
                        case 4:
                            _a.sent();
                            return [4 /*yield*/, this.delegate.printText("   Ach was mache ich mir vor, \n   interessiert doch eh keinen \n   was ich hier fasel.")];
                        case 5:
                            _a.sent();
                            return [4 /*yield*/, cmd.wait(2000)];
                        case 6:
                            _a.sent();
                            return [4 /*yield*/, this.delegate.printText("   Mein erschaffer m\u00F6chte, \n   dass ich dir etwas zeige. \n   Er nennt es \"Geburtstagskarte\". \n   Was auch immer das sein soll...")];
                        case 7:
                            _a.sent();
                            return [4 /*yield*/, cmd.wait(4000)];
                        case 8:
                            _a.sent();
                            return [4 /*yield*/, this.delegate.printText("   Schreibe deinen Namen \n   und lies selbst!")];
                        case 9:
                            _a.sent();
                            this.state = 'pia';
                            return [3 /*break*/, 17];
                        case 10:
                            if (!(this.tryCount == 0)) return [3 /*break*/, 12];
                            return [4 /*yield*/, this.delegate.printText("   Oh welch frevel! \n   \"" + text + "\" ist nicht richtig. \n   Ich gew\u00E4hre dir einen weiteren Versuch.")];
                        case 11:
                            _a.sent();
                            return [3 /*break*/, 16];
                        case 12:
                            if (!(this.tryCount == 1)) return [3 /*break*/, 14];
                            return [4 /*yield*/, this.delegate.printText("   Oh welch erneuter frevel! \n   \"" + text + "\" ist auch nicht richtig. \n   So probiere man erneut!")];
                        case 13:
                            _a.sent();
                            return [3 /*break*/, 16];
                        case 14: return [4 /*yield*/, this.delegate.printText("   Oh welch erneuter gro\u00DFer frevel! \n   \"" + text + "\" ist auch falsch! \n   Mein erschaffer meinte du w\u00FCsstest das sicher!")];
                        case 15:
                            _a.sent();
                            _a.label = 16;
                        case 16:
                            this.tryCount += 1;
                            _a.label = 17;
                        case 17: return [2 /*return*/];
                    }
                });
            });
        };
        Chat.prototype.pia = function (text) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(text == 'pia' || text == 'Pia')) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.delegate.printText("\n   Meine liebe Pia, \n   Ich w\u00FCnsche dir alles, alles gute \n   zu deinem 25. Geburtstag, mein Schatz. \n   Auf einen oder mehrer \n   wundersch\u00F6ne Tage mit unseren Freunden, \n   und einen wundersch\u00F6nen \n   Abend zu zweit! \n   Lass es krachen! \n\n   Ich liebe Dich. \n   Dein liebster Gregor")];
                        case 1:
                            _a.sent();
                            _a.label = 2;
                        case 2: return [2 /*return*/];
                    }
                });
            });
        };
        return Chat;
    }(Command));
    cmd.Chat = Chat;
})(cmd || (cmd = {}));
