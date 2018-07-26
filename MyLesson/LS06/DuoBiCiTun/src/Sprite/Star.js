/**
 * Created by zhanglimeng on 2015/11/22.
 */
var Star = cc.Sprite.extend({
    score: null,
    kind: null,
    labelScore: null,
    ctor: function (fileName, kind, multiple) {

        this._super(fileName);
        this.score = 0;
        this.labelScore = 0;
        this.kind = kind;
        //this.scale=1.2;
        //该星星的分数
        this.label(multiple);
        //星星的旋转动作
        this.spin();
        //星星移动
        this.move();
        //星星的帧动画
        this.frameAction();
        var self = this;
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch, event) {
                var target = event.getCurrentTarget();
                var location = touch.getLocation();
                if (cc.rectContainsPoint(target.getBoundingBox(), location)) {
                    if (cc.sys.localStorage.getItem("isEffectOn") == "YES") {
                        self.effect();
                    }
                    self.getParent().score += self.score;
                    //self.getParent().starNum++;
                    target.removeFromParent();
                }
                return false;
            }
        }, this);
        return true;
    },

    /*-----------不同星星的音效------------*/
    effect: function () {
        if (this.kind == "yellow") {
            cc.audioEngine.playEffect(res.FirstStar_wav);
        } else if (this.kind == "green") {
            cc.audioEngine.playEffect(res.SecondStar_wav);
        } else {
            cc.audioEngine.playEffect(res.ThirdStar_wav);
        }
    },

    /*-----------不同星星的帧动画----------*/
    frameAction: function () {
        var animation = new cc.Animation();
        if (this.kind == "yellow") {
            for (var j = 1; j <= 3; j++) {
                var frameName = res["YellowStar0" + j + "_png"];
                animation.addSpriteFrameWithFile(frameName);
            }
        } else if (this.kind == "green") {
            for (var j = 1; j <= 3; j++) {
                var frameName = res["GreenStar0" + j + "_png"];
                animation.addSpriteFrameWithFile(frameName);
            }
        } else {
            for (var j = 1; j <= 3; j++) {
                var frameName = res["PurpleStar0" + j + "_png"];
                animation.addSpriteFrameWithFile(frameName);
            }
        }
        animation.setRestoreOriginalFrame(true);
        animation.setDelayPerUnit(1.0 / 20);
        var action = cc.animate(animation);
        this.runAction(action.repeatForever());
    },

    /*-------------该星星的分数------------*/
    label: function (multiple) {
        if (this.kind == "yellow") {
            this.score = 100 * multiple;
        }
        if (this.kind == "green") {
            this.score = 500 * multiple;
        }
        if (this.kind == "purple") {
            this.score = 1000 * multiple;
        }
        var label = new cc.LabelTTF(this.score, "", 20);
        label.setFontFillColor(cc.color.WHITE);
        label.enableStroke(cc.color.ORANGE, 4);
        //label.setPosition(this.x/2-165,this.y/2-180);
        label.setPosition(this.getBoundingBox().width * 0.5, this.getBoundingBox().height * 0.5);
        this.addChild(label);
    },

    /*-----------星星的旋转动作------------*/
    spin: function () {
        var spin = new cc.RotateBy(2, 360);
        this.runAction(spin.repeatForever());
    },

    /*--------------星星移动---------------*/
    move: function () {
        var x = Math.random() * cc.winSize.width;
        var moveTo = cc.moveTo(3, cc.p(x, cc.winSize.height - 100));
        this.runAction(cc.sequence(moveTo, cc.callFunc(function () {
            var moveTo2 = cc.moveTo(8, cc.p(x, -100));
            this.runAction(cc.sequence(moveTo2, cc.callFunc(function () {
                this.removeFromParent();
            }, this)));
        }, this)));
    }
});