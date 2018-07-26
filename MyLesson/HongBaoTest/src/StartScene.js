var StartLayer = cc.Layer.extend({
    ctor:function () {
        this._super();

        var size = cc.winSize;
        //添加背景
        var bg = new cc.Sprite(res.KaiShiBeiJing_jpg);
        bg.x = size.width/2;
        bg.y = size.height/2;
        this.addChild(bg);

        //添加菜单 并设置动画效果
        var startMenuItem = new cc.MenuItemImage(res.KaiShiAnNiu_png,res.KaiShiAnNiuB_png,function(){
            cc.director.runScene(new MainScene());
        },this);
        startMenuItem.x = size.width/2;
        startMenuItem.y = size.height*0.25;
        var menu = new cc.Menu(startMenuItem);
        menu.x = 0;
        menu.y = 0;
        this.addChild(menu);

        startMenuItem.scale = 0;
        var scaleAction = cc.scaleTo(0.5,1.0).easing((cc.easeElasticOut(0.5)));
        //var seq1 = (cc.sequence(cc.scaleTo(0.5,1.2),cc.scaleTo(0.5,1.0))).repeatForever();
        var seq = cc.sequence(cc.delayTime(0.5),scaleAction);
        startMenuItem.runAction(seq);

        //添加Logo 并设置动画效果
        var logo = new cc.Sprite(res.Logo);
        logo.x = size.width/2;
        logo.y = size.height*1.5;
        this.addChild(logo);

        var moveTo = cc.moveTo(0.5,logo.x,size.height*0.65).easing(cc.easeElasticOut(0.5));
        logo.runAction(moveTo);

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