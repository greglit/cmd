"use strict";
/// <reference path="cmd.ts" />
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var cmd;
(function (cmd) {
    var Command = /** @class */ (function () {
        function Command(delegate) {
            this.promptIndicatorText = '';
            this.commands = [];
            this.delegate = delegate;
        }
        Command.prototype.evalInput = function (text) {
            return 'error: Active command is not able to evaluate input';
        };
        Command.prototype.startUp = function () {
            return '';
        };
        Command.prototype.help = function () {
            var out = '\n================================\navailabe commands: \n';
            for (var _i = 0, _a = this.commands; _i < _a.length; _i++) {
                var command = _a[_i];
                out += command + '\n';
            }
            return out.slice(0, -1) + '\nuse arrows \'UP\' \'DOWN\' \'RIGHT\' for history and autocomplete\n================================';
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
            _this.promptIndicatorText = 'unknown-user:~$';
            _this.commands = [
                'help',
                'print',
                'style',
                'chat',
                'love',
                'list',
                'open'
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
            var command = text.substr(0, text.indexOf(' '));
            var args = text.substr(text.indexOf(' ') + 1);
            if (command == '') {
                command = args;
                args = '';
            }
            switch (command) {
                case 'help': return this.help();
                case 'print': return this.println(args);
                case 'style': return this.style(args);
                case 'love': return this.love();
                case 'chat': return this.chat();
                case 'list': return this.list();
                case 'open': return this.open(args);
                default: return '\nundefined command: ' + text + '\ntype \'help\' to get a list of all commands';
            }
        };
        Default.prototype.list = function () {
            var out = '\n';
            var files = this.delegate.getFiles();
            for (var key in files) {
                out += key + ' (' + files[key].type + ')\n';
            }
            return out.slice(0, -1);
        };
        Default.prototype.open = function (filename) {
            var file = this.delegate.getFiles()[filename];
            if (file == null) {
                return '\nerror: file with name: ' + filename + ' not found';
            }
            return '\nopening file ' + filename + '...\n================================\n' + file.content + '\n================================';
        };
        Default.prototype.println = function (args) {
            if (args == '') {
                return '\nsyntax error: print command requires a value. -> \'print Hello\'';
            }
            else {
                return '\n' + args;
            }
        };
        Default.prototype.style = function (args) {
            var key = '';
            var value = '';
            key = args.substr(0, args.indexOf(' '));
            value = args.substr(args.indexOf(' ') + 1);
            if (key == '' || value == '') {
                return '\nsyntax error: style command requires a key and a value. -> \'style color blue\'';
            }
            $('*').css(key, value);
            return '\ndid set ' + key + ' to ' + value;
        };
        Default.prototype.love = function () {
            return '\n,d88b.d88b,\n88888888888\n`Y8888888Y\'\n  `Y888Y\'\n    `Y\'';
        };
        Default.prototype.chat = function () {
            var chat = new Chat(this.delegate, this);
            this.delegate.switchActiveCommandTo(chat);
            return chat.startUp();
        };
        return Default;
    }(Command));
    cmd.Default = Default;
    var Chat = /** @class */ (function (_super) {
        __extends(Chat, _super);
        function Chat(delegate, previous) {
            var _this = _super.call(this, delegate) || this;
            _this.password = 'sunflower';
            _this.loggedIn = false;
            _this.previousActive = previous;
            _this.commands = [
                'help',
                'quit',
                'startVideoChat'
            ];
            return _this;
        }
        Chat.prototype.startUp = function () {
            return '\nWelcome to the global Budapest Science Chat! Please enter the password to continue:';
        };
        Chat.prototype.evalInput = function (text) {
            var command = text.substr(0, text.indexOf(' '));
            var args = text.substr(text.indexOf(' ') + 1);
            if (command == '') {
                command = args;
                args = '';
            }
            switch (command) {
                case 'help': return this.help();
                case 'quit': return this.quit();
                case 'startVideoChat': if (this.loggedIn) {
                    return this.startVideoChat(args);
                }
                else {
                    return this.logIn(text);
                }
                default:
                    if (this.loggedIn) {
                        return this.send(text);
                    }
                    else {
                        return this.logIn(text);
                    }
            }
        };
        Chat.prototype.quit = function () {
            if (this.previousActive != null) {
                this.delegate.switchActiveCommandTo(this.previousActive);
            }
            return '';
        };
        Chat.prototype.send = function (text) {
            return '\nunknown-user: ' + text;
        };
        Chat.prototype.logIn = function (text) {
            this.loggedIn = text == this.password;
            return this.loggedIn ? '\nlogin successful! currently online users: 0 \ntype \'help\' for instructions or \'quit\' to exit the chat'
                : '\nwrong password. type \'help\' for instructions or \'quit\' to exit the chat';
        };
        Chat.prototype.startVideoChat = function (args) {
            if (args == '') {
                return '\nsyntax error: name of user to connect to required. -> \'startVideoChat peter\'';
            }
            if (args == 'lucy') {
                return '\nlucy: Hello? Anybody out there?\nlucy: plz answer! I need your help!\nTO BE CONTINUED...';
            }
            return '\nuser ' + args + ' not availabe.';
        };
        return Chat;
    }(Command));
    cmd.Chat = Chat;
})(cmd || (cmd = {}));
