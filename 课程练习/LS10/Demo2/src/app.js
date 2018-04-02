
var HelloWorldLayer = cc.Layer.extend({
    sprites:[],
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();
        var size = cc.winSize;
        this.addChild(new cc.LayerColor(cc.color.GRAY));
        
        //创建精灵数组
        for(var i=0;i<3;i++){
            this.sprites[i] = new cc.Sprite("res/sprite"+(i+1)+".png");
            this.sprites[i].x = size.width*0.2;
            this.sprites[i].y = size.height*(0.3*i+0.2);
            this.addChild(this.sprites[i]);
        }
        //即时动作(ActionInstant)和间隔动作(ActionInterval)，这两类动作都继承于有限时间动作类(FiniteTimeAction)。

        /*
        //即时动作(ActionInstant)练习
        this.sprites[0].runAction(cc.place(this.sprites[0].x+50,this.sprites[0].y));

        this.sprites[1].runAction(cc.flipX(true));
        this.sprites[1].runAction(cc.flipY(true));

        this.sprites[2].runAction(cc.hide());
        //this.sprites[2].runAction(cc.show());

        this.sprites[2].runAction(cc.callFunc(function(){
            //this.sprites[2].runAction(cc.show());
        },this));
        */

        /*
        //间隔动作(ActionInterval)练习一 移动、跳跃、旋转
        this.sprites[0].runAction(cc.moveBy(2.0,100,0));
        this.sprites[0].runAction(cc.moveBy(2.0,cc.p(100,0)));
        this.sprites[0].runAction(cc.moveTo(2.0,0,0));
        this.sprites[0].runAction(cc.moveTo(2.0,cc.p(0,0)));

        this.sprites[1].runAction(cc.jumpBy(2.0,100,0,100,2));
        this.sprites[1].runAction(cc.jumpBy(2.0,cc.p(100,0),100,2));
        this.sprites[1].runAction(cc.jumpTo(2.0,100,100,100,2));
        this.sprites[1].runAction(cc.jumpTo(2.0,cc.p(100,100),100,2));

        this.sprites[2].runAction(cc.rotateBy(2.0,90,0));
        this.sprites[2].runAction(cc.rotateBy(2.0,0,90));
        this.sprites[2].runAction(cc.rotateTo(2.0,90,0));
        */

        /*
        //间隔动作(ActionInterval)练习二 缩放 淡入淡出
        //this.sprites[0].runAction(cc.scaleBy(2.0,0.5));
        //this.sprites[0].runAction(cc.scaleBy(2.0,0.8,0.5));
        this.sprites[0].runAction(cc.scaleTo(2.0,1.2,1.2));

        this.sprites[1].runAction(cc.fadeOut(2.0));
        this.sprites[2].setOpacity(0);
        this.sprites[2].runAction(cc.fadeIn(5.0));
        */

        /*
        //间隔动作(ActionInterval)练习三 闪烁 进度条 颜色
        this.sprites[0].runAction(cc.blink(20.0,10));

        var timer = new cc.ProgressTimer(this.sprites[1]);
        timer.x = this.sprites[1].x+100;
        timer.y = this.sprites[1].y;
        this.addChild(timer);
        //timer.type = cc.ProgressTimer.TYPE_RADIAL;
        timer.type = cc.ProgressTimer.TYPE_BAR;
        timer.midPoint = cc.p(0,0);
        timer.barChangeRate = cc.p(0, 1);
        //timer.runAction(cc.progressFromTo(5.0,0,50));
        timer.runAction(cc.progressTo(5.0,50));

        this.sprites[2].runAction(cc.tintTo(5.0,128,0,0));
        //this.sprites[2].runAction(cc.tintBy(5.0,128,128,128));
        */

        /*
        //组合动画
        var action1 = cc.moveBy(2.0,100,0);
        var action2 = cc.rotateBy(2.0,90);
        //1.顺序执行
        //this.sprites[0].runAction(cc.sequence(action1,action2));
        this.sprites[0].runAction(cc.sequence(action1,cc.callFunc(function(){
            cc.log("action1 执行完毕");
        },this)));
        //2.同步执行 注意不要用spawn和callFunc组合
        var action3 = cc.moveBy(2.0,200,0);
        var action4 = cc.rotateBy(2.0,-90);
        this.sprites[1].runAction(cc.spawn(action3,action4));
        //3.重复执行
        var action5 = cc.rotateBy(1.0,-90);
        //this.sprites[2].runAction(cc.repeat(action5,5));
        this.sprites[2].runAction(cc.repeatForever(action5));
        //4.延迟执行
        this.sprites[0].runAction(cc.sequence(cc.delayTime(5.0),cc.rotateBy(5.0,180),cc.callFunc(function(){
            cc.log("action1 执行完毕");
        },this)));
        //5.反向执行
        var action6 = cc.moveBy(2.0,200,0);
        var action7 = action6.reverse();
        this.sprites[2].runAction(cc.sequence(action6,action7));
        */

        //帧动画 方法一
        var animation = new cc.Animation();
        for (var i = 1; i < 15; i++) {
            //var frameName = "res/Animation/grossini_dance_" + ((i < 10) ? ("0" + i) : i) + ".png";
            var frameName = res["sp_animation_"+i];
            animation.addSpriteFrameWithFile(frameName);
        }

        //for (var i = 1; i < 7; i++) {
        //    var frameName = "res/Animation3/pao_" + i + ".png";
        //    animation.addSpriteFrameWithFile(frameName);
        //}

        animation.setDelayPerUnit(1 / 1);
        animation.setRestoreOriginalFrame(true);
        var animateAction = cc.animate(animation);
        this.sprites[0].runAction(cc.repeatForever(animateAction));


        /*
        //帧动画 方法二
        cc.spriteFrameCache.addSpriteFrames(res.sp_animation_plist);
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
        this.sprites[1].runAction(animateAction.repeatForever());
        */

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

