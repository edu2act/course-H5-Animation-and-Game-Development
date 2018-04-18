
var HelloWorldLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        this._super();
        var size = cc.winSize;
        cc.log("Layer ctor");
        // add a "close" icon to exit the progress. it's an autorelease object
        var that = this;
        var closeItem = new cc.MenuItemImage(
            res.CloseNormal_png,
            res.CloseSelected_png,
            function () {
                cc.log("Menu is clicked!");
                cc.log(that.sprite.getPosition());
                cc.log(that.sprite);
                that.sprite.runAction(cc.moveBy(2,200,0));//测试
            }, this);
        closeItem.attr({
            x: size.width - 20,
            y: 20,
            anchorX: 0.5,
            anchorY: 0.5
        });

        var menu = new cc.Menu(closeItem);
        menu.x = 0;
        menu.y = 0;
        this.addChild(menu, 1);


        //烘焙测试
        var bakeLayer = new cc.Layer();
        for(var i=0;i<8000;i++){
                var node = new cc.Sprite(res.CloseNormal_png);
                var nodeX = Math.random()*size.width;
                var nodeY = Math.random()*size.height;
                node.setPosition(nodeX,nodeY);
                bakeLayer.addChild(node);
        }
        bakeLayer.setAnchorPoint(0,0);
        bakeLayer.ignoreAnchor = false;
        bakeLayer.setPosition(0,0);
        this.addChild(bakeLayer,0);

        //测试开启bake和不开启的不同
        //bakeLayer.bake();//在canvas模式下起作用，设置project.json中的renderMode为1
        //bakeLayer.unbake();


        var helloLabel = new cc.LabelTTF("Hello World", "Arial", 38);
        // position the label on the center of the screen
        helloLabel.x = size.width / 2;
        helloLabel.y = 0;
        // add the label as a child to this layer
        this.addChild(helloLabel, 5);

        // add "HelloWorld" splash screen"
        this.sprite = new cc.Sprite(res.HelloWorld_png);
        this.sprite.attr({
            x: size.width / 2,
            y: size.height / 2,
            scale: 0.5,
            rotation: 0
        });
        this.addChild(this.sprite, 0);

        //引用计数加一
        //cc.log("引用计数加一");
        // this.sprite.retain();

        //引用计数减一
        // cc.log("引用计数减一");
        // this.sprite.release();

       /* this.sprite.runAction(
            cc.sequence(
                cc.rotateTo(2, 0),
                cc.scaleTo(2, 1, 1)
            )
        );*/

        helloLabel.runAction(
            cc.spawn(
                cc.moveBy(2.5, cc.p(0, size.height - 40)),
                cc.tintTo(2.5,255,125,0)
            )
        );

        var menuItemLabel = new cc.MenuItemFont("测 试",function () {
            // cc.director.runScene(new TempScene());
            cc.director.pushScene(new TempScene());
        },this);
        menuItemLabel.setFontSize(50);
        var menu = new cc.Menu(menuItemLabel);
        menu.y = size.height*0.1;
        this.addChild(menu);
        return true;
    },
    onExit:function(){
        cc.log("Layer onExit");
        //引用计数减一
        cc.log("引用计数减一");
        this.sprite.release();
        this._super();
    }
});

var HelloWorldScene = cc.Scene.extend({
    ctor:function () {
        this._super();
        var layer = new HelloWorldLayer();
        //layer.bake();
        //layer.unbake();
        this.addChild(layer);
    }
});

