/**
 * Created by 宗闪 on 2015/12/28.
 */
var MainLayer = cc.Layer.extend({
    hand:null,
    score:null,
    hbArr:null,
    time:null,
    countDownTime:null,
    cTime:null,
    index:null,
    ctor : function () {
        this._super();

        var size = cc.winSize;
        this.hbArr = [];
        this.time = 0;
        this.score = 0;
        this.index = 0;
        this.countDownTime = 10;
        // 背景
        var bg = new cc.Sprite(res.Bg_jpg);
        bg.setPosition(size.width*0.5, size.height*0.5);
        this.addChild(bg);

        // 倒计时logo
        var countDown = new cc.Sprite(res.CountDown_png);
        countDown.setPosition(size.width*0.7, size.height-countDown.getBoundingBox().height);
        this.addChild(countDown);

        // 倒计时Label
        this.cTime = new cc.LabelTTF("", "",size.width*0.1);
        this.cTime.setPosition(countDown.x + countDown.getBoundingBox().width*0.8, countDown.y);
        this.cTime.setString(10);
        this.cTime.setColor(cc.color(200,100,100));
        this.addChild(this.cTime);

        this.addHand();

        this.addTouchListener();

        this.addHongbao(size);

        this.scheduleUpdate();

        return true;
    },
    update: function (dt) {
        this.time++;
        // 倒计时
        if(this.time % 60 == 0){
            this.countDownTime--;
            this.cTime.setString(this.countDownTime);
            if(this.countDownTime == 0){
                cc.sys.localStorage.setItem("currentScore", this.score);
                cc.director.runScene(new OverScene());
            }
        }
        // 掉红包
        if(this.time % 30 == 0){
            var randY = Math.random()*1000+1000;
            var spawn = cc.spawn(cc.rotateBy(1, 360), cc.moveBy(1, cc.p(0,-randY)));
            this.hbArr[this.index].runAction(spawn.repeatForever());
            this.index++;
            if(this.index > this.hbArr.length-1){
                this.index = 0;
            }
        }
        // 碰撞
        for(var i = 0; i<this.hbArr.length; i++){
            if(cc.rectContainsPoint(this.hbArr[i].getBoundingBox(), this.hand.getPosition())){
                this.hbArr[i].removeFromParent();
                this.addScoreAnimation(this.hbArr[i].getPosition())
                this.hbArr.splice(i,1);
                this.score++;
            }
        }
    },
    // 加分动画
    addScoreAnimation: function (point) {
        var sp = new cc.Sprite(res.Score_png);
        this.addChild(sp);
        sp.setPosition(point);
        sp.runAction(cc.sequence(cc.moveBy(0.5, cc.p(0, cc.winSize.height*0.1)), cc.callFunc(function () {
            sp.removeFromParent();
        },this)))
    },
    // 添加红包100个
    addHongbao: function (size) {
        for(var i = 0; i<50; i++){
            var randX = Math.random()*(size.width-70)+35;
            var hb = new cc.Sprite(res.Hongbao_png);
            hb.setPosition(randX, size.height+hb.getBoundingBox().height*0.5);
            this.addChild(hb);
            this.hbArr.push(hb);
        }
    },
    xialuo: function () {
        cc.moveBy(3, 300);
    },
    // 添加帧动画的手
    addHand: function () {
        var size = cc.winSize;
        this.hand = new cc.Sprite(res.Hand_1_png);
        this.hand.setPosition(size.width*0.5, this.hand.getBoundingBox().height*0.5);
        this.addChild(this.hand);

        var animation = new cc.Animation();
        for(var i = 1; i<=2; i++){
            var frameName = res["Hand_"+i+"_png"];
            animation.addSpriteFrameWithFile(frameName);
        }
        animation.setDelayPerUnit(0.2);
        animation.setRestoreOriginalFrame(true);
        var animate = new cc.Animate(animation);
        this.hand.runAction(animate.repeatForever());
    },
    // 添加点击事件
    addTouchListener: function () {
        var self = this;
        cc.eventManager.addListener({
            event : cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches : true,
            onTouchBegan : function (touch, event) {
                var location = touch.getLocation();
                var delta = touch.getDelta();
                if(cc.rectContainsPoint(self.hand.getBoundingBox(), location)){
                    return true;
                }
                return false;
            },
            onTouchMoved : function (touch, event) {
                var location = touch.getLocation();
                var delta = touch.getDelta();
                self.hand.setPositionX(self.hand.x + delta.x);
                if(self.hand.x < self.hand.getBoundingBox().width*0.5){
                    self.hand.x = self.hand.getBoundingBox().width*0.5;
                }
                if(self.hand.x > cc.winSize.width-self.hand.getBoundingBox().width*0.5){
                    self.hand.x = cc.winSize.width-self.hand.getBoundingBox().width*0.5;
                }
            }
        },this)
    }
});

var MainScene = cc.Scene.extend({
    onEnter : function () {
        this._super();
        var layer = new MainLayer();
        this.addChild(layer);
    }
});