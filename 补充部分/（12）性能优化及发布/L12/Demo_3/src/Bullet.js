/**
 * Created by qile on 15-11-12.
 */
var Bullet = cc.Sprite.extend({
    velocity:null,
    ctor: function (fileName,velocity) {
        this._super(fileName);
        this.velocity = velocity;
        this.setPosition(cc.p(100,30));
        this.scheduleUpdate();
    },
    update:function(dt){
        var size = cc.winSize;
        //设置位置
        this.x += this.velocity.x*0.01;
        this.y += this.velocity.y*0.01;

        if(this.y > size.height){
            cc.pool.putInPool(this);
        }
    },
    unuse:function(){   //unuse 当putInPool时自动调用
        this.retain();
        this.setVisible(false);
        this.unscheduleUpdate();
        this.removeFromParent();
    },
    reuse:function(spriteName,velocity){   //reuse 当getFromPool时自动调用
        this.spriteFrameName = spriteName;
        this.velocity = velocity;
        this.setVisible(true);
        this.setPosition(cc.p(100,30));
        this.scheduleUpdate();
    }
});

//子弹类方法，工厂模式
Bullet.create = function(spriteFrameName,velocity){
    if(cc.pool.hasObject(Bullet)){
        cc.log("池子里有---从Pool里获取");
        return cc.pool.getFromPool(Bullet,spriteFrameName,velocity);
    }else{
        cc.log("池子里没有---重新创建一个");
        var b = new Bullet(spriteFrameName,velocity);
        return b;
    }
};