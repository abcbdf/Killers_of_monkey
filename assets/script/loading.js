

cc.Class({
    extends: cc.Component,

    properties: {
        m_ProImage: cc.Node,
        m_ProMaxLen:
        {
            default: 700,
            type: cc.Integer,
        },
        m_Speed:
        {
            default: 300,
            type: cc.Integer,
        },
        // m_Finished:
        // {
        //     default: false,
        //     type: cc.Boolean,
        // }
    },

    setProgress:function(pro){
        if ( pro > 1 || pro < 0){
            return;
        }
        this.m_SetWidth = this.m_ProMaxLen * pro;
        //this.m_ProImage.width = this.m_ProMaxLen * pro
    },
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.m_ProImage.width = 0;
        this.m_Finished = false;
    },

    start () {

    },

    update (dt) {
        if (this.m_Finished == false)
        {
            if (this.m_ProImage.width < this.m_SetWidth)
            {
                this.m_ProImage.width += dt * this.m_Speed;
            }
            else if (this.m_ProImage.width >= this.m_ProMaxLen)
            {
                this.m_Finished = true;
                this.finishCallBack();
            }
        }

    },
});
