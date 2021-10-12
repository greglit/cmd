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
        }
    }
    
    export class Chat extends Command{
    
        state:string = 'firstPrompt';
        tryCount:number = 0;
    
        constructor(delegate: CommandController) {
            super(delegate);
            this.commands = [
            ];
        }
    
        async evalInput(text:string){
            switch (this.state){
                case 'firstPrompt': this.welcome(); break;
                case 'password': this.password(text); break;
                case 'riddle': this.riddle(text); break;
                case 'dance': this.dance(text); break;
                case 'pia': this.pia(text); break;
            }
        }
    
    
        async welcome():Promise<void>{
            await this.delegate.printText('   Huch! Was ist denn hier los?');
            await wait(1000);
            await this.delegate.printText('   Kaum zu glauben, dass mich wirklich \n   mal jemand zum schreiben benutzt!');
            await wait(2000);
            await this.delegate.printText('   Aber halt, so war das alles nicht geplant. \n   Also nochmal von vorne...\n');
            await wait(5000);
            await this.delegate.printText('   Sei gegrüßt, mir unbekannte, fremde Person!');
            await wait(4000);
            await this.delegate.printText('   Ich exitiere nur zu einem einzigen Zwecke \n   und bin auch nur für eine einzige Person bestimmt.');
            await wait(4000);
            await this.delegate.printText('   Nur wenn Zweck und Person in ein und dem \n   selben Moment hier und jetzt existieren, \n   dann werde ich mich offenbaren!');
            await wait(5000);
            await this.delegate.printText('   Um zu beweisen, dass diese Voraussetzungen erfüllt \n   sind, musst Du nun drei merkwürdige Fragen, \n   äh ich meine natürlich, \n   drei ruhmhafte Prüfungen bestehen.');
            await wait(5000);
            await this.delegate.printText('   Als erste Prüfung, \n   nenne man mir das Passwort:');
            this.state = 'password'
        }

        async password(text:string):Promise<void>{
            if (text == '131096') {
                await this.delegate.printText(`   Wahrhaftig! Das ist das einzig \n   richtige Passwort.`);
                await wait(1000);
                await this.delegate.printText('   Für die nächste Prüfung bedarf es \n   Verstand und Beistand. \n   Am besten wird diese Prüfung \n   in Gruppenarbeit, \n   äh ich meine natürlich zusammen mit Deinen \n   ruhmhaften Gefährten absolviert.');
                await wait(6000);
                await this.delegate.printText(`   So folget nun ein Rätsel:\n`);
                await wait(2000);
                await this.delegate.printText(`   „Alle Menschen haben mich, \n   unmöglich der Verzicht.\nDoch mancher Mensch verachtet mich \n   und wünscht, es gäb mich nicht.\n
                Beachte mich, betrachte mich, \n   bis dein Verstand erweicht. \nDabei kannst du mir doch nichts tun, \n   weil mich kein Schlag erreicht.\n
                Kinder lachen über mich, \n   und Alte müssen weinen. \nHübschen Mädchen muss ich wohl \n   ganz allerliebst erscheinen.\n
                Wenn du schluchzt, so weine ich - \n   gähnst du, will ich schlafen.\nLächle, und ich strahle, \n   als erklängen tausend Harfen.“`);
                await wait(8000);
                await this.delegate.printText(`\n   Wer beschreibet sich selbst \n   in diesem Zitat?`);

                this.state = 'riddle';
                this.tryCount = 0;
            } else {
                if (this.tryCount == 0) {
                    await this.delegate.printText(`   Oh welch frevel! \n   Das ist nicht das richtige Passwort! \n   Ich gewähre dir einen weiteren Versuch.`);
                } else if (this.tryCount == 1) {
                    await this.delegate.printText(`   Oh welch erneuter frevel! \n   Das ist nicht das richtige Passwort! \n   So probiere man erneut!`);
                } else {
                    await this.delegate.printText(`   Oh welch erneuter großer frevel! \n   Das ist auch falsch! \n   Ich sage nur so viel: \n   Nicht lettern, sondern ziffern.`);
                }
                
                this.tryCount += 1;
            }
        }

        async riddle(text:string):Promise<void>{
            if (text == 'Spiegelbild' || text == 'spiegelbild') {
                await this.delegate.printText(`   Wahrhaftig und wunderbahr! \n   Das Spiegelbild hat hier gesprochen!`);
                await wait(1000);
                await this.delegate.printText('   Für die letzte Prüfung bedarf es \n   ein bisschen balla balla im Kopf, \n   äh ich meine natürlich \n   eine frohlockende Fantasie!.');
                await wait(4000);
                await this.delegate.printText(`   Man nenne mir den Namen \n   des Tanzes den man \n   beim Zähneputzen pflegt \n   zu vollführen:`);
                this.state = 'dance';
                this.tryCount = 0;
            } else {
                if (this.tryCount == 0) {
                    await this.delegate.printText(`   Oh welch frevel! \n   "${text}" ist nicht richtig. \n   Ich gewähre dir einen weiteren Versuch.`);
                } else if (this.tryCount == 1) {
                    await this.delegate.printText(`   Oh welch erneuter frevel! \n   "${text}" ist auch nicht richtig. \n   So probiere man erneut!`);
                } else {
                    await this.delegate.printText(`   Oh welch erneuter großer frevel! \n   "${text}" ist auch falsch! \n   Hier fällt mir beim besten willen \n   kein guter Tipp ein.`);
                }
                this.tryCount += 1;
            }
        }

        async dance(text:string):Promise<void>{
            if (text == 'boogie' || text == 'Boogie' || text == 'Zahnputzboogie' || text == 'zahnputzboogie') {
                await this.delegate.printText(`   Wahrhaftig, wunderbahr \n   und wunderschön \n   ist dieser Zahnputzboogie!`);
                await wait(1000);
                await this.delegate.printText('   So ist es nun vollbracht, \n   alle Prüfungen wurden bestanden. \n   Du hast nun bewiesen, \n   dass du die einzig wahre Person \n   und das der einzig wahre Zweck ist...')
                await wait(2000);
                await this.delegate.printText(`   Ach was mache ich mir vor, \n   interessiert doch eh keinen \n   was ich hier fasel.`);
                await wait(2000);
                await this.delegate.printText(`   Mein erschaffer möchte, \n   dass ich dir etwas zeige. \n   Er nennt es "Geburtstagskarte". \n   Was auch immer das sein soll...`);
                await wait(4000);
                await this.delegate.printText(`   Schreibe deinen Namen \n   und lies selbst!`);
                this.state = 'pia';
            } else {
                if (this.tryCount == 0) {
                    await this.delegate.printText(`   Oh welch frevel! \n   "${text}" ist nicht richtig. \n   Ich gewähre dir einen weiteren Versuch.`);
                } else if (this.tryCount == 1) {
                    await this.delegate.printText(`   Oh welch erneuter frevel! \n   "${text}" ist auch nicht richtig. \n   So probiere man erneut!`);
                } else {
                    await this.delegate.printText(`   Oh welch erneuter großer frevel! \n   "${text}" ist auch falsch! \n   Mein erschaffer meinte du wüsstest das sicher!`);
                }
                this.tryCount += 1;
            }
        }

        async pia(text:string):Promise<void>{
            if (text == 'pia' || text == 'Pia') {
                await this.delegate.printText(`\n   Meine liebe Pia, \n   Ich wünsche dir alles, alles gute \n   zu deinem 25. Geburtstag, mein Schatz. \n   Auf einen oder mehrer \n   wunderschöne Tage mit unseren Freunden, \n   und einen wunderschönen \n   Abend zu zweit! \n   Lass es krachen! \n\n   Ich liebe Dich. \n   Dein liebster Gregor`);
            }
        }




    }
}



