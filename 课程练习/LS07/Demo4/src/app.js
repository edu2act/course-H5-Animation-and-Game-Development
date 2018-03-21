
var HelloWorldLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();
        var size = cc.winSize;
        this.addChild(new cc.LayerColor(cc.color.WHITE));

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

