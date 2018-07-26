var StarBlink = cc.Layer.extend({
    starTopArray:null,
    starBottemArray:null,
    starLeftArray:null,
    starRightArray:null,
    ctor: function () {

        this._super();
        this.starTopArray = new Array();
        this.starBottemArray = new Array();
        this.starLeftArray = new Array();
        this.starRightArray = new Array();

    },
    add:function(){
        //添加上部星星
        for(var i = 0;i<=6;i++){
            var starTop = new StarSprite(res.starblink1_png);
            starTop.x = cc.winSize.width*0.05+i*108;
            starTop.y = cc.winSize.height*0.815;
            starTop.setScale(1.3);
            this.addChild(starTop);
            this.starTopArray.push(starTop);
        }
        //添加底部星星
        for(var i = 0;i<=6;i++){
            var starBottem = new StarSprite(res.starblink1_png);
            starBottem.x = cc.winSize.width*0.05+i*108;
            starBottem.y = cc.winSize.height*0.065;
            starBottem.setScale(1.3);
            this.addChild(starBottem);
            this.starBottemArray.push(starBottem);
        }
        //添加左边星星
        for(var i = 0;i<=8;i++){
            var starLeft = new StarSprite(res.starblink1_png);
            starLeft.x = cc.winSize.width*0.05;
            starLeft.y = cc.winSize.height*0.75-i*100;
            starLeft.setScale(1.3);
            this.addChild(starLeft);
            this.starLeftArray.push(starLeft);
        }
        //添加右边星星
        for(var i = 0;i<=8;i++){
            var starRight = new StarSprite(res.starblink1_png);
            starRight.x = cc.winSize.width*0.95;
            starRight.y = cc.winSize.height*0.75-i*100;
            starRight.setScale(1.3);
            this.addChild(starRight);
            this.starRightArray.push(starRight);
        }
    },
    blink: function () {
        //上面星星闪烁
        for(var i in this.starTopArray){
            this.starTopArray[i].runAction(cc.repeatForever(cc.blink(2,4),cc.callFunc(function () {
                for(var i in this.starTopArray){
                    this.starTopArray[i].removeFromParent();
                }
            },this)))
        }
        //下面星星闪烁
        for(var i in this.starBottemArray){
            this.starBottemArray[i].runAction(cc.repeatForever(cc.blink(2,4),cc.callFunc(function () {
                for(var i in this.starBottemArray){
                    this.starBottemArray[i].removeFromParent();
                }
            },this)))
        }
        //左边星星闪烁
        for(var i in this.starLeftArray){
            this.starLeftArray[i].runAction(cc.repeatForever(cc.blink(2,4),cc.callFunc(function () {
                for(var i in this.starLeftArray){
                    this.starLeftArray[i].removeFromParent();
                }
            },this)))
        }
        //右边星星闪烁
        for(var i in this.starRightArray){
            this.starRightArray[i].runAction(cc.repeatForever(cc.blink(2,4),cc.callFunc(function () {
                for(var i in this.starRightArray){
                    this.starRightArray[i].removeFromParent();
                }
            },this)))
        }
    },
    onEnter: function () {
        this._super();
        this.add();
        this.blink();
    }
});