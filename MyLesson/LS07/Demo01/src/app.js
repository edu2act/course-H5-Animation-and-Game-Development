var HelloWorldLayer = cc.Layer.extend({
    label: null,
    second:0,
    ctor: function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        var size = cc.winSize;

        var labelTTF = new cc.LabelTTF("玩家："+this.second, "", 64);
        labelTTF.x = 50;
        labelTTF.y = size.height - 50;
        labelTTF.setAnchorPoint(0, 1);
        this.addChild(labelTTF);

        //设置字体样式
        labelTTF.setFontFillColor(cc.color.RED);
        labelTTF.setFontSize(50);
        labelTTF.enableStroke(cc.color.YELLOW, 3);
        // labelTTF.enableShadow(cc.color.WHITE, 15, 15, 15);
        this.label = labelTTF;

        var labelBMFont = new cc.LabelBMFont("开心消消乐",res.LabelBitmap_fnt);
        labelBMFont.x = size.width*0.5;
        labelBMFont.y = size.height*0.5;
        this.addChild(labelBMFont);

        // var labelBMFont2 = new cc.LabelBMFont("Hello World!",res.LabelBitmap2_fnt);
        // labelBMFont2.x = size.width*0.5;
        // labelBMFont2.y = size.height*0.15;
        // this.addChild(labelBMFont2);

        this.schedule(this.myTimer, 0.1, cc.REPEAT_FOREVER, 0);
        return true;
    },
    myTimer: function (dt) {

        this.second+=10*dt*this.pn;
        this.label.setString("玩家："+parseInt(this.second));

    }

});

var HelloWorldScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});

