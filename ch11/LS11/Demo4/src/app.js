var HelloWorldLayer = cc.Layer.extend({
    runner:null,
    stone:null,
    speed:2,
    ctor:function () {
        this._super();
        var size = cc.winSize;
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

        var stone = new cc.Sprite(res.Stone_Png);
        stone.setPosition(cc.p(size.width*0.8,size.height*0.2));
        stone.setAnchorPoint(0.5,0);
        this.addChild(stone);
        this.stone = stone;
        this.schedule(this.stoneCallBack);
        this.touchCallBack();
        return true;
    },
    stoneCallBack:function (dt) {
        if(this.stone.x<0){
            this.stone.x = cc.winSize.width*(1+cc.random0To1());
            this.speed += 2;
        }else{
            this.stone.x -= this.speed;
        }
        if(cc.rectContainsPoint(this.runner.getBoundingBox(),this.stone.getPosition())){
            cc.log("碰撞到了！");
            this.unscheduleAllCallbacks();
            this.runner.stopAllActions();
        }

    },
    touchCallBack:function () {
        var that = this;
        var listener = cc.EventListener.create({
            event:cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches:true,
            onTouchBegan:function (touch,event) {
                var location = touch.getLocation();
                that.runner.runAction(cc.jumpBy(0.8,0,0,100,1));
                return true;
            }
        });
        cc.eventManager.addListener(listener,this);
    }
});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});

