var Shark = cc.Sprite.extend({
    shark: true,
    _reduce: 500,
    _isDie: false,
    ctor: function (fileName) {
        this._super(fileName);
        var size = cc.winSize;
    },

    sharkDie: function (fish) {

        this._isDie = true;
        var animation = new cc.Animation();
        for (var i = 1; i <= 2; i++) {
            var frameName = res[fish + i + "_png"];
            animation.addSpriteFrameWithFile(frameName);
        }
        animation.setDelayPerUnit(0.2);
        animation.setRestoreOriginalFrame(false);
        var action = cc.animate(animation);
        this.runAction(cc.sequence(cc.repeat(action,1),cc.callFunc(function(){
            this._isDie = false;
        },this)))
    },

    Die:function(){
        this._isDie = true;
        var animation = new cc.Animation();
        for (var i = 2; i <= 3; i++) {
            var frameName = res["octopusDie" + i + "_png"];
            animation.addSpriteFrameWithFile(frameName);
        }
        animation.setDelayPerUnit(0.2);
        animation.setRestoreOriginalFrame(false);
        var action = cc.animate(animation);
        this.runAction(action);

        var move1 = cc.moveBy(0.05,cc.p(20,0));
        var move2 = cc.moveBy(0.1,cc.p(-40,0));
        this.getParent().runAction(cc.sequence(move1,move2,move1,move1,move2,move1,cc.callFunc(function(){
            this._isDie = false;
        },this)));
    },

    fishSwimmingR: function (fishClass, dx) {
        var animation = new cc.Animation();
        for (var i = 1; i <= 2; i++) {
            var frameName = res[fishClass + i + "_png"];
            animation.addSpriteFrameWithFile(frameName);
        }
        animation.setDelayPerUnit(0.3);
        animation.setRestoreOriginalFrame(true);
        var action = cc.animate(animation).repeatForever();
        this.runAction(action);

        this.schedule(function () {
            if (this._isDie == false) {
                this.x += dx;
            }
            if (this.x > cc.winSize.width * 1.3) {
                cc.pool.putInPool(this);
            }
        }, 0.01);

    },

    fishSwimmingL: function (fishClass, dx) {
        var animation = new cc.Animation();
        for (var i = 1; i <= 2; i++) {
            var frameName = res[fishClass + i + "_png"];
            animation.addSpriteFrameWithFile(frameName);
        }
        animation.setDelayPerUnit(0.3);
        animation.setRestoreOriginalFrame(true);
        var action = cc.animate(animation).repeatForever();
        this.runAction(action);

        this.schedule(function () {
            if (this._isDie == false) {
                this.x -= dx;
            }
            if (this.x < -100) {
                cc.pool.putInPool(this);
            }
        }, 0.01);

    },


    unuse: function () {
        this.retain();
        this.setVisible(false);
        this.removeFromParent();
    },

    reuse: function (fileName) {
        this.setTexture(fileName);
        this.setVisible(true);
    }

});
Shark.create = function (fileName) {
    if (cc.pool.hasObject(Shark)) {
        return cc.pool.getFromPool(Shark, fileName);
    } else {
        var fish = new Shark(fileName);
        return fish;
    }
}