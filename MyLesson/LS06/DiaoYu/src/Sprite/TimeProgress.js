var Progress = cc.ProgressTimer.extend({
    _dt:null,
    _label:null,
    _dt2:null,
    _playEffect:false,
    ctor:function(spriteName,fileName) {
        this._super(spriteName);
        var bgSprite = new cc.Sprite(fileName);
        bgSprite.setPosition(this.getBoundingBox().width / 2, this.getBoundingBox().height / 2);
        this.addChild(bgSprite,-1);

        this.setType(cc.ProgressTimer.TYPE_BAR);
        this.setBarChangeRate(cc.p(1, 0));
        this.setMidpoint(cc.p(0, 0));
        this.setPercentage(100);

        this._dt = 45;
        this._dt2 = 0.01;

        this.schedule(this.timePro,0.01);
        
        this._label = new cc.LabelTTF("45","",50);
        this._label.setColor(cc.color.WHITE);
        this._label.enableStroke(cc.color.RED,1);
        this._label.setPosition(cc.p(this.getBoundingBox().width/2,this.getBoundingBox().height/2));
        this.addChild(this._label);
    },
    timePro:function(){
        if(this._dt2<=45) {
            //this._dt2 += 0.00001;
            //this._dt2 += 0.001;
        }
        this._dt -= this._dt2;
        if(this._dt>10){
            var m=this._dt.toString().substr(0,2);
            var hm=this._dt.toString().substr(3,2);
            this._label.setString(m+":"+hm);
        }else{
            var m=this._dt.toString().substr(0,1);
            var hm=this._dt.toString().substr(2,2);
            this._label.setString("0"+m+":"+hm);
        }
        if(this._dt>=0){
            this.setPercentage(100*this._dt/45);
            if(this.getPercentage() == 15.049555555557284){
                cc.log("xxx");
                var ls = cc.sys.localStorage;
                if(ls.getItem("isEffect") == "YES"){
                    cc.audioEngine.playEffect(res.daojishi_wav);
                };
            };
        }else if(this._dt <= 0){
            this.unschedule(this.timePro);
            this.getParent().timeOver();
        }
    }
});
