var Progress = cc.ProgressTimer.extend({
    time: null,
    ctor: function (fileName) {
        this._super(fileName);
        var size = cc.winSize;
        this.time = 1;
        var bg = new cc.Sprite(res.ProgressBg_png);
        bg.setPosition(this.getBoundingBox().width * 0.5, this.getBoundingBox().height * 0.5);
        this.addChild(bg, -1);
        this.setType(cc.ProgressTimer.TYPE_BAR);
        this.setMidpoint(cc.p(0, 1));
        this.setBarChangeRate(cc.p(1, 0));
        this.setPosition(size.width * 0.8, size.height * 0.8);
        //this.runAction(cc.progressTo(2,100));
        /* this.adding();*/
        return true;
    },
    /*adding:function(){
     var menuItem=new cc.MenuItemFont("单击",this.addPro,this);
     menuItem.setColor(cc.color.RED);
     var menu=new cc.Menu(menuItem);
     menu.setPosition(200,-200);
     this.addChild(menu);
     },*/
    addPro: function () {
        this.percentage += 10;
    }

});


