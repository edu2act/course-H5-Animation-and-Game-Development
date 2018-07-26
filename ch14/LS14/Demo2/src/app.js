
var HelloWorldLayer = cc.Layer.extend({
    tiledMap:null,
    bgLayer:null,
    sp:null,
    ctor:function () {
        this._super();
        var size = cc.winSize;
        var tiledMap = new cc.TMXTiledMap(res.Tmx_tmx);
        // tiledMap.setAnchorPoint(0.5,0.5);
        // tiledMap.setPosition(cc.p(size.width/2,size.height/2));
        this.addChild(tiledMap);
        this.tiledMap = tiledMap;
        var mapSize = this.tiledMap.getMapSize();
        var tiledSize = this.tiledMap.getTileSize();

        this.tiledMapTest(mapSize,tiledSize);
        this.tiledLayerTest();
        this.tiledObjectTest(tiledSize);
        this.tiledCollisionTest();
        return true;
    },
    tiledMapTest:function (mapSize,tiledSize) {
        cc.log(mapSize,tiledSize);
        var tiledMapProGroup = this.tiledMap.getProperties();
        cc.log(tiledMapProGroup);
        cc.log(this.tiledMap.getProperty("tiledMapPro_1"));
        var tiled_1_ptys = this.tiledMap.getPropertiesForGID(1);
        cc.log(tiled_1_ptys);
    },
    tiledLayerTest:function () {
        var bgLayer = this.tiledMap.getLayer("LayerBG");
        this.bgLayer = bgLayer;
        console.log(bgLayer.getLayerSize());
        var tileAt1_1 = bgLayer.getTileAt(cc.p(1,1));
        console.log(bgLayer.getTiles(),tileAt1_1);
        tileAt1_1.setColor(cc.color.BLUE);
        var tileGIDAt6_5 = bgLayer.getTileGIDAt(cc.p(6,5));//这里指的是TileMap坐标系
        cc.log("tileGID = "+tileGIDAt6_5);
        var positionAt1_1 = bgLayer.getPositionAt(1,1);
        //瓦片坐标系－》像素的坐标系转换，x轴一样，y轴反向并差一片
        var tileSize = this.tiledMap.getMapSize();
        cc.log("positionAt1_1:"+positionAt1_1.x+"_"+(positionAt1_1.y+tileSize.width));
        cc.log(bgLayer.getProperty("Layer_p1"));
        cc.log(bgLayer.getProperties().Layer_p1);

        for(var i = 1;i<3;i++){
            for(var j = 1;j<3;j++){
                var sprite = bgLayer.getTileAt(cc.p(i,this.tiledMap.getMapSize().height-j-1));
                sprite.setColor(cc.color.RED);
            }
        }
    },
    tiledObjectTest:function (tiledSize) {
        var object = this.tiledMap.getObjectGroup("objects");
        cc.log(object.getProperties()["type"]);
        cc.log(object.getProperties().type);
        cc.log(object.propertyNamed("type"));

        var groups = this.tiledMap.getObjectGroups();//不推荐使用
        var object2 = groups[0];
        cc.log(object2.getProperties()["type"]);

        var sp = new cc.Sprite(res.CloseNormal_png);
        var player = object.getObject("player");
        cc.log(player.x,player.y);
        cc.log(player.type+"__"+player.x+"__"+(player.y+tiledSize.width));
        cc.log(player.type+"__"+player.width+"__"+player.height);

        sp.setAnchorPoint(cc.p(0,1));
        sp.x =player.x;
        sp.y =player.y+tiledSize.width;
        this.addChild(sp);
        this.sp = sp;

        var properties = this.tiledMap.getPropertiesForGID(1);//GID从1开始
        cc.log(properties.type);//可用于碰撞检测
        for(var k in properties){
           cc.log(k+"__"+properties[k]);
        }
    },
    moveAndCollid:function (pos){
        var newPosition = cc.pAdd(this.sp.getPosition(),pos);
        var tileX = Math.floor(newPosition.x/32);
        var tileY = Math.floor((cc.winSize.height - newPosition.y)/32);
        cc.log("tileX:"+tileX);
        cc.log("tileY:"+tileY);
        var tileGID = this.bgLayer.getTileGIDAt(cc.p(tileX,tileY));
        cc.log("tileGID:"+tileGID);
        var properties = this.tiledMap.getPropertiesForGID(tileGID);
        if(properties == null){
            this.sp.setPosition(newPosition);
            return;
        }else if (properties.type == "block"){
            return;
        }else if (properties.type == "eat"){
            this.sp.setPosition(newPosition);
            cc.log("吃了一个西瓜");
            this.bgLayer.getTileAt(cc.p(tileX,tileY)).setVisible(false);
        }else{
            sp.setPosition(newPosition);
        }
},
    tiledCollisionTest:function () {
        var that = this;
        var listener = cc.EventListener.create({
            event:cc.EventListener.KEYBOARD,
            onKeyPressed:function(key,event){
                switch(key){
                    case cc.KEY.up:
                        that.moveAndCollid(cc.p(0,32));
                        break;
                    case cc.KEY.down:
                        that.moveAndCollid(cc.p(0,-32));
                        break;
                    case cc.KEY.left:
                        that.moveAndCollid(cc.p(-32,0));
                        break;
                    case cc.KEY.right:
                        that.moveAndCollid(cc.p(32,0));
                        break;
                    default:

                }
            },
            onKeyReleased:function(key,event){
                //cc.log("yyy"+Math.floor(sp.x/32)+"__"+Math.floor(sp.y/32));
                //cc.log("zzz"+Math.floor(sp.x/32)+"__"+(tileMap.getMapSize().height-1-Math.floor(sp.y/32)));
                //cc.log("xxx"+(bgLayer.getTileGIDAt(Math.floor(sp.x/32),tileMap.getMapSize().height-1-Math.floor(sp.y/32))));
            }
        });
        cc.eventManager.addListener(listener,this);
    }

});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});

