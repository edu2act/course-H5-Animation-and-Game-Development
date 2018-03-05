
var HelloWorldLayer = cc.Layer.extend({
    sprite:null,
    ttfLabel:null,
    ctor:function () {
        this._super();

        var size = cc.winSize;

        var ttfLabel = new cc.LabelTTF("这是LabelTTF","",50);
        //var ttfLabel = new cc.LabelTTF("LabelTTF","ComicAndy",50);
        ttfLabel.x = size.width/2;
        ttfLabel.y = size.height/2;

        ttfLabel.setFontFillColor(cc.color.RED);
        ttfLabel.setFontSize(100);
        ttfLabel.enableStroke(cc.color.YELLOW,5);
        ttfLabel.enableShadow(cc.color.WHITE,15,15,15);

        //this.addChild(ttfLabel);

        this.ttfLabel = ttfLabel;
        //this.scheduleUpdate();

        //BMFont标签(位图字体标签)
        var labelBMFont = new cc.LabelBMFont("中华人民共和国",res.LabelBitmap_fnt);
        //参数说明
        //var labelBMFont = new cc.LabelBMFont("中华人民共和国",res.LabelBitmap_fnt,200,cc.TEXT_ALIGNMENT_RIGHT,cc.p(0,0));
        labelBMFont.x = size.width*0.5;
        labelBMFont.y = size.height*0.3;
        this.addChild(labelBMFont);

        var labelBMFont2 = new cc.LabelBMFont("Hello World!",res.LabelBitmap2_fnt);
        labelBMFont2.x = size.width*0.5;
        labelBMFont2.y = size.height*0.15;
        this.addChild(labelBMFont2);

/*
        //var labelAtlas = new cc.LabelAtlas("23",res.LabelAtlas_plist);
        //var labelAtlas = new cc.LabelAtlas("23",res.LabelAtlas_png,96,128,' ');
        var labelAtlas = new cc.LabelAtlas("56",res.LabelAtlas2_png,48,64,' ');

        //labelAtlas.setAnchorPoint(cc.p(0.5,0.5));
        labelAtlas.x = size.width*0.5;
        labelAtlas.y = size.height*0.45;
        labelAtlas.setScale(0.5);
        this.addChild(labelAtlas);
*/
        return true;
    },
    update:function(){
        if(this.ttfLabel.fontSize > 120){
            this.ttfLabel.fontSize = 100;
        }else{
            this.ttfLabel.fontSize += 1;
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

