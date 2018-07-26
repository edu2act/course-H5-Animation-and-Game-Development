/**
 * Created by qile on 16/10/11.
 */
var StartLayer = cc.Layer.extend({

    ctor:function () {
        this._super();
        var size = cc.winSize;

        var startLabel = new cc.LabelTTF("开  始");
        startLabel.setFontSize(size.width / 8);
        startLabel.setFontFillColor(cc.color.ORANGE);
        startLabel.enableStroke(cc.color.YELLOW, 5);

        var startItem = new cc.MenuItemLabel(startLabel, function () {
            cc.director.runScene(new MainScene());
        }, this);

        var menu = new cc.Menu(startItem);
        menu.y = size.height / 5;
        this.addChild(menu);

        var logo = new cc.LabelTTF("飞机游戏DEMO");
        logo.setFontSize(size.width / 8);
        logo.enableStroke(cc.color.RED, 5);
        logo.x = size.width / 2;
        logo.y = size.height * 0.8;
        this.addChild(logo);

        return true;
    }
});

var StartScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new StartLayer();
        this.addChild(layer);
    }
});