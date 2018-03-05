
var HelloWorldLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        var size = cc.winSize;

        var bg = new cc.Sprite(res.bg_jpg);
        bg.x = size.width*0.5;
        bg.y = size.height*0.5;
        this.addChild(bg);

        var sp1 = new cc.Sprite(res.spider_png);
        sp1.x = size.width*0.3;
        sp1.y = size.height*0.5;
        this.addChild(sp1);

        var sp2 = new cc.Sprite(res.spider_png,cc.rect(0,0,100,100),null);
        sp2.x = size.width*0.6;
        sp2.y = size.height*0.5;
        //sp2.setScale(0.5);
        this.addChild(sp2);

        var moveMenuItem = new cc.MenuItemFont("Move",function(){
            sp2.x -= 5;
            //if(cc.rectContainsPoint(sp1.getBoundingBox(),sp2.getPosition())){
            //    cc.log("碰到了");
            //}
            if(cc.rectContainsRect(sp1.getBoundingBox(),sp2.getBoundingBox())){
                cc.log("碰到了");
            }
        },this);
        var menu = new cc.Menu(moveMenuItem);
        menu.y = size.height*0.3;
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

