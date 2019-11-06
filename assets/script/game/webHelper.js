// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

//var sleep = require('sleep');

cc.Class({
    extends: cc.Component,

    properties: {
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

    init(c){
        this._controller = c;
    },

    connect (addr) {
        self = this
        this.ws = new WebSocket(addr);
        this.ws.onopen = function (event) {
            console.log("Send Text WS was opened.");
            self.ready();
        };
        this.ws.onmessage = function (event) {
            //var args = JSON.parse(event.data);
            self.receive(event.data);
            //console.log("response text msg: " + event.data);
        };
        this.ws.onerror = function (event) {
            console.log("Send Text fired an error");
        };
        this.ws.onclose = function (event) {
            console.log("WebSocket instance closed.");
        };
    },

    test_open () {
        // while (!(this.ws.readyState === WebSocket.OPEN))
        // {
        //     console.log("WebSocket instance wasn't ready...");
        //     sleep.sleep(0.1);
        // }
        if (!(this.ws.readyState === WebSocket.OPEN))
        //if (!(0 === 1))
        {
            console.log("WebSocket instance wasn't ready...");
            return false;
        }
        else
        {
            return true;
        }
    },

    ready () {
        //var result = this.test_open();
        //console.log(result);
        var obj = {type: "READY"};
        this.ws.send(JSON.stringify(obj));

    },

    test (message) {
        var state = this.test_open();
        if (state === false){
            return;
        }
        var obj = {type: "TEST", msg: message};
        this.ws.send(JSON.stringify(obj));
    },


    //************receive message bellow */

    receive (data) {
        var args = JSON.parse(data);
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
    },

    rTest (args) {
        console.log("from server test: " + args.msg);
    }

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    // start () {

    // },

    // update (dt) {},
});
