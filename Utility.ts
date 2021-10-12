
namespace cmd {

    export function rmvSpace(str:string):string{
		while (str.slice(-1) == ' '){
			str = str.slice(0, -1); 
		}
		return str;
	}

	export async function wait(milliseconds:number):Promise<{}>{
		return new Promise(r => setTimeout(r, milliseconds));
	}

	export function isNumber(value: string | number): boolean{
		return ((value != null) && (value !== '') && !isNaN(Number(value.toString())));
    }
    
    export function getRandomNumber(min:number, max:number):number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

}