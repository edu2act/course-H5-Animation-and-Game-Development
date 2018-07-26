var FMainLayer = cc.Layer.extend({
    sprite: null,
    cat: null,
    hook: null,
    _scoreProgress: null,
    _score: 0,
    _label: null,
    _timeProgress: null,
    _canCollision:null,
    _addFish:true,
    _addStar:false,
    _canLis:true,
    _starZ:-200,
    _star:null,
    _addScore:null,
    _addTime:null,
    ctor: function () {
        this._super();

        //背景
        this.bg();

        //背景装饰
        this.decorate();

        //添加鱼
        this.addFish();

        //水波
        this.wave();

        //角色
        this.protagonist();

        //鱼钩
        this.fishHook();

        //计时进度条
        this.timeProgress();

        //分数
        this.score();

        //分数进度条
        this.scoreProgress();

        //碰撞
        this.collision();

        //暂停
        this.stop();

        //添加星星
        this.addStar();

        //星星时间
        this.starTime();

        //添加闹钟
        this.naozhong();

        //添加气泡
        this.addBubble();

        //跑马灯
        this.addBlinkStar();

        //加分显示
        //this.addScore();

        return true;
    },

    bg: function () {
        var bg = new cc.Sprite(res.bg_jpg);
        bg.setPosition(cc.p(cc.winSize.width / 2, cc.winSize.height / 2));
        this.addChild(bg, -100);
    },

    decorate: function () {
        var upDec = new cc.Sprite(res.up_png);
        upDec.setPosition(cc.p(cc.winSize.width / 2, cc.winSize.height * 0.935));
        this.addChild(upDec);

        var downDec = new cc.Sprite(res.down_png);
        downDec.setPosition(cc.p(cc.winSize.width / 2, cc.winSize.height * 0.03));
        this.addChild(downDec);
    },

    addFish: function () {
        var height1 = cc.winSize.height*0.08;
        var height2 = cc.winSize.height*0.5 - cc.winSize.height*0.08;
        this.schedule(function () {
            if (this._addFish == true) {
                var blueFishR = Fish.create(res.blueFishR1_png, 100);
                blueFishR.setPosition(cc.p(-(300 + 100 * Math.random()), height1+height2*Math.random()));
                this.addChild(blueFishR);
                blueFishR.fishSwimmingR("blueFishR", 7);
            }
        }, 1.2);
        this.schedule(function () {
            if (this._addFish == true) {
                var blueFishL = Fish.create(res.blueFishL1_png, 100);
                blueFishL.setPosition(cc.p(cc.winSize.width + 300 + 100 * Math.random(), height1+height2*Math.random()));
                this.addChild(blueFishL);
                blueFishL.fishSwimmingL("blueFishL", 7);
            }
        }, 1.4);

        this.schedule(function () {
            if (this._addFish == true) {
                var greenFishR = Fish.create(res.greenFishR1_png, 200);
                greenFishR.setPosition(cc.p(-(300 + 100 * Math.random()), height1+height2*Math.random()));
                this.addChild(greenFishR);
                greenFishR.fishSwimmingR("greenFishR", 8);
            }
        }, 1);

        this.schedule(function () {
            if (this._addFish == true) {
                var greenFishL = Fish.create(res.greenFishL1_png, 200);
                greenFishL.setPosition(cc.p(cc.winSize.width + 300 + 100 * Math.random(), height1+height2*Math.random()));
                this.addChild(greenFishL);
                greenFishL.fishSwimmingL("greenFishL", 8);
            }
        }, 0.9);

        this.schedule(function () {
            if (this._addFish == true) {
                var yellowFishL = Fish.create(res.yellowFishL1_png, 300);
                yellowFishL.setPosition(cc.p(cc.winSize.width + 300 + 100 * Math.random(), height1+height2*Math.random()));
                this.addChild(yellowFishL);
                yellowFishL.fishSwimmingL("yellowFishL", 9);
            }
        }, 1.5);

        this.schedule(function () {
            if (this._addFish == true) {
                var yellowFishR = Fish.create(res.yellowFishR1_png, 300);
                yellowFishR.setPosition(cc.p(-(300 + 100 * Math.random()), height1+height2*Math.random()));
                this.addChild(yellowFishR);
                yellowFishR.fishSwimmingR("yellowFishR", 9);
            }
        }, 1.3);

        this.schedule(function () {
            if (this._addFish == true) {
                var octopusL = new Shark.create(res.octopusL1_png);
                octopusL.setPosition(cc.p(cc.winSize.width + 300 + 100 * Math.random(), height1+height2*Math.random()));
                this.addChild(octopusL, 2);
                octopusL.fishSwimmingL("octopusL", 5);
            }
        }, 4);

        this.schedule(function () {
            if (this._addFish == true) {
                var octopusR = new Shark.create(res.octopusR1_png);
                octopusR.setPosition(cc.p(-(300 + 100 * Math.random()), height1+height2*Math.random()));
                this.addChild(octopusR, 2);
                octopusR.fishSwimmingR("octopusR", 5);
            }
        }, 16);

    },

    wave: function () {
        var wave1 = new cc.Sprite(res.shui1_png);
        wave1.setPosition(cc.p(cc.winSize.width / 2, cc.winSize.height * 0.61));
        this.addChild(wave1, 10);

        var animation = new cc.Animation();
        for (var i = 1; i <= 5; i++) {
            var frameName = res["shui" + i + "_png"];
            animation.addSpriteFrameWithFile(frameName);
        }
        animation.setDelayPerUnit(0.15);
        animation.setRestoreOriginalFrame(true);
        var action = cc.animate(animation).repeatForever();
        wave1.runAction(action);

        var wave2 = new cc.Sprite(res.bolangH1_png);
        wave2.setPosition(cc.p(cc.winSize.width / 2, cc.winSize.height * 0.6335));
        this.addChild(wave2, 1);

        var animation2 = new cc.Animation();
        for (var j = 1; j <= 5; j++) {
            var frameName2 = res["bolangH" + j + "_png"];
            animation2.addSpriteFrameWithFile(frameName2);
        }
        animation2.setDelayPerUnit(0.15);
        animation2.setRestoreOriginalFrame(true);
        var action2 = cc.animate(animation2).repeatForever();
        wave2.runAction(action2);

    },

    protagonist: function () {
        this.cat = new cc.Sprite(res.juese1_png);
        this.cat.setPosition(cc.p(cc.winSize.width / 2, cc.winSize.height * 0.70));
        this.addChild(this.cat, 5);
        this.schedule(function () {
            var down = cc.moveTo(1, cc.p(cc.winSize.width / 2, cc.winSize.height * 0.69));
            var up = cc.moveTo(1, cc.p(cc.winSize.width / 2, cc.winSize.height * 0.70));
            this.cat.runAction(cc.sequence(down, up));
        }, 2)
    },

    fishHook: function () {
        var isMove = false;
        var fishHook = new cc.Sprite(res.fishHook_png);
        this.addChild(fishHook);

        var draw = new cc.DrawNode();
        this.addChild(draw, 10);

        var self = this;
        var listener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch, event) {
                if(self._canLis == true) {
                    self._canCollision = false;
                    self._addScore = 0;
                    var location = touch.getLocation();
                    fishHook.setVisible(100);
                    if (location.y < cc.winSize.height * 0.6) {
                        fishHook.x = location.x;
                        fishHook.y = location.y;
                        fishHook.stopAllActions();
                        isMove = false;

                        var m = (self.cat.y - 30) - (fishHook.y);
                        var n = (cc.winSize.width / 2 + 8) - (fishHook.x);
                        var tan = 180 * Math.atan(n / m) / Math.PI;
                        fishHook.setRotation(tan);

                        draw.clear();
                        draw.drawSegment(cc.p(cc.winSize.width / 2 + 8, self.cat.y - 30), cc.p(fishHook.x, fishHook.y), 1, cc.color(255, 255, 255, 255));
                    }
                    return true;
                }
                return false;
            },
            onTouchMoved: function (touch, event) {
                var location = touch.getLocation();
                if (location.y < cc.winSize.height * 0.6) {
                    fishHook.x = location.x;
                    fishHook.y = location.y;

                    var m= (self.cat.y - 30) - (fishHook.y);
                    var n = (cc.winSize.width / 2 + 8) - (fishHook.x);
                    var tan = 180*Math.atan(n/m)/Math.PI;
                    fishHook.setRotation(tan);

                    draw.clear();
                    draw.drawSegment(cc.p(cc.winSize.width / 2 + 8, self.cat.y - 30), cc.p(fishHook.x, fishHook.y), 1, cc.color(255, 255, 255, 255));
                }
                fishHook.setVisible(100);

            },
            onTouchEnded: function (touch, event) {
                self._canLis = false;
                self._canCollision = true;
                if (isMove == false) {
                    isMove = true;
                    var moveAct = cc.moveTo(0.35, cc.p(cc.winSize.width / 2, cc.winSize.height * 0.6));
                    var fun2 = cc.callFunc(function () {
                        isMove = false;
                    }, this);
                    fishHook.runAction(cc.sequence(moveAct, fun2));
                }
                self.schedule(function () {
                    if (fishHook.y > cc.winSize.height * 0.57) {
                        self._canLis = true;
                        fishHook.setVisible(0);
                        draw.clear();
                    } else {
                        draw.clear();
                        draw.drawSegment(cc.p(cc.winSize.width * 0.52, self.cat.y - 30), cc.p(fishHook.x, fishHook.y + 25), 1, cc.color(255, 255, 255, 255));
                    }
                    if (fishHook.y > cc.winSize.height * 0.59) {
                        self.addScore();
                        self._addScore = 0;
                        self.addTime();
                        self._addTime = 0;
                    }
                }, 0.1);
            }

        });
        cc.eventManager.addListener(listener, this);
        this.hook = fishHook;
    },

    timeProgress: function () {

        var pt = new Progress(new cc.Sprite(res.jdtH_png),res.feverJdt2_png);
        pt.setPosition(cc.p(cc.winSize.width * 0.5, cc.winSize.height * 0.025));
        this.addChild(pt);
        this._timeProgress = pt;
    },

    collision: function () {
        this.schedule(function () {
            if (this._canCollision == true) {
                var node = this.getChildren();

                for (var i in node) {
                    if (node[i].fish == true) {
                        var conllision1 = cc.rectIntersectsRect(node[i].getBoundingBox(), this.hook.getBoundingBox());
                        if (true == conllision1) {
                            //鱼被掉走
                            node[i].setPosition(this.hook.getPosition());
                            //播放死亡动画
                            if (node[i]._fishValue == 100) {
                                node[i].setTexture(res.blueFishDie1_png);
                                if(node[i].y >= cc.winSize.height * 0.57){
                                    this._score += 100;
                                    this._addScore += 100;
                                };
                            } else if (node[i]._fishValue == 200) {
                                node[i].setTexture(res.greenFishDie1_png);
                                if(node[i].y >= cc.winSize.height * 0.57){
                                    this._score += 200;
                                    this._addScore += 200;
                                };
                            } else if (node[i]._fishValue == 300) {
                                node[i].setTexture(res.yellowFishDie1_png);
                                if(node[i].y >= cc.winSize.height * 0.57){
                                    this._score += 300;
                                    this._addScore += 300;
                                };
                            }

                            if (node[i].y >= cc.winSize.height * 0.57) {
                                var ls = cc.sys.localStorage;
                                if(ls.getItem("isEffect") == "YES"){
                                    cc.audioEngine.playEffect(res.diaoyu_wav);
                                };
                                this.runAction(cc.sequence(cc.callFunc(function(){
                                    this.cat.setTexture(res.juese2_png);
                                },this),cc.delayTime(0.5),cc.callFunc(function(){
                                    this.cat.setTexture(res.juese1_png);
                                },this)));
                                cc.pool.putInPool(node[i]);
                                //this._score += node[i]._fishValue;
                                this._scoreProgress.addPercent(node[i]._fishValue);
                            }
                        }
                    }
                    if (node[i].shark == true) {
                        var conllision2 = cc.rectContainsPoint(node[i].getBoundingBox(), this.hook.getPosition());
                        if (true == conllision2) {
                            var ls = cc.sys.localStorage;
                            if(ls.getItem("isEffect") == "YES"){
                                cc.audioEngine.playEffect(res.sharkhet_wav);
                            };
                            this.runAction(cc.sequence(cc.callFunc(function(){
                                this.cat.setTexture(res.juese3_png);
                            },this),cc.delayTime(0.5),cc.callFunc(function(){
                                this.cat.setTexture(res.juese1_png);
                            },this)));
                            this.hook.setPosition(cc.p(cc.winSize.width / 2, cc.winSize.height * 0.6));
                            //node[i].sharkDie("octopusDie");
                            node[i].Die();
                            this._scoreProgress.reducePercent(node[i]._reduce);
                            if(this._score<=1000){
                                this._score = 0;
                            }else{
                                this._score -= 1000;
                                var scoreLabel = new cc.LabelTTF("-1000!!", "", 70);
                                scoreLabel.setPosition(cc.p(cc.winSize.width * 0.8, cc.winSize.height * 0.7));
                                scoreLabel.setColor(cc.color(255,115,2));
                                //scoreLabel.enableStroke(cc.color.RED, 1);
                                this.addChild(scoreLabel);
                                scoreLabel.runAction(cc.sequence(cc.moveBy(0.8, 0, cc.winSize.height * 0.08), cc.callFunc(function () {
                                    scoreLabel.removeFromParent();
                                }, this)));
                            };
                        }
                    }
                    if(node[i].fish == false){
                        var conllision3 = cc.rectContainsPoint(node[i].getBoundingBox(), this.hook.getPosition());
                        if(true == conllision3){
                            node[i].fish = null;
                            var ls = cc.sys.localStorage;
                            if(ls.getItem("isEffect") == "YES"){
                                cc.audioEngine.playEffect(res.diaoxingxing_wav);
                            };
                            node[i].starDie();
                            this._timeProgress._dt += 0.2;
                            this._addTime += 0.2;
                            this._addScore += 300;
                            this._score += 300;
                            this.runAction(cc.sequence(cc.callFunc(function(){
                                this.cat.setTexture(res.juese2_png);
                            },this),cc.delayTime(0.5),cc.callFunc(function(){
                                this.cat.setTexture(res.juese1_png);
                            },this)));

                        }
                    }
                }
            }
        }, 0.01)

    },

    score: function () {
        var label = new cc.LabelTTF("0", "", 100);
        label.setPosition(cc.p(cc.winSize.width / 2, cc.winSize.height * 0.93));
        label.setColor(cc.color.WHITE);
        label.enableStroke(cc.color.RED, 2);
        this.schedule(function () {
            label.setString(this._score);
        }, 0.01);
        this.addChild(label);
        this._label = label;
    },

    scoreProgress: function () {
        var progress = new ScoreProgress(new cc.Sprite(res.feverJdt1_png),res.feverJdt2_png);
        progress.setPosition(cc.p(cc.winSize.width / 2, cc.winSize.height * 0.85));
        this.addChild(progress,3);
        this._scoreProgress = progress;
    },

    stop:function(){
        var stopSprite = new cc.Sprite(res.stop_png);
        stopSprite.setPosition(cc.winSize.width/2,cc.winSize.height/2);
        stopSprite.setVisible(false);
        this.addChild(stopSprite,500);

        var jixu = new cc.MenuItemImage(res.resume_normal_png,res.resume_selected_png,function(){
            cc.director.resume();
            this._canLis = true;
            stopItem.setSelectedIndex(0);
            stopSprite.setVisible(false);
            menu1.setVisible(false);
            menu2.setVisible(false);
            menu.setVisible(true);
            this._canLis = true;
        });
        var menu1 = new cc.Menu(jixu);
        menu1.setPosition(cc.p(cc.winSize.width/2,cc.winSize.height*0.51));
        menu1.setVisible(false);
        this.addChild(menu1,500);

        var tuichu = new cc.MenuItemImage(res.exit_normal_png,res.exit_selected_png,function(){
            cc.director.runScene(new FStartScene());
            cc.director.resume();
            stopItem.setSelectedIndex(0);
            stopSprite.setVisible(false);
            menu1.setVisible(false);
            menu2.setVisible(false);
            menu.setVisible(true);
            this._canLis = true;
        });
        var menu2 = new cc.Menu(tuichu);
        menu2.setVisible(false);
        menu2.setPosition(cc.p(cc.winSize.width/2,cc.winSize.height*0.39));
        this.addChild(menu2,500);

        var stopItem1 = new cc.MenuItemImage(res.stop_normal_png,res.stop_selected_png);
        var stopItem2 = new cc.MenuItemImage(res.continue_normal_png,res.continue_selected_png);
        var stopItem = new cc.MenuItemToggle(stopItem1,stopItem2,function(){
            var ls = cc.sys.localStorage;
            if(ls.getItem("isEffect") == "YES"){
                cc.audioEngine.playEffect(res.kaishianniu_wav);
            };
            if(stopItem.getSelectedIndex() == 1) {
                this._canLis = false;
                stopSprite.setVisible(true);
                menu.setVisible(false)
                menu1.setVisible(true);
                menu2.setVisible(true);
                cc.director.pause();
            }
        },this);
        var menu = new cc.Menu(stopItem);
        menu.setPosition(cc.winSize.width*0.89,cc.winSize.height*0.94);
        this.addChild(menu,2);
    },

    addStar:function(){
        var height1 = cc.winSize.height*0.08;
        var height2 = cc.winSize.height*0.51 - cc.winSize.height*0.06;
        this.schedule(function () {
            if(this._addStar == true) {
                var yellowStarR = new Fish(res.yellowStar1_png, 300);
                yellowStarR.fish = false;
                yellowStarR.setPosition(cc.p(-(300 + 100 * Math.random()), height1+height2*Math.random()));
                this.addChild(yellowStarR);
                yellowStarR.starMoveR("yellowStar", 8)
            }
        }, 0.5);
        this.schedule(function () {
            if(this._addStar == true) {
                var yellowStarL = new Fish(res.yellowStar1_png, 300);
                yellowStarL.fish = false;
                yellowStarL.setPosition(cc.p(cc.winSize.width + 300 + 100 * Math.random(), height1+height2*Math.random()));
                this.addChild(yellowStarL);
                yellowStarL.starMoveL("yellowStar", 8)
            }
        }, 0.6);
        this.schedule(function () {
            if(this._addStar == true) {
                var greenStarL = new Fish(res.greenStar1_png, 300);
                greenStarL.fish = false;
                greenStarL.setPosition(cc.p(cc.winSize.width + 300 + 100 * Math.random(), height1+height2*Math.random()));
                this.addChild(greenStarL);
                greenStarL.starMoveL("greenStar", 8)
            }
        }, 0.7);
        this.schedule(function () {
            if(this._addStar == true) {
                var greenStarR = new Fish(res.greenStar1_png, 300);
                greenStarR.fish = false;
                greenStarR.setPosition(cc.p(-(300 + 100 * Math.random()), height1+height2*Math.random()));
                this.addChild(greenStarR);
                greenStarR.starMoveR("greenStar", 8)
            }
        }, 0.4)
    },

    starTime:function(){
        this.schedule(function(){
            if(this._scoreProgress.getPercentage() == 100){
                this._scoreProgress.reduce();
                this._addFish = false;
                this._addStar = true;
                this._star.setVisible(true);
            }
            if(this._scoreProgress.getPercentage() == 0){
                //cc.log("xxxx");
                this._addFish = true;
                this._addStar = false;
                this._star.setVisible(false);
            }
        },0.01)
    },

    addBlinkStar:function(){
        this._star= new StarBlink;
        this.addChild(this._star);
        this._star.setVisible(false);
    },

    naozhong:function(){
        var time = new cc.Sprite(res.naozhong_png);
        time.setPosition(cc.p(cc.winSize.width*0.35,cc.winSize.height*0.028));
        this.addChild(time);
    },

    timeOver:function(){
        var time = new cc.Sprite(res.time_png);
        time.setPosition(cc.p(cc.winSize.width/2,cc.winSize.height*2));
        this.addChild(time,100);
        var over = new cc.Sprite(res.over_png);
        over.setPosition(cc.p(cc.winSize.width/2,-cc.winSize.height));
        this.addChild(over,100);


        var move1 = cc.moveTo(0.5,cc.p(cc.winSize.width/2,cc.winSize.height*0.6));
        var move2 = cc.moveTo(0.5,cc.p(cc.winSize.width/2,cc.winSize.height*0.4));
        var scale1 = cc.scaleTo(0.2,1.1);
        var scale2 = cc.scaleTo(0.2,1);
        var scale3 = cc.scaleTo(0.2,1.1);
        var scale4 = cc.scaleTo(0.2,1);
        time.runAction(cc.sequence(move1,scale3,scale4,scale3,scale4,scale3,scale4,scale3,scale4));
        over.runAction(cc.sequence(move2,cc.callFunc(function(){
            var ls = cc.sys.localStorage;
            if(ls.getItem("isEffect") == "YES"){
                cc.audioEngine.playEffect(res.timeover_wav);
            };}),scale1,scale2,scale1,scale2,scale1,scale2,scale1,cc.callFunc(function(){
            cc.director.runScene(new FOverScene());
            this.lsscore();
            this._canLis = false;
        },this)));
    },

    lsscore :function() {
        var ls = cc.sys.localStorage;
        ls.setItem("thisScore", this._score);
        var bestScore = ls.getItem("bestScore");
        if (this._score > bestScore) {
            ls.setItem("bestScore", this._score);
        }
    },

    addBubble:function(){
        this.schedule(function(){
            var bubble = new Bubble(res.qipao_png);
            this.addChild(bubble,-1);
        },0.5)
    },

    addScore:function(){
        if(this._addScore>0) {
            var scoreLabel = new cc.LabelTTF("+ "+this._addScore, "", 60);
            scoreLabel.setPosition(cc.p(cc.winSize.width * 0.8, cc.winSize.height * 0.7));
            scoreLabel.setColor(cc.color(255,168,1));
            //scoreLabel.enableStroke(cc.color.YELLOW, 2);
            this.addChild(scoreLabel);
            scoreLabel.runAction(cc.sequence(cc.moveBy(0.8, 0, cc.winSize.height * 0.08), cc.callFunc(function () {
                scoreLabel.removeFromParent();
            }, this)));
        }
    },

    addTime:function(){
        if(this._addTime>0) {
            var timeLabel = new cc.LabelTTF("+ "+this._addTime.toFixed(1) + "s", "", 60);
            timeLabel.setPosition(cc.p(cc.winSize.width * 0.2, cc.winSize.height * 0.7));
            timeLabel.setColor(cc.color(255,168,1));
            //timeLabel.enableStroke(cc.color.RED, 1);
            this.addChild(timeLabel);
            timeLabel.runAction(cc.sequence(cc.moveBy(0.8, 0, cc.winSize.height * 0.08), cc.callFunc(function () {
                timeLabel.removeFromParent();
            }, this)));
        }
    }

});

var FMainScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        var layer = new FMainLayer();
        this.addChild(layer);
        this.ready();
    },

    ready:function(){
        var ready = new cc.Sprite(res.ready_png);
        ready.setPosition(cc.p(cc.winSize.width*2,cc.winSize.height/2));
        this.addChild(ready);
        var go = new cc.Sprite(res.go_png);
        go.setPosition(cc.p(cc.winSize.width/2,cc.winSize.height/2));
        this.addChild(go);
        go.setScale(0);
        var move1 = cc.moveTo(0.2,cc.p(cc.winSize.width*0.4,cc.winSize.height/2));
        var move2 = cc.moveTo(0.2,cc.p(cc.winSize.width*0.6,cc.winSize.height/2));
        var move3 = cc.moveTo(0.2,cc.p(cc.winSize.width/2,cc.winSize.height/2));
        var scale = cc.scaleBy(0.5,1.1);
        var scale2 = cc.scaleTo(1,1);
        ready.runAction(cc.sequence(cc.callFunc(function(){
            var ls = cc.sys.localStorage;
            if(ls.getItem("isEffect") == "YES"){
                cc.audioEngine.playEffect(res.ready_wav);
            };
        }),move1,move2,move3,scale,cc.callFunc(function(){
            ready.setVisible(0);
            go.runAction(cc.sequence(cc.spawn(scale2,cc.sequence(cc.delayTime(0.5),cc.callFunc(function(){
                var ls = cc.sys.localStorage;
                if(ls.getItem("isEffect") == "YES"){
                    cc.audioEngine.playEffect(res.go_wav);
                };}))),cc.callFunc(function(){go.setVisible(0)},this)));
        },this)));
    },

});