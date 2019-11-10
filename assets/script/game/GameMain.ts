import {WebHelper} from "./WebHelper"
import {Message, CardData} from "./msg";
import {Card} from "./Card";

export {GameMain};

const {ccclass, property} = cc._decorator;

@ccclass
class GameMain extends cc.Component {

    // @property(cc.Label)
    // label: cc.Label = null;

    // @property
    // text: string = 'hello';
    @property(cc.Node)
    backGround: cc.Node  = null;
    @property(cc.Node)
    waitLabel: cc.Node = null;
    @property(cc.ScrollView)
    myCardScrollview: cc.ScrollView = null;
    @property(cc.ScrollView)
    opponentCardScrollview: cc.ScrollView = null;
    @property(cc.Prefab)
    cardPrefab: cc.Prefab = null;
    @property(cc.Prefab)
    cardBackPrefab: cc.Prefab = null;

    wh: WebHelper;
    frame_num: number = 0;
    movable: boolean = false;
    myCardNum = 0;
    opponentCardNum = 0;
    // cardControllerList: Card[] = [];
    // playerCardList: CardData[] = [];


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
            let new_card = cc.instantiate(this.cardPrefab);
            this.myCardScrollview.content.addChild(new_card);
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

    rWait (msg: Message) {
        this.waitLabel.active = true;
    }

    rStart (msg: Message) {
        this.waitLabel.active = false;
        // console.log("roomNumber: " + args.roomNumber);
        // console.log("memberId: " + args.memberId);
        // console.log("userId: " + args.userId);
    }

    rDrawCard (msg: Message)
    {
        for(let i = 0; i < 1; i ++){
            this.myCardNum ++;
            let myCardScrollViewSize = this.myCardScrollview.node.getContentSize();
            let cardSize = this.cardPrefab.data.getContentSize();
            let padding = Math.max((myCardScrollViewSize.width - cardSize.width * this.myCardNum) / 2, 0);
            let new_card = cc.instantiate(this.cardPrefab);
            this.myCardScrollview.content.addChild(new_card);
            new_card.anchorY = 1;
            //new_card.y = -80
    
            this.myCardScrollview.content.getComponent(cc.Layout).paddingLeft = padding;
            this.myCardScrollview.content.getComponent(cc.Layout).paddingRight = padding;
            let cardController = new_card.getComponent(Card);
            cardController.init(msg.card);   
        }
     
    }

    rOpponentDrawCard (msg: Message)
    {
        this.opponentCardNum ++;
        let opponentCardScrollViewSize = this.opponentCardScrollview.node.getContentSize();
        let cardBackSize = this.cardBackPrefab.data.getContentSize();
        let padding = Math.max((opponentCardScrollViewSize.width - cardBackSize.width * this.opponentCardNum) / 2, 0);
        let new_card = cc.instantiate(this.cardBackPrefab);
        this.opponentCardScrollview.content.addChild(new_card);
        new_card.anchorY = 1;
        this.opponentCardScrollview.content.getComponent(cc.Layout).paddingLeft = padding;
        this.opponentCardScrollview.content.getComponent(cc.Layout).paddingRight = padding;

    }

}

