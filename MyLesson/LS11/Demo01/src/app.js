
var HelloWorldLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {

        this._super();
        var size = cc.winSize;
        var listener = cc.EventListener.create({
            event:cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches:true,
            onTouchBegan: function (touch, event) {
                cc.log("onTouchBegan");
                return true;
            },
            onTouchMoved: function (touch, event) {
                cc.log("onTouchMoved");
            },
            onTouchEnded: function (touch, event) {
                cc.log("onTouchEnded");
            }
        });
        cc.eventManager.addListener(listener,this);

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

