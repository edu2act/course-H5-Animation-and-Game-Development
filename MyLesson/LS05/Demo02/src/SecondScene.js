var SecondLayer = cc.Layer.extend({
    ctor:function () {
        this._super();
        var size = cc.winSize;
        var bg = new cc.Sprite(res.Bg);
        bg.x = size.width/2;
        bg.y = size.height/2;
        this.addChild(bg);

        var plane = new cc.Sprite(res.Plane);
        plane.x = size.width/2;
        plane.y = size.height/2;
        this.addChild(plane);

        plane.setAnchorPoint(1.5,0.5);
        plane.runAction(cc.rotateBy(1,90).repeatForever());
        return true;
    }
});
var SecondScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new SecondLayer();
        this.addChild(layer);
    }
});