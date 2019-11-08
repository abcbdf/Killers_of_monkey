import {GameMain} from "./GameMain" 
import {Message} from "./msg";

export {WebHelper};

class WebHelper{
    private _controller: GameMain;
    ws: WebSocket;

    constructor(c: GameMain){
        this._controller = c;
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
        let args: Message = JSON.parse(data);
        switch (args.type) {
            case "TEST":
                this.rTest(args);
                break;
            case "WAITE":
                this._controller.rWait(args);
                break;
            case "START":
                this._controller.rStart(args);
                break;
        }
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