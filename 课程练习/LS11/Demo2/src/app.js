var HelloWorldLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();
        var size = cc.winSize;
        
        var label = new cc.LabelTTF("xxx");
        label.x = size.width / 2;
        label.y = size.height * 0.8;
        label.setFontSize(20);
        this.addChild(label);


        function getKeyStr(keycode) {
            for (var keyTemp in cc.KEY) {
                if (cc.KEY[keyTemp] == keycode) {
                    return keyTemp;
                }
            }
            return "";
        }
        if('keyboard' in cc.sys.capabilities){
            cc.eventManager.addListener({
                event:cc.EventListener.KEYBOARD,
                onKeyPressed:function(key,event){
                    // label.setString("Pressed:"+key);
                    label.setString("Pressed:"+getKeyStr(key));
                },
                onKeyReleased:function(key,event){
                    // label.setString("Released:"+key);
                    label.setString("Released:"+getKeyStr(key));
                }
            },this);
        }

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

