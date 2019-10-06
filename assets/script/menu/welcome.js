// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        m_BackGround : cc.Node,
        m_LoadingPrefab : cc.Prefab,
        m_StartButton : cc.Node,
        m_GameScene : "gameScene"
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.m_Loading = cc.instantiate(this.m_LoadingPrefab);
        this.m_BackGround.addChild(this.m_Loading);
        this.m_Loading.y = -290;
        this.m_Loading = this.m_Loading.getComponent('loading');
        this.m_Loading.setProgress(1);
        var self = this
        this.m_Loading.finishCallBack = function(){
            cc.log("finish");
            self.m_Loading.node.active = false;
            self.m_StartButton.active = true;
        };
    },

    onClickStart:function(target){
        cc.director.loadScene(this.m_GameScene);
    },

    start () {

    },

    // update (dt) {},
});
