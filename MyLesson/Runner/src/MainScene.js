var MainLayer = cc.Layer.extend({
    ctor:function () {
        this._super();
        // this.addChild(new cc.LayerColor(cc.color.GREEN));
        this.addChild(new cc.LayerColor(cc.color.WHITE));
        return true;
    }
});

var MainScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new MainLayer();
        this.addChild(layer);
    }
});

