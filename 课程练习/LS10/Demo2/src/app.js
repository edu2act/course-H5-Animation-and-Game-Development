
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



        //间隔动作(ActionInterval)练习一 移动、跳跃、旋转
        this.sprites[0].runAction(cc.moveBy(10.0,200,0));
        // this.sprites[0].runAction(cc.moveBy(10.0,cc.p(200,0)));
        // this.sprites[0].runAction(cc.moveTo(10.0,200,0));
        // this.sprites[0].runAction(cc.moveTo(10.0,cc.p(200,0)));

        // var moveAction = new cc.MoveBy(10.0,100,0);
        // moveAction.tag = 100;
        // this.sprites[0].runAction(moveAction);

        this.sprites[1].runAction(cc.jumpBy(10.0,100,0,100,2));
        // this.sprites[1].runAction(cc.jumpBy(10.0,cc.p(100,0),100,2));
        // this.sprites[1].runAction(cc.jumpTo(10.0,100,100,100,2));
        // this.sprites[1].runAction(cc.jumpTo(10.0,cc.p(100,100),100,2));

        this.sprites[2].runAction(cc.rotateBy(10.0,90,0));
        // this.sprites[2].runAction(cc.rotateBy(10.0,0,90));
        // this.sprites[2].runAction(cc.rotateTo(10.0,90,0));

        //使用节点的 暂停 继续 停止 等方法来控制节点动作
        var node_1_MenuItem,node_2_MenuItem;
        var isPaused = false;
        node_1_MenuItem = new cc.MenuItemFont("Node1",function () {
            if(!isPaused){
                this.sprites[0].pause();
                isPaused=!isPaused;
                cc.log("pause sprites[0]");
            }else{
                this.sprites[0].resume();
                isPaused=!isPaused;
                cc.log("resume sprites[0]");
            }
        },this);
        node_2_MenuItem = new cc.MenuItemFont("Node2",function () {
            // this.sprites[1].stopAction();//需要传对应的action对象
            // this.sprites[1].stopActinByTag(tag);
            this.sprites[1].stopAllActions();
        },this);

        var menu = new cc.Menu(node_1_MenuItem,node_2_MenuItem);
        menu.y = size.height*0.5;
        menu.alignItemsHorizontallyWithPadding(50);
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

