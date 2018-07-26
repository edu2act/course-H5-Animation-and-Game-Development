var OverLayer = cc.Layer.extend({
    ctor:function () {
        this._super();
        var size = cc.winSize;
        return true;
    }
});
var OverScene = cc.Scene.extend({
    ctor:function () {
        this._super();
        var layer = new OverLayer();
        this.addChild(layer);
    }
});