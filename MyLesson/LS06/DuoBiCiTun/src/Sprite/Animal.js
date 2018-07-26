var STAR_NUM = 10;
var QIQIU_SCALE=0.7;
var Animal = cc.Sprite.extend({
    kind: null,
    sprite1: null,
    sprite2: null,
    sprite3: null,
    qiqiu: null,
    isOnclick: null,
    firstPro: null,
    secondPro: null,
    thirdPro: null,
    ctor: function (fileName, kind) {
        this._super(fileName);
        this.isOnclick = false;
        this.firstPro = false;
        this.secondPro = false;
        this.thirdPro = false;
        this.kind = kind;
        //点击事件 kind用来判断是兔子（1）、熊(2)、刺豚（3）
        var self = this;
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch, event) {
                var target = event.getCurrentTarget();
                var location = touch.getLocation();
                var locationInView = target.convertToNodeSpace(location);
                /*cc.log("tx=",locationInView.x)
                 cc.log("ty=",locationInView.y)*/
                var targetSize = target.getContentSize();
                var frame = cc.rect(0, 0, targetSize.width, targetSize.height);
                if (kind == 1) {
                    self.sprite1 = target;
                    if (cc.rectContainsPoint(frame, locationInView)) {
                        if (self.isOnclick == false) {
                            if (cc.sys.localStorage.getItem("isEffectOn") == "YES") {
                                self.rewardEffect();
                            }
                            var world = target.convertToWorldSpace(locationInView);
                            var grandFather = self.getParent().getParent();
                            self.getParent().normalNum--;
                            self.sprite1.retain();
                            self.sprite1.removeFromParent();
                            self.sprite1.setPosition(cc.p(world.x, world.y));
                            grandFather.addChild(self.sprite1);
                            self.getParent().score += 20;
                            target.setRotation(0);
                            //停止上升时所有动作
                            target.stopAllActions();
                            //添加气球
                            self.addQiqiu(self.sprite1);
                            //添加心特效
                            self.reward(self.sprite1);
                            //往上移动
                            self.schedule(self.move, 0.01);
                            //增加游戏时间
                            self.getParent().addTime();
                            //增加奖励进度条
                            var pro = self.getParent().pro;
                            pro.addPro();
                            //是否添加星星
                            if (pro.percentage == 100) {
                                self.addStar(self.sprite1);
                            }
                            //更换帧动画
                            self.changeFrame(self.sprite1);
                            self.getParent().hitNum++;
                            self.multipleHit();
                            self.isOnclick = true;
                        }
                        return true;
                    }
                    return false;
                } else if (kind == 2) {
                    self.sprite2 = target;
                    if (cc.rectContainsPoint(frame, locationInView)) {
                        if (self.isOnclick == false) {
                            if (cc.sys.localStorage.getItem("isEffectOn") == "YES") {
                                self.rewardEffect();
                            }
                            var world = target.convertToWorldSpace(locationInView);
                            var grandFather = self.getParent().getParent();
                            self.getParent().normalNum--;
                            self.sprite2.retain();
                            self.sprite2.removeFromParent();
                            //self.sprite1.setPosition(world);
                            //self.sprite1.setPosition(cc.p(world.x - locationInView.x, world.y - locationInView.y));
                            self.sprite2.setPosition(cc.p(world.x, world.y));

                            grandFather.addChild(self.sprite2);
                            self.getParent().score += 20;
                            //cc.log(self.getParent().score);
                            target.setRotation(0);
                            //停止上升时所有动作
                            target.stopAllActions();
                            //添加气球
                            self.addQiqiu(self.sprite2);
                            //添加心特效
                            self.reward(self.sprite2);
                            //往上移动
                            self.schedule(self.move, 0.01);
                            //增加游戏时间
                            self.getParent().addTime();
                            //增加奖励进度条
                            self.getParent().pro.addPro();
                            var pro = self.getParent().pro;
                            if (pro.percentage == 100) {
                                self.addStar(self.sprite2);
                            }
                            self.changeFrame(self.sprite2);
                            self.getParent().hitNum++;
                            self.multipleHit();
                            self.isOnclick = true;
                        }
                        return true;
                    }
                    return false;
                }
                else {
                    self.sprite3 = target;
                    if (cc.rectContainsPoint(frame, locationInView)) {
                        if (self.isOnclick == false) {
                            if (cc.sys.localStorage.getItem("isEffectOn") == "YES") {
                                self.blameEffect();
                            }
                            var world = target.convertToWorldSpace(locationInView);
                            var grandFather = self.getParent().getParent();
                            self.sprite3.retain();
                            self.sprite3.removeFromParent();
                            self.sprite3.setPosition(cc.p(world.x, world.y));
                            grandFather.addChild(self.sprite3);
                            //减少游戏时间
                            self.getParent().subTime();
                            self.blame();
                            self.isOnclick = true;
                            self.getParent().hitNum = 0;
                            self.changeFrame(self.sprite3);
                        }
                        return true;
                    }
                    return false;
                }
            }
        }, this);

        //精灵自身旋转
        this.anction();

        return true;

    },

    /*-------旋转动画设置--------------*/
    anction: function () {
        var rotate = cc.rotateBy(2, 360);
        this.runAction(rotate.repeatForever());
    },

    /*----------点击后上升-------------*/
    move: function () {
        switch (this.kind) {
            case 1:
                var sprite = this.sprite1;
                if (sprite.y > cc.winSize.height) {
                    sprite.removeFromParent();
                    this.qiqiu.removeFromParent();
                    this.unschedule(this.move);
                } else {
                    sprite.y += 10;
                    this.qiqiu.y += 10;
                }
                break;
            case 2:
                var sprite = this.sprite2;
                if (sprite.y > cc.winSize.height) {
                    sprite.removeFromParent();
                    this.qiqiu.removeFromParent();
                    this.unschedule(this.move);
                } else {
                    sprite.y += 10;
                    this.qiqiu.y += 10;
                }
                break;
            default:
                break;
        }
    },

    /*--------点击后切换帧动画---------*/
    changeFrame: function (sprite) {
        var animation = new cc.Animation();
        switch (this.kind) {
            case 1:
                sprite.setTexture(res.TuOnclick01_png);
                for (var j = 1; j <= 2; j++) {
                    var frameName = res["TuOnclick0" + j + "_png"];
                    animation.addSpriteFrameWithFile(frameName);
                }
                animation.setDelayPerUnit(1.0 / 35);
                animation.setRestoreOriginalFrame(true);
                var action = cc.animate(animation);
                sprite.runAction(action.repeatForever());
                break;
            case 2:
                sprite.setTexture(res.XiongOnclick01_png);
                for (var j = 1; j <= 2; j++) {
                    var frameName = res["XiongOnclick0" + j + "_png"];
                    animation.addSpriteFrameWithFile(frameName);
                }
                animation.setDelayPerUnit(1.0 / 35);
                animation.setRestoreOriginalFrame(true);
                var action = cc.animate(animation);
                sprite.runAction(action.repeatForever());
                break;
            case 3:
                sprite.setTexture(res.CitunOnclick01_png);
                for (var j = 1; j <= 4; j++) {
                    var frameName = res["CitunOnclick0" + j + "_png"];
                    animation.addSpriteFrameWithFile(frameName);
                }
                animation.setDelayPerUnit(1.0 / 5);
                animation.setRestoreOriginalFrame(true);
                var action = cc.animate(animation);
                var delay = cc.delayTime(2);
                sprite.runAction(cc.sequence(action, cc.callFunc(function () {
                    sprite.removeFromParent();
                }, this)));
                break;
        }
    },

    /*-----------添加气球--------------*/
    addQiqiu: function (sprite) {
        var qiqiu = new cc.Sprite(res.Qiqiu01_png);
        qiqiu.scale = QIQIU_SCALE;
        this.getParent().addChild(qiqiu,1);
        qiqiu.setPosition(sprite.x - 20, sprite.y + qiqiu.getBoundingBox().height * 0.4);
        var animation = new cc.Animation();
        for (var i = 1; i <= 3; i++) {
            var frameName = res["Qiqiu0" + i + "_png"];
            animation.addSpriteFrameWithFile(frameName);
        }
        animation.setDelayPerUnit(1.0 / 35);
        animation.setRestoreOriginalFrame(true);
        var action = cc.animate(animation);
        qiqiu.runAction(cc.sequence(action, cc.callFunc(function () {
            qiqiu.setTexture(res.Qiqiu03_png);
        })));
        this.qiqiu = qiqiu;
    },

    /*----------点击奖励后的特效-------*/
    reward: function (sprite) {
        var particle = new cc.ParticleFlower();
        particle.texture = cc.textureCache.addImage(res.Xin_png);
        //var particle=new cc.ParticleSystem(res.Xin_plist);
        particle.setPosition(sprite.x, sprite.y - 30);
        particle.setStartSize(50);
        particle.setTotalParticles(10);
        this.getParent().addChild(particle);

        var delay = cc.delayTime(1.5);
        particle.runAction(cc.sequence(delay, cc.callFunc(function () {
            particle.removeFromParent();
        }, this)));
    },

    /*----------点击奖励后的音效-------*/
    rewardEffect: function () {
        cc.audioEngine.playEffect(res.MaoOnclick_wav, false);
    },

    /*----点击刺豚后将进度条进度归零---*/
    blame: function () {
        this.getParent().starNum = 0;
        this.getParent().pro.percentage = 0;
        this.firstPro = false;
        this.secondPro = false;
        this.thirdPro = false;
    },

    /*----------点击惩罚后的音效-------*/
    blameEffect: function () {
        cc.audioEngine.playEffect(res.ZhangOnclick_wav, false)
    },

    /*--------添加星星更换进度条-------*/
    addStar: function (sprite) {
        //cc.log("this.getParent().proGrade=",this.getParent().proGrade);
        switch (this.getParent().proGrade) {
            case 1:
                if (this.getParent().starNum < STAR_NUM) {
                    var star = new Star(res.YellowStar01_png, "yellow", this.getParent().starNum + 1);
                    star.scale = 1.4;
                    this.getParent().starNum++;
                    this.getParent().addChild(star,1);
                    star.setPosition(sprite.getPosition());
                } else {
                    this.getParent().pro.percentage = 0;
                    if (this.secondPro == false) {
                        //this.getParent().pro.removeFromParent();
                        var pro = new cc.Sprite(res.Progress_2_png);
                        var Pro = new Progress(pro);
                        Pro.setPosition(this.getParent().pro.getPosition());
                        this.getParent().pro = Pro;
                        this.getParent().addChild(Pro,0);
                        this.secondPro = true;
                    }
                    this.getParent().starNum = 0;
                    this.getParent().proGrade++;
                }
                break;
            case 2:
                if (this.getParent().starNum < STAR_NUM) {
                    var star = new Star(res.GreenStar01_png, "green", this.getParent().starNum + 1);
                    star.scale = 1.4;
                    this.getParent().starNum++;
                    this.getParent().addChild(star,1);
                    star.setPosition(sprite.getPosition());
                } else {
                    this.getParent().pro.percentage = 0;
                    if (this.thirdPro == false) {
                        //this.getParent().pro.removeFromParent();
                        var pro = new cc.Sprite(res.Progress_3_png);
                        var Pro = new Progress(pro);
                        Pro.setPosition(this.getParent().pro.getPosition());
                        this.getParent().pro = Pro;
                        this.getParent().addChild(Pro,0);
                        this.thirdPro = true;
                    }
                    this.getParent().starNum = 0;
                    this.getParent().proGrade++;
                }
                break;
            case 3:
                if (this.getParent().starNum < STAR_NUM) {
                    var star = new Star(res.PurpleStar01_png, "purple", this.getParent().starNum + 1);
                    star.scale = 1.4;
                    this.getParent().starNum++;
                    this.getParent().addChild(star,1);
                    star.setPosition(sprite.getPosition());
                } else {
                    this.getParent().pro.percentage = 0;
                    if (this.firstPro == false) {
                        //this.getParent().pro.removeFromParent();
                        var pro = new cc.Sprite(res.Progress_1_png);
                        var Pro = new Progress(pro);
                        Pro.setPosition(this.getParent().pro.getPosition());
                        this.getParent().pro = Pro;
                        this.getParent().addChild(Pro,0);
                        this.firstPro = true;
                    }
                    this.getParent().starNum = 0;
                    this.getParent().proGrade = 1;
                    this.firstPro = false;
                    this.secondPro = false;
                    this.thirdPro = false;
                }
                break;
        }
    },

    /*------------连击音效-------------*/
    multipleHit: function () {
        if (cc.sys.localStorage.getItem("isEffectOn") == "YES") {
            if (this.getParent().hitNum == 10) {
                cc.audioEngine.playEffect(res.Grade1_wav);
                this.getParent().score += 100;
            } else if (this.getParent().hitNum == 20) {
                cc.audioEngine.playEffect(res.Grade2_wav);
                this.getParent().score += 500;
            } else if (this.getParent().hitNum == 30) {
                cc.audioEngine.playEffect(res.Grade3_wav);
                this.getParent().score += 2500;
                this.getParent().hitNum = 0;
            }
        }
    },
});