/// <reference path="cmd.ts" />

namespace cmd{

    export interface CommandDelegate {
        switchActiveCommandTo(command:Command):void
    }
    
    export class Command {
        delegate : CommandDelegate ;
        previousActive?: Command;
    
        promptIndicatorText:string = '';
        commands:string[] = [];
    
        constructor(delegate: CommandDelegate) {
            this.delegate = delegate;
        }
    
        evalInput(text:string):string{
            return 'error: Active command is not able to evaluate input';
        }
    
        startUp():string{
            return '';
        }

        help():string{
            var out = '\n================================\navailabe commands: \n';
            for (var command of this.commands){
                out += command + '\n';
            }
            return out.slice(0,-1) + '\nuse arrows \'UP\' \'DOWN\' \'RIGHT\' for history and autocomplete\n================================';
        }
    }
    
    export class Default extends Command{
    
        constructor(delegate: CommandDelegate) {
            super(delegate);
            this.promptIndicatorText = 'unknown-user:~$';
            this.commands = [
                'help',
                'print', 
                'style',
                'chat',
                'love'
            ];
        }
    
        startUp():string{
            return '';
        }
    
        evalInput(text:string):string{
            var command = text.substr(0,text.indexOf(' '));
            var args = text.substr(text.indexOf(' ')+1);
            if (command == ''){
                command = args;
                args = '';
            }
            switch (command) {
                case 'help':
                    return this.help(); break;
                case 'print':
                    return this.println(args); break;
                case 'style':
                    return this.style(args); break;
                case 'love':
                    return this.love(); break;
                case 'chat':
                    return this.chat(); break;
                default:
                    return '\nundefined command: ' + text + '\ntype \'help\' to get a list of all commands';
            }
        }
        
        println(args:string):string{
            if (args == ''){
                return '\nsyntax error: print command requires a value. -> \'print Hello\''
            } else {
                return '\n' + args
            }
        }
        
        style(args:string):string{
            var key = '';
            var value = '';
            key = args.substr(0,args.indexOf(' '));
            value = args.substr(args.indexOf(' ')+1);
            if (key == '' || value == ''){
                return '\nsyntax error: style command requires a key and a value. -> \'style color blue\'';
            }
            $('*').css(key, value);
            return '\ndid set ' + key + ' to ' + value;
        }
        
        love():string{
            return '\n,d88b.d88b,\n88888888888\n`Y8888888Y\'\n  `Y888Y\'\n    `Y\''
        }
        
        chat():string{
            var chat:Chat = new Chat(this.delegate, this)
            this.delegate.switchActiveCommandTo(chat);
            return chat.startUp();
        }
    }
    
    export class Chat extends Command{
    
        password:string = 'test';
        loggedIn:boolean = false;
    
        constructor(delegate: CommandDelegate, previous: Command) {
            super(delegate);
            this.previousActive = previous;
            this.commands = [
                'help',
                'quit',
                'startVideoChat'
            ];
        }
        
        startUp():string{
            return '\nWelcome to the global Budapest Science Chat! Please enter the password to continue:';
        }
    
        evalInput(text:string):string{
            var command = text.substr(0,text.indexOf(' '));
            var args = text.substr(text.indexOf(' ')+1);
            if (command == ''){
                command = args;
                args = '';
            }
            switch (command){
                case 'help': return this.help();
                case 'quit': return this.quit();
                case 'startVideoChat': if (this.loggedIn){ return this.startVideoChat(args)} else {return this.logIn(text)}
                default:
                    if (this.loggedIn){
                        return this.send(text);
                    } else {
                        return this.logIn(text);
                    }
            }
        }
    
        quit():string{
            if (this.previousActive != null){
                this.delegate.switchActiveCommandTo(this.previousActive);
            }
            return '';
        }
    
        send(text:string):string{
            return '\nunknown-user: '  + text;
        }
    
        logIn(text:string):string{
            this.loggedIn = text == this.password;
            return this.loggedIn ? '\nlogin successful! currently online users: 0 \ntype \'help\' for instructions or \'quit\' to exit the chat' 
                                : '\nwrong password. type \'help\' for instructions or \'quit\' to exit the chat'
        }

        startVideoChat(args:string):string{
            if (args == ''){
                return '\nsyntax error: name of user to connect to required. -> \'startVideoChat peter\''
            }
            return '\nuser ' + args + ' not availabe.'
        }
    }
}



