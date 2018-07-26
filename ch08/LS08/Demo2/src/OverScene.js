/**
 * Created by qile on 16/10/9.
 */
var OverLayer = cc.Layer.extend({
    ctor:function(){
        this._super();
        this.addChild(new cc.LayerColor(cc.color.GRAY));
        var size = cc.winSize;
        var label = new cc.LabelTTF("这是第三场景","",50);
        label.x = size.width*0.5;
        label.y = size.height*0.7;
        this.addChild(label);

        var menuItem = new cc.MenuItemFont("切换到第一场景",function(){
            cc.director.runScene(new StartScene());
            // cc.director.runScene(new cc.TransitionProgressInOut(2,new StartScene()));
        },this);
        var menu = new cc.Menu(menuItem);
        this.addChild(menu);
        menu.y = size.height*0.3;
        return true;
    }
});
var OverScene = cc.Scene.extend({
    ctor:function () {
        this._super();
        cc.log("OverScene:ctor");
    },
    onEnter:function(){
        this._super();
        cc.log("OverScene:onEnter");
        var layer = new OverLayer();
        this.addChild(layer);
    },
    onEnterTransitionDidFinish:function () {
        this._super();
        cc.log("OverScene:onEnterTransitionDidFinish");
    },
    onExitTransitionDidStart:function () {
        this._super();
        cc.log("OverScene:onExitTransitionDidStart");
    },
    onExit:function () {
        this._super();
        cc.log("OverScene:onExit");
    }
});