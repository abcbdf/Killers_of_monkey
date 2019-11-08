import {WebHelper} from "./WebHelper"
import { Message } from "./msg";

export {GameMain};

const {ccclass, property} = cc._decorator;

@ccclass
class GameMain extends cc.Component {

    // @property(cc.Label)
    // label: cc.Label = null;

    // @property
    // text: string = 'hello';
    @property(cc.Node)
    m_BackGround: cc.Node = null;
    @property(cc.Node)
    m_Wait: cc.Node = null;
    @property(cc.ScrollView)
    m_Scrollview: cc.ScrollView = null;
    @property(cc.Prefab)
    m_Card_prefab: cc.Prefab = null;

    wh: WebHelper = null;
    frame_num: number = 0;
    movable: boolean = false;


    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        this.frame_num = 0;
        this.movable = false;
        this.wh = new WebHelper(this);
        this.wh.connect("ws://localhost:8181");
        //this.test_card();
    }

    test_card(){
        for(var i = 0; i < 15; i++){
            //var player_info = cc.instantiate(this.player_info_prefab);
            let new_card = cc.instantiate(this.m_Card_prefab);
            this.m_Scrollview.content.addChild(new_card);
            new_card.y = -80
        }
    }

    update (dt: number) {
        // var obj = {a: "hhhh", b: "cccc"};
        if (this.frame_num % 6 == 0){
            // if (this.ws.readyState === WebSocket.OPEN) {
            //     //this.ws.send("Hello WebSocket, I'm a text message.");
            //     this.ws.send(JSON.stringify(obj));
            // }
            // else {
            //     //console.log("WebSocket instance wasn't ready...");
            // }
            //this.wh.test("hellotest");
        }
        this.frame_num += 1
    }

    rWait (args: Message) {
        this.m_Wait.active = true;
    }

    rStart (args: Message) {
        this.m_Wait.active = false;
        console.log("roomNumber: " + args.roomNumber);
        console.log("memberId: " + args.memberId);
        console.log("userId: " + args.userId);
    }

}

