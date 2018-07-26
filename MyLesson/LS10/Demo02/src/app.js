
var HelloWorldLayer = cc.Layer.extend({
    runner:null,
    stone:null,
    ctor:function () {
        this._super();
        var size = cc.winSize;
/*
        this.addChild(new cc.LayerColor(cc.color.GRAY));
        // sp = new cc.Sprite(res["sp_animation_"+1]);
        cc.spriteFrameCache.addSpriteFrames(res.sp_animation_plist);
        sp = new cc.Sprite("#grossini_dance_generic_01.png");
        sp.setPosition(cc.p(size.width*0.2,size.height*0.5));
        this.addChild(sp);

        //帧动画 方法一
        var animation = new cc.Animation();
        for (var i = 1; i < 15; i++) {
            var frameName = res["sp_animation_"+i];
            animation.addSpriteFrameWithFile(frameName);
        }
        animation.setDelayPerUnit(1 / 30);
        animation.setRestoreOriginalFrame(true);
        var animateAction = cc.animate(animation);
        sp.runAction(cc.repeatForever(animateAction));

        var spriteFrames = [];
        for (var i = 1; i < 15; i++) {
            var frameName = "grossini_dance_generic_" + ((i < 10) ? ("0" + i) : i) + ".png";
            var frame = cc.spriteFrameCache.getSpriteFrame(frameName);
            spriteFrames.push(frame);
        }
        var animation = new cc.Animation(spriteFrames, 0.2, 2);
        //animation.setDelayPerUnit(1 / 30);
        animation.setRestoreOriginalFrame(true);
        var animateAction = cc.animate(animation);
        sp.runAction(animateAction.repeatForever());
*/
        this.addChild(new cc.LayerColor(cc.color.WHITE));
        var land = new cc.Sprite(res.Land_Png);
        land.setPosition(cc.p(size.width*0.5,size.height*0.2));
        land.setScaleX(1.5);
        this.addChild(land);
        cc.spriteFrameCache.addSpriteFrames(res.Run_Plist,res.Run_Png);
        var sp = new cc.Sprite("#run_1.png");
        sp.setPosition(cc.p(size.width*0.2,size.height*0.2));
        sp.setAnchorPoint(0.5,0);
        this.addChild(sp);
        this.runner = sp;

        var spriteFrames = [];
        for(var i=1;i<15;i++){
            var frameName = "run_" + i + ".png";
            var frame = cc.spriteFrameCache.getSpriteFrame(frameName);
            spriteFrames.push(frame);
        }
        var animation = new cc.Animation(spriteFrames);
        animation.setDelayPerUnit(1/30);
        animation.setRestoreOriginalFrame(true);
        var animate = cc.animate(animation);
        sp.runAction(animate.repeatForever());
        // sp.runAction(cc.repeatForever(cc.jumpBy(2,0,0,100,1)));

        var stone = new cc.Sprite(res.Stone_Png);
        stone.setPosition(cc.p(size.width*0.8,size.height*0.2));
        stone.setAnchorPoint(0.5,0);
        this.addChild(stone);
        this.stone = stone;

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

