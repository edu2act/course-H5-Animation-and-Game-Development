var HelloWorldLayer = cc.Layer.extend({
    ctor:function () {
        this._super();
        var size = cc.winSize;
        /*
        //锚点，模拟按钮布局
        var layer1 = new cc.LayerColor(cc.color.RED,200,200);
        var layer2 = new cc.LayerColor(cc.color.YELLOW,200,200);
        var layer3 = new cc.LayerColor(cc.color.BLUE,200,200);
        layer1.ignoreAnchor = false;
        layer2.ignoreAnchor = false;
        layer3.ignoreAnchor = false;
        layer1.setAnchorPoint(0,0);
        layer2.setAnchorPoint(1,1);
        layer3.setAnchorPoint(1,0);

        layer1.setPosition(0,0);
        layer2.setPosition(size.width-50,size.height-50);
        layer3.setPosition(size.width-50,50);

        this.addChild(layer1);
        this.addChild(layer2);
        this.addChild(layer3);
        layer2.runAction(cc.rotateBy(15,180).repeatForever());
        layer3.runAction(cc.rotateBy(15,180).repeatForever());

        layer2.runAction(cc.sequence(cc.scaleBy(2,0.2),cc.scaleBy(2,0.2).reverse()).repeatForever());
        layer3.runAction(cc.sequence(cc.scaleBy(2,0.2),cc.scaleBy(2,0.2).reverse()).repeatForever());
*/

        //坐标系变换 世界坐标系－》本地坐标系
        var node3 = new cc.Sprite(res.Red_png);
        node3.setAnchorPoint(cc.p(1.0, 1.0));
        node3.x = 200;
        node3.y = 200;
        this.addChild(node3,10);

        var node4 = new cc.Sprite(res.Yellow_png);
        node4.setAnchorPoint(cc.p(0.5, 0.5));
        node4.x = 100;
        node4.y = 100;
        this.addChild(node4,9,"node4");

        // var point = node3.convertToNodeSpace(node4.getPosition());//忽略node3的锚点，以node3左下角为参考
        var point = node3.convertToNodeSpaceAR(node4.getPosition());
        cc.log(point.x);
        cc.log(point.y);

        // node3.setLocalZOrder(19);
        // node4.setLocalZOrder(10);


        /*
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

         // var point = node5.convertToWorldSpace(node6.getPosition());//不考虑锚点
         var point = node5.convertToWorldSpaceAR(node6.getPosition());
         cc.log(point.x);
         cc.log(point.y);
*/


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

