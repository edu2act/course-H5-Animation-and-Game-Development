
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


        //组合动画
        var action1 = cc.moveBy(2.0,100,0);
        var action2 = cc.rotateBy(2.0,90);
        //1.顺序执行
        //this.sprites[0].runAction(cc.sequence(action1,action2));
        this.sprites[0].runAction(cc.sequence(action1,cc.callFunc(function(){
            cc.log("action1 执行完毕");
        },this)));
        //2.同步执行 注意不要用spawn和callFunc组合
        var action3 = cc.moveBy(2.0,200,0);
        var action4 = cc.rotateBy(2.0,-90);
        this.sprites[1].runAction(cc.spawn(action3,action4));
        //3.重复执行
        var action5 = cc.rotateBy(1.0,-90);
        //this.sprites[2].runAction(cc.repeat(action5,5));
        this.sprites[2].runAction(cc.repeatForever(action5));
        //4.延迟执行
        this.sprites[0].runAction(cc.sequence(cc.delayTime(5.0),cc.rotateBy(5.0,180),cc.callFunc(function(){
            cc.log("action1 执行完毕");
        },this)));
        //5.反向执行
        var action6 = cc.moveBy(2.0,200,0);
        var action7 = action6.reverse();
        this.sprites[2].runAction(cc.sequence(action6,action7));

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

