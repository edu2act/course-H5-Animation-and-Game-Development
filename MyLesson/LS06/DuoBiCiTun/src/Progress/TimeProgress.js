var TimeProgress = cc.ProgressTimer.extend({
    countDown: null,
    ms: null,
    label: null,
    timeOver: null,
    ctor: function (spriteName, bgSprite, dt) {
        this._super(spriteName);
        //cc.log(dt);
        this.timeOver = false;

        this.setAnchorPoint(cc.p(0.5, 0.5));
        this.countDown = dt;

        this.ms = dt * 1000;

        var bgSprite = new cc.Sprite(bgSprite);
        bgSprite.setPosition(this.getBoundingBox().width * 0.5, this.getBoundingBox().height * 0.5);

        this.addChild(bgSprite, -1);

        this.setType(cc.ProgressTimer.TYPE_BAR);
        this.setBarChangeRate(cc.p(1, 0));
        this.setMidpoint(cc.p(0, 0));
        this.setPercentage(100);

        this.scheduleUpdate();

        this.timeLabel();

        this.blinkClock();

        return true;
    },

    update: function (dt) {
        this.ms -= dt * 1000;
        if (parseInt(this.ms % 1000 / 10) < 10) {
            if (parseInt(this.ms / 1000) < 10) {
                this.label.setString("0" + parseInt(this.ms / 1000) + ":" + "0" + parseInt(this.ms % 1000 / 10));
            } else {
                this.label.setString(parseInt(this.ms / 1000) + ":" + "0" + parseInt(this.ms % 1000 / 10));
            }
        } else {
            if (parseInt(this.ms / 1000) < 10) {
                this.label.setString("0" + parseInt(this.ms / 1000) + ":" + parseInt(this.ms % 1000 / 10));
            } else {
                this.label.setString(parseInt(this.ms / 1000) + ":" + parseInt(this.ms % 1000 / 10));
            }
        }

        if (this.ms > this.countDown * 1000) {
            this.ms = this.countDown * 1000;
        }
        this.setPercentage(this.ms / (10 * this.countDown));
        if (this.ms <= 0) {
            //cc.log("GameOver");
            cc.audioEngine.stopMusic();
            //this.getParent().unschedule(this.getParent().addAnimal);
            this.getParent().unschedule(this.getParent().recordScore);
            this.getParent().getParent().storageScore();
            this.getParent().getParent().center.removeFromParent();
            this.getParent().getParent().timePro.setVisible(false);
            this.label.removeFromParent();
            var timeover = new cc.Sprite(res.TimeOver_png);
            timeover.setPosition(cc.winSize.width * 0.5, cc.winSize.height * 0.6);
            timeover.scale = 0.6;
            this.getParent().addChild(timeover);
            timeover.runAction(cc.callFunc(function () {
                if (this.timeOver == false) {
                    this.timeOver = true;
                    if (cc.sys.localStorage.getItem("isEffectOn") == "YES") {
                        cc.audioEngine.playEffect(res.TimeOver_wav, false);
                    }
                }
                timeover.runAction(cc.sequence(cc.fadeOut(1.5), cc.callFunc(function () {
                    cc.director.runScene(new ASOverScene());
                    this.unscheduleUpdate();
                    //this.timeOver=false;
                }, this)));
            }, this));
        }
    },

    /*--------增加时间---------*/
    addTime: function (st) {
        this.ms += st * 1000;
    },

    /*--------减少时间---------*/
    subTime: function (st) {
        this.ms -= st * 1000;
    },

    /*--------添加时间标签-----*/
    timeLabel: function () {
        var label = new cc.LabelTTF(this.ms.toString(), "", 40);
        label.setPosition(this.getBoundingBox().width * 0.5, this.getBoundingBox().height * 0.5);
        /*label.enableStroke(cc.color.ORANGE, 5);
         label.setFontFillColor(cc.color.BLACK);*/
        label.setColor(cc.color.WHITE);
        this.label = label;
        this.addChild(label);
    },

    /*------闪烁的小闹钟-------*/
    blinkClock: function () {
        var clock = new cc.Sprite(res.Alarm_clock1_png);
        clock.setPosition(this.getBoundingBox().width * 0.3, this.getBoundingBox().height * 0.5);
        var animation = new cc.Animation();
        for (var j = 1; j <= 3; j++) {
            var frameName = res["Alarm_clock" + j + "_png"];
            animation.addSpriteFrameWithFile(frameName);
        }
        animation.setDelayPerUnit(1.0 / 20);
        animation.setRestoreOriginalFrame(true);
        var action = cc.animate(animation);
        clock.runAction(action.repeatForever());
        this.addChild(clock);
    }
});