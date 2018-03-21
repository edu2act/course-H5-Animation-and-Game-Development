
var HelloWorldLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();
        var size = cc.winSize;
        this.addChild(new cc.LayerColor(cc.color.WHITE));

        var playMenuItem = new cc.MenuItemImage(res.PlayBtnNormal_png,res.PlaytBtnSelected_png,function(){
            cc.log("playMenuItem");
        },this);

        var aboutMenuItem = new cc.MenuItemImage(res.AboutBtnNormal_png,res.AboutBtnSelected_png,function(){
            cc.log("aboutMenuItem");
        },this);

        var highMenuItem = new cc.MenuItemImage(res.HightScoresBtnNormal_png,res.HighScoresBtnSelected_png,function(){
            cc.log("highMenuItem");
        },this);

        var menu = new cc.Menu(playMenuItem,aboutMenuItem,highMenuItem);
        this.addChild(menu);

        menu.alignItemsHorizontallyWithPadding(50);

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

