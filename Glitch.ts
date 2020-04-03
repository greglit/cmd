/// <reference path="Utility.ts" />

namespace cmd{
    
    export class Glitch {

        glitchActivated:boolean = true;
        glitchPauseMilliseconds:number = 100000;
        glitchDurationMilliseconds:number = 100;

        constructor() {
            this.start();
        }

        async start():Promise<void>{
			while (this.glitchActivated){
                await wait(this.glitchPauseMilliseconds);
                ($('body') as any).mgGlitch({blendModeType : 'hue'});
                await wait(this.glitchDurationMilliseconds);
                ($('body') as any).mgGlitch({destroy: true});
			}
        }

        async totalMeltdown(durationSeconds: number):Promise<void> {
            ($('body') as any).mgGlitch({
                glitch1TimeMin : 1,
                glitch1TimeMax : 200,
                glitch2TimeMin : 1,
                glitch2TimeMax : 200,
            });
            ($('body') as any).mgGlitch({
                glitch1TimeMin : 1,
                glitch1TimeMax : 200,
                glitch2TimeMin : 1,
                glitch2TimeMax : 200,
            });
            ($('body') as any).mgGlitch({
                glitch1TimeMin : 1,
                glitch1TimeMax : 200,
                glitch2TimeMin : 1,
                glitch2TimeMax : 200,
            });
            this.invertMadness(durationSeconds);
            await wait(durationSeconds*1000);
            ($('body') as any).mgGlitch({destroy: true});
        }

        async invertMadness(durationSeconds:number):Promise<void>{
            var on:boolean = true;
            setTimeout(() => on = false, durationSeconds*1000);
            while (on){
                $('body').css('filter','invert()');
                await wait(getRandomNumber(10, (durationSeconds*1000)/16));
                $('body').css('filter','');
                await wait(getRandomNumber(10, (durationSeconds*1000)/4));
            }
        }
        
    }
}