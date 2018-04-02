
var HelloWorldLayer = cc.Layer.extend({
    sprites:[],
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();
        var size = cc.winSize;
        this.addChild(new cc.LayerColor(cc.color.GRAY));
        
        //创建精灵数组
        for(var i=0;i<3;i++){
            this.sprites[i] = new cc.Sprite("res/sprite"+(i+1)+".png");
            this.sprites[i].x = size.width*0.2;
            this.sprites[i].y = size.height*(0.3*i+0.2);
            this.addChild(this.sprites[i]);
        }
        //即时动作(ActionInstant)和间隔动作(ActionInterval)
        // 这两类动作都继承于有限时间动作类(FiniteTimeAction)。

        //即时动作(ActionInstant)练习
        this.sprites[0].runAction(cc.place(this.sprites[0].x+50,this.sprites[0].y));

        this.sprites[1].runAction(cc.flipX(true));
        this.sprites[1].runAction(cc.flipY(true));

        this.sprites[2].runAction(cc.hide());
        //this.sprites[2].runAction(cc.show());

        this.sprites[2].runAction(cc.callFunc(function(){
            this.sprites[2].runAction(cc.show());
        },this));

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

