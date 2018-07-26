var FirstLayer = cc.Layer.extend({
    ctor:function () {
        this._super();
        var size = cc.winSize;
        var sp1 = new cc.Sprite(res.Red_png);
        sp1.x = 200;
        sp1.y = 200;
        this.addChild(sp1);
/*
        var sp2 = new cc.Sprite(res.Yellow_png);
        sp2.x = 400;
        sp2.y = 400;
        this.addChild(sp2);
*/
        return true;
    }
});

var FirstScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new FirstLayer();
        this.addChild(layer);
    }
});