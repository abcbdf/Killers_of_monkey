import {GameMain} from "./GameMain" 
import {Message} from "./msg";

export {WebHelper};

interface BaseHandler{
    (msg: Message): void;
}


class WebHelper{
    private _controller: GameMain;
    ws: WebSocket;

    readonly handlers: {[keys: string]: BaseHandler};
    // readonly handlers: {[keys: string]: BaseHandler} = {
    //     "TEST": this.rTest,
    //     "WAITE": this._controller.rWait,
    //     "ENTERROOM": this._controller.rStart,
    //     "DRAWCARD": this._controller.rDrawCard,
    //     "OPPONENTDRAWCARD": this._controller.rOpponentDrawCard,
    // };

    /*don't directly use this*/
    constructor(c: GameMain){
        this._controller = c;
        this.handlers = {
            "TEST": (msg: Message) => {this.rTest(msg)},
            "WAITE": (msg: Message) => {this._controller.rWait(msg)},
            "ENTERROOM": (msg: Message) => {this._controller.rStart(msg)},
            "DRAWCARD": (msg: Message) => {this._controller.rDrawCard(msg)},
            "OPPONENTDRAWCARD": (msg: Message) => {this._controller.rOpponentDrawCard(msg)},
        };
    }

    connect(addr: string){
        this.ws = new WebSocket(addr);
        this.ws.onopen = (event) => {
            console.log("Send Text WS was opened.");
            this.ready();
        };
        this.ws.onmessage = (event) => {
            //var args = JSON.parse(event.data);
            this.receive(event.data);
            //console.log("response text msg: " + event.data);
        };
        this.ws.onerror = (event) => {
            console.log("Send Text fired an error");
        };
        this.ws.onclose = (event) => {
            console.log("WebSocket instance closed.");
        };
    }

    receive (data: string) {
        console.log(data);
        let msg: Message = JSON.parse(data);
        let handler = this.handlers[msg.type];
        handler(msg);
    }

    rTest (args: Message) {
        console.log("from server test: " + args.msg);
    }

    ready () {
        //var result = this.test_open();
        //console.log(result);
        let obj: Message = {type: "READY"};
        this.ws.send(JSON.stringify(obj));

    }
}