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
            var out = '================================\navailabe commands: \n';
            for (var command of this.commands){
                out += command + '\n';
            }
            await this.delegate.printText(out.slice(0,-1) + '\nuse arrows \'UP\' \'DOWN\' \'RIGHT\' for history and autocomplete\n================================');
        }

        getAutofillList(input:string):string[]{
            return this.commands;
        }
    }
    
    export class Default extends Command{
    
        constructor(delegate: CommandController) {
            super(delegate);
            this.promptIndicatorText = 'unknown-user:~$';
            this.commands = [
                'help',
                'print', 
                'style',
                'chat',
                'love',
                'list',
                'open'
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
                case 'help': await this.help(); break;
                case 'print': await this.println(args); break;
                case 'style': await this.style(args); break;
                case 'love': await this.love(); break;
                case 'chat': await this.chat(); break;
                case 'list': await this.list(); break;
                case 'open': await this.open(args); break;
                default: await this.delegate.printText('undefined command: ' + text + '\ntype \'help\' to get a list of all commands');
            }
        }
        
        async list():Promise<void>{
            var out = '';
            var files = this.delegate.getFiles()
            for (var key in files){
                out += key + ' (' + files[key].type + ')\n';
            }
            await this.delegate.printText(out.slice(0,-1));
        }

        async open(filename:string):Promise<void>{
            var file = this.delegate.getFiles()[filename];
            if (file == null){
                await this.delegate.printText('error: file with name: ' + filename + ' not found');
            }
            if (file.type == 'img'){
                
            }
            await this.delegate.printText('opening file ' + filename + '...\n================================\n' + file.content + '\n================================');
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
            }
            $('*').css(key, value);
            await this.delegate.printText('did set ' + key + ' to ' + value);
        }
        
        async love():Promise<void>{
            await this.delegate.printText(',d88b.d88b,\n88888888888\n`Y8888888Y\'\n  `Y888Y\'\n    `Y\'');
        }
        
        async chat():Promise<void>{
            var chat:Chat = new Chat(this.delegate, this)
            this.delegate.switchActiveCommandTo(chat);
            await chat.startUp();
        }
    }
    
    export class Chat extends Command{
    
        password:string = 'sunflower';
        loggedIn:boolean = false;
    
        constructor(delegate: CommandController, previous: Command) {
            super(delegate);
            this.previousActive = previous;
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
            var command = text.substr(0,text.indexOf(' '));
            var args = text.substr(text.indexOf(' ')+1);
            if (command == ''){
                command = args;
                args = '';
            }
            switch (command){
                case 'help': this.help(); break;
                case 'quit': this.quit(); break;
                case 'enterPrivateChat': 
                    if (this.loggedIn){ this.enterPrivateChat(args)} else {this.logIn(text)}
                    break;
                default:
                    if (this.loggedIn){
                        this.send(text); break;
                    } else {
                        this.logIn(text); break;
                    }
            }
        }
    
        quit(){
            if (this.previousActive != null){
                this.delegate.switchActiveCommandTo(this.previousActive);
            }
        }
    
        async send(text:string):Promise<void>{
            await this.delegate.printText('unknown-user: ' + text);
        }
    
        async logIn(text:string):Promise<void>{
            this.loggedIn = text == this.password;
            var out:string = this.loggedIn ? 'login successful! currently online users: 0 \ntype \'help\' for instructions or \'quit\' to exit the chat' 
                                : 'wrong password. type \'help\' for instructions or \'quit\' to exit the chat';
            await this.delegate.printText(out);
        }

        async enterPrivateChat(username:string):Promise<void>{
            switch (username){
                case '':
                    await this.delegate.printText('syntax error: name of user to connect to required. -> \'enterPrivateChat peter\'');
                    break;
                case 'lucy':
                    await this.delegate.printText('try connecting to lucy');
                    await this.delegate.printText('. . . ', 500, false);
                    await this.delegate.printText('connection succesful!', this.delegate.defaultDelay, false);
                    this.delegate.enableInput()
                    await new Promise(r => setTimeout(r, 7000));
                    await this.delegate.printText('lucy: Hello? Anybody out there?');
                    await new Promise(r => setTimeout(r, 7000));
                    await this.delegate.printText('lucy: plz answer! I need your help!');
                    await new Promise(r => setTimeout(r, 7000));
                    this.delegate.disableInput();
                    this.delegate.displayText = '';
                    await this.delegate.printText('');
                    await new Promise(r => setTimeout(r, 2000));
                    await this.delegate.printText('TO BE CONTINUED', 100);
                    await this.delegate.printText('. . .', 1000, false);
                    break;
                default:
                    await this.delegate.printText('try connecting to '+username);
                    await this.delegate.printText('. . . ', 30, false);
                    await this.delegate.printText('user ' + username + ' not availabe.', this.delegate.defaultDelay, false);
            }
        }
    }
}



