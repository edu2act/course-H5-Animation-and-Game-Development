/**
 * Created by dell-pc on 2015/11/22.
 */
var ASOverLayer = cc.Layer.extend({
    sprite: null,
    kuang: null,
    menu:null,
    ctor: function () {

        this._super();
        var size = cc.winSize;

        //背景
        this.myBg();

        //光
        this.light();
        //重玩菜单
        this.menuItem();

        //添加分数框
        this.kuang();

        //当前分数
        this.currentScore();

        //最高分数
        this.bestScore();

        return true;


    },

    /*-----------添加背景----------*/
    myBg: function () {
        var bg = new cc.Sprite(res.Over_png);
        bg.x = cc.winSize.width / 2;
        bg.y = cc.winSize.height / 2;
        this.addChild(bg);
        if (cc.sys.localStorage.getItem("isEffectOn") == "YES") {
            cc.audioEngine.playEffect(res.ScoreEffect_wav);
        }
    },

    /*-----------添加光------------*/
    light: function () {
        var light = new cc.Sprite(res.Light_png);
        light.setPosition(cc.winSize.width * 0.5, cc.winSize.height * 0.6);
        this.addChild(light);
        var rotate = cc.rotateBy(10, 360);
        light.runAction(rotate.repeatForever());
    },

    /*----------添加分数框---------*/
    kuang: function () {
        var kuang = new cc.Sprite(res.Gameover_png);
        var size = kuang.getBoundingBox();
        //kuang.setPosition(cc.winSize.width * 0.5, cc.winSize.height * 0.65);
        kuang.setPosition(cc.winSize.width*0.5,this.menu.y+size.height*0.68);
        this.addChild(kuang);
        this.kuang = kuang;
        //kuang.scale=0.8;
        var current = new cc.Sprite(res.Current_png);
        current.setPosition(size.width * 0.5, size.height * 0.62);
        kuang.addChild(current);
        var best = new cc.Sprite(res.Best_png);
        best.setPosition(size.width * 0.5, size.height * 0.235);
        kuang.addChild(best);
    },

    /*--------添加按钮---------*/
    menuItem: function () {
        var restartItem = new cc.MenuItemImage(res.Restart_normal_png, res.Restart_selected_png, function () {
            //cc.log("aaa");
            cc.director.runScene(new ASMainScene());
        }, this);
        var mainItem = new cc.MenuItemImage(res.Mainmenu_normal_png, res.Mainmenu_selected_png, function () {
            cc.director.runScene(new ASStartScene());
        }, this);
        var menu = new cc.Menu(restartItem, mainItem);
        menu.setPosition(cc.winSize.width * 0.5, cc.winSize.height * 0.15);
        //menu.alignItemsVerticallyWithPadding(30);
        menu.alignItemsVertically();
        this.addChild(menu);
        this.menu=menu;
    },

    /*--------当前分数标签---------*/
    currentScore: function () {
        var current = cc.sys.localStorage.getItem("currentScore");
        var label = new cc.LabelTTF(current, "", 130);
        label.setFontFillColor(cc.color.WHITE);
        label.enableStroke(cc.color(0, 191, 255), 3);
        /*        label.x = cc.winSize.width * 0.5;
         label.y = cc.winSize.height * 0.678;*/
        label.setPosition(this.kuang.getBoundingBox().width * 0.5, this.kuang.getBoundingBox().height * 0.46);
        this.kuang.addChild(label);
    },

    /*----------最佳分数标签-------*/
    bestScore: function () {
        var best = cc.sys.localStorage.getItem("bestScore");
        var label = new cc.LabelTTF(best, "", 90);
        label.setFontFillColor(cc.color.WHITE);
        label.enableStroke(cc.color(0, 191, 255), 3);
        /*label.x = cc.winSize.width * 0.5;
         label.y = cc.winSize.height * 0.42;*/
        label.setPosition(this.kuang.getBoundingBox().width * 0.5, this.kuang.getBoundingBox().height * 0.12);
        this.kuang.addChild(label);
    },
});

var ASOverScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        var layer = new ASOverLayer();
        this.addChild(layer);
    }
});
