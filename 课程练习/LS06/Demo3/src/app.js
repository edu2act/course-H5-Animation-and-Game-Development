
var HelloWorldLayer = cc.Layer.extend({
    sprite:null,
    redSprite:null,
    speed:0,
    num:0,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();
        var size = cc.winSize;

        this.addChild(new cc.LayerColor(cc.color.WHITE));
 /*        for(var i=0;i<20;i++){
            var xLine = new cc.LayerColor(cc.color.RED,1,size.height);
            xLine.x = i*100;
            this.addChild(xLine);

            var yLine = new cc.LayerColor(cc.color.RED,size.width,1);
            yLine.y = i*100;
            this.addChild(yLine);
        }

        var redSprite = new cc.Sprite(res.Red_png);
        redSprite.x = 150;
        redSprite.y = 150;
        redSprite.setAnchorPoint(cc.p(0,0));
        this.addChild(redSprite);

        var yellowSprite = new cc.Sprite(res.Yellow_png);
        yellowSprite.x = 100;
        yellowSprite.y = 100;
        yellowSprite.setAnchorPoint(cc.p(0.5,0.5));
        this.addChild(yellowSprite);

        var localPosition = redSprite.convertToNodeSpace(yellowSprite.getPosition());
        cc.log(localPosition.x);
        cc.log(localPosition.y);


        var yellowSprite = new cc.Sprite(res.Yellow_png);
        yellowSprite.x = 100;
        yellowSprite.y = 100;
        yellowSprite.setAnchorPoint(cc.p(0.5,0.5));
        this.addChild(yellowSprite,2);//设置Z轴顺序
 */
        this.redSprite = new cc.Sprite(res.Red_png);
        this.redSprite.x = size.width/2;
        this.redSprite.y = 400;
        //this.redSprite.setAnchorPoint(cc.p(0.5,0.5));
        this.addChild(this.redSprite);
        this.redSprite.setLocalZOrder(3);//设置Z轴顺序

        //this.scheduleUpdate();
        this.schedule(this.myCallBack,0.02,cc.REPEAT_FOREVER,0);
        return true;
    },
    update:function(dt){
        cc.log("Timer"+dt);
        this.num++;
        if(this.num > 1000){this.unscheduleUpdate()}
    },
    myCallBack:function(dt){
        /*
        this.redSprite.x += 1;
        this.redSprite.y += 1;
        if(this.redSprite.x > 300){
            this.unschedule(this.myCallBack);
        }
        */
        this.redSprite.y -= this.speed;
        if(this.redSprite.y < 0){
            this.speed = -this.speed;
        }else{
            this.speed += 0.2;
            //this.speed += 10*dt;
        }

    }
});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});

