var HelloWorldLayer = cc.Layer.extend({
    arr: [],//背景数组
    plane: null,
    ctor: function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        var size = cc.winSize;

        //添加飞机和背景
        this.addPlaneAndBg();

        //背景滚屏回调
        this.schedule(this.bgCallback, 0.001);//背景回调

        return true;
    },
    bgCallback: function (dt) {
        for (var i in this.arr) {
            //720是this.arr[i].getBoundingBox().height/2
            if (this.arr[i].y < -720) {
                this.arr[i].y += 2 * 1440;
            }
            this.arr[i].y -= 2;
        }
    },

    addPlaneAndBg: function () {
        //背景
        var bg = new cc.Sprite(res.bg1_jpg);
        bg.x = cc.winSize.width / 2;
        bg.y = cc.winSize.height / 2;
        this.addChild(bg);
        this.arr[0] = bg;

        var bg2 = new cc.Sprite(res.bg1_jpg);
        bg2.x = cc.winSize.width / 2;
        bg2.y = cc.winSize.height / 2 + bg.getBoundingBox().height;
        this.addChild(bg2);
        this.arr[1] = bg2;

        //我方飞机
        var p1 = new Plane(res.p1_png);
        p1.x = cc.winSize.width / 2;
        p1.y = cc.winSize.height / 3;
        this.addChild(p1);
        this.plane = p1;
    }
});

var HelloWorldScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});

