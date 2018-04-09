var HelloWorldLayer = cc.Layer.extend({
    sprite: null,
    ctor: function () {
        this._super();
        var size = cc.winSize;
/*
        //系统自带粒子效果
        //var particle = new cc.ParticleFire();
        var particle = new cc.ParticleExplosion();
        //var particle = new cc.ParticleFireworks();
        //var particle = new cc.ParticleFlower();
        //var particle = new cc.ParticleGalaxy();
        //var particle = new cc.ParticleMeteor();
        //var particle = new cc.ParticleRain();
        //var particle = new cc.ParticleSmoke();
        //var particle = new cc.ParticleSnow();
        //var particle = new cc.ParticleSpiral();
        //var particle = new cc.ParticleSun();
        particle.texture = cc.textureCache.addImage(res.Fire_png);
        particle.x = size.width / 2;
        particle.y = size.height / 2;
        this.addChild(particle);
*/

        //自定义粒子效果
        var customParticle = new cc.ParticleSystem(res.Untitled_plist);
        customParticle.x = size.width / 2;
        customParticle.y = size.height / 2;
        this.addChild(customParticle);

        customParticle.setTotalParticles(500);
        customParticle.setStartSize(20);
        customParticle.setStartSizeVar(5);
        customParticle.setEndSize(20);
        customParticle.setEndSizeVar(5);

        return true;
    }
});

var HelloWorldScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});

