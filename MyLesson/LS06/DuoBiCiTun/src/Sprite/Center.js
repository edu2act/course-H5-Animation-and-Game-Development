var SPRITE_SCALE=0.7;
var Center = cc.Sprite.extend({
    spriteName: null,
    spriteNum: null,
    gravity: null,
    velocityX: null,
    velocityY: null,
    isUp: null,
    isSolid: null,
    normalNum: null,
    isDownAdd: null,
    ctor: function (fileName, spriteName, select, normalNum) {
        this._super(fileName);
        this.spriteName = spriteName;
        this.spriteNum = spriteName.length;

        this.isSolid = false;
        this.normalNum = normalNum;
        this.isDownAdd = true;

        this.isUp = true;

        this.velocityX = 0;

        if(cc.sys.platform===101){
            this.velocityY = cc.winSize.height*0.031;
            this.gravity = cc.winSize.height*0.015625;
        }else if(cc.sys.platform===3){
            this.velocityY = cc.winSize.height*0.031*0.55;
            this.gravity = cc.winSize.height*0.015625*0.5;
        }
        else{
            this.gravity=cc.winSize.height*0.015625;
            this.velocityY=cc.winSize.height*0.031
        }

        this.schedule(this.decelerate, 0.02);
        this.schedule(this.updateY, 0.02);

        //选择动作
        switch (select % 3) {
            case 0:
                this.recact();
                break;
            case 1:
                this.roundAct1();
                break;
            case 2:
                this.roundAct2();
        }
        return true;
    },

    /*--------------实心圆动作---------------*/
    roundAct1: function () {
        var r=cc.winSize.width*200/720;
        var random = parseInt(Math.random() * 10);
        for (var i in this.spriteName) {
            this.spriteName[i].setPosition(r * Math.cos(2 * Math.PI / 360 * (60 * i)), r * Math.sin(2 * Math.PI / 360 * (60 * i)));
            this.addChild(this.spriteName[i]);
        }
        ;
        this.setOpacity(0);
        this.setCascadeOpacityEnabled(false);
        switch (random % 3 + 1) {
            case 1:
                var sprite = new Animal(res.Tu01_png, 1);
                sprite.scale = SPRITE_SCALE;
                sprite.setPosition(this.getPosition());
                this.addChild(sprite);
                this.isSolid = true;
                //cc.log("this.getParent().normalNum=",this.getParent().proGrade);
                //cc.log("this.getParent().normalNum=",this.getParent().normalNum);
                //this.getParent().normalNum++;
                break;
            case 2:
                var sprite = new Animal(res.Xiong01_png, 2);
                sprite.scale = SPRITE_SCALE;
                sprite.setPosition(this.getPosition());
                this.addChild(sprite);
                this.isSolid = true;
                //this.getParent().normalNum++;
                break;
            case 3:
                var sprite = new Animal(res.Citun01_png, 3);
                sprite.scale = SPRITE_SCALE;
                sprite.setPosition(this.getPosition());
                this.addChild(sprite);
                break;
        }
        //this.act();
        return true;
    },

    /*--------------空心圆动作---------------*/
    roundAct2: function () {
        var r=cc.winSize.width*200/720;
        for (var i in this.spriteName) {
            this.spriteName[i].setPosition(r * Math.cos(2 * Math.PI / 360 * (60 * i)), r * Math.sin(2 * Math.PI / 360 * (60 * i)));
            this.addChild(this.spriteName[i]);
        }
        ;
        //设置父节点透明度为0，子节点不级联
        this.setOpacity(0);
        this.setCascadeOpacityEnabled(false);
        //this.act();
        return true;


    },

    /*--------------直线动作-----------------*/
    recact: function () {
        //this.setPosition(cc.winSize.width*0.5,0);
        for (var i in this.spriteName) {
            var random = Math.random() * cc.winSize.height*300/1280;
            this.spriteName[i].setPosition(-280/720*cc.winSize.width + i * cc.winSize.width*120/720, random);
            this.addChild(this.spriteName[i]);
        }
        this.setOpacity(0);
        this.setCascadeOpacityEnabled(false);
        /*var jump = cc.jumpBy(3, cc.p(0,-100), 1000, 1);
         this.runAction(cc.sequence(jump,cc.callFunc(function(){
         this.getParent().num=this.spriteNum;
         this.removeFromParent();
         },this)));*/
        return true;
    },

    /*-------------Y轴速度递减---------------*/
    decelerate: function (dt) {
        this.velocityY -= this.gravity * dt;
    },

    /*-------------更新Y轴位置---------------*/
    updateY: function () {
        //cc.log(this.y);
        //cc.log(this.velocityY);
        if (this.isSolid == true) {
            this.normalNum++;
            this.isSolid = false;
        }
        this.y += this.velocityY;
        if (this.normalNum == 0) {
            this.normalNum = 100;
            this.isDownAdd = false;
            this.getParent().addAnimal();
        }
        if (this.isUp == true) {
            if (this.velocityY <= 0) {
                this.velocityY = 0;
                this.isUp = false;
            }
        } else {
            if (this.y <= (-1*cc.winSize.height*0.27)) {
                if (this.isDownAdd == true) {
                    //cc.log("normalNum",this.normalNum);
                    this.getParent().addAnimal();
                }
                if (this.normalNum > 0) {
                    if (this.normalNum != 100) {
                        this.getParent().hitNum = 0;
                        this.getParent().timePro.subTime(this.normalNum);
                    }
                }
                this.unschedule(this.decelerate);
                this.unschedule(this.updateY);
                this.getParent().normalNum = 0;
                this.removeFromParent();
            }
        }

    }
});