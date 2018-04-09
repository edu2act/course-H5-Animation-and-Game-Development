var ASMainLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        var size = cc.winSize;
        this.addChild(new cc.LayerColor(cc.color.GRAY));

        var ls = cc.sys.localStorage;
        //返回按钮
        var startMenuItem = new cc.MenuItemFont("返 回", function () {
            //if (ls.getItem("isEffectOn") == "YES") {
            //    cc.audioEngine.playEffect(res.Click_mp3);
            //}
            EffectEngine.playEffect(res.Click_mp3);
            cc.director.runScene(new ASStartScene());
        }, this);
        startMenuItem.setFontSize(80);
        startMenuItem.setColor(cc.color.BLACK);
        startMenuItem.setFontName("Arial");

        //菜单
        startMenuItem.x = size.width/2;
        startMenuItem.y = size.height/2;

        var menu = new cc.Menu(startMenuItem);
        menu.x = 0;
        menu.y = 0;
        this.addChild(menu);
        return true;
    }
});

var ASMainScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new ASMainLayer();
        this.addChild(layer);
    }
});

var EffectEngine = function(){};
EffectEngine.playEffect = function(url){
    if (cc.sys.localStorage.getItem("isEffectOn") == "YES") {
        cc.audioEngine.playEffect(url);
    }
};