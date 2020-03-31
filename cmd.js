"use strict";
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
