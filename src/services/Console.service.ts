import {consoleText} from "../stores";

export default class ConsoleService {

    static append(text:string){
        consoleText.update((x) => x += `${text} \r\n`);
    }

    static prepend(text:string){
        consoleText.update((x) => x = `${text} \r\n${x}`);
    }

    static clear(){
        consoleText.set("");
    }

}
