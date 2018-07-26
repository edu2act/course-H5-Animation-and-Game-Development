var Fish = cc.Sprite.extend({
    fish:true,
    _fishValue : null,
    _starMove:true,
    ctor:function(fileName,value){
        this._super(fileName);

        this._fishValue = value;
    },

    fishSwimmingR : function(fishClass,dx){
        var animation = new cc.Animation();
        for (var i = 1; i <= 2; i++) {
            var frameName = res[fishClass + i + "_png"];
            animation.addSpriteFrameWithFile(frameName);
        }
        animation.setDelayPerUnit(0.3);
        animation.setRestoreOriginalFrame(true);
        var action = cc.animate(animation).repeatForever();
        this.runAction(action);
        this.schedule(function (){
            this.x += dx;
            if(this.x > cc.winSize.width*1.3 ) {
                cc.pool.putInPool(this);
            }
        },0.01);
    },

    fishSwimmingL : function(fishClass,dx){
        var animation = new cc.Animation();
        for (var i = 1; i <= 2; i++) {
            var frameName = res[fishClass + i + "_png"];
            animation.addSpriteFrameWithFile(frameName);
        }
        animation.setDelayPerUnit(0.3);
        animation.setRestoreOriginalFrame(true);
        var action = cc.animate(animation).repeatForever();
        this.runAction(action);
        this.schedule(function (){
            this.x -= dx;
            if(this.x < -100 ) {
                cc.pool.putInPool(this);
            }
        },0.01);
    },

    starMoveL: function(star,dx){
        var animation = new cc.Animation();
        for (var i = 1; i <= 3; i++) {
            var frameName = res[star + i + "_png"];
            animation.addSpriteFrameWithFile(frameName);
        }
        animation.setDelayPerUnit(0.3);
        animation.setRestoreOriginalFrame(true);
        var action = cc.animate(animation).repeatForever();
        this.runAction(action);
        this.schedule(function (){
            if(this._starMove == true) {
                this.x -= dx;
            }
        },0.01);
    },

    starMoveR: function(star,dx){
        var animation = new cc.Animation();
        for (var i = 1; i <= 3; i++) {
            var frameName = res[star + i + "_png"];
            animation.addSpriteFrameWithFile(frameName);
        }
        animation.setDelayPerUnit(0.3);
        animation.setRestoreOriginalFrame(true);
        var action = cc.animate(animation).repeatForever();
        this.runAction(action);
        this.schedule(function (){
            if(this._starMove == true) {
                this.x += dx;
            }
        },0.01);
    },

    starDie:function(){
        this._starMove = false;
        var animation = new cc.Animation();
        for (var i = 1; i <= 4; i++) {
            var frameName = res["starDie" + i + "_png"];
            animation.addSpriteFrameWithFile(frameName);
        }
        animation.setDelayPerUnit(0.1);
        animation.setRestoreOriginalFrame(false);
        var action = cc.animate(animation);
        this.runAction(cc.sequence(action,cc.callFunc(function(){
            this.getParent().removeChild(this);
        },this)));
    },


    unuse: function(){
        this.retain();
        this.setVisible(false);
        this.removeFromParent();
    },

    reuse: function(fileName,value){
        this.setTexture(fileName);
        this._fishValue = value;
        this.setVisible(true);
    }

});
Fish.create = function (fileName,value) {
    if(cc.pool.hasObject(Fish)){
        return cc.pool.getFromPool(Fish,fileName,value);
    }else{
        var fish = new Fish(fileName,value);
        return fish;
    }
}