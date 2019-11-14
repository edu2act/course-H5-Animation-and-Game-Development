var FinishLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        this._super();
        var size = cc.winSize;
        // this.addChild(new cc.LayerColor(cc.color.WHITE));
        
        var replayLabel = new cc.LabelTTF("重  玩");
        replayLabel.setFontSize(size.width / 12);
        //replayLabel.setFontFillColor(cc.color.YELLOW);
        replayLabel.setFontFillColor(cc.color.ORANGE);
        replayLabel.enableStroke(cc.color.YELLOW, 5);

        var replayItem = new cc.MenuItemLabel(replayLabel, function () {
            cc.director.runScene(new MainScene());
        }, this);

        var homeLabel = new cc.LabelTTF("主  页");
        homeLabel.setFontSize(size.width / 12);
        homeLabel.setFontFillColor(cc.color.ORANGE);
        homeLabel.enableStroke(cc.color.YELLOW, 5);
        var homeItem = new cc.MenuItemLabel(homeLabel, function () {
            cc.director.runScene(new StartScene());
        }, this);

        var menu = new cc.Menu(replayItem,homeItem);
        menu.y = size.height/5;
        menu.alignItemsHorizontallyWithPadding(50);
        this.addChild(menu);

        //logo
        var logo;
        if(PlayerCount == 1){
            logo = new cc.LabelTTF("简单模式");
        }else{
            logo = new cc.LabelTTF("正常模式");
        }
        logo.setFontSize(size.width / 8);
        logo.enableStroke(cc.color.RED, 5);
        logo.x = size.width / 2;
        logo.y = size.height * 0.8;
        this.addChild(logo);

        var ls = cc.sys.localStorage;
        var currentScore = ls.getItem("currentScore");
        var bestScore = ls.getItem("bestScore");

        //本次成绩
        var currentScore = new cc.LabelTTF("本次成绩："+currentScore+"米");
        currentScore.x = size.width / 2;
        currentScore.y = size.height * 0.55;
        currentScore.setFontSize(size.width/12);
        this.addChild(currentScore);
        this.currentScore = currentScore;

        //最好成绩
        var bestScore = new cc.LabelTTF("历史最佳："+bestScore+"米");
        bestScore.x = size.width / 2;
        bestScore.y = size.height * 0.45;
        bestScore.setFontSize(size.width/12);
        this.addChild(bestScore);
        this.bestScore = bestScore;

        return true;
    }
});

var FinishScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new FinishLayer();
        this.addChild(layer);
    }
});