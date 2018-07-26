/**
 * Created by qile on 15-11-12.
 */
var Plane = cc.Sprite.extend({
    ctor: function (fileName) {
        this._super(fileName);
        this.schedule(this.shoot,0.1);
    },
    shoot:function(){
        //3个参数，纹理，速度，起始位置
        //var bullet = Bullet.create(res.CloseNormal_png,cc.p(0,1280),this.getPosition());
        var bullet = Bullet.create(res.CloseNormal_png,cc.p(cc.randomMinus1To1()*640,1280),this.getPosition());
        this.addChild(bullet,-1);
    }
});