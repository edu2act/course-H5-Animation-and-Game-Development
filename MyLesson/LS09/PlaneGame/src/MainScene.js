var MainLayer = cc.Layer.extend({
    arr:[],
    plane:null,
    scoreLabel:null,
    score:0,
    enemy:null,
    speed:4,
    ctor:function () {
        this._super();
        var size = cc.winSize;
/*
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
*/
        for(var i=0;i<2;i++){
            var bg = new cc.Sprite(res.bg1_jpg);
            bg.x = cc.winSize.width / 2;
            bg.y = cc.winSize.height / 2+i*(bg.getBoundingBox().height);
            this.addChild(bg);
            this.arr[i] = bg;
        }
        //我方飞机
        var p1 = new cc.Sprite(res.p1_png);
        p1.x = cc.winSize.width / 2;
        p1.y = cc.winSize.height / 3;
        this.addChild(p1);
        this.plane = p1;

        //控制按钮
        var leftItem = new cc.MenuItemFont("左移", function () {
            if (p1.x > 100) {
                p1.x -= 50;
            }
        }, this);
        var rightItem = new cc.MenuItemFont("右移", function () {
            if (p1.x < size.width - 100) {
                p1.x += 50;
            }
        }, this);
        leftItem.setFontSize(120);
        leftItem.setColor(cc.color.ORANGE);
        rightItem.setFontSize(120);
        rightItem.setColor(cc.color.ORANGE);

        var menu = new cc.Menu(leftItem, rightItem);
        menu.y = size.height / 10;
        menu.alignItemsHorizontallyWithPadding(200);
        this.addChild(menu);

        //添加随机敌人
        var enemy = new cc.Sprite(res.p2_png);
        enemy.setRotation(180);
        enemy.x = cc.winSize.width / 2;
        enemy.y = cc.winSize.height;
        this.addChild(enemy);
        this.enemy = enemy;

        this.schedule(this.bgCallBack,0.01);
        this.schedule(this.enemyCallBack,0.01);
        return true;
    },
    bgCallBack:function(dt){
        for(var i in this.arr){
            if (this.arr[i].y < -720) {
                this.arr[i].y += 2 * 1440;
            }
            this.arr[i].y -= 2;
        }
    },
    enemyCallBack: function (dt) {
        if (this.enemy.y < 0) {
            this.enemy.y = cc.winSize.height;
            this.enemy.x = cc.winSize.width * cc.random0To1();
            this.speed += 2;
        } else {
            this.enemy.y -= this.speed;
            //碰撞检测
            if(cc.rectContainsPoint(this.plane.getBoundingBox(),this.enemy.getPosition())){
                cc.log("碰到了");

                //cc.director.runScene(new OverScene());
            }
        }
    }
});
var MainScene = cc.Scene.extend({
    ctor:function () {
        this._super();
        var layer = new MainLayer();
        this.addChild(layer);
    }
});