/**
 * Created by Zhang_yi_chi on 2015/11/25.
 */
var ASStartLayer = cc.Layer.extend({
    sprite: null,
    size: null,
    kuang: null,
    ctor: function () {

        this._super();


        this.size = cc.winSize;

        cc.log("cc.sys.platform=",cc.sys.platform);
        //判断是否开启音乐和音效
        this.isOpen();

        //添加背景
        this.myBg();

        //添加游戏名
        this.gameLogo();

        //添加开始按钮
        this.menuItem();

        //音乐开关
        this.musicToggle();

        //音效开关
        this.effectToggle();

        return true;
    },

    /*--------是否开启音乐或音效--------*/
    isOpen: function () {
        var ls = cc.sys.localStorage;
        if (ls.getItem("isMusicOn") == null) {
            ls.setItem("isMusicOn", "YES");
        }
        if (ls.getItem("isEffectOn") == null) {
            ls.setItem("isEffectOn", "YES");
        }
    },

    /*-------------添加背景-------------*/
    myBg: function () {
        var mybg = new cc.Sprite(res.StartBg_png);
        mybg.x = this.size.width / 2;
        mybg.y = this.size.height / 2;
        this.addChild(mybg);
    },

    /*-------------游戏名称-------------*/
    gameLogo: function () {
        var name = new cc.Sprite(res.Logo_png);
        name.setPosition(cc.winSize.width * 0.5, cc.winSize.height * 0.75);
        this.addChild(name);
    },

    /*--------开始和关于我们按钮--------*/
    menuItem: function () {
        var start = new cc.MenuItemImage(res.Start_normal_png, res.Start_selected_png, function () {
            cc.audioEngine.stopMusic();
            cc.director.runScene(new ASMainScene());
        }, this);
        var about = new cc.MenuItemImage(res.About_us_normal_png, res.About_us_selected_png, function () {
            //console.log("关于我们")
            this.aboutKuang();
        }, this);
        var menu = new cc.Menu(start, about);
        menu.setPosition(cc.winSize.width * 0.5, cc.winSize.height * 0.3);
        menu.alignItemsVerticallyWithPadding(40);
        this.addChild(menu);
    },

    /*-------------音乐开关-------------*/
    musicToggle: function () {
        var ls = cc.sys.localStorage;
        var onItem = new cc.MenuItemImage(res.Music_on_normal_png, res.Music_on_selected_png, function () {

        }, this);
        var offItem = new cc.MenuItemImage(res.Music_off_normal_png, res.Music_off_selected_png, function () {
        }, this);
        var toggleItem = new cc.MenuItemToggle(onItem, offItem, function () {
            if (toggleItem.getSelectedIndex() == 0) {
                ls.setItem("isMusicOn", "YES");
                cc.audioEngine.playMusic(res.StarMusic_mp3, true);
            } else {
                ls.setItem("isMusicOn", "NO");
                cc.audioEngine.stopMusic();
            }
        }, this);
        if (ls.getItem("isMusicOn") == "YES") {
            toggleItem.setSelectedIndex(0);
            cc.audioEngine.playMusic(res.StarMusic_mp3, true);
        } else {
            toggleItem.setSelectedIndex(1);
            cc.audioEngine.stopMusic();
        }
        var menu = new cc.Menu(toggleItem);
        menu.setPosition(cc.winSize.width * 0.15, cc.winSize.height * 0.1);
        this.addChild(menu);
    },

    /*-------------音效开关-------------*/
    effectToggle: function () {
        var soundOnMenuItem = new cc.MenuItemImage(res.Effect_on_normal_png, res.Effect_on_selected_png, function () {
        }, this);
        var soundOffMenuItem = new cc.MenuItemImage(res.Effect_off_normal_png, res.Effect_off_selected_png, function () {
        }, this);
        var soundToggleMenuItem = new cc.MenuItemToggle(soundOnMenuItem, soundOffMenuItem, function () {
            if (soundToggleMenuItem.getSelectedIndex() == 0) {
                cc.audioEngine.playEffect(res.MaoOnclick_wav);
                cc.sys.localStorage.setItem("isEffectOn", "YES");
            } else {
                cc.sys.localStorage.setItem("isEffectOn", "NO")
            }
        }, this);
        var menu = new cc.Menu(soundToggleMenuItem);
        menu.setPosition(cc.winSize.width * 0.85, cc.winSize.height * 0.1);
        this.addChild(menu);
        if (cc.sys.localStorage.getItem("isEffectOn") == "YES") {
            soundToggleMenuItem.setSelectedIndex(0);
            //cc.audioEngine.playMusic(res.StarMusic_mp3,true);
        } else {
            soundToggleMenuItem.setSelectedIndex(1);
            cc.audioEngine.stopMusic();
        }
    },

    /*-----------关于我们弹出框---------*/
    aboutKuang: function () {
       /* var grayBg = new cc.Sprite();
        grayBg.setColor(cc.color.GRAY);
        grayBg.setTextureRect(new cc.Rect(0, 0, cc.winSize.width, cc.winSize.height));
        grayBg.setOpacity(150);
        grayBg.setPosition(cc.winSize.width * 0.5, cc.winSize.height * 0.5);
        this.addChild(grayBg);*/
        var grayBg = new cc.LayerColor(cc.color.GRAY);
        grayBg.setOpacity(150);
        this.addChild(grayBg);
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch, event) {
                //cc.log("已点击");
                return true;
            }
        }, grayBg);
        var kuang = new cc.Sprite(res.About_us_png);
        kuang.setPosition(grayBg.getBoundingBox().width * 0.5, grayBg.getBoundingBox().height * 0.52);
        this.kuang = kuang;
        kuang.setOpacity(0);
        kuang.setCascadeOpacityEnabled(true);
        grayBg.addChild(kuang);
        this.text();
        var back = new cc.MenuItemFont("返回", function () {
            grayBg.removeFromParent();
        }, this);
        back.setColor(cc.color.RED);
        back.setFontSize(60);
        var menu = new cc.Menu(back);
        menu.setPosition(kuang.getBoundingBox().width * 0.15, kuang.getBoundingBox().height * 0.055);
        kuang.addChild(menu);
    },

    /*-------关于我们的具体内容---------*/
    text: function () {
        var labelArray = [];
        var size = this.kuang.getBoundingBox();
        var label1 = new cc.LabelTTF("躲避刺豚君", "黑体", 60);
        labelArray.push(label1);
        //var label2 = new cc.LabelTTF("Onfire 工作室", "黑体", 60);
        //labelArray.push(label2);
        var label3 = new cc.LabelTTF("微信号：onfire", "黑体", 60);
        labelArray.push(label3);
        var label4 = new cc.LabelTTF("QQ：1247524771", "黑体", 60);
        labelArray.push(label4);
        var label5 = new cc.LabelTTF("版权所有：", "黑体", 60);
        labelArray.push(label5);
        var label6 = new cc.LabelTTF("Onfire 工作室", "黑体", 60);
        labelArray.push(label6);
        for (var i = 0; i < labelArray.length; i++) {
            labelArray[i].setPosition(size.width * 0.5, size.height * (0.72 - i * 0.1));
            labelArray[i].setColor(cc.color.WHITE);
            labelArray[i].enableStroke(cc.color.ORANGE, 3);
            labelArray[i].setOpacity(0);
            labelArray[i].scale = 0.1;
            this.kuang.addChild(labelArray[i]);
        }
        var delay = cc.delayTime(0.5);
        var fadeIn = cc.fadeIn(0.5);
        var scale = cc.scaleTo(0.5, 1);
        var anction = cc.spawn(fadeIn, scale);
        this.kuang.runAction(cc.sequence(delay,anction,cc.callFunc(function(){
            label1.runAction(cc.sequence(delay, anction, cc.callFunc(function () {
                //label2.runAction(cc.sequence(delay, anction, cc.callFunc(function () {
                    label3.runAction(cc.sequence(delay, anction, cc.callFunc(function () {
                        label4.runAction(cc.sequence(delay, anction, cc.callFunc(function () {
                            label5.runAction(cc.sequence(delay, anction, cc.callFunc(function () {
                                label6.runAction(cc.sequence(delay, anction));
                            }, this)))
                        }, this)))
                    }, this)))
                }, this)))
            }, this)))
        //},this)))

    }
});

var ASStartScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        var layer = new ASStartLayer();
        this.addChild(layer);
    }
});
