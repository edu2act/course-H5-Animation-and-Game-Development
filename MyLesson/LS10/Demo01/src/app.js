var HelloWorldLayer = cc.Layer.extend({
    sprites:[],
    ctor:function () {
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
/*
        //sequence 动作组合
        var mAction = cc.moveBy(5,200,0);
        var rAction = cc.rotateBy(5,90);
        var dAction = cc.delayTime(2);
        var scaleAction = cc.scaleTo(5,0.5);
        var cAction = cc.callFunc(function () {
            this.sprites[0].runAction(cc.scaleTo(5,1.0));
        },this);
        // var sAction = cc.sequence(mAction,rAction,scaleAction);
        var sAction = cc.sequence(mAction,dAction,scaleAction,cAction);
        this.sprites[0].runAction(sAction);
*/
/*
    //spawn组合动作
        var mAction = cc.moveBy(20,200,0);
        var rAction = cc.rotateBy(20,90);
        var cAction = cc.callFunc(function () {
            cc.log("xx");
        },this);
        //注意不要用spawn和callFunc组合
        var sAction = cc.spawn(mAction,rAction);
        // var sAction = cc.spawn(mAction,rAction,cAction);
        this.sprites[1].runAction(sAction);
*/
/*
//repeat 动作组合
        var rAction = cc.rotateBy(0.5,90);
        // this.sprites[2].runAction(rAction);
        // this.sprites[2].runAction(cc.repeat(rAction,5));
        // this.sprites[2].runAction(cc.repeatForever(rAction));
        // this.sprites[2].runAction(rAction.repeat(4));
        this.sprites[2].runAction(rAction.repeatForever());
*/

//reverse 动作组合
        var jAction = cc.jumpBy(5,300,0,100,3);
        this.sprites[1].runAction(cc.sequence(jAction,jAction.reverse()));

        var rAction = cc.rotateBy(5,90);
        this.sprites[2].runAction(cc.sequence(rAction,rAction.reverse()));



/*
        //即时动作
        var action1 = new cc.Place(400,size.height*0.2);
        this.sprites[0].runAction(action1);

        this.sprites[1].runAction(cc.flipX(true));
        this.sprites[1].runAction(cc.flipY(true));

        this.sprites[2].runAction(cc.hide());
        //this.sprites[2].runAction(cc.show());

        this.sprites[2].runAction(cc.callFunc(function(){
            this.sprites[2].runAction(cc.show());
            cc.log("callFunc调用");
        },this));
*/
/*
        //间隔动作 一
        //var action1 = cc.moveBy(5,200,0);
        // this.sprites[0].runAction(action1);
        // this.sprites[0].runAction(cc.jumpTo(10, cc.p(400, 400), 50, 2));
        // this.sprites[1].runAction(cc.moveTo(10,400,400));
        // this.sprites[2].runAction(cc.jumpBy(10, cc.p(300, 0), 50, 4));

        this.sprites[0].runAction(cc.moveBy(10.0,200,0));
        // this.sprites[0].runAction(cc.moveBy(10.0,cc.p(200,0)));
        // this.sprites[0].runAction(cc.moveTo(10.0,200,0));
        // this.sprites[0].runAction(cc.moveTo(10.0,cc.p(200,0)));

        // var moveAction = new cc.MoveBy(10.0,100,0);
        // moveAction.tag = 100;
        // this.sprites[0].runAction(moveAction);

        var jumpAct = cc.jumpBy(10.0,100,0,100,2);
        this.sprites[1].runAction(jumpAct);
        // this.sprites[1].runAction(cc.jumpBy(10.0,cc.p(100,0),100,2));
        // this.sprites[1].runAction(cc.jumpTo(10.0,100,100,100,2));
        // this.sprites[1].runAction(cc.jumpTo(10.0,cc.p(100,100),100,2));

        this.sprites[2].runAction(cc.rotateBy(10.0,90,0));
        // this.sprites[2].runAction(cc.rotateBy(10.0,0,90));
        // this.sprites[2].runAction(cc.rotateTo(10.0,90,0));

        //使用节点的 暂停 继续 停止 等方法来控制节点动作
        var c_1_MenuItem,c_2_MenuItem;
        var isPaused = false;
        c_1_MenuItem = new cc.MenuItemFont("Node1",function () {
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
        c_2_MenuItem = new cc.MenuItemFont("Node2",function () {
             this.sprites[1].stopAction(jumpAct);//需要传对应的action对象
            //this.sprites[1].stopAllActions();
        },this);

        var menu = new cc.Menu(c_1_MenuItem,c_2_MenuItem);
        menu.y = size.height*0.5;
        menu.alignItemsHorizontallyWithPadding(50);
        this.addChild(menu);
*/
/*
        //间隔动作(ActionInterval)练习二 缩放 淡入淡出
        //this.sprites[0].runAction(cc.scaleBy(5.0,0.5));
        //this.sprites[0].runAction(cc.scaleBy(5.0,0.8,0.5));
        // this.sprites[0].runAction(cc.scaleTo(5.0,5));
        //
        // this.sprites[1].runAction(cc.fadeOut(5.0));
        // this.sprites[2].setOpacity(0);
        // this.sprites[2].runAction(cc.fadeIn(5.0));
        */
/*
        this.sprites[1].runAction(cc.speed(cc.moveBy(20,300,0),5));//5倍速

        var tempAct = cc.moveBy(5.0,200,0);
        // var tempEaseAction = tempAct.easing(cc.easeElasticInOut());
        var tempEaseAction = tempAct.easing(cc.easeExponentialIn());
        this.sprites[2].runAction(tempEaseAction);
*/
/*
        var timer = new cc.ProgressTimer(this.sprites[1]);
        timer.x = this.sprites[1].x+100;
        timer.y = this.sprites[1].y;
        this.addChild(timer);

        // timer.type = cc.ProgressTimer.TYPE_RADIAL;
        timer.type = cc.ProgressTimer.TYPE_BAR;
        timer.midPoint = cc.p(0,0);//控制变化起始点
        timer.barChangeRate = cc.p(0, 1);//控制x和y方向的变化率
        // timer.runAction(cc.progressFromTo(5.0,0,90));
        timer.runAction(cc.progressTo(20.0,100));
        */
/*
        var directorPauseItem,directorResumeItem;
        directorPauseItem = new cc.MenuItemFont("pause",function () {
            cc.director.pause();
        },this);
        directorResumeItem = new cc.MenuItemFont("resume",function () {
            cc.director.resume();
        },this);

        var menu = new cc.Menu(directorPauseItem,directorResumeItem);
        menu.y = size.height*0.5;
        menu.alignItemsHorizontallyWithPadding(50);
        this.addChild(menu);
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

