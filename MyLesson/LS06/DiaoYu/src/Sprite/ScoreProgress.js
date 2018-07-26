var ScoreProgress = cc.ProgressTimer.extend({
    _pre:null,
    _reper:null,
    _reduce:false,
    _addPrecent:true,
    _star:null,
    ctor:function(spriteName,fileName){
        this._super(spriteName);

        var progressBg = new cc.Sprite(fileName);
        progressBg.setPosition(this.getBoundingBox().width/2,this.getBoundingBox().height/2);
        this.addChild(progressBg,-1);

        this.setType(cc.ProgressTimer.TYPE_BAR);
        this.setBarChangeRate(cc.p(1, 0));
        this.setMidpoint(cc.p(0, 0));
        this.setPercentage(0);
    },
    addPercent:function(score){
        this._pre = this.getPercentage();
        if(this._pre<100){
            this.setPercentage(this._pre+=score/60);
            if (this._pre>=100){
                var ls = cc.sys.localStorage;
                if(ls.getItem("isEffect") == "YES"){
                    cc.audioEngine.playEffect(res.super_fever_wav);
                };
                 this.setPercentage(100);
            }
        }
    },
    reduce:function(){
            this._reper = this.getPercentage();
            this.schedule(this.test, 0.01)

    },

    test:function () {
    this.setPercentage(this._reper -= 0.2);
        if(this.getPercentage() == 0){
            this.unschedule(this.test);
        }
    },

    reducePercent:function(value){
        var pre = this.getPercentage();
        this.setPercentage(pre -= value/20);
    }

});