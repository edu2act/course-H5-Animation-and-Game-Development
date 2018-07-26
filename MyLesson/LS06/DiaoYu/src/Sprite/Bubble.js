var Bubble = cc.Sprite.extend({

    ctor: function (fileName) {
        this._super(fileName);

        this.setPosition(cc.p(cc.winSize.width*Math.random(),cc.winSize.height*0.05+cc.winSize.height*0.2*Math.random()));
        this.setScale(0);

        var move = cc.moveTo(3,this.x,cc.winSize.height*0.6);
        var scale = cc.scaleTo(3,0.5);
        this.runAction(cc.sequence(cc.spawn(move,scale),cc.fadeTo(0.1,0)));

    },
});