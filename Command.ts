/// <reference path="cmd.ts" />

namespace cmd{
    
    export class Command {
        delegate : CommandController ;
        previousActive?: Command;
    
        promptIndicatorText:string = '';
        commands:string[] = [];
    
        constructor(delegate: CommandController) {
            this.delegate = delegate;
        }
    
        async evalInput(text:string):Promise<void>{
        }

        async help():Promise<void>{
            var out = '================================\nschreibe dies und ich verstehe: \n';
            for (var command of this.commands){
                out += command + '\n';
            }
            await this.delegate.printText(out.slice(0,-1) +'================================');
        }

        getAutofillList(input:string):string[]{
            return this.commands;
        }
    }
    
    export class Default extends Command{
    
        constructor(delegate: CommandController) {
            super(delegate);
            this.promptIndicatorText = 'Schreibe hier:';
            this.commands = [
                'hilfe', 
                'grußkarte',
                'liebe',
                'texte',
                'vorlesen'
            ];
        }

        getAutofillList(input:string):string[]{
            switch (input){
                case 'open':
                    var list:string[] = [];
                    for (var key in this.delegate.getFiles()){
                        list.push('open '+ key)
                    }
                    return list;
                default:
                    return super.getAutofillList(input);
            }
        }
    
        async evalInput(text:string):Promise<void>{
            var command = text.substr(0,text.indexOf(' '));
            var args = text.substr(text.indexOf(' ')+1);
            if (command == ''){
                command = args;
                args = '';
            }
            switch (command) {
                case 'hilfe': await this.help(); break;
                case 'liebe': await this.love(); break;
                case 'grußkarte': await this.chat(); break;
                case 'texte': await this.listfiles(); break;
                case 'vorlesen': await this.open(args); break;
                default: await this.delegate.printText(`Du schreibts "${text}" und doch verstehe ich dich nicht.'\nSchreibe 'hilfe' und wir werden beide verstehen.`);
            }
        }
        
        async listfiles():Promise<void>{
            var out = 'files in current folder:\n';
            var files = this.delegate.getFiles()
            for (var key in files){
                out += key + ' (' + files[key].type + ')\n';
            }
            await this.delegate.printText(out.slice(0,-1));
        }

        async open(filename:string):Promise<void>{
            if (filename === ''){
                await this.delegate.printText('syntax error: filename required. -> \'open log1\'');
                return;
            }
            var file = this.delegate.getFiles()[filename];
            if (file == null){
                await this.delegate.printText('error: file with name: ' + filename + ' not found in the current folder'); 
            } else {
                await this.delegate.printText('opening file ' + filename + '...\n================================\n' + file.content + '\n================================');
            }
        }
        
        async println(args:string):Promise<void>{
            if (args == ''){
                await this.delegate.printText('syntax error: print command requires a value. -> \'print Hello\'');
            } else {
                await this.delegate.printText(args);
            }
        }
        
        async style(args:string):Promise<void>{
            var key = '';
            var value = '';
            key = args.substr(0,args.indexOf(' '));
            value = args.substr(args.indexOf(' ')+1);
            if (key == '' || value == ''){
                await this.delegate.printText('syntax error: style command requires a key and a value. -> \'style color blue\'');
            } else {
                $('*').css(key, value);
                await this.delegate.printText('did set ' + key + ' to ' + value);
            }
        }
        
        async love():Promise<void>{
            await this.delegate.printText(',d88b.d88b,\n88888888888\n`Y8888888Y\'\n  `Y888Y\'\n    `Y\'');
        }
        
        async chat():Promise<void>{
            var chat:Chat = new Chat(this.delegate)
            this.delegate.switchActiveCommandTo(chat);
            await chat.startUp();
        }
    }
    
    export class Chat extends Command{
    
        state:string = 'firstPrompt';
        tryCount:number = 0;
    
        constructor(delegate: CommandController) {
            super(delegate);
            this.commands = [
                'help',
                'quit',
                'enterPrivateChat'
            ];
        }
        
        async startUp():Promise<void>{
            await this.delegate.printText('Welcome to the global Budapest Science Chat! Please enter the password to continue:');
        }
    
        async evalInput(text:string){
            switch (this.state){
                case 'firstPrompt': this.welcome(); break;
                case 'password': this.password(text); break;
            }
        }
    
    
        async welcome():Promise<void>{
            await this.delegate.printText('   Huch! Was ist denn hier los?');
            await wait(1000);
            await this.delegate.printText('   Kaum zu glauben, dass mich wirklich mal jemand zum schreiben benutzt!');
            await wait(2000);
            await this.delegate.printText('   Aber halt, so war das alles nicht geplant. Also nochmal von vorne...\n');
            await wait(7000);
            await this.delegate.printText('   Sei gegrüßt, mir unbekannte fremde Person!');
            await wait(4000);
            await this.delegate.printText('   Ich exitiere nur zu einem einzigen Zwecke und bin auch nur für eine einzige Person bestimmt.');
            await wait(4000);
            await this.delegate.printText('   Nur wenn Zweck und Person in ein und dem selben Moment hier und jetzt existieren, dann werde ich mich offenbaren!');
            await wait(5000);
            await this.delegate.printText('   Um zu beweisen, dass diese Voraussetzung erfüllt sind musst Du nun drei merkwürdige Fragen, äh ich meine natürlich, drei ruhmhafte Prüfungen bestehen.');
            await wait(5000);
            await this.delegate.printText('   So nenne man mir nun, als erste Prüfung, das Passwort:');
            this.state = 'password'
        }

        async password(text:string):Promise<void>{
            if (text == '131096') {
                await this.delegate.printText(`Wahrhaftig wunderbahr! Das ist das einzig richtige Passwort.`);
                await wait(1000);
                await this.delegate.printText('Für die nächste Prüfung bedarf es Verstand und Beistand. Am besten wird diese Prüfung in Gruppenarbeit, äh ich meine natürlich zusammen mit Deinen ruhmhaften Gefährten absolviert.');
                await wait(4000);
                await this.delegate.printText(`Wahrhaftig wunderbahr! Das ist das einzig richtige Passwort.`);

                this.state = 'riddle';
            } else {
                if (this.tryCount == 0) {
                    await this.delegate.printText(`Oh welch frevel! Das ist nicht das richtige Passwort! Ich gewähre dir einen weiteren Versuch.`);
                } else if (this.tryCount == 1) {
                    await this.delegate.printText(`Oh welch erneuter frevel! Das ist nicht das richtige Passwort! So probiere man erneut!`);
                } else {
                    await this.delegate.printText(`Oh welch erneuter großer frevel! Das ist auch falsch! Ich sage nur so viel: Nicht lettern, sondern ziffern.`);
                }
                
                this.tryCount += 1;
            }
        }


    }
}



