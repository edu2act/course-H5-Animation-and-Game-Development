var MainLayer = cc.Layer.extend({
    hand:null,//手
    score:0,//分数（抢到的红包数）
    hbArr:[],//红包数组
    timeCount:10,//计时数据
    timeLabel:null,//计时的label
    ctor : function () {
        this._super();
        var size = cc.winSize;
        //1.添加背景
        this.addBg(size);

        //2.添加倒计时图标及初始内容（10秒）
        this.addCountDown(size);

        //3.开启计时功能
        this.schedule(this.countDownFun,1);

        //4.添加手及帧动画
        this.addHand(size);

        //5.添加点击和滑动事件监听及响应方法
        this.addTouchListener();

        //6.添加红包数组
        this.addHongbao(size);

        //7.开启定时器进行，红包随机下落和碰撞检测
        this.scheduleUpdate();
        return true;
    },
    addBg:function (size) {
        var bg = new cc.Sprite(res.Bg_jpg);
        bg.setPosition(size.width*0.5, size.height*0.5);
        this.addChild(bg);
    },
    addCountDown:function (size) {
        // 倒计时图标
        var countDown = new cc.Sprite(res.CountDown_png);
        countDown.setPosition(size.width*0.7, size.height-countDown.getBoundingBox().height);
        this.addChild(countDown);

        // 倒计时内容值
        this.timeLabel = new cc.LabelTTF("", "",size.width*0.1);
        this.timeLabel.setPosition(countDown.x + countDown.getBoundingBox().width*0.8, countDown.y);
        this.timeLabel.setString(10);
        this.timeLabel.setColor(cc.color(200,100,100));
        this.addChild(this.timeLabel);
    },
    addHand: function (size) {
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
    addHongbao: function (size) {
        for(var i = 0; i<100; i++){
            var hb = new cc.Sprite(res.Hongbao_png);
            hb.setPosition(Math.random()*size.width,size.height*(cc.random0To1()*i+1));
            hb.runAction(cc.repeatForever(cc.rotateBy(cc.random0To1()*5,360)));
            this.addChild(hb);
            this.hbArr.push(hb);
        }
    },
    addTouchListener: function () {
        var self = this;
        cc.eventManager.addListener({
            event : cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches : true,
            onTouchBegan : function (touch, event) {
                var location = touch.getLocation();
                var delta = touch.getDelta();
                // if(cc.rectContainsPoint(self.hand.getBoundingBox(), location)){
                if(cc.rectContainsPoint(self.getBoundingBox(), location)){
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
    },
    countDownFun:function (dt) {
        if(this.timeCount < 1){
            cc.log("jieshu");
            cc.sys.localStorage.setItem("currentScore", this.score);
            cc.director.runScene(new OverScene());
        }else{
            this.timeCount -= 1;
            this.timeLabel.setString(this.timeCount);
        }
    },
    update: function (dt) {

        for(var k in this.hbArr){
            this.hbArr[k].y-=10;
        }

        // 碰撞
        for(var i = 0; i<this.hbArr.length; i++){
            if(cc.rectContainsPoint(this.hbArr[i].getBoundingBox(), this.hand.getPosition())){
                this.hbArr[i].removeFromParent();
                this.addScoreAnimation(this.hbArr[i].getPosition());
                this.hbArr.splice(i,1);
                this.score++;
            }
        }
    },
    addScoreAnimation: function (point) {
        var sp = new cc.Sprite(res.Score_png);
        this.addChild(sp);
        sp.setPosition(point);
        sp.runAction(cc.sequence(cc.moveBy(0.5, cc.p(0, cc.winSize.height*0.1)), cc.callFunc(function () {
            sp.removeFromParent();
        },this)))
    }
});

var MainScene = cc.Scene.extend({
    onEnter : function () {
        this._super();
        var layer = new MainLayer();
        this.addChild(layer);
    }
});