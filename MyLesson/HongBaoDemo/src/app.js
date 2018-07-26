var HelloWorldLayer = cc.Layer.extend({
    ctor:function () {
        this._super();

        var size = cc.winSize;

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

