var StarSprite = cc.Sprite.extend({
    ctor: function (fileName, rect, rotated) {
        this._super(fileName, rect, rotated);

        var starAction = this.createRunAction();
        this.runAction(starAction.repeatForever());
    },
    createRunAction: function () {
        var animation = new cc.Animation()
        for (var i = 1; i <= 3; i++) {
            var frameName = res["starblink" + i + "_png"];
            animation.addSpriteFrameWithFile(frameName);
        }
        animation.setDelayPerUnit(1.0/5);
        animation.setRestoreOriginalFrame(true);
        var action = cc.animate(animation);
        return action;
    }
})