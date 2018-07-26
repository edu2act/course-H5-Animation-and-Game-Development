
var HelloWorldLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        var size = cc.winSize;

        //本地坐标系与世界坐标系
        this.addChild(new cc.LayerColor(cc.color.WHITE));
        for(var i=0;i<20;i++){
            var xLine = new cc.LayerColor(cc.color.RED,1,size.height);
            xLine.x = i*100;
            this.addChild(xLine);

            var yLine = new cc.LayerColor(cc.color.RED,size.width,1);
            yLine.y = i*100;
            this.addChild(yLine);
        }
/*
        var redSprite = new cc.Sprite(res.Red_png);

        //redSprite.setAnchorPoint(cc.p(0,0));

        redSprite.x = 200;
        redSprite.y = 200;

        this.addChild(redSprite);

        var yellowSprite = new cc.Sprite(res.Yellow_png);
        yellowSprite.setAnchorPoint(cc.p(0.5,0.5));

        yellowSprite.x = 100;
        yellowSprite.y = 100;

        //this.addChild(yellowSprite);
        redSprite.addChild(yellowSprite);
*/
/*
                                //坐标系变换 世界坐标系－》本地坐标系
         var node3 = new cc.Sprite(res.Red_png);
         node3.setAnchorPoint(cc.p(1.0, 1.0));
         node3.x = 200;
         node3.y = 200;
         this.addChild(node3);

         var node4 = new cc.Sprite(res.Yellow_png);
         node4.setAnchorPoint(cc.p(0.5, 0.5));
         node4.x = 50;
         node4.y = 50;
         this.addChild(node4);

         var point = node3.convertToNodeSpace(node4.getPosition());//忽略node3的锚点，以node3左下角为参考
         //var point = node3.convertToNodeSpaceAR(node4.getPosition());
         cc.log(point.x);
         cc.log(point.y);
*/


         //坐标系变换 本地坐标系－》世界坐标系
         var node5 = new cc.Sprite(res.Red_png);
         node5.setAnchorPoint(cc.p(1.0, 1.0));
         node5.x = 200;
         node5.y = 200;
         this.addChild(node5);

         var node6 = new cc.Sprite(res.Yellow_png);
         node6.setAnchorPoint(cc.p(0.5, 0.5));
         node6.x = 0;
         node6.y = 0;
         node5.addChild(node6);

         var point = node5.convertToWorldSpace(node6.getPosition());//不考虑锚点
         //var point = node5.convertToWorldSpaceAR(node6.getPosition());
         cc.log(point.x);
         cc.log(point.y);

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

