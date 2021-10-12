/// <reference path="Command.ts" />
/// <reference path="Utility.ts" />

namespace cmd{
	var cmdC : CommandController 

	$(document).ready(function(){
		cmdC = new CommandController();

		$('#prompt-indicator').text(cmdC.activeCmd.promptIndicatorText);
		cmdC.displayText = $('#display').text();
		updateSize();
		$('#textbox').val('').focus();
		$('#bottom-space').height($(window).height()! - $('#prompt-indicator').height()! - $('#display').height()!);	
	});

	$(window).on('resize', function(){
		updateSize();
	});

	function updateSize(){
		$('#textbox').width($('body').innerWidth()! - $('#prompt-indicator').width()!);
	}

	$(document).on('click',function(){
		$('#textbox').focus();
	});

	document.onkeydown = function(e) {
		switch (e.keyCode) {
			case 13: //enter 
				if (cmdC.inputEnabled) {cmdC.readInput();}
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

	export interface File {
		type: string;
		content: string;
	}
	 
	export class CommandController {

		displayText:string = '';
		firstEnter:boolean = true;
		inputEnabled:boolean = false;
		hist :string[] = [];
		histIndex:number = 0;
		autofillInput:string = '';
		lastAutofill:string = '';
		activeCmd:Command;
		defaultDelay:number = 5;

		files: {[name:string] : File} = {
			'log1' : {type:'txt', content:'|01| Tue May 22nd 2087\n|02|\n|03| today nothing happened'},
			'log2' : {type:'txt', content:'|01| Mon June 13th 2087\n|02|\n|03| nothing happend today'},
			'lucy' : {type:'txt', content:'|01|\n|02|\n|03|\n|04| PW: sunflower'},
			'virus' : {type:'img', content:'<img src="media/art.png"></img>'}
		};

		constructor(){
			this.activeCmd = new Default(this);
			this.enableInput();
		}

		/*----CommandDelegate----*/
		switchActiveCommandTo(command: Command): void {
			$('#prompt-indicator').text(command.promptIndicatorText);
			updateSize();
			$('#textbox').focus();
			this.activeCmd = command;
		}

		getFiles():{[name:string] : File}{
			return this.files;
		}

		async printText(out:string, delayTenthseconds:number=this.defaultDelay, newLine:boolean=true):Promise<void>{
			this.displayText += newLine ? '\n' : '';
			for (var char of out){
				this.displayText += char;
				$('#display').text(this.displayText);
				updateSize();
				await wait(delayTenthseconds);
			}
		}

		enableInput():void{
			$('#textbox').css('display','inline-block').val('').focus();
			$('#prompt-indicator').css('display','inline-block');
			this.inputEnabled = true;
		}

		disableInput():void{
			this.inputEnabled = false;
			$('#textbox').css('display','none');
			$('#prompt-indicator').css('display','none');
		}
		/*----CommandDelegate----*/

		async readInput():Promise<void>{
			var input : string = String($('#textbox').val());
			
			if (!(this.displayText.slice(-2) == '\n' || this.firstEnter)){
				this.displayText += '\n';
			}
			this.firstEnter = false;
			this.displayText += this.activeCmd.promptIndicatorText + rmvSpace(input);
			$('#display').text(this.displayText);
			$('#textbox').val('');
			updateSize();
			if (input != ''){
				this.disableInput();
				this.hist.push(input);
				this.histIndex = this.hist.length;
				await this.activeCmd.evalInput(input);
				this.enableInput();
			}
		}

		histUp():void{
			if (this.histIndex >= 0 && this.hist.length > 0){
				if (this.histIndex > 0){this.histIndex -= 1}
				$('#textbox').val(this.hist[this.histIndex]);
			}
		}
		
		histDown():void{
			if (this.histIndex <= this.hist.length-1 && this.hist.length > 0){
				if (this.histIndex < this.hist.length-1) {this.histIndex += 1;}
				$('#textbox').val(this.hist[this.histIndex]);
			}
		}
		
		doAutoFill():void{
			var autofillList: string[] = this.activeCmd.getAutofillList(rmvSpace(this.autofillInput));
			if (this.autofillInput == ''){
				this.autofillInput = String($('#textbox').val());
			}
			if (this.autofillInput == '') {return;}
		
			var startIndex : number = 0;
			if (String($('#textbox').val()) == this.lastAutofill){
				var autoIndex : number = autofillList.indexOf(this.lastAutofill);
				startIndex = autoIndex == autofillList.length-1 ? 0 : autoIndex+1;
			}
			var searchDuration : number = 0;
			for (var j=startIndex; j<autofillList.length; j++) {
				if (autofillList[j].slice(0,this.autofillInput.length) == this.autofillInput){
					$('#textbox').val(autofillList[j]);
					$('#textbox').focus();
					this.lastAutofill = autofillList[j];
					break;
				}
				if (searchDuration > autofillList.length){break;}
				searchDuration ++;
				if (j == autofillList.length-1){
					j = -1;
				}
			}
		}	
	}
}
