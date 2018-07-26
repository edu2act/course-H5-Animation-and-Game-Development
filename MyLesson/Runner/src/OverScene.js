var OverLayer = cc.Layer.extend({
    ctor:function () {
        this._super();
        // this.addChild(new cc.LayerColor(cc.color.BLUE));
        this.addChild(new cc.LayerColor(cc.color.WHITE));
        return true;
    }
});

var OverScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new OverLayer();
        this.addChild(layer);
    }
});

