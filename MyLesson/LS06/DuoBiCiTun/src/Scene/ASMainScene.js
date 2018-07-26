var GAME_TIME = 60;
var SPRITE_SCALE=0.7;
var ASMainLayer = cc.Layer.extend({
    timePro: null,
    animalArr: null,
    normalNum: null,
    num: null,
    isAddAnimal: null,
    point: null,
    score: null,
    scoreLabel: null,
    center: null,
    pro: null,
    proGrade: null,
    starNum: null,
    toggleItem: null,
    hitNum: null,
    top: null,
    bottom: null,
    ctor: function () {
        this._super();

        this.isAddAnimal = true;
        this.num = 0;
        this.animalArr = [];
        this.normalNum = 0;
        this.score = 0;
        this.proGrade = 1;
        this.starNum = 0;
        this.hitNum = 0;
        //添加背景
        this.myBg();
        //添加顶部
        this.topKuang();
        //添加底部
        this.bottomKuang();
        //添加Ready精灵
        this.readySprite();


        /*//添加音乐
         //this.myMusic();

         //添加动物
         //this.schedule(this.isAdd, 0.5);


         //添加时间进度条
         //this.timeProgress();

         //添加分数标签
         //this.label();

         //添加奖励进度条
         //this.progress();*/

        return true;
    },

    /*----------添加背景------------*/
    myBg: function () {
        var bg = new cc.Sprite(res.MainBg_png);
        bg.setPosition(cc.winSize.width * 0.5, cc.winSize.height * 0.5);
        this.addChild(bg,0);
    },

    /*----------添加顶部------------*/
    topKuang: function () {
        var top = new cc.Sprite(res.Top_png);
        top.setPosition(cc.winSize.width * 0.5, cc.winSize.height - top.getBoundingBox().height * 0.5);
        this.addChild(top,2);
        this.top = top;
    },

    /*----------添加底部------------*/
    bottomKuang: function () {
        var bottom = new cc.Sprite(res.Bottom_png);
        bottom.setPosition(cc.winSize.width * 0.5, bottom.getBoundingBox().height * 0.5);
        this.addChild(bottom,2);
        this.bottom = bottom;
    },

    /*----------Ready精灵-----------*/
    readySprite: function () {
        var ready = new cc.Sprite(res.Ready_png);
        ready.setPosition(cc.winSize.width * 2, cc.winSize.height * 0.7);
        //ready.scale = 0.6;
        var delay = cc.delayTime(0.5);
        ready.runAction(cc.sequence(delay, cc.callFunc(function () {
            if (cc.sys.localStorage.getItem("isEffectOn") == "YES") {
                cc.audioEngine.playEffect(res.Ready_wav);
            }
            var act = cc.sequence(cc.moveTo(0.8, cc.p(cc.winSize.width * 0.5, cc.winSize.height * 0.7)), cc.jumpBy(0.8, cc.p(0, 0), 100, 1), cc.fadeOut(1));
            ready.runAction(cc.sequence(act, cc.callFunc(function () {
                if (cc.sys.localStorage.getItem("isEffectOn") == "YES") {
                    cc.audioEngine.playEffect(res.Go_wav);
                }
                ready.runAction(cc.sequence(cc.callFunc(function () {
                    //添加GO
                    this.goSprite();
                }, this)));
            }, this)));
        }, this)));
        this.addChild(ready);
    },

    /*----------Go!精灵-------------*/
    goSprite: function () {
        var go = new cc.Sprite(res.Go_png);
        go.setPosition(cc.winSize.width * 0.5, cc.winSize.height * 0.5);
        this.addChild(go);
        //go.runAction(cc.fadeOut(1.5));
        go.runAction(cc.sequence(cc.fadeOut(1), cc.callFunc(function () {
            //添加音乐
            this.myMusic();
            //添加动物
            this.addAnimal();
            //添加时间进度条
            this.timeProgress();
            //添加分数标签
            this.label();
            //添加奖励进度条
            this.progress();
            //暂停继续开关
            this.toggle();
        }, this)))
    },

    /*----------添加音乐------------*/
    myMusic: function () {
        if (cc.sys.localStorage.getItem("isMusicOn") == "YES") {
            var random = parseInt(Math.random() * 6) + 1;
            //cc.log(random);
            cc.audioEngine.playMusic(res["BgMain0" + random + "_mp3"], true);
        }
    },

    /*----------添加动物------------*/
    addAnimal: function () {
        for (var i = 0; i < 6; i++) {
            var random = parseInt(Math.random() * 10);
            //cc.log("random=",random);
            var type = 0;
            if (random <= 3) {
                type = 1;
            } else if (random <= 8) {
                type = 2;
            } else {
                type = 3;
            }
            switch (type) {
                case 1:
                    var tu = new Animal(res.Tu01_png, 1);
                    this.frameAction(tu, 1);
                    this.animalArr[i] = tu;
                    this.normalNum++;
                    break;
                case 2:
                    var xiong = new Animal(res.Xiong01_png, 2);
                    this.frameAction(xiong, 2);
                    this.animalArr[i] = xiong;
                    this.normalNum++;
                    break;
                case 3:
                    var citun = new Animal(res.Citun01_png, 3);
                    this.frameAction(citun, 3);
                    this.animalArr[i] = citun;
                    break;
            }
        }
        var random = parseInt(Math.random() * 10);
        var center = new Center(res.Point_png, this.animalArr, random, this.normalNum);
        this.normalNum = 0;
        center.setPosition(cc.winSize.width * 0.5, -1*cc.winSize.height*0.27);
        this.addChild(center,1);
        this.center = center;
    },

    /*--------不同动物的帧动画------*/
    frameAction: function (sprite, kind) {
        sprite.scale = SPRITE_SCALE;
        var animation = new cc.Animation();
        switch (kind) {
            case 1:
                for (var j = 1; j <= 3; j++) {
                    var frameName = res["Tu0" + j + "_png"];
                    animation.addSpriteFrameWithFile(frameName);
                }
                break;
            case 2:
                for (var j = 1; j <= 3; j++) {
                    var frameName = res["Xiong0" + j + "_png"];
                    animation.addSpriteFrameWithFile(frameName);
                }
                break;
            case 3:
                for (var j = 1; j <= 3; j++) {
                    var frameName = res["Citun0" + j + "_png"];
                    animation.addSpriteFrameWithFile(frameName);
                }
                //cc.log("添加刺豚成功");
                break;
        }
        animation.setDelayPerUnit(1.0 / 10);
        animation.setRestoreOriginalFrame(true);
        var action = cc.animate(animation);
        sprite.runAction(action.repeatForever());
    },

    /*--------添加暂停播放开关------*/
    toggle: function () {
        var zanting = new cc.MenuItemImage(res.Zanting_png, res.Zanting_png, function () {
        }, this);
        var jixu = new cc.MenuItemImage(res.Jixu_png, res.Jixu_png, function () {
        }, this);
        var toggle = new cc.MenuItemToggle(zanting, jixu, function () {
            if (toggle.getSelectedIndex() == 1) {
                //cc.audioEngine.stopMusic();
                cc.audioEngine.pauseMusic();
                cc.director.pause();
                this.kuang();
            }
        }, this);
        this.toggleItem = toggle;
        var menu = new cc.Menu(toggle);
        menu.setPosition(this.top.getBoundingBox().width * 0.89, this.top.getBoundingBox().height * 0.5);
        this.top.addChild(menu);
    },

    /*--------点击暂停后的框--------*/
    kuang: function () {
        /*var grayBg = new cc.Sprite();
        grayBg.setColor(cc.color.GRAY);
        grayBg.setTextureRect(new cc.Rect(0, 0, cc.winSize.width, cc.winSize.height));
        grayBg.setOpacity(150);
        grayBg.setPosition(cc.winSize.width * 0.5, cc.winSize.height * 0.5);
        this.addChild(grayBg,3);*/
        var grayBg = new cc.LayerColor(cc.color.GRAY);
        grayBg.setOpacity(150);
        this.addChild(grayBg,3);
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch, event) {
                //cc.log("已点击");
                return true;
            }
        }, grayBg);
        var kuang = new cc.Sprite(res.Tanchu_png);
        kuang.setPosition(cc.winSize.width * 0.5, cc.winSize.height * 0.6);
        this.addChild(kuang,4);
        var resumeItem = new cc.MenuItemImage(res.Resume_normal_jpg, res.Resume_selected_jpg, function () {
            cc.audioEngine.resumeMusic();
            this.toggleItem.setSelectedIndex(0);
            cc.director.resume();
            grayBg.removeFromParent();
            kuang.removeFromParent();
        }, this);
        var exitItem = new cc.MenuItemImage(res.Exit_normal_png, res.Exit_selected_png, function () {
            cc.director.runScene(new ASStartScene());
            cc.director.resume();
        }, this);
        var menu = new cc.Menu(resumeItem, exitItem);
        menu.setPosition(kuang.getBoundingBox().width * 0.5, kuang.getBoundingBox().height * 0.38);
        //menu.alignItemsHorizontally();
        menu.alignItemsVerticallyWithPadding(30);
        kuang.addChild(menu);
    },

    /*--------添加时间进度条--------*/
    timeProgress: function () {
        var pro = new cc.Sprite(res.Progress_1_png);
        var timePro = new TimeProgress(pro, res.ProgressBg_png, GAME_TIME);
        timePro.setPosition(this.bottom.getBoundingBox().width * 0.5, this.bottom.getBoundingBox().height * 0.45);
        this.bottom.addChild(timePro);
        this.timePro = timePro;
    },

    /*--------增加游戏时间----------*/
    addTime: function () {
        this.timePro.addTime(0.3);
    },

    /*--------减少游戏时间----------*/
    subTime: function () {
        this.timePro.subTime(5);
    },

    /*---------添加奖励进度条-------*/
    progress: function () {
        var pro = new cc.Sprite(res.Progress_1_png);
        var Pro = new Progress(pro);
        Pro.setPosition(cc.winSize.width * 0.5, this.top.y -2.3*pro.getBoundingBox().height);
        this.addChild(Pro,0);
        this.pro = Pro;
    },

    /*----------添加分数标签--------*/
    label: function () {
        var label = new cc.LabelTTF(this.score.toString(), "", 80);
        label.setPosition(this.top.getBoundingBox().width * 0.5, this.top.getBoundingBox().height * 0.5);
        label.setFontFillColor(cc.color.RED);
        label.enableStroke(cc.color.YELLOW, 3);
        this.top.addChild(label);
        this.scoreLabel = label;
        this.schedule(this.recordScore, 0.01);
    },

    /*----------记录分数------------*/
    recordScore: function () {
        this.scoreLabel.setString(this.score);
    },

    /*----------存储分数------------*/
    storageScore: function () {
        var ls = cc.sys.localStorage;
        ls.setItem("currentScore", this.score);
        var currentScore = ls.getItem("currentScore");
        if (this.score > ls.getItem("bestScore")) {
            ls.setItem("bestScore", currentScore);
        }
    },
});

var ASMainScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        var layer = new ASMainLayer();
        this.addChild(layer);
    }
});