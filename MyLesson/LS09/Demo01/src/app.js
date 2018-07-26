
var HelloWorldLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        this._super();
        var size = cc.winSize;
        this.addChild(new cc.LayerColor(cc.color.GRAY));
        var sp1 = new cc.Sprite(res.Spide_png);
        sp1.setPosition(size.width/2,size.height*0.7);
        this.addChild(sp1);

        cc.spriteFrameCache.addSpriteFrames(res.Enemy11_plist,res.Enemy11_png);
        var sp2 = new cc.Sprite("#11_T_wk_00002.png");
        sp2.setPosition(size.width/2,size.height*0.3);
        this.addChild(sp2);

        var spriteFrame = cc.spriteFrameCache.getSpriteFrame("11_T_wk_00005.png");
        var sp3 = new cc.Sprite(spriteFrame);
        sp3.setPosition(size.width/2,size.height*0.5);
        this.addChild(sp3);
        sp3.setScale(0.8);

        var moveMenuItem = new cc.MenuItemFont("移 动",function () {
            sp3.y-=5;
            var rect = sp2.getBoundingBox();
            if(cc.rectContainsPoint(rect,sp3.getPosition())){
                cc.log("碰撞到了！");
            }
            // if(cc.rectContainsRect(rect,sp3.getBoundingBox())){
            //     cc.log("碰撞到了！");
            // }
        },this);

        var menu = new cc.Menu(moveMenuItem);
        menu.setPosition(0,0);
        moveMenuItem.setPosition(size.width*0.5,size.height*0.2);
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

