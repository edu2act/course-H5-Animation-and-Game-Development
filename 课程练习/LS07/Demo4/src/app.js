
var HelloWorldLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();
        var size = cc.winSize;
        this.addChild(new cc.LayerColor(cc.color.WHITE));
        /*
        var startMenuItem = new cc.MenuItemFont("开始",function(){
            cc.log("开始按钮点击了！");
        },this);

        var setMenuItem = new cc.MenuItemFont("设置",function(){
            cc.log("设置按钮点击了！");
        },this);

        var ttfLabel = new cc.LabelTTF("其他","",30);
        ttfLabel.setFontFillColor(cc.color.RED);
        ttfLabel.enableStroke(cc.color.YELLOW,2);
        ttfLabel.enableShadow(cc.color.WHITE,15,15,15);

        var otherMenuItem = new cc.MenuItemLabel(ttfLabel,function(){
            cc.log("其他按钮点击了！");
        },this);

        var menu = new cc.Menu(startMenuItem,setMenuItem,otherMenuItem);
        //menu.alignItemsHorizontally();
        //menu.alignItemsHorizontallyWithPadding(size.width*0.3);
        //menu.alignItemsVertically();
        //menu.alignItemsVerticallyWithPadding(50);
        this.addChild(menu);
        //menu.y = size.height*0.3;

        //menu.setPosition(cc.p(0,0));
        menu.x = 0;
        menu.y = 0;

        startMenuItem.x = size.width*0.5;
        startMenuItem.y = size.height*0.5;

        setMenuItem.x = size.width*0.2;
        setMenuItem.y = size.height*0.3;

        otherMenuItem.x = size.width*0.8;
        otherMenuItem.y = size.height*0.7;
        */
        /*
        var playMenuItem = new cc.MenuItemImage(res.PlayBtnNormal_png,res.PlaytBtnSelected_png,function(){
            cc.log("playMenuItem");
        },this);

        var aboutMenuItem = new cc.MenuItemImage(res.AboutBtnNormal_png,res.AboutBtnSelected_png,function(){
            cc.log("aboutMenuItem");
        },this);

        var highMenuItem = new cc.MenuItemImage(res.HightScoresBtnNormal_png,res.HighScoresBtnSelected_png,function(){
            cc.log("highMenuItem");
        },this);

        var menu = new cc.Menu(playMenuItem,aboutMenuItem,highMenuItem);
        this.addChild(menu);

        menu.alignItemsHorizontallyWithPadding(50);
        */
/*
        var musicOnItem = new cc.MenuItemFont("开声音",function(){

        },this);
        var musicOffItem = new cc.MenuItemFont("关声音",function(){

        },this);
*/



        var musicOnItem = new cc.MenuItemImage(res.MusicOnNormal_png,res.MusicOnSelected_png,function(){

        },this);
        var musicOffItem = new cc.MenuItemImage(res.MusicOffNormal_png,res.MusicOffSelected_png,function(){

        },this);
        var ls = cc.sys.localStorage;
        var toggleItem = new cc.MenuItemToggle(musicOnItem,musicOffItem,function(){
            if(0 == toggleItem.getSelectedIndex()){
                ls.setItem("isOn",0);//记录用户设置为开
            }else{
                ls.setItem("isOn",1);//记录用户设置为关
            }
        },this);

        if(null == ls.getItem("isOn")){
            //第一次进程序
        }else if(0 == ls.getItem("isOn")){
            //用户以前设置的是开状态
            toggleItem.setSelectedIndex(0);
        }else if(1 == ls.getItem("isOn")){
            //用户以前设置的是关状态
            toggleItem.setSelectedIndex(1);
        }

        var menu = new cc.Menu(toggleItem);
        this.addChild(menu);
        cc.LayerGradient
        return true;
    }
});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});

