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

/*
        var yellowSprite = new cc.Sprite(res.Yellow_png);
        yellowSprite.x = size.width*0.4;
        yellowSprite.y = size.height*0.5;
        yellowSprite.tag = 100;
        this.addChild(yellowSprite);

        var redSprite = new cc.Sprite(res.Red_png);
        redSprite.x = size.width*0.6;
        redSprite.y = size.height*0.5;
        redSprite.tag = 99;
        this.addChild(redSprite);
        //redSprite.setRotation(45);

        var listener = cc.EventListener.create({
            event:cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches:true,
            onTouchBegan: function (touch, event) {
                var location = touch.getLocation();
                var target = event.getCurrentTarget();
                if(cc.rectContainsPoint(target.getBoundingBox(),location)){
                    label.setString("点击到"+target.tag+"矩形！");
                    return true;
                }

                //精确点击
                //var locationInView = target.convertToNodeSpace(location);
                //var targetSize = target.getContentSize();
                //var frame = cc.rect(0,0,targetSize.width,targetSize.height);
                //if(cc.rectContainsPoint(frame,locationInView)){
                //    label.setString("点击到红色矩形！");
                //    return true;
                //}

                //label.setString("onTouchBegan:"+location.x+"  "+location.y);
                return false; //返回布尔类型，若返回为false则，后边回调都不再执行
            },
            onTouchMoved: function (touch, event) {
                var delta = touch.getDelta();
                var target = event.getCurrentTarget();
                target.x += delta.x;
                target.y += delta.y;
                //label.setString("onTouchMoved"+delta.x+"  "+delta.y);
            },
            onTouchEnded: function (touch, event) {
                //label.setString("onTouchEnded");
                var target = event.getCurrentTarget();
                if(99 === target.tag){
                    target.x = size.width*0.6;
                    target.y = size.height*0.5;
                }
                if(100 === target.tag){
                    target.x = size.width*0.4;
                    target.y = size.height*0.5;
                }
            }
        });
        cc.eventManager.addListener(listener,redSprite);
        cc.eventManager.addListener(listener.clone(),yellowSprite);
*/
        var redSprite = new MySprite(res.Red_png);
        redSprite.x = size.width *0.4;
        redSprite.y = size.height*0.5;
        redSprite.tag = 99;
        this.addChild(redSprite);

        var yellowSprite = new MySprite(res.Yellow_png);
        yellowSprite.x = size.width *0.6;
        yellowSprite.y = size.height*0.5;
        yellowSprite.tag = 100;
        this.addChild(yellowSprite);

        //var that = this;
        //var cbAction = cc.callFunc(function(){that.removeChild(redSprite)});
        var cbAction = cc.callFunc(function(){
            redSprite.getParent().removeChild(redSprite)
        });
        this.runAction(cc.sequence(cc.delayTime(5),cbAction));

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
                    label.setString("Pressed:"+getKeyStr(key));
                },
                onKeyReleased:function(key,event){
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

