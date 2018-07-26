/**
 * Created by qile on 15-12-28.
 */
var OverLayer = cc.Layer.extend({
    sprite: null,
    ctor: function () {
        this._super();

        var size = cc.winSize;

        //bg
        var bg = new cc.Sprite(res.JieShuBeiJing_jpg);
        bg.x = size.width / 2;
        bg.y = size.height / 2;
        this.addChild(bg);

        //kuang
        var kuang = new cc.Sprite(res.JieShuKuang);
        kuang.x = size.width / 2;
        kuang.y = size.height / 2;
        this.addChild(kuang);

        //shuoming
        var shuoMing = new cc.LabelTTF("分享截图,红包最多者领奖","",size.width/18);
        shuoMing.x = size.width*0.43;
        shuoMing.y = size.width*1.12;
        shuoMing.setFontFillColor(cc.color.YELLOW);
        kuang.addChild(shuoMing);
        //shuoMing.visible = false;

        //menu
        var zailaiMenuItem = new cc.MenuItemImage(res.ZaiLaiAnNiu_png,res.ZaiLaiAnNiuB_png,function(){
            cc.director.runScene(new StartScene());
        },this);
        zailaiMenuItem.x = size.width*0.3;
        zailaiMenuItem.y = size.height*0.24;

        var xuanyaoMenuItem = new cc.MenuItemImage(res.XuanYaoAnNiu_png,res.XuanYaoAnNiuB_png,function(){
            //cc.director.runScene(new StartScene());
            var ac = cc.sequence(cc.scaleTo(0.2,1.2),cc.scaleTo(0.2,1.0));
            shuoMing.runAction(ac);
        },this);
        xuanyaoMenuItem.x = size.width*0.7;
        xuanyaoMenuItem.y = size.height*0.24;

        var menu = new cc.Menu(zailaiMenuItem,xuanyaoMenuItem);
        menu.x = 0;
        menu.y = 0;
        this.addChild(menu);


        zailaiMenuItem.scale = 0;
        xuanyaoMenuItem.scale = 0;
        var scaleAction = cc.scaleTo(0.5,1.0).easing((cc.easeElasticOut(0.5)));
        var seq = cc.sequence(cc.delayTime(0.2),scaleAction);
        zailaiMenuItem.runAction(seq);
        xuanyaoMenuItem.runAction(cc.sequence(cc.delayTime(0.2),seq.clone()));

        //score
        var scoreLabel = new cc.LabelTTF("","",size.width/12);
        scoreLabel.x = size.width*0.46;
        scoreLabel.y = size.width*1.02;
        scoreLabel.setFontFillColor(cc.color.YELLOW);
        kuang.addChild(scoreLabel);

        var score = cc.sys.localStorage.getItem("currentScore");
        scoreLabel.setString(score);
        scoreLabel.scale = 0;
        //var scaleAction = cc.scaleTo(0.5,1.0).easing((cc.easeElasticOut(0.5)));
        //var seq = cc.sequence(cc.delayTime(0.2),scaleAction);
        scoreLabel.runAction(seq.clone());



        return true;
    }
});

var OverScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        var layer = new OverLayer();
        this.addChild(layer);
    }
});