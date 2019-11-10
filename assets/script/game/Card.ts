// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

import {CardData} from "./msg";

const {ccclass, property} = cc._decorator;

export {Card};
@ccclass
class Card extends cc.Component {

    @property(cc.Label)
    cardNameLabel: cc.Label = null;
    @property(cc.Label)
    rankLabel: cc.Label = null;
    @property(cc.Label)
    attackLabel: cc.Label = null;
    @property(cc.Label)
    defendLabel: cc.Label = null;
    @property(cc.Label)
    dodgeLabel: cc.Label = null;
    @property(cc.Label)
    raceLabel: cc.Label = null;

    cardData: CardData;

    /*can be optimized, change shrink*/
    init(_cardData: CardData)
    {
        this.cardData = _cardData;
        this.cardNameLabel.string = this.cardData.name;
        this.rankLabel.string = this.cardData.rank;
        this.attackLabel.string = this.cardData.attack.toString();
        this.defendLabel.string = this.cardData.defend.toString();
        this.dodgeLabel.string = this.cardData.dodge.toString();
        this.raceLabel.string = this.cardData.race;

        this.cardNameLabel.overflow = cc.Label.Overflow.SHRINK;
    }


    // LIFE-CYCLE CALLBACKS:

    onLoad () 
    {
    }

    start () {

    }

    // update (dt) {}
}
