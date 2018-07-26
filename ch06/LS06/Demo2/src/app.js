
var HelloWorldLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        /////////////////////////////
        // 2. add a menu item with "X" image, which is clicked to quit the program
        //    you may modify it.
        // ask the window size
        var size = cc.winSize;
        //锚点实验
        var node1 = new cc.LayerColor(cc.color.BLUE,200,200);
        node1.x = size.width/2;
        node1.y = size.height/2;
        node1.setAnchorPoint(0.5,0.5); //默认锚点为（0.5，0.5）
        this.addChild(node1);

        var node2 = new cc.LayerColor(cc.color.GREEN,200,200);
        node2.x = size.width/2;
        node2.y = size.height/2;
        node2.setAnchorPoint(0,0);
        this.addChild(node2);

        node1.ignoreAnchorPointForPosition(false);//层默认是忽略锚点的
        node2.ignoreAnchorPointForPosition(false);

        //node1.runAction(cc.repeatForever(cc.rotateBy(1.0,20)));
        //node2.runAction(cc.repeatForever(cc.rotateBy(1.0,20)));
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

