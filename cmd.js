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
                cmdC.autofillInput = '';
        }
    };
    var CommandController = /** @class */ (function () {
        function CommandController() {
            this.displayText = '';
            this.firstEnter = true;
            this.hist = [];
            this.histIndex = 0;
            this.autofillInput = '';
            this.lastAutofill = '';
            this.files = {
                'log1': { type: 'txt', content: '|01| Tue May 22nd 2087\n|02|\n|03| today nothing happened' },
                'log2': { type: 'txt', content: '|01| Mon June 13th 2087\n|02|\n|03| nothing happend today' },
                'lucy': { type: 'txt', content: '|01|\n|02|\n|03|\n|04| PW: sunflower' },
                'virus': { type: 'img', content: '<img src="media/art.png"></img>' }
            };
            this.activeCmd = new cmd.Default(this);
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
            var autofillList = this.activeCmd.getAutofillList(this.autofillInput);
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
    function rmvSpace(str) {
        while (str.slice(-1) == ' ') {
            str = str.slice(0, -1);
        }
        return str;
    }
})(cmd || (cmd = {}));
