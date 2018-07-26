/**
 * Created by qile on 16/10/9.
 */
var CustomLayer = cc.Layer.extend({
    ctor:function(){
        this._super();
        var size = cc.winSize;
        var label = new cc.LabelTTF("我是CustomLayer","",50);
        label.setPosition(size.width/2,size.height/2);
        this.addChild(label);
        return true;
    }
});
var BgLayer = cc.Layer.extend({
    ctor:function () {
        this._super();//this.addChild(cc.LayerColor(cc.color.WHITE));
        var gdLayer1 = new cc.LayerGradient(cc.color.RED, new cc.Color(255,0,0,0), cc.p(0, -1));
        var gdLayer2 = new cc.LayerGradient(cc.color.RED, new cc.Color(255,0,0,0), cc.p(-1, -1),
            [{p:0, color: cc.color.YELLOW},
                {p:.5, color: new cc.Color(0,0,0,0)},
                {p:1, color: cc.color.BLUE}]);

        // this.addChild(gdLayer1);
        this.addChild(gdLayer2);
    }
});
var StartScene = cc.Scene.extend({
    ctor:function () {
        this._super();
        var bgLayer = new BgLayer();
        this.addChild(bgLayer);

        var customLayer = new CustomLayer();
        this.addChild(customLayer);
    }
});
