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
/// <reference path="cmd.ts" />
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
            return out.slice(0, -1) + '\n================================';
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
                'love'
            ];
            return _this;
        }
        Default.prototype.startUp = function () {
            return '';
        };
        Default.prototype.evalInput = function (text) {
            var command = text.substr(0, text.indexOf(' '));
            var args = text.substr(text.indexOf(' ') + 1);
            if (command == '') {
                command = args;
                args = '';
            }
            switch (command) {
                case 'help':
                    return this.help();
                    break;
                case 'print':
                    return this.println(args);
                    break;
                case 'style':
                    return this.style(args);
                    break;
                case 'love':
                    return this.love();
                    break;
                case 'chat':
                    return this.chat();
                    break;
                default:
                    return '\nundefined command: ' + text + '\ntype \'help\' to get a list of all commands';
            }
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
            _this.password = 'test';
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
            return '\nuser ' + args + ' not availabe.';
        };
        return Chat;
    }(Command));
    cmd.Chat = Chat;
})(cmd || (cmd = {}));
/// <reference path="Command.ts" />
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
                cmdC.readInput();
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
                cmdC.autoFillInput = '';
        }
    };
    var CommandController = /** @class */ (function () {
        function CommandController() {
            this.displayText = '';
            this.firstEnter = true;
            this.hist = [];
            this.histIndex = 0;
            this.autoFillInput = '';
            this.lastAutofill = '';
            this.activeCmd = new cmd.Default(this);
        }
        CommandController.prototype.switchActiveCommandTo = function (command) {
            $('#prompt-indicator').text(command.promptIndicatorText);
            updateSize();
            $('#textbox').focus();
            this.activeCmd = command;
        };
        CommandController.prototype.readInput = function () {
            var input = String($('#textbox').val());
            if (!(this.displayText.slice(-2) == '\n' || this.firstEnter)) {
                this.displayText += '\n';
            }
            if (rmvSpace(input) == '') {
                this.displayText += this.activeCmd.promptIndicatorText;
            }
            else {
                this.displayText += this.activeCmd.promptIndicatorText + rmvSpace(input) + this.activeCmd.evalInput(input);
                this.hist.push(input);
                this.histIndex = this.hist.length;
            }
            this.firstEnter = false;
            $('#display').text(this.displayText);
            $('#textbox').val('').focus();
            updateSize();
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
            if (this.autoFillInput == '') {
                this.autoFillInput = String($('#textbox').val());
            }
            if (this.autoFillInput == '') {
                return;
            }
            var startIndex = 0;
            if (String($('#textbox').val()) == this.lastAutofill) {
                var autoIndex = this.activeCmd.commands.indexOf(this.lastAutofill);
                startIndex = autoIndex == this.activeCmd.commands.length - 1 ? 0 : autoIndex + 1;
            }
            var searchDuration = 0;
            for (var j = startIndex; j < this.activeCmd.commands.length; j++) {
                if (this.activeCmd.commands[j].slice(0, this.autoFillInput.length) == this.autoFillInput) {
                    $('#textbox').val(this.activeCmd.commands[j]);
                    $('#textbox').focus();
                    this.lastAutofill = this.activeCmd.commands[j];
                    break;
                }
                if (searchDuration > this.activeCmd.commands.length) {
                    break;
                }
                searchDuration++;
                if (j == this.activeCmd.commands.length - 1) {
                    j = -1;
                }
            }
        };
        return CommandController;
    }());
    function rmvSpace(str) {
        while (str.slice(-1) == ' ') {
            str = str.slice(0, -1);
        }
        return str;
    }
})(cmd || (cmd = {}));
