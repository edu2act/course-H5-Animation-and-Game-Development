var MainLayer = cc.Layer.extend({
    runner:[],
    block:[],
    scoreLabel:null,
    score:0,
    ctor:function () {
        this._super();
        
        this.addChild(new cc.LayerColor(cc.color.WHITE));

        this.addSprites();
        this.addBlocks();
        this.addMenuBtn();
        this.addScore();
        this.schedule(this.collidDetect,0.01); //碰撞检测
        return true;
    },
    collidDetect:function(){
        this.score += 1;
        this.scoreLabel.setString(this.score+"米");

        for(var i=0;i<PlayerCount;i++){
            if(this.block[i].x<0){
                this.block[i].x = cc.winSize.width*(1+Math.random());
            }else{
                this.block[i].x -= 5;
            }

            //
            if(cc.rectContainsPoint(this.block[i].getBoundingBox(),this.runner[i].getPosition())){
                //cc.log("碰到了");
                var ls = cc.sys.localStorage;
                ls.setItem("currentScore",this.score);
                if(this.score > ls.getItem("bestScore")){
                    ls.setItem("bestScore",this.score);
                }
                cc.director.runScene(new FinishScene());
            }
        }
    },
    addScore:function(){
        //分数标签
        var scoreLabel = new cc.LabelTTF("0米","",cc.winSize.width/10);
        scoreLabel.x = cc.winSize.width/2;
        scoreLabel.y = cc.winSize.height - 100;
        scoreLabel.setColor(cc.color.BLACK);
        this.addChild(scoreLabel,1);
        this.scoreLabel = scoreLabel;
    },
    addSprites:function(){
        var animation = new cc.Animation();
        for (var i = 1; i < 7; i++) {
           var frameName = "res/Animation3/pao_" + i + ".png";
           animation.addSpriteFrameWithFile(frameName);
        }
        animation.setDelayPerUnit(1 / 15);
        animation.setRestoreOriginalFrame(true);
        var animateAction = cc.animate(animation);

        var runActions = [];
        runActions[0] = animateAction.repeatForever();
        runActions[1] = runActions[0].clone();
        //创建精灵数组及运行动画
        for(var i=0;i<PlayerCount;i++){
            this.runner[i] = new cc.Sprite("res/Animation3/pao_"+1+".png");
            this.runner[i].x = cc.winSize.width*0.2;
            this.runner[i].y = cc.winSize.height*(0.3*i+0.3);
            this.runner[i].runAction(runActions[i]);
            this.addChild(this.runner[i]);
        }
    },
    addBlocks:function () {
        for(var i=0;i<PlayerCount;i++){
            this.block[i] = new cc.Sprite("res/HelloWorld.png");
            this.block[i].x = cc.winSize.width*0.8;
            this.block[i].y = cc.winSize.height*(0.3*i+0.3);
            this.block[i].scale = 0.2;
            this.addChild(this.block[i]);
        }
    },
    addMenuBtn:function () {
        var that = this;
        //控制按钮
        var leftItem = new cc.MenuItemFont("P1_Jump", function () {
            that.runner[0].runAction(cc.jumpBy(1.0,0,0,150,1));
        }, this);
        var rightItem = new cc.MenuItemFont("P2_Jump", function () {
            that.runner[1].runAction(cc.jumpBy(1.0,0,0,150,1));
        }, this);
        leftItem.setFontSize(60);
        leftItem.setColor(cc.color.ORANGE);
        rightItem.setFontSize(60);
        rightItem.setColor(cc.color.ORANGE);

        if(PlayerCount==1){
            var menu = new cc.Menu(leftItem);
        }else{
            var menu = new cc.Menu(leftItem, rightItem);
        }
        menu.y = cc.winSize.height / 10;
        menu.alignItemsHorizontallyWithPadding(50);
        this.addChild(menu);
    }
});

var MainScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new MainLayer();
        this.addChild(layer);
    }
});