// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
var webHelper = require("webHelper")

cc.Class({
    extends: cc.Component,

    properties: {
        m_BackGround:{
            default: null,
            type: cc.Node
        },
        m_Wait:{
            default: null,
            type: cc.Node
        },
        m_Scrollview:{
            default: null,
            type: cc.ScrollView
        },
        m_Card_prefab:{
            default: null,
            type: cc.Prefab
        },
        //wh: require("webHelper"),
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.num = 0;
        this.canMove = false;
        this.wh = new webHelper();
        this.wh.init(this);
        this.wh.connect("ws://localhost:8181");
        //this.wh.ready();
        //this.test();
    },

    test(){
        for(var i = 0; i < 15; i++){
            //var player_info = cc.instantiate(this.player_info_prefab);
            let new_card = cc.instantiate(this.m_Card_prefab);
            this.m_Scrollview.content.addChild(new_card);
            new_card.y = -80
        }
    },

    update (dt) {
        // var obj = {a: "hhhh", b: "cccc"};
        if (this.num % 6 == 0){
            // if (this.ws.readyState === WebSocket.OPEN) {
            //     //this.ws.send("Hello WebSocket, I'm a text message.");
            //     this.ws.send(JSON.stringify(obj));
            // }
            // else {
            //     //console.log("WebSocket instance wasn't ready...");
            // }
            //this.wh.test("hellotest");
        }
        this.num += 1
    },

    rWait (args) {
        this.m_Wait.active = true;
    },

    rStart (args) {
        this.m_Wait.active = false;
        console.log("roomNumber: " + args.roomNumber);
        console.log("memberId: " + args.memberId);
        console.log("userId: " + args.userId);
    }
});
