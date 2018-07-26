
var HelloWorldLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        /////////////////////////////
        // 2. add a menu item with "X" image, which is clicked to quit the program
        //    you may modify it.
        // ask the window size
        var size = cc.winSize;

        var sp = new cc.Sprite(res.HelloWorld_png);
        sp.x = size.width/2;
        sp.y = size.height/2;
        this.addChild(sp);

        //menu 测试
        var menuItem = new cc.MenuItemFont("测试",function(){
            cc.log("xxx");
            //ih5game.more();
            //ih5game.share("xxx");

    /*        var para=document.createElement("h1");
            para.setAttribute('style','color:blue;position:absolute;left:0px;bottom:0px');
            para.style.bottom = size.height/2;
            var node=document.createTextNode("This is new.");
            para.appendChild(node);

            //var element=document.getElementById("div1");
            //element.appendChild(para);

            var element = document.getElementById("Cocos2dGameContainer");
            var child=document.getElementById("gameCanvas");
            element.insertBefore(para,child);*/

        },this);
        menuItem.x = size.width/2;
        menuItem.y = size.height/2;
        menuItem.fontSize = size.width/10;
        var menu = new cc.Menu(menuItem);
        menu.x = 0;
        menu.y = 0;
        this.addChild(menu);


        return true;
    }
});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});

