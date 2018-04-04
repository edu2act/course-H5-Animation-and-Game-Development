var HelloWorldLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();
        var size = cc.winSize;
        
        var label = new cc.LabelTTF("xxx");
        label.x = size.width / 2;
        label.y = size.height * 0.8;
        label.setFontSize(20);
        this.addChild(label);

        var redSprite = new MySprite(res.Red_png);
        redSprite.x = size.width *0.4;
        redSprite.y = size.height*0.5;
        redSprite.tag = 99;
        this.addChild(redSprite);

        var yellowSprite = new MySprite(res.Yellow_png);
        yellowSprite.x = size.width *0.6;
        yellowSprite.y = size.height*0.5;
        yellowSprite.tag = 100;
        this.addChild(yellowSprite);
/*
        //var that = this;
        //var cbAction = cc.callFunc(function(){that.removeChild(redSprite)});
        var cbAction = cc.callFunc(function(){
            redSprite.getParent().removeChild(redSprite)
        });
        this.runAction(cc.sequence(cc.delayTime(5),cbAction));
*/
        return true;
    }
});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});

