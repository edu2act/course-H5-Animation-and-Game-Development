var StartLayer = cc.Layer.extend({
    ctor:function () {
        this._super();
        //场景测试
        // this.addChild(new cc.LayerColor(cc.color.RED));
        this.addChild(new cc.LayerColor(cc.color.WHITE));
        return true;
    }
});

var StartScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new StartLayer();
        this.addChild(layer);
    }
});

