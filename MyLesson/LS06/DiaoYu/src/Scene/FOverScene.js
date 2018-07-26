var FOverLayer = cc.Layer.extend({
    sprite:null,
    _scoreboard:null,
    _thisScore:null,
    _scoreNamber:0,
    ctor:function () {
        this._super();
        var size = cc.winSize;

        //添加背景
        this.bg();

        //添加光
        this.guang();

        //添加记分牌
        this.scoreboard();

        //添加最高成绩
        this.bestscore();

        //添加本次成绩
        this.score();

        //添加重玩按钮
        this.restart();

        //添加主页按钮
        this.mainmenu();

        //分数
        this.lsscore();

        return true;
    },
    bg: function () {
        var bg = new cc.Sprite(res.end_bg_png);
        bg.x = cc.winSize.width/2;
        bg.y = cc.winSize.height/2;
        this.addChild(bg);
    },
    guang: function () {
        var guang = new cc.Sprite(res.guang_png);
        guang.x = cc.winSize.width/2;
        guang.y = cc.winSize.height*0.62;
        this.addChild(guang);
        guang.runAction(cc.rotateBy(4,360)).repeatForever();
    },
    scoreboard: function () {
        var scoreBoard = new cc.Sprite(res.end2_png);
        scoreBoard.x = cc.winSize.width/2;
        scoreBoard.y = cc.winSize.height*0.665;
        this._scoreboard = scoreBoard;
        this.addChild(scoreBoard);
    },
    bestscore: function () {
        var bestScore = new cc.Sprite(res.best_score_png);
        bestScore.x = this._scoreboard.width*0.5;
        bestScore.y = this._scoreboard.height*0.235;
        this._scoreboard.addChild(bestScore);
    },
    score: function () {
        var score = new cc.Sprite(res.this_score_png);
        score.x = this._scoreboard.width/2;
        score.y = this._scoreboard.height*0.63;
        this._scoreboard.addChild(score);
    },
    restart: function () {
        var restartMenuItem = new cc.MenuItemImage(res.restart_normal2_png,res.restart_selected2_png, function () {
            var ls = cc.sys.localStorage;
            if(ls.getItem("isEffect") == "YES"){
                cc.audioEngine.playEffect(res.kaishianniu_wav);
            };
            cc.director.runScene(new FMainScene());
        },this);
        var menu = new cc.Menu(restartMenuItem);
        menu.x = cc.winSize.width/2;
        menu.y = cc.winSize.height*0.22;
        this.addChild(menu);
    },
    mainmenu: function () {
        var mainMenuItem = new cc.MenuItemImage(res.mainmenu_normal2_png,res.mainmenu_selected2_png, function () {
            var ls = cc.sys.localStorage;
            if(ls.getItem("isEffect") == "YES"){
                cc.audioEngine.playEffect(res.kaishianniu_wav);
            };
            cc.director.runScene(new FStartScene());
        },this);
        var menu = new cc.Menu(mainMenuItem);
        menu.x = cc.winSize.width/2;
        menu.y = cc.winSize.height*0.08;
        this.addChild(menu);
    },
    lsscore:function(){
        var ls = cc.sys.localStorage;
        var thisScore = ls.getItem("thisScore");
        var bestScore = ls.getItem("bestScore");
        this._thisScore = thisScore;

        var thisLabel = new cc.LabelTTF(thisScore,"",140);
        thisLabel.setPosition(cc.p(this._scoreboard.width/2,this._scoreboard.height*0.47));
        thisLabel.enableStroke(cc.color(3,211,255),3);
        thisLabel.setColor(cc.color.WHITE);
        this._scoreboard.addChild(thisLabel);

        var bestLabel = new cc.LabelTTF(bestScore,"",100);
        bestLabel.setPosition(cc.p(this._scoreboard.width/2,this._scoreboard.height*0.12));
        bestLabel.enableStroke(cc.color(3,211,255),3);
        bestLabel.setColor(cc.color.WHITE);
        this._scoreboard.addChild(bestLabel);

        this.schedule(function () {
            if (this._scoreNamber < thisScore) {
                this._scoreNamber += 100;
                thisLabel.setString(this._scoreNamber);
            }
        }, 0.01)
    },
});

var FOverScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new FOverLayer();
        this.addChild(layer);
        var ls = cc.sys.localStorage;
        if(ls.getItem("isEffect") == "YES"){
            cc.audioEngine.playEffect(res.defen_wav);
        };
    }
});