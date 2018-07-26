var FStarLayer = cc.Layer.extend({
    sprite:null,
    _helpZ:null,
    _ls:null,
    _startMenu:null,
    ctor:function () {
        this._super();
        var size = cc.winSize;

        //背景
        this.bg();

        //开始按钮
        this.startMenu();

        //音乐开关
        this.music();

        //音效开关
        this.Effect();

        //添加气泡
        this.addBubble();

        //关于我们
        this.aboutUs();

        //logo
        this.logo();

        return true;
    },

    bg : function () {
        var bg = new cc.Sprite(res.bg_jpg);
        bg.setPosition(cc.p(cc.winSize.width/2,cc.winSize.height/2));
        this.addChild(bg,-100);
    },

    startMenu : function(){
        var startItem =new cc.MenuItemImage (res.start_normal_png,res.start_selected_png,function(){
            cc.director.runScene(new FMainScene());
            var ls = cc.sys.localStorage;
            if(ls.getItem("isEffect") == "YES"){
                cc.audioEngine.playEffect(res.kaishianniu_wav);
            };
        },this);
        var menu = new cc.Menu(startItem);
        menu.setPosition(cc.p(cc.winSize.width*0.5,cc.winSize.height*0.37));
        this._startMenu = menu;
        this.addChild(menu);
    },

    music: function() {
        var ls = cc.sys.localStorage;
        if(ls.getItem("isMusicOn")==null){
            ls.setItem("isMusicOn","YES");
        }
       /* if(ls.getItem("isMusicOn")=="YES") {
            if(cc.audioEngine.isMusicPlaying()){
                cc.log("isplaying")
            }else {
                cc.audioEngine.playMusic(res.bgmusic_mp3, true);
            }
         }*/
        var musicItem1 = new cc.MenuItemImage(res.music_on_normal_png,res.music_on_selected_png);
        var musicItem2 = new cc.MenuItemImage(res.music_off_normal_png,res.music_off_selected_png);
        var musicItem = new cc.MenuItemToggle(musicItem1,musicItem2,function(){
            //cc.log(musicItem.getSelectedIndex());
            if(musicItem.getSelectedIndex() == 0) {
                cc.audioEngine.playMusic(res.bgmusic_mp3,true);
                ls.setItem("isMusicOn","YES")
            }else{
                cc.audioEngine.stopMusic(res.bgmusic_mp3);
                ls.setItem("isMusicOn","No");
            }
        },this);
        var menu = new cc.Menu(musicItem);
        menu.setPosition(cc.winSize.width*0.9,cc.winSize.height*0.85);
        this.addChild(menu);
        if(ls.getItem("isMusicOn")=="YES"){
            cc.audioEngine.playMusic(res.bgmusic_mp3,true);
            musicItem.setSelectedIndex(0)
        }else if(ls.getItem("isMusicOn")=="No"){
            cc.audioEngine.stopMusic(res.bgmusic_mp3);
            musicItem.setSelectedIndex(1);
        }

    },

    Effect : function () {
        var ls = cc.sys.localStorage;
        if(ls.getItem("isEffect")==null){
            ls.setItem("isEffect","YES")
        }
        var effectItem1 = new cc.MenuItemImage(res.effect_on_normal_png,res.effect_on_selected_png);
        var effectItem2 = new cc.MenuItemImage(res.effect_off_normal_png,res.effect_off_selected_png);
        var effectItem = new cc.MenuItemToggle(effectItem1,effectItem2,function(){
            if(effectItem.getSelectedIndex()==1){
                cc.audioEngine.stopAllEffects();
                ls.setItem("isEffect","No");
            }else {
                cc.audioEngine.resumeAllEffects();
                ls.setItem("isEffect","YES");
            }
        },this);
        var menu = new cc.Menu(effectItem);
        menu.setPosition(cc.p(cc.winSize.width*0.9,cc.winSize.height*0.95));
        this.addChild(menu);
        if(ls.getItem("isEffect")=="YES"){
            effectItem.setSelectedIndex(0);
            cc.audioEngine.resumeAllEffects();
        }else if(ls.getItem("isEffect")=="No"){
            effectItem.setSelectedIndex(1);
            cc.audioEngine.stopAllEffects();
        }
    },

    addBubble:function(){
        this.schedule(function(){
            var bubble = new Bubble(res.qipao_png);
            this.addChild(bubble,-1);
        },1)
    },

    aboutUs:function(){
        var abo = new cc.LayerColor(cc.color(207,251,255));
        this.addChild(abo,-500);

        var about = new cc.Sprite(res.aboutus_png);
        about.setPosition(cc.p(abo.getBoundingBox().width/2,abo.getBoundingBox().height/2));
        abo.addChild(about);

        var listener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch, event) {
                return true;
            }
        });
        cc.eventManager.addListener(listener, abo);

        var label1 = new cc.LabelTTF("总策划：    王志磊","",50);
        label1.setColor(cc.color.ORANGE);
        label1.setPosition(cc.p(abo.getBoundingBox().width/2,abo.getBoundingBox().height*0.65));
        var label2 = new cc.LabelTTF("开发小组：    ","",50);
        label2.setColor(cc.color.ORANGE);
        label2.setPosition(cc.p(abo.getBoundingBox().width*0.43,abo.getBoundingBox().height*0.55));
        var label3 = new cc.LabelTTF("王志磊","",50);
        label3.setColor(cc.color.ORANGE);
        label3.setPosition(cc.p(abo.getBoundingBox().width*0.68,abo.getBoundingBox().height*0.5));
        var label4 = new cc.LabelTTF("杨爽","",50);
        label4.setColor(cc.color.ORANGE);
        label4.setPosition(cc.p(abo.getBoundingBox().width*0.68,abo.getBoundingBox().height*0.45));
        var label5 = new cc.LabelTTF("王甜月","",50);
        label5.setColor(cc.color.ORANGE);
        label5.setPosition(cc.p(abo.getBoundingBox().width*0.68,abo.getBoundingBox().height*0.4));
        var label6 = new cc.LabelTTF("王素霞","",50);
        label6.setColor(cc.color.ORANGE);
        label6.setPosition(cc.p(abo.getBoundingBox().width*0.68,abo.getBoundingBox().height*0.35));
        abo.addChild(label1);
        abo.addChild(label2);
        abo.addChild(label3);
        abo.addChild(label4);
        abo.addChild(label5);
        abo.addChild(label6);

        var fanhuiLabel = new cc.LabelTTF("返回","",50);
        var fanhui = new cc.MenuItemLabel(fanhuiLabel,function(){
            abo.setZOrder(-500);
            menu.setVisible(true);
        });
        var menu1 = new cc.Menu(fanhui);
        menu1.setPosition(cc.p(abo.getBoundingBox().width*0.1,abo.getBoundingBox().height*0.1));
        menu1.setColor(cc.color.ORANGE);
        abo.addChild(menu1);

        var helpItem =new cc.MenuItemImage (res.us_normal_png,res.us_selected_png,function(){
            abo.setZOrder(100);
            var ls = cc.sys.localStorage;
            if(ls.getItem("isEffect") == "YES"){
                cc.audioEngine.playEffect(res.kaishianniu_wav);
            };
        },this);
        var menu = new cc.Menu(helpItem);
        menu.setPosition(cc.p(cc.winSize.width*0.5,cc.winSize.height*0.27));
        this.addChild(menu);
    },

    logo:function(){
        var logo = new cc.Sprite(res.logo_png);
        logo.setPosition(cc.p(cc.winSize.width/2,cc.winSize.height*0.65));
        this.addChild(logo,100);
    }

});

var FStartScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new FStarLayer();
        this.addChild(layer);
         var ls = cc.sys.localStorage;
        if(ls.getItem("isMusicOn")=="YES") {
            if(cc.audioEngine.isMusicPlaying()){
                
            }else{
                cc.audioEngine.playMusic(res.bgmusic_mp3, true);
            }
        }
    }
});